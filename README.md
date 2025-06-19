# QR Code Generator

A modern, responsive TypeScript web application for generating customizable QR codes with color options and transparency support.

## Features

- 🎨 **Customizable Colors**: Choose any color for the QR code and background
- 🔍 **Transparent Background**: Option to use transparent backgrounds
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- ⚡ **Real-time Preview**: See changes as you type
- 💾 **Download Support**: Save QR codes as PNG images
- 🚀 **Fast & Modern**: Built with TypeScript and Vite

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **QRCode Library** - Reliable QR code generation
- **Modern CSS** - Beautiful, responsive design
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

1. **Enter Text**: Type or paste any text, URL, or data you want to encode
2. **Choose Colors**:
   - Select the QR code color using the color picker
   - Choose a background color or enable transparency
3. **Generate**: Click "Generate QR Code" or wait for real-time preview
4. **Download**: Click "Download QR Code" to save as PNG

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run test suite in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report

## Testing

This project includes a comprehensive test suite with 30+ tests covering:

- **Component Tests**: All React components are thoroughly tested
- **Hook Tests**: Custom hooks like `useDebounce` are fully covered
- **Integration Tests**: End-to-end component interactions
- **User Interaction Tests**: Realistic user behavior simulation

The test suite uses Vitest and React Testing Library for fast, reliable testing with excellent developer experience.

## QR Code Options

The application supports various QR code features:

- **Error Correction**: Medium level (15% damage resistance)
- **Output Format**: PNG with high quality
- **Size**: 300x300 pixels with 8x scale
- **Colors**: Full RGB color support with alpha channel for transparency

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
