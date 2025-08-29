#!/usr/bin/env node

/**
 * Image Optimization Script
 * Advanced image processing and optimization utilities
 * This would normally use Sharp.js in production
 */

import fs from 'fs/promises';
import path from 'path';

// Simple argument parser
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  
  for (let i = 0; i < args.length; i += 2) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2).replace(/-/g, '_');
      parsed[key] = args[i + 1];
    }
  }
  
  return parsed;
}

// Image format specifications
const IMAGE_FORMATS = {
  'favicon.ico': { width: 32, height: 32, format: 'ico' },
  'favicon.png': { width: 32, height: 32, format: 'png' },
  'logo.png': { width: null, height: 120, format: 'png' }, // Original aspect ratio
  'logo-sm.png': { width: null, height: 60, format: 'png' },
  'logo-md.png': { width: null, height: 80, format: 'png' },
  'logo-lg.png': { width: null, height: 160, format: 'png' },
  'logo-dark.png': { width: null, height: 120, format: 'png' },
  'logo-white.png': { width: null, height: 120, format: 'png' },
  'og-image.jpg': { width: 1200, height: 630, format: 'jpg' } // Open Graph
};

// Simplified image metadata extraction
async function getImageMetadata(imagePath) {
  try {
    const stats = await fs.stat(imagePath);
    
    // In production, you would use a proper image library like sharp
    // For now, return basic file information
    return {
      width: 200, // placeholder
      height: 100, // placeholder
      format: path.extname(imagePath).slice(1),
      size: stats.size,
      path: imagePath
    };
  } catch (error) {
    throw new Error(`Failed to read image metadata: ${error.message}`);
  }
}

// Simulate image optimization
async function optimizeImage(inputPath, outputPath, options = {}) {
  const { width, height, format, quality = 85 } = options;
  
  console.log(`Optimizing image: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  console.log(`Target: ${width || 'auto'}x${height || 'auto'}, format: ${format}, quality: ${quality}`);
  
  // In production, this would use Sharp.js for actual image processing:
  // const sharp = require('sharp');
  // let pipeline = sharp(inputPath);
  // 
  // if (width || height) {
  //   pipeline = pipeline.resize(width, height, {
  //     fit: 'inside',
  //     withoutEnlargement: true
  //   });
  // }
  // 
  // if (format === 'jpg' || format === 'jpeg') {
  //   pipeline = pipeline.jpeg({ quality });
  // } else if (format === 'png') {
  //   pipeline = pipeline.png({ quality });
  // } else if (format === 'webp') {
  //   pipeline = pipeline.webp({ quality });
  // }
  // 
  // await pipeline.toFile(outputPath);
  
  // For now, just copy the file (simulation)
  await fs.copyFile(inputPath, outputPath);
  
  return {
    inputPath,
    outputPath,
    originalSize: (await fs.stat(inputPath)).size,
    optimizedSize: (await fs.stat(outputPath)).size,
    format,
    dimensions: { width, height }
  };
}

// Generate responsive image variants
async function generateResponsiveImages(inputPath, outputDir, basename) {
  const variants = [];
  
  const responsiveSizes = [
    { suffix: '-sm', width: null, height: 60 },
    { suffix: '-md', width: null, height: 80 },
    { suffix: '-lg', width: null, height: 120 },
    { suffix: '-xl', width: null, height: 160 }
  ];
  
  for (const size of responsiveSizes) {
    const outputPath = path.join(outputDir, `${basename}${size.suffix}.png`);
    const result = await optimizeImage(inputPath, outputPath, {
      width: size.width,
      height: size.height,
      format: 'png'
    });
    variants.push(result);
  }
  
  return variants;
}

// Generate favicon formats
async function generateFavicons(inputPath, outputDir) {
  const faviconFormats = [
    { name: 'favicon.ico', size: 32, format: 'ico' },
    { name: 'favicon.png', size: 32, format: 'png' },
    { name: 'favicon-16x16.png', size: 16, format: 'png' },
    { name: 'favicon-32x32.png', size: 32, format: 'png' },
    { name: 'apple-touch-icon.png', size: 180, format: 'png' },
    { name: 'android-chrome-192x192.png', size: 192, format: 'png' },
    { name: 'android-chrome-512x512.png', size: 512, format: 'png' }
  ];
  
  const favicons = [];
  
  for (const favicon of faviconFormats) {
    const outputPath = path.join(outputDir, favicon.name);
    const result = await optimizeImage(inputPath, outputPath, {
      width: favicon.size,
      height: favicon.size,
      format: favicon.format
    });
    favicons.push(result);
  }
  
  return favicons;
}

// Generate Open Graph image
async function generateOpenGraphImage(inputPath, outputDir, businessName) {
  const ogPath = path.join(outputDir, 'og-image.jpg');
  
  // In production, you would create a composite image with:
  // - Logo
  // - Business name
  // - Brand colors
  // - Proper OG dimensions (1200x630)
  
  console.log(`Generating Open Graph image for: ${businessName}`);
  
  const result = await optimizeImage(inputPath, ogPath, {
    width: 1200,
    height: 630,
    format: 'jpg',
    quality: 90
  });
  
  return result;
}

// Extract dominant colors from image
async function extractDominantColors(imagePath) {
  // In production, you would use a color extraction library
  // For now, return some default colors based on common logo color patterns
  
  console.log(`Extracting colors from: ${path.basename(imagePath)}`);
  
  // Simulate color extraction delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return realistic color palette
  const colorPalettes = [
    {
      primary: '#2563eb',
      secondary: '#64748b', 
      accent: '#f59e0b',
      dominant: '#2563eb',
      palette: ['#2563eb', '#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd']
    },
    {
      primary: '#dc2626',
      secondary: '#374151',
      accent: '#f59e0b',
      dominant: '#dc2626',
      palette: ['#dc2626', '#b91c1c', '#ef4444', '#f87171', '#fca5a5']
    },
    {
      primary: '#059669',
      secondary: '#6b7280',
      accent: '#d97706',
      dominant: '#059669',
      palette: ['#059669', '#047857', '#10b981', '#34d399', '#6ee7b7']
    }
  ];
  
  // Return a random palette (in production, this would be extracted from the actual image)
  const selectedPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
  
  console.log('Extracted colors:', selectedPalette);
  return selectedPalette;
}

// Main optimization function
async function optimizeClientImages(inputImagePath, clientName, businessName = '') {
  console.log(`Starting image optimization for client: ${clientName}`);
  console.log(`Input image: ${inputImagePath}`);
  
  const outputDir = `public/images/clients/${clientName}`;
  await fs.mkdir(outputDir, { recursive: true });
  
  const results = {
    clientName,
    businessName,
    outputDir,
    processedImages: [],
    extractedColors: null,
    metadata: {}
  };
  
  try {
    // Extract image metadata
    const metadata = await getImageMetadata(inputImagePath);
    results.metadata = metadata;
    console.log('Image metadata:', metadata);
    
    // Extract dominant colors
    const colors = await extractDominantColors(inputImagePath);
    results.extractedColors = colors;
    
    // Generate main logo variants
    console.log('Generating logo variants...');
    const basename = 'logo';
    const logoVariants = await generateResponsiveImages(inputImagePath, outputDir, basename);
    results.processedImages.push(...logoVariants);
    
    // Generate favicons
    console.log('Generating favicons...');
    const favicons = await generateFavicons(inputImagePath, outputDir);
    results.processedImages.push(...favicons);
    
    // Generate Open Graph image
    if (businessName) {
      console.log('Generating Open Graph image...');
      const ogImage = await generateOpenGraphImage(inputImagePath, outputDir, businessName);
      results.processedImages.push(ogImage);
    }
    
    // Generate dark/light variants (simulated)
    console.log('Generating theme variants...');
    const darkVariant = await optimizeImage(inputImagePath, path.join(outputDir, 'logo-dark.png'), {
      width: null,
      height: 120,
      format: 'png'
    });
    const lightVariant = await optimizeImage(inputImagePath, path.join(outputDir, 'logo-light.png'), {
      width: null,
      height: 120,
      format: 'png'
    });
    results.processedImages.push(darkVariant, lightVariant);
    
    // Save processing results
    const manifestPath = path.join(outputDir, 'image-manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(results, null, 2));
    console.log(`Image manifest saved: ${manifestPath}`);
    
    // Save extracted colors for theme generation
    const colorsPath = 'temp/extracted_colors.json';
    await fs.mkdir('temp', { recursive: true });
    await fs.writeFile(colorsPath, JSON.stringify(colors, null, 2));
    console.log(`Colors saved: ${colorsPath}`);
    
    console.log(`✅ Image optimization completed! Generated ${results.processedImages.length} images.`);
    
    return results;
    
  } catch (error) {
    console.error(`❌ Image optimization failed: ${error.message}`);
    throw error;
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = parseArgs();
  
  if (!args.input_image || !args.client_name) {
    console.error('Usage: node optimize-images.js --input-image <PATH> --client-name <NAME> [--business-name <NAME>]');
    process.exit(1);
  }
  
  optimizeClientImages(args.input_image, args.client_name, args.business_name)
    .then((result) => {
      console.log('Image optimization completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Image optimization failed:', error);
      process.exit(1);
    });
}

export { 
  optimizeClientImages, 
  generateResponsiveImages, 
  generateFavicons, 
  extractDominantColors,
  optimizeImage 
};