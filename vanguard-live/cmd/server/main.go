package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/loganlanou/vanguard-live/internal/database"
	"github.com/loganlanou/vanguard-live/internal/handlers"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Initialize database
	db, err := sql.Open("sqlite3", getEnv("DATABASE_URL", "./vanguard.db"))
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Run migrations
	if err := runMigrations(db); err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	// Create queries
	queries := database.New(db)

	// Initialize Echo
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	e.Use(middleware.Secure())
	e.Use(middleware.Gzip())

	// Static files
	e.Static("/static", "web/static")

	// Initialize handlers
	h := handlers.New(queries)

	// Routes
	e.GET("/", h.HandleHome)
	e.GET("/studio", h.HandleStudio)
	e.GET("/gallery", h.HandleGallery)
	e.GET("/shop", h.HandleShop)

	// API routes
	api := e.Group("/api")
	api.POST("/designs", h.HandleCreateDesign)
	api.GET("/designs", h.HandleListDesigns)
	api.GET("/designs/:id", h.HandleGetDesign)
	api.PUT("/designs/:id", h.HandleUpdateDesign)
	api.DELETE("/designs/:id", h.HandleDeleteDesign)

	// Webhooks
	e.POST("/webhooks/stripe", h.HandleStripeWebhook)
	e.POST("/webhooks/clerk", h.HandleClerkWebhook)

	// Start server
	port := getEnv("PORT", "3000")
	log.Printf("Server starting on :%s", port)
	if err := e.Start(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func runMigrations(db *sql.DB) error {
	// Read and execute migration file
	migrationSQL, err := os.ReadFile("migrations/001_initial.sql")
	if err != nil {
		return fmt.Errorf("failed to read migration file: %w", err)
	}

	if _, err := db.Exec(string(migrationSQL)); err != nil {
		return fmt.Errorf("failed to execute migration: %w", err)
	}

	log.Println("Migrations completed successfully")
	return nil
}
