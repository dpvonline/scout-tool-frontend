<template>
  <router-link :to="{ name: 'MessageDetail', params: {id: props.item.id }}">
    Anfrage: {{ props.item.issueSubject }}
  </router-link>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
