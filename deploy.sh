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
git fetch origin --quiet

# Check if there are any uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "⚠️  Uncommitted changes detected - safely stashing them first..."
    git stash push -m "Auto-stash before deployment $(date)" --quiet
    STASHED=true
    echo "   ✓ Local changes safely stashed"
else
    STASHED=false
fi

# Pull latest changes
echo "⬇️  Pulling latest changes..."
CURRENT_BRANCH=$(git branch --show-current)
if git pull origin "$CURRENT_BRANCH" --quiet; then
    echo "   ✓ Successfully updated to latest version"
else
    echo "   ⚠️  Pull completed with messages (see above for details)"
fi

# Ensure script is executable after git pull (permissions might be lost)
chmod +x "$SCRIPT_PATH"

# Check if this script was updated during the pull
CURRENT_HASH=$(shasum "$SCRIPT_PATH" | cut -d' ' -f1)
if [ "$INITIAL_HASH" != "$CURRENT_HASH" ]; then
    echo "🔄 Deploy script was updated! Restarting with new version..."
    
    # Restore stashed changes before restarting
    if [ "$STASHED" = true ]; then
        echo "📋 Restoring your local changes before restart..."
        if git stash pop --quiet 2>/dev/null; then
            echo "   ✓ Local changes successfully restored"
        else
            echo "   ⚠️  Cannot restore local changes automatically (conflicts detected)"
            echo "   📝 Your changes are safely stored in git stash"
        fi
    fi
    
    # Restart the script with the same arguments
    echo "🔄 Executing updated deploy script..."
    exec "$SCRIPT_PATH" "$@"
fi

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
    echo "📋 Restoring your local changes..."
    if git stash pop --quiet 2>/dev/null; then
        echo "   ✓ Local changes successfully restored"
    else
        echo "   ⚠️  Cannot restore local changes automatically (conflicts detected)"
        echo "   📝 Don't worry! Your changes are safely stored in git stash"
        echo "   🔧 After deployment, run 'git stash pop' to restore them manually"
    fi
fi

echo ""
echo "=== 🔧 BUILD PHASE ==="

# Install/update dependencies
echo "📦 Installing/updating dependencies..."
npm ci --silent

# Build the application
echo "🔨 Building the application..."
npm run build --silent

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

echo "   ✅ Build completed successfully!"

echo ""
echo "=== 🚀 DEPLOYMENT PHASE ==="

# Deploy with Docker Compose
echo "🐳 Starting Docker containers..."
docker compose down --remove-orphans --quiet 2>/dev/null || true
docker compose up -d --quiet 2>/dev/null
echo "   ✓ Docker containers started"

# Wait for container to be ready
echo "⏳ Waiting for application to start..."
sleep 10

# Health check
echo "🔍 Checking application health..."
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "   ✅ Application is running successfully!"
    echo ""
    echo "🎉 DEPLOYMENT COMPLETED! 🎉"
    echo "🌐 Your QR Code Generator is available at: http://localhost:3001"
    echo "📋 Configure Nginx Proxy Manager to proxy your domain to localhost:3001"
else
    echo "   ❌ Health check failed. Checking logs..."
    docker compose logs
    exit 1
fi 