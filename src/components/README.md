# Component Architecture

Modern React components with TypeScript, accessibility, and testing built-in.

## Components

### Core Components

- **QRCodeGenerator** - Main orchestrator with state management
- **QRTypeSelector** - Text/vCard mode switcher
- **TextInput** - Text/URL input with debouncing
- **VCardForm** - Contact form with grid layout
- **ColorControls** - Color pickers + transparency
- **QRCodeDisplay** - QR preview + export integration
- **ExportOptions** - Multi-format export (PNG/JPEG/SVG/PDF)
- **QRSettings** - Advanced settings modal
- **Controls** - Layout container for inputs
- **ErrorBoundary** - React error handling

## Custom Hooks

- **useQRCode** - QR generation + canvas management + export logic
- **useFormState** - Form state for text/vCard inputs with type safety
- **useModalFocus** - A11y focus management for modals (trap, restore, escape)

## Key Patterns

**🎯 Single Responsibility**: Each component has one clear purpose  
**♿ Accessibility First**: WCAG 2.1 AA compliance built-in  
**🧪 Testing**: 42 tests covering components, hooks, and interactions  
**📱 Responsive**: Desktop/mobile layouts with CSS Grid/Flexbox  
**⚡ Performance**: Debounced updates, optimized renders

## Testing

All components tested with Vitest + React Testing Library:

- Unit tests for individual components
- Integration tests for component interactions
- Accessibility tests for ARIA/keyboard navigation
- Responsive layout tests

Run tests: `npm run test:run`
