// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

type AccessMode int

const (
	ACCESS_MODE_NONE  AccessMode = iota // 0
	ACCESS_MODE_READ                    // 1
	ACCESS_MODE_WRITE                   // 2
	ACCESS_MODE_ADMIN                   // 3
	ACCESS_MODE_OWNER                   // 4
)

func (mode AccessMode) String() string {
	switch mode {
	case ACCESS_MODE_READ:
		return "read"
	case ACCESS_MODE_WRITE:
		return "write"
	case ACCESS_MODE_ADMIN:
		return "admin"
	case ACCESS_MODE_OWNER:
		return "owner"
	default:
		return "none"
	}
}

// ParseAccessMode returns corresponding access mode to given permission string.
func ParseAccessMode(permission string) AccessMode {
	switch permission {
	case "write":
		return ACCESS_MODE_WRITE
	case "admin":
		return ACCESS_MODE_ADMIN
	default:
		return ACCESS_MODE_READ
	}
}

// Access represents the highest access level of a user to the repository. The only access type
// that is not in this table is the real owner of a repository. In case of an organization
// repository, the members of the owners team are in this table.
type Access struct {
	ID     int64
	UserID int64 `xorm:"UNIQUE(s)"`
	RepoID int64 `xorm:"UNIQUE(s)"`
	Mode   AccessMode
}

func accessLevel(e Engine, userID int64, repo *Repository) (AccessMode, error) {
	mode := ACCESS_MODE_NONE
	// Everyone has read access to public repository
	if !repo.IsPrivate {
		mode = ACCESS_MODE_READ
	}

	if userID <= 0 {
		return mode, nil
	}

	if userID == repo.OwnerID {
		return ACCESS_MODE_OWNER, nil
	}

	access := &Access{
		UserID: userID,
		RepoID: repo.ID,
	}
	if has, err := e.Get(access); !has || err != nil {
		return mode, err
	}
	return access.Mode, nil
}

// AccessLevel returns the Access a user has to a repository. Will return NoneAccess if the
// user does not have access.
func AccessLevel(userID int64, repo *Repository) (AccessMode, error) {
	return accessLevel(x, userID, repo)
}

func hasAccess(e Engine, userID int64, repo *Repository, testMode AccessMode) (bool, error) {
	mode, err := accessLevel(e, userID, repo)
	return mode >= testMode, err
}

// HasAccess returns true if someone has the request access level. User can be nil!
func HasAccess(userID int64, repo *Repository, testMode AccessMode) (bool, error) {
	return hasAccess(x, userID, repo, testMode)
}
