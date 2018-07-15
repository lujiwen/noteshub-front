// Copyright 2016 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

const OWNER_TEAM = "Owners"

// Team represents a organization team.
type Team struct {
	ID          int64
	OrgID       int64 `xorm:"INDEX"`
	LowerName   string
	Name        string
	Description string
	Authorize   AccessMode
	Repos       []*Repository `xorm:"-" json:"-"`
	Members     []*User       `xorm:"-" json:"-"`
	NumRepos    int
	NumMembers  int
}
