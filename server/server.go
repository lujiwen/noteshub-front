package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	log "gopkg.in/clog.v1"
	"time"
	"strconv"
	"fmt"
	"io/ioutil"
	"mo/models"
)


func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// connect to db
	//initializeDB()

	// Serve frontend static files

	// Setup route group for the API
	api := router.Group("/v1")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
		api.GET("/sheet/:sheetId", GetSheet)

		api.POST("/upload", Upload)
	}

	// Start and run the server
	router.Run(":8080")
}

func initializeDB() {
	if err := models.NewEngine(); err != nil {
		log.Fatal(2, "Fail to initialize ORM engine: %v", err)
	}
}

func Upload(c *gin.Context) {
	// single file
	file, _ := c.FormFile("file")
	log.Info(file.Filename)
	filename := file.Filename
	size := file.Size
	log.Info("filename : %s , size :%s " , filename, size)
	if fileContent, err := file.Open(); err == nil {
		//no side effect
		musicXml, _ := ioutil.ReadAll(fileContent) // why the long names though?
		stave := models.ParseMxmlFromDataByte(musicXml)
		fmt.Printf(stave.Composer)
		fmt.Printf("size:%d", len(musicXml))
	}

	//defer file.close()

	// Upload the file to specific dst.
	// c.SaveUploadedFile(file, dst)
	//save to db upload
	sheetFile := models.SheetFile{SheetTp: models.Stave, FilePath: "./usr/loca/sheet.xml", Filename: filename, UploadTime: time.Now(), Uploader: "lujiwen" }
	models.SaveSheetToDB(sheetFile)

	c.JSON(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
}

func GetSheet(c *gin.Context) {
	c.Header("Content-Type", "application/json; charset=UTF-8")
	c.Header("Access-Control-Allow-Origin", "*")
	if sheetId, err := strconv.Atoi(c.Param("sheetId")); err == nil {
		log.Info("get sheet by id : %s", &sheetId)
		//sheet := Sheet{sheetId, "./location", "1", time.Now(), time.Now()}
		c.JSON(http.StatusOK, models.ParseMxml("resources/sample-chord.musicxml"))
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
