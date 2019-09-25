package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	// install: go get github.com/gorilla/mux
	"github.com/gorilla/mux"
	"io/ioutil"
	// install: go get golang.org/x/crypto/bcrypt
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id string `json: "Id"`
	FirstName string `json: "FirstName"`
	LastName string `json: "LastName"`
	Email string `json: "Email"`
	DOB string `json: "DOB"`
	Gender string `json: "Gender"`
}

// User "database"
var Users []User

func allUsers(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: allUsers")
	json.NewEncoder(w).Encode(Users)
}

type Credential struct {
	Email string `json: "Email"`
	Password string `json: "Password"`
}

// Credential "database"
var Credentials []Credential

func allCredentials(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: allCredentials")
	json.NewEncoder(w).Encode(Credentials)
}

func createUser(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: createUser")
	reqBody, _ := ioutil.ReadAll(r.Body)
	var user User
	json.Unmarshal(reqBody, &user)
	Users = append(Users, user)
	json.NewEncoder(w).Encode(user)

	// hash password and store it into database
	var cred Credential
	json.Unmarshal(reqBody, &cred)
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(cred.Password), 8)
	cred.Password = string(hashedPassword)
	Credentials = append(Credentials, cred)
	json.NewEncoder(w).Encode(cred)
}

/**
*
*
BROKEN 
*
*
**/

func verifyPassword(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint: verifyPassword")
	reqBody, _ := ioutil.ReadAll(r.Body)
	var cred Credential
	json.Unmarshal(reqBody, &cred)

	var storeCred Credential
	for _, c := range Credentials {
		if cred.Email == c.Email {
			storeCred = c
		}
	}

	json.NewEncoder(w).Encode(cred)
	json.NewEncoder(w).Encode(storeCred)

	if err := bcrypt.CompareHashAndPassword([]byte(storeCred.Password), []byte(cred.Password)); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
	}
}

type Employee struct {
	Id string `json: "Id"` 
	FirstName string `json: "FirstName"`
	LastName string `json: "LastName"`
	DOB string `json: "DOB"`
	Salary string `json: "Salary"`
	Title string `json: "Title"`
	Gender string `json: "Gender"`
}

// Employee "database"
var Employees []Employee

func allEmployees(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: allEmployees")
	json.NewEncoder(w).Encode(Employees)
}

func singleEmployee(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: singleEmployee")
	vars := mux.Vars(r)
	id := vars["id"]
	
	for _, employee := range Employees {
		if employee.Id == id {
			json.NewEncoder(w).Encode(employee)
		}
	}
}

func createEmployee(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: createEmployee")
	reqBody, _ := ioutil.ReadAll(r.Body)
	var employee Employee
	json.Unmarshal(reqBody, &employee)
	Employees = append(Employees, employee)
	json.NewEncoder(w).Encode(employee)
}

func updateEmployee(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: updateEmployee")
	vars := mux.Vars(r)
	id := vars["id"]
	reqBody, _ := ioutil.ReadAll(r.Body)

	for idx, employee := range Employees {
		if employee.Id == id {
			json.Unmarshal(reqBody, &Employees[idx])
		}
	}
}

func deleteEmployee(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: deleteEmployee")
	vars := mux.Vars(r)
	id := vars["id"]

	for idx, employee := range Employees {
		if employee.Id == id {
			Employees = append(Employees[:idx], Employees[idx+1])
		}
	}
}

func handleRequests(){
	// creates instance of mux router
	myRouter := mux.NewRouter().StrictSlash(true)

	// router mapping
	myRouter.HandleFunc("/register", createUser).Methods("POST")
	myRouter.HandleFunc("/login", verifyPassword).Methods("POST")

	myRouter.HandleFunc("/credentials", allCredentials).Methods("GET")
	myRouter.HandleFunc("/users", allUsers).Methods("GET")

	myRouter.HandleFunc("/employees", allEmployees).Methods("GET")
	myRouter.HandleFunc("/employee", createEmployee).Methods("POST")
	myRouter.HandleFunc("/employee/{id}", singleEmployee).Methods("GET")
	myRouter.HandleFunc("/employee/{id}", updateEmployee).Methods("PUT")
	myRouter.HandleFunc("/employee/{id}", deleteEmployee).Methods("DELETE")
	
	log.Fatal(http.ListenAndServe(":8080", myRouter))
}

func main(){
	Employees = []Employee{
		{"1", "John", "Doe", "1/1/1111", "50000", "Software Engineer", "Male"},
		{"2", "Jane", "Doe", "2/2/2222", "100000", "Software Engineer", "Female"},
	}
	handleRequests()
}