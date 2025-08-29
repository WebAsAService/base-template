#!/usr/bin/env node

/**
 * Webhook Utilities
 * Handles status updates and notifications during the AI generation process
 */

import https from 'https';
import http from 'http';

// Send status webhook
export async function sendStatusWebhook(webhookUrl, payload) {
  if (!webhookUrl) {
    console.log('No webhook URL provided, skipping status update');
    return { success: false, reason: 'no_webhook_url' };
  }

  return new Promise((resolve) => {
    try {
      const url = new URL(webhookUrl);
      const client = url.protocol === 'https:' ? https : http;
      
      const postData = JSON.stringify(payload);
      
      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'User-Agent': 'GitHub-Actions-AI-Generation/1.0'
        },
        timeout: 10000
      };

      const req = client.request(options, (res) => {
        let responseBody = '';
        
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✅ Webhook sent successfully: ${payload.status}`);
            resolve({ 
              success: true, 
              statusCode: res.statusCode, 
              response: responseBody 
            });
          } else {
            console.error(`❌ Webhook failed with status ${res.statusCode}: ${responseBody}`);
            resolve({ 
              success: false, 
              statusCode: res.statusCode, 
              error: responseBody 
            });
          }
        });
      });

      req.on('error', (error) => {
        console.error(`❌ Webhook error: ${error.message}`);
        resolve({ 
          success: false, 
          error: error.message 
        });
      });

      req.on('timeout', () => {
        req.destroy();
        console.error('❌ Webhook timeout');
        resolve({ 
          success: false, 
          error: 'timeout' 
        });
      });

      req.write(postData);
      req.end();
      
    } catch (error) {
      console.error(`❌ Webhook setup error: ${error.message}`);
      resolve({ 
        success: false, 
        error: error.message 
      });
    }
  });
}

// Create status payload
export function createStatusPayload(status, clientName, message, additionalData = {}) {
  return {
    status,
    client_name: clientName,
    message,
    timestamp: new Date().toISOString(),
    workflow_run: process.env.GITHUB_RUN_ID || null,
    repository: process.env.GITHUB_REPOSITORY || null,
    ...additionalData
  };
}

// Predefined status types
export const STATUS_TYPES = {
  STARTED: 'started',
  LOGO_PROCESSED: 'logo_processed',
  CONTENT_GENERATED: 'content_generated',
  PR_CREATED: 'pr_created',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

// Predefined status messages
export const STATUS_MESSAGES = {
  [STATUS_TYPES.STARTED]: 'AI generation process initiated',
  [STATUS_TYPES.LOGO_PROCESSED]: 'Logo downloaded and optimized',
  [STATUS_TYPES.CONTENT_GENERATED]: 'AI content and theme generated',
  [STATUS_TYPES.PR_CREATED]: 'Pull request created with changes',
  [STATUS_TYPES.COMPLETED]: 'Client site generated successfully',
  [STATUS_TYPES.FAILED]: 'Generation process failed'
};

// Send status update with standard format
export async function sendStatus(status, clientName, customMessage = null, additionalData = {}) {
  const webhookUrl = process.env.STATUS_WEBHOOK_URL;
  const message = customMessage || STATUS_MESSAGES[status] || 'Status update';
  
  const payload = createStatusPayload(status, clientName, message, additionalData);
  
  return await sendStatusWebhook(webhookUrl, payload);
}

// CLI execution for testing
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.error('Usage: node webhook-utils.js <status> <client_name> <message> [webhook_url]');
    console.error('Example: node webhook-utils.js started acme-corp "Starting generation" https://webhook.site/abc123');
    process.exit(1);
  }
  
  const [status, clientName, message, webhookUrl] = args;
  
  if (webhookUrl) {
    process.env.STATUS_WEBHOOK_URL = webhookUrl;
  }
  
  sendStatus(status, clientName, message)
    .then((result) => {
      console.log('Webhook result:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error('Webhook failed:', error);
      process.exit(1);
    });
}