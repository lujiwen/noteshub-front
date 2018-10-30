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

