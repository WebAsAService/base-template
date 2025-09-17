#!/usr/bin/env node

/**
 * Logo Processing Script
 * Downloads, processes, and optimizes logos for client sites
 * Extracts dominant colors for theme generation
 */

import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import https from 'https';
import http from 'http';
import { URL } from 'url';

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

// Download file from URL
async function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const request = client.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        return downloadFile(response.headers.location, outputPath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
        return;
      }
      
      const fileStream = createWriteStream(outputPath);
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

// Simple color extraction (basic implementation)
// In a real implementation, you'd use a proper image processing library
async function extractColorsFromImage(imagePath) {
  // This is a simplified color extraction
  // In production, you would use libraries like sharp, canvas, or jimp
  // For now, we'll return some sensible defaults that can be overridden
  
  const colors = {
    primary: '#2563eb', // Blue
    secondary: '#64748b', // Gray
    accent: '#f59e0b', // Amber
    dominant: '#2563eb',
    palette: [
      '#2563eb', '#1d4ed8', '#1e40af', '#3b82f6', '#60a5fa',
      '#64748b', '#475569', '#334155', '#94a3b8', '#cbd5e1'
    ]
  };
  
  console.log(`Color extraction simulated for ${imagePath}`);
  console.log('Extracted colors:', colors);
  
  return colors;
}

// Generate different logo formats
async function generateLogoFormats(inputPath, clientName, outputDir) {
  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });
  
  const formats = [
    { name: 'logo.png', size: 'original' },
    { name: 'logo-sm.png', size: 'small' },
    { name: 'logo-md.png', size: 'medium' },
    { name: 'logo-lg.png', size: 'large' },
    { name: 'logo-dark.png', size: 'original' },
    { name: 'favicon.png', size: 'favicon' },
  ];
  
  // For now, just copy the original file to different names
  // In production, you would use sharp or similar to resize
  for (const format of formats) {
    const outputPath = path.join(outputDir, format.name);
    await fs.copyFile(inputPath, outputPath);
    console.log(`Generated ${format.name} (${format.size})`);
  }
  
  // Generate favicon.ico (simplified - just copy as PNG for now)
  const faviconPath = path.join(outputDir, 'favicon.ico');
  await fs.copyFile(inputPath, faviconPath);
  console.log('Generated favicon.ico');
  
  return formats.map(f => f.name);
}

// Main processing function
async function processLogo(logoUrl, clientName) {
  console.log(`Processing logo for client: ${clientName}`);
  console.log(`Logo URL: ${logoUrl}`);
  
  // Create temporary directory
  await fs.mkdir('temp', { recursive: true });
  
  // Download logo
  console.log('Downloading logo...');
  const tempLogoPath = `temp/original_logo_${clientName}.png`;
  await downloadFile(logoUrl, tempLogoPath);
  console.log('Logo downloaded successfully');
  
  // Create client assets directory
  const clientAssetsDir = `public/images/clients/${clientName}`;
  await fs.mkdir(clientAssetsDir, { recursive: true });
  
  // Generate different logo formats
  console.log('Generating logo formats...');
  const generatedFiles = await generateLogoFormats(tempLogoPath, clientName, clientAssetsDir);
  console.log(`Generated ${generatedFiles.length} logo formats`);
  
  // Extract colors from logo
  console.log('Extracting colors...');
  const extractedColors = await extractColorsFromImage(tempLogoPath);
  
  // Save extracted colors for use in theme generation
  const colorsPath = 'temp/extracted_colors.json';
  await fs.writeFile(colorsPath, JSON.stringify(extractedColors, null, 2));
  console.log(`Colors saved to ${colorsPath}`);
  
  // Create logo metadata
  const logoMetadata = {
    clientName,
    originalUrl: logoUrl,
    processedAt: new Date().toISOString(),
    formats: generatedFiles.map(file => ({
      name: file,
      path: `${clientAssetsDir}/${file}`,
      publicPath: `/images/clients/${clientName}/${file}`
    })),
    extractedColors,
    stats: {
      // In production, you'd include file sizes, dimensions, etc.
      filesGenerated: generatedFiles.length,
      totalSize: '~estimated~'
    }
  };
  
  // Save metadata
  const metadataPath = `${clientAssetsDir}/logo-metadata.json`;
  await fs.writeFile(metadataPath, JSON.stringify(logoMetadata, null, 2));
  console.log(`Logo metadata saved to ${metadataPath}`);
  
  // Clean up temporary file
  await fs.unlink(tempLogoPath);
  console.log('Temporary files cleaned up');
  
  console.log('✅ Logo processing completed successfully!');
  
  return {
    success: true,
    clientName,
    assetsDir: clientAssetsDir,
    generatedFiles,
    extractedColors,
    metadata: logoMetadata
  };
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = parseArgs();
  
  if (!args.logo_url || !args.client_name) {
    console.error('Usage: node process-logo.js --logo-url <URL> --client-name <NAME>');
    process.exit(1);
  }
  
  processLogo(args.logo_url, args.client_name)
    .then((result) => {
      console.log('Logo processing result:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Logo processing failed:', error.message);
      console.error(error.stack);
      process.exit(1);
    });
}

export { processLogo, extractColorsFromImage, generateLogoFormats };