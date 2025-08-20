#!/bin/bash

# Railway deployment script for Smart Dispute Canada frontend

echo "=== Smart Dispute Canada Frontend Deployment to Railway ==="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Docker is installed ($(docker --version))"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed. Please install Railway CLI first:"
    echo "   curl -fsSL https://railway.app/install.sh | sh"
    exit 1
fi

echo "✅ Railway CLI is installed ($(railway --version))"

# Build the Docker image
echo ""
echo "=== Building Docker image ==="
docker build -f Dockerfile.railway -t smart-dispute-frontend .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed. Please check the error messages above."
    exit 1
fi

echo "✅ Docker image built successfully"

# Login to Railway (manual step)
echo ""
echo "=== Railway Deployment ==="
echo "Please login to Railway manually by running:"
echo "   railway login"
echo ""
echo "Then deploy the service by running:"
echo "   railway init"
echo "   railway up"

# Alternative deployment method using Railway's GitHub integration
echo ""
echo "=== Alternative Deployment Method ==="
echo "You can also deploy by:"
echo "1. Pushing your code to GitHub"
echo "2. Connecting your GitHub repository to Railway"
echo "3. Railway will automatically detect the Dockerfile and deploy"

echo ""
echo "Deployment files created:"
echo "- Dockerfile.railway (uses ghcr.io/railwayapp/function-bun:1.2.16)"
echo "- railway-bun.json (Railway configuration)"
echo ""
echo "Environment variables needed:"
echo "- NEXT_PUBLIC_FIREBASE_API_KEY"
echo "- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
echo "- NEXT_PUBLIC_FIREBASE_PROJECT_ID"
echo "- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
echo "- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
echo "- NEXT_PUBLIC_FIREBASE_APP_ID"
echo "- NEXT_PUBLIC_BACKEND_API_ORIGIN"