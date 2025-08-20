#!/bin/bash

# Comprehensive Vercel deployment script

echo "=== Smart Dispute Canada Frontend Deployment to Vercel ==="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed ($(node --version))"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm is installed ($(npm --version))"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI is not installed."
    echo "Installing Vercel CLI..."
    npm install -g vercel
    
    if ! command -v vercel &> /dev/null; then
        echo "❌ Failed to install Vercel CLI. Please install it manually:"
        echo "   npm install -g vercel"
        exit 1
    fi
    
    echo "✅ Vercel CLI installed successfully ($(vercel --version))"
else
    echo "✅ Vercel CLI is already installed ($(vercel --version))"
fi

# Build the application
echo ""
echo "=== Building the Next.js application ==="
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

echo "✅ Build completed successfully"

# Deploy to Vercel
echo ""
echo "=== Deploying to Vercel ==="
echo "You will be prompted to log in to your Vercel account if not already logged in."
echo "Follow the prompts to complete the deployment."

# Deploy with production settings
vercel deploy --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment to Vercel completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Configure environment variables in the Vercel dashboard:"
    echo "   - NEXT_PUBLIC_FIREBASE_API_KEY"
    echo "   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    echo "   - NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    echo "   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    echo "   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    echo "   - NEXT_PUBLIC_FIREBASE_APP_ID"
    echo "   - NEXT_PUBLIC_BACKEND_API_ORIGIN"
    echo ""
    echo "2. Set up your custom domain in the Vercel dashboard if needed"
    echo "3. Monitor the deployment logs in the Vercel dashboard"
else
    echo ""
    echo "❌ Deployment to Vercel failed."
    echo "Please check the error messages above and try again."
    exit 1
fi