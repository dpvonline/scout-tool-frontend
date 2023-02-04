<template>
  <div class="md:pa-64">
    <div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
      <main class="flex-1">
        <Header :pages="page"/>
        <ContactForm/>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import {
  ChevronRightIcon,
  LockClosedIcon,
  PlusIcon,
} from "@heroicons/vue/20/solid";
import { useRoute } from "vue-router";

import Header from "@/components/breadcrumbs/Header.vue";
import ContactForm from "@/modules/landing/components/ContactForm.vue";

const page = [{ name: "Hauptseite", link: "home" }];


</script>