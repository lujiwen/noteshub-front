package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	log "gopkg.in/clog.v1"
	"mo/models"
)


func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	store := sessions.NewCookieStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}

	router.Use(cors.New(config))

	// same as
	//router.Use(cors.Default())

	// connect to db

	//initializeDB()

	// Serve frontend static files

	// Setup route group for the API

	healthCheckApi := router.Group("")
	{
		healthCheckApi.GET("/ping", models.PingService)
	}

	sheetApi := router.Group("")
	{
		sheetApi.GET("/sheet/:sheetId", models.GetSheet)
		sheetApi.POST("/upload", models.Upload)
	}


	userApi := router.Group("")
	{
		userApi.POST("/register" , models.Register)
		userApi.POST("/login", models.Login)
	}

	// Start and run the server
	router.Run(":8080")
}

func initializeDB() {
	if err := models.NewEngine(); err != nil {
		log.Fatal(2, "Fail to initialize ORM engine: %v", err)
	}
}

