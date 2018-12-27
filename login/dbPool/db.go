package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var err error
var db *sql.DB

func DB() *sql.DB {

	db, err = sql.Open("mysql", "root:vrook-vr@tcp(vrook.csrupgr2u2b1.ap-south-1.rds.amazonaws.com:3306)/vrookb2b")
	if err != nil {
		fmt.Println(err)
	}

	return db

}
