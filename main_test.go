package main

import (
    "net/http"
    "net/http/httptest"
    "testing"
	"encoding/json"
	"bytes"

    "github.com/gorilla/mux"
    "github.com/stretchr/testify/assert"
)

func Router() *mux.Router {
    router := mux.NewRouter()
	router.HandleFunc("/employee", createEmployee).Methods("POST")
	router.HandleFunc("/signup", signupUser).Methods("POST")
	router.HandleFunc("/login", loginUser).Methods("POST")
    return router
}

func TestSignUpUser(t *testing.T){
	input := []User{
		{
			Id: "1",
			FirstName: "admin",
			LastName: "admin",
			Email: "admin@eldertree.biz",
			Password: "admin",
			DOB: "0/0/0000",
			Gender: "Male",
		},
		{
			Id: "2",
			FirstName: "admin",
			LastName: "",
			Email: "admin@eldertree.biz",
			Password: "admin",
			DOB: "0/0/0000",
			Gender: "Male",
		},
		{
			Id: "3",
			FirstName: "admin",
			LastName: "admin",
			Email: "admin@eldertree.biz",
			Password: "admin",
			DOB: "",
			Gender: "",
		},
	}

	expected := []struct{
		Code int
		Message string
		
	} {
		{200, "OK Response is expected"},
		{400, "Bad Error Request is expected"},
		{400, "Bad Error Request is expected"},
	}
	
	for	idx, user := range input {
		jsonUser, _ := json.Marshal(user)
    	request, _ := http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonUser))
    	response := httptest.NewRecorder()
    	Router().ServeHTTP(response, request)
    	assert.Equal(t, expected[idx].Code, response.Code, expected[idx].Message)
	}
}


func TestLoginUser (t *testing.T) {
	input := []User{
		{
			Id: "1",
			FirstName: "admin",
			LastName: "admin",
			Email: "admin@eldertree.biz",
			Password: "admin",
			DOB: "0/0/0000",
			Gender: "Male",
		}, 
		{
			Id: "1",
			FirstName: "admin",
			LastName: "admin",
			Email: "admin@eldertree.biz",
			Password: "",
			DOB: "0/0/0000",
			Gender: "Male",
		},
		{
			Id: "1",
			FirstName: "admin",
			LastName: "admin",
			Email: "abc@eldertree.biz",
			Password: "admin",
			DOB: "0/0/0000",
			Gender: "Male",
		},
	}

	expected := []struct{
		Code int
		Message string
		
	} {
		{200, "OK Response is expected"},
		{400, "Bad Error Request is expected"},
		{401, "Status Unauthorized is expected"},
	}

	for	idx, user := range input {
		jsonUser, _ := json.Marshal(user)
    	request, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(jsonUser))
    	response := httptest.NewRecorder()
    	Router().ServeHTTP(response, request)
    	assert.Equal(t, expected[idx].Code, response.Code, expected[idx].Message)
	}
}


func TestCreateEmployee (t *testing.T) {
	employee := &Employee{
		Id:	"1", 
		FirstName:	"John", 
		LastName:	"Doe", 
		DOB:		"1/1/1111", 
		Salary:		"50000", 
		Title:		"Software Engineer", 
		Gender:		"Male",
		}
		
	jsonEmployee, _ := json.Marshal(employee)
    request, _ := http.NewRequest("POST", "/employee", bytes.NewBuffer(jsonEmployee))
    response := httptest.NewRecorder()
    Router().ServeHTTP(response, request)
    assert.Equal(t, 200, response.Code, "OK response is expected")
	
}
