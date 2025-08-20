# Smart Dispute Canada Frontend Deployment to Railway

This document provides detailed instructions for deploying the Smart Dispute Canada frontend application to Railway using the specific Railway function-bun image.

## Prerequisites

1. Docker installed on your system
2. Railway CLI installed (`curl -fsSL https://railway.app/install.sh | sh`)
3. A Railway account
4. The application code should be pushed to a Git repository

## Deployment Steps

### 1. Build the Docker Image

First, build the Docker image using the Railway-specific Dockerfile:

```bash
cd justice-bot-canada-firebase
docker build -f Dockerfile.railway -t smart-dispute-frontend .
```

### 2. Login to Railway

Login to your Railway account:

```bash
railway login
```

### 3. Initialize Railway Project

Initialize a new Railway project or link to an existing one:

```bash
railway init
```

### 4. Deploy to Railway

Deploy the application to Railway:

```bash
railway up
```

### 5. Configure Environment Variables

After deployment, configure the following environment variables in the Railway dashboard:

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
1. Go to your project in the Railway dashboard
2. Click on the service you just deployed
3. Click on "Settings"
4. Click on "Environment Variables"
5. Add each variable with its corresponding value

### 6. Redeploy

After setting environment variables, redeploy the application:

```bash
railway up
```

## Alternative Deployment Method (GitHub Integration)

You can also deploy using Railway's GitHub integration:

1. Push your code to a GitHub repository
2. Go to the Railway dashboard
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will automatically detect the Dockerfile and deploy

## Docker Image Information

The application uses the specific Railway function-bun image:
`ghcr.io/railwayapp/function-bun:sha-d7c1797214ad035fac08d556e9741a4ded95c15d`

This image is optimized for Bun applications on Railway.

## Troubleshooting

### Build Issues

If you encounter build issues:
1. Check that all dependencies are properly installed
2. Verify that there are no syntax errors in your code
3. Ensure your `tsconfig.json` is properly formatted

### Deployment Failures

If deployments fail:
1. Check the deployment logs in the Railway dashboard
2. Verify that your Dockerfile is correct
3. Ensure your application doesn't exceed Railway's limits

### Environment Variables

If your application isn't working correctly after deployment:
1. Verify all environment variables are set correctly
2. Check that there are no typos in variable names
3. Ensure sensitive values are properly secured

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

- [Railway Documentation](https://docs.railway.app)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)