package models

import (
	"testing"
	"time"
)

func TestCreateSheetFileTable(t *testing.T)  {
	x, _ = GetConnection()

	if err := x.CreateTables(MusicSheet{}); err != nil {
		t.Error("create sheet file table failed! " + err.Error())
	} else {
		t.Log("create sheet file table successfully!")
	}
}

func TestRecreateTableSheetFile(t *testing.T) {
	x, _ = GetConnection()

	x.DropTables(MusicSheet{})
}

func TestSaveToDatabse(t *testing.T) {
	x, _ = GetConnection()

	destinationDir := "/Users/lujiwen/noteshub/upload_files"

	sheetFile := MusicSheet{SheetType: Stave, Location: destinationDir + "/" + "yarn-error.log", Filename: "yarn-error.log", CreateTime: time.Now(), UserId: 1 }

	if  _, err := x.InsertOne(sheetFile); err != nil{
		t.Error(err.Error())
	} else {
		t.Log("save file to db successfully")
	}
}

func TestGetSheetByUserId(t *testing.T) {
	x, _ = GetConnection()

	if sheets, e := GetSheetByUserId(1); e==nil {
		t.Log("get sheets successfully", sheets)
	} else {
		t.Error(e.Error())
	}

}

func TestGetSheetById(t *testing.T) {
	x, _ = GetConnection()

	if sheets, e := GetSheetById(1); e==nil {
		t.Log("get sheets successfully", sheets)
	} else {
		t.Error(e.Error())
	}
}

func TestMusicSheet_SaveSheet(t *testing.T) {
	x, _ = GetConnection()

	sheetFile := MusicSheet{SheetType: Stave, Location: "path/to/sheetfile.xml", Filename: "testSheetFile", CreateTime: time.Now(), UserId: 6456546545}
	if err := sheetFile.SaveSheet(x); err != nil {
		t.Log("save sheets failed")
	} else {
		t.Log("save sheets succeed!")
	}

}