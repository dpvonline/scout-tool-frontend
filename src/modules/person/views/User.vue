<template>
  <div class="2xl:px-64 xl:px-30">
    <Breadcrumbs :pages="pages" />
    <main class="relative z-40 flex-1 focus:outline-none">
      <h2>Du hast keinen Zugriff auf diese Daten</h2>
    </main>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

const pages = [{ name: "Alle User", link: "AllUsers" }];
</script>
