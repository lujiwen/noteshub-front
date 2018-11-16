package models

import "testing"

func TestCreateTokenTable(t *testing.T)  {
	x, _ = GetConnection()

	if err := x.CreateTables(AccessToken{}); err != nil {
		t.Error("create AccessToken table failed! " + err.Error())
	} else {
		t.Log("create AccessToken table successfully!")
	}
}


func TestAccessTokenTable(t *testing.T) {
	x, _ = GetConnection()
	if err := x.DropTables(AccessToken{}) ; err != nil {
		t.Error("drop table failed :", err)
	} else {
		t.Log("drop table success!")
	}

}

func TestGenerateAccessToken(t *testing.T) {
	x, _ = GetConnection()
	phoneNumber := "13548188553"
	user, _ := findUserByPhoneNumber(phoneNumber)

	token, e := GenerateAccessToken(user)
	if token.Sha1 != "" && e ==nil {
		t.Log("pass: token sha1: " +  token.Sha1 )
	} else {
		t.Error("failed to generate token ! err" + e.Error())
	}

}