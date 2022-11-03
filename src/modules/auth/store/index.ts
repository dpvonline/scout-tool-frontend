import {defineStore} from 'pinia'
import {keycloak} from "@/modules/auth/keycloak";
import {KeycloakProfile} from "keycloak-js";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        _accessToken: <string | undefined>'',
        _refreshToken: <string | undefined>'',
        _user: <{} | undefined>{},
        _isAuth: <boolean | undefined>false,
        _isAdmin: <boolean | undefined>false
    }),

    actions: {
        login(route: string) {
            keycloak.login();
        },
        logout(route: string) {
            keycloak.logout();
        },
    },

    getters: {
        accessToken: (state) => {
            return state._accessToken;
        },
        refreshToken: (state) => {
            return state._refreshToken;
        },
        user: (state) => {
            return state._user;
        },
        isAuth: (state) => {
            return state._isAuth;
        },
        isAdmin: (state) => {
            return state._isAdmin;
        },
    },
})
