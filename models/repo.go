// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

import (
	"time"

	//api "github.com/gogs/go-gogs-client"

	"github.com/gogs/gogs/pkg/sync"
)

var repoWorkingPool = sync.NewExclusivePool()

var (
	Gitignores, Licenses, Readmes, LabelTemplates []string

	// Maximum items per page in forks, watchers and stars of a repo
	ItemsPerPage = 40
)


// Repository contains information of a repository.
type Repository struct {
	ID            int64
	OwnerID       int64  `xorm:"UNIQUE(s)"`
	Owner         *User  `xorm:"-" json:"-"`
	LowerName     string `xorm:"UNIQUE(s) INDEX NOT NULL"`
	Name          string `xorm:"INDEX NOT NULL"`
	Description   string `xorm:"VARCHAR(512)"`
	Website       string
	DefaultBranch string
	Size          int64 `xorm:"NOT NULL DEFAULT 0"`

	NumWatches          int
	NumStars            int
	NumForks            int
	NumIssues           int
	NumClosedIssues     int
	NumOpenIssues       int `xorm:"-" json:"-"`
	NumPulls            int
	NumClosedPulls      int
	NumOpenPulls        int `xorm:"-" json:"-"`
	NumMilestones       int `xorm:"NOT NULL DEFAULT 0"`
	NumClosedMilestones int `xorm:"NOT NULL DEFAULT 0"`
	NumOpenMilestones   int `xorm:"-" json:"-"`
	NumTags             int `xorm:"-" json:"-"`

	IsPrivate bool
	IsBare    bool

	IsMirror bool
	//*Mirror  `xorm:"-" json:"-"`

	// Advanced settings
	EnableWiki            bool `xorm:"NOT NULL DEFAULT true"`
	AllowPublicWiki       bool
	EnableExternalWiki    bool
	ExternalWikiURL       string
	EnableIssues          bool `xorm:"NOT NULL DEFAULT true"`
	AllowPublicIssues     bool
	EnableExternalTracker bool
	ExternalTrackerURL    string
	ExternalTrackerFormat string
	ExternalTrackerStyle  string
	ExternalMetas         map[string]string `xorm:"-" json:"-"`
	EnablePulls           bool              `xorm:"NOT NULL DEFAULT true"`
	PullsIgnoreWhitespace bool              `xorm:"NOT NULL DEFAULT false"`
	PullsAllowRebase      bool              `xorm:"NOT NULL DEFAULT false"`

	IsFork   bool `xorm:"NOT NULL DEFAULT false"`
	ForkID   int64
	BaseRepo *Repository `xorm:"-" json:"-"`

	Created     time.Time `xorm:"-" json:"-"`
	CreatedUnix int64
	Updated     time.Time `xorm:"-" json:"-"`
	UpdatedUnix int64
}


//   _________ __
//  /   _____//  |______ _______
//  \_____  \\   __\__  \\_  __ \
//  /        \|  |  / __ \|  | \/
// /_______  /|__| (____  /__|
//         \/           \/

type Star struct {
	ID     int64
	UID    int64 `xorm:"UNIQUE(s)"`
	RepoID int64 `xorm:"UNIQUE(s)"`
}

//  __      __         __         .__
// /  \    /  \_____ _/  |_  ____ |  |__
// \   \/\/   /\__  \\   __\/ ___\|  |  \
//  \        /  / __ \|  | \  \___|   Y  \
//   \__/\  /  (____  /__|  \___  >___|  /
//        \/        \/          \/     \/

// Watch is connection request for receiving repository notification.
type Watch struct {
	ID     int64
	UserID int64 `xorm:"UNIQUE(watch)"`
	RepoID int64 `xorm:"UNIQUE(watch)"`
}
