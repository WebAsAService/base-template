#!/usr/bin/env node

/**
 * Logo Processing Pipeline
 * Downloads, processes, and optimizes logos for client websites
 * Generates multiple sizes, formats, and extracts dominant colors for AI theme generation
 */

import sharp from 'sharp';
import Vibrant from 'node-vibrant';
import fs from 'fs/promises';
import { createWriteStream, existsSync } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import pngToIco from 'png-to-ico';

class LogoProcessor {
  constructor(options = {}) {
    this.outputDir = options.outputDir || 'public/images';
    this.tempDir = options.tempDir || 'temp';
    this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // 10MB
    this.supportedFormats = ['png', 'jpg', 'jpeg', 'svg', 'webp'];
  }

  /**
   * Main processing method
   */
  async processLogo(logoUrl, clientName = null) {
    try {
      console.log('🚀 Starting logo processing...');
      
      // Ensure temp directory exists
      await fs.mkdir(this.tempDir, { recursive: true });
      
      // 1. Download logo
      const logoPath = await this.downloadLogo(logoUrl);
      console.log('✅ Logo downloaded successfully');
      
      // 2. Validate and get metadata
      const metadata = await this.validateAndGetMetadata(logoPath);
      console.log('✅ Logo validated:', metadata);
      
      // 3. Process and optimize the image
      const processedPath = await this.processImage(logoPath, metadata);
      
      // 4. Generate all required sizes
      const outputPath = clientName 
        ? path.join(this.outputDir, 'clients', clientName)
        : this.outputDir;
      await fs.mkdir(outputPath, { recursive: true });
      await fs.mkdir(path.join(outputPath, 'favicon'), { recursive: true });
      
      const generatedFiles = await this.generateVariants(processedPath, outputPath);
      console.log(`✅ Generated ${generatedFiles.length} logo variants`);
      
      // 5. Extract color palette
      const colorData = await this.extractColors(processedPath);
      console.log('✅ Extracted color palette:', colorData);
      
      // 6. Generate dark theme variant
      await this.generateDarkVariant(processedPath, outputPath);
      console.log('✅ Generated dark theme variant');
      
      // 7. Save color data
      const colorFile = path.join(outputPath, 'colors.json');
      await fs.writeFile(colorFile, JSON.stringify(colorData, null, 2));
      
      // Clean up temp files
      await this.cleanup([logoPath, processedPath]);
      
      return {
        success: true,
        files: generatedFiles,
        colors: colorData,
        outputPath
      };
    } catch (error) {
      console.error('❌ Logo processing failed:', error.message);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  /**
   * Download logo from URL
   */
  async downloadLogo(url) {
    return new Promise((resolve, reject) => {
      const fileName = `logo_${Date.now()}.tmp`;
      const outputPath = path.join(this.tempDir, fileName);
      const parsedUrl = new URL(url);
      const client = parsedUrl.protocol === 'https:' ? https : http;
      
      const request = client.get(url, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          return this.downloadLogo(response.headers.location).then(resolve).catch(reject);
        }
        
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
          return;
        }
        
        // Check content type
        const contentType = response.headers['content-type'];
        if (contentType && !contentType.includes('image')) {
          reject(new Error(`Invalid content type: ${contentType}`));
          return;
        }
        
        const fileStream = createWriteStream(outputPath);
        let downloadedSize = 0;
        
        response.on('data', (chunk) => {
          downloadedSize += chunk.length;
          if (downloadedSize > this.maxFileSize) {
            request.destroy();
            reject(new Error(`File too large (max ${this.maxFileSize / 1024 / 1024}MB)`));
          }
        });
        
        pipeline(response, fileStream)
          .then(() => resolve(outputPath))
          .catch(reject);
      });
      
      request.on('error', reject);
      request.setTimeout(30000, () => {
        request.destroy();
        reject(new Error('Download timeout'));
      });
    });
  }

  /**
   * Validate image and get metadata
   */
  async validateAndGetMetadata(imagePath) {
    try {
      const image = sharp(imagePath);
      const metadata = await image.metadata();
      
      // Validate format
      if (!this.supportedFormats.includes(metadata.format)) {
        throw new Error(`Unsupported format: ${metadata.format}`);
      }
      
      // Validate dimensions
      if (metadata.width < 32 || metadata.height < 32) {
        throw new Error('Logo too small (minimum 32x32)');
      }
      
      if (metadata.width > 5000 || metadata.height > 5000) {
        throw new Error('Logo too large (maximum 5000x5000)');
      }
      
      return metadata;
    } catch (error) {
      throw new Error(`Image validation failed: ${error.message}`);
    }
  }

  /**
   * Process and optimize the image
   */
  async processImage(imagePath, metadata) {
    const processedPath = path.join(this.tempDir, 'processed.png');
    
    let pipeline = sharp(imagePath);
    
    // Convert to PNG if not already
    if (metadata.format !== 'png') {
      pipeline = pipeline.png();
    }
    
    // Ensure transparency channel
    if (!metadata.hasAlpha) {
      pipeline = pipeline.ensureAlpha();
    }
    
    // Optimize
    pipeline = pipeline.png({
      quality: 90,
      compressionLevel: 9,
      palette: true
    });
    
    await pipeline.toFile(processedPath);
    return processedPath;
  }

  /**
   * Generate all required logo variants
   */
  async generateVariants(imagePath, outputDir) {
    const variants = [
      { name: 'logo.png', size: 200, description: 'Main logo' },
      { name: 'logo-small.png', size: 64, description: 'Header logo' },
      { name: 'logo-large.png', size: 400, description: 'High-res display' },
      { name: 'favicon/favicon.png', size: 32, description: 'Browser favicon' },
      { name: 'favicon/favicon-16x16.png', size: 16, description: 'Small favicon' },
      { name: 'favicon/apple-touch-icon.png', size: 180, description: 'iOS home screen' },
      { name: 'favicon/android-chrome-192x192.png', size: 192, description: 'Android Chrome' },
      { name: 'favicon/android-chrome-512x512.png', size: 512, description: 'Android Chrome large' }
    ];
    
    const generatedFiles = [];
    
    for (const variant of variants) {
      const outputPath = path.join(outputDir, variant.name);
      
      await sharp(imagePath)
        .resize(variant.size, variant.size, {
          fit: 'inside',
          withoutEnlargement: true,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ quality: 90 })
        .toFile(outputPath);
      
      generatedFiles.push({
        name: variant.name,
        path: outputPath,
        size: variant.size,
        description: variant.description
      });
      
      console.log(`  📦 Generated ${variant.name} (${variant.size}x${variant.size})`);
    }
    
    // Generate ICO file from 32x32 PNG
    await this.generateFavicon(
      path.join(outputDir, 'favicon/favicon.png'),
      path.join(outputDir, 'favicon/favicon.ico')
    );
    
    generatedFiles.push({
      name: 'favicon/favicon.ico',
      path: path.join(outputDir, 'favicon/favicon.ico'),
      description: 'ICO format favicon'
    });
    
    // Generate WebP variants for modern browsers
    const webpVariants = [
      { source: 'logo.png', output: 'logo.webp' },
      { source: 'logo-large.png', output: 'logo-large.webp' }
    ];
    
    for (const variant of webpVariants) {
      const sourcePath = path.join(outputDir, variant.source);
      const outputPath = path.join(outputDir, variant.output);
      
      await sharp(sourcePath)
        .webp({ quality: 90 })
        .toFile(outputPath);
      
      generatedFiles.push({
        name: variant.output,
        path: outputPath,
        description: 'WebP optimized version'
      });
      
      console.log(`  📦 Generated ${variant.output} (WebP format)`);
    }
    
    return generatedFiles;
  }

  /**
   * Generate ICO favicon from PNG
   */
  async generateFavicon(pngPath, icoPath) {
    try {
      // Create multiple sizes for the ICO file
      const sizes = [16, 24, 32, 48, 64];
      const buffers = [];
      
      for (const size of sizes) {
        const buffer = await sharp(pngPath)
          .resize(size, size, {
            fit: 'inside',
            withoutEnlargement: true,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .png()
          .toBuffer();
        buffers.push(buffer);
      }
      
      const icoBuffer = await pngToIco(buffers);
      await fs.writeFile(icoPath, icoBuffer);
      
      console.log('  📦 Generated favicon.ico');
    } catch (error) {
      console.warn('  ⚠️  Could not generate ICO file:', error.message);
      // Fall back to copying PNG as ICO
      await fs.copyFile(pngPath, icoPath);
    }
  }

  /**
   * Extract dominant colors from the logo
   */
  async extractColors(imagePath) {
    try {
      const palette = await Vibrant.from(imagePath).getPalette();
      
      // Extract colors from palette
      const dominantColors = [];
      const colorCategories = ['Vibrant', 'DarkVibrant', 'LightVibrant', 'Muted', 'DarkMuted', 'LightMuted'];
      
      for (const category of colorCategories) {
        if (palette[category]) {
          dominantColors.push(palette[category].hex);
        }
      }
      
      // Ensure we have at least 3 colors
      while (dominantColors.length < 3) {
        dominantColors.push('#6b7280'); // Neutral gray fallback
      }
      
      // Determine brightness
      const brightness = this.analyzeBrightness(palette);
      
      // Determine contrast
      const contrast = this.analyzeContrast(palette);
      
      return {
        dominantColors: dominantColors.slice(0, 5),
        palette: {
          primary: palette.Vibrant?.hex || dominantColors[0],
          secondary: palette.DarkVibrant?.hex || dominantColors[1],
          accent: palette.LightVibrant?.hex || dominantColors[2],
          neutral: palette.Muted?.hex || '#6b7280'
        },
        brightness,
        contrast,
        raw: {
          vibrant: palette.Vibrant?.hex,
          darkVibrant: palette.DarkVibrant?.hex,
          lightVibrant: palette.LightVibrant?.hex,
          muted: palette.Muted?.hex,
          darkMuted: palette.DarkMuted?.hex,
          lightMuted: palette.LightMuted?.hex
        }
      };
    } catch (error) {
      console.warn('Color extraction failed, using defaults:', error.message);
      return this.getDefaultColors();
    }
  }

  /**
   * Analyze overall brightness of the palette
   */
  analyzeBrightness(palette) {
    let totalBrightness = 0;
    let count = 0;
    
    for (const swatch of Object.values(palette)) {
      if (swatch) {
        const rgb = swatch.rgb;
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        totalBrightness += brightness;
        count++;
      }
    }
    
    const avgBrightness = count > 0 ? totalBrightness / count : 128;
    
    if (avgBrightness < 85) return 'dark';
    if (avgBrightness > 170) return 'light';
    return 'mixed';
  }

  /**
   * Analyze contrast between colors
   */
  analyzeContrast(palette) {
    const colors = Object.values(palette).filter(Boolean);
    if (colors.length < 2) return 'medium';
    
    let maxContrast = 0;
    
    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const contrast = this.getContrastRatio(colors[i].rgb, colors[j].rgb);
        maxContrast = Math.max(maxContrast, contrast);
      }
    }
    
    if (maxContrast > 7) return 'high';
    if (maxContrast > 4.5) return 'medium';
    return 'low';
  }

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio(rgb1, rgb2) {
    const l1 = this.getRelativeLuminance(rgb1);
    const l2 = this.getRelativeLuminance(rgb2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Calculate relative luminance of a color
   */
  getRelativeLuminance(rgb) {
    const [r, g, b] = rgb.map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Generate dark theme variant of the logo
   */
  async generateDarkVariant(imagePath, outputDir) {
    try {
      const image = sharp(imagePath);
      const metadata = await image.metadata();
      
      // For logos with transparency, add a subtle white outline/glow
      // This ensures visibility on dark backgrounds
      const darkVariantPath = path.join(outputDir, 'logo-dark.png');
      
      // Create a version with enhanced brightness for dark backgrounds
      await sharp(imagePath)
        .resize(200, 200, {
          fit: 'inside',
          withoutEnlargement: true,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .modulate({
          brightness: 1.1,  // Slightly increase brightness
          saturation: 0.9   // Slightly reduce saturation
        })
        .png({ quality: 90 })
        .toFile(darkVariantPath);
      
      // Also create a dark variant with white background for logos with transparency
      const darkVariantWithBgPath = path.join(outputDir, 'logo-dark-bg.png');
      
      await sharp(imagePath)
        .resize(200, 200, {
          fit: 'inside',
          withoutEnlargement: true,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .png({ quality: 90 })
        .toFile(darkVariantWithBgPath);
      
      console.log('  🌙 Generated dark theme variants');
    } catch (error) {
      console.warn('  ⚠️  Could not generate dark variant:', error.message);
      // Fall back to copying original
      await fs.copyFile(imagePath, path.join(outputDir, 'logo-dark.png'));
    }
  }

  /**
   * Get default colors if extraction fails
   */
  getDefaultColors() {
    return {
      dominantColors: ['#3b82f6', '#1e40af', '#60a5fa', '#6b7280', '#9ca3af'],
      palette: {
        primary: '#3b82f6',
        secondary: '#1e40af',
        accent: '#60a5fa',
        neutral: '#6b7280'
      },
      brightness: 'light',
      contrast: 'high'
    };
  }

  /**
   * Clean up temporary files
   */
  async cleanup(files) {
    for (const file of files) {
      try {
        if (existsSync(file)) {
          await fs.unlink(file);
        }
      } catch (error) {
        console.warn(`Could not delete temp file ${file}:`, error.message);
      }
    }
  }
}

// CLI argument parser
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2).replace(/-/g, '_');
      const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
      parsed[key] = value;
      if (value !== true) i++;
    }
  }
  
  return parsed;
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = parseArgs();
  
  if (!args.url && !args.logo_url) {
    console.error('Usage: node process-logo.js --url <LOGO_URL> [--output <DIR>] [--client <NAME>] [--extract-colors <FILE>]');
    console.error('\nOptions:');
    console.error('  --url, --logo-url  URL of the logo to process (required)');
    console.error('  --output           Output directory (default: public/images)');
    console.error('  --client           Client name for organizing files');
    console.error('  --extract-colors   Output file for extracted colors JSON');
    process.exit(1);
  }
  
  const processor = new LogoProcessor({
    outputDir: args.output || 'public/images',
    tempDir: args.temp || 'temp'
  });
  
  const logoUrl = args.url || args.logo_url;
  const clientName = args.client || args.client_name;
  
  processor.processLogo(logoUrl, clientName)
    .then(async (result) => {
      if (result.success) {
        console.log('\n✅ Logo processing completed successfully!');
        console.log(`📁 Output directory: ${result.outputPath}`);
        console.log(`🎨 Colors extracted: ${result.colors.dominantColors.join(', ')}`);
        
        // Save colors to specified file if requested
        if (args.extract_colors) {
          await fs.writeFile(args.extract_colors, JSON.stringify(result.colors, null, 2));
          console.log(`💾 Colors saved to: ${args.extract_colors}`);
        }
        
        process.exit(0);
      } else {
        console.error('\n❌ Logo processing failed:', result.error);
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('\n❌ Fatal error:', error.message);
      console.error(error.stack);
      process.exit(1);
    });
}

export { LogoProcessor };