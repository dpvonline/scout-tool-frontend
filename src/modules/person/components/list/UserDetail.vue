<template>
  
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePersonStore } from "@/modules/person/store";
const personStore = usePersonStore();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const user = ref({});

async function fetchUserById() {

  const id = route.params.id;
  const response = await personStore.fetchUserById(id)
  user.value = response.data;

}
</script>
