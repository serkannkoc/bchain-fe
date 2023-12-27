import {defineStore} from 'pinia';
import {VueCookieNext} from 'vue-cookie-next';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isAuthenticated: VueCookieNext.getCookie('isAuthenticated') === 'true',
        }
    },
    actions: {
        login() {
            this.isAuthenticated = true;
            VueCookieNext.setCookie('isAuthenticated', 'true');
        },
        logout() {
            this.isAuthenticated = false;
            VueCookieNext.removeCookie('isAuthenticated');
        },
    },
});

