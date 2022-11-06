<template>
  <div class="lg:border-t lg:border-b lg:border-gray-200">
    <h1>Login</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useAuthStore } from "@/modules/auth/store/index.ts";
const authStore = useAuthStore();

import { useRouter } from "vue-router";

const router = useRouter();

function onLoginClicked() {
  authStore.login();
}

onMounted(() => {
  if (!authStore.isAuth) {
    onLoginClicked();
  } else {
    router.push({ name: "Dashboard" });
  }
});
</script>