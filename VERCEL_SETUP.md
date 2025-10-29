# Vercel Deployment Setup

This document explains how to deploy this portfolio website to Vercel.

## Required Environment Variables

You need to set these environment variables in your Vercel project dashboard:

### Essential Variables

1. **SESSION_SECRET** (Required for dark mode to work)
   - Purpose: Used to encrypt session cookies for theme persistence
   - Value: Any random string (at least 32 characters recommended)
   - Example: Generate with: `openssl rand -base64 32`

### Email Functionality (Optional - only needed if using contact form)

2. **ENVIRONMENT**
   - Value: `production`

3. **EMAIL**
   - Your recipient email address

4. **FROM_EMAIL**
   - AWS SES verified sender email address

5. **AWS_ACCESS_KEY_ID**
   - AWS credentials for SES email service

6. **AWS_SECRET_ACCESS_KEY**
   - AWS credentials for SES email service

## Deployment Steps

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Push to GitHub**
   - Commit and push your changes to GitHub
   - Vercel will auto-detect the Remix framework

3. **Connect to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Vercel will automatically detect the Remix configuration

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add `SESSION_SECRET` (minimum required)
   - Add other variables if using email functionality

5. **Deploy**
   - Vercel will automatically deploy on push to your main branch
   - The build command is: `npm install && npm run build`
   - The postinstall script will automatically copy Draco decoder files

## Key Fixes Applied

### 1. 3D Models Issue - Fixed
- **Problem**: Draco decoder files were in `.gitignore`, preventing 3D models from loading
- **Solution**: Removed `public/draco` from `.gitignore` and updated the postinstall script to use native Node.js `fs` module

### 2. Dark Mode Issue - Fixed
- **Problem**: Without `SESSION_SECRET`, theme cookies don't work properly
- **Solution**: Set `SESSION_SECRET` environment variable in Vercel

### 3. Font Loading - Fixed
- **Problem**: Fonts not loading correctly
- **Solution**: Fonts are properly bundled by Vite and injected via CSS @font-face declarations

## Troubleshooting

### 3D Models Not Appearing
- Ensure `public/draco/` directory is committed to git
- Check browser console for DRACO-related errors
- Verify cache headers in `public/_headers` file

### Dark Mode White Background
- Verify `SESSION_SECRET` is set in Vercel environment variables
- Check browser cookies are enabled
- Clear browser cache and cookies

### Wrong Fonts Loading
- Check browser Network tab to ensure .woff2 files are loading
- Verify fonts are in the build output
- Check for CORS issues in browser console

### Build Failures
- Ensure Node.js version is set to 20.x
- Check that all dependencies are installed
- Review Vercel build logs for specific errors

## Local Testing

To test locally before deploying:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

Visit `http://localhost:7777` for development or `http://localhost:3000` for production preview.

## Performance Optimizations

The following optimizations are configured:

- **Draco compression** for 3D models (reduces size by ~60%)
- **Long-term caching** for static assets (1 year)
- **Font preloading** for critical fonts (Gotham Medium and Book)
- **Progressive image loading** with placeholders
- **Code splitting** via Vite
- **Asset hashing** for cache busting

## Support

If you encounter issues:
1. Check Vercel build logs
2. Review browser console for errors
3. Verify all environment variables are set correctly
4. Ensure you're using Node.js 20.x
