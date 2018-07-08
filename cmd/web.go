package cmd

import (
	"github.com/urfave/cli"
	"net/http"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var Web = cli.Command{
	Name:        "web",
	Usage:       "Start web server with framework Gin",
	Description: `backend with gin to serve http request and response with json`,
	Action:      runWeb,
	Flags: []cli.Flag{
		stringFlag("port, p", "3000", "Temporary port number to prevent conflict"),
		stringFlag("config, c", "custom/conf/app.ini", "Custom configuration file path"),
	},
}

func runWeb(c *cli.Context) {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	// Start and run the server
	router.Run(":8080")
}

func userHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"message": "LikeJoke handler not implemented yet",
	})
}
