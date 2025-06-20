#!/bin/bash

# QR Code Generator Deployment Script
# This script fetches latest changes, builds the application and deploys it to your server
# Usage: ./deploy.sh [-v|--verbose]

set -e  # Exit on any error

# Check for verbose flag
VERBOSE=false
if [[ "$1" == "-v" || "$1" == "--verbose" ]]; then
    VERBOSE=true
elif [[ "$1" == "-h" || "$1" == "--help" ]]; then
    echo "QR Code Generator Deployment Script"
    echo "Usage: $0 [-v|--verbose] [-h|--help]"
    echo ""
    echo "Options:"
    echo "  -v, --verbose   Show detailed output"
    echo "  -h, --help      Show this help message"
    exit 0
fi

# Store the script's initial hash to detect if it gets updated
SCRIPT_PATH="$(realpath "$0")"
INITIAL_HASH=$(shasum "$SCRIPT_PATH" | cut -d' ' -f1)

echo "🚀 Deploying QR Code Generator..."

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

# Fetch and pull changes
printf "📡 Updating code... "
if git fetch origin --quiet 2>/dev/null; then
    echo "✓"
else
    echo "⚠️"
    if [ "$VERBOSE" = true ]; then
        echo "Git fetch output:"
        git fetch origin
    fi
fi

# Check if there are any uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    if [ "$VERBOSE" = true ]; then
        echo "⚠️  Stashing uncommitted changes..."
    fi
    git stash push -m "Auto-stash before deployment $(date)" --quiet
    STASHED=true
else
    STASHED=false
fi

# Pull latest changes
CURRENT_BRANCH=$(git branch --show-current)
pull_output=$(git pull origin "$CURRENT_BRANCH" 2>&1)
pull_status=$?
if [ $pull_status -eq 0 ] && [[ "$pull_output" == *"Already up to date"* ]]; then
    # Already up to date - no output needed unless verbose
    if [ "$VERBOSE" = true ]; then
        echo "✓ Already up to date"
    fi
elif [ $pull_status -eq 0 ]; then
    # Successful update
    echo "✓ Updated"
    if [ "$VERBOSE" = true ]; then
        echo "$pull_output"
    fi
else
    # Error during pull
    echo "❌ Pull failed"
    echo "$pull_output"
    exit 1
fi

# Ensure script is executable after git pull (permissions might be lost)
chmod +x "$SCRIPT_PATH"

# Check if this script was updated during the pull
CURRENT_HASH=$(shasum "$SCRIPT_PATH" | cut -d' ' -f1)
if [ "$INITIAL_HASH" != "$CURRENT_HASH" ]; then
    echo "🔄 Script updated, restarting..."
    
    # Restore stashed changes before restarting
    if [ "$STASHED" = true ]; then
        if ! git stash pop --quiet 2>/dev/null; then
            if [ "$VERBOSE" = true ]; then
                echo "⚠️  Stash conflicts detected - kept in stash"
            fi
        fi
    fi
    
    # Restart the script with the same arguments
    exec "$SCRIPT_PATH" "$@"
fi

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
    if git stash pop --quiet 2>/dev/null; then
        if [ "$VERBOSE" = true ]; then
            echo "✓ Restored local changes"
        fi
    else
        echo "⚠️  Stash conflicts - run 'git stash pop' manually after deployment"
    fi
fi

# Install/update dependencies
printf "📦 Installing dependencies... "
npm_output=$(npm ci 2>&1)
npm_status=$?

if [ $npm_status -eq 0 ]; then
    echo "✓"
    # Show warnings/errors if any (but not successful test output)
    if [[ "$npm_output" == *"FAIL"* ]] || [[ "$npm_output" == *"ERROR"* ]] || [[ "$npm_output" == *"✗"* ]]; then
        echo "npm check warnings/errors:"
        echo "$npm_output"
    elif [ "$VERBOSE" = true ]; then
        echo "npm output:"
        echo "$npm_output"
    fi
else
    echo "❌"
    echo "Dependency installation failed:"
    echo "$npm_output"
    exit 1
fi

# Build the application
printf "🔨 Building... "
build_output=$(npm run build 2>&1)
build_status=$?
if [ $build_status -eq 0 ]; then
    echo "✓"
    # Show warnings if any (but not full output unless verbose)
    if [[ "$build_output" == *"(!) Some chunks are larger than"* ]] && [ "$VERBOSE" = false ]; then
        echo "⚠️  Bundle size warning (use -v for details)"
    elif [ "$VERBOSE" = true ]; then
        echo "$build_output"
    fi
else
    echo "❌"
    echo "Build failed:"
    echo "$build_output"
    exit 1
fi

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - no dist directory found"
    exit 1
fi

# Deploy with Docker Compose
printf "🐳 Starting containers... "
docker_output=$(docker compose down --remove-orphans 2>&1 && docker compose up -d 2>&1)
docker_status=$?

if [ $docker_status -eq 0 ]; then
    echo "✓"
    # Show warnings if any (always show warnings, regardless of verbose mode)
    if [[ "$docker_output" == *"WARN"* ]]; then
        echo "Docker warnings:"
        echo "$docker_output" | grep "WARN"
    fi
    # Show full output only in verbose mode
    if [ "$VERBOSE" = true ] && [[ "$docker_output" != *"WARN"* ]]; then
        echo "Docker output:"
        echo "$docker_output"
    fi
else
    echo "❌"
    echo "Docker deployment failed:"
    echo "$docker_output"
    exit 1
fi

# Wait for container to be ready
printf "⏳ Starting app... "
sleep 10

# Health check
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "✓"
    echo ""
    echo "🎉 Deployment complete!"
    echo "🌐 Available at: http://localhost:3001"
    if [ "$VERBOSE" = true ]; then
        echo "📋 Configure Nginx Proxy Manager to proxy your domain to localhost:3001"
    fi
else
    echo "❌"
    echo "Health check failed. Container logs:"
    docker compose logs
    exit 1
fi 