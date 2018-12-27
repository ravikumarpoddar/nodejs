package main

import (
	"crypto/rsa"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

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

func createTokenString(id int, password string) string {
	now := time.Now()
	iat := now.Unix()
	s := strconv.FormatInt(iat, 10)
	jti := s + "vrookb2btransforminglearning"

	token := jwt.NewWithClaims(jwt.GetSigningMethod("RS512"), jwt.MapClaims{
		"id":       id,
		"password": password,
		"iat":      iat,
		"jti":      jti,
	})

	tokenstring, err := token.SignedString(signKey)
	if err != nil {
		log.Fatalln(err)
	}
	return tokenstring
}

func routerLogin() *gin.Engine {

	gin.SetMode(gin.DebugMode)

	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.Default())

	r.POST("/adminlogin", Login)
	return r

}

func Login(c *gin.Context) {
	db := D.DB()

	var (
		count = 0
		b     M.Logger
	)
	c.BindJSON(&b)
	stmt, err := db.Prepare("select id from master_admin where email=? and password=password(?)")
	if err != nil {
		fmt.Println(err)
	}

	rows, err := stmt.Query(b.Email, b.Password)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(rows)
	for rows.Next() {
		err := rows.Scan(&b.ID)

		if err != nil {

			log.Fatal(err)

		}

		count = 1
	}

	if count == 1 {
		token := createTokenString(b.ID, b.Password)
		isTrue := Validation(token)
		if isTrue {
			c.JSON(http.StatusOK, gin.H{
				"Token": token,
			})
		} else {
			c.JSON(http.StatusForbidden, gin.H{
				"Token": "Auth Failed",
			})
		}

	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"Token": "Auth Failed",
		})
	}

}

func Validation(t string) bool {

	var user UserClaims

	// reqToken := c.Request.Header.Get("Authorization")
	// splitToken := strings.Split(reqToken, "Bearer")
	// reqToken = strings.TrimSpace(splitToken[1])

	token, err := jwt.Parse(t, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})
	if err != nil {
		fmt.Println(err)
	}

	token, err = jwt.ParseWithClaims(t, &user, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})

	if err != nil {
		fmt.Println(err)
	}

	return token.Valid

}

func main() {
	port := ":" + os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Fatal(gateway.ListenAndServe(port, routerLogin()))
}
