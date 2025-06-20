# QR Code Generator - Development Documentation

This document contains detailed technical information for developers working with the QR Code Generator.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Export Formats](#export-formats)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Architecture](#architecture)
- [User Experience Features](#user-experience-features)
- [QR Code Options](#qr-code-options)
- [Browser Support](#browser-support)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/arough007/qrcode-generator.git
cd qrcode-generator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage Guide

### Text QR Codes

1. **Select Type**: Choose "Text" from the dropdown
2. **Enter Text**: Type or paste any text, URL, or data you want to encode
3. **Customize**: Use color controls and advanced settings
4. **Export**: Choose your preferred format (PNG, JPEG, SVG, PDF) and download

### Contact (vCard) QR Codes

1. **Select Type**: Choose "Contact (vCard)" from the dropdown
2. **Fill Details**: Enter contact information (name, phone, email, etc.)
3. **Customize**: Adjust colors and QR settings as needed
4. **Export**: Save the contact QR code in your preferred format

### Customization Options

- **Colors**: Select QR code and background colors, or enable transparency
- **Advanced Settings Modal**: Configure error correction level, size (200-600px), margin, and quality
- **Export Formats**: Choose from PNG, JPEG, SVG, or PDF based on your needs
- **Real-time Preview**: Changes update automatically with a 500ms debounce

## Export Formats

- **PNG**: Best for web usage and high-quality images
- **JPEG**: Compressed format for smaller file sizes
- **SVG**: Vector format perfect for print and scalable graphics
- **PDF**: Professional document format, centered on A4 page

### Technical Implementation

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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run test suite in watch mode
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Run tests with coverage report
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Testing

This project includes a comprehensive test suite with **42 tests** covering:

- **Component Tests**: All React components are thoroughly tested
- **Hook Tests**: Custom hooks are fully covered
- **Integration Tests**: End-to-end component interactions
- **User Interaction Tests**: Realistic user behavior simulation
- **Modal Functionality**: Advanced settings modal behavior and accessibility
- **Responsive Layout**: Mobile and desktop layout testing

The test suite uses Vitest and React Testing Library for fast, reliable testing with excellent developer experience.

### Test Files

- `TextInput.test.tsx` (4 tests)
- `QRTypeSelector.test.tsx` (5 tests)
- `ColorControls.test.tsx` (8 tests)
- `QRSettings.test.tsx` (10 tests)
- `QRCodeGenerator.test.tsx` (8 tests - Integration Tests)
- `ResponsiveLayout.test.tsx` (7 tests)

### Running Tests

```bash
# Run all tests once
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Accessibility

This application is built with accessibility as a core principle and meets **WCAG 2.1 AA** compliance standards.

### **WCAG 2.1 AA Compliance**

- High contrast color combinations
- Proper semantic HTML structure
- Comprehensive ARIA attributes
- Keyboard navigation support

### **Focus Management**

- Skip links for quick navigation
- Focus trapping in modals
- Logical tab order
- Visible focus indicators

### **Screen Reader Support**

- Descriptive labels and instructions
- Status updates for dynamic content
- Proper heading hierarchy
- Alternative text for images

### **Accessibility Features Implementation**

#### Skip Navigation

- Skip links in QRCodeGenerator component
- Allows keyboard users to quickly navigate to main content
- WCAG 2.1 AA compliance

#### Focus Management

- Modal focus trapping in QRSettings modal
- Tab order: Logical keyboard navigation throughout the app
- Focus indicators: Visible focus states for all interactive elements

#### ARIA Support

- Semantic HTML: Proper use of headings, sections, and landmarks
- ARIA attributes: Labels, descriptions, and roles where needed
- Screen reader compatibility: Comprehensive screen reader support

## Architecture

This project follows modern React best practices with a well-organized, maintainable codebase:

### 📁 **Modular Structure**

- **Components**: Organized by feature with reusable UI components
- **Hooks**: Custom hooks for state management and side effects (`useFormState`, `useQRCode`, `useModalFocus`)
- **Utils**: Pure utility functions for business logic and export functionality
- **Constants**: Centralized configuration and magic number elimination
- **Types**: Comprehensive TypeScript interfaces and type safety
- **Responsive Layouts**: Desktop-optimized two-column layout with smooth transitions

### 🏗️ **Key Patterns**

- **Custom Hooks**: Encapsulated logic for QR generation, form state, and modal focus
- **Error Boundaries**: Graceful error handling and recovery
- **Modular CSS**: Component-based stylesheets for maintainability
- **Type Safety**: Enhanced TypeScript with specific types and validation
- **Separation of Concerns**: Clear boundaries between UI, logic, and data
- **Accessibility First**: Built-in accessibility features and ARIA support

### Component Architecture

#### QRCodeGenerator (Main Component)

- Orchestrates the entire QR code generation flow
- Manages text input, QR type, vCard data, and color options
- Uses custom hooks for QR code generation and debouncing
- Includes skip navigation links and proper ARIA structure

#### Core Components

- **QRTypeSelector**: Dropdown for Text/URL and vCard modes
- **TextInput**: Textarea for text/URL input with proper labeling
- **VCardForm**: Contact information form with grid layout
- **ColorControls**: Color pickers and transparency options
- **QRCodeDisplay**: QR code display with export options
- **ExportOptions**: Multi-format export interface
- **QRSettings**: Advanced settings modal with focus management

#### Custom Hooks

- **useQRCode**: QR code generation logic with multiple export formats
- **useFormState**: Form state management for text and vCard inputs
- **useModalFocus**: Modal focus management with keyboard navigation

## User Experience Features

### Desktop Layout

- **Two-Column Design**: Controls on the left, QR display and settings on the right
- **Responsive Breakpoints**: Smooth transitions between desktop, tablet, and mobile layouts
- **Optimized Space Usage**: Better utilization of horizontal screen space

### Smart Interactions

- **Skeleton Placeholder**: Blurred dummy QR code shows the expected size while editing
- **Modal Settings**: Advanced settings open in a centered modal with backdrop blur
- **Export Options**: Interactive format selection with descriptions and icons
- **Disabled States**: Smart button states with helpful tooltips
- **Smooth Animations**: Fade-in effects and scale animations for better user feedback

### Mobile Optimization

- **Reordered Layout**: QR display appears first on mobile for better UX
- **Touch-Friendly**: Modal and controls optimized for touch interactions
- **Responsive Modal**: Settings modal adapts to smaller screens automatically

## QR Code Options

The application supports various QR code features:

- **Error Correction**: Configurable levels (L/M/Q/H) with 7-30% damage resistance
- **Output Formats**: PNG, JPEG, SVG, PDF with configurable quality
- **Size**: Adjustable from 200x200 to 600x600 pixels
- **Margin**: Configurable margin (0-4 units)
- **Colors**: Full RGB color support with alpha channel for transparency
- **Types**: Text and vCard (contact information) support

### Error Correction Levels

- **L (Low)**: ~7% damage resistance
- **M (Medium)**: ~15% damage resistance
- **Q (Quartile)**: ~25% damage resistance
- **H (High)**: ~30% damage resistance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Export Format Browser Compatibility

- **PNG/JPEG**: Full support in all modern browsers
- **SVG**: Full support with Canvas2SVG fallback
- **PDF**: Full support via jsPDF library

## Contributing

We welcome contributions to the QR Code Generator! Here's how you can help:

### Guidelines

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow our coding standards
4. **Add tests**: Ensure your changes are well-tested
5. **Run the test suite**: `npm test`
6. **Check code formatting**: `npm run format:check`
7. **Commit your changes**: `git commit -m 'Add amazing feature'`
8. **Push to the branch**: `git push origin feature/amazing-feature`
9. **Open a Pull Request**

### Development Setup

```bash
# Clone your fork
git clone https://github.com/arough007/qrcode-generator.git
cd qrcode-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Check formatting
npm run format:check
```

### Code Standards

- **TypeScript**: All code should be properly typed
- **Testing**: New features should include comprehensive tests
- **Accessibility**: Maintain WCAG 2.1 AA compliance
- **Formatting**: Use Prettier for consistent code formatting
- **Documentation**: Update documentation for new features

### Areas for Contribution

- **New QR Code Types**: WiFi, SMS, Email, etc.
- **Export Enhancements**: Additional formats or quality options
- **UI Improvements**: Better mobile experience or new themes
- **Performance**: Optimization for large QR codes
- **Accessibility**: Further accessibility improvements
- **Internationalization**: Multi-language support

### Reporting Issues

When reporting issues, please include:

- **Description**: Clear description of the problem
- **Steps to Reproduce**: How to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, and version information
- **Screenshots**: If applicable

### Feature Requests

For feature requests, please describe:

- **Use Case**: Why this feature would be useful
- **Proposed Solution**: How you envision it working
- **Alternatives**: Any alternative solutions you've considered

---

## Additional Resources

- **[Main README](./README.md)** - Project overview and quick start
- **[Export Features Documentation](./EXPORT_FEATURES.md)** - Detailed export functionality
- **[Component Documentation](./src/components/README.md)** - Component architecture
- **[Test Documentation](./src/test/test-summary.md)** - Testing strategy and coverage

For questions or support, please [open an issue](https://github.com/arough007/qrcode-generator/issues) on GitHub.
