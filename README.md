# Personal Portfolio (React + WordPress Headless CMS)

A React frontend for your personal portfolio, powered by **Chakra UI v2** and **WordPress** as the content management system. WordPress continues to handle pages, posts, media, and menus — this app renders them as a modern SPA.

## Stack

- **React 18** + **TypeScript**
- **Vite** for dev/build
- **Chakra UI v2** for components and theming
- **React Router** for client-side routing
- **WordPress REST API** for content

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure WordPress URL

Copy the example env file and set your live WordPress site URL:

```bash
cp .env.example .env
```

```env
VITE_WORDPRESS_URL=https://www.aurysilva.co.uk
VITE_HOME_PAGE_SLUG=home
```

`VITE_HOME_PAGE_SLUG` should match the slug of the WordPress page you use as your homepage (often `home` or a front-page slug).

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Netlify, Vercel, Cloudflare Pages, or any static host.

---

## WordPress setup (keep your CMS as-is)

Your WordPress admin stays the same. You edit content there; this React app fetches it via the REST API.

### Enable REST API access

The WordPress REST API is enabled by default at:

```
https://your-site.com/wp-json/wp/v2/pages
https://your-site.com/wp-json/wp/v2/posts
```

### CORS (required for local dev)

When the React app runs on `localhost` and WordPress is on another domain, WordPress must allow cross-origin requests.

**Option A — plugin (easiest)**  
Install a CORS plugin such as [WP REST API CORS](https://wordpress.org/plugins/) or add headers via your hosting panel.

**Option B — `functions.php`**

```php
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        $allowed = ['http://localhost:5173', 'https://your-production-domain.com'];

        if (in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
        }

        return $value;
    });
}, 15);
```

Replace allowed origins with your dev and production URLs.

### Navigation menus (optional)

The header tries to load your WordPress menu from:

```
/wp-json/menus/v1/menus/primary
```

Install [WP REST API Menus](https://wordpress.org/plugins/wp-api-menus/) (or similar) and assign a menu to the **primary** location. If no menu is found, the app falls back to Home + Blog links.

### Custom post types & ACF

- **Custom post types** must have `show_in_rest => true` to appear in the REST API.
- **ACF fields** need the [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/) plugin or ACF’s built-in REST exposure.

---

## Routes

| Route | Source |
|-------|--------|
| `/` | WordPress page matching `VITE_HOME_PAGE_SLUG` |
| `/blog` | WordPress posts list |
| `/blog/:slug` | Single WordPress post |
| `/:slug` | Any other WordPress page (e.g. `/about`, `/contact`) |

---

## Project structure

```
src/
├── components/
│   ├── content/     # WpContent, PostCard, loading/error states
│   ├── layout/      # Header, Footer, Layout shell
│   └── seo/         # Document title & meta
├── lib/wordpress/   # API client, types, React hooks
├── pages/           # Route-level views
└── theme/           # Chakra UI theme
```

---

## Next steps

1. Share your WordPress URL so routes and styling can be matched to your current site.
2. Map custom post types (e.g. Projects, Portfolio items) if you use them.
3. Point your domain to the React app and keep WordPress on a subdomain (e.g. `cms.yoursite.com`) — a common headless pattern.

## License

Private — personal portfolio.
