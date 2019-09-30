import axios from 'axios';

export default class EmployeeService {
  static Insert(data, onSuccess, onError) {
    axios
      .post('/employee', data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static SelectAll(onSuccess, onError) {
    axios
      .get('/employees', { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
  // Get employee id

  static SelectById(id, onSuccess, onError) {
    axios
      .get(``, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static Update(id, data, onSuccess, onError) {
    axios
      .put(`/employee/${id}`, data, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }

  static Delete(id, onSuccess, onError) {
    axios
      .delete(`/employee/${id}`, { withCredentials: true })
      .then(onSuccess)
      .catch(onError);
  }
}
