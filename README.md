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
cp .env.example .env   # WordPress API at /backendwp
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

## WordPress CORS (required for local dev only)

In production, React and WordPress share the same domain (`www.aurysilva.co.uk`), so the REST API does not need CORS headers. Local dev on `localhost:5173` still does. Add this to your theme's `functions.php` in `backendwp`:

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

## cPanel hosting (React in `public_html`, WordPress in `backendwp`)

Typical layout:

```
public_html/              ← React build (`npm run build` → upload `dist/*`)
  index.html
  assets/
  .htaccess               ← SPA routing (included in this repo)
  backendwp/              ← WordPress install
    wp-admin/
    wp-content/
    .htaccess             ← WordPress permalinks (see below)
```

### 1. Fix WordPress `.htaccess` in `backendwp`

Your current file uses `RewriteBase /`, which is for a root install. In a subdirectory it must be:

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /backendwp/
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /backendwp/index.php [L]
</IfModule>
# END WordPress
```

Easiest fix: in **Settings → Permalinks**, click **Save Changes** after WordPress URLs are correct — WordPress will regenerate this block.

### 2. WordPress URLs

In **Settings → General** (or `wp-config.php`):

- **WordPress Address (URL):** `https://www.aurysilva.co.uk/backendwp`
- **Site Address (URL):** `https://www.aurysilva.co.uk/backendwp`

Optional `wp-config.php` overrides:

```php
define('WP_HOME', 'https://www.aurysilva.co.uk/backendwp');
define('WP_SITEURL', 'https://www.aurysilva.co.uk/backendwp');
```

After moving files, run a URL search-replace in the database (Better Search Replace plugin or WP-CLI) so old `/wp-content/` links become `/backendwp/wp-content/` where needed.

### 3. React `.htaccess` in `public_html`

The repo's `public/.htaccess` serves the SPA and **excludes** `/backendwp` so WordPress keeps working:

```apache
RewriteRule ^backendwp(/|$) - [L]
```

Upload the full `dist/` output (including `.htaccess`) to `public_html`.

### 4. React env (rebuild required)

```env
VITE_WORDPRESS_URL=https://www.aurysilva.co.uk/backendwp/backendwp
```

Verify the API loads: `https://www.aurysilva.co.uk/backendwp/wp-json`

## Deploy

```bash
npm run build
```

Upload everything inside `dist/` to `public_html`. SPA routing uses `public/.htaccess` (Apache/cPanel). For Netlify/Vercel instead, use `public/_redirects` or `vercel.json`.

### Production environment variables

Set these before `npm run build` (Vite inlines them at build time):

```env
VITE_WORDPRESS_URL=https://www.aurysilva.co.uk/backendwp/backendwp
VITE_WORDPRESS_HOME_SLUG=aury-silva-front-end-and-email-developer
VITE_CV_URL=https://www.aurysilva.co.uk/backendwp/Software-Manager-Full-Stack-Developer-CV.pdf
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Google Analytics

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy the **Measurement ID** (`G-XXXXXXXXXX`)
3. Add `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to your production env
4. Redeploy — page views are tracked automatically on route changes

Analytics runs in production only. To test locally, set `VITE_GA_DEBUG=true` in `.env`.

## Optional env vars

```env
VITE_WORDPRESS_URL=https://www.aurysilva.co.uk/backendwp
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
