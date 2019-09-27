import axios from 'axios';

export default class EmployeeService {
   static Insert(data, onSuccess, onError) {
      axios
         .post(`/event/insert`, data, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static SelectAll(onSuccess, onError) {
      axios
         .get(`/employees`, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static SelectAllExpanded(onSuccess, onError) {
      axios
         .get(`/employees`, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static SelectAllListData(onSuccess, onError) {
      axios
         .get(`/api/event/selectall/expanded/lists`, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static SelectById(id, onSuccess, onError) {
      axios
         .get(`/api/event/${id}`, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static SelectByAccountId(accountId, onSuccess, onError) {
      axios
         .get(`/api/event/selectall/${accountId}/`, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static Update(id, data, onSuccess, onError) {
      axios
         .put(`/api/event/${id}`, data, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static Delete(id, onSuccess, onError) {
      axios
         .delete(`/api/event/${id}`, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }
}
