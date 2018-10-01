// Copyright 2014 The Gogs Authors. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

package models

import (
	"database/sql"
	"fmt"
	_ "github.com/denisenkom/go-mssqldb"
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/core"
	"github.com/go-xorm/xorm"
	"github.com/json-iterator/go"
	_ "github.com/lib/pq"
	log "gopkg.in/clog.v1"
	"os"
	"path"
	"strings"
	//log "gopkg.in/clog.v1"

	//"github.com/gogs/gogs/models/migrations"
	"github.com/gogs/gogs/pkg/setting"
)

// Engine represents a XORM engine or session.
type Engine interface {
	Delete(interface{}) (int64, error)
	Exec(string, ...interface{}) (sql.Result, error)
	Find(interface{}, ...interface{}) error
	Get(interface{}) (bool, error)
	Id(interface{}) *xorm.Session
	In(string, ...interface{}) *xorm.Session
	Insert(...interface{}) (int64, error)
	InsertOne(interface{}) (int64, error)
	Iterate(interface{}, xorm.IterFunc) error
	Sql(string, ...interface{}) *xorm.Session
	Table(interface{}) *xorm.Session
	Where(interface{}, ...interface{}) *xorm.Session
}

var (
	x         *xorm.Engine
	tables    []interface{}
	HasEngine bool

	DbCfg struct {
		Type, Host, Name, User, Passwd, Path, SSLMode string
	}

	EnableSQLite3 bool
)

func init() {
	x, _ = GetConnection()
	tables = append(tables,
		new(User),
	)

	gonicNames := []string{"SSL"}
	for _, name := range gonicNames {
		core.LintGonicMapper[name] = true
	}
}

func GetConnection() (*xorm.Engine, error) {
	return xorm.NewEngine("mysql", "root:ljwGogs0@/test")
}


func LoadConfigs() {
	sec := setting.Cfg.Section("database")

	setting.UseMySQL = true
	DbCfg.Host = sec.Key("HOST").String()
	DbCfg.Name = sec.Key("NAME").String()
	DbCfg.User = sec.Key("USER").String()
	if len(DbCfg.Passwd) == 0 {
		DbCfg.Passwd = sec.Key("PASSWD").String()
	}
	DbCfg.SSLMode = sec.Key("SSL_MODE").String()
	DbCfg.Path = sec.Key("PATH").MustString("data/gogs.db")
}



func getEngine() (*xorm.Engine, error) {
	//connStr := ""
	//var Param string = "?"
	//if strings.Contains(DbCfg.Name, Param) {
	//	Param = "&"
	//}
	//if DbCfg.Host[0] == '/' { // looks like a unix socket
	//	connStr = fmt.Sprintf("%s:%s@unix(%s)/%s%scharset=utf8mb4&parseTime=true",
	//		DbCfg.User, DbCfg.Passwd, DbCfg.Host, DbCfg.Name, Param)
	//} else {
	//	connStr = fmt.Sprintf("%s:%s@tcp(%s)/%s%scharset=utf8mb4&parseTime=true",
	//		DbCfg.User, DbCfg.Passwd, DbCfg.Host, DbCfg.Name, Param)
	//}

	//var engineParams = map[string]string{"rowFormat": "DYNAMIC"}
	//return xorm.NewEngineWithParams(DbCfg.Type, connStr, engineParams)
	return xorm.NewEngine("mysql", "root:ljwGogs0@/test")
}

func SetEngine() (err error) {
	x, err = getEngine()
	if err != nil {
		return fmt.Errorf("Fail to connect to database: %v", err)
	}

	x.SetMapper(core.GonicMapper{})

	// WARNING: for serv command, MUST remove the output to os.stdout,
	// so use log file to instead print to stdout.
	//sec := setting.Cfg.Section("log.xorm")
	//logger, err := log.NewFileWriter(path.Join(setting.LogRootPath, "xorm.log"),
	//	log.FileRotationConfig{
	//		Rotate:  sec.Key("ROTATE").MustBool(true),
	//		Daily:   sec.Key("ROTATE_DAILY").MustBool(true),
	//		MaxSize: sec.Key("MAX_SIZE").MustInt64(100) * 1024 * 1024,
	//		MaxDays: sec.Key("MAX_DAYS").MustInt64(3),
	//	})
	//if err != nil {
	//	return fmt.Errorf("Fail to create 'xorm.log': %v", err)
	//}
	//
	//if setting.ProdMode {
	//	x.SetLogger(xorm.NewSimpleLogger3(logger, xorm.DEFAULT_LOG_PREFIX, xorm.DEFAULT_LOG_FLAG, core.LOG_WARNING))
	//} else {
	//	x.SetLogger(xorm.NewSimpleLogger(logger))
	//}
	x.ShowSQL(true)
	return nil
}

func NewEngine() (err error) {
	if err = SetEngine(); err != nil {
		return err
	}

	if err = x.StoreEngine("InnoDB").Sync2(tables...); err != nil {
		return fmt.Errorf("sync database struct error: %v\n", err)
	}

	return nil
}

type Statistic struct {
	Counter struct {
		User, Org, PublicKey,
		Repo, Watch, Star, Action, Access,
		Issue, Comment, Oauth, Follow,
		Mirror, Release, LoginSource, Webhook,
		Milestone, Label, HookTask,
		Team, UpdateTask, Attachment int64
	}
}

//func GetStatistic() (stats Statistic) {
//	stats.Counter.User = CountUsers()
//	stats.Counter.Org = CountOrganizations()
//	stats.Counter.PublicKey, _ = x.Count(new(PublicKey))
//	stats.Counter.Repo = CountRepositories(true)
//	stats.Counter.Watch, _ = x.Count(new(Watch))
//	stats.Counter.Star, _ = x.Count(new(Star))
//	stats.Counter.Action, _ = x.Count(new(Action))
//	stats.Counter.Access, _ = x.Count(new(Access))
//	stats.Counter.Issue, _ = x.Count(new(Issue))
//	stats.Counter.Comment, _ = x.Count(new(Comment))
//	stats.Counter.Oauth = 0
//	stats.Counter.Follow, _ = x.Count(new(Follow))
//	stats.Counter.Mirror, _ = x.Count(new(Mirror))
//	stats.Counter.Release, _ = x.Count(new(Release))
//	stats.Counter.LoginSource = CountLoginSources()
//	stats.Counter.Webhook, _ = x.Count(new(Webhook))
//	stats.Counter.Milestone, _ = x.Count(new(Milestone))
//	stats.Counter.Label, _ = x.Count(new(Label))
//	stats.Counter.HookTask, _ = x.Count(new(HookTask))
//	stats.Counter.Team, _ = x.Count(new(Team))
//	stats.Counter.Attachment, _ = x.Count(new(Attachment))
//	return
//}

func Ping() error {
	return x.Ping()
}

// The version table. Should have only one row with id==1
type Version struct {
	ID      int64
	Version int64
}

// DumpDatabase dumps all data from database to file system in JSON format.
func DumpDatabase(dirPath string) (err error) {
	os.MkdirAll(dirPath, os.ModePerm)
	// Purposely create a local variable to not modify global variable
	tables := append(tables, new(Version))
	for _, table := range tables {
		tableName := strings.TrimPrefix(fmt.Sprintf("%T", table), "*models.")
		tableFile := path.Join(dirPath, tableName+".json")
		f, err := os.Create(tableFile)
		if err != nil {
			return fmt.Errorf("fail to create JSON file: %v", err)
		}

		if err = x.Asc("id").Iterate(table, func(idx int, bean interface{}) (err error) {
			return jsoniter.NewEncoder(f).Encode(bean)
		}); err != nil {
			f.Close()
			return fmt.Errorf("fail to dump table '%s': %v", tableName, err)
		}
		f.Close()
	}
	return nil
}

func InitializeDB() (err error){
	if err := NewEngine(); err != nil {
		log.Fatal(2, "Fail to initialize ORM engine: %v", err)

	}
	return err
}
