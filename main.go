package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	// install: go get github.com/gorilla/mux
	"github.com/gorilla/mux"
	"io/ioutil"
)

type Employee struct {
	Id string `json: "Id"` 
	FirstName string `json: "FirstName"`
	LastName string `json: "LastName"`
	DOB string `json: "DOB"`
	Salary string `json: "Salary"`
	Title string `json: "Title"`
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
	myRouter.HandleFunc("/employees", allEmployees).Methods("GET")
	myRouter.HandleFunc("/employee", createEmployee).Methods("POST")
	myRouter.HandleFunc("/employee/{id}", singleEmployee).Methods("GET")
	myRouter.HandleFunc("/employee/{id}", updateEmployee).Methods("PUT")
	myRouter.HandleFunc("/employee/{id}", deleteEmployee).Methods("DELETE")
	
	log.Fatal(http.ListenAndServe(":8080", myRouter))
}

func main(){
	Employees = []Employee{
		{"1", "John", "Doe", "1/1/1111", "50000", "Software Engineer"},
		{"2", "Jane", "Doe", "2/2/2222", "100000", "Software Engineer"},
	}
	handleRequests()
}