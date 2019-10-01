package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil" 
	"golang.org/x/crypto/bcrypt"
	"errors"
	"strconv"
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


type Users []User

// usersDB represents the users database that contains all users that are able to login.
var usersDB Users

var lastUserId int

func (users Users) getUser(e string) (User, error) {
	for _, user := range users {
		if user.Email == e {
			return user, nil
		}
	}

	var u User
	return u, errors.New("Email does not exist")
}

func allUsers(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: allUsers")
	if err:= json.NewEncoder(w).Encode(usersDB); err != nil {
		fmt.Println("Error encoding usersDB")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

func (u User) isValidSignUpEntry() bool {
	if u.FirstName == "" || u.LastName == "" || u.Email == "" || u.Password == "" || u.DOB == "" || u.Gender == "" {
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
	user.Id = strconv.Itoa(lastUserId + 1)
	lastUserId += 1

	
	// isValidSignUpEntry validates the fields of user to make sure there is no empty field(s).
	if !user.isValidSignUpEntry() {
		fmt.Println("One or more field(s) is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	
	// If the email already exist within our database, return an error.
	if _, err := usersDB.getUser(user.Email); err == nil {
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
	usersDB = append(usersDB,user)
	json.NewEncoder(w).Encode(user)
	
		
}

func (u User) isValidLoginEntry() bool {
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

	if !user.isValidLoginEntry() {
		fmt.Println("Email or password field is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	userFromStore, err := usersDB.getUser(user.Email)
	if err != nil {
		fmt.Println("User account does not exist")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userFromStore.Password), []byte(user.Password)); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	json.NewEncoder(w).Encode(userFromStore)
}


type Employee struct {
	Id string
	FirstName string
	LastName string
	DOB string
	Title string
	Salary string
	Gender string
}

type Employees []Employee

// employeeDB represents the employee database that contains all employee.
var employeeDB Employees

var lastEmployeeId int

func (employees Employees) getEmployee(id string) (Employee, error) {
		for _, employee := range employees {
		if employee.Id == id {
			return employee, nil
		}
	}

	var e Employee
	return e, errors.New("Employee does not exist")
}


func allEmployees(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: allEmployees")
	if err:= json.NewEncoder(w).Encode(employeeDB); err != nil {
		fmt.Println("Error encoding employeeDB")
	}
}


func singleEmployee(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: singleEmployee")
	vars := mux.Vars(r)
	id := vars["id"]
	
    employeeFromStore, err := employeeDB.getEmployee(id)
	if err != nil {
		fmt.Println("Employee does not exist")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	
	json.NewEncoder(w).Encode(employeeFromStore)
}


func (e Employee) isValidCreateEntry() bool {
	if e.FirstName == "" || e.LastName == "" || e.DOB == "" || e.Title == "" || e.Salary == "" || e.Gender == "" {
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
	employee.Id = strconv.Itoa(lastEmployeeId + 1)
	lastEmployeeId += 1

	// check for empty fields
	if !employee.isValidCreateEntry() {
		fmt.Println("One or more field(s) is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	employeeDB = append(employeeDB, employee)
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

  _, error := employeeDB.getEmployee(id)
	
	if error != nil {
		fmt.Println("Employee does not exist")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	for idx, employee := range employeeDB {
		if employee.Id == id {
			json.Unmarshal(reqBody, &employeeDB[idx])
		}
	}
}

func deleteEmployee(w http.ResponseWriter, r *http.Request){
	fmt.Println("Endpoint: deleteEmployee")
	vars := mux.Vars(r)
	id := vars["id"]

    _, err := employeeDB.getEmployee(id)
	
	if err != nil {
		fmt.Println("Employee does not exist")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	
	for idx, employee := range employeeDB {
		if employee.Id == id {
			employeeDB = append(employeeDB[:idx], employeeDB[idx+1:]...)
			break
		}
	}
}

func handleRequests(){
	myRouter := mux.NewRouter().StrictSlash(true)

	// myRouter handles where the requests will be routed.
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
	lastUserId = 0
	
	
	employeeDB = Employees{
		{"1", "John", "Doe", "1/1/1111", "50000", "Software Engineer", "Male"},
		{"2", "Jane", "Doe", "2/2/2222", "100000", "Software Engineer", "Female"},
		{"3", "Test", "User", "2/2/2222", "100000", "Software Engineer", "Male"},
	}
	
	lastEmployeeId = 3
	
	handleRequests()
}