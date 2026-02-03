# Open Graph Image Guide

## Requirements
- **Dimensions**: 1200x630 pixels (Facebook/LinkedIn recommended)
- **Format**: JPEG or PNG
- **File size**: < 1 MB (ideally < 300 KB)
- **Location**: `public/og-image.jpg`

## Design Tips
1. Include your logo/brand name prominently
2. Use high-contrast text overlays
3. Avoid small text (will be hard to read in previews)
4. Test on multiple platforms (Facebook, Twitter, LinkedIn)

## Creating Your OG Image
You can create an OG image using:
- Canva (use their "Open Graph" template)
- Figma (export at 2x for retina displays, then scale down)
- Photoshop or similar tools

## Testing
Use these tools to preview how your OG image will appear:
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Current State
The site references `/og-image.jpg` but the file doesn't exist yet.

**Action needed**: Create and add `public/og-image.jpg` with dimensions 1200x630px.
