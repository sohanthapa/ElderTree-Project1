import axios from 'axios';

export default class UserService {

   static LogIn(data, onSuccess, onError) {
      axios
         .post('/login', data, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }

   static SignUp(data, onSuccess, onError) {
      axios
         .post('/signup', data, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }
}
