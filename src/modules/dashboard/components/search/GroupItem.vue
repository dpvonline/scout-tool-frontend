<template>
  <router-link :to="{ name: 'GroupOverview', params: {id: props.item.id }}">
    Gruppe: {{ props.item.name }}
  </router-link>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
