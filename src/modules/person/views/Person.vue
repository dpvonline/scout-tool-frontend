<template>
  <div class="2xl:px-64 xl:px-30">
    <Breadcrumbs :pages="pages" />
    <main class="relative z-40 flex-1 focus:outline-none">
      <ReadOnlyPerson :editable="false" v-if="!isLoading" :personalData="person" class="py-3 px-3"/>
      <LoadingItem v-else/>
    </main>
  </div>
</template>

<script setup lang="ts">
import { usePersonStore } from "@/modules/person/store";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ReadOnlyPerson from '@/modules/person/components/list/ReadOnlyPerson.vue'
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";

const personStore = usePersonStore();

const route = useRoute();

const isLoading = computed(() => {
  return personStore.isLoading;
});

const person = computed(() => {
  return personStore.person;
});

function updateSearch(params) {
  personStore.fetchPersons(params);
}

onMounted(() => {
  const id = route.params.id;
  if (id) {
    personStore.fetchPersonById(id);
  }
});

const pages = [{ name: "Alle Personen", link: "PersonMain" }];

</script>
