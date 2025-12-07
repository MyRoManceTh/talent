# Expert Connect - Deployment Guide

## Pre-Deployment Checklist ✅

Before deploying to production, ensure you've completed these steps:

### Security
- [ ] Change JWT_SECRET to a strong random value (minimum 32 characters)
- [ ] Set NODE_ENV=production
- [ ] Remove or restrict Prisma Studio access
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS to specific domains only
- [ ] Review and update rate limiting settings
- [ ] Enable security headers (helmet.js)
- [ ] Implement API key rotation strategy
- [ ] Set up secure environment variable management

### Database
- [ ] Set up production PostgreSQL instance
- [ ] Run migrations on production database
- [ ] Set up automated backups
- [ ] Configure connection pooling
- [ ] Add database indexes for performance
- [ ] Test database failover
- [ ] Document database restore procedures

### Application
- [ ] Test all API endpoints
- [ ] Verify AI matching functionality
- [ ] Build frontend for production (`npm run build`)
- [ ] Test with production data samples
- [ ] Configure logging to external service
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure health check endpoints
- [ ] Test email notifications (if implemented)

### Performance
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Implement Redis caching (optional)
- [ ] Configure load balancer (if scaling)
- [ ] Optimize database queries
- [ ] Set up monitoring (CPU, memory, disk)

### Documentation
- [ ] Update README with production URLs
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document backup/restore procedures
- [ ] Update API documentation with production endpoint

---

## Deployment Options

### Option 1: Traditional VPS (DigitalOcean, Linode, AWS EC2)

#### Backend Deployment

1. **Set up server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PostgreSQL
   sudo apt install -y postgresql postgresql-contrib
   
   # Install PM2 for process management
   sudo npm install -g pm2
   ```

2. **Deploy backend**
   ```bash
   # Clone repository
   git clone <your-repo-url>
   cd expert-connect/backend
   
   # Install dependencies
   npm install --production
   
   # Set up environment
   cp .env.example .env
   # Edit .env with production values
   
   # Run migrations
   npx prisma generate
   npx prisma migrate deploy
   
   # Start with PM2
   pm2 start src/server.js --name expert-connect-api
   pm2 save
   pm2 startup
   ```

3. **Set up Nginx reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name api.expertconnect.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

#### Frontend Deployment

1. **Build frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy to Nginx**
   ```bash
   sudo cp -r build/* /var/www/expertconnect
   ```

3. **Nginx configuration**
   ```nginx
   server {
       listen 80;
       server_name expertconnect.com;
       root /var/www/expertconnect;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d expertconnect.com -d api.expertconnect.com
   ```

---

### Option 2: Heroku (Easiest for quick deployment)

#### Backend (Heroku)

1. **Prepare backend**
   ```bash
   cd backend
   
   # Create Procfile
   echo "web: node src/server.js" > Procfile
   
   # Update package.json scripts
   # Add: "start": "node src/server.js"
   ```

2. **Deploy**
   ```bash
   heroku create expert-connect-api
   heroku addons:create heroku-postgresql:hobby-dev
   
   # Set environment variables
   heroku config:set JWT_SECRET=your-secret
   heroku config:set OPENAI_API_KEY=your-key
   heroku config:set NODE_ENV=production
   
   git push heroku main
   
   # Run migrations
   heroku run npx prisma migrate deploy
   ```

#### Frontend (Netlify/Vercel)

**Netlify:**
```bash
cd frontend
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

**Vercel:**
```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

### Option 3: Docker (Recommended for consistency)

#### Docker Compose Setup

**docker-compose.yml**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: expertconnect
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: expertconnect
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://expertconnect:${DB_PASSWORD}@postgres:5432/expertconnect
      JWT_SECRET: ${JWT_SECRET}
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      NODE_ENV: production
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

**backend/Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]
```

**frontend/Dockerfile**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Deploy with Docker**
```bash
# Build and start
docker-compose up -d

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

### Option 4: Cloud Platforms (AWS, GCP, Azure)

#### AWS Deployment Example

**Backend (Elastic Beanstalk)**
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init expert-connect-api

# Create environment
eb create production

# Deploy
eb deploy

# Set environment variables
eb setenv JWT_SECRET=xxx OPENAI_API_KEY=xxx
```

**Database (RDS)**
- Create PostgreSQL RDS instance
- Update DATABASE_URL in Elastic Beanstalk environment

**Frontend (S3 + CloudFront)**
```bash
# Build
cd frontend
npm run build

# Upload to S3
aws s3 sync build/ s3://expertconnect-frontend

# Set up CloudFront distribution for CDN
```

---

## Environment Variables for Production

### Backend (.env)
```env
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgresql://user:pass@host:5432/expertconnect

# JWT
JWT_SECRET=<strong-random-secret-minimum-32-chars>
JWT_EXPIRE=7d

# OpenAI
OPENAI_API_KEY=sk-your-production-key
OPENAI_MODEL=gpt-4o

# CORS
CORS_ORIGIN=https://expertconnect.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://api.expertconnect.com/api
```

---

## Post-Deployment Testing

### 1. Health Checks
```bash
# Backend health
curl https://api.expertconnect.com/health

# Expected: {"success": true, "message": "..."}
```

### 2. API Testing
```bash
# Test registration
curl -X POST https://api.expertconnect.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456","firstName":"Test","lastName":"User","role":"EXPERT"}'
```

### 3. Frontend Testing
- Visit https://expertconnect.com
- Test registration flow
- Test login
- Test expert/seeker dashboards
- Test AI matching functionality

### 4. Performance Testing
```bash
# Load testing with Apache Bench
ab -n 1000 -c 10 https://api.expertconnect.com/health

# Or use k6, Artillery, etc.
```

---

## Monitoring & Maintenance

### Set Up Monitoring

1. **Application Monitoring**
   - Use PM2 monitoring: `pm2 monit`
   - Or Datadog, New Relic, etc.

2. **Error Tracking**
   - Integrate Sentry
   - Configure error alerts

3. **Uptime Monitoring**
   - Use UptimeRobot, Pingdom, etc.
   - Set up alerts for downtime

4. **Log Management**
   - Use ELK Stack, Papertrail, or CloudWatch
   - Set up log rotation

### Backup Strategy

**Database Backups**
```bash
# Automated daily backup
0 2 * * * pg_dump expertconnect > /backups/expertconnect_$(date +\%Y\%m\%d).sql

# Keep last 7 days
find /backups -name "expertconnect_*.sql" -mtime +7 -delete
```

**Code Backups**
- Use Git tags for releases
- Maintain staging environment
- Document rollback procedures

---

## Scaling Considerations

### When to Scale

Monitor these metrics:
- Response time > 500ms
- CPU usage > 80%
- Memory usage > 80%
- Database connections near limit

### Horizontal Scaling

1. **Load Balancer** (Nginx, AWS ALB)
2. **Multiple Backend Instances**
3. **Database Read Replicas**
4. **Redis for Session/Cache**

### Vertical Scaling

- Increase server resources
- Upgrade database instance
- Optimize queries

---

## Troubleshooting

### Backend Issues

**Service won't start**
```bash
# Check logs
pm2 logs expert-connect-api

# Check ports
lsof -i :5000

# Restart service
pm2 restart expert-connect-api
```

**Database connection errors**
```bash
# Test connection
psql $DATABASE_URL

# Check migrations
npx prisma migrate status
```

### Frontend Issues

**Build failures**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API connection errors**
- Verify REACT_APP_API_URL
- Check CORS settings
- Verify SSL certificates

---

## Rollback Procedure

If deployment fails:

```bash
# Backend (PM2)
pm2 reload expert-connect-api

# Or rollback to previous commit
git revert HEAD
git push
pm2 restart expert-connect-api

# Database migrations
npx prisma migrate resolve --rolled-back <migration-name>

# Frontend
# Redeploy previous build
```

---

## Production Checklist Summary

✅ **Before Launch**
- [ ] All tests passing
- [ ] Security audit complete
- [ ] Performance tested
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Documentation updated

✅ **Launch Day**
- [ ] Deploy backend
- [ ] Run migrations
- [ ] Deploy frontend
- [ ] Verify all endpoints
- [ ] Test user flows
- [ ] Monitor for errors

✅ **Post-Launch**
- [ ] Monitor metrics
- [ ] Watch error logs
- [ ] Collect user feedback
- [ ] Plan optimizations

---

## Support & Resources

- **Logs**: Check `backend/logs/` or monitoring service
- **Database**: Use Prisma Studio or pgAdmin
- **API Docs**: `docs/API.md`
- **Architecture**: `docs/IMPLEMENTATION_SUMMARY.md`

---

**Ready to deploy? Good luck! 🚀**

For issues, refer to `docs/SETUP.md` troubleshooting section.
