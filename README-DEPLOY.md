
# Deploying to Hostinger

This guide will help you deploy this React application to Hostinger as a static website.

## Step 1: Build the Application

Run the following command in your terminal:

```bash
npm run build
```

This will create a `dist` folder containing all the static files needed for deployment.

## Step 2: Download the Build Files

If using Lovable's online editor, download the entire `dist` folder to your local machine.

## Step 3: Upload to Hostinger

1. Log in to your Hostinger account
2. Go to your hosting control panel
3. Navigate to the File Manager
4. Upload all contents of the `dist` folder to your chosen directory (often `public_html` or a subdirectory)

## Step 4: Configure for SPA Routing

Since this is a Single Page Application (SPA), you need to configure the server to redirect all requests to index.html:

1. Create a file named `.htaccess` in the same directory where you uploaded your files
2. Add the following content to the file:

```
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

3. Save the file

## Step 5: Test Your Website

Visit your website's URL to make sure everything is working correctly. Navigation between pages should work without errors.

## Troubleshooting

- If you see a 404 error when refreshing or accessing routes directly, check that your `.htaccess` file is properly configured.
- If assets (images, CSS, JS) are not loading, check that the paths are correct in the HTML files.
- If you're deploying to a subdirectory, you may need to adjust the `base` property in your `vite.config.ts` file before building.

