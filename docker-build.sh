#!/bin/bash
# Docker build script for Lightmancer

set -e

echo "🔨 Building Lightmancer for Docker deployment..."

# Check if .env exists, create from example if not
if [ ! -f .env ]; then
    echo "📋 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your configuration before building for production"
fi

# Build the React application
echo "🏗️  Building React application..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t lightmancer:latest .

echo "✅ Build complete!"
echo ""
echo "To run the container:"
echo "  docker run -p 3000:80 lightmancer:latest"
echo ""
echo "Or use docker-compose:"
echo "  docker-compose up -d"
echo ""
echo "The application will be available at http://localhost:3000"