// authStore.ts
import {create} from 'zustand';
import ky from 'ky';
import {Login, LoginRequestError, LoginRequestSuccess, Signup} from '../types.shared.ts';
import {ROUTES} from '../routes.constants.ts';

type AuthState = {
   isLoggedIn: boolean
}

type AuthActions = {
   login: (userLogin: Login) => Promise<{response: string, error: boolean}>
   logout: () => void
   getToken: () => string | null

   signup: (userSignup: Signup) => Promise<{response: string, error: boolean}>
}

const useAuthStore = create<AuthState & AuthActions>(set => ({
   isLoggedIn: false,
   login: async (userLogin: Login) => {
      // console.log('from store auth', userLogin);
      try {
         const response = await ky.post(ROUTES.api.login, {json: userLogin});
         // console.log(response);

         if (!response.ok) {
            throw new Error(response.statusText);
         }
         const json: LoginRequestSuccess | LoginRequestError = await response.json();
         // console.log(response);
         if (!json.token) {
            throw new Error(response.statusText);
         } else {
            set({isLoggedIn: true});
            localStorage.setItem('token', json.token!);
            // history.pushState('', '', ROUTES.index);
            return {response: json.message, error: false};
         }
      } catch (error: Error) {
         return {response: 'Error : ' + String(error.message), error: true};

      }

   },
   logout: () => set({isLoggedIn: false}),
   getToken: () => {
      return localStorage.getItem('token');
   },
   signup: async (userSignup: Signup) => {
      try {
         const response = await ky.post(ROUTES.api.login, {json: userSignup});
         // console.log(response);

         if (!response.ok) {
            throw new Error(response.statusText);
         }
         const json: LoginRequestSuccess | LoginRequestError = await response.json();
         // console.log(response);
         if (!json.token) {
            throw new Error(response.statusText);
         } else {
            set({isLoggedIn: true});
            localStorage.setItem('token', json.token!);
            // history.pushState('', '', ROUTES.index);
            return {response: json.message, error: false};
         }
      } catch (error: Error) {
         return {response: 'Error : ' + String(error.message), error: true};

      }
   },
}));

export default useAuthStore;
