# QR Code Assets

## Dummy QR Code Image

⚠️ **IMPORTANT**: Place the dummy QR code image in `public/assets/images/dummy-qr.png` instead of this folder.

This folder is kept for development assets, but the actual image should be in the public folder so Vite can serve it properly.

### Requirements:

- **Filename**: `dummy-qr.png` (exactly this name)
- **Format**: PNG (recommended for transparency support)
- **Size**: Any size (will be automatically scaled)
- **Content**: A sample QR code that will be blurred and used as a placeholder

### Recommendations:

- Use a square image (1:1 aspect ratio)
- 300x300px or larger for good quality
- Black QR code on white/transparent background
- Can be any QR code content (doesn't matter what it encodes)

### Fallback:

If no `dummy-qr.png` file is found, the component will automatically fall back to a simple geometric pattern.

### Example QR Code Sources:

- Generate one at: https://qr-code-generator.com/
- Use any existing QR code image you have
- Create one with the app itself and save it
