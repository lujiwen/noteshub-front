// Copyright 2017 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

import (
	"fmt"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"time"
)

type EmptyName struct{}
type UserType int

// User represents the object of individual and member of organization.
type User struct {
	ID        int64
	//LowerName string `xorm:"UNIQUE NOT NULL"`
	Name      string `xorm:"UNIQUE NOT NULL"`
	FullName  string
	// Email is the primary email address (to be used for communication)
	PhoneNumber       string `xorm:"UNIQUE NOT NULL 'phone_number'" form:"phoneNumber" json:"phoneNumber" binding:"required"`
	Email             string
	Password      string `xorm:"NOT NULL " form:"password" json:"password" binding:"required"`
	LoginType   LoginType
	//LoginSource int64 `xorm:"NOT NULL DEFAULT 0"`
	//LoginName   string
	//Type        UserType
	//OwnedOrgs   []*User       `xorm:"-" json:"-"`  // - means 这个Field将不进行字段映射 https://www.kancloud.cn/kancloud/xorm-manual-zh-cn/56004
	//Orgs        []*User       `xorm:"-" json:"-"`
	//Repos       []*Repository `xorm:"-" json:"-"`
	Location    string
	//Website     string
	//Rands       string `xorm:"VARCHAR(10)"`
	//Salt        string `xorm:"VARCHAR(10)"`

	Created     time.Time `xorm:"created_time" json:"createdTime"`
	CreatedUnix int64
	Updated     time.Time `xorm:"updated_time" json:"updatedTime"`
	UpdatedUnix int64

	// Remember visibility choice for convenience, true for private
	LastRepoVisibility bool
	// Maximum repository creation limit, -1 means use gloabl default
	//MaxRepoCreation int `xorm:"NOT NULL DEFAULT -1"`

	// Permissions
	IsActive         bool // Activate primary email
	IsAdmin          bool
	//AllowGitHook     bool
	//AllowImportLocal bool // Allow migrate repository by local path
	ProhibitLogin    bool

	// Avatar
	Avatar          string `xorm:"VARCHAR(2048)`
	//AvatarEmail     string `xorm:"NOT NULL"`
	//UseCustomAvatar bool

	// Counters
	NumFollowers int
	NumFollowing int `xorm:"DEFAULT 0"`
	NumStars     int
	NumSheets    int

	// For organization
	Description string
	NumTeams    int
	NumMembers  int
	Teams       []*Team `xorm:"-" json:"-"`
	Members     []*User `xorm:"-" json:"-"`
}

func IsEmptyName(err error) bool {
	_, ok := err.(EmptyName)
	return ok
}

func (err EmptyName) Error() string {
	return "empty name"
}

type UserNotExist struct {
	UserID int64
	Name   string
}

func IsUserNotExist(err error) bool {
	_, ok := err.(UserNotExist)
	return ok
}

func (err UserNotExist) Error() string {
	return fmt.Sprintf("user does not exist [user_id: %d, name: %s]", err.UserID, err.Name)
}

type UserNotKeyOwner struct {
	KeyID int64
}

func IsUserNotKeyOwner(err error) bool {
	_, ok := err.(UserNotKeyOwner)
	return ok
}

func (err UserNotKeyOwner) Error() string {
	return fmt.Sprintf("user is not the owner of public key [key_id: %d]", err.KeyID)
}

// Follow represents relations of user and his/her followers.
type Follow struct {
	ID       int64
	UserID   int64 `xorm:"UNIQUE(follow)"`
	FollowID int64 `xorm:"UNIQUE(follow)"`
}


func (User)Login(c *gin.Context) {
	session := sessions.Default(c)
	phone := ""
	password := ""

	//  parse parameter in this way can work in the case that header take 'Content-Type': 'application/json'
	var user User
	if  err := c.ShouldBindJSON(&user); err == nil {
		phone = strings.Trim(user.PhoneNumber, " ")
		password = strings.Trim(user.Password, " ")
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "can not parse parameters! "})
		return
	}

	if phone == "" ||  password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Parameters can't be empty"})
		return
	}
	if isUserValidated(phone, password) {
		// generate access token
		// get UserId 
		user, _ := findUserByPhoneNumber(phone)

		token, _ := GenerateAccessToken(user)


		session.Set("phone", phone) //In real world usage you'd set this to the users ID
		err := session.Save()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate session token"})
		} else {
			c.JSON(http.StatusOK, gin.H{"message": "Successfully authenticated user", "token": token})
		}
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication failed"})
	}
}


func isUserExist(phoneNumber string) bool {
    exist, _ := x.Get(&User{PhoneNumber: phoneNumber})
	return exist
}

func isUserValidated(phone string, password string) bool{
	//exist, _ := x.Where("phone_number=? and password=?", phone, password).Get(User{})
	//return exist
	user := &User{PhoneNumber: phone, Password: password}
	exist, _ := x.Get(user)
	return exist
}

func (User)Register(c *gin.Context) {
	var user User

	// c.postForm can only work in the case that postman header is null
	// but request from front always take  " 'Content-Type': 'application/json' "
	if  err := c.ShouldBindJSON(&user); err == nil {
		phone := user.PhoneNumber
		password := user.Password
		if isUserExist(phone) {
			c.JSON(http.StatusBadRequest, gin.H{"message": "the user already exists."})
			return
		}

		newUser := User{ Name:"用户" + phone , PhoneNumber: phone, Password: password, Created: time.Now(), Updated:time.Now()}
		if userId, err := x.InsertOne(newUser);  err != nil {
			c.JSON(http.StatusOK, gin.H{"message": "Successfully register " + string(userId)})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "用户注册失败 " + err.Error() })
		}
		return
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "can not parse parameters! "})
		return
	}
}


func (User)Logout(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get("user")
	if user == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session token"})
	} else {
		session.Delete("user")
		session.Save()
		c.JSON(http.StatusOK, gin.H{"message": "Successfully logged out"})
	}
}

func findUserByPhoneNumber(phoneNumber string) (User, error) {
	var user User
	has, err := x.Table("user").Where("phone_number = ?", phoneNumber).Get(&user)
	if has && err == nil {
		return user, nil
	} else {
		return user, err
	}
}


