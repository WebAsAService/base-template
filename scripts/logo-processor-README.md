# Logo Processing Pipeline

Automated logo processing system that generates multiple sizes, formats, and extracts dominant colors for AI theme generation.

## Features

- 📥 **Download & Validation**: Downloads logos from URLs with validation
- 🖼️ **Multiple Formats**: Generates PNG, WebP, and ICO formats
- 📏 **Size Variants**: Creates all required sizes from 16x16 to 512x512
- 🎨 **Color Extraction**: Extracts dominant colors for theme generation
- 🌙 **Dark Mode Support**: Generates dark theme variants automatically
- 🚀 **Performance**: Optimized compression and web-ready formats
- ⚡ **Error Handling**: Comprehensive error handling with fallbacks

## Installation

```bash
yarn add sharp node-vibrant png-to-ico
```

## Usage

### Command Line

```bash
node scripts/process-logo.js --url <LOGO_URL> [options]
```

#### Options

- `--url, --logo-url` - URL of the logo to process (required)
- `--output` - Output directory (default: `public/images`)
- `--client` - Client name for organizing files
- `--extract-colors` - Output file for extracted colors JSON

#### Examples

```bash
# Basic usage
node scripts/process-logo.js --url https://example.com/logo.png

# With client organization
node scripts/process-logo.js \
  --url https://example.com/logo.png \
  --client acme-corp \
  --output public/images

# Extract colors for theme generation
node scripts/process-logo.js \
  --url https://example.com/logo.png \
  --client acme-corp \
  --extract-colors colors.json
```

### Programmatic API

```javascript
import { LogoProcessor } from './scripts/process-logo.js';

const processor = new LogoProcessor({
  outputDir: 'public/images',
  tempDir: 'temp',
  maxFileSize: 10 * 1024 * 1024 // 10MB
});

const result = await processor.processLogo(logoUrl, clientName);

if (result.success) {
  console.log('Files generated:', result.files);
  console.log('Colors extracted:', result.colors);
} else {
  console.error('Processing failed:', result.error);
}
```

## Output Structure

### File Structure

```
public/images/
├── logo.png              # 200x200 main logo
├── logo-small.png        # 64x64 header logo
├── logo-large.png        # 400x400 high-res display
├── logo-dark.png         # Dark theme variant
├── logo-dark-bg.png      # Dark variant with background
├── logo.webp             # WebP optimized version
├── logo-large.webp       # Large WebP version
├── favicon/
│   ├── favicon.ico       # Multi-size ICO format
│   ├── favicon.png       # 32x32 PNG
│   ├── favicon-16x16.png # 16x16 small favicon
│   ├── apple-touch-icon.png     # 180x180 iOS
│   ├── android-chrome-192x192.png # Android Chrome
│   └── android-chrome-512x512.png # Android large
└── colors.json           # Extracted color data
```

### Color Data Format

```json
{
  "dominantColors": [
    "#3b82f6",
    "#1e40af",
    "#60a5fa",
    "#6b7280",
    "#9ca3af"
  ],
  "palette": {
    "primary": "#3b82f6",
    "secondary": "#1e40af",
    "accent": "#60a5fa",
    "neutral": "#6b7280"
  },
  "brightness": "light",
  "contrast": "high",
  "raw": {
    "vibrant": "#3b82f6",
    "darkVibrant": "#1e40af",
    "lightVibrant": "#60a5fa",
    "muted": "#6b7280",
    "darkMuted": "#374151",
    "lightMuted": "#9ca3af"
  }
}
```

## GitHub Actions Integration

```yaml
- name: Process Logo
  run: |
    node scripts/process-logo.js \
      --url "${{ inputs.logo_url }}" \
      --client "${{ inputs.client_name }}" \
      --extract-colors "colors.json"

- name: Use extracted colors for theme generation
  run: |
    python scripts/generate-theme.py \
      --colors colors.json \
      --client "${{ inputs.client_name }}"
```

See `scripts/process-logo-example.yml` for a complete workflow example.

## Testing

Run the test suite to verify functionality:

```bash
node scripts/test-logo-processor.js
```

The test script will:
- Process multiple test logos
- Verify file generation
- Test error handling
- Validate color extraction
- Check GitHub Actions integration format

## Error Handling

The processor handles various error scenarios:

- **Invalid URLs**: Returns error with descriptive message
- **Unsupported formats**: Only PNG, JPG, SVG, WebP supported
- **Large files**: Max 10MB file size limit
- **Network timeouts**: 30-second timeout with retry
- **Processing failures**: Falls back to defaults where possible

## Performance

- Processes logos under 10MB in < 30 seconds
- Uses Sharp.js for high-performance image processing
- Memory-efficient streaming for downloads
- Progressive JPEG/PNG optimization
- Parallel processing for multiple variants

## API Reference

### LogoProcessor Class

#### Constructor

```javascript
new LogoProcessor(options)
```

**Options:**
- `outputDir` (string) - Output directory for processed files
- `tempDir` (string) - Temporary directory for processing
- `maxFileSize` (number) - Maximum file size in bytes

#### Methods

##### processLogo(logoUrl, clientName)

Main processing method that orchestrates the entire pipeline.

**Parameters:**
- `logoUrl` (string) - URL of the logo to process
- `clientName` (string, optional) - Client name for organization

**Returns:** Promise<Object>
- `success` (boolean) - Processing success status
- `files` (Array) - List of generated files
- `colors` (Object) - Extracted color data
- `outputPath` (string) - Output directory path
- `error` (string) - Error message if failed

##### extractColors(imagePath)

Extracts dominant colors from an image.

**Parameters:**
- `imagePath` (string) - Path to image file

**Returns:** Promise<Object> - Color data object

##### generateVariants(imagePath, outputDir)

Generates all required size variants.

**Parameters:**
- `imagePath` (string) - Source image path
- `outputDir` (string) - Output directory

**Returns:** Promise<Array> - List of generated files

##### generateDarkVariant(imagePath, outputDir)

Creates dark theme compatible versions.

**Parameters:**
- `imagePath` (string) - Source image path
- `outputDir` (string) - Output directory

## License

MIT