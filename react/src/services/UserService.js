import axios from 'axios';

export default class UserService {
   static SignUp(data, onSuccess, onError) {
      axios
         .post('/signup', data, { withCredentials: true })
         .then(onSuccess)
         .catch(onError);
   }
}
