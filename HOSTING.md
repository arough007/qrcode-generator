# 🚀 Self-Hosting Guide

Want to host your own version of the QR Code Generator? Here are several options:

## 🌐 Static Hosting (Recommended)

Since this is a client-side React app, you can host it on any static hosting service:

### Vercel (Free)

1. Fork this repository
2. Connect your GitHub account to [Vercel](https://vercel.com)
3. Import your forked repository
4. Deploy automatically ✨

### Netlify (Free)

1. Fork this repository
2. Connect to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### GitHub Pages (Free)

1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"
4. The included workflow will build and deploy automatically

## 🐳 Docker Hosting

### Using Docker Compose

```bash
git clone https://github.com/yourusername/qrcode.git
cd qrcode
docker-compose up -d
```

Access at `http://localhost:8080`

### Using Docker directly

```bash
# Build the image
docker build -t qrcode-generator .

# Run the container
docker run -p 8080:80 qrcode-generator
```

## 🖥️ VPS/Server Hosting

### Using the deploy script

1. Clone the repository on your server
2. Make the deploy script executable: `chmod +x deploy.sh`
3. Run: `./deploy.sh`
4. Set up a reverse proxy (nginx/Apache) to serve the `dist` folder

### Manual deployment

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Serve the dist folder with your preferred web server
```

## ⚙️ Configuration

The app works out of the box with no configuration needed. All QR code generation happens client-side, so no server-side setup is required.

## 🔧 Customization

- Modify colors and styling in `src/styles/`
- Add new QR code types in `src/components/QRTypeSelector.tsx`
- Customize export formats in `src/components/ExportOptions.tsx`

## 📝 Notes

- No database or backend required
- All processing happens in the browser
- Works offline after initial load
- Mobile-responsive design included
