-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('EXPERT', 'SEEKER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY', 'NOT_AVAILABLE');

-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('ONLINE', 'ONSITE', 'HYBRID');

-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('WORKING', 'RETIRED', 'LOOKING', 'FREELANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('TECHNICAL', 'SOFT_SKILL', 'DOMAIN_KNOWLEDGE', 'TOOL', 'LANGUAGE');

-- CreateEnum
CREATE TYPE "ProficiencyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('SME', 'LARGE_CORPORATION', 'UNIVERSITY', 'STARTUP', 'NGO', 'GOVERNMENT');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('STRATEGY_CONSULTING', 'BUSINESS_DEVELOPMENT', 'MARKETING_BRANDING', 'TECHNOLOGY_IT', 'FINANCIAL_ADVISORY', 'HR_TALENT', 'OPERATIONS_PROCESS', 'LEGAL_COMPLIANCE', 'TRAINING_WORKSHOP', 'MENTORING_COACHING', 'RESEARCH_ANALYSIS', 'OTHER');

-- CreateEnum
CREATE TYPE "TimeframeType" AS ENUM ('IMMEDIATE', 'SHORT_TERM', 'MEDIUM_TERM', 'LONG_TERM', 'ONGOING', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('PENDING', 'MATCHED', 'SENT_TO_EXPERT', 'ACCEPTED', 'DECLINED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "phoneNumber" TEXT,
    "profileImage" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "headline" TEXT,
    "bio" TEXT,
    "linkedinUrl" TEXT,
    "yearsOfExperience" INTEGER,
    "hourlyRate" DECIMAL(10,2),
    "availability" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "dateOfBirth" TIMESTAMP(3),
    "currentCompany" TEXT,
    "currentPosition" TEXT,
    "workStatus" "WorkStatus" DEFAULT 'WORKING',
    "contactPhone" TEXT,
    "missionInterests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "country" TEXT,
    "city" TEXT,
    "timezone" TEXT,
    "preferredMode" "WorkMode"[],
    "languages" TEXT[],
    "profileCompleteness" INTEGER NOT NULL DEFAULT 0,
    "rating" DECIMAL(3,2),
    "totalConsultations" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "expertId" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_experiences" (
    "id" TEXT NOT NULL,
    "expertId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "industry" TEXT,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "achievements" TEXT,
    "keyResponsibilities" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_skills" (
    "id" TEXT NOT NULL,
    "expertId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "proficiency" "ProficiencyLevel" NOT NULL,
    "yearsOfExp" INTEGER,

    CONSTRAINT "expert_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "industries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "industries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_industries" (
    "id" TEXT NOT NULL,
    "expertId" TEXT NOT NULL,
    "industryId" TEXT NOT NULL,
    "yearsOfExp" INTEGER,

    CONSTRAINT "expert_industries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "expertId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organization" TEXT,
    "description" TEXT,
    "date" TIMESTAMP(3),
    "url" TEXT,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seekers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationType" "OrganizationType" NOT NULL,
    "organizationName" TEXT NOT NULL,
    "organizationSize" TEXT,
    "website" TEXT,
    "description" TEXT,
    "position" TEXT,
    "department" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seekers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seeker_industries" (
    "id" TEXT NOT NULL,
    "seekerId" TEXT NOT NULL,
    "industryId" TEXT NOT NULL,

    CONSTRAINT "seeker_industries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_briefs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectType" "ProjectType" NOT NULL,
    "topic" TEXT NOT NULL,
    "detailedDescription" TEXT,
    "goals" TEXT NOT NULL,
    "expectedOutcomes" TEXT,
    "format" "WorkMode"[],
    "location" TEXT,
    "specificLocation" TEXT,
    "timeframe" "TimeframeType" NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "estimatedHours" INTEGER,
    "urgency" "UrgencyLevel" NOT NULL,
    "budgetMin" DECIMAL(10,2),
    "budgetMax" DECIMAL(10,2),
    "budgetCurrency" TEXT NOT NULL DEFAULT 'THB',
    "budgetFlexible" BOOLEAN NOT NULL DEFAULT false,
    "languages" TEXT[] DEFAULT ARRAY['Thai']::TEXT[],
    "industryContext" TEXT,
    "targetAudience" TEXT,
    "specificRequirements" TEXT,
    "deliverables" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_briefs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL,
    "seekerId" TEXT NOT NULL,
    "expertId" TEXT,
    "briefId" TEXT,
    "title" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "expectations" TEXT,
    "scope" TEXT,
    "budget" DECIMAL(10,2),
    "duration" TEXT,
    "preferredMode" "WorkMode"[],
    "matchingScore" DECIMAL(5,2),
    "aiRationale" TEXT,
    "status" "ConsultationStatus" NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "rating" INTEGER,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matching_history" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "expertIds" TEXT[],
    "scores" JSONB NOT NULL,
    "algorithm" TEXT NOT NULL,
    "parameters" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matching_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_resets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_resets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "experts_userId_key" ON "experts"("userId");
CREATE INDEX "experts_userId_idx" ON "experts"("userId");

-- CreateIndex
CREATE INDEX "educations_expertId_idx" ON "educations"("expertId");

-- CreateIndex
CREATE INDEX "work_experiences_expertId_idx" ON "work_experiences"("expertId");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE INDEX "expert_skills_expertId_idx" ON "expert_skills"("expertId");
CREATE INDEX "expert_skills_skillId_idx" ON "expert_skills"("skillId");
CREATE UNIQUE INDEX "expert_skills_expertId_skillId_key" ON "expert_skills"("expertId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "industries_name_key" ON "industries"("name");

-- CreateIndex
CREATE INDEX "expert_industries_expertId_idx" ON "expert_industries"("expertId");
CREATE INDEX "expert_industries_industryId_idx" ON "expert_industries"("industryId");
CREATE UNIQUE INDEX "expert_industries_expertId_industryId_key" ON "expert_industries"("expertId", "industryId");

-- CreateIndex
CREATE INDEX "achievements_expertId_idx" ON "achievements"("expertId");

-- CreateIndex
CREATE UNIQUE INDEX "seekers_userId_key" ON "seekers"("userId");
CREATE INDEX "seekers_userId_idx" ON "seekers"("userId");

-- CreateIndex
CREATE INDEX "seeker_industries_seekerId_idx" ON "seeker_industries"("seekerId");
CREATE INDEX "seeker_industries_industryId_idx" ON "seeker_industries"("industryId");
CREATE UNIQUE INDEX "seeker_industries_seekerId_industryId_key" ON "seeker_industries"("seekerId", "industryId");

-- CreateIndex
CREATE INDEX "project_briefs_userId_idx" ON "project_briefs"("userId");
CREATE INDEX "project_briefs_projectType_idx" ON "project_briefs"("projectType");
CREATE INDEX "project_briefs_isActive_idx" ON "project_briefs"("isActive");

-- CreateIndex
CREATE INDEX "consultations_seekerId_idx" ON "consultations"("seekerId");
CREATE INDEX "consultations_expertId_idx" ON "consultations"("expertId");
CREATE INDEX "consultations_briefId_idx" ON "consultations"("briefId");
CREATE INDEX "consultations_status_idx" ON "consultations"("status");

-- CreateIndex
CREATE INDEX "matching_history_consultationId_idx" ON "matching_history"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "password_resets_userId_key" ON "password_resets"("userId");
CREATE UNIQUE INDEX "password_resets_token_key" ON "password_resets"("token");
CREATE INDEX "password_resets_token_idx" ON "password_resets"("token");
CREATE INDEX "password_resets_userId_idx" ON "password_resets"("userId");

-- AddForeignKey
ALTER TABLE "experts" ADD CONSTRAINT "experts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "experts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_experiences" ADD CONSTRAINT "work_experiences_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "experts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_skills" ADD CONSTRAINT "expert_skills_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "experts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_skills" ADD CONSTRAINT "expert_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_industries" ADD CONSTRAINT "expert_industries_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "experts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_industries" ADD CONSTRAINT "expert_industries_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "industries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "experts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seekers" ADD CONSTRAINT "seekers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seeker_industries" ADD CONSTRAINT "seeker_industries_seekerId_fkey" FOREIGN KEY ("seekerId") REFERENCES "seekers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seeker_industries" ADD CONSTRAINT "seeker_industries_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "industries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_seekerId_fkey" FOREIGN KEY ("seekerId") REFERENCES "seekers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "experts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "project_briefs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
