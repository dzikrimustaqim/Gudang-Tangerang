package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"warehouse-system/internal/config"
	"warehouse-system/internal/handlers"
	"warehouse-system/internal/repositories"
	"warehouse-system/internal/services"
	"warehouse-system/pkg/database"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize configuration
	cfg := config.Load()

	// Initialize database
	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Run migrations
	if err := database.Migrate(db); err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	// Initialize repositories
	repos := repositories.NewRepositories(db)

	// Initialize services
	svc := services.NewServices(repos)

	// Initialize handlers
	h := handlers.NewHandlers(svc)

	// Setup Gin
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	// CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	}))

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// API routes
	api := r.Group("/api/v1")
	{
		// Items
		api.GET("/items", h.GetItems)
		api.POST("/items", h.CreateItem)
		api.GET("/items/:id", h.GetItem)
		api.PUT("/items/:id", h.UpdateItem)
		api.DELETE("/items/:id", h.DeleteItem)
		api.GET("/items/search", h.SearchItems)

		// Transactions
		api.GET("/transactions", h.GetTransactions)
		api.POST("/transactions", h.CreateTransaction)
		api.GET("/transactions/:id", h.GetTransaction)
		api.PUT("/transactions/:id", h.UpdateTransaction)
		api.DELETE("/transactions/:id", h.DeleteTransaction)

		// OPDs
		api.GET("/opds", h.GetOPDs)
		api.POST("/opds", h.CreateOPD)
		api.PUT("/opds/:id", h.UpdateOPD)
		api.DELETE("/opds/:id", h.DeleteOPD)

		// Categories
		api.GET("/categories", h.GetCategories)
		api.POST("/categories", h.CreateCategory)
		api.PUT("/categories/:id", h.UpdateCategory)
		api.DELETE("/categories/:id", h.DeleteCategory)

		// Dashboard
		api.GET("/dashboard/summary", h.GetDashboardSummary)
		api.GET("/dashboard/recent-transactions", h.GetRecentTransactions)
	}

	port := cfg.Port
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(r.Run(":" + port))
}