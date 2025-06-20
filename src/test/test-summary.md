# Test Summary

**42 tests across 6 files** - Vitest + React Testing Library

## Test Coverage

| Component | Tests | Focus |
|-----------|-------|-------|
| `TextInput` | 4 | Input handling, onChange |
| `QRTypeSelector` | 5 | Mode switching, selection |
| `ColorControls` | 8 | Color changes, transparency |
| `QRSettings` | 10 | Modal behavior, A11y, focus |
| `QRCodeGenerator` | 8 | Integration, state management |
| `ResponsiveLayout` | 7 | Mobile/desktop, overflow |

**Custom hooks** tested via component integration

## What's Tested

✅ **Component rendering** - Props, labels, conditional display  
✅ **User interactions** - Form inputs, clicks, modal behavior  
✅ **State management** - Mode switching, settings persistence  
✅ **Accessibility** - ARIA attributes, focus management, keyboard nav  
✅ **Responsive design** - Mobile/desktop layouts, overflow handling  
✅ **Integration** - Component interactions, state flow

## Mocks

- QR library (`qrcode.toCanvas`)
- Canvas API + export libraries (jsPDF, Canvas2SVG) 
- File API + timers + focus methods

## Commands

```bash
npm run test:run      # Run once
npm run test:watch    # Watch mode  
npm run test:coverage # With coverage
npm run check         # All checks
```
