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
	Password string `json: "Password"`
	DOB string `json: "DOB"`
	Gender string `json: "Gender"`
}

// User "database"
var Users []User


func allUsers(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: allUsers")
	json.NewEncoder(w).Encode(Users)
}


func isValidSignUp(u User) bool {
	if u.Id == "" || u.FirstName == "" || u.LastName == "" || u.Email == "" || u.Password == "" || u.DOB == "" || u.Gender == "" {
		return false
	}

	return true
}


func signupUser(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: signupUser")
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var user User
	json.Unmarshal(reqBody, &user)

	
	// check for empty fields
	if !isValidSignUp(user) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	
	//check if the email address already exist
	for _, u := range Users {
		if (u.Email == user.Email) {
			fmt.Println("Error: Email address already exist")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 8)
	user.Password = string(hashedPassword)
	Users = append(Users,user)
	json.NewEncoder(w).Encode(user)
	
		
}


func isValidLogin(u User) bool {
	if u.Email == "" || u.Password == "" {
		return false
	}
	return true
}


func userLogin(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint: userLogin")
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var user User
	json.Unmarshal(reqBody, &user)

	if !isValidLogin(user){
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var userFromStore User
	for _, u := range Users {
		if user.Email == u.Email {
			userFromStore = u
		}
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userFromStore.Password), []byte(user.Password)); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
}



//Employee code part below

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
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var employee Employee
	json.Unmarshal(reqBody, &employee)
	fmt.Println("value of employee salary is %s ", employee.Salary)
	Employees = append(Employees, employee)
	json.NewEncoder(w).Encode(employee)
}

func updateEmployee(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: updateEmployee")
	vars := mux.Vars(r)
	id := vars["id"]
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

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
	myRouter.HandleFunc("/signup", signupUser).Methods("POST")
	myRouter.HandleFunc("/login", userLogin).Methods("POST")

	//myRouter.HandleFunc("/credentials", allCredentials).Methods("GET")
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