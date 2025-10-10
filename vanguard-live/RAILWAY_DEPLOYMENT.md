# Railway Deployment Guide

This guide will help you deploy VANGUARD Live to Railway.

## Prerequisites

- A [Railway account](https://railway.app/)
- Your GitHub repository connected to Railway
- API keys for Clerk, Stripe, and ShipStation (optional)

## Deployment Steps

### 1. Create a New Project on Railway

1. Go to [Railway](https://railway.app/)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Select the `vanguard-live` directory as the root path (if deploying from a monorepo)

### 2. Configure Environment Variables

Add the following environment variables in Railway's dashboard:

**Required:**
```
DATABASE_URL=./vanguard.db
```

**Clerk Authentication (if using):**
```
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

**Stripe Payments (if using):**
```
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
```

**ShipStation (if using):**
```
SHIPSTATION_API_KEY=your_shipstation_api_key_here
SHIPSTATION_API_SECRET=your_shipstation_api_secret_here
```

> **Note:** Railway automatically sets the `PORT` environment variable, so you don't need to configure it.

### 3. Deploy

Railway will automatically:
1. Detect your Go application using nixpacks
2. Install dependencies (Go modules, npm packages, templ, sqlc)
3. Generate code (SQLC queries, Templ templates)
4. Build CSS with Tailwind
5. Compile the Go application
6. Start the server

The deployment configuration is defined in `nixpacks.toml` and `Procfile`.

### 4. Database Considerations

**Important:** This application uses SQLite, which stores data in a file. On Railway:

- Data will persist between deployments if you use Railway's volume feature
- Without a volume, the database will be reset on each deployment

**To add persistent storage:**
1. Go to your Railway project
2. Click on "Add Plugin"
3. Select "Volume"
4. Mount it to `/app/data`
5. Update `DATABASE_URL` to `/app/data/vanguard.db`

**Alternative:** Consider migrating to PostgreSQL for production use:
1. Add a PostgreSQL plugin in Railway
2. Update the database driver in `cmd/server/main.go`
3. Update connection string to use `$DATABASE_URL` from Railway

### 5. Custom Domain (Optional)

1. Go to your Railway project settings
2. Click on "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### 6. Monitoring

Railway provides:
- Real-time logs
- Metrics dashboard
- Deployment history
- Environment variable management

Access these in your Railway project dashboard.

## Updating Your Deployment

Railway automatically redeploys when you push to your connected GitHub branch.

```bash
git add .
git commit -m "Update application"
git push origin main
```

## Troubleshooting

### Build Fails

Check the build logs in Railway dashboard. Common issues:
- Missing Go modules: Run `go mod tidy` locally and commit
- Templ generation errors: Ensure all `.templ` files are valid
- CSS build errors: Check `tailwind.config.js` and npm dependencies

### Application Won't Start

- Check environment variables are set correctly
- Verify the PORT is not hardcoded in the application
- Review application logs in Railway dashboard

### Database Issues

- Ensure `DATABASE_URL` is set
- Check migration files are included in the repository
- Consider using a volume for data persistence

## Files Configured for Railway

- `nixpacks.toml` - Build configuration
- `Procfile` - Start command
- `.railwayignore` - Files to exclude from deployment

## Support

For Railway-specific issues, check:
- [Railway Documentation](https://docs.railway.app/)
- [Railway Discord](https://discord.gg/railway)

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
