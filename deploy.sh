#!/bin/bash

# QR Code Generator Deployment Script
# This script builds the application and deploys it to your Hetzner server

set -e  # Exit on any error

echo "🚀 Starting QR Code Generator Deployment..."

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Build the application
echo "📦 Building the application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Deploy with Docker Compose
echo "🐳 Starting Docker containers..."
docker compose down --remove-orphans
docker compose up -d

# Wait for container to be ready
echo "⏳ Waiting for application to start..."
sleep 10

# Health check
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Application is running successfully!"
    echo "🌐 Your QR Code Generator is available at: http://localhost:3001"
    echo "📋 Configure Nginx Proxy Manager to proxy your domain to localhost:3001"
else
    echo "❌ Health check failed. Check the logs:"
    docker compose logs
    exit 1
fi

echo "🎉 Deployment completed!" 