<template>
  <div class="md:pa-64">
    <div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
      <main class="flex-1">
        <Header :pages="page" />
        <Questions />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRightIcon,
  LockClosedIcon,
  PlusIcon,
} from "@heroicons/vue/20/solid";

import Questions from "@/modules/landing/components/faq/Questions.vue";
import Header from "@/components/breadcrumbs/Header.vue";

const page = [{ name: "Hauptseite", link: "home" }];
</script>