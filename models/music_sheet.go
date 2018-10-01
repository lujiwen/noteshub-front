package models

import (
	"fmt"
	"github.com/gin-gonic/gin"
	log "gopkg.in/clog.v1"
	"io/ioutil"
	"mo/models/musicxml"
	"net/http"
	"strconv"
	"time"
)

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
	sheetFile := SheetFile{SheetTp: Stave, FilePath: "./usr/loca/sheet.xml", Filename: filename, UploadTime: time.Now(), Uploader: "lujiwen" }
	 SaveSheetToDB(sheetFile)

	c.JSON(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
}

func GetSheet(c *gin.Context) {
	c.Header("Content-Type", "application/json; charset=UTF-8")
	c.Header("Access-Control-Allow-Origin", "*")
	if sheetId, err := strconv.Atoi(c.Param("sheetId")); err == nil {
		log.Info("get sheet by id : %s", &sheetId)
		//sheet := MusicSheet{sheetId, "./location", "1", time.Now(), time.Now()}
		c.JSON(http.StatusOK, ParseMxmlFromString("resources/sample-chord.xml"))
	} else {
		c.AbortWithStatus(http.StatusNotFound)
	}
}

// every field name should start with letter in upper case, otherwise it is not visible for class outside
type MusicSheet struct {
	SheetId          int `json:"sheetId" binding:"required"`
	Location         string `json:"location" binding:"required"`
	UserId           string `json:"userId" binding:"required"`
	CreateTime       time.Time `json:"createTime" binding:"required"`
	LastModifiedTime time.Time `json:"lastModifiedTime" binding:"required"`
}

