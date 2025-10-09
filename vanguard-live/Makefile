.PHONY: help build run dev test clean generate migrate

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the application
	@echo "Building application..."
	@templ generate
	@go build -o bin/server cmd/server/main.go
	@echo "Build complete!"

run: ## Run the application
	@echo "Running application..."
	@go run cmd/server/main.go

dev: ## Run the application with hot reload (Air)
	@echo "Starting development server with hot reload..."
	@air

test: ## Run tests
	@echo "Running tests..."
	@go test -v ./...

clean: ## Clean build artifacts
	@echo "Cleaning..."
	@rm -rf bin/ tmp/ vanguard.db
	@echo "Clean complete!"

generate: ## Generate code (SQLC + Templ)
	@echo "Generating code..."
	@sqlc generate
	@templ generate
	@echo "Generation complete!"

migrate: ## Run database migrations
	@echo "Running migrations..."
	@sqlite3 vanguard.db < migrations/001_initial.sql
	@echo "Migrations complete!"

css: ## Build CSS with Tailwind
	@echo "Building CSS..."
	@npm run build:css
	@echo "CSS build complete!"

watch-css: ## Watch and build CSS
	@echo "Watching CSS..."
	@npm run watch:css

setup: ## Initial setup
	@echo "Setting up project..."
	@go mod tidy
	@npm install
	@cp .env.example .env
	@make generate
	@make css
	@echo "Setup complete! Edit .env with your configuration."

docker-build: ## Build Docker image
	@echo "Building Docker image..."
	@docker build -t vanguard-live .

docker-run: ## Run Docker container
	@echo "Running Docker container..."
	@docker run -p 3000:3000 vanguard-live
