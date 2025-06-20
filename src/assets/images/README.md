# QR Code Assets

## Dummy QR Code Image

✅ **CONFIGURED**: The dummy QR code image is properly placed in `public/assets/images/dummy-qr.png`.

This image is used as a skeleton placeholder with blur effect while users are editing their QR code input, providing visual feedback about the expected QR code size and position.

### Current Implementation:

- **Filename**: `dummy-qr.png` ✅
- **Location**: `public/assets/images/dummy-qr.png` ✅
- **Format**: PNG with transparency support ✅
- **Size**: Optimized for web usage ✅
- **Usage**: Blurred placeholder in QR code display area ✅

### Purpose:

- **Visual Feedback**: Shows users where the QR code will appear
- **Size Reference**: Demonstrates the expected QR code dimensions
- **Smooth UX**: Provides visual continuity while QR code is generating
- **Loading State**: Indicates the QR code generation area

### Technical Details:

- **Blur Effect**: Applied via CSS `filter: blur()` for skeleton effect
- **Responsive**: Scales appropriately across different screen sizes
- **Accessibility**: Marked with `aria-hidden="true"` as decorative
- **Performance**: Optimized PNG for fast loading

### Fallback Behavior:

If the image fails to load, the component gracefully falls back to a simple geometric pattern, ensuring the user experience remains smooth regardless of network conditions.

### Integration:

The image is automatically served by Vite from the public folder and integrated into the QRCodeDisplay component as part of the skeleton loading state.
