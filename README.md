# BlogNest - Your Blogging Platform

**© 2026 Ahmed Mohamed. All rights reserved.**

A modern, full-featured blogging platform built with Next.js 16, MongoDB, and AI-powered content generation with beautiful UI/UX and skeleton loading states.





---

## 🎥 Demo  

[![Live Demo](https://img.shields.io/badge/View%20Live-Vercel-blue?style=for-the-badge&logo=vercel)](https://blog-nest-nextjs-app.vercel.app/)

---


## ✨ Features

### Content Management
- 📝 **Rich Text Editor** - Quill-based editor with custom styling and formatting
- 🤖 **AI Content Generation** - Generate blog content using Google Gemini AI
- 🖼️ **Image Upload** - Cloudinary integration for optimized image storage
- 📂 **Category System** - Organize blogs by Technology, Startup, Lifestyle, Finance
- 🔄 **Draft & Publish** - Save drafts or publish immediately

### User Experience
- 💬 **Comment System** - Reader comments with admin moderation
- 🔍 **Search & Filter** - Search blogs by title/category with real-time filtering
- ⚡ **Skeleton Loading** - Beautiful loading states with shimmer animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI** - Clean design with Tailwind CSS and Framer Motion animations
- 🌙 **Smooth Transitions** - Page transitions and hover effects

### Admin Dashboard
- 🔐 **JWT Authentication** - Secure admin login system
- 📊 **Analytics Dashboard** - View blog stats, comments, and drafts
- 📝 **Blog Management** - Create, edit, publish, and delete blogs
- 💬 **Comment Moderation** - Approve or delete user comments
- 🎯 **Quick Actions** - Fast access to common tasks

### Technical Features
- 🚀 **Next.js 16** - Latest App Router with Server Components
- 🗄️ **MongoDB** - Efficient data storage with Mongoose ODM
- 🎭 **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- 🔒 **Security** - Environment variables, JWT tokens, input validation
- 📦 **PWA Ready** - Web manifest for installable app experience
- 🎨 **Custom Branding** - Favicon, logo, and brand colors

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Image Storage:** Cloudinary
- **AI:** Google Gemini API
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Editor:** Quill.js
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- Cloudinary account (free tier available)
- Google Gemini API key (free tier available)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Ahmed1492/blog-nest-next-app.git
cd blog-nest
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database

# Admin credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password

# JWT Secret (generate a random 32+ character string)
JWT_SECRET=your_random_jwt_secret_minimum_32_characters

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Public API URL
NEXT_PUBLIC_API_URL=/api
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Deploy on Vercel

### Quick Deploy (Recommended)

1. **Push to Git:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Apply to Production, Preview, and Development

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

### Important Deployment Notes

✅ **Next.js 16.2.4** - Latest secure version (no vulnerabilities)  
✅ **ESLint Strict Mode** - Warnings treated as errors  
✅ **MongoDB Atlas** - Whitelist `0.0.0.0/0` for Vercel access  
✅ **Environment Variables** - All secrets configured in Vercel  
✅ **Auto-Deploy** - Every push to main triggers deployment

### Deployment Guides

- **Quick Setup:** See `VERCEL_SETUP.md`
- **Detailed Guide:** See `DEPLOYMENT.md`
- **All Changes:** See `CHANGES_FOR_DEPLOYMENT.md`

## 📁 Project Structure

```
blognest-ahmed-mohamed/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── add-blog/      # Create new blog
│   │   │   ├── list-blogs/    # Manage all blogs
│   │   │   ├── comments/      # Moderate comments
│   │   │   └── dashboard/     # Analytics dashboard
│   │   ├── api/               # API routes
│   │   │   ├── admin/         # Admin APIs
│   │   │   ├── blog/          # Blog CRUD APIs
│   │   │   └── comment/       # Comment APIs
│   │   ├── blog/[id]/         # Blog detail page
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── search/            # Search page
│   ├── components/            # React components
│   │   ├── admin/             # Admin components
│   │   ├── BlogCard.jsx       # Blog card component
│   │   ├── BlogList.jsx       # Blog listing
│   │   ├── BlogDetails.jsx    # Blog detail view
│   │   ├── BlogComments.jsx   # Comment section
│   │   ├── Skeleton.jsx       # Loading skeletons
│   │   ├── Navbar.jsx         # Navigation
│   │   └── Footer.jsx         # Footer
│   ├── context/               # React Context
│   │   └── AppContext.jsx     # Global state
│   ├── lib/                   # Utilities
│   │   ├── auth.js            # JWT authentication
│   │   ├── cloudinary.js      # Image upload
│   │   ├── db.js              # MongoDB connection
│   │   └── gemini.js          # AI integration
│   ├── models/                # MongoDB models
│   │   ├── Blog.js            # Blog schema
│   │   └── Comment.js         # Comment schema
│   └── assets/                # Static assets
├── public/                    # Public files
│   ├── favicon.svg            # Custom favicon
│   ├── icon.svg               # App icon
│   ├── apple-icon.svg         # iOS icon
│   └── site.webmanifest       # PWA manifest
├── .env.local                 # Environment variables (not in git)
├── .env.example               # Environment template
├── next.config.mjs            # Next.js config
├── tailwind.config.mjs        # Tailwind config
├── package.json               # Dependencies
├── README.md                  # This file
├── LICENSE                    # MIT License
├── BRANDING.md                # Brand guidelines
├── DEPLOYMENT.md              # Deployment guide
└── VERCEL_SETUP.md            # Quick setup guide
```

## 🎨 Branding

- **Colors:** Purple gradient (#6366F1 → #8B5CF6)
- **Accent:** Red (#FF6B6B)
- **Typography:** Inter font family
- **Logo:** BlogNest with gradient text
- **Favicon:** Custom SVG with book icon

See `BRANDING.md` for complete brand guidelines.

## 🔐 Admin Access

1. Navigate to `/admin`
2. Login with your configured credentials
3. Access dashboard, create blogs, moderate comments

**Default Admin Routes:**
- `/admin` - Login page
- `/admin/dashboard` - Analytics overview
- `/admin/add-blog` - Create new blog
- `/admin/list-blogs` - Manage all blogs
- `/admin/comments` - Moderate comments

## 🌐 API Routes

### Public APIs
- `GET /api/blog` - Get all published blogs
- `GET /api/blog/[id]` - Get single blog by ID
- `POST /api/comment` - Submit a comment
- `GET /api/comment?blogId=[id]` - Get approved comments for a blog

### Admin APIs (Requires JWT)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard-data` - Dashboard statistics
- `GET /api/blog/admin-blogs` - Get all blogs (including drafts)
- `POST /api/blog/create-blog` - Create new blog
- `POST /api/blog/toggle-publish` - Publish/unpublish blog
- `POST /api/blog/delete-blog` - Delete blog
- `POST /api/blog/generate` - Generate content with AI
- `GET /api/comment/comments-admin` - Get all comments
- `POST /api/comment/approve-comment` - Approve comment
- `POST /api/comment/delete/[id]` - Delete comment

## 🎯 Key Features Explained

### Skeleton Loading
Beautiful loading states with shimmer animations prevent layout shift and improve perceived performance.

### AI Content Generation
Click "Generate with AI" when creating a blog to automatically generate content based on your title using Google Gemini.

### Comment Moderation
All comments require admin approval before appearing publicly, preventing spam and maintaining quality.

### Draft System
Save blogs as drafts to work on them later, or publish immediately to make them visible to everyone.

### Search & Filter
Real-time search across blog titles and categories with instant filtering by category tags.

## 🐛 Troubleshooting

### Build Fails
```bash
npm run lint  # Fix ESLint errors
npm run build # Test build locally
```

### MongoDB Connection Error
- Check connection string format
- Verify IP whitelist includes `0.0.0.0/0`
- Ensure database user has read/write permissions

### Images Not Loading
- Verify Cloudinary credentials
- Check `next.config.mjs` has correct domains

### AI Generation Fails
- Check Gemini API key is valid
- If "high demand" error, wait and retry
- Verify API quota hasn't been exceeded

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**Ahmed Mohamed**
- Email: ahmed@gmail.com
- GitHub: [@Ahmed1492](https://github.com/Ahmed1492)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- MongoDB for database
- Cloudinary for image hosting
- Google for Gemini AI

## 📞 Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/Ahmed1492/blog-nest-next-app/issues)
- Check `DEPLOYMENT.md` for deployment help
- Review `BRANDING.md` for design guidelines

---

**Made with ❤️ by Ahmed Mohamed**
