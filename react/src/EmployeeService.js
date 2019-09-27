import axios from 'axios';

export default class EmployeeService {
   static Insert(data, onSuccess, onError) {
      axios
         .post(``, data, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static SelectAll(onSuccess, onError) {
      axios
         .get(`/employees`, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static SelectById(id, onSuccess, onError) {
      axios
         .get(``, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static Update(id, data, onSuccess, onError) {
      axios
         .put(``, data, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static Delete(id, onSuccess, onError) {
      axios
         .delete(``, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }
}
