# AI Generation API Documentation

This document describes how to trigger the AI generation workflow programmatically via GitHub's API.

## Overview

The AI generation workflow can be triggered in two ways:
1. **Manual Trigger**: Through GitHub's web interface
2. **API Trigger**: Programmatically via GitHub's repository dispatch API

## API Endpoint

```
POST /repos/{owner}/{repo}/dispatches
```

**Base URL**: `https://api.github.com`
**Full URL**: `https://api.github.com/repos/WebAsAService/base-template/dispatches`

## Authentication

You need a GitHub Personal Access Token with `repo` scope.

```bash
Authorization: token YOUR_GITHUB_TOKEN
```

## Request Format

### Headers
```
Content-Type: application/json
Accept: application/vnd.github.v3+json
Authorization: token YOUR_GITHUB_TOKEN
```

### Body
```json
{
  "event_type": "generate-client-site",
  "client_payload": {
    "logo_url": "https://example.com/logo.png",
    "business_name": "Acme Corporation",
    "business_description": "Leading provider of innovative solutions",
    "industry": "Technology",
    "target_audience": "Small to medium businesses",
    "services": "Web development, Consulting, Support",
    "contact_email": "contact@acme.com",
    "contact_phone": "+1 (555) 123-4567",
    "website_domain": "https://acme.com",
    "client_name": "acme-corp"
  }
}
```

## Parameters

### Required Parameters
- `logo_url` (string): Direct URL to the business logo image
- `business_name` (string): Full business name for display
- `industry` (string): Industry/business type for content customization
- `contact_email` (string): Primary business email address
- `client_name` (string): Unique identifier (lowercase, no spaces, used for file paths)

### Optional Parameters
- `business_description` (string): Brief business description
- `target_audience` (string): Primary target market/audience
- `services` (string): Comma-separated list of main services/products
- `contact_phone` (string): Business phone number
- `website_domain` (string): Primary website URL

## Example Requests

### cURL Example
```bash
curl -X POST \
  https://api.github.com/repos/WebAsAService/base-template/dispatches \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{
    "event_type": "generate-client-site",
    "client_payload": {
      "logo_url": "https://example.com/logo.png",
      "business_name": "Acme Corporation",
      "industry": "Technology",
      "contact_email": "contact@acme.com",
      "client_name": "acme-corp"
    }
  }'
```

### JavaScript Example
```javascript
const response = await fetch('https://api.github.com/repos/WebAsAService/base-template/dispatches', {
  method: 'POST',
  headers: {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json'
  },
  body: JSON.stringify({
    event_type: 'generate-client-site',
    client_payload: {
      logo_url: 'https://example.com/logo.png',
      business_name: 'Acme Corporation',
      industry: 'Technology',
      contact_email: 'contact@acme.com',
      client_name: 'acme-corp'
    }
  })
});

if (response.ok) {
  console.log('Workflow triggered successfully');
} else {
  console.error('Failed to trigger workflow:', await response.text());
}
```

### Python Example
```python
import requests

url = "https://api.github.com/repos/WebAsAService/base-template/dispatches"
headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/vnd.github.v3+json"
}
data = {
    "event_type": "generate-client-site",
    "client_payload": {
        "logo_url": "https://example.com/logo.png",
        "business_name": "Acme Corporation",
        "industry": "Technology",
        "contact_email": "contact@acme.com",
        "client_name": "acme-corp"
    }
}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 204:
    print("Workflow triggered successfully")
else:
    print(f"Failed to trigger workflow: {response.status_code} {response.text}")
```

## Response

### Success Response
- **Status Code**: `204 No Content`
- **Body**: Empty

### Error Responses

**401 Unauthorized**
```json
{
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest"
}
```

**404 Not Found**
```json
{
  "message": "Not Found",
  "documentation_url": "https://docs.github.com/rest"
}
```

**422 Unprocessable Entity**
```json
{
  "message": "Validation Failed",
  "errors": [
    {
      "resource": "RepositoryDispatch",
      "code": "invalid",
      "field": "event_type"
    }
  ]
}
```

## Webhook Status Updates

If you provide a `STATUS_WEBHOOK_URL` secret in your repository, the workflow will send status updates to that URL during the generation process.

### Webhook Payload Format
```json
{
  "status": "started|logo_processed|content_generated|pr_created|completed|failed",
  "client_name": "acme-corp",
  "message": "Human-readable status message",
  "timestamp": "2025-08-29T00:00:00Z",
  "workflow_run": "123456789",
  "repository": "WebAsAService/base-template",
  "pr_url": "https://github.com/repo/pulls/123" // (only for pr_created and completed)
}
```

### Status Types
1. `started` - Workflow initiated
2. `logo_processed` - Logo downloaded and optimized
3. `content_generated` - AI content created
4. `pr_created` - Pull request created
5. `completed` - Process finished successfully
6. `failed` - Process failed (includes error details)

## Client Name Guidelines

The `client_name` parameter is used for file paths and must follow these rules:
- Lowercase only
- No spaces (use hyphens instead)
- Alphanumeric characters and hyphens only
- Must be unique per client
- Used for URLs: `/clients/{client_name}/`

Examples:
- ✅ `acme-corp`
- ✅ `local-business-123`
- ✅ `startup-xyz`
- ❌ `Acme Corp` (has spaces and uppercase)
- ❌ `acme_corp` (underscore not recommended)
- ❌ `acme corp!` (special characters)

## Industry-Specific Behavior

The AI generation adapts content and styling based on the industry:

- **Technology/Software**: Modern fonts, blue color schemes, technical terminology
- **Finance/Legal**: Conservative styling, professional colors, trust-building language
- **Healthcare/Medical**: Clean design, calming colors, reassuring copy
- **Creative/Design**: Bold styling, vibrant colors, artistic fonts
- **Retail/E-commerce**: Conversion-focused design, warm colors, action-oriented copy

## Rate Limits

GitHub API rate limits apply:
- **Authenticated requests**: 5,000 per hour
- **Repository dispatch**: No specific limit beyond general API limits

## Monitoring Workflow Runs

After triggering the workflow, you can monitor its progress:

1. **GitHub Actions Tab**: `https://github.com/WebAsAService/base-template/actions`
2. **API Endpoint**: `GET /repos/WebAsAService/base-template/actions/runs`
3. **Webhook Updates**: If configured, status updates will be sent to your webhook URL

## Error Handling

The workflow includes comprehensive error handling:

1. **Logo Download Failures**: Invalid URLs, network timeouts, unsupported formats
2. **AI Generation Errors**: API rate limits, invalid responses, token limits
3. **File System Errors**: Permission issues, disk space, invalid paths
4. **Git Operations**: Merge conflicts, authentication issues

Errors are reported via:
- GitHub Actions logs
- Webhook notifications (if configured)
- Pull request comments (for partial successes)

## Best Practices

1. **Logo URLs**: Use direct links to image files (PNG, JPG, SVG)
2. **Business Names**: Keep under 50 characters for optimal display
3. **Client Names**: Use consistent naming conventions
4. **Contact Info**: Provide valid email addresses for generated contact forms
5. **Services**: List 3-6 main services for best AI optimization
6. **Webhooks**: Use HTTPS URLs with proper SSL certificates

## Example Integration

For a complete integration example, see the WaaS platform implementation in the `examples/` directory.