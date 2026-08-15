# KmerHosting Blog

A separate Strapi 5 CMS and Next.js frontend for blog.kmerhosting.com.

## Architecture

- cms/: Strapi 5 content management API and admin panel
- web/: Next.js App Router frontend using Carbon React
- SQLite production data stays on the VPS and is excluded from Git
- Nginx exposes the frontend at / and Strapi at /admin and /api

## Local development

Run the CMS and frontend independently with Node 24. The frontend reads STRAPI_INTERNAL_URL from its environment.

## Production

The VPS uses:
- kmerhosting-blog-strapi.service on 127.0.0.1:1337
- kmerhosting-blog-web.service on 127.0.0.1:3000
- Nginx and Let's Encrypt for https://blog.kmerhosting.com

Create the first Strapi administrator at https://blog.kmerhosting.com/admin/.

## Content

Articles are managed in Strapi under Content Manager. The initial seed demonstrates hosting, LXC/KVM VPS, email, and database topics. Public content is consumed through /api/public-articles.

## Design

The frontend follows Carbon React components and Carbon spacing patterns with KmerHosting blue #1A73E8 as the brand accent. It intentionally avoids heavy runtime images for fast page loads.
