# VANGUARD Live - Professional Design System Platform

A full-stack web application for creating, managing, and selling professional design systems built with modern technologies.

## 🚀 Technology Stack

### Backend
- **Go 1.25** - High-performance backend language
- **Echo v4** - Lightweight web framework
- **SQLite** - Embedded database with SQLC for type-safe queries
- **Templ** - Type-safe HTML templating
- **Clerk** - Authentication & user management
- **Stripe** - Payment processing
- **ShipStation** - Shipping integration

### Frontend
- **Tailwind CSS** - Utility-first CSS framework
- **HTMX** - Dynamic HTML without JavaScript frameworks
- **Vanilla JavaScript** - Lightweight interactivity
- **Server-Side Rendering** - Fast initial page loads

### Development Tools
- **Air** - Hot reload for Go applications
- **direnv** - Environment variable management
- **Make** - Build automation
- **SQLC** - Generate type-safe Go from SQL
- **Templ CLI** - Generate Go from templates

## 📋 Prerequisites

- Go 1.25+
- Node.js 18+ & npm
- SQLite3
- Make

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/loganlanou/vanguard-live.git
   cd vanguard-live
   ```

2. **Run setup**
   ```bash
   make setup
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Build and run**
   ```bash
   make build
   ./bin/server
   ```

   Or for development with hot reload:
   ```bash
   make dev
   ```

## 📁 Project Structure

```
vanguard-live/
├── cmd/
│   └── server/          # Main application entry point
├── internal/
│   ├── database/        # SQLC generated code
│   ├── handlers/        # HTTP request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Business logic models
│   └── services/        # Business services
├── web/
│   ├── templates/       # Templ templates
│   └── static/          # Static assets (CSS, JS, images)
├── migrations/          # Database migrations
├── scripts/             # Utility scripts
├── .air.toml           # Air configuration
├── sqlc.yaml           # SQLC configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── Makefile            # Build automation
└── README.md           # This file
```

## 🎯 Features

- ✅ Color palette generation with live preview
- ✅ User authentication with Clerk
- ✅ Design system management (CRUD operations)
- ✅ Database with type-safe queries
- ✅ Server-side rendering with Templ
- ✅ Responsive UI with Tailwind CSS
- 🚧 Stripe payment integration (in progress)
- 🚧 ShipStation shipping integration (in progress)
- 🚧 E-commerce shop functionality (in progress)

## 🔧 Available Make Commands

```bash
make help          # Show all available commands
make build         # Build the application
make run           # Run the application
make dev           # Run with hot reload (Air)
make test          # Run tests
make clean         # Clean build artifacts
make generate      # Generate code (SQLC + Templ)
make migrate       # Run database migrations
make css           # Build Tailwind CSS
make watch-css     # Watch and build CSS
make setup         # Initial project setup
```

## 🌐 API Routes

### Pages
- `GET /` - Home page
- `GET /studio` - Design studio
- `GET /gallery` - Design gallery
- `GET /shop` - E-commerce shop

### API Endpoints
- `POST /api/designs` - Create new design
- `GET /api/designs` - List designs
- `GET /api/designs/:id` - Get specific design
- `PUT /api/designs/:id` - Update design
- `DELETE /api/designs/:id` - Delete design

### Webhooks
- `POST /webhooks/stripe` - Stripe webhook handler
- `POST /webhooks/clerk` - Clerk webhook handler

## 🔐 Environment Variables

```env
# Server
PORT=3000
DATABASE_URL=./vanguard.db

# Clerk Authentication
CLERK_SECRET_KEY=your_key_here
CLERK_PUBLISHABLE_KEY=your_key_here

# Stripe Payments
STRIPE_SECRET_KEY=your_key_here
STRIPE_PUBLISHABLE_KEY=your_key_here
STRIPE_WEBHOOK_SECRET=your_secret_here

# ShipStation
SHIPSTATION_API_KEY=your_key_here
SHIPSTATION_API_SECRET=your_secret_here
```

## 📊 Database Schema

### Users
- Stores user information synced from Clerk
- Links to Stripe customer IDs

### Design Systems
- Stores palette and configuration data as JSON
- Supports public/private visibility
- User ownership tracking

### Orders & Order Items
- Tracks purchases and fulfillment
- Integrates with Stripe and ShipStation

## 🚀 Deployment

### Docker
```bash
make docker-build
make docker-run
```

### Manual Deployment
1. Build the application: `make build`
2. Copy `bin/server`, `web/`, and `migrations/` to server
3. Set environment variables
4. Run migrations: `make migrate`
5. Start server: `./bin/server`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `make test`
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🎨 Credits

Built with ❤️ using:
- [Echo](https://echo.labstack.com/)
- [Templ](https://templ.guide/)
- [SQLC](https://sqlc.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.com/)
- [Stripe](https://stripe.com/)

---

**VANGUARD** - Professional Design Systems Made Simple

🤖 Generated with [Claude Code](https://claude.com/claude-code)
