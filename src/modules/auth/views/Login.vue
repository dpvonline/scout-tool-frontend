<template>
  <div class="lg:border-t lg:border-b lg:border-gray-200">
    <h1>Login</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/modules/auth/store/index"

const authStore = useAuthStore()
const router = useRouter()

function onLoginClicked() {
  authStore.login()
}

onMounted(() => {
  if (!authStore.isAuth) {
    onLoginClicked()
  } else {
    router.push({ name: "Dashboard" })
  }
})
</script>