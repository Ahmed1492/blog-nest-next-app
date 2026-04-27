# Vercel Deployment Guide for BlogNest

## Pre-Deployment Checklist

- [ ] All code is committed to Git
- [ ] Environment variables are documented
- [ ] MongoDB allows external connections
- [ ] Cloudinary account is set up
- [ ] Gemini API key is active

## Step-by-Step Deployment

### 1. Prepare Your Repository

Push your code to GitHub, GitLab, or Bitbucket:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your Git provider and repository
4. Click "Import"

### 3. Configure Project Settings

Vercel will auto-detect Next.js. Confirm these settings:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 4. Add Environment Variables

In the Vercel dashboard, add these environment variables:

#### Required Variables

```
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
ADMIN_EMAIL=your_admin@email.com
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_random_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_API_URL=/api
```

**Important:** 
- Never commit `.env.local` to Git
- Use strong passwords for production
- Generate a secure JWT secret (32+ characters)

### 5. Deploy

Click "Deploy" and wait for the build to complete.

### 6. Post-Deployment

1. **Test the deployment:**
   - Visit your Vercel URL
   - Test the homepage
   - Try creating a blog post
   - Test the admin login

2. **Configure Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

3. **Monitor Logs:**
   - Check Vercel dashboard for any errors
   - Monitor function logs for API issues

## MongoDB Configuration

### Allow Vercel IP Addresses

1. Go to MongoDB Atlas
2. Navigate to Network Access
3. Add IP Address: `0.0.0.0/0` (allow from anywhere)
   - Or add specific Vercel IP ranges for better security

### Connection String Format

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

## Troubleshooting

### Build Fails with ESLint Errors

The project is configured to treat warnings as errors. Fix all ESLint issues:

```bash
npm run lint
```

### MongoDB Connection Issues

- Verify connection string format
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions

### Environment Variables Not Working

- Redeploy after adding new variables
- Check variable names match exactly
- Ensure no trailing spaces in values

### Image Upload Issues

- Verify Cloudinary credentials
- Check Cloudinary upload preset settings
- Ensure domains are configured in `next.config.mjs`

### API Routes Returning 500

- Check Vercel function logs
- Verify all environment variables are set
- Test MongoDB connection

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

## Rollback

If something goes wrong:

1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find a previous working deployment
4. Click "..." → "Promote to Production"

## Performance Optimization

- Images are automatically optimized by Next.js
- API routes are serverless functions
- Static pages are cached at the edge
- Use Vercel Analytics for monitoring

## Security Best Practices

1. **Never expose secrets:**
   - Keep `.env.local` in `.gitignore`
   - Use Vercel environment variables

2. **Use strong credentials:**
   - Complex admin password
   - Random JWT secret (32+ chars)

3. **Restrict MongoDB access:**
   - Use specific IP ranges if possible
   - Create database user with minimal permissions

4. **Enable CORS properly:**
   - Configure allowed origins
   - Validate API requests

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)

## Cost Considerations

- Vercel Free Tier includes:
  - 100GB bandwidth
  - Unlimited deployments
  - Automatic HTTPS
  - Serverless functions

- Monitor usage in Vercel dashboard
- Upgrade to Pro if needed for higher limits
