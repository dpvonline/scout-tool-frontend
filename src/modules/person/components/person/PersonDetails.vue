<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <main class="relative flex-1 focus:outline-none">
      <PersonOverview :person="person" v-if="!isLoading" />
      <LoadingItem v-else />
    </main>
  </PageWrapper>
</template>
  
  <script setup lang="ts">
import PersonOverview from "@/modules/person/components/person/PersonOverview.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";

import { PlusIcon } from "@heroicons/vue/20/solid";

import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";

const route = useRoute();

import { usePersonStore } from "@/modules/person/store";
const personStore = usePersonStore();

const person = ref({})
const isLoading = ref(true);

const pages = [{ name: "Alle Personen", link: { name: "PersonMain" } }];

onMounted(async () => {
  isLoading.value = true;
  const id = route.params.id;
  const response = await personStore.fetchPersonById(id);
  person.value = response;
  isLoading.value = false;
});
</script>