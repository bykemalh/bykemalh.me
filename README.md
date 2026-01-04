<div align="center">
  <img src="./public/preview.png" alt="Modern Portfolio & Blog Template Preview" width="100%">
  
  # Modern Portfolio & Blog Template
  
  ### Built with React Router v7 - Blazing Fast, Modern, Production-Ready
  
  A complete portfolio and blog solution with SSG, ISR, advanced analytics, and professional SEO
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![React Router](https://img.shields.io/badge/React%20Router-v7-red)](https://reactrouter.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  
</div>

---

## Why This Template?

Originally built with Next.js, this template has been **completely rewritten with React Router v7** for better performance, simpler architecture, and modern developer experience. If you're looking for a **lightweight alternative to heavy Next.js templates** like MagicUI, this is it!

### Key Advantages Over Next.js

- **Faster Build Times**: ~8s vs Next.js ~30s+
- **Smaller Bundle**: No unnecessary abstractions
- **Simpler Mental Model**: No app router confusion
- **Better DX**: True HMR without framework overhead
- **More Control**: Direct access to Vite & React Router

## Features

### Frontend
- Modern UI Components with Radix UI & TailwindCSS v4
- Smooth Animations using Framer Motion
- Dark Mode Support with system preference detection
- Floating Navigation Dock (inspired by macOS)
- Progress Bar for seamless page transitions
- Responsive Design - mobile-first approach

### Blog System
- Markdown Support with GitHub Flavored Markdown (GFM)
- Math Equations using KaTeX
- Syntax Highlighting for code blocks
- Reading Time Calculation
- Categories & Tags
- Featured Posts
- View Counter with Unique Tracking (IP + User Agent)

### Performance & SEO
- SSG (Static Site Generation) for blog list
- ISR (Incremental Static Regeneration) for blog posts
- Dynamic Sitemap generation
- robots.txt configuration
- JSON-LD Structured Data (Article, Breadcrumb)
- Open Graph & Twitter Cards
- HTTP Caching Strategy (CDN + Browser)

### Security
- CSRF Protection for API endpoints
- Origin & Referer Validation
- Rate Limiting Ready
- Secure Headers

### Analytics
- Custom Analytics System (no third-party tracking)
- Unique View Detection (IP + User Agent deduplication)
- PostgreSQL Database with Prisma ORM
- Real-time View Counts

## Tech Stack

**Framework**: [React Router v7](https://reactrouter.com) (SSR + SSG)  
**Language**: TypeScript  
**Styling**: [TailwindCSS v4](https://tailwindcss.com)  
**UI Components**: [Radix UI](https://radix-ui.com)  
**Animations**: [Framer Motion](https://framer.com/motion)  
**Database**: PostgreSQL with [Prisma](https://prisma.io)  
**Markdown**: react-markdown + remark/rehype plugins  
**Math**: KaTeX  
**Deployment**: Docker-ready

## Getting Started

### Prerequisites

- Node.js 20+ 
- PostgreSQL (or use Docker)
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bykemalh/bykemalh.me.git
cd bykemalh.me
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

4. Initialize database:
```bash
npx prisma generate
npx prisma db push
```

5. (Optional) Seed with sample data:
```bash
npx prisma db seed
```

### Development

Start the development server:
```bash
npm run dev
```

Your app will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

## Docker Deployment

Build and run with Docker:

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env portfolio
```

Or use Docker Compose:
```bash
docker-compose up -d
```

## Content Management

### Adding Blog Posts

1. Create a new entry in your database using Prisma Studio:
```bash
npx prisma studio
```

2. Or use SQL directly:
```sql
INSERT INTO "Blog" (title, slug, content, keywords, categories, published, featured)
VALUES (
  'My First Post',
  'my-first-post',
  '# Hello World\n\nThis is my first blog post!',
  'tutorial, react, typescript',
  'Development,Tutorial',
  true,
  false
);
```

### Customizing Portfolio Projects

Edit the projects data in `app/routes/projects.tsx` or connect it to your database.

## Customization

### Colors & Theme

Edit `app/app.css` to customize your color scheme:
```css
@theme {
  /* Your custom colors */
}
```

### Layout & Components

- **Navigation**: `app/components/floating-dock.tsx`
- **Homepage**: `app/routes/home.tsx`
- **Blog List**: `app/routes/blog.tsx`
- **Blog Post**: `app/routes/blog.$slug.tsx`
- **Projects**: `app/routes/projects.tsx`

### SEO Configuration

Update SEO settings in `app/lib/seo.ts`:
```typescript
export const siteConfig = {
  name: "Your Name",
  url: "https://yoursite.com",
  // ... other settings
};
```

## Analytics & Performance

### View Tracking

The template includes a built-in analytics system that:
- Tracks unique views (IP + User Agent)
- Prevents duplicate counting
- Respects user privacy (no cookies, no third-party tracking)
- Works with sessionStorage for client-side deduplication

### Cache Strategy

- **Blog List**: SSG with 24h CDN cache + 7 day stale-while-revalidate
- **Blog Posts**: SSG with 1h CDN cache + 24h stale-while-revalidate
- **Static Assets**: Immutable with long-term caching

## Security Features

- CSRF protection on API endpoints
- Origin and Referer validation
- Secure headers (configure in your deployment)
- Rate limiting ready (add middleware)
- No sensitive data in client bundles

## Deployment Options

### Vercel / Netlify / Cloudflare Pages

This template works with any platform that supports Node.js:

1. Push to GitHub
2. Connect your repository
3. Set environment variables
4. Deploy!

### VPS / Self-Hosted

```bash
npm run build
npm run start
```

Use PM2 for process management:
```bash
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by modern portfolio templates, but built better with React Router v7
- UI components from [Radix UI](https://radix-ui.com)
- Icons from [Lucide](https://lucide.dev)
- Animations powered by [Framer Motion](https://framer.com/motion)

## Contact

**Kemal Hafızoğlu**  
Website: [bykemalh.me](https://bykemalh.me)  
GitHub: [@bykemalh](https://github.com/bykemalh)  
Twitter: [@bykemalh](https://twitter.com/bykemalh)

---

<div align="center">
  
**If you found this template helpful, please consider giving it a ⭐**

Made with ❤️ using React Router v7

</div>

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
