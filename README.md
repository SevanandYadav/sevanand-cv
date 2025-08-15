# Sevanand CV - Portfolio Website

## Live URLs
- **Netlify**: https://sevanandyadav.netlify.app/
- **GitHub Pages**: https://sevanandyadav.github.io/sevanand-cv/

## Local Development
```bash
npm start
```

## Deployment

### Netlify (Recommended)
Auto-deploys on push to main branch. No additional configuration needed.

### GitHub Pages
1. Add homepage field to package.json:
   ```json
   "homepage": "https://SevanandYadav.github.io/sevanand-cv"
   ```
2. Build and deploy:
   ```bash
   npm run build
   git subtree push --prefix build origin gh-pages
   ```
