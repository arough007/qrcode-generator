# QR Code Generator

A modern, accessible TypeScript web application for generating customizable QR codes with multiple export formats and comprehensive accessibility features.

## Features

### 🎨 **Core Functionality**
- **Customizable Colors**: Choose any color for the QR code and background
- **Transparent Background**: Option to use transparent backgrounds
- **Real-time Preview**: See changes as you type with debounced updates
- **vCard Support**: Generate QR codes for contact information
- **Advanced Settings Modal**: Configurable error correction, size, margin, and quality

### 📱 **User Experience**
- **Responsive Design**: Works perfectly on desktop and mobile devices with optimized layouts
- **Desktop Optimized**: Two-column layout for better desktop experience
- **Skeleton Placeholder**: Visual QR code placeholder with blur effect while editing
- **Smart UX**: Disabled states, tooltips, and smooth transitions
- **Error Boundary**: Graceful error handling and recovery

### 💾 **Export Options**
- **Multiple Formats**: PNG, JPEG, SVG, and PDF export support
- **Format Selection**: Interactive format cards with descriptions
- **Smart Naming**: Automatic file naming based on QR code type
- **Professional Quality**: Optimized output for each format

### ♿ **Accessibility Features**
- **WCAG 2.1 AA Compliant**: Meets accessibility guidelines
- **Skip Navigation**: Skip links for keyboard navigation
- **Focus Management**: Proper focus trapping in modals
- **Screen Reader Support**: Full ARIA attributes and semantic HTML
- **Keyboard Navigation**: Complete keyboard accessibility
- **High Contrast**: Accessible color combinations

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **QRCode Library** - Reliable QR code generation
- **jsPDF** - Professional PDF generation
- **Canvas2SVG** - Vector SVG export
- **Modern CSS** - Beautiful, responsive design with backdrop filters
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

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

## Accessibility

This application is built with accessibility as a core principle:

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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

The GPL v3 is a copyleft license that guarantees end users the freedom to run, study, share, and modify the software.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Acknowledgments

- Built with the excellent [node-qrcode](https://www.npmjs.com/package/qrcode) library
- Export functionality powered by [jsPDF](https://github.com/parallax/jsPDF) and [Canvas2SVG](https://github.com/gliffy/canvas2svg)
- Inspired by modern web design and accessibility principles
