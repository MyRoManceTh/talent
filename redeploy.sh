#!/bin/bash
# Quick Redeploy Script

set -e

echo "🔄 Redeploying Expert Connect..."

cd /var/www/expert-connect

# Pull latest code
echo "📥 Pulling latest code..."
git pull

# Update backend
echo "🔧 Updating backend..."
cd backend
npm install --production
npx prisma generate
npx prisma migrate deploy
pm2 restart expert-connect-api

# Update frontend
echo "⚛️  Updating frontend..."
cd ../frontend
npm install
npm run build

echo "✅ Redeployment complete!"
pm2 logs expert-connect-api --lines 50
