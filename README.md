# FutureHome Electronics - E-commerce Website

A premium, futuristic e-commerce website for FutureHome Electronics, built with Next.js 16, TypeScript, and Material UI.

## 🚀 Features

### Design & Theme
- **Modern & Futuristic**: Premium light mode design with soft blue accent colors
- **Glassmorphism Effects**: Subtle glassmorphism on selected cards and components
- **Smooth Animations**: Transitions for scrolling sections, card hovers, and interactive elements
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

### Pages & Sections

#### Home Page
- Hero section with gradient background and animated floating elements
- Promotional flyers strip (4 featured deals/categories)
- Featured categories grid with glassmorphism cards
- Featured products grid (12 products)
- Deals section with live countdown timer
- Brand strip with partner logos

#### Products Page
- Advanced filtering (search, category, price range)
- Sorting options (featured, price, name, rating)
- Responsive product grid
- Real-time filter updates

#### Product Details Page *(Coming Soon)*
- Product images gallery
- Detailed specifications
- Customer reviews
- Related products

#### Shopping Cart
- Cart management (add, remove, update quantities)
- Order summary with shipping calculation
- Persistent cart storage (localStorage)
- Cart drawer for quick access

#### Wishlist
- Save favorite products
- Quick add to cart from wishlist
- Persistent wishlist storage

#### About Page
- Company story and mission
- Key statistics and values
- Professional layout

#### Contact Page
- Contact form with validation
- Business hours and contact information
- Responsive two-column layout

### Components

#### Global Components
- **Header**: Sticky navigation with search, cart, wishlist, and mobile menu
- **Footer**: Multi-column footer with links and social media
- **CartDrawer**: Slide-in cart panel from right
- **ProductCard**: Interactive product cards with hover effects, wishlist toggle, and quick actions

### State Management
- **CartContext**: Global cart state with localStorage persistence
- **WishlistContext**: Global wishlist state with localStorage persistence

### Technology Stack
- **Frontend**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: Material UI (MUI) v6
- **Styling**: MUI styling system with custom theme
- **State Management**: React Context API
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd e-commecre

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.

## 🎨 Theme Configuration

The custom MUI theme is configured in `src/theme/theme.ts`:

- **Primary Color**: Soft light blue (#6BBAEC)
- **Secondary Color**: Deeper blue (#3D8FC7)
- **Typography**: Inter font family
- **Components**: Custom styles for Button, Card, Chip, TextField, AppBar

## 📁 Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── cart/           # Cart page
│   ├── contact/        # Contact page
│   ├── products/       # Products listing page
│   ├── wishlist/       # Wishlist page
│   ├── layout.tsx      # Root layout with providers
│   └── page.tsx        # Home page
├── components/
│   ├── home/           # Home page sections
│   │   ├── Hero.tsx
│   │   ├── PromoFlyers.tsx
│   │   ├── FeaturedCategories.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── DealsSection.tsx
│   │   └── BrandStrip.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CartDrawer.tsx
│   ├── ProductCard.tsx
│   └── ThemeProvider.tsx
├── context/
│   ├── CartContext.tsx
│   └── WishlistContext.tsx
├── data/
│   └── products.ts     # 30 dummy products
└── theme/
    └── theme.ts        # Custom MUI theme
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 📝 Product Data

The website includes 30 realistic dummy products across 5 categories:
- Gaming Gear (keyboards, mice, headsets, controllers, etc.)
- Smart Home (WiFi plugs, cameras, doorbells, thermostats, etc.)
- Power & Plugs (surge protectors, adapters, charging stations, etc.)
- Audio (earbuds, speakers, headphones, soundbars, etc.)
- Accessories (hubs, chargers, stands, webcams, etc.)

Each product includes:
- Detailed descriptions
- Technical specifications
- Pricing (with optional discounts)
- Ratings
- Category tags
- Special badges (New, Best Seller, Hot, Limited)

## 🎯 Future Enhancements

- [ ] Product detail pages with image gallery and reviews
- [ ] User authentication and accounts
- [ ] Checkout and payment integration
- [ ] Order tracking
- [ ] Product search with autocomplete
- [ ] Filters by tags and specifications
- [ ] Product comparison feature
- [ ] Customer reviews and ratings system
- [ ] Backend API integration
- [ ] Admin dashboard for product management

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

All components adapt seamlessly to different screen sizes with appropriate layouts and touch-friendly interactions on mobile.

## 🔒 Data Persistence

Cart and wishlist data are stored in the browser's localStorage, ensuring:
- Items persist across page reloads
- Seamless user experience
- No backend required for basic functionality

## 🎨 Design Features

- **Gradient Backgrounds**: Subtle gradients using theme colors
- **Floating Animations**: CSS keyframe animations for visual appeal
- **Hover Effects**: Smooth transitions and transformations on interactive elements
- **Card Elevations**: Contextual shadows for depth
- **Color System**: Consistent color palette throughout
- **Typography Hierarchy**: Clear content structure with varying font sizes and weights

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

This is a demo project. For improvements or suggestions, feel free to create an issue or pull request.

---

Built with ❤️ using Next.js and Material UI
