# AI Generation Scripts

This directory contains the scripts used by the GitHub Actions workflow to automatically generate personalized client websites using AI.

## Scripts Overview

### 1. `process-logo.js`
Downloads and processes client logos from URLs.

**Features:**
- Downloads logos from any URL with redirect support
- Generates multiple format variants (PNG, ICO, different sizes)
- Extracts dominant colors for theme generation
- Creates organized asset structure
- Handles errors and timeouts gracefully

**Usage:**
```bash
node scripts/process-logo.js --logo-url "https://example.com/logo.png" --client-name "acme-corp"
```

**Outputs:**
- `public/images/clients/{client-name}/logo.png` - Main logo
- `public/images/clients/{client-name}/logo-*.png` - Size variants
- `public/images/clients/{client-name}/favicon.*` - Favicon formats
- `temp/extracted_colors.json` - Color palette data

### 2. `generate-theme.py`
Uses Claude API to generate personalized website content and themes.

**Features:**
- AI-powered content generation tailored to business/industry
- Custom CSS theme generation based on extracted logo colors
- Complete client configuration creation
- Industry-specific messaging and design patterns
- SEO-optimized content and metadata

**Usage:**
```bash
python scripts/generate-theme.py \
  --business-name "Acme Corporation" \
  --industry "Technology" \
  --contact-email "contact@acme.com" \
  --client-name "acme-corp" \
  --logo-colors "$(cat temp/extracted_colors.json)"
```

**Outputs:**
- `src/config/clients/{client-name}.js` - Complete client configuration
- Appends to `src/styles/client-themes.css` - Custom theme CSS
- `src/config/clients/{client-name}-metadata.json` - Generation metadata

### 3. `create-client-page.js`
Creates the Astro page files for the generated client.

**Features:**
- Generates main client page with all sections
- Creates brand assets showcase page
- Implements proper theme integration
- Sets up client-specific directory structure

**Usage:**
```bash
node scripts/create-client-page.js --client-name "acme-corp"
```

**Outputs:**
- `src/pages/clients/{client-name}/index.astro` - Main client page
- `src/pages/clients/{client-name}/assets.astro` - Brand assets page
- `src/pages/clients/{client-name}/README.md` - Client documentation

### 4. `optimize-images.js`
Advanced image processing and optimization utilities.

**Features:**
- Responsive image variant generation
- Favicon creation in multiple formats
- Open Graph image generation
- Color palette extraction
- Image compression and optimization

**Usage:**
```bash
node scripts/optimize-images.js \
  --input-image "temp/downloaded_logo.png" \
  --client-name "acme-corp" \
  --business-name "Acme Corporation"
```

**Note:** This script provides a framework for image optimization. In production, it should be enhanced with Sharp.js for actual image processing.

## Dependencies

### Node.js Dependencies
The scripts use built-in Node.js modules:
- `fs/promises` - File system operations
- `https/http` - HTTP requests for logo downloads
- `path` - Path manipulation
- `stream/promises` - Stream handling

### Python Dependencies
Install with: `pip install anthropic pillow requests beautifulsoup4`

- `anthropic` - Claude API client
- `pillow` - Image processing (future enhancement)
- `requests` - HTTP requests
- `beautifulsoup4` - HTML parsing (future enhancement)

## Environment Variables

Required for the GitHub Actions workflow:

```bash
ANTHROPIC_API_KEY=your_claude_api_key_here
STATUS_WEBHOOK_URL=https://your-webhook-url.com/status (optional)
GITHUB_TOKEN=automatically_provided_by_github_actions
```

## Workflow Integration

These scripts are orchestrated by the GitHub Actions workflow in `.github/workflows/generate-client-site.yml`:

1. **Setup**: Install dependencies and configure environment
2. **Logo Processing**: Download and process logo (`process-logo.js`)
3. **AI Generation**: Generate content and theme (`generate-theme.py`)
4. **Page Creation**: Create client pages (`create-client-page.js`)
5. **Commit & PR**: Create pull request with generated content

## Error Handling

All scripts include comprehensive error handling:
- Network timeouts and retries
- File system errors
- API rate limits and failures
- Invalid input validation
- Graceful fallbacks

## Testing

To test the scripts individually:

```bash
# Test logo processing
mkdir -p temp public/images/clients/test
node scripts/process-logo.js \
  --logo-url "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" \
  --client-name "test"

# Test theme generation (requires ANTHROPIC_API_KEY)
export ANTHROPIC_API_KEY="your-key-here"
python scripts/generate-theme.py \
  --business-name "Test Business" \
  --industry "Technology" \
  --contact-email "test@example.com" \
  --client-name "test" \
  --logo-colors '{"primary": "#2563eb", "secondary": "#64748b", "accent": "#f59e0b"}'

# Test page creation
node scripts/create-client-page.js --client-name "test"
```

## Production Enhancements

For production deployment, consider:

1. **Image Processing**: Replace simulated image processing with Sharp.js
2. **Color Extraction**: Implement proper color palette extraction
3. **Error Reporting**: Enhanced logging and error tracking
4. **Rate Limiting**: Implement proper API rate limiting
5. **Caching**: Add caching for repeated requests
6. **Validation**: Stricter input validation and sanitization
7. **Monitoring**: Add performance metrics and monitoring

## Security Considerations

- All user inputs are sanitized before processing
- File paths are validated to prevent directory traversal
- API keys are handled securely through environment variables
- Webhook URLs are validated before making requests
- Generated content is validated before writing to files

## Support

For issues or questions about these scripts:
1. Check the GitHub Actions logs for detailed error information
2. Review the generated metadata files for debugging
3. Test scripts individually with sample data
4. Refer to the main project documentation