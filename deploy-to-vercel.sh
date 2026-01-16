#!/bin/bash

# 🚀 Expert Connect - Automated Vercel Deployment Script
# ================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Check if Vercel CLI is available
check_vercel_cli() {
    if ! command -v vercel &> /dev/null && ! command -v npx &> /dev/null; then
        print_error "Vercel CLI not found. Please install Node.js and npx."
        exit 1
    fi
    print_success "Vercel CLI is available"
}

# Login to Vercel
vercel_login() {
    print_header "Step 1: Vercel Login"
    
    if npx vercel whoami &> /dev/null; then
        print_success "Already logged in to Vercel"
    else
        print_info "Please login to Vercel..."
        npx vercel login
        print_success "Logged in successfully"
    fi
}

# Deploy Backend
deploy_backend() {
    print_header "Step 2: Deploy Backend"
    
    cd /home/user/webapp/backend
    
    # Check if vercel.json exists
    if [ ! -f "vercel.json" ]; then
        print_error "vercel.json not found in backend/"
        exit 1
    fi
    
    print_info "Deploying backend to Vercel..."
    
    # Deploy
    if [ "$DEPLOY_ENV" == "production" ]; then
        npx vercel --prod --yes
    else
        npx vercel --yes
    fi
    
    # Get deployment URL
    BACKEND_URL=$(npx vercel ls expert-connect-backend --json | jq -r '.deployments[0].url')
    
    if [ -z "$BACKEND_URL" ]; then
        print_error "Failed to get backend URL"
        exit 1
    fi
    
    print_success "Backend deployed to: https://$BACKEND_URL"
    
    # Export for use in frontend
    export BACKEND_URL="https://$BACKEND_URL"
}

# Set Backend Environment Variables
set_backend_env() {
    print_header "Step 3: Set Backend Environment Variables"
    
    cd /home/user/webapp/backend
    
    print_info "Please provide the following environment variables:"
    
    # Database URL
    if [ -z "$DATABASE_URL" ]; then
        read -p "Enter DATABASE_URL: " DATABASE_URL
    fi
    npx vercel env add DATABASE_URL production <<< "$DATABASE_URL" 2>/dev/null || print_info "DATABASE_URL already set"
    
    # Supabase URL
    if [ -z "$SUPABASE_URL" ]; then
        read -p "Enter SUPABASE_URL: " SUPABASE_URL
    fi
    npx vercel env add SUPABASE_URL production <<< "$SUPABASE_URL" 2>/dev/null || print_info "SUPABASE_URL already set"
    
    # Supabase Key
    if [ -z "$SUPABASE_KEY" ]; then
        read -p "Enter SUPABASE_KEY: " SUPABASE_KEY
    fi
    npx vercel env add SUPABASE_KEY production <<< "$SUPABASE_KEY" 2>/dev/null || print_info "SUPABASE_KEY already set"
    
    # JWT Secret
    if [ -z "$JWT_SECRET" ]; then
        read -p "Enter JWT_SECRET (or press Enter for default): " JWT_SECRET
        JWT_SECRET=${JWT_SECRET:-"expert-connect-secret-key-2024-production-ready"}
    fi
    npx vercel env add JWT_SECRET production <<< "$JWT_SECRET" 2>/dev/null || print_info "JWT_SECRET already set"
    
    # JWT Expire
    JWT_EXPIRE="7d"
    npx vercel env add JWT_EXPIRE production <<< "$JWT_EXPIRE" 2>/dev/null || print_info "JWT_EXPIRE already set"
    
    print_success "Environment variables set"
}

# Deploy Frontend
deploy_frontend() {
    print_header "Step 4: Deploy Frontend"
    
    cd /home/user/webapp/frontend
    
    # Check if vercel.json exists
    if [ ! -f "vercel.json" ]; then
        print_error "vercel.json not found in frontend/"
        exit 1
    fi
    
    # Create .env.production with backend URL
    if [ ! -z "$BACKEND_URL" ]; then
        echo "REACT_APP_API_URL=$BACKEND_URL" > .env.production
        print_success "Created .env.production with backend URL"
    fi
    
    print_info "Deploying frontend to Vercel..."
    
    # Deploy
    if [ "$DEPLOY_ENV" == "production" ]; then
        npx vercel --prod --yes
    else
        npx vercel --yes
    fi
    
    # Get deployment URL
    FRONTEND_URL=$(npx vercel ls expert-connect-frontend --json | jq -r '.deployments[0].url')
    
    if [ -z "$FRONTEND_URL" ]; then
        print_error "Failed to get frontend URL"
        exit 1
    fi
    
    print_success "Frontend deployed to: https://$FRONTEND_URL"
    
    # Export for use later
    export FRONTEND_URL="https://$FRONTEND_URL"
}

# Update Backend CORS
update_backend_cors() {
    print_header "Step 5: Update Backend CORS"
    
    cd /home/user/webapp/backend
    
    if [ ! -z "$FRONTEND_URL" ]; then
        # Add frontend URL to environment
        npx vercel env add FRONTEND_URL production <<< "$FRONTEND_URL" 2>/dev/null || print_info "FRONTEND_URL already set"
        npx vercel env add CORS_ORIGIN production <<< "$FRONTEND_URL" 2>/dev/null || print_info "CORS_ORIGIN already set"
        
        print_success "Backend CORS updated with frontend URL"
        
        # Redeploy backend with new env
        print_info "Redeploying backend with updated CORS..."
        npx vercel --prod --yes
    fi
}

# Test Deployments
test_deployments() {
    print_header "Step 6: Test Deployments"
    
    # Test Backend
    if [ ! -z "$BACKEND_URL" ]; then
        print_info "Testing backend health endpoint..."
        HEALTH_RESPONSE=$(curl -s "$BACKEND_URL/health")
        
        if echo "$HEALTH_RESPONSE" | grep -q "success"; then
            print_success "Backend health check passed"
        else
            print_error "Backend health check failed"
        fi
    fi
    
    # Test Frontend
    if [ ! -z "$FRONTEND_URL" ]; then
        print_info "Testing frontend..."
        FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")
        
        if [ "$FRONTEND_STATUS" == "200" ]; then
            print_success "Frontend is accessible"
        else
            print_error "Frontend returned status code: $FRONTEND_STATUS"
        fi
    fi
}

# Display Summary
display_summary() {
    print_header "Deployment Summary"
    
    echo ""
    echo -e "${GREEN}🎉 Deployment Completed Successfully!${NC}"
    echo ""
    echo -e "${BLUE}Backend URL:${NC}  $BACKEND_URL"
    echo -e "${BLUE}Frontend URL:${NC} $FRONTEND_URL"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "1. Test the application thoroughly"
    echo "2. Monitor logs: npx vercel logs expert-connect-backend --follow"
    echo "3. Check Vercel Dashboard: https://vercel.com/dashboard"
    echo ""
    echo -e "${GREEN}Happy Deploying! 🚀${NC}"
}

# Main execution
main() {
    print_header "Expert Connect - Vercel Deployment"
    
    # Parse arguments
    DEPLOY_ENV="${1:-preview}"
    
    if [ "$DEPLOY_ENV" != "production" ] && [ "$DEPLOY_ENV" != "preview" ]; then
        print_error "Invalid environment. Use: production or preview"
        exit 1
    fi
    
    print_info "Deploy environment: $DEPLOY_ENV"
    
    # Execute deployment steps
    check_vercel_cli
    vercel_login
    deploy_backend
    
    # Only set env vars in production
    if [ "$DEPLOY_ENV" == "production" ]; then
        set_backend_env
    fi
    
    deploy_frontend
    
    if [ "$DEPLOY_ENV" == "production" ]; then
        update_backend_cors
    fi
    
    test_deployments
    display_summary
}

# Run main function
main "$@"
