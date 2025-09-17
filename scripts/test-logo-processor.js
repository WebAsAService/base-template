#!/usr/bin/env node

/**
 * Test script for the Logo Processing Pipeline
 * Demonstrates usage and tests functionality
 */

import { LogoProcessor } from './process-logo.js';
import fs from 'fs/promises';
import path from 'path';

// Test logos with different characteristics
const TEST_LOGOS = [
  {
    name: 'Astro Logo',
    url: 'https://astro.build/assets/press/astro-logo-dark.png',
    expectedColors: ['vibrant', 'muted']
  },
  {
    name: 'GitHub Logo',
    url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    expectedColors: ['dark', 'neutral']
  },
  {
    name: 'Node.js Logo',
    url: 'https://nodejs.org/static/images/logo.svg',
    expectedColors: ['green', 'vibrant']
  }
];

async function runTests() {
  console.log('🧪 Starting Logo Processor Tests\n');
  
  const processor = new LogoProcessor({
    outputDir: 'test-output',
    tempDir: 'test-temp'
  });
  
  // Clean up test directories
  await fs.rm('test-output', { recursive: true, force: true });
  await fs.rm('test-temp', { recursive: true, force: true });
  
  const results = [];
  
  for (const testCase of TEST_LOGOS) {
    console.log(`\n📸 Testing: ${testCase.name}`);
    console.log(`   URL: ${testCase.url}`);
    console.log('   -------------------');
    
    const startTime = Date.now();
    const result = await processor.processLogo(testCase.url, testCase.name.toLowerCase().replace(/\s+/g, '-'));
    const duration = Date.now() - startTime;
    
    if (result.success) {
      console.log(`   ✅ Success! Processing took ${duration}ms`);
      console.log(`   📁 Files generated: ${result.files.length}`);
      console.log(`   🎨 Primary color: ${result.colors.palette.primary}`);
      console.log(`   💡 Brightness: ${result.colors.brightness}`);
      console.log(`   📊 Contrast: ${result.colors.contrast}`);
      
      // Verify files exist
      let filesExist = 0;
      for (const file of result.files) {
        try {
          await fs.access(file.path);
          filesExist++;
        } catch (e) {
          console.error(`   ❌ Missing file: ${file.name}`);
        }
      }
      
      console.log(`   📦 Verified ${filesExist}/${result.files.length} files`);
      
      results.push({
        name: testCase.name,
        success: true,
        duration,
        filesGenerated: result.files.length,
        filesVerified: filesExist,
        colors: result.colors
      });
    } else {
      console.log(`   ❌ Failed: ${result.error}`);
      results.push({
        name: testCase.name,
        success: false,
        error: result.error
      });
    }
  }
  
  // Summary
  console.log('\n\n📊 TEST SUMMARY');
  console.log('================');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;
  
  console.log(`Total tests: ${results.length}`);
  console.log(`✅ Passed: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (successful > 0) {
    const avgDuration = results
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.duration, 0) / successful;
    console.log(`⏱️  Average processing time: ${Math.round(avgDuration)}ms`);
  }
  
  // Display detailed results
  console.log('\n📋 Detailed Results:');
  for (const result of results) {
    if (result.success) {
      console.log(`\n✅ ${result.name}:`);
      console.log(`   - Processing time: ${result.duration}ms`);
      console.log(`   - Files: ${result.filesVerified}/${result.filesGenerated} verified`);
      console.log(`   - Colors: ${result.colors.dominantColors.slice(0, 3).join(', ')}`);
      console.log(`   - Theme: ${result.colors.brightness} / ${result.colors.contrast} contrast`);
    } else {
      console.log(`\n❌ ${result.name}: ${result.error}`);
    }
  }
  
  // Test specific functionality
  console.log('\n\n🔬 FUNCTIONALITY TESTS');
  console.log('======================');
  
  // Test error handling
  console.log('\n1. Testing error handling...');
  const errorTests = [
    { url: 'https://invalid-url-that-does-not-exist.com/logo.png', expected: 'Network error' },
    { url: 'https://example.com', expected: 'Non-image content' },
    { url: 'https://httpstat.us/500', expected: 'Server error' }
  ];
  
  for (const test of errorTests) {
    const result = await processor.processLogo(test.url, 'error-test');
    if (!result.success) {
      console.log(`   ✅ Correctly handled ${test.expected}`);
    } else {
      console.log(`   ❌ Should have failed for ${test.expected}`);
    }
  }
  
  // Test GitHub Actions integration format
  console.log('\n2. Testing GitHub Actions integration...');
  const ghResult = await processor.processLogo(TEST_LOGOS[0].url, 'github-test');
  if (ghResult.success) {
    // Test the format expected by GitHub Actions
    const colorFile = path.join(ghResult.outputPath, 'colors.json');
    const colorsData = JSON.parse(await fs.readFile(colorFile, 'utf-8'));
    
    const hasRequiredFields = 
      colorsData.dominantColors && 
      colorsData.palette && 
      colorsData.brightness && 
      colorsData.contrast;
    
    if (hasRequiredFields) {
      console.log('   ✅ Color data format is correct for GitHub Actions');
    } else {
      console.log('   ❌ Color data missing required fields');
    }
  }
  
  console.log('\n✨ Tests completed!\n');
}

// Run tests if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(error => {
    console.error('Fatal test error:', error);
    process.exit(1);
  });
}

export { runTests };