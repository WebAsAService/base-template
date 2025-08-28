# Claude Code Integration Guide

This repository is set up to work with Claude Code automation for issue resolution.

## 🚀 Quick Start

### Method 1: Using @claude mentions
1. Comment on any issue with `@claude [instructions]`
2. The system will automatically respond and start working
3. Claude will create a PR with the implementation

### Method 2: Manual workflow trigger
1. Go to **Actions** tab in GitHub
2. Select **"Claude Code Worker"** workflow
3. Click **"Run workflow"**
4. Enter the issue number and any specific instructions
5. Claude will create a branch and PR with the solution

### Method 3: Use Claude assistance template
1. Create a new issue using the "🤖 Claude Code Assistance" template
2. Fill out the requirements and instructions
3. Tag `@claude` in the issue or trigger the workflow manually

## ⚙️ Setup Requirements

### Environment Variables
Add these secrets to your repository settings:

```bash
ANTHROPIC_API_KEY=sk-ant-...  # Your Claude API key
GITHUB_TOKEN=ghp_...          # GitHub Personal Access Token (automatically provided)
```

### Repository Permissions
The workflows need these permissions:
- `issues: write` - To comment on issues
- `contents: write` - To create branches and commits
- `pull-requests: write` - To create pull requests

## 🎯 How to Use

### For Development Issues
```markdown
@claude implement the dynamic client configuration system as described in the requirements.

Please focus on:
- Creating src/config/client.js
- Adding TypeScript interfaces
- Ensuring proper fallback values
```

### For Bug Fixes
```markdown
@claude fix the theme switching bug described in this issue.

Steps to reproduce are in the description above.
Make sure to test with all existing themes.
```

### For Features
```markdown
@claude add the new services section component.

Requirements:
- Support 2-6 service items
- Include pricing display
- Responsive design
- Use existing theme colors
```

## 🔧 Workflow Details

### Automatic Process
1. **Detection**: Workflows detect @claude mentions in issues/comments
2. **Analysis**: Claude analyzes the issue requirements and context
3. **Implementation**: Creates code changes on a new branch
4. **Testing**: Runs build and test processes
5. **Pull Request**: Creates PR with detailed description
6. **Updates**: Comments on original issue with PR link

### Branch Naming
Claude creates branches with the pattern: `claude/issue-{number}`

### Commit Messages
All commits follow the format:
```
🤖 Claude Code: Work on issue #{number}

{Issue Title}

Generated with Claude Code automation

Co-Authored-By: Claude <claude@anthropic.com>
```

## 📋 Issue Labels

The system recognizes these labels for better context:
- `claude-assistance` - Issues requesting Claude help
- `high-priority` - Urgent issues
- `foundation` - Core system changes
- `dynamic-content` - Component conversion tasks
- `ai-integration` - AI-related features

## 🔍 Monitoring Progress

### Check Status
1. Issue comments show Claude's progress
2. PR descriptions contain implementation details
3. Actions tab shows workflow execution logs

### Quality Assurance
- All changes go through PR review process
- Automated tests run before PR creation
- Manual review recommended before merging

## 🛠️ Troubleshooting

### Common Issues

**Claude doesn't respond to @mentions**
- Check if ANTHROPIC_API_KEY is set in repository secrets
- Verify workflow permissions are correct
- Check Actions tab for error logs

**Workflow fails to create PR**
- Ensure GITHUB_TOKEN has sufficient permissions
- Check if branch already exists
- Verify repository settings allow PR creation

**Changes don't build**
- Claude runs basic validation, but complex issues may need human review
- Check build logs in the PR
- Manual fixes may be needed

### Getting Help
1. Check the Actions logs for detailed error information
2. Review the PR comments for Claude's notes
3. Comment on the issue with specific questions for Claude

## 🎨 Customization

### Modify Workflows
Edit `.github/workflows/claude-*.yml` files to customize:
- Trigger conditions
- Processing steps
- PR templates
- Notification settings

### Add New Triggers
Create additional workflows for specific use cases:
- Code review automation
- Documentation generation
- Test case creation
- Performance optimization

## 📚 Examples

See the issues in this repository for examples of effective Claude interactions:
- Issue #4: Dynamic Client Configuration System
- Issue #7: Hero Section Conversion
- Issue #13: AI Integration Workflow

Each issue demonstrates best practices for communicating requirements to Claude Code.