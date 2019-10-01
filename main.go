package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil" 
	"golang.org/x/crypto/bcrypt"
)


type User struct {
	Id string
	FirstName string
	LastName string
	Email string
	Password string
	DOB string
	Gender string
}

// User "database"
var Users []User


func allUsers(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: allUsers")
	json.NewEncoder(w).Encode(Users)
}


func isValidSignUpEntry(u User) bool {
	if u.Id == "" || u.FirstName == "" || u.LastName == "" || u.Email == "" || u.Password == "" || u.DOB == "" || u.Gender == "" {
		return false
	}

	return true
}


func emailExist(e string) bool {
	for _, u := range Users {
		if (u.Email == e) {
			return true
		}
	}

	return false
}

var lastUserId int = 1

func signupUser(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: signupUser")
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var user User
	json.Unmarshal(reqBody, &user)
	user.Id = string(lastUserId + 1)
	lastUserId += 1

	
	// check for empty fields
	if !isValidSignUpEntry(user) {
		fmt.Println("One or more field(s) is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	
	//check if the email address already exist
	if emailExist(user.Email) {
		fmt.Println("Email already exists")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 8)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	user.Password = string(hashedPassword)
	Users = append(Users,user)
	json.NewEncoder(w).Encode(user)
	
		
}


func isValidLoginEntry(u User) bool {
	if u.Email == "" || u.Password == "" {
		return false
	}
	return true
}


func loginUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint: loginUser")
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var user User
	json.Unmarshal(reqBody, &user)

	if !isValidLoginEntry(user){
		fmt.Println("Email or password field is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !emailExist(user.Email) {
		fmt.Println("User account does not exist")
		w.WriteHeader(http.StatusUnauthorized)
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

	json.NewEncoder(w).Encode(userFromStore)
}


//Employee code part below

var lastEmployeeId int = 3

type Employee struct {
	Id string
	FirstName string
	LastName string
	DOB string
	Title string
	Salary string
	Gender string
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


func isValidCreateEntry(e Employee) bool {
	if e.Id == "" || e.FirstName == "" || e.LastName == "" || e.DOB == "" || e.Title == "" || e.Salary == "" || e.Gender == "" {
		return false
	}
	return true
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
	employee.Id = string(lastEmployeeId + 1)
	lastEmployeeId += 1

	// check for empty fields
	if !isValidCreateEntry(employee) {
		fmt.Println("One or more field(s) is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	Employees = append(Employees, employee)
	json.NewEncoder(w).Encode(employee)
}


func employeeExist(id string) bool {
	for _, employee := range Employees {
		if id == employee.Id {
			return true
		}
	}

	return false
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

	if !employeeExist(id) {
		fmt.Println("Cannot update, Employee does not exist")
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

	if !employeeExist(id) {
		fmt.Println("ERROR: Cannot delete, Employee does not exist")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	
	for idx, employee := range Employees {
		if employee.Id == id {
			Employees = append(Employees[:idx], Employees[idx+1:]...)
			break
		}
	}
}

func handleRequests(){
	// creates instance of mux router
	myRouter := mux.NewRouter().StrictSlash(true)

	// router mapping
	myRouter.HandleFunc("/signup", signupUser).Methods("POST")
	myRouter.HandleFunc("/login", loginUser).Methods("POST")

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
		{"3", "Test", "User", "2/2/2222", "100000", "Software Engineer", "Male"},
	}
	
	Users = []User{
		{"1", "admin", "admin", "admin@eldertree.biz", "admin", "0/0/0000", "Male"},
	}
	handleRequests()
}