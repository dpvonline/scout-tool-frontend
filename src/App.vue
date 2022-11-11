<template>
  <div class="flex h-full">
    <LeftNav v-if="isKeycloakInit">
      <router-view />
    </LeftNav>
    <div v-else class="flex justify-center items-center w-full h-screen">
      <div class="flex justify-center items-center">
        <div class="flex items-center justify-center space-x-2">
          <div
            class="w-6 h-6 rounded-full animate-pulse dark:bg-blue-400"
          ></div>
          <div
            class="w-6 h-6 rounded-full animate-pulse dark:bg-blue-400"
          ></div>
          <div
            class="w-6 h-6 rounded-full animate-pulse dark:bg-blue-400"
          ></div>
        </div>
      </div>
    </div>
    <Success />
    <Error />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store/index.ts";
import { computed } from "vue";

import LeftNav from "@/modules/app/components/LeftNav.vue";
import Success from "@/modules/common/components/Success.vue";
import Error from "@/modules/common/components/Error.vue";
// import Spinner from "@/components/spinner/Spinner.vue";

const authStore = useAuthStore();

const isKeycloakInit = computed(() => {
  return authStore.isKeycloakInit;
});
</script>
