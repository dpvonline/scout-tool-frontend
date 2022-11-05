import Keycloak, {KeycloakError, KeycloakInitOptions, KeycloakProfile} from 'keycloak-js'
import {useAuthStore} from "@/modules/auth/store";


const config = {
    url: import.meta.env.VITE_APP_KEYCLOAK_URL,
    realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
};

const initOptions: KeycloakInitOptions = {
    onLoad: 'check-sso',
    silentCheckSsoFallback: false,
};

export const keycloak = new Keycloak(config);

function setStoreValues() {
    const authStore = useAuthStore();
    authStore._isAuth = keycloak.authenticated;
    authStore._accessToken = keycloak.token;

    console.log(`authenticated: ${keycloak.authenticated}`)
    if (keycloak.authenticated) {
        keycloak.loadUserInfo()
            .then((test) => {
                console.log(`userInfo: ${keycloak.userInfo}`)
                authStore._user = keycloak.userInfo;
            })
            .catch((error) => {
                console.log(`error while loading userinfo: ${error}`);
            });
    }
    else{
        authStore._user = {};
    }
}

function onReady(authenticated: boolean) {
    setStoreValues();
    console.log(`onReady authenticated: ${authenticated}`);
}

function onAuthError(error: KeycloakError) {
    setStoreValues();
    console.log(`onAuthError error: ${error}`);
}

function onAuthLogout() {
    setStoreValues();
    console.log(`onAuthLogout`);
}

function onTokenExpired() {
    console.log('token expired');
    keycloak.updateToken(30)
        .then(() => {
            console.log('successfully got a new token', keycloak.token);
            setStoreValues();
        })
        .catch((error) => {
            console.log(`token refresh error: ${error}`)
            setStoreValues();
        });
}

function onActionUpdate(status: "success" | "cancelled" | "error") {
    setStoreValues();
    console.log(`onActionUpdate status: ${status}`);
}

function onAuthRefreshError() {
    setStoreValues();
    console.log(`onAuthRefreshError`);
}

function onAuthRefreshSuccess() {
    setStoreValues();
    console.log(`onAuthRefreshSuccess`);
}

function onAuthSuccess() {
    setStoreValues();
    console.log(`onAuthSuccess`);
}

export default function () {
    keycloak.onReady = onReady;
    keycloak.onAuthError = onAuthError;
    keycloak.onAuthLogout = onAuthLogout;
    keycloak.onTokenExpired = onTokenExpired;
    keycloak.onActionUpdate = onActionUpdate;
    keycloak.onAuthRefreshError = onAuthRefreshError;
    keycloak.onAuthRefreshSuccess = onAuthRefreshSuccess;
    keycloak.onAuthSuccess = onAuthSuccess;
    keycloak.init(initOptions);
}
