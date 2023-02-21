<template>
  <router-link @click="onCloseClicked" :to="{ name: 'GroupOverview', params: {id: props.item.id }}">
    Gruppe: {{ props.item.name }}
  </router-link>
</template>

<script setup>
const props = defineProps({
  item: Object,
});

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>
