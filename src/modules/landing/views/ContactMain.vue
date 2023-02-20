<template>
  <PageWrapper>
      <main class="flex-1">
        <Header :pages="page"/>
        <ContactForm/>
      </main>
  </PageWrapper>
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
import PageWrapper from "@/components/base/PageWrapper.vue";

const page = [{ name: "Hauptseite", link: "home" }];


</script>