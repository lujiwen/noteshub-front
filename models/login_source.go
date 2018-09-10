// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

import (
	"crypto/tls"
	"fmt"
	"net/smtp"
	"time"

	"github.com/go-xorm/core"
	"github.com/json-iterator/go"
	"gopkg.in/ini.v1"

	"github.com/gogs/gogs/models/errors"
	"github.com/gogs/gogs/pkg/auth/ldap"
)

type LoginType int

// Note: new type must append to the end of list to maintain compatibility.
const (
	LOGIN_NOTYPE LoginType = iota
	LOGIN_PLAIN            // 1
	LOGIN_LDAP             // 2
	LOGIN_SMTP             // 3
	LOGIN_PAM              // 4
	LOGIN_DLDAP            // 5
)

var LoginNames = map[LoginType]string{
	LOGIN_LDAP:  "LDAP (via BindDN)",
	LOGIN_DLDAP: "LDAP (simple auth)", // Via direct bind
	LOGIN_SMTP:  "SMTP",
	LOGIN_PAM:   "PAM",
}

var SecurityProtocolNames = map[ldap.SecurityProtocol]string{
	ldap.SECURITY_PROTOCOL_UNENCRYPTED: "Unencrypted",
	ldap.SECURITY_PROTOCOL_LDAPS:       "LDAPS",
	ldap.SECURITY_PROTOCOL_START_TLS:   "StartTLS",
}

// Ensure structs implemented interface.
var (
	_ core.Conversion = &LDAPConfig{}
	_ core.Conversion = &SMTPConfig{}
	_ core.Conversion = &PAMConfig{}
)

type LDAPConfig struct {
	*ldap.Source `ini:"config"`
}

func (cfg *LDAPConfig) FromDB(bs []byte) error {
	return jsoniter.Unmarshal(bs, &cfg)
}

func (cfg *LDAPConfig) ToDB() ([]byte, error) {
	return jsoniter.Marshal(cfg)
}

func (cfg *LDAPConfig) SecurityProtocolName() string {
	return SecurityProtocolNames[cfg.SecurityProtocol]
}

type SMTPConfig struct {
	Auth           string
	Host           string
	Port           int
	AllowedDomains string `xorm:"TEXT"`
	TLS            bool   `ini:"tls"`
	SkipVerify     bool
}

func (cfg *SMTPConfig) FromDB(bs []byte) error {
	return jsoniter.Unmarshal(bs, cfg)
}

func (cfg *SMTPConfig) ToDB() ([]byte, error) {
	return jsoniter.Marshal(cfg)
}

type PAMConfig struct {
	ServiceName string // PAM service (e.g. system-auth)
}

func (cfg *PAMConfig) FromDB(bs []byte) error {
	return jsoniter.Unmarshal(bs, &cfg)
}

func (cfg *PAMConfig) ToDB() ([]byte, error) {
	return jsoniter.Marshal(cfg)
}

// AuthSourceFile contains information of an authentication source file.
type AuthSourceFile struct {
	abspath string
	file    *ini.File
}

// SetGeneral sets new value to the given key in the general (default) section.
func (f *AuthSourceFile) SetGeneral(name, value string) {
	f.file.Section("").Key(name).SetValue(value)
}

// SetConfig sets new values to the "config" section.
func (f *AuthSourceFile) SetConfig(cfg core.Conversion) error {
	return f.file.Section("config").ReflectFrom(cfg)
}

// Save writes updates into file system.
func (f *AuthSourceFile) Save() error {
	return f.file.SaveTo(f.abspath)
}

// LoginSource represents an external way for authorizing users.
type LoginSource struct {
	ID        int64
	Type      LoginType
	Name      string          `xorm:"UNIQUE"`
	IsActived bool            `xorm:"NOT NULL DEFAULT false"`
	Cfg       core.Conversion `xorm:"TEXT"`

	Created     time.Time `xorm:"-" json:"-"`
	CreatedUnix int64
	Updated     time.Time `xorm:"-" json:"-"`
	UpdatedUnix int64

	LocalFile *AuthSourceFile `xorm:"-" json:"-"`
}

const (
	SMTP_PLAIN = "PLAIN"
	SMTP_LOGIN = "LOGIN"
)

var SMTPAuths = []string{SMTP_PLAIN, SMTP_LOGIN}

func SMTPAuth(a smtp.Auth, cfg *SMTPConfig) error {
	c, err := smtp.Dial(fmt.Sprintf("%s:%d", cfg.Host, cfg.Port))
	if err != nil {
		return err
	}
	defer c.Close()

	if err = c.Hello("gogs"); err != nil {
		return err
	}

	if cfg.TLS {
		if ok, _ := c.Extension("STARTTLS"); ok {
			if err = c.StartTLS(&tls.Config{
				InsecureSkipVerify: cfg.SkipVerify,
				ServerName:         cfg.Host,
			}); err != nil {
				return err
			}
		} else {
			return errors.New("SMTP server unsupports TLS")
		}
	}

	if ok, _ := c.Extension("AUTH"); ok {
		if err = c.Auth(a); err != nil {
			return err
		}
		return nil
	}
	return errors.New("Unsupported SMTP authentication method")
}

// LoginViaSMTP queries if toLogin/password is valid against the SMTP,
// and create a local user if success when enabled.
