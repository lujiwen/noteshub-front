package models

import (
	"testing"
)

func TestRegister(t *testing.T) {
	x, _ = GetConnection()

	index, e := x.InsertOne(User{Name: "ljw"})
	if e != nil {
		t.Error("insert user failed", e)
	} else {
		t.Log("insert user succeed ! index :" , index)
	}
}


func TestCreateTable(t *testing.T) {

	if err := x.CreateTables() ; err != nil {
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
	x, _ = GetConnection()

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

func TestDropSingleTable(t *testing.T) {
	x, _ = GetConnection()
	if err := x.DropTables(User{}) ; err != nil {
		t.Error("drop table failed :", err)
	} else {
		t.Log("drop table success!")
	}

}


func TestConnectionToDatabase(t *testing.T) {
	x, _ = GetConnection()
	if err := x.Ping() ; err != nil {
		t.Error("ping database failed :", err)
	} else {
		t.Log("ping database success!")
	}

}