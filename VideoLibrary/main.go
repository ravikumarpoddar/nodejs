package main

import (
	"crypto/rsa"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	D "./dbPool"
	M "./model"
	"github.com/apex/gateway"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

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

var err error

const (
	pubKeyPath = "key/app.rsa.pub" // openssl rsa -in app.rsa -pubout > app.rsa.pub
)

var (
	verifyKey *rsa.PublicKey
)

func init() {

	verifyBytes, err := ioutil.ReadFile(pubKeyPath)
	if err != nil {
		fmt.Println(err)
	}

	verifyKey, err = jwt.ParseRSAPublicKeyFromPEM(verifyBytes)
	if err != nil {
		fmt.Println(err)
	}

}

func routerLibrary() *gin.Engine {
	gin.SetMode(gin.DebugMode)

	r := gin.New()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.Default())
	r.POST("/createsub", CreateSubject)
	r.POST("/createcat", CreateCategory)
	r.POST("/addvideomod", AddVideoModule)
	//	r.POST("/addvideocat", AddVideoInCat)

	return r

}

func CreateSubject(c *gin.Context) {
	db := D.DB()

	var (
		count = 0
		b     M.SubjectRepo
		bs    []M.SubjectRepo
	)
	c.BindJSON(&b)
	ID := Validation(c)

	stmt2, err := db.Prepare("insert into subject_repo (subject, about, thumbnail, created_date, createdBy) value(?,?,?,?,?)")
	if err != nil {
		fmt.Println(err)
	}

	res, err := stmt2.Exec(b.SubjectName, b.Desc, b.Thumbnail, time.Now(), ID)

	lid, err := res.LastInsertId()
	b.ID = int(lid)
	if err != nil {
		log.Fatal(err)
	} else {
		bs = append(bs, b)
		count = 1
	}
	defer db.Close()

	if count == 1 {
		c.JSON(http.StatusOK, gin.H{
			"Subject": bs,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"Subject": "Not Added",
		})
	}
}

func CreateCategory(c *gin.Context) {

	db := D.DB()

	var (
		count = 0
		b     M.ModuleRepo
		bs    []M.ModuleRepo
	)
	c.BindJSON(&b)
	ID := Validation(c)
	stmt2, err := db.Prepare("insert into Module(name, thumbnail,about,sub_id,Duration, created_date, createdBy) value(?,?,?,?,?,?,?)")
	if err != nil {
		fmt.Println(err)
	}

	res, err := stmt2.Exec(b.ModName, b.Thumbnail, b.About, b.SubID, b.Duration, time.Now(), ID)

	lid, err := res.LastInsertId()
	b.ID = int(lid)
	if err != nil {
		log.Fatal(err)
	} else {
		bs = append(bs, b)
		count = 1
	}
	defer db.Close()

	if count == 1 {
		c.JSON(http.StatusOK, gin.H{
			"Subject": bs,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"Subject": "Not Added",
		})
	}

}

func AddVideoModule(c *gin.Context) {

	db := D.DB()

	var (
		count = 0
		b     M.AddVideoModRepo
		bs    []M.AddVideoModRepo
	)

	c.BindJSON(&b)
	ID := Validation(c)
	stmt2, err := db.Prepare("insert into video_mode_repo(mod_id, name,url,thumbnail,about,duration, added_date, addedBy) value(?,?,?,?,?,?,?,?)")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(b)
	res, err := stmt2.Exec(b.ModID, b.Name, b.URL, b.Thumbnail, b.About, b.Duration, time.Now(), ID)
	lid, err := res.LastInsertId()
	b.ID = int(lid)
	if err != nil {
		log.Fatal(err)
	} else {
		bs = append(bs, b)
		count = 1
	}
	defer db.Close()

	if count == 1 {
		c.JSON(http.StatusOK, gin.H{
			"Subject": bs,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"Subject": "Not Added",
		})
	}

}

func AddVideoInCat(c *gin.Context) {

	db := D.DB()

	var (
		count = 0
		b     M.AddVideoModRepo
		bs    []M.AddVideoModRepo
	)

	c.BindJSON(&b)
	ID := Validation(c)
	stmt2, err := db.Prepare("insert into video_repo(mod_id, name,thumbnail,about,duration, added_date, addedBy) value(?,?,?,?,?,?,?)")
	if err != nil {
		fmt.Println(err)
	}

	res, err := stmt2.Exec(b.ModID, b.Name, b.Thumbnail, b.About, b.Duration, time.Now(), ID)

	lid, err := res.LastInsertId()
	b.ID = int(lid)
	if err != nil {
		log.Fatal(err)
	} else {
		bs = append(bs, b)
		count = 1
	}
	defer db.Close()

	if count == 1 {
		c.JSON(http.StatusOK, gin.H{
			"Subject": bs,
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"Subject": "Not Added",
		})
	}

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

	log.Fatal(gateway.ListenAndServe(port, routerLibrary()))
}
