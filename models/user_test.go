package models

import (
	"testing"
	"time"
)

func TestRegister(t *testing.T) {
	x, _ = GetConnection()

	phone := "13548188553"
	password := "123"
	index, e := x.InsertOne(User{ Name:"用户" + phone , PhoneNumber: phone, Password: password, Created: time.Now(), Updated:time.Now()})
	if e != nil {
		t.Error("insert user failed", e)
	} else {
		t.Log("insert user succeed ! index :" , index)
	}
}


func TestCreateTable(t *testing.T) {

	if err := x.CreateTables(User{}) ; err != nil {
		t.Error("create table user failed", err)
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

func TestDropAllTables(t *testing.T)  {
	x, _ = GetConnection()

	if err := x.DropTables(
		Access{},
		AccessToken{},
		EmailAddress{},
		Follow{},
		LoginSource{},
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

func TestGetTable(t *testing.T)  {
	x.Table(User{})
}

func TestIsUserValidated(t *testing.T) {
	x, _ = GetConnection()
	if isUserValidated("13548188553", "123") {
		t.Log("135481885 pass ")
	} else {
		t.Error("13548188553 does not pass")
	}

	if isUserValidated("13548188553", "321") {
		t.Error("135481885 with password 123 should not pass ")
	}
}

func TestIsRecordExist(t *testing.T) {
	x, _ = GetConnection()
	user := &User{}
	//if exist, _ := x.Exist(&User{PhoneNumber: string(13548188553)}); exist {
	//.Where("name=?", "用户13548188553")
	if exist, _ := x.Where("name=?", "ljw").Get(user); exist {
		t.Log("13548188553 exists")
	} else {
		t.Error("13548188553 not  exists")
	}
}
