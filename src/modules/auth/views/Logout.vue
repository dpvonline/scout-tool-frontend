<template>
  <div class="lg:border-t lg:border-b lg:border-gray-200">
    <h1>Logout</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useAuthStore } from "@/modules/auth/store/index.ts";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

function onLogoutClicked() {
  authStore.logout();
}

onMounted(() => {
  if (authStore.isAuth) {
    onLogoutClicked();
  } else {
    router.push({name: 'home'})
  }
});
</script>