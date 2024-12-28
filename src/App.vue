<template>
  <div class="flex h-full">
    <Banner />
    <BaseLayout v-if="isKeycloakInit">
      <router-view />
    </BaseLayout>
    <div v-else class="flex justify-center items-center w-full h-screen">
      <LoadingItem />
    </div>
    <Success />
    <Error />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store/index.ts";
import { computed, onUpdated, ref } from "vue";
import { useRouter } from "vue-router";

import BaseLayout from "@/modules/app/components/BaseLayout.vue";
import Success from "@/modules/common/components/Success.vue";
import Error from "@/modules/common/components/Error.vue";
import Banner from "@/modules/common/components/Banner.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";

const authStore = useAuthStore();

const isKeycloakInit = computed(() => {
  return authStore.isKeycloakInit;
});

const isAuth = computed(() => {
  return authStore.isAuth;
});

import { useNotificationStore } from "@/modules/notification/store";
const notificationsStore = useNotificationStore();

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";

const personalDataStore = usePersonalDataStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const router = useRouter();

function getNotifications() {
  if (isAuth?.value & isKeycloakInit?.value) {
    notificationsStore.fetchNotifications();
    notificationsStore.fetchNotificationCount();
    personalDataStore.fetchPersonalData().then((response) => {
      if (response?.status === 200) {
        if (!response.data?.isValid) {
          commonStore.showError(
            "Bitte vervollständige deine persönlichen Daten."
          );
          if (
            router.currentRoute.value.name !== "SettingsGeneral" &&
            router.currentRoute.value.name !== "SettingsGeneralEdit"
          ) {
            router.push({ name: "SettingsGeneral" });
          }
        }
      }
    });
  }
}

// onUpdated(() => {
//   getNotifications();
//   setInterval(() => getNotifications(), 10000);
// });
</script>
