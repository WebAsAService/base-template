#!/usr/bin/env node

/**
 * API Trigger Example
 * Demonstrates how to trigger the AI generation workflow via GitHub API
 */

import https from 'https';

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'WebAsAService';
const REPO_NAME = 'base-template';

// Example client data
const exampleClients = [
  {
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
    business_name: 'Acme Technology Solutions',
    business_description: 'Leading provider of innovative technology solutions for modern businesses',
    industry: 'Technology',
    target_audience: 'Small to medium businesses',
    services: 'Web development, Cloud consulting, Digital transformation, Technical support',
    contact_email: 'contact@acme-tech.com',
    contact_phone: '+1 (555) 123-4567',
    website_domain: 'https://acme-tech.com',
    client_name: 'acme-tech'
  },
  {
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
    business_name: 'Green Valley Healthcare',
    business_description: 'Comprehensive healthcare services with a focus on patient-centered care',
    industry: 'Healthcare',
    target_audience: 'Patients and families in the local community',
    services: 'Primary care, Specialist consultations, Preventive care, Telemedicine',
    contact_email: 'info@greenvalleyhc.com',
    contact_phone: '+1 (555) 987-6543',
    website_domain: 'https://greenvalleyhealthcare.com',
    client_name: 'green-valley-hc'
  },
  {
    logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png',
    business_name: 'Creative Design Studio',
    business_description: 'Award-winning design studio specializing in brand identity and digital experiences',
    industry: 'Creative',
    target_audience: 'Startups and established businesses looking for premium design',
    services: 'Brand design, Web design, Mobile app design, Marketing materials',
    contact_email: 'hello@creativedesign.studio',
    contact_phone: '+1 (555) 456-7890',
    website_domain: 'https://creativedesign.studio',
    client_name: 'creative-studio'
  }
];

// Trigger workflow via GitHub API
async function triggerWorkflow(clientData) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      event_type: 'generate-client-site',
      client_payload: clientData
    });

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`,
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'AI-Generation-Example/1.0',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 204) {
          resolve({
            success: true,
            statusCode: res.statusCode,
            client: clientData.client_name
          });
        } else {
          reject({
            success: false,
            statusCode: res.statusCode,
            error: responseBody,
            client: clientData.client_name
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        success: false,
        error: error.message,
        client: clientData.client_name
      });
    });

    req.write(postData);
    req.end();
  });
}

// Main execution
async function main() {
  console.log('🚀 AI Generation Workflow Trigger Example');
  console.log('==========================================');
  
  if (!GITHUB_TOKEN) {
    console.error('❌ Error: GITHUB_TOKEN environment variable is required');
    console.error('Set it with: export GITHUB_TOKEN=your_github_token_here');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'single':
      await triggerSingleClient();
      break;
    case 'batch':
      await triggerBatchClients();
      break;
    case 'custom':
      await triggerCustomClient(args.slice(1));
      break;
    default:
      showUsage();
  }
}

// Trigger single example client
async function triggerSingleClient() {
  console.log('Triggering single client generation...');
  const client = exampleClients[0];
  
  try {
    console.log(`\n📋 Client: ${client.business_name}`);
    console.log(`📧 Contact: ${client.contact_email}`);
    console.log(`🏭 Industry: ${client.industry}`);
    console.log(`🔗 Client Name: ${client.client_name}`);
    
    const result = await triggerWorkflow(client);
    console.log(`✅ Workflow triggered successfully for ${client.business_name}`);
    console.log(`📊 GitHub API Response: ${result.statusCode}`);
    
    console.log('\n🔍 Monitor progress at:');
    console.log(`https://github.com/${REPO_OWNER}/${REPO_NAME}/actions`);
    
  } catch (error) {
    console.error(`❌ Failed to trigger workflow for ${client.business_name}:`, error);
    process.exit(1);
  }
}

// Trigger multiple clients in batch
async function triggerBatchClients() {
  console.log('Triggering batch client generation...');
  console.log(`Processing ${exampleClients.length} clients...\n`);
  
  const results = [];
  
  for (const client of exampleClients) {
    try {
      console.log(`🔄 Processing: ${client.business_name} (${client.client_name})`);
      
      const result = await triggerWorkflow(client);
      results.push({ ...result, business_name: client.business_name });
      
      console.log(`✅ Success: ${client.business_name}`);
      
      // Wait 2 seconds between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Failed: ${client.business_name}`, error.error);
      results.push({ 
        success: false, 
        client: client.client_name, 
        business_name: client.business_name,
        error: error.error 
      });
    }
  }
  
  // Summary
  console.log('\n📊 Batch Processing Summary:');
  console.log('============================');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Total: ${results.length}`);
  
  if (failed > 0) {
    console.log('\n❌ Failed clients:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`- ${r.business_name}: ${r.error}`);
    });
  }
  
  console.log('\n🔍 Monitor all workflows at:');
  console.log(`https://github.com/${REPO_OWNER}/${REPO_NAME}/actions`);
}

// Trigger custom client
async function triggerCustomClient(args) {
  if (args.length < 4) {
    console.error('❌ Custom client requires: business_name industry contact_email client_name [logo_url]');
    console.error('Example: node api-trigger-example.js custom "My Business" "Technology" "contact@mybiz.com" "my-biz" "https://example.com/logo.png"');
    process.exit(1);
  }
  
  const [businessName, industry, contactEmail, clientName, logoUrl] = args;
  
  const customClient = {
    business_name: businessName,
    industry: industry,
    contact_email: contactEmail,
    client_name: clientName,
    logo_url: logoUrl || 'https://via.placeholder.com/200x100/2563eb/white?text=LOGO',
    business_description: `Professional ${industry.toLowerCase()} services`,
    target_audience: 'Business professionals',
    services: 'Professional consulting services',
    contact_phone: '',
    website_domain: `https://${clientName.replace('-', '')}.com`
  };
  
  console.log('Triggering custom client generation...');
  console.log(`\n📋 Client: ${customClient.business_name}`);
  console.log(`📧 Contact: ${customClient.contact_email}`);
  console.log(`🏭 Industry: ${customClient.industry}`);
  console.log(`🔗 Client Name: ${customClient.client_name}`);
  
  try {
    const result = await triggerWorkflow(customClient);
    console.log(`✅ Workflow triggered successfully for ${customClient.business_name}`);
    console.log(`📊 GitHub API Response: ${result.statusCode}`);
    
    console.log('\n🔍 Monitor progress at:');
    console.log(`https://github.com/${REPO_OWNER}/${REPO_NAME}/actions`);
    
  } catch (error) {
    console.error(`❌ Failed to trigger workflow for ${customClient.business_name}:`, error);
    process.exit(1);
  }
}

// Show usage information
function showUsage() {
  console.log('Usage: node api-trigger-example.js <command> [args...]');
  console.log('');
  console.log('Commands:');
  console.log('  single                    - Trigger generation for one example client');
  console.log('  batch                     - Trigger generation for all example clients');
  console.log('  custom <name> <industry> <email> <client_name> [logo_url]');
  console.log('                           - Trigger generation for a custom client');
  console.log('');
  console.log('Examples:');
  console.log('  node api-trigger-example.js single');
  console.log('  node api-trigger-example.js batch');
  console.log('  node api-trigger-example.js custom "My Business" "Technology" "contact@mybiz.com" "my-biz"');
  console.log('');
  console.log('Environment Variables:');
  console.log('  GITHUB_TOKEN              - Required: GitHub personal access token');
  console.log('');
  console.log('Prerequisites:');
  console.log('  1. Set GITHUB_TOKEN environment variable');
  console.log('  2. Token must have "repo" scope for the target repository');
  console.log('  3. Repository must have ANTHROPIC_API_KEY secret configured');
  console.log('');
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
}