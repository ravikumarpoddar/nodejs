package main

import (
	"crypto/rsa"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	D "./dbPool"
	M "./model"
	"github.com/apex/gateway"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var err error

type LoginClaims struct {
	ID       int    `json:"id"`
	Password string `json:"password"`

	jwt.StandardClaims
}

type UserClaims struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`

	jwt.StandardClaims
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

const (
	privKeyPath = "key/app.rsa"     // openssl genrsa -out app.rsa keysize
	pubKeyPath  = "key/app.rsa.pub" // openssl rsa -in app.rsa -pubout > app.rsa.pub
)

var (
	verifyKey *rsa.PublicKey
	signKey   *rsa.PrivateKey
)

func init() {
	signBytes, err := ioutil.ReadFile(privKeyPath)
	if err != nil {
		fmt.Println(err)
	}

	signKey, err = jwt.ParseRSAPrivateKeyFromPEM(signBytes)
	if err != nil {
		fmt.Println(err)
	}

	verifyBytes, err := ioutil.ReadFile(pubKeyPath)
	if err != nil {
		fmt.Println(err)
	}

	verifyKey, err = jwt.ParseRSAPublicKeyFromPEM(verifyBytes)
	if err != nil {
		fmt.Println(err)
	}

}

func routerGetLib() *gin.Engine {
	gin.SetMode(gin.DebugMode)
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.Default())

	r.GET("/getsubject", GetSubject)
	r.POST("/getmodule", GetModule)
	r.POST("/getmodulevideo", GetVideoCat)

	return r
}

func GetSubject(c *gin.Context) {

	db := D.DB()

	var (
		count = 0
		b     M.GetSubj
		bs    []M.GetSubj
	)

	stmt, err := db.Prepare("select id, subject, thumbnail, about, createdBy, created_date, isPublished from subject_repo")
	if err != nil {
		fmt.Println(err)
	}

	rows, err := stmt.Query()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(rows)
	for rows.Next() {
		err := rows.Scan(&b.ID, &b.Name, &b.Thumbnail, &b.About, &b.CreatedBy, &b.CreatedDate, &b.IsPub)
		name := GetName(b.CreatedBy)
		b.CreatorName = name
		date := strings.SplitAfter(b.CreatedDate, " ")
		b.CreatedDate = date[0]
		bs = append(bs, b)

		if err != nil {

			log.Fatal(err)

		}

		count = 1
	}
	defer db.Close()
	if count == 1 {
		c.JSON(http.StatusOK, gin.H{
			"subject": bs,
		})

	} else {
		c.JSON(http.StatusNotFound, gin.H{
			"subject": "Not Found",
		})
	}

}

func GetModule(c *gin.Context) {

	db := D.DB()

	var (
		count = 0
		b     M.GetMod
		bs    []M.GetMod
	)

	c.BindJSON(&b)

	stmt, err := db.Prepare("select id, name, thumbnail, about, createdBy, created_date, isPublished, Duration from Module where sub_id=?")
	if err != nil {
		fmt.Println(err)
	}

	rows, err := stmt.Query(b.SubID)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(rows)
	for rows.Next() {
		err := rows.Scan(&b.ID, &b.Name, &b.Thumbnail, &b.About, &b.CreatedBy, &b.CreatedDate, &b.IsPub, &b.Duration)
		name := GetName(b.CreatedBy)
		b.CreatorName = name
		bs = append(bs, b)

		if err != nil {

			log.Fatal(err)

		}

		count = 1
	}
	defer db.Close()
	if count == 1 {
		c.JSON(http.StatusOK, gin.H{
			"module": bs,
		})

	} else {
		c.JSON(http.StatusNotFound, gin.H{
			"module": "Not Found",
		})
	}

}

func GetVideoCat(c *gin.Context) {
	db := D.DB()

	var (
		count = 0
		b     M.GetVideoMod
		bs    []M.GetVideoMod
	)

	c.BindJSON(&b)
	stmt, err := db.Prepare("select id, name, thumbnail, about, addedBy, added_date, Duration from video_mode_repo where mod_id=?")
	if err != nil {
		fmt.Println(err)
	}

	rows, err := stmt.Query(b.ModID)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(rows)
	for rows.Next() {
		err := rows.Scan(&b.ID, &b.Name, &b.Thumbnail, &b.About, &b.CreatedBy, &b.CreatedDate, &b.Duration)
		name := GetName(b.CreatedBy)
		b.CreatorName = name
		bs = append(bs, b)

		if err != nil {

			log.Fatal(err)

		}

		count = 1
	}
	defer db.Close()
	if count == 1 {
		c.JSON(http.StatusOK, gin.H{
			"module": bs,
		})

	} else {
		c.JSON(http.StatusNotFound, gin.H{
			"module": "Not Found",
		})
	}

}

func GetName(id string) string {
	db := D.DB()

	var (
		count = 0
		email string
	)
	i, err := strconv.Atoi(id)
	if err != nil {
		fmt.Println(err)
	}

	stmt, err := db.Prepare("select email from master_admin where id = ?")
	if err != nil {
		fmt.Println(err)
	}

	rows, err := stmt.Query(i)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(rows)
	for rows.Next() {
		err := rows.Scan(&email)

		if err != nil {

			log.Fatal(err)

		}

		count = 1
	}
	defer db.Close()
	if count == 1 {
		return email
	}
	return "None"
}

func CheckTrail(id int) bool {
	db := D.DB()

	var (
		cid   int
		count = 0
		isP   bool
	)
	stmt, err := db.Prepare("select colg_ID from User_profile where id = ?")
	if err != nil {
		fmt.Println(err)
	}

	rows, err := stmt.Query(id)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(rows)
	for rows.Next() {
		err := rows.Scan(&cid)

		if err != nil {

			log.Fatal(err)

		}

		count = 1
	}
	defer db.Close()

	if count == 1 {

		stmt, err := db.Prepare("select isPremieum from College_profile where id = ?")
		if err != nil {
			fmt.Println(err)
		}

		rows, err := stmt.Query(cid)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(rows)
		for rows.Next() {
			err := rows.Scan(&isP)

			if err != nil {

				log.Fatal(err)

			}

		}
		defer db.Close()

	}

	if isP {
		return true
	}

	return false

}

func Validation(c *gin.Context) int {

	var user UserClaims

	reqToken := c.Request.Header.Get("Authorization")
	splitToken := strings.Split(reqToken, "Bearer")
	reqToken = strings.TrimSpace(splitToken[1])

	token, err := jwt.Parse(reqToken, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})
	if err != nil {
		fmt.Println(err)
	}

	token, err = jwt.ParseWithClaims(reqToken, &user, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})

	if err != nil {
		fmt.Println(err)
	}

	if token.Valid == true {

		return user.ID

	}

	return 0

}

func main() {
	port := ":" + os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Fatal(gateway.ListenAndServe(port, routerGetLib()))
}
