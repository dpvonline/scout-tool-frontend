import Keycloak, { KeycloakError, KeycloakInitOptions, KeycloakProfile } from "keycloak-js";
import { useAuthStore } from "@/modules/auth/store";

const config = {
  url: import.meta.env.VITE_APP_KEYCLOAK_URL,
  realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
};

const initOptions: KeycloakInitOptions = {
  checkLoginIframe: false, // default
  onLoad: "check-sso",
  silentCheckSsoFallback: false,
};

export const keycloak = await new Keycloak(config);

keycloak.onReady = () => {
  setTimeout(() => {
    setStoreValues();
  }, 250);
};

keycloak.onAuthError = (error: KeycloakError) => {
  setTimeout(() => {
    setStoreValues();
  }, 250);
};

keycloak.onAuthLogout = () => {
  setTimeout(() => {
    setStoreValues();
  }, 250);
};

keycloak.onTokenExpired = () => {
  keycloak
    .updateToken(30)
    .then(() => {
      setStoreValues();
    })
    .catch((error) => {
      setStoreValues();
    });
};

keycloak.onActionUpdate = (status: "success" | "cancelled" | "error") => {
  setTimeout(() => {
    setStoreValues();
  }, 250);
};

keycloak.onAuthRefreshError = () => {
  setTimeout(() => {
    setStoreValues();
  }, 250);
};

keycloak.onAuthRefreshSuccess = () => {
  setTimeout(() => {
    setStoreValues();
  }, 250);
};

keycloak.onAuthSuccess = () => {
  setTimeout(() => {
    setStoreValues();
  }, 250);
};

try {
  const authenticated = await keycloak.init(initOptions);
  if (authenticated) {
    setTimeout(() => {
      setStoreValues();
    }, 250);
  } else {

    console.log('User is not authenticated');
  }
} catch (error) {
  console.error('Failed to initialize adapter:', error);
}

function setStoreValues() {
    const authStore = useAuthStore();
    authStore._isAuth = keycloak.authenticated;
    authStore._accessToken = keycloak.token;
    authStore._isKeycloakInit = true;

    if (keycloak.authenticated) {
      keycloak
        .loadUserInfo()
        .then((test) => {
          authStore._user = keycloak.userInfo;
        })
        .catch((error) => {
          console.log(`error while loading userinfo: ${error}`);
        });
    } else {
      authStore._user = {};
  }
}



function onReady(authenticated: boolean) {
  setStoreValues();
}

function onAuthError(error: KeycloakError) {
  setStoreValues();
}

function onAuthLogout() {
  setStoreValues();
}

function onTokenExpired() {
  keycloak
    .updateToken(30)
    .then(() => {
      setStoreValues();
    })
    .catch((error) => {
      setStoreValues();
    });
}

function onActionUpdate(status: "success" | "cancelled" | "error") {
  setStoreValues();
}

function onAuthRefreshError() {
  setStoreValues();
}

function onAuthRefreshSuccess() {
  setStoreValues();
}

function onAuthSuccess() {
  setStoreValues();
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
}
