#!/bin/bash

# Frontend deployment script for Vercel

echo "Building Next.js frontend application..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    echo "To deploy to Vercel, you need to:"
    echo "1. Install Vercel CLI: npm install -g vercel"
    echo "2. Initialize project: vercel init"
    echo "3. Deploy project: vercel deploy"
    
    echo ""
    echo "Alternatively, you can deploy using the Vercel dashboard:"
    echo "- Push your code to a Git repository (GitHub, GitLab, or Bitbucket)"
    echo "- Connect the repository to Vercel"
    echo "- Configure the project settings as needed"
    echo "- Deploy!"
    
    echo ""
    echo "Environment variables needed for production:"
    echo "- NEXT_PUBLIC_FIREBASE_API_KEY"
    echo "- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
    echo "- NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    echo "- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
    echo "- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
    echo "- NEXT_PUBLIC_FIREBASE_APP_ID"
    echo "- NEXT_PUBLIC_BACKEND_API_ORIGIN"
    
    echo ""
    echo "Build output is located in the .next directory"
    echo "You can also serve the built application locally with: npm run start"
else
    echo "Build failed! Please check the error messages above."
    exit 1
fi