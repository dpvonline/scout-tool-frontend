<template>
  <PageWrapper>
    <Breadcrumbs :pages="pages" />
    <h1>Hallo</h1>
    {{ user }}
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePersonStore } from "@/modules/person/store";
import PageWrapper from "@/components/base/PageWrapper.vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
const personStore = usePersonStore();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const user = ref({});

const pages = [{ name: "Alle Benutzer", link: { name: "AllUsers" } }];

async function fetchUserById() {
  const id = route.params.id;
  const response = await personStore.fetchUserById(id);
  user.value = response.data;
}

onMounted(() => {
  fetchUserById();
});
</script>
