# Aury Silva – Personal Portfolio

A brand-new React frontend for [aurysilva.co.uk](https://www.aurysilva.co.uk), powered by **Chakra UI v2** with **WordPress** as the headless CMS.

## Stack

- React 18 + TypeScript + Vite
- Chakra UI v2 (dark-first design)
- WordPress REST API for portfolio items, blog posts, and site metadata
- Static profile config for skills, experience, and contact details

## Quick start

```bash
npm install
cp .env.example .env   # already points to https://www.aurysilva.co.uk
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## What's connected to WordPress

| Content | WordPress source |
|---------|------------------|
| Portfolio projects (25 items) | `wpb_fp_portfolio` custom post type |
| Portfolio categories | `wpb_fp_portfolio_cat` taxonomy |
| Blog posts | `/wp-json/wp/v2/posts` |
| Site name & tagline | `/wp-json` |

Profile sections (skills, experience, about text, contact) live in `src/data/profile.ts` and can later be moved to ACF custom fields in WordPress.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Full landing page — hero, about, skills, portfolio preview, experience, blog preview, contact |
| `/portfolio` | All projects with category filters |
| `/portfolio/:slug` | Single project detail |
| `/blog` | All blog posts |
| `/blog/:slug` | Single blog post |

## WordPress CORS (required for local dev)

Your React app on `localhost:5173` needs permission to fetch the WordPress API. Add this to your theme's `functions.php` or use a CORS plugin:

```php
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        $allowed = ['http://localhost:5173', 'https://www.aurysilva.co.uk'];

        if (in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, OPTIONS');
        }

        return $value;
    });
}, 15);
```

## Deploy

```bash
npm run build
```

Deploy the `dist/` folder to Netlify, Vercel, or Cloudflare Pages. Point `www.aurysilva.co.uk` at the React app and optionally move WordPress admin to a subdomain like `cms.aurysilva.co.uk`.

## Optional env vars

```env
VITE_WORDPRESS_URL=https://www.aurysilva.co.uk
VITE_CV_URL=          # direct link to your CV PDF for the Download CV button
```

## Project structure

```
src/
├── components/
│   ├── content/       # PortfolioCard, PostCard, WpContent
│   ├── layout/        # Header, Footer, Layout
│   ├── sections/      # Hero, About, Skills, Portfolio, etc.
│   └── ui/            # SectionHeading
├── data/profile.ts    # Skills, experience, contact info
├── lib/wordpress/     # API client & hooks
└── pages/             # Route views
```
