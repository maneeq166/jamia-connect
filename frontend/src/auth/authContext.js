import { create } from 'zustand';
import Cookies from 'js-cookie';

export const useAuthStore = create((set) => ({
  isSignedIn: !!Cookies.get('token'), // initializes from cookie

  login: (token) => {
    Cookies.set('token', token, { expires: 7 }); // store token in cookie
    set({ isSignedIn: true });
  },

  logout: () => {
    Cookies.remove('token');
    set({ isSignedIn: false });
  },

  checkAuth: () => {
    const token = Cookies.get('token');
    set({ isSignedIn: !!token });
  }
}));

