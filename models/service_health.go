package models

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func PingService(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func TestPostFunction(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}
