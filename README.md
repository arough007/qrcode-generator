# QR Code Generator

A modern, responsive TypeScript web application for generating customizable QR codes with color options and transparency support.

## Features

- 🎨 **Customizable Colors**: Choose any color for the QR code and background
- 🔍 **Transparent Background**: Option to use transparent backgrounds
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices with optimized layouts
- ⚡ **Real-time Preview**: See changes as you type with debounced updates
- 💾 **Download Support**: Save QR codes as PNG images with smart button states
- 📇 **vCard Support**: Generate QR codes for contact information
- ⚙️ **Advanced Settings Modal**: Configurable error correction, size, margin, and quality in a centered modal
- 🛡️ **Error Boundary**: Graceful error handling and recovery
- 🚀 **Fast & Modern**: Built with TypeScript and Vite
- 👻 **Skeleton Placeholder**: Visual QR code placeholder with blur effect while editing
- 🖥️ **Desktop Optimized**: Two-column layout for better desktop experience
- 🎯 **Smart UX**: Disabled states, tooltips, and smooth transitions

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **QRCode Library** - Reliable QR code generation
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
4. **Download**: Click "Download QR Code" to save as PNG

### Contact (vCard) QR Codes
1. **Select Type**: Choose "Contact (vCard)" from the dropdown
2. **Fill Details**: Enter contact information (name, phone, email, etc.)
3. **Customize**: Adjust colors and QR settings as needed
4. **Download**: Save the contact QR code

### Customization Options
- **Colors**: Select QR code and background colors, or enable transparency
- **Advanced Settings Modal**: Configure error correction level, size (200-600px), margin, and quality in a centered modal with backdrop blur
- **Real-time Preview**: Changes update automatically with a 500ms debounce
- **Skeleton Placeholder**: Blurred QR code placeholder shows while editing
- **Smart Download**: Button is disabled when no QR code is generated, with helpful tooltips

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

This project includes a comprehensive test suite with 47 tests covering:

- **Component Tests**: All React components are thoroughly tested
- **Hook Tests**: Custom hooks like `useDebounce` are fully covered
- **Integration Tests**: End-to-end component interactions
- **User Interaction Tests**: Realistic user behavior simulation
- **Modal Functionality**: Advanced settings modal behavior and accessibility

The test suite uses Vitest and React Testing Library for fast, reliable testing with excellent developer experience.

## Architecture

This project follows modern React best practices with a well-organized, maintainable codebase:

### 📁 **Modular Structure**
- **Components**: Organized by feature with reusable UI components
- **Hooks**: Custom hooks for state management and side effects
- **Utils**: Pure utility functions for business logic
- **Constants**: Centralized configuration and magic number elimination
- **Types**: Comprehensive TypeScript interfaces and type safety
- **Responsive Layouts**: Desktop-optimized two-column layout with smooth transitions

### 🏗️ **Key Patterns**
- **Custom Hooks**: `useFormState`, `useQRCode`, `useDebounce`
- **Error Boundaries**: Graceful error handling and recovery
- **Modular CSS**: Component-based stylesheets for maintainability
- **Type Safety**: Enhanced TypeScript with specific types and validation
- **Separation of Concerns**: Clear boundaries between UI, logic, and data
- **Component Splitting**: InputControls and SettingsControls for better organization
- **Modal Architecture**: Centered modal with overlay and backdrop blur effects

## User Experience Features

### Desktop Layout
- **Two-Column Design**: Controls on the left, QR display and settings on the right
- **Responsive Breakpoints**: Smooth transitions between desktop, tablet, and mobile layouts
- **Optimized Space Usage**: Better utilization of horizontal screen space

### Smart Interactions
- **Skeleton Placeholder**: Blurred dummy QR code shows the expected size while editing
- **Modal Settings**: Advanced settings open in a centered modal with backdrop blur
- **Disabled States**: Download button is disabled with helpful tooltips when no QR code exists
- **Smooth Animations**: Fade-in effects and scale animations for better user feedback

### Mobile Optimization
- **Reordered Layout**: QR display appears first on mobile for better UX
- **Touch-Friendly**: Modal and controls optimized for touch interactions
- **Responsive Modal**: Settings modal adapts to smaller screens automatically

## QR Code Options

The application supports various QR code features:

- **Error Correction**: Configurable levels (L/M/Q/H) with 7-30% damage resistance
- **Output Format**: PNG with configurable quality (10-100%)
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
- Inspired by modern web design principles
