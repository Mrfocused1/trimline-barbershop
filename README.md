# Trimline - Premium Barber Portfolio & Booking Website

A modern, responsive frontend prototype for a premium barber portfolio and booking system. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit **http://localhost:3000** to view the application.

---

## ✨ Features

### Public Website
- **Premium Home Page**: Hero section with stats, services preview, gallery, reviews, and CTA
- **Services Catalog**: Complete list of grooming services with pricing and duration
- **Booking Flow**: 5-step booking process with service selection, time slot picker, client details, payment prototype, and confirmation
- **Gallery**: Masonry layout showcasing before/after transformations
- **Reviews**: Client testimonials with 5-star ratings
- **About & Policies**: Business information and transparent policies

### Dashboard (Barber Side)
- **Overview**: Today's schedule, upcoming bookings, revenue stats
- **Bookings Management**: View, filter, update booking statuses
- **Services Management**: Add/edit/toggle services
- **Availability**: Configure weekly hours and blackout dates
- **Gallery Management**: Upload and manage portfolio images
- **Settings**: Business information and booking configuration

### Premium UX Features
- ✅ **Magnetic Hover Buttons**: Interactive magnetic effect on CTAs
- ✅ **Smooth Page Transitions**: Framer Motion powered animations
- ✅ **Card Lift & Reveal**: Animated cards with hover effects
- ✅ **Micro-animations**: Focus states, success feedback, toast notifications
- ✅ **Reduced Motion Support**: Respects `prefers-reduced-motion` preference
- ✅ **Mobile-First Responsive**: Works beautifully on all screen sizes
- ✅ **Stripe Test Mode**: Payment UI prototype with clear test labeling

---

## 🏗️ Tech Stack

### Core
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Production-grade animations

### State & Data
- **Zustand** - Lightweight state management
- **Local Storage** - Persist bookings between sessions
- **date-fns** - Date/time utilities

### UI Components
- **shadcn/ui** - Accessible component primitives (Radix UI)
- **Lucide Icons** - Beautiful icon set
- **React Hook Form** - Performant form validation
- **Zod** - Runtime schema validation

### Prototype Features
- **Stripe Elements** - Payment UI components (test mode)

---

## 📁 Project Structure

```
trimline/
├── app/
│   ├── (public)/              # Public-facing routes
│   │   ├── page.tsx           # Home
│   │   ├── services/          # Services catalog
│   │   ├── booking/           # 5-step booking flow
│   │   ├── gallery/           # Before/after gallery
│   │   ├── reviews/           # Client testimonials
│   │   ├── about/             # About page
│   │   └── policies/          # Policies
│   │
│   ├── (dashboard)/           # Protected dashboard
│   │   └── dashboard/
│   │       ├── page.tsx       # Overview
│   │       ├── bookings/      # Bookings management
│   │       ├── services/      # Services CRUD
│   │       ├── availability/  # Schedule management
│   │       ├── gallery/       # Gallery management
│   │       └── settings/      # Business settings
│   │
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
│
├── components/
│   ├── ui/                    # shadcn components
│   ├── booking/               # Booking flow components
│   ├── dashboard/             # Dashboard components
│   ├── public/                # Public site components
│   └── shared/                # Shared utilities
│
├── lib/
│   ├── utils.ts               # Utility functions
│   ├── availability.ts        # Time slot generation
│   ├── hooks/                 # Custom React hooks
│   └── validations/           # Zod schemas
│
├── store/                     # Zustand stores
│   ├── bookingStore.ts
│   ├── serviceStore.ts
│   ├── availabilityStore.ts
│   ├── galleryStore.ts
│   └── barberStore.ts
│
├── data/                      # Mock data
│   ├── barber.ts
│   ├── services.ts
│   ├── availability.ts
│   ├── reviews.ts
│   └── gallery.ts
│
└── types/
    └── index.ts               # TypeScript interfaces
```

---

## 🎨 Key Components

### Booking Flow
The 5-step booking process is the centerpiece of the application:

1. **Service Selection** - Choose from available services
2. **Time Slot Picker** - Select date and available time
3. **Client Details** - Enter contact information
4. **Payment Prototype** - Simulated Stripe payment (test mode)
5. **Confirmation** - Booking summary with all details

### State Management
Zustand stores handle all application state:
- **Bookings**: CRUD operations, persist to localStorage
- **Services**: Service management with active/inactive toggle
- **Availability**: Weekly schedule and blackout dates
- **Gallery**: Image management with public/private toggle
- **Barber**: Business settings and configuration

### Animation Components
- **MagneticButton**: Interactive hover effect with spring physics
- **PageTransition**: Smooth route transitions
- **AnimatedCard**: Card lift with viewport-triggered animations
- **MotionWrapper**: Conditional animations respecting reduced motion

---

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
# Stripe Test Mode (optional - UI prototype only)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
```

### Business Settings
Configured in `data/barber.ts`:
- Booking buffer time (minutes between appointments)
- Advance booking window (days)
- Deposit percentage
- Cancellation notice period

### Availability
Configured in `data/availability.ts`:
- Weekly operating hours (day-specific)
- Blackout dates

---

## 🎯 Prototype Notes

### Frontend-Only Architecture
This is a **frontend prototype** with no backend:
- All data stored in Zustand + localStorage
- No authentication system
- Stripe integration is UI-only (test mode)
- No email notifications (simulated)

### Test Payment Flow
The payment step shows:
- ⚠️ Clear "Prototype - Test Mode Only" warnings
- Simulated payment processing
- No real charges are made
- Ready for Stripe Elements integration

### Production Readiness
To make this production-ready, you would need:
- Backend API (Next.js API routes, separate server, or serverless)
- Database (PostgreSQL, MongoDB, etc.)
- Real Stripe integration with webhook handlers
- Authentication system (NextAuth.js, Auth0, etc.)
- Email service (Resend, SendGrid, etc.)

---

## 🎨 Design System

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tracking-tight
- **Body**: Regular, relaxed leading

### Colors
- **Primary**: Black (#000000)
- **Muted**: Gray shades
- **Success**: Green-500
- **Destructive**: Red-500
- **Warning**: Yellow-500

### Spacing
- Follows Tailwind's spacing scale
- Consistent padding/margins
- 8px base unit

### Animations
- **Duration**: 200-400ms
- **Easing**: ease-out
- **Spring**: stiffness 150, damping 15

---

## ♿ Accessibility

✅ **WCAG Compliant Components** (via Radix UI)
✅ **Keyboard Navigation** - Full keyboard support
✅ **Focus Indicators** - Visible focus states
✅ **ARIA Labels** - Screen reader friendly
✅ **Reduced Motion** - Respects user preferences
✅ **Color Contrast** - Meets WCAG AA standards

---

## 📱 Responsive Design

- **Mobile-First**: Optimized for small screens
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
- **Flexible Grids**: Adapts to all screen sizes
- **Touch-Friendly**: Appropriate tap targets (min 44x44px)

---

## 🚦 Performance

### Optimization Strategies
- Server Components (where possible)
- Lazy loading for images
- Code splitting (automatic with Next.js)
- Optimized bundle size
- Minimal client-side JavaScript

### Lighthouse Targets
- LCP: ≤ 2.5s
- Accessibility: ≥ 95
- Best Practices: ≥ 90

---

## 🧪 Testing (Future)

Suggested testing setup:
```bash
# Unit tests
npm install -D vitest @testing-library/react @testing-library/jest-dom

# E2E tests
npm install -D @playwright/test
```

---

## 🤝 Contributing

This is a prototype project. Suggestions for improvements:

1. Add backend integration
2. Implement real authentication
3. Connect to live Stripe
4. Add email notifications
5. Implement calendar integration
6. Add SMS reminders
7. Build mobile app (React Native)

---

## 📄 License

MIT License - feel free to use this prototype for your own projects!

---

## 🙏 Credits

- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide](https://lucide.dev/)
- **Images**: [Unsplash](https://unsplash.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Review the code comments
- Check the type definitions in `types/index.ts`

---

**Built with ❤️ using Next.js and TypeScript**
