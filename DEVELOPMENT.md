# Development Guide

Technical documentation for developers working on the QR Code Generator.

**Stack**: TypeScript, React, Vite  
**Testing**: Vitest, React Testing Library (42 tests)  
**Accessibility**: WCAG 2.1 AA compliant

## Quick Start

**Prerequisites**: Node.js 16+

```bash
git clone https://github.com/arough007/qrcode-generator.git
cd qrcode-generator
npm install
npm run dev  # Opens http://localhost:3000
```

## Features

**QR Types**: Text/URL and vCard (contact info)  
**Customization**: Colors, transparency, size (200-600px), error correction  
**Export**: PNG, JPEG, SVG, PDF with smart naming  
**Real-time**: 500ms debounced preview updates  

See [Export Formats Guide](./EXPORT_FEATURES.md) for format details.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run check` | **All checks** (types + format + tests) |
| `npm run test:run` | Run tests once |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:coverage` | Tests with coverage |
| `npm run format` | Format with Prettier |

## Testing

**42 tests** using Vitest + React Testing Library covering components, hooks, integration, accessibility, and responsive behavior.

See [Test Summary](./src/test/test-summary.md) for detailed coverage.

```bash
npm run test:run      # Run once  
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

## Accessibility 

**WCAG 2.1 AA compliant** with comprehensive a11y features:

✅ **Navigation**: Skip links, focus trapping, logical tab order  
✅ **Screen readers**: ARIA attributes, semantic HTML, descriptive labels  
✅ **Visual**: High contrast colors, visible focus indicators  
✅ **Keyboard**: Full keyboard navigation support

## Architecture

Modern React patterns with TypeScript, custom hooks, and accessibility-first design.

**Structure**: Components, hooks (`useQRCode`, `useFormState`, `useModalFocus`), utils, types  
**Patterns**: Single responsibility, error boundaries, modular CSS, type safety  
**Layout**: Responsive two-column desktop, mobile-first mobile

See [Component Architecture](./src/components/README.md) for detailed component docs.

## Configuration

**QR Settings**: Error correction (L/M/Q/H), size (200-600px), margin (0-4), colors  
**Formats**: PNG, JPEG, SVG, PDF with quality controls  
**Browser Support**: All modern browsers with graceful fallbacks

## Contributing

**Process**: Fork → Feature branch → Tests → `npm run check` → PR

**Standards**: TypeScript, comprehensive tests, WCAG 2.1 AA, Prettier formatting

**Areas**: New QR types (WiFi, SMS), export formats, UI/UX, performance, a11y, i18n

**Issues**: Include description, reproduction steps, environment, screenshots

---

**Docs**: [Main README](./README.md) • [Export Features](./EXPORT_FEATURES.md) • [Components](./src/components/README.md) • [Tests](./src/test/test-summary.md)
