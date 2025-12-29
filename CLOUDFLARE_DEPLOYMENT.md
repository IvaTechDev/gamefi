# Cloudflare Pages Deployment Guide

## Prerequisites
- A Cloudflare account
- Git repository connected to Cloudflare Pages
- Node.js 20.9.0 or higher (required by Next.js 16)

## Build Configuration

When setting up your Cloudflare Pages project, use these settings:

### Framework Preset
- **Framework preset**: Next.js (Static HTML Export)

### Build Settings
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node version**: 20.9.0 (automatically detected from `.node-version`)

### Environment Variables
No special environment variables are required for this static site.

## Project Structure

The project is configured as a **Static Site Export** with the following key features:

- ✅ Static HTML generation for all pages
- ✅ Multi-language support (EN, UA, RU)
- ✅ Pre-rendered game detail pages (150+ games)
- ✅ Optimized images (unoptimized mode for static export)
- ✅ Client-side routing with Next.js App Router

## Build Output

After running `npm run build`, the static site will be generated in the `out` directory with:

- Pre-rendered HTML for all pages
- Static assets (CSS, JS, images)
- Sitemap and robots.txt
- Multi-language routes

## Deployment Steps

### Option 1: Connect Git Repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages** → **Create a project**
3. Select **Connect to Git**
4. Choose your repository
5. Configure build settings as shown above
6. Click **Save and Deploy**

### Option 2: Direct Upload (Wrangler CLI)

```bash
# Install Wrangler CLI
npm install -g wrangler

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name=gamefi-catalog
```

### Option 3: Drag and Drop

1. Build the project locally: `npm run build`
2. Go to Cloudflare Pages Dashboard
3. Create a new project
4. Drag and drop the `out` folder

## Post-Deployment

After deployment, your site will be available at:
- `https://gamefi-catalog.pages.dev` (or your custom domain)

### Custom Domain Setup

1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Follow the instructions to configure DNS

## Performance Features

The site includes:
- ✅ Static pre-rendering for instant page loads
- ✅ Cloudflare CDN for global distribution
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Web Analytics (optional, enable in Cloudflare Dashboard)

## Troubleshooting

### Build Fails
- Ensure Node.js version is 20.9.0 or higher (required by Next.js 16)
- Verify `.node-version` file contains `20.9.0`
- Check `package.json` for dependency issues
- Run `npm install` before building

### Pages Not Loading
- Verify the build output directory is set to `out`
- Check `_redirects` file in the `out` directory
- Ensure middleware warnings don't affect static export

### Images Not Showing
- Images are set to `unoptimized: true` in `next.config.js`
- All images are in the `public/images` directory
- Paths are relative to the domain root

## Updates

To update the deployed site:
1. Push changes to your Git repository (for Git-connected deployments)
2. Or rebuild locally and use Wrangler CLI to deploy
3. Cloudflare Pages will automatically deploy new builds

## Support

For issues specific to:
- Next.js: Check [Next.js documentation](https://nextjs.org/docs)
- Cloudflare Pages: Visit [Cloudflare Pages docs](https://developers.cloudflare.com/pages/)
