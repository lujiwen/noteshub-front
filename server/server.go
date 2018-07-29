package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	//"strconv"
	//log "gopkg.in/clog.v1"
	//"time"
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
		api.GET("/sheet", GetSheet)
		//api.GET("/jokes", JokeHandler)
		//api.POST("/jokes/like/:jokeID", LikeJoke)

	}

	// Start and run the server
	router.Run(":8080")
}

func GetSheet(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, sheets)
}

//type Sheet struct {
//	sheetId          string `json:"sheetId" binding:"required"`
//	location         string `json:"location" binding:"required"`
//	//userId           string `json:"userId" binding:"required"`
//	//createTime       time.Time `json:"createTime" binding:"required"`
//	//lastModifiedTime time.Time `json:"lastModifiedTime" binding:"required"`
//}



// every field name should start with letter in upper case
type Sheet struct {
	sheetId     int     `json:"sheetId" binding:"required"`
	userId  int     `json:"userId"`
	location   string  `json:"location" binding:"required"`
}

// We'll create a list of jokes

var sheets = []Sheet{
	{1, 0, "Did you hear about the restaurant on the moon? Great food, no atmosphere."},
	{2, 0, "What do you call a fake noodle? An Impasta."},
	{3, 0, "How many apples grow on a tree? All of them."},
	{4, 0, "Want to hear a joke about paper? Nevermind it's tearable."},
	{5, 0, "I just watched a program about beavers. It was the best dam program I've ever seen."},
	{6, 0, "Why did the coffee file a police report? It got mugged."},
	{7, 0, "How does a penguin build it's house? Igloos it together."},
}

// JokeHandler retrieves a list of available jokes
//func JokeHandler(c *gin.Context) {
//	c.Header("Content-Type", "application/json")
//	c.JSON(http.StatusOK, jokes)
//}

// LikeJoke increments the likes of a particular joke Item
//func LikeJoke(c *gin.Context) {
//	// confirm Joke ID sent is valid
//	// remember to import the `strconv` package
//	if jokeid, err := strconv.Atoi(c.Param("jokeID")); err == nil {
//		// find joke, and increment likes
//		for i := 0; i < len(jokes); i++ {
//			if jokes[i].ID == jokeid {
//				jokes[i].Likes += 1
//			}
//		}
//
//		// return a pointer to the updated jokes list
//		c.JSON(http.StatusOK, &jokes)
//	} else {
//		// Joke ID is invalid
//		c.AbortWithStatus(http.StatusNotFound)
//	}
//}