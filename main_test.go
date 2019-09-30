package main

import (
    "net/http"
    "net/http/httptest"
    "testing"
	"encoding/json"
	"bytes"
	"fmt"
    "github.com/gorilla/mux"
    "github.com/stretchr/testify/assert"
)

func Router() *mux.Router {
    router := mux.NewRouter()
	router.HandleFunc("/employee", createEmployee).Methods("POST")
	router.HandleFunc("/signup", signupUser).Methods("POST")
	router.HandleFunc("/login", loginUser).Methods("POST")
	router.HandleFunc("/employee/{id}", updateEmployee).Methods("PUT")
	router.HandleFunc("/employee/{id}", deleteEmployee).Methods("DELETE")
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
	input := []Employee{
		{
			Id:	"1", 
			FirstName:	"Sohan", 
			LastName:	"Thapa", 
			DOB:		"1/1/1111", 
			Salary:		"50000", 
			Title:		"Software Engineer", 
			Gender:		"Male",
		},
	
		{
			Id:	"2", 
			FirstName:	"Sohan", 
			LastName:	"Thapa", 
			DOB:		"", 
			Salary:		"50000", 
			Title:		"Software Engineer", 
			Gender:		"Male",
		},
	}
	
	expected := []struct{
		Code int
		Message string
		
	} {
		{200, "OK Response is expected"},
		{400, "Bad Error Request is expected"},
	}
		
	for	idx, employee := range input {
		jsonEmployee, _ := json.Marshal(employee)
		request, err := http.NewRequest("POST", "/employee", bytes.NewBuffer(jsonEmployee))
		if err != nil {
			fmt.Println(err)
			return
		}
		response := httptest.NewRecorder()
		Router().ServeHTTP(response, request)
    	assert.Equal(t, expected[idx].Code, response.Code, expected[idx].Message)
		
		//checking for response body
		if response.Code == 200 {
			expected := string(`{"Id":"1","FirstName":"Sohan","LastName":"Thapa","DOB":"1/1/1111","Title":"Software Engineer","Salary":"50000","Gender":"Male"}`)
			assert.JSONEq(t, expected, response.Body.String(), "Response body differs")
		}
	}
}

func TestUpdateEmployee(t *testing.T) {

	employee := &Employee{
			Id:	"1", 
			FirstName:	"Sohan", 
			LastName:	"Thapa", 
			DOB:		"2/2/2222", 
			Salary:		"50000", 
			Title:		"Software Engineer", 
			Gender:		"Male",
	}
	
		jsonEmployee, _ := json.Marshal(employee)
		correctRequest, err := http.NewRequest("PUT", "/employee/1", bytes.NewBuffer(jsonEmployee))		
		if err != nil {
			fmt.Println(err)
			return
		}

		response := httptest.NewRecorder()
		Router().ServeHTTP(response, correctRequest)
    	assert.Equal(t, 200, response.Code, "OK Response is expected")
		badRequest, err := http.NewRequest("PUT", "/employee/8", bytes.NewBuffer(jsonEmployee) )
		if err != nil {
			fmt.Println(err)
			return
		}
		
		Router().ServeHTTP(response, badRequest)
		assert.Equal(t, 400, response.Code, "Bad Error Request is expected")
	
	
}


func TestDeleteEmployee (t *testing.T) {
		correctRequest, err := http.NewRequest("DELETE", "/employee/1", nil)
		if err != nil {
			fmt.Println(err)
			return
		}
		badRequest, err := http.NewRequest("DELETE", "/employee/8", nil)
		if err != nil {
			fmt.Println(err)
			return
		}
		response := httptest.NewRecorder()
		Router().ServeHTTP(response, correctRequest)
    	assert.Equal(t, 200, response.Code, "OK Response is expected")
		Router().ServeHTTP(response, badRequest)
		assert.Equal(t, 400, response.Code, "Bad Error Request is expected")
}



