# Nuxt 3 Blog Application

A modern, responsive blog application built with Nuxt 3, TypeScript, and SCSS. This project demonstrates best practices for building scalable and maintainable web applications using the latest Vue.js ecosystem technologies.

## ✨ Features

- **🎨 Modern Design**: Clean, responsive UI with mobile-first approach
- **⚡ Server-Side Rendering**: Built with Nuxt 3 for optimal performance and SEO
- **🔤 TypeScript**: Full type safety with comprehensive interface definitions
- **💅 SCSS Styling**: Organized stylesheets with variables and component-scoped styles
- **📱 Responsive Layout**: Optimized for all screen sizes and devices
- **🔄 Real-time Data**: Fetches data from JSONPlaceholder API
- **📑 Pagination**: Load more functionality with state persistence
- **🔍 SEO Optimized**: Dynamic meta tags and structured data
- **⚠️ Error Handling**: Comprehensive error states with retry functionality
- **💾 State Management**: Client-side state persistence with session storage
- **🧩 Component Architecture**: Reusable Vue 3 components with composables
- **🎯 Navigation**: Breadcrumb navigation and smooth routing

## 📋 Tech Stack

- **[Nuxt 3](https://nuxt.com/)** - The Vue.js Framework for production
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript Framework with Composition API
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** - Mock REST API for demo data
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nuxt-blog
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using pnpm
   pnpm install
   
   # Using yarn
   yarn install
   
   # Using bun
   bun install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using pnpm
   pnpm dev
   
   # Using yarn
   yarn dev
   
   # Using bun
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000` to see the application.

## 🏗️ Project Structure

```
├── app/
│   └── app.vue                 # Root application component
├── assets/
│   └── styles/
│       ├── main.scss          # Main stylesheet imports
├── components/
│   ├── LoadMore.vue           # Load more posts component
│   └── PostCard.vue           # Individual post card component
├── composables/
│   ├── usePost.ts             # Single post data management
│   └── usePosts.ts            # Posts list data management
├── pages/
│   ├── posts/
│   │   └── [id].vue           # Dynamic post detail page
│   ├── about.vue              # About page
│   └── index.vue              # Home page with posts list
├── public/
│   ├── favicon.ico            # Site favicon
│   └── robots.txt             # SEO robots file
├── types/
│   └── api.ts                 # TypeScript interface definitions
├── nuxt.config.ts             # Nuxt configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## 🏛️ Architecture Overview

This application follows a modern component-based architecture leveraging Nuxt 3's powerful features. The project implements a clean separation of concerns with dedicated composables for data management, reusable components for UI elements, and TypeScript interfaces for type safety throughout the application.

The architecture emphasizes performance through server-side rendering (SSR) for initial page loads while maintaining client-side interactivity for subsequent navigation. State management is handled through Vue 3's Composition API with custom composables that provide reactive data, loading states, error handling, and persistence capabilities. The styling system uses SCSS with a centralized variable system ensuring consistent design patterns across all components.

## 📱 Pages & Features

### Home Page (`/`)
- **Posts Grid**: Responsive grid layout showing blog posts
- **Pagination**: Load more functionality with infinite scroll
- **Loading States**: Skeleton loading and spinner animations
- **Error Handling**: Retry functionality for failed requests
- **State Persistence**: Maintains scroll position and loaded posts

### Post Detail Page (`/posts/[id]`)
- **Dynamic Routing**: SEO-friendly URLs for each post
- **Comments Section**: Displays post comments with user information
- **Breadcrumb Navigation**: Easy navigation back to home
- **Meta Tags**: Dynamic SEO meta tags for each post
- **Error Boundaries**: Handles missing posts gracefully

### About Page (`/about`)
- **Project Information**: Technical details and features overview
- **Tech Stack**: Comprehensive list of technologies used
- **Architecture**: High-level project structure explanation

## 🧩 Components

### PostCard
Reusable component for displaying post previews with:
- Post title and excerpt
- Author and post ID information
- Click-through navigation
- Hover animations

### LoadMore
Smart pagination component featuring:
- Load more button when content is available
- Loading spinner during fetch operations
- End-of-content messaging
- Automatic state management

## 🔧 Composables

### usePosts()
Manages the posts list with comprehensive functionality:
- **Data Fetching**: Paginated API calls with error handling
- **State Management**: Reactive posts array and loading states
- **Persistence**: Session storage for state restoration
- **Scroll Management**: Maintains scroll position across navigation

### usePost()
Handles individual post data management:
- **Single Post Fetching**: Retrieve specific post by ID
- **Comments Loading**: Fetch associated comments
- **Error Handling**: Comprehensive error states
- **Reactive Updates**: Automatic data updates on ID changes

## 🎨 Styling System

The application uses a structured SCSS approach:
- **Component Scoping**: Scoped styles prevent CSS conflicts
- **Responsive Design**: Mobile-first media queries
- **Utility Classes**: Common utility classes for spacing and text
- **Consistent Theming**: Unified design system across components

## 🚢 Production Build

Build the application for production:

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🔧 Configuration

The application is configured for optimal development and production performance:

- **Development Server**: Configured to run on `0.0.0.0:5000` for Replit compatibility
- **Hot Module Replacement**: WebSocket configuration for live updates
- **TypeScript**: Strict type checking enabled
- **SEO**: Automatic sitemap and meta tag generation

## 🌐 Deployment

This application is optimized for deployment on:
- **Replit**: Pre-configured for Replit hosting
- **Vercel**: Zero-config deployment for Nuxt applications
- **Netlify**: Static site generation support
- **Node.js Servers**: Universal rendering capabilities

## 📈 Performance Features

- **Server-Side Rendering**: Initial page loads are fully rendered
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Lazy loading and responsive images
- **Caching Strategy**: Intelligent caching for API responses
- **Bundle Optimization**: Tree-shaking and minification

## 🧪 Development Features

- **TypeScript**: Full type safety and IDE support
- **Hot Reload**: Instant updates during development
- **ESLint Ready**: Code quality and consistency
- **DevTools**: Vue and Nuxt developer tools integration
- **Error Overlay**: Detailed error information in development

## 📝 API Integration

The application integrates with the JSONPlaceholder API:
- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Endpoints**: `/posts`, `/posts/{id}`, `/posts/{id}/comments`
- **Data Format**: Standard JSON responses
- **Error Handling**: Comprehensive API error management

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Nuxt Team** for the excellent framework
- **JSONPlaceholder** for providing the demo API
- **Vue.js Community** for the comprehensive ecosystem
- **TypeScript Team** for type safety tools

---

**Built with ❤️ using Nuxt 3 and modern web technologies**
