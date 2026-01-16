#!/bin/bash

# 🚀 Vercel Deployment Helper Script
# This script guides you through deploying to Vercel

echo "🚀 Expert Connect - Vercel Deployment Helper"
echo "============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}➜${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if vercel is available
print_step "Checking Vercel CLI..."
if ! command -v npx &> /dev/null; then
    print_error "npx is not installed. Please install Node.js first."
    exit 1
fi
print_success "Vercel CLI is available"
echo ""

# Main menu
echo "What would you like to deploy?"
echo "1) Backend only"
echo "2) Frontend only"
echo "3) Both (Backend → Frontend)"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        print_step "Deploying Backend..."
        echo ""
        cd /home/user/webapp/backend
        
        print_warning "Make sure you have:"
        echo "  ✓ Logged in to Vercel (npx vercel login)"
        echo "  ✓ Set environment variables in Vercel Dashboard"
        echo ""
        
        read -p "Deploy to production? (y/n): " prod
        if [ "$prod" = "y" ]; then
            npx vercel --prod
        else
            npx vercel
        fi
        
        print_success "Backend deployment complete!"
        ;;
        
    2)
        print_step "Deploying Frontend..."
        echo ""
        cd /home/user/webapp/frontend
        
        print_warning "Make sure you have:"
        echo "  ✓ Logged in to Vercel (npx vercel login)"
        echo "  ✓ Updated REACT_APP_API_URL with backend URL"
        echo ""
        
        read -p "Deploy to production? (y/n): " prod
        if [ "$prod" = "y" ]; then
            npx vercel --prod
        else
            npx vercel
        fi
        
        print_success "Frontend deployment complete!"
        ;;
        
    3)
        print_step "Deploying Backend first..."
        echo ""
        cd /home/user/webapp/backend
        
        print_warning "Deploying backend to production..."
        npx vercel --prod
        
        echo ""
        print_success "Backend deployed!"
        print_warning "Copy the backend URL and update REACT_APP_API_URL in Vercel Dashboard"
        echo ""
        
        read -p "Press Enter when you've updated the frontend environment variable..."
        
        print_step "Deploying Frontend..."
        echo ""
        cd /home/user/webapp/frontend
        
        npx vercel --prod
        
        echo ""
        print_success "Both deployments complete!"
        print_warning "Don't forget to update CORS_ORIGIN in backend with frontend URL!"
        ;;
        
    4)
        print_step "Exiting..."
        exit 0
        ;;
        
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "============================================="
echo "🎉 Deployment process finished!"
echo ""
echo "Next steps:"
echo "1. Test your backend: curl https://YOUR-BACKEND-URL/health"
echo "2. Test your frontend: Open https://YOUR-FRONTEND-URL in browser"
echo "3. Update CORS_ORIGIN in backend if needed"
echo "4. Update REACT_APP_API_URL in frontend if needed"
echo ""
echo "📖 For detailed guide, see: VERCEL_DEPLOYMENT_GUIDE.md"
echo "============================================="
