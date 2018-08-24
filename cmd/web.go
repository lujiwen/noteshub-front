package cmd

import (
	"github.com/urfave/cli"
	"net/http"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"strconv"
	"mo/models"
	log "gopkg.in/clog.v1"
)

var Web = cli.Command{
	Name:        "server",
	Usage:       "Start web server with framework Gin",
	Description: `backend with gin to serve http request and response with json`,
	Action:      runWeb,
	Flags: []cli.Flag{
		stringFlag("port, p", "3000", "Temporary port number to prevent conflict"),
		stringFlag("config, c", "custom/conf/app.ini", "Custom configuration file path"),
	},
}

func runWeb(c *cli.Context) {
	models.NewEngine()
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
		//api.GET("/sheet/:sheetID", GetSheet)
		api.GET("/jokes", JokeHandler)
		api.POST("/jokes/like/:jokeID", LikeJoke)

	}

	// Start and run the server
	router.Run(":8080")
}

//func GetSheet(c *gin.Context) {
//	log.Info("get sheet")
//	if sheetId, err := strconv.Atoi(c.Param("jokeID")); err == nil {
//		log.Info("sheetID: %s", sheetId )
//		c.JSON(http.StatusOK, models.ParseMxmlFromString("models/musicxml/sample-chord.xml"))
//	}
//}

func uploadSheet(c *gin.Context) {
	log.Info("uploading file!")
}

func userHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, gin.H{
		"message": "LikeJoke handler not implemented yet",
	})
}


type Joke struct {
	ID     int     `json:"id" binding:"required"`
	Likes  int     `json:"likes"`
	Joke   string  `json:"joke" binding:"required"`
}

// We'll create a list of jokes
var jokes = []Joke{
	{1, 0, "Did you hear about the restaurant on the moon? Great food, no atmosphere."},
	{2, 0, "What do you call a fake noodle? An Impasta."},
	{3, 0, "How many apples grow on a tree? All of them."},
	{4, 0, "Want to hear a joke about paper? Nevermind it's tearable."},
	{5, 0, "I just watched a program about beavers. It was the best dam program I've ever seen."},
	{6, 0, "Why did the coffee file a police report? It got mugged."},
	{7, 0, "How does a penguin build it's house? Igloos it together."},
}

// JokeHandler retrieves a list of available jokes
func JokeHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, jokes)
}

// LikeJoke increments the likes of a particular joke Item
func LikeJoke(c *gin.Context) {
	// confirm Joke ID sent is valid
	// remember to import the `strconv` package
	if jokeid, err := strconv.Atoi(c.Param("jokeID")); err == nil {
		// find joke, and increment likes
		for i := 0; i < len(jokes); i++ {
			if jokes[i].ID == jokeid {
				jokes[i].Likes += 1
			}
		}

		// return a pointer to the updated jokes list
		c.JSON(http.StatusOK, &jokes)
	} else {
		// Joke ID is invalid
		c.AbortWithStatus(http.StatusNotFound)
	}
}