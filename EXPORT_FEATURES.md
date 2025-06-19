# QR Code Export Features

This QR code generator now supports multiple export formats with enhanced functionality to meet various use cases.

## Supported Export Formats

### 1. PNG (Portable Network Graphics)

- **Best for:** Web usage, presentations, and high-quality images
- **Features:**
  - Lossless compression
  - Transparency support
  - High quality
  - Perfect for digital displays
- **File extension:** `.png`

### 2. JPEG (Joint Photographic Experts Group)

- **Best for:** Compressed images, email attachments, and smaller file sizes
- **Features:**
  - Lossy compression (90% quality by default)
  - Smaller file sizes than PNG
  - Widely supported format
  - Good for web optimization
- **File extension:** `.jpg`

### 3. SVG (Scalable Vector Graphics)

- **Best for:** Print materials, logos, and scalable graphics
- **Features:**
  - Vector format - infinitely scalable
  - Perfect for print at any size
  - Small file sizes for simple graphics
  - Professional printing quality
  - Editable in vector graphics software
- **File extension:** `.svg`

### 4. PDF (Portable Document Format)

- **Best for:** Professional documents, print-ready materials, and sharing
- **Features:**
  - Document format ready for printing
  - Centered on A4 page size
  - Professional presentation
  - Universal compatibility
  - Perfect for business cards, flyers, and documents
- **File extension:** `.pdf`

## Technical Implementation

### Libraries Used

1. **jsPDF** - For PDF generation

   - Widely used library with 28k+ GitHub stars
   - Excellent browser compatibility
   - Professional PDF creation capabilities

2. **Canvas2SVG** - For SVG export

   - Converts HTML5 Canvas to SVG format
   - Maintains vector quality
   - Lightweight and efficient

3. **Canvas API** - For PNG/JPEG export
   - Native browser support
   - High-quality raster image generation
   - Built-in compression options

### Export Process

The export system works by:

1. **Canvas Generation**: QR codes are generated on HTML5 Canvas using the `qrcode` library
2. **Format Conversion**: Based on the selected format, the canvas is converted using appropriate methods:
   - PNG/JPEG: Canvas `toDataURL()` method
   - SVG: Canvas2SVG library for vector conversion
   - PDF: jsPDF library with image embedding
3. **Download Trigger**: Browser download API initiates file download

### File Naming Convention

- **Text QR codes**: `qrcode.[extension]`
- **vCard QR codes**: `contact-qrcode.[extension]`

## User Interface

### Export Options Component

The new export interface includes:

- **Format Selector**: Dropdown to choose export format
- **Format Description**: Helpful text explaining each format's use case
- **Visual Format Grid**: Interactive cards showing format options with icons
- **Download Button**: Dynamic button that updates based on selected format

### Accessibility Features

- Keyboard navigation support
- Screen reader compatible
- Clear visual feedback for selected formats
- Disabled states when no QR code is available

## Browser Compatibility

### Supported Browsers

- **Chrome**: Full support for all formats
- **Firefox**: Full support for all formats
- **Safari**: Full support for all formats
- **Edge**: Full support for all formats

### Fallback Handling

- If SVG export fails, automatically falls back to PNG
- Error handling for cross-origin issues
- Graceful degradation for older browsers

## Performance Considerations

### File Sizes (Typical 300x300px QR Code)

- **PNG**: ~2-5 KB (depending on complexity)
- **JPEG**: ~1-3 KB (90% quality)
- **SVG**: ~1-2 KB (vector format)
- **PDF**: ~5-10 KB (includes document structure)

### Loading Performance

- Libraries are loaded dynamically only when needed
- Canvas2SVG is loaded on-demand for SVG exports
- No performance impact on initial page load

## Advanced Features

### PDF Customization

- Automatic centering on A4 page
- Optimal sizing (60% of page width)
- Portrait orientation
- High-quality image embedding

### SVG Quality

- Maintains vector quality for infinite scalability
- Preserves original QR code proportions
- Compatible with design software (Adobe Illustrator, Inkscape)

### Error Handling

- Graceful error recovery
- User-friendly error messages
- Automatic fallback options
- Console logging for debugging

## Future Enhancements

Potential future improvements:

1. **Custom PDF Layouts**: Multiple page sizes and orientations
2. **Batch Export**: Export multiple formats simultaneously
3. **Quality Settings**: User-adjustable quality for JPEG exports
4. **Custom Branding**: Add watermarks or headers to PDFs
5. **Vector QR Generation**: Native SVG QR code generation
6. **Additional Formats**: WebP, TIFF, and other formats

## Development Notes

### Adding New Export Formats

To add a new export format:

1. Update the `DownloadFormat` type in `src/types/index.ts`
2. Add format handling in `src/utils/export.ts`
3. Update the format list in `src/components/ExportOptions.tsx`
4. Add appropriate icons and descriptions

### Code Structure

```
src/
├── utils/export.ts          # Main export functionality
├── components/
│   └── ExportOptions.tsx    # Export UI component
├── types/index.ts           # Type definitions
└── styles/components/
    └── export-options.css   # Export component styles
```

## Troubleshooting

### Common Issues

1. **PDF appears blank**: Check for canvas CORS issues
2. **SVG export fails**: Falls back to PNG automatically
3. **Large file sizes**: Consider JPEG format for size optimization
4. **Cross-origin errors**: Ensure images are from same domain or properly configured

### Browser-Specific Notes

- **Safari**: May require user interaction for downloads
- **Firefox**: Full support with no known issues
- **Chrome**: Excellent performance and compatibility
- **Edge**: Works well with all formats

This export system provides professional-grade QR code generation with multiple format options to suit any use case, from web display to high-quality printing.
