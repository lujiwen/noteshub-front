// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

import (
	"time"

	//api "github.com/gogs/go-gogs-client"

	"github.com/gogs/gogs/models/errors"
)

var (
	ErrMissingIssueNumber = errors.New("No issue number specified")
)

// Issue represents an issue or pull request of repository.
type Issue struct {
	ID              int64
	RepoID          int64       `xorm:"INDEX UNIQUE(repo_index)"`
	Repo            *Repository `xorm:"-" json:"-"`
	Index           int64       `xorm:"UNIQUE(repo_index)"` // Index in one repository.
	PosterID        int64
	Poster          *User    `xorm:"-" json:"-"`
	Title           string   `xorm:"name"`
	Content         string   `xorm:"TEXT"`
	RenderedContent string   `xorm:"-" json:"-"`
	Labels          []*Label `xorm:"-" json:"-"`
	MilestoneID     int64
	//Milestone       *Milestone `xorm:"-" json:"-"`
	Priority        int
	AssigneeID      int64
	Assignee        *User `xorm:"-" json:"-"`
	IsClosed        bool
	IsRead          bool         `xorm:"-" json:"-"`
	IsPull          bool         // Indicates whether is a pull request or not.
	//PullRequest     *PullRequest `xorm:"-" json:"-"`
	NumComments     int

	Deadline     time.Time `xorm:"-" json:"-"`
	DeadlineUnix int64
	Created      time.Time `xorm:"-" json:"-"`
	CreatedUnix  int64
	Updated      time.Time `xorm:"-" json:"-"`
	UpdatedUnix  int64
	//
	//Attachments []*Attachment `xorm:"-" json:"-"`
	//Comments    []*Comment    `xorm:"-" json:"-"`
}
