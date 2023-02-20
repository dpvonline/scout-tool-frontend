<template>
  <div class="2xl:px-64 xl:px-30">
    <Breadcrumbs :pages="pages" />
    <main class="relative flex-1 focus:outline-none">
      <h2>Du hast keinen Zugriff auf diese Daten</h2>
    </main>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import { usePersonStore } from "@/modules/person/store";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import ReadOnlyPerson from "@/modules/person/components/list/ReadOnlyPerson.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";

const personStore = usePersonStore();

const route = useRoute();

const isLoading = computed(() => {
  return personStore.isLoading;
});

const user = computed(() => {
  return personStore.user;
});

function updateSearch(params) {
  personStore.fetchPersons(params);
}

const pages = [{ name: "Alle User", link: "AllUsers" }];


onMounted(() => {
  const id = route.params.id;
  if (id) {
    personStore.fetchUserById(id);
  }
});

</script>
