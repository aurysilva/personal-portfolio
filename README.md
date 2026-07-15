# Aury Silva – Personal Portfolio

A brand-new React frontend for [aurysilva.co.uk](https://www.aurysilva.co.uk), powered by **Chakra UI v2** with **WordPress** as the headless CMS.

## Stack

- React 18 + TypeScript + Vite
- Chakra UI v2 (dark-first design)
- WordPress REST API for portfolio items, blog posts, site metadata, and homepage profile content
- Profile data (skills, about, experience) synced from the WordPress homepage

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
| Skills, about, experience, process | Homepage page (`VITE_WORDPRESS_HOME_SLUG`) via Elementor content |

Skills, bio, highlights, qualifications, and experience are parsed from your WordPress homepage. Update them in Elementor on that page and they propagate to the React frontend on refresh. Email and social links still use local fallbacks until exposed via WordPress (e.g. ACF Options).

For a more robust long-term setup, add **ACF field groups** with REST API enabled and replace the HTML parser with structured JSON fields.

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

Deploy the `dist/` folder to Netlify, Vercel, or Cloudflare Pages. SPA routing is configured via `public/_redirects` (Netlify/Cloudflare), `vercel.json` (Vercel), and `public/.htaccess` (Apache).

Point `www.aurysilva.co.uk` at the React app and optionally move WordPress admin to a subdomain like `cms.aurysilva.co.uk`.

### Production environment variables

Set these in your hosting provider's dashboard (do not commit `.env`):

```env
VITE_WORDPRESS_URL=https://www.aurysilva.co.uk
VITE_WORDPRESS_HOME_SLUG=aury-silva-front-end-and-email-developer
VITE_CV_URL=https://www.aurysilva.co.uk/Software-Manager-Full-Stack-Developer-CV.pdf
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Rebuild after changing env vars — Vite inlines them at build time.

### Google Analytics

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy the **Measurement ID** (`G-XXXXXXXXXX`)
3. Add `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to your production env
4. Redeploy — page views are tracked automatically on route changes

Analytics runs in production only. To test locally, set `VITE_GA_DEBUG=true` in `.env`.

## Optional env vars

```env
VITE_WORDPRESS_URL=https://www.aurysilva.co.uk
VITE_WORDPRESS_HOME_SLUG=aury-silva-front-end-and-email-developer
VITE_CV_URL=          # direct link to your CV PDF for the Download CV button
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GA_DEBUG=true    # optional: enable GA in local dev
```

## Project structure

```
src/
├── components/
│   ├── content/       # PortfolioCard, PostCard, WpContent
│   ├── layout/        # Header, Footer, Layout
│   ├── sections/      # Hero, About, Skills, Portfolio, etc.
│   └── ui/            # SectionHeading
├── context/ProfileContext.tsx  # Profile provider (WordPress + fallbacks)
├── data/profile.ts    # Profile types + offline fallbacks
├── lib/wordpress/     # API client & hooks
└── pages/             # Route views
```
