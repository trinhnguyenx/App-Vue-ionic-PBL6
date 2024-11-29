import { defineStore } from 'pinia';
import { IUser } from '@/type/auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: 0,
      username: '',
      fullname: '',
      email: '',
      password: '',
      role: '',
      avatar: '',
      age: 0,
      accessToken: '',
      isActive: false,
    } as any,
  }),

  actions: {
    setUserID(user: IUser) {
      this.user.id = user.id;
    },

    setFullName(user: IUser) {
      this.user.fullname = user.fullname;
    },

    setaccessToken(user: IUser) {
      this.user.accessToken = user.accessToken;
    }
  },

  getters: {
    getUserID():any {
      return this.user.id;
    },
    getFullName():any {
      return this.user.fullname;
    },
    getaccessToken():any {
      return this.user.accessToken;
    }
  },

});