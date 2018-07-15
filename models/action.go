// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

import (
	"fmt"
	"path"
	"regexp"
	"strings"
	"time"
	"unicode"

	"github.com/go-xorm/xorm"
	//api "github.com/gogs/go-gogs-client"

	"github.com/gogs/gogs/pkg/setting"
	"github.com/gogs/gogs/pkg/tool"
)

type ActionType int

// Note: To maintain backward compatibility only append to the end of list
const (
	ACTION_CREATE_REPO         ActionType = iota + 1 // 1
	ACTION_RENAME_REPO                               // 2
	ACTION_STAR_REPO                                 // 3
	ACTION_WATCH_REPO                                // 4
	ACTION_COMMIT_REPO                               // 5
	ACTION_CREATE_ISSUE                              // 6
	ACTION_CREATE_PULL_REQUEST                       // 7
	ACTION_TRANSFER_REPO                             // 8
	ACTION_PUSH_TAG                                  // 9
	ACTION_COMMENT_ISSUE                             // 10
	ACTION_MERGE_PULL_REQUEST                        // 11
	ACTION_CLOSE_ISSUE                               // 12
	ACTION_REOPEN_ISSUE                              // 13
	ACTION_CLOSE_PULL_REQUEST                        // 14
	ACTION_REOPEN_PULL_REQUEST                       // 15
	ACTION_CREATE_BRANCH                             // 16
	ACTION_DELETE_BRANCH                             // 17
	ACTION_DELETE_TAG                                // 18
	ACTION_FORK_REPO                                 // 19
	ACTION_MIRROR_SYNC_PUSH                          // 20
	ACTION_MIRROR_SYNC_CREATE                        // 21
	ACTION_MIRROR_SYNC_DELETE                        // 22
)

var (
	// Same as Github. See https://help.github.com/articles/closing-issues-via-commit-messages
	IssueCloseKeywords  = []string{"close", "closes", "closed", "fix", "fixes", "fixed", "resolve", "resolves", "resolved"}
	IssueReopenKeywords = []string{"reopen", "reopens", "reopened"}

	IssueCloseKeywordsPat, IssueReopenKeywordsPat *regexp.Regexp
	IssueReferenceKeywordsPat                     *regexp.Regexp
)

func assembleKeywordsPattern(words []string) string {
	return fmt.Sprintf(`(?i)(?:%s) \S+`, strings.Join(words, "|"))
}

func init() {
	IssueCloseKeywordsPat = regexp.MustCompile(assembleKeywordsPattern(IssueCloseKeywords))
	IssueReopenKeywordsPat = regexp.MustCompile(assembleKeywordsPattern(IssueReopenKeywords))
	IssueReferenceKeywordsPat = regexp.MustCompile(`(?i)(?:)(^| )\S+`)
}

// Action represents user operation type and other information to repository,
// it implemented interface base.Actioner so that can be used in template render.
type Action struct {
	ID           int64
	UserID       int64 // Receiver user ID
	OpType       ActionType
	ActUserID    int64  // Doer user ID
	ActUserName  string // Doer user name
	ActAvatar    string `xorm:"-" json:"-"`
	RepoID       int64  `xorm:"INDEX"`
	RepoUserName string
	RepoName     string
	RefName      string
	IsPrivate    bool      `xorm:"NOT NULL DEFAULT false"`
	Content      string    `xorm:"TEXT"`
	Created      time.Time `xorm:"-" json:"-"`
	CreatedUnix  int64
}

func (a *Action) BeforeInsert() {
	a.CreatedUnix = time.Now().Unix()
}

func (a *Action) AfterSet(colName string, _ xorm.Cell) {
	switch colName {
	case "created_unix":
		a.Created = time.Unix(a.CreatedUnix, 0).Local()
	}
}

func (a *Action) GetOpType() int {
	return int(a.OpType)
}

func (a *Action) GetActUserName() string {
	return a.ActUserName
}

func (a *Action) ShortActUserName() string {
	return tool.EllipsisString(a.ActUserName, 20)
}

func (a *Action) GetRepoUserName() string {
	return a.RepoUserName
}

func (a *Action) ShortRepoUserName() string {
	return tool.EllipsisString(a.RepoUserName, 20)
}

func (a *Action) GetRepoName() string {
	return a.RepoName
}

func (a *Action) ShortRepoName() string {
	return tool.EllipsisString(a.RepoName, 33)
}

func (a *Action) GetRepoPath() string {
	return path.Join(a.RepoUserName, a.RepoName)
}

func (a *Action) ShortRepoPath() string {
	return path.Join(a.ShortRepoUserName(), a.ShortRepoName())
}

func (a *Action) GetRepoLink() string {
	if len(setting.AppSubURL) > 0 {
		return path.Join(setting.AppSubURL, a.GetRepoPath())
	}
	return "/" + a.GetRepoPath()
}

func (a *Action) GetBranch() string {
	return a.RefName
}

func (a *Action) GetContent() string {
	return a.Content
}

func (a *Action) GetCreate() time.Time {
	return a.Created
}

func (a *Action) GetIssueInfos() []string {
	return strings.SplitN(a.Content, "|", 2)
}




func issueIndexTrimRight(c rune) bool {
	return !unicode.IsDigit(c)
}

type PushCommit struct {
	Sha1           string
	Message        string
	AuthorEmail    string
	AuthorName     string
	CommitterEmail string
	CommitterName  string
	Timestamp      time.Time
}

type PushCommits struct {
	Len        int
	Commits    []*PushCommit
	CompareURL string

	avatars map[string]string
}


type CommitRepoActionOptions struct {
	PusherName  string
	RepoOwnerID int64
	RepoName    string
	RefFullName string
	OldCommitID string
	NewCommitID string
	Commits     *PushCommits
}

