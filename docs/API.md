# Expert Connect - API Documentation

Base URL: `http://localhost:5000/api`

All authenticated endpoints require Bearer token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "EXPERT",
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "EXPERT",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "EXPERT",
      "isVerified": false
    },
    "token": "jwt_token_here"
  }
}
```

### Get Current User Profile
```http
GET /auth/profile
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "EXPERT",
    "expert": { /* expert profile */ },
    "seeker": null
  }
}
```

## Expert Endpoints

### Get Expert Profile
```http
GET /experts/profile
```

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "headline": "Senior Software Architect",
    "bio": "20 years of experience...",
    "yearsOfExperience": 20,
    "hourlyRate": 150.00,
    "availability": "AVAILABLE",
    "educations": [...],
    "workExperiences": [...],
    "skills": [...],
    "achievements": [...]
  }
}
```

### Update Expert Profile
```http
PUT /experts/profile
```

**Request Body:**
```json
{
  "headline": "Senior Software Architect",
  "bio": "Experienced professional...",
  "yearsOfExperience": 20,
  "hourlyRate": 150.00,
  "availability": "AVAILABLE",
  "country": "USA",
  "city": "New York",
  "preferredMode": ["ONLINE", "HYBRID"],
  "languages": ["English", "Spanish"]
}
```

### Add Education
```http
POST /experts/education
```

**Request Body:**
```json
{
  "degree": "Master of Science",
  "fieldOfStudy": "Computer Science",
  "institution": "MIT",
  "startYear": 2000,
  "endYear": 2002,
  "description": "Focused on AI and Machine Learning"
}
```

### Add Work Experience
```http
POST /experts/experience
```

**Request Body:**
```json
{
  "title": "Senior Software Engineer",
  "company": "Tech Corp",
  "industry": "Technology",
  "location": "San Francisco, CA",
  "startDate": "2020-01-01",
  "endDate": "2023-12-31",
  "isCurrent": false,
  "description": "Led development of...",
  "achievements": "Increased performance by 50%"
}
```

### Add Skill
```http
POST /experts/skills
```

**Request Body:**
```json
{
  "skillName": "Python",
  "category": "TECHNICAL",
  "proficiency": "EXPERT",
  "yearsOfExp": 10
}
```

**Skill Categories:**
- `TECHNICAL`
- `SOFT_SKILL`
- `DOMAIN_KNOWLEDGE`
- `TOOL`
- `LANGUAGE`

**Proficiency Levels:**
- `BEGINNER`
- `INTERMEDIATE`
- `ADVANCED`
- `EXPERT`

### Add Achievement
```http
POST /experts/achievements
```

**Request Body:**
```json
{
  "title": "Built Scalable Platform",
  "description": "Architected and built...",
  "date": "2023-06-15",
  "url": "https://project-link.com",
  "images": ["https://image1.jpg", "https://image2.jpg"]
}
```

### Get Consultation Requests
```http
GET /experts/consultations?status=SENT_TO_EXPERT
```

**Query Parameters:**
- `status` (optional): Filter by status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Need Digital Transformation Consultant",
      "problemStatement": "Our company needs...",
      "status": "SENT_TO_EXPERT",
      "matchingScore": 92.5,
      "aiRationale": "This expert is highly recommended because...",
      "seeker": {
        "organizationName": "Acme Corp",
        "user": { "firstName": "Jane", "lastName": "Smith" }
      }
    }
  ]
}
```

### Respond to Consultation
```http
PUT /experts/consultations/:consultationId/respond
```

**Request Body:**
```json
{
  "action": "ACCEPTED"
}
```

**Actions:** `ACCEPTED` | `DECLINED`

## Seeker Endpoints

### Get Seeker Profile
```http
GET /seekers/profile
```

### Update Seeker Profile
```http
PUT /seekers/profile
```

**Request Body:**
```json
{
  "organizationType": "SME",
  "organizationName": "Acme Corp",
  "organizationSize": "50-200",
  "website": "https://acme.com",
  "description": "We are a growing tech company...",
  "position": "CTO",
  "department": "Technology"
}
```

**Organization Types:**
- `SME`
- `LARGE_CORPORATION`
- `UNIVERSITY`
- `STARTUP`
- `NGO`
- `GOVERNMENT`

### Create Consultation Request
```http
POST /seekers/consultations
```

**Request Body:**
```json
{
  "title": "Need Digital Transformation Expert",
  "problemStatement": "Our company is struggling with digital transformation. We need help modernizing our infrastructure and processes.",
  "expectations": "Looking for strategic guidance and hands-on support",
  "scope": "3-6 month engagement",
  "budget": 50000,
  "duration": "6 months",
  "preferredMode": ["ONLINE", "ONSITE"]
}
```

### Get AI-Matched Experts
```http
GET /seekers/consultations/:consultationId/matches
```

**Response:**
```json
{
  "success": true,
  "data": {
    "consultation": { /* consultation details */ },
    "matches": [
      {
        "expertId": "uuid",
        "score": 95,
        "rationale": "This expert is an excellent match because...",
        "strengths": [
          "20 years experience in digital transformation",
          "Previously worked in similar industry",
          "Strong track record with SMEs"
        ],
        "concerns": [
          "Hourly rate is at the upper end of budget"
        ],
        "industryFit": 95,
        "skillFit": 98,
        "experienceFit": 92,
        "budgetFit": 85,
        "availabilityFit": 100,
        "expert": {
          "id": "uuid",
          "headline": "Digital Transformation Specialist",
          "yearsOfExperience": 20,
          "user": { /* user details */ },
          "skills": [...],
          "workExperiences": [...]
        }
      }
    ],
    "totalMatches": 15,
    "summary": "Found 15 potential matches. Top 3 experts shown."
  }
}
```

### Send Connection Request
```http
POST /seekers/connect
```

**Request Body:**
```json
{
  "consultationId": "uuid",
  "expertId": "uuid",
  "message": "I'd like to discuss this opportunity with you"
}
```

### Get My Consultations
```http
GET /seekers/consultations?status=PENDING
```

### Update Consultation
```http
PUT /seekers/consultations/:consultationId
```

### Delete Consultation
```http
DELETE /seekers/consultations/:consultationId
```

## Consultation Status Flow

```
PENDING → MATCHED → SENT_TO_EXPERT → ACCEPTED/DECLINED → IN_PROGRESS → COMPLETED
                                    ↓
                                 CANCELLED
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Authenticated users: 200 requests per 15 minutes

## Pagination

For list endpoints that support pagination:

```http
GET /experts/consultations?page=1&limit=10
```

**Response includes pagination metadata:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```
