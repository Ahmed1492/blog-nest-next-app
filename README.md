# BlogNest - Your Blogging Platform

**© 2026 Ahmed Mohamed. All rights reserved.**

A modern, full-featured blogging platform built with Next.js 15, MongoDB, and AI-powered content generation.

## Features

- 📝 Rich text editor for creating blog posts
- 🤖 AI-powered blog generation using Google Gemini
- 💬 Comment system with moderation
- 🔐 Admin dashboard with authentication
- 📊 Analytics and dashboard metrics
- 🖼️ Image upload with Cloudinary integration
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Image Storage:** Cloudinary
- **AI:** Google Gemini API
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Cloudinary account
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog-nest
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
# MongoDB
MONGODB_URL=your_mongodb_connection_string

# Admin credentials
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

# JWT
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Public (used by client components)
NEXT_PUBLIC_API_URL=/api
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy on Vercel

### Quick Deploy

1. Push your code to GitHub, GitLab, or Bitbucket

2. Import your repository on [Vercel](https://vercel.com/new)

3. Configure environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env.local` file:
     - `MONGODB_URL`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`
     - `JWT_SECRET`
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
     - `GEMINI_API_KEY`
     - `NEXT_PUBLIC_API_URL` (set to `/api`)

4. Deploy! Vercel will automatically build and deploy your application.

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Important Notes for Deployment

- All ESLint warnings are treated as errors during build
- Make sure all environment variables are properly set in Vercel
- MongoDB connection string should allow connections from anywhere (0.0.0.0/0) or Vercel's IP ranges
- Cloudinary domains are already configured in `next.config.mjs`

## Project Structure

```
blog-nest/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── api/          # API routes
│   │   └── blog/         # Blog pages
│   ├── components/       # React components
│   ├── context/          # React context providers
│   ├── lib/              # Utility functions and configs
│   └── models/           # MongoDB models
├── public/               # Static assets
└── config/               # Configuration files
```

## Admin Access

Access the admin dashboard at `/admin` and login with your configured admin credentials.

## API Routes

- `POST /api/admin/login` - Admin authentication
- `GET /api/blog` - Get all published blogs
- `GET /api/blog/[id]` - Get single blog
- `POST /api/blog/create-blog` - Create new blog
- `DELETE /api/blog/delete-blog` - Delete blog
- `POST /api/blog/toggle-publish` - Toggle blog publish status
- `POST /api/comment` - Create comment
- `GET /api/comment/comments-admin` - Get all comments (admin)
- `POST /api/comment/approve-comment` - Approve comment

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
