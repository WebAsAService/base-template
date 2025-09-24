#!/usr/bin/env node

/**
 * Client Page Creator Script
 * Creates the Astro page file for a generated client
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

// Generate Astro page template
function generateClientPageTemplate(clientName) {
  return `---
/**
 * Client Page: ${clientName}
 * Generated automatically by AI workflow
 */

import Layout from '@layouts/Layout.astro';
import Header from '@components/layout/Header.astro';
import HeroSection from '@components/sections/HeroSection.astro';
import FeaturesSection from '@components/sections/FeaturesSection.astro';
import ServicesSection from '@components/sections/ServicesSection.astro';
import TestimonialsSection from '@components/sections/TestimonialsSection.astro';
import ContactSection from '@components/sections/ContactSection.astro';

// Import client configuration
import { clientConfig } from '@config/clients/${clientName}.js';

// Set client theme class
const clientTheme = 'theme-${clientName}';
---

<Layout 
  title={clientConfig.business.name}
  description={clientConfig.business.shortDescription}
  clientTheme={clientTheme}
>
  <!-- Header with logo and navigation -->
  <Header 
    clientConfig={clientConfig}
    logo="/images/clients/${clientName}/logo.png"
  />
  
  <main class="min-h-screen">
    <!-- Hero Section -->
    <HeroSection config={clientConfig.content.hero} />
    
    <!-- Features Section -->
    <FeaturesSection 
      title="Our Features"
      subtitle="What we offer"
      features={clientConfig.content.features}
    />
    
    <!-- Services/Pricing Section -->
    <ServicesSection 
      title="Our Services"
      services={clientConfig.content.services}
    />
    
    <!-- Testimonials Section -->
    <TestimonialsSection 
      title="What Our Clients Say"
      testimonials={clientConfig.content.testimonials}
    />
    
    <!-- Contact Section -->
    <ContactSection 
      title="Contact Us"
      subtitle="Get in touch"
      form={{}}
      methods={[]}
      contact={clientConfig.contact}
    />
  </main>
</Layout>

<style>
  /* Client-specific page styles can go here */
  main {
    /* Ensure theme variables are applied */
    @apply text-secondary-900;
  }
</style>
`;
}

// Generate assets page for logo variants
function generateAssetsPageTemplate(clientName) {
  return `---
/**
 * Client Assets Page: ${clientName}
 * Shows different logo variants and brand assets
 */

import Layout from '@layouts/Layout.astro';
import { clientConfig } from '@config/clients/${clientName}.js';

const clientTheme = 'theme-${clientName}';
const logoBasePath = '/images/clients/${clientName}';
---

<Layout 
  title={\`\${clientConfig.business.name} - Brand Assets\`}
  description={\`Brand assets and logo variants for \${clientConfig.business.name}\`}
  clientTheme={clientTheme}
>
  <main class="min-h-screen py-16">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">{clientConfig.business.name}</h1>
        <p class="text-xl text-secondary-600">Brand Assets & Logo Variants</p>
      </div>
      
      <!-- Logo Variants Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <!-- Main Logo -->
        <div class="bg-white p-8 rounded-lg shadow-md text-center">
          <img 
            src={\`\${logoBasePath}/logo.png\`}
            alt={\`\${clientConfig.business.name} Logo\`}
            class="max-h-24 mx-auto mb-4"
          />
          <h3 class="font-semibold">Main Logo</h3>
          <p class="text-sm text-secondary-600">Primary brand mark</p>
        </div>
        
        <!-- Dark Background Logo -->
        <div class="bg-secondary-900 p-8 rounded-lg shadow-md text-center">
          <img 
            src={\`\${logoBasePath}/logo-dark.png\`}
            alt={\`\${clientConfig.business.name} Logo Dark\`}
            class="max-h-24 mx-auto mb-4"
          />
          <h3 class="font-semibold text-white">Dark Version</h3>
          <p class="text-sm text-secondary-300">For dark backgrounds</p>
        </div>
        
        <!-- Small Logo -->
        <div class="bg-secondary-50 p-8 rounded-lg shadow-md text-center">
          <img 
            src={\`\${logoBasePath}/logo-sm.png\`}
            alt={\`\${clientConfig.business.name} Small Logo\`}
            class="max-h-16 mx-auto mb-4"
          />
          <h3 class="font-semibold">Small Size</h3>
          <p class="text-sm text-secondary-600">Compact version</p>
        </div>
        
        <!-- Favicon -->
        <div class="bg-white p-8 rounded-lg shadow-md text-center border">
          <img 
            src={\`\${logoBasePath}/favicon.png\`}
            alt="Favicon"
            class="w-8 h-8 mx-auto mb-4"
          />
          <h3 class="font-semibold">Favicon</h3>
          <p class="text-sm text-secondary-600">Browser icon</p>
        </div>
      </div>
      
      <!-- Color Palette -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-8">Brand Colors</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <!-- Primary Color -->
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-500 rounded-lg mx-auto mb-2 shadow-md"></div>
            <h4 class="font-semibold">Primary</h4>
            <p class="text-sm text-secondary-600">{clientConfig.branding.colors.primary}</p>
          </div>
          
          <!-- Secondary Color -->
          <div class="text-center">
            <div class="w-20 h-20 bg-secondary-500 rounded-lg mx-auto mb-2 shadow-md"></div>
            <h4 class="font-semibold">Secondary</h4>
            <p class="text-sm text-secondary-600">{clientConfig.branding.colors.secondary}</p>
          </div>
          
          <!-- Accent Color -->
          <div class="text-center">
            <div class="w-20 h-20 bg-accent-500 rounded-lg mx-auto mb-2 shadow-md"></div>
            <h4 class="font-semibold">Accent</h4>
            <p class="text-sm text-secondary-600">{clientConfig.branding.colors.accent}</p>
          </div>
        </div>
      </div>
      
      <!-- Back to Main Site -->
      <div class="text-center">
        <a 
          href={\`/clients/${clientName}/\`}
          class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          ← Back to Main Site
        </a>
      </div>
    </div>
  </main>
</Layout>
`;
}

// Main function to create client page
async function createClientPage(clientName) {
  console.log(`Creating client page for: ${clientName}`);
  
  // Create client page directory
  const clientPageDir = `src/pages/clients/${clientName}`;
  await fs.mkdir(clientPageDir, { recursive: true });
  
  // Generate main page
  const mainPageContent = generateClientPageTemplate(clientName);
  const mainPagePath = path.join(clientPageDir, 'index.astro');
  await fs.writeFile(mainPagePath, mainPageContent);
  console.log(`✅ Main page created: ${mainPagePath}`);
  
  // Generate assets page
  const assetsPageContent = generateAssetsPageTemplate(clientName);
  const assetsPagePath = path.join(clientPageDir, 'assets.astro');
  await fs.writeFile(assetsPagePath, assetsPageContent);
  console.log(`✅ Assets page created: ${assetsPagePath}`);
  
  // Create README for the client directory
  const readmeContent = `# ${clientName} Client Site

This directory contains the generated client site files for ${clientName}.

## Files:
- \`index.astro\` - Main client page
- \`assets.astro\` - Brand assets showcase
- Configuration: \`src/config/clients/${clientName}.js\`
- Theme: \`theme-${clientName}\` class in \`src/styles/client-themes.css\`
- Assets: \`public/images/clients/${clientName}/\`

## Generated by:
AI-powered GitHub Actions workflow using Claude API

Generated on: ${new Date().toISOString()}
`;
  
  const readmePath = path.join(clientPageDir, 'README.md');
  await fs.writeFile(readmePath, readmeContent);
  console.log(`✅ README created: ${readmePath}`);
  
  return {
    success: true,
    clientName,
    pageDir: clientPageDir,
    files: [mainPagePath, assetsPagePath, readmePath]
  };
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = parseArgs();
  
  if (!args.client_name) {
    console.error('Usage: node create-client-page.js --client-name <NAME>');
    process.exit(1);
  }
  
  createClientPage(args.client_name)
    .then((result) => {
      console.log('Client page creation result:', result);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Client page creation failed:', error.message);
      console.error(error.stack);
      process.exit(1);
    });
}

export { createClientPage, generateClientPageTemplate, generateAssetsPageTemplate };