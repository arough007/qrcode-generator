#!/bin/bash

# QR Code Generator Deployment Script
# This script fetches latest changes, builds the application and deploys it to your server

set -e  # Exit on any error

# Store the script's initial hash to detect if it gets updated
SCRIPT_PATH="$(realpath "$0")"
INITIAL_HASH=$(shasum "$SCRIPT_PATH" | cut -d' ' -f1)

echo "🚀 Starting QR Code Generator Deployment..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Make sure you're in the project root directory."
    exit 1
fi

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Fetch latest changes from remote
echo "📡 Fetching latest changes from remote..."
git fetch origin

# Check if there are any uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "⚠️  Warning: You have uncommitted changes. Stashing them..."
    git stash push -m "Auto-stash before deployment $(date)"
    STASHED=true
else
    STASHED=false
fi

# Pull latest changes
echo "⬇️  Pulling latest changes..."
CURRENT_BRANCH=$(git branch --show-current)
git pull origin "$CURRENT_BRANCH"

# Check if this script was updated during the pull
CURRENT_HASH=$(shasum "$SCRIPT_PATH" | cut -d' ' -f1)
if [ "$INITIAL_HASH" != "$CURRENT_HASH" ]; then
    echo "🔄 Deploy script was updated! Restarting with new version..."
    
    # Restore stashed changes before restarting
    if [ "$STASHED" = true ]; then
        echo "📋 Restoring stashed changes before restart..."
        git stash pop
    fi
    
    # Restart the script with the same arguments
    echo "🔄 Executing updated deploy script..."
    exec "$SCRIPT_PATH" "$@"
fi

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
    echo "📋 Restoring stashed changes..."
    git stash pop
fi

# Install/update dependencies
echo "📦 Installing/updating dependencies..."
npm ci

# Build the application
echo "🔨 Building the application..."
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