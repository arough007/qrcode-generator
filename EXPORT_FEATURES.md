# Export Formats

QR codes can be exported in 4 formats optimized for different use cases.

## Formats

| Format | Best for | File size | Quality |
|--------|----------|-----------|---------|
| **PNG** | Web, presentations | 2-5 KB | Lossless, transparent |
| **JPEG** | Email, optimization | 1-3 KB | 90% quality, compressed |
| **SVG** | Print, logos, scaling | 1-2 KB | Vector, infinite scale |
| **PDF** | Documents, business cards | 5-10 KB | A4 centered, professional |

## Implementation

**Libraries**: jsPDF (PDF), Canvas2SVG (SVG), Canvas API (PNG/JPEG)  
**Process**: Canvas generation → Format conversion → Browser download  
**Naming**: `qrcode.ext` (text) / `contact-qrcode.ext` (vCard)

## Browser Support

✅ **All modern browsers** (Chrome, Firefox, Safari, Edge)  
⚠️ **Fallbacks**: SVG → PNG if export fails  
🔄 **Error handling**: Graceful degradation + user feedback

## Development

### Adding New Formats

1. Update `DownloadFormat` type in `src/types/index.ts`
2. Add handling in `src/utils/export.ts` 
3. Update UI in `src/components/ExportOptions.tsx`

### Files

```
src/utils/export.ts           # Export logic
src/components/ExportOptions.tsx  # Export UI  
src/types/index.ts           # Types
```

- **Safari**: May require user interaction for downloads
- **Firefox**: Full support with no known issues
- **Chrome**: Excellent performance and compatibility
- **Edge**: Works well with all formats

This export system provides professional-grade QR code generation with multiple format options to suit any use case, from web display to high-quality printing.
