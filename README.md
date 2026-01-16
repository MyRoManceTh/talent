# 🚀 Expert Connect Platform

**A Professional Expert-Seeker Matching Platform with AI-Powered Recommendations**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg)](https://www.postgresql.org/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Expert Connect** is a comprehensive platform that bridges the gap between **experts** (consultants, advisors, specialists) and **seekers** (individuals or organizations looking for expertise). The platform uses **AI-powered matching algorithms** to ensure optimal expert-seeker pairings based on detailed project requirements.

### The Problem We Solve

Traditional expert-finding methods face several challenges:
- ❌ Time-consuming manual search processes
- ❌ Difficulty in assessing expert-project fit
- ❌ Unclear project requirements leading to mismatches
- ❌ Inefficient communication and coordination
- ❌ Lack of transparency in expertise and availability

### Our Solution

Expert Connect provides:
- ✅ **Intelligent Matching**: AI-powered recommendations based on comprehensive criteria
- ✅ **Structured Intake**: Detailed brief system to capture project requirements
- ✅ **Transparent Profiles**: Comprehensive expert profiles with skills, experience, and ratings
- ✅ **Seamless Workflow**: End-to-end consultation request and management system
- ✅ **Quality Assurance**: Rating and review system for continuous improvement

---

## 🌟 Key Features

### For Seekers (Clients)

#### 1. **Intake/Brief System** 📋
- Create detailed project briefs with comprehensive requirements
- Specify project type, goals, timeline, budget, and preferences
- Multi-select options for work modes (Online/Onsite/Hybrid)
- Language preferences and urgency levels
- Save and reuse briefs for similar projects

#### 2. **AI-Powered Recommendations** 🤖
- Intelligent expert matching based on:
  - Skills and expertise
  - Industry experience
  - Work mode compatibility
  - Language proficiency
  - Budget alignment
  - Availability status
  - Expert ratings
- Matching score percentage for each expert
- Sorted recommendations by relevance

#### 3. **Expert Discovery** 🔍
- Browse comprehensive expert profiles
- Filter by skills, industries, and experience
- View portfolios, achievements, and credentials
- Check availability and hourly rates
- Read reviews and ratings from previous clients

#### 4. **Consultation Management** 💼
- Track all consultation requests in one place
- View consultation status (Pending, Accepted, In Progress, Completed)
- Communicate with matched experts
- Provide feedback and ratings after completion

### For Experts (Consultants)

#### 1. **Professional Profile** 👤
- Comprehensive profile with headline and bio
- Educational background
- Work experience history
- Skills with proficiency levels
- Industry expertise
- Portfolio and achievements
- Certifications and credentials

#### 2. **Availability Management** 📅
- Set availability status (Available, Busy, Not Available)
- Define preferred work modes
- Set hourly rates
- Specify language proficiencies
- Update location and timezone

#### 3. **Consultation Requests** 📬
- Receive matched consultation requests
- View detailed project briefs
- Accept or decline requests
- Manage active consultations
- Track consultation history

#### 4. **Reputation Building** ⭐
- Accumulate ratings from completed projects
- Showcase client reviews
- Build consultation history
- Display success metrics

### Platform Features

#### 1. **User Authentication & Authorization** 🔐
- Secure JWT-based authentication
- Role-based access control (Expert, Seeker, Admin)
- Email verification
- Password reset functionality

#### 2. **Responsive Design** 📱
- Mobile-first approach
- Touch-friendly interfaces (44x44px minimum targets)
- Optimized for all screen sizes
- Progressive Web App capabilities

#### 3. **AI Matching Algorithm** 🧠
- Multi-factor scoring system (130 points max)
- Weighted criteria:
  - Work mode compatibility: 20 points
  - Language matching: 15 points
  - Budget alignment: 25 points
  - Years of experience: up to 20 points
  - Expert rating: up to 50 points
- Continuous learning and optimization

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Browser    │  │    Mobile    │  │   Tablet     │      │
│  │   (React)    │  │   (React)    │  │   (React)    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │
                    │   (Express.js)  │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│ Authentication │  │    Business     │  │   AI Matching  │
│    Service     │  │     Logic       │  │    Engine      │
│   (JWT/Auth)   │  │  (Controllers)  │  │  (Algorithm)   │
└───────┬────────┘  └────────┬────────┘  └───────┬────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Data Layer    │
                    │  (Prisma ORM)   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    └─────────────────┘
```

### Component Architecture

```
Frontend (React)
├── App.js (Main Router)
├── Contexts
│   └── AuthContext.js (Authentication State)
├── Components
│   ├── Layout
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── Common
│   │   └── PrivateRoute.js
│   └── Forms
│       └── IntakeBriefForm.js
└── Pages
    ├── Public
    │   ├── LandingPage.js
    │   ├── LoginPage.js
    │   └── RegisterPage.js
    ├── Expert
    │   ├── ExpertDashboard.js
    │   ├── ExpertProfile.js
    │   └── ExpertConsultations.js
    └── Seeker
        ├── SeekerDashboard.js
        ├── CreateBrief.js
        ├── MyBriefs.js
        └── BriefRecommendations.js

Backend (Node.js + Express)
├── server.js (Entry Point)
├── Config
│   ├── logger.js
│   └── database.js
├── Middleware
│   ├── auth.js
│   └── errorHandler.js
├── Controllers
│   ├── authController.js
│   ├── expertController.js
│   ├── seekerController.js
│   └── briefController.js
├── Routes
│   ├── authRoutes.js
│   ├── expertRoutes.js
│   ├── seekerRoutes.js
│   └── briefRoutes.js
└── Services
    └── matchingService.js
```

---

## 🔄 How It Works

### User Journey: Seeker Finding an Expert

```mermaid
sequenceDiagram
    participant S as Seeker
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant AI as AI Engine

    S->>F: Register/Login
    F->>B: POST /api/auth/login
    B->>DB: Verify credentials
    DB-->>B: User data
    B-->>F: JWT token
    
    S->>F: Navigate to Create Brief
    F->>F: Display IntakeBrief Form
    S->>F: Fill project details
    S->>F: Submit brief
    F->>B: POST /api/briefs
    B->>DB: Save brief
    DB-->>B: Brief ID
    
    F->>B: POST /api/briefs/:id/recommendations
    B->>DB: Fetch available experts
    DB-->>B: Expert list
    B->>AI: Calculate matching scores
    AI-->>B: Scored experts
    B-->>F: Ranked recommendations
    
    F->>S: Display matched experts
    S->>F: Select expert
    S->>F: Contact expert
    F->>B: POST /api/consultations
    B->>DB: Create consultation request
    DB-->>B: Consultation ID
    B-->>F: Success
    F-->>S: Confirmation
```

### AI Matching Algorithm Flow

```
1. Input: Project Brief
   ├── Project Type
   ├── Skills Required
   ├── Budget Range
   ├── Timeframe
   ├── Work Mode
   ├── Languages
   └── Urgency

2. Filter Experts
   ├── Availability = AVAILABLE
   ├── Work Mode Match (if specified)
   └── Language Match (if specified)

3. Score Each Expert
   ├── Work Mode Compatibility (20 pts)
   ├── Language Matching (15 pts)
   ├── Budget Alignment (25 pts)
   ├── Years of Experience (20 pts)
   └── Expert Rating (50 pts)
   Total: 130 points max

4. Rank & Sort
   ├── Calculate percentage score
   ├── Sort by highest score
   └── Return top N experts

5. Display Results
   ├── Show matching percentage
   ├── Display expert profiles
   └── Enable contact
```

### Brief Creation Process

```
Step 1: Project Information
├── Select project type (12 options)
├── Enter topic/name
└── Add detailed description

Step 2: Goals & Expectations
├── Define main goals
├── Specify expected outcomes
└── List deliverables

Step 3: Format & Location
├── Select work modes (multi-select)
│   ├── Online
│   ├── Onsite
│   └── Hybrid
├── Specify location
└── Add venue details (for onsite)

Step 4: Timeline
├── Choose timeframe (6 options)
├── Set start date (optional)
├── Set end date (optional)
├── Estimate hours
└── Set urgency level (4 levels)

Step 5: Budget
├── Enter budget range (min-max)
├── Select currency
└── Toggle flexibility

Step 6: Languages
└── Select languages (multi-select)

Step 7: Additional Info
├── Industry context
├── Target audience
├── Specific requirements
└── Special notes

Step 8: Review & Submit
├── Validate required fields
├── Submit to backend
└── Navigate to recommendations
```

---

## 💻 Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | UI Framework |
| **React Router** | 6+ | Client-side routing |
| **Tailwind CSS** | 3+ | Styling framework |
| **Vite** | Latest | Build tool & dev server |
| **React Toastify** | Latest | Notifications |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 4+ | Web framework |
| **Prisma ORM** | Latest | Database ORM |
| **PostgreSQL** | 15+ | Relational database |
| **JWT** | Latest | Authentication |
| **bcrypt** | Latest | Password hashing |
| **Winston** | Latest | Logging |

### DevOps & Tools

| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **GitHub** | Code repository |
| **Railway** | PostgreSQL hosting |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ installed
- PostgreSQL 15+ installed (or Railway account)
- Git installed
- npm or yarn package manager

### Step 1: Clone Repository

```bash
git clone https://github.com/MyRoManceTh/talent.git
cd talent
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### Step 3: Environment Configuration

**Backend (.env):**
```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Database Setup

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database
npm run seed
```

### Step 5: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 6: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

---

## 📖 Usage

### For Seekers

1. **Register** as a Seeker
2. **Create a Brief** with your project details
3. **View Recommendations** - AI-matched experts
4. **Contact Expert** - Send consultation request
5. **Manage Consultations** - Track requests and projects
6. **Provide Feedback** - Rate and review after completion

### For Experts

1. **Register** as an Expert
2. **Complete Profile** - Add skills, experience, portfolio
3. **Set Availability** - Update status and preferences
4. **Receive Requests** - View matched consultation requests
5. **Accept Projects** - Start working with clients
6. **Build Reputation** - Accumulate ratings and reviews

---

## 📡 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
POST   /api/auth/refresh        - Refresh JWT token
POST   /api/auth/logout         - Logout user
POST   /api/auth/forgot-password - Request password reset
POST   /api/auth/reset-password  - Reset password
```

### Expert Endpoints

```
GET    /api/experts             - List all experts
GET    /api/experts/:id         - Get expert by ID
GET    /api/experts/profile     - Get own profile
PUT    /api/experts/profile     - Update own profile
POST   /api/experts/education   - Add education
POST   /api/experts/experience  - Add work experience
POST   /api/experts/skills      - Add skills
```

### Seeker Endpoints

```
GET    /api/seekers/profile     - Get own profile
PUT    /api/seekers/profile     - Update own profile
```

### Brief Endpoints

```
POST   /api/briefs              - Create new brief
GET    /api/briefs              - List own briefs
GET    /api/briefs/:id          - Get brief by ID
PUT    /api/briefs/:id          - Update brief
DELETE /api/briefs/:id          - Delete brief (soft)
POST   /api/briefs/:id/recommendations - Get matched experts
```

### Consultation Endpoints

```
POST   /api/consultations       - Create consultation request
GET    /api/consultations       - List consultations
GET    /api/consultations/:id   - Get consultation details
PUT    /api/consultations/:id   - Update consultation status
POST   /api/consultations/:id/accept   - Accept request (Expert)
POST   /api/consultations/:id/decline  - Decline request (Expert)
POST   /api/consultations/:id/complete - Mark as completed
POST   /api/consultations/:id/review   - Add review & rating
```

---

## 🗃️ Database Schema

### Core Tables

**users**
- `id` (UUID, PK)
- `email` (String, Unique)
- `password` (String, Hashed)
- `firstName` (String)
- `lastName` (String)
- `role` (Enum: EXPERT, SEEKER, ADMIN)
- `phoneNumber` (String, Optional)
- `profileImage` (String, Optional)
- `isVerified` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

**experts**
- `id` (UUID, PK)
- `userId` (UUID, FK → users)
- `headline` (String)
- `bio` (Text)
- `linkedinUrl` (String)
- `yearsOfExperience` (Int)
- `hourlyRate` (Decimal)
- `availability` (Enum: AVAILABLE, BUSY, NOT_AVAILABLE)
- `country`, `city`, `timezone` (String)
- `preferredMode` (Array: ONLINE, ONSITE, HYBRID)
- `languages` (String[])
- `rating` (Decimal)
- `totalConsultations` (Int)
- `createdAt`, `updatedAt` (DateTime)

**seekers**
- `id` (UUID, PK)
- `userId` (UUID, FK → users)
- `organizationType` (Enum)
- `organizationName` (String)
- `organizationSize` (String)
- `website` (String)
- `position`, `department` (String)
- `createdAt`, `updatedAt` (DateTime)

**project_briefs**
- `id` (UUID, PK)
- `userId` (UUID, FK → users)
- `projectType` (Enum: 12 types)
- `topic` (String)
- `detailedDescription` (Text)
- `goals`, `expectedOutcomes` (Text)
- `format` (Array: WorkMode)
- `location`, `specificLocation` (String)
- `timeframe` (Enum: 6 types)
- `startDate`, `endDate` (DateTime)
- `estimatedHours` (Int)
- `urgency` (Enum: 4 levels)
- `budgetMin`, `budgetMax` (Decimal)
- `budgetCurrency` (String)
- `budgetFlexible` (Boolean)
- `languages` (String[])
- `industryContext`, `targetAudience` (Text)
- `specificRequirements`, `deliverables` (Text)
- `isActive` (Boolean)
- `lastUsedAt` (DateTime)
- `createdAt`, `updatedAt` (DateTime)

**consultations**
- `id` (UUID, PK)
- `seekerId` (UUID, FK → seekers)
- `expertId` (UUID, FK → experts)
- `briefId` (UUID, FK → project_briefs)
- `title` (String)
- `problemStatement` (Text)
- `expectations`, `scope` (Text)
- `budget` (Decimal)
- `duration` (String)
- `preferredMode` (Array: WorkMode)
- `matchingScore` (Decimal)
- `aiRationale` (Text)
- `status` (Enum: 8 statuses)
- `requestedAt`, `respondedAt` (DateTime)
- `startDate`, `endDate` (DateTime)
- `rating` (Int)
- `review` (Text)
- `createdAt`, `updatedAt` (DateTime)

### Supporting Tables

- **educations** - Expert education history
- **work_experiences** - Expert work history
- **skills** - Skill master list
- **expert_skills** - Expert-skill relationships with proficiency
- **industries** - Industry master list
- **expert_industries** - Expert-industry relationships
- **seeker_industries** - Seeker-industry relationships
- **achievements** - Expert achievements/portfolio
- **matching_history** - AI matching analytics

---

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-50:  #eff6ff;
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Urgency Colors */
--green-100:  #dcfce7;  /* Low urgency */
--yellow-100: #fef9c3;  /* Medium urgency */
--orange-100: #ffedd5;  /* High urgency */
--red-100:    #fee2e2;  /* Critical urgency */

/* Neutral Colors */
--gray-50:  #f9fafb;
--gray-100: #f3f4f6;
--gray-600: #4b5563;
--gray-900: #111827;
```

### Typography

```css
/* Font Family */
font-family: 'Inter', system-ui, sans-serif;

/* Font Sizes (Responsive) */
text-xs:   0.75rem;  /* 12px */
text-sm:   0.875rem; /* 14px */
text-base: 1rem;     /* 16px */
text-lg:   1.125rem; /* 18px */
text-xl:   1.25rem;  /* 20px */
text-2xl:  1.5rem;   /* 24px */
text-3xl:  1.875rem; /* 30px → Mobile */
text-5xl:  3rem;     /* 48px → Tablet */
text-7xl:  4.5rem;   /* 72px → Desktop */
```

### Spacing System

```css
/* Base: 4px */
space-1:  0.25rem;  /* 4px */
space-2:  0.5rem;   /* 8px */
space-3:  0.75rem;  /* 12px */
space-4:  1rem;     /* 16px */
space-6:  1.5rem;   /* 24px */
space-8:  2rem;     /* 32px */
space-12: 3rem;     /* 48px */
space-16: 4rem;     /* 64px */
```

### Responsive Breakpoints

```css
/* Mobile First */
sm:  640px;   /* Small devices */
md:  768px;   /* Tablets */
lg:  1024px;  /* Laptops */
xl:  1280px;  /* Desktops */
2xl: 1536px;  /* Large screens */
```

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

### Test Coverage

```bash
# Generate coverage report
npm run test:coverage
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'feat: Add AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes (formatting, etc.)
refactor: Code refactoring
test:     Adding or updating tests
chore:    Maintenance tasks
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Project Maintainer**: MyRoManceTh  
**Repository**: https://github.com/MyRoManceTh/talent

---

## 📞 Support

For support, please:
- Open an issue on GitHub
- Email: support@expertconnect.com
- Documentation: See `/docs` folder

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ User authentication & authorization
- ✅ Expert & Seeker profiles
- ✅ Intake/Brief system
- ✅ AI-powered matching
- ✅ Consultation management
- ✅ Mobile-responsive design

### Version 2.0 (Q1 2026)
- [ ] Brief templates
- [ ] Auto-save drafts
- [ ] Advanced search filters
- [ ] Real-time chat
- [ ] Payment integration
- [ ] Calendar integration

### Version 3.0 (Q2 2026)
- [ ] Video consultations
- [ ] Document sharing
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced AI matching with ML

---

## 🎉 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Prisma Team for the excellent ORM
- All contributors and testers

---

**Made with ❤️ by the Expert Connect Team**

*Connecting Expertise with Opportunity*
