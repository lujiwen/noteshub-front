package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	//"strconv"
	log "gopkg.in/clog.v1"
	//"time"
	"time"
	"strconv"
)


func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
		api.GET("/sheet/:sheetId", GetSheet)
	}

	// Start and run the server
	router.Run(":8080")
}

func GetSheet(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	if sheetId, err := strconv.Atoi(c.Param("sheetId")); err == nil {
		log.Info("get sheet by id : %s", &sheetId)
		sheet := Sheet{sheetId, "./location", "1", time.Now(), time.Now()}
		c.JSON(http.StatusOK, sheet)
	} else {
		c.AbortWithStatus(http.StatusNotFound)
	}

}

// every field name should start with letter in upper case
type Sheet struct {
	SheetId          int `json:"sheetId" binding:"required"`
	Location         string `json:"location" binding:"required"`
	UserId           string `json:"userId" binding:"required"`
	CreateTime       time.Time `json:"createTime" binding:"required"`
	LastModifiedTime time.Time `json:"lastModifiedTime" binding:"required"`
}
