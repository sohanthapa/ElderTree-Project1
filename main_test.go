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
    return router
}

func TestCreateEmployee (t *testing.T) {
	employee := Employee{
		Id:	"1", 
		FirstName:	"John", 
		LastName:	"Doe", 
		DOB:		"1/1/1111", 
		Salary:		"50000", 
		Title:		"Software Engineer", 
		Gender:		"Male",
		}
		
	jsonPerson, _ := json.Marshal(employee)
    request, _ := http.NewRequest("POST", "/employee", bytes.NewBuffer(jsonPerson))
    response := httptest.NewRecorder()
    Router().ServeHTTP(response, request)
    assert.Equal(t, 200, response.Code, "OK response is expected")
	
}
