package models

import (
	"github.com/go-xorm/xorm"
	"testing"
)

func TestRegister(t *testing.T) {
	x, _ = xorm.NewEngine("mysql", "root:ljwGogs0@/test")

	index, e := x.InsertOne(User{Name: "ljw"})
	if e != nil {
		t.Error("insert user failed", e)
	} else {
		t.Log("insert user succeed ! index :" , index)
	}
}


func TestCreateTable(t *testing.T) {

	if err := x.CreateTables(User{}) ; err != nil {
		t.Error("insert user failed", err)
	} else {
		t.Log("create table user succeed ! ")

	}
}

func TestInitializeDB(t *testing.T) {
	if err := InitializeDB(); err != nil {
		t.Error("init database failed", err)
	} else {
		t.Log("init database succeed")

	}
}

type Person struct {
}
func TestDropAllTables(t *testing.T)  {
	x, _ = xorm.NewEngine("mysql", "root:ljwGogs0@/test")

	if err := x.DropTables(
		Access{},
		AccessToken{},
		EmailAddress{},
		Follow{},
		LoginSource{},
		Person{},
		Repository{},
		SheetFile{},
		Star{},
		Team{},
		User{},
		Watch{}); err != nil {
		t.Error("drop table failed :", err)
	} else {
		t.Log("drop table success!")
	}
}

