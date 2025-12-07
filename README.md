# Expert Connect - Expert-Matching Platform

## Project Overview

Expert Connect is an AI-powered intermediary platform that connects **Experts/Teachers** (with skills, experience, or retirees) with **Seekers/Organizations** (SMEs, large companies, universities) using an intelligent AI Matching Engine.

## Key Features

### For Experts (Providers)
- Comprehensive profile creation with education, work experience, and skills
- Portfolio and achievement showcase
- LinkedIn integration for automatic data import
- Receive and review consultation requests

### For Seekers (Clients)
- Define business problems and consultation needs
- Get AI-powered expert recommendations with detailed rationale
- Send connection requests directly to matched experts
- Track consultation status

### AI Matching Engine
- Semantic analysis of needs vs. expert profiles
- Multi-dimensional weighted scoring:
  - Industry fit
  - Seniority match
  - Technical skill alignment
- Explainable AI recommendations with clear reasoning

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (relational) + Pinecone/Weaviate (vector DB for semantic search)
- **AI**: OpenAI GPT-4o API
- **Authentication**: JWT + bcrypt
- **ORM**: Prisma

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **HTTP Client**: Axios
- **Routing**: React Router v6

## Project Structure

```
expert-connect/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   │   └── ai/          # AI matching engine
│   │   └── utils/           # Utility functions
│   ├── tests/               # Test files
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── expert/      # Expert-specific components
│   │   │   ├── seeker/      # Seeker-specific components
│   │   │   ├── common/      # Shared components
│   │   │   └── layout/      # Layout components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── contexts/        # React contexts
│   │   └── utils/           # Utility functions
│   └── package.json
├── shared/                  # Shared types/constants
└── docs/                    # Documentation
```

## User Journey

### Expert Flow
1. Register → Fill profile (education, experience, skills) → Verify identity → Wait for matches
2. Receive consultation request → Review seeker's needs → Accept/Decline

### Seeker Flow
1. Register → Create consultation request → Describe problem/needs
2. AI analyzes and recommends top 3 experts with rationale
3. Select expert → Send connection request with details
4. Expert reviews and responds

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- OpenAI API Key

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/expertconnect
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-api-key
VECTOR_DB_URL=your-vector-db-url
VECTOR_DB_API_KEY=your-vector-db-api-key
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Expert Routes
- `GET /api/experts/profile` - Get expert profile
- `PUT /api/experts/profile` - Update expert profile
- `GET /api/experts/requests` - Get consultation requests

### Seeker Routes
- `POST /api/seekers/request` - Create consultation request
- `GET /api/seekers/matches` - Get AI-matched experts
- `POST /api/seekers/connect` - Send connection request

### Matching Engine
- `POST /api/matching/analyze` - Analyze and match experts

## Data Privacy & Security (PDPA Compliance)

- All personal data encrypted at rest
- JWT-based authentication
- Role-based access control
- Data minimization principles
- User consent management
- Right to be forgotten implementation

## Development Roadmap

### Phase 1: MVP (Current)
- [x] Project structure setup
- [ ] Basic authentication
- [ ] Expert profile creation
- [ ] Seeker request form
- [ ] AI matching engine (basic)
- [ ] Connection request system

### Phase 2: Enhancement
- [ ] LinkedIn integration
- [ ] Advanced AI matching with feedback loop
- [ ] In-app messaging
- [ ] Payment integration
- [ ] Rating and review system

### Phase 3: Scale
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] API for third-party integrations

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

[To be determined]

## Contact

Project Link: [https://github.com/yourusername/expert-connect](https://github.com/yourusername/expert-connect)
