#!/bin/bash

# Test AI Generation Workflow
# This script demonstrates how to test the AI generation components locally

set -e

echo "🚀 Testing AI Generation Components"
echo "=================================="

# Configuration
CLIENT_NAME="test-client"
BUSINESS_NAME="Test Business Solutions"
INDUSTRY="Technology"
CONTACT_EMAIL="test@example.com"
LOGO_URL="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"

echo "Client: $BUSINESS_NAME"
echo "Industry: $INDUSTRY"
echo "Client Name: $CLIENT_NAME"
echo ""

# Clean up previous test
echo "🧹 Cleaning up previous test data..."
rm -rf temp/
rm -rf public/images/clients/$CLIENT_NAME/
rm -rf src/pages/clients/$CLIENT_NAME/
rm -f src/config/clients/$CLIENT_NAME.js
rm -f src/config/clients/$CLIENT_NAME-metadata.json
echo "Cleanup completed"
echo ""

# Test 1: Logo Processing
echo "📸 Testing logo processing..."
mkdir -p temp
node scripts/process-logo.js \
  --logo-url "$LOGO_URL" \
  --client-name "$CLIENT_NAME"

if [ -f "temp/extracted_colors.json" ]; then
  echo "✅ Logo processing successful"
  echo "Colors extracted:"
  cat temp/extracted_colors.json | head -n 10
else
  echo "❌ Logo processing failed"
  exit 1
fi
echo ""

# Test 2: Theme Generation (only if API key is available)
if [ -n "$ANTHROPIC_API_KEY" ]; then
  echo "🤖 Testing AI theme generation..."
  python scripts/generate-theme.py \
    --business-name "$BUSINESS_NAME" \
    --business-description "A leading technology consulting firm" \
    --industry "$INDUSTRY" \
    --target-audience "Small to medium businesses" \
    --services "Consulting, Development, Support" \
    --contact-email "$CONTACT_EMAIL" \
    --contact-phone "+1 (555) 123-4567" \
    --website-domain "https://testbusiness.com" \
    --client-name "$CLIENT_NAME" \
    --logo-colors "$(cat temp/extracted_colors.json)" \
    --logo-path "public/images/clients/$CLIENT_NAME/logo.png"
  
  if [ -f "src/config/clients/$CLIENT_NAME.js" ]; then
    echo "✅ AI generation successful"
    echo "Generated configuration file size: $(wc -c < src/config/clients/$CLIENT_NAME.js) bytes"
  else
    echo "❌ AI generation failed"
    exit 1
  fi
else
  echo "⚠️  Skipping AI generation (ANTHROPIC_API_KEY not set)"
  echo "To test AI generation, set your API key:"
  echo "export ANTHROPIC_API_KEY='your-key-here'"
  
  # Create a mock config file for testing
  echo "Creating mock client configuration..."
  cat > "src/config/clients/$CLIENT_NAME.js" << 'EOF'
export const clientConfig = {
  businessName: "Test Business Solutions",
  tagline: "Innovative Solutions for Modern Businesses", 
  description: "Test configuration for development",
  industry: "Technology",
  contact: {
    email: "test@example.com",
    phone: "+1 (555) 123-4567"
  },
  themeClass: "theme-test-client",
  sections: {
    hero: {
      headline: "Transform Your Business",
      subheadline: "Test headline for development"
    }
  }
};
export default clientConfig;
EOF
fi
echo ""

# Test 3: Client Page Creation
echo "📄 Testing client page creation..."
node scripts/create-client-page.js --client-name "$CLIENT_NAME"

if [ -f "src/pages/clients/$CLIENT_NAME/index.astro" ]; then
  echo "✅ Client page creation successful"
  echo "Generated pages:"
  ls -la "src/pages/clients/$CLIENT_NAME/"
else
  echo "❌ Client page creation failed"
  exit 1
fi
echo ""

# Test 4: Webhook Utils (if webhook URL provided)
if [ -n "$TEST_WEBHOOK_URL" ]; then
  echo "🔗 Testing webhook functionality..."
  node scripts/webhook-utils.js started "$CLIENT_NAME" "Test webhook message" "$TEST_WEBHOOK_URL"
  echo "✅ Webhook test completed"
else
  echo "⚠️  Skipping webhook test (TEST_WEBHOOK_URL not set)"
  echo "To test webhooks, set: export TEST_WEBHOOK_URL='https://webhook.site/your-url'"
fi
echo ""

# Summary
echo "🎉 Test Summary"
echo "==============="
echo "✅ Logo processing: PASSED"
if [ -n "$ANTHROPIC_API_KEY" ]; then
  echo "✅ AI generation: PASSED"
else
  echo "⚠️  AI generation: SKIPPED (no API key)"
fi
echo "✅ Client page creation: PASSED"

if [ -n "$TEST_WEBHOOK_URL" ]; then
  echo "✅ Webhook functionality: PASSED"
else
  echo "⚠️  Webhook functionality: SKIPPED (no webhook URL)"
fi

echo ""
echo "Generated files:"
echo "- Logo assets: public/images/clients/$CLIENT_NAME/"
echo "- Client config: src/config/clients/$CLIENT_NAME.js"
echo "- Client pages: src/pages/clients/$CLIENT_NAME/"
echo ""
echo "🚀 All tests completed successfully!"
echo "The generated client site would be available at: /clients/$CLIENT_NAME/"

# Optional: Clean up test files
read -p "Clean up test files? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🧹 Cleaning up test files..."
  rm -rf temp/
  rm -rf public/images/clients/$CLIENT_NAME/
  rm -rf src/pages/clients/$CLIENT_NAME/
  rm -f src/config/clients/$CLIENT_NAME.js
  rm -f src/config/clients/$CLIENT_NAME-metadata.json
  echo "Cleanup completed"
fi