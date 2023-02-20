<template>
  <div class="flex h-full">
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
import { computed } from "vue";

import BaseLayout from "@/modules/app/components/BaseLayout.vue";
import Success from "@/modules/common/components/Success.vue";
import Error from "@/modules/common/components/Error.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";

const authStore = useAuthStore();

const isKeycloakInit = computed(() => {
  return authStore.isKeycloakInit;
});
</script>
