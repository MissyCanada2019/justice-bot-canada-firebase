# Smart Dispute Canada Frontend Deployment to Vercel

This document provides detailed instructions for deploying the Smart Dispute Canada frontend application to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (free at [vercel.com](https://vercel.com))
3. The application code should be pushed to a GitHub repository

## Deployment Steps

### 1. Push Code to GitHub

First, ensure all your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in or create an account
2. Click "New Project"
3. Import the GitHub repository where your code is stored
4. Configure the project settings:
   - Framework Preset: Next.js
   - Root Directory: Leave empty (or set to the directory containing your Next.js app)
   - Build and Output Settings:
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`

### 3. Environment Variables

After importing your project, configure the following environment variables in the Vercel dashboard:

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| NEXT_PUBLIC_FIREBASE_API_KEY | Firebase API Key | AIzaSyB3vW1uDzlJ1234567890 |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | Firebase Auth Domain | your-project.firebaseapp.com |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | Firebase Project ID | your-project-id |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | Firebase Storage Bucket | your-project.appspot.com |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | Firebase Messaging Sender ID | 123456789012 |
| NEXT_PUBLIC_FIREBASE_APP_ID | Firebase App ID | 1:123456789012:web:abc123def456 |
| NEXT_PUBLIC_BACKEND_API_ORIGIN | Backend API URL | https://your-backend-domain.com |

To set environment variables:
1. Go to your project in the Vercel dashboard
2. Click on "Settings"
3. Click on "Environment Variables"
4. Add each variable with its corresponding value

### 4. Deploy

1. Click "Deploy" in the Vercel dashboard
2. Wait for the deployment to complete (usually takes 1-2 minutes)
3. Once deployed, Vercel will provide you with a URL for your application

### 5. Custom Domain (Optional)

If you want to use a custom domain:
1. Go to your project in the Vercel dashboard
2. Click on "Settings"
3. Click on "Domains"
4. Add your custom domain
5. Follow the instructions to configure DNS settings

## Troubleshooting

### Build Issues

If you encounter build issues:
1. Check that all dependencies are properly installed
2. Verify that there are no syntax errors in your code
3. Ensure your `tsconfig.json` is properly formatted

### Environment Variables

If your application isn't working correctly after deployment:
1. Verify all environment variables are set correctly
2. Check that there are no typos in variable names
3. Ensure sensitive values are properly secured

### Deployment Failures

If deployments fail:
1. Check the deployment logs in the Vercel dashboard
2. Verify that your build command is correct
3. Ensure your application doesn't exceed Vercel's limits

## Local Development

To run the application locally after deployment:

```bash
npm run dev
```

To build and serve locally:

```bash
npm run build
npm run start
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)