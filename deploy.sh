#!/bin/bash
# Expert Connect Auto Deploy Script for Ubuntu VPS

set -e

echo "🚀 Expert Connect Deployment Script"
echo "===================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo "ℹ️  $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root (use sudo)"
    exit 1
fi

print_info "Step 1: System Update"
apt update && apt upgrade -y
print_success "System updated"

print_info "Step 2: Installing Node.js 18"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
print_success "Node.js $(node -v) installed"

print_info "Step 3: Installing PostgreSQL"
apt install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql
print_success "PostgreSQL installed"

print_info "Step 4: Installing Nginx"
apt install -y nginx
systemctl start nginx
systemctl enable nginx
print_success "Nginx installed"

print_info "Step 5: Installing PM2"
npm install -g pm2
print_success "PM2 installed"

print_info "Step 6: Setting up PostgreSQL Database"
sudo -u postgres psql <<EOF
CREATE DATABASE expertconnect;
CREATE USER expertconnect_user WITH PASSWORD 'ChangeMeInProduction123!';
GRANT ALL PRIVILEGES ON DATABASE expertconnect TO expertconnect_user;
\q
EOF
print_success "Database created"

print_info "Step 7: Clone Repository"
cd /var/www
if [ -d "expert-connect" ]; then
    cd expert-connect
    git pull
else
    git clone https://github.com/YOUR_USERNAME/expert-connect.git
    cd expert-connect
fi
print_success "Repository ready"

print_info "Step 8: Setup Backend"
cd backend

# Create .env file
cat > .env <<EOF
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://expertconnect_user:ChangeMeInProduction123!@localhost:5432/expertconnect
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRE=7d
OPENAI_API_KEY=CHANGE_ME
CORS_ORIGIN=http://$(curl -s ifconfig.me)
EOF

print_warning "⚠️  IMPORTANT: Edit /var/www/expert-connect/backend/.env and add your OPENAI_API_KEY"

npm install --production
npx prisma generate
npx prisma migrate deploy
print_success "Backend setup complete"

print_info "Step 9: Start Backend with PM2"
pm2 start src/server.js --name expert-connect-api
pm2 save
pm2 startup
print_success "Backend running"

print_info "Step 10: Setup Frontend"
cd ../frontend

# Update API URL in build
cat > .env.production <<EOF
REACT_APP_API_URL=http://$(curl -s ifconfig.me):5000/api
EOF

npm install
npm run build
print_success "Frontend built"

print_info "Step 11: Configure Nginx"
cat > /etc/nginx/sites-available/expert-connect <<'EOF'
# Backend API
server {
    listen 80;
    server_name _;
    
    # API endpoints
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check
    location /health {
        proxy_pass http://localhost:5000;
    }
    
    # Frontend
    location / {
        root /var/www/expert-connect/frontend/build;
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/expert-connect /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
print_success "Nginx configured"

print_info "Step 12: Setting up Firewall"
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable
print_success "Firewall configured"

echo ""
print_success "========================================="
print_success "🎉 DEPLOYMENT COMPLETE!"
print_success "========================================="
echo ""
print_info "Your application is now running at:"
echo "👉 http://$(curl -s ifconfig.me)"
echo ""
print_warning "⚠️  NEXT STEPS:"
echo "1. Edit /var/www/expert-connect/backend/.env and add your OPENAI_API_KEY"
echo "2. Restart backend: pm2 restart expert-connect-api"
echo "3. Set up SSL with: sudo certbot --nginx (install certbot first)"
echo "4. Update GitHub repo URL in the script"
echo ""
print_info "Useful Commands:"
echo "  View logs:     pm2 logs expert-connect-api"
echo "  Restart:       pm2 restart expert-connect-api"
echo "  Database:      sudo -u postgres psql expertconnect"
echo "  Update code:   cd /var/www/expert-connect && git pull && ./redeploy.sh"
echo ""
