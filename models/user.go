// Copyright 2017 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

import (
	"fmt"
	"time"
)

type EmptyName struct{}
type UserType int

// User represents the object of individual and member of organization.
type User struct {
	ID        int64
	LowerName string `xorm:"UNIQUE NOT NULL"`
	Name      string `xorm:"UNIQUE NOT NULL"`
	FullName  string
	// Email is the primary email address (to be used for communication)
	Email       string `xorm:"NOT NULL"`
	Passwd      string `xorm:"NOT NULL"`
	LoginType   LoginType
	LoginSource int64 `xorm:"NOT NULL DEFAULT 0"`
	LoginName   string
	Type        UserType
	OwnedOrgs   []*User       `xorm:"-" json:"-"`
	Orgs        []*User       `xorm:"-" json:"-"`
	Repos       []*Repository `xorm:"-" json:"-"`
	Location    string
	Website     string
	Rands       string `xorm:"VARCHAR(10)"`
	Salt        string `xorm:"VARCHAR(10)"`

	Created     time.Time `xorm:"-" json:"-"`
	CreatedUnix int64
	Updated     time.Time `xorm:"-" json:"-"`
	UpdatedUnix int64

	// Remember visibility choice for convenience, true for private
	LastRepoVisibility bool
	// Maximum repository creation limit, -1 means use gloabl default
	MaxRepoCreation int `xorm:"NOT NULL DEFAULT -1"`

	// Permissions
	IsActive         bool // Activate primary email
	IsAdmin          bool
	AllowGitHook     bool
	AllowImportLocal bool // Allow migrate repository by local path
	ProhibitLogin    bool

	// Avatar
	Avatar          string `xorm:"VARCHAR(2048) NOT NULL"`
	AvatarEmail     string `xorm:"NOT NULL"`
	UseCustomAvatar bool

	// Counters
	NumFollowers int
	NumFollowing int `xorm:"NOT NULL DEFAULT 0"`
	NumStars     int
	NumRepos     int

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


// ___________    .__  .__
// \_   _____/___ |  | |  |   ______  _  __
//  |    __)/  _ \|  | |  |  /  _ \ \/ \/ /
//  |     \(  <_> )  |_|  |_(  <_> )     /
//  \___  / \____/|____/____/\____/ \/\_/
//      \/

// Follow represents relations of user and his/her followers.
type Follow struct {
	ID       int64
	UserID   int64 `xorm:"UNIQUE(follow)"`
	FollowID int64 `xorm:"UNIQUE(follow)"`
}