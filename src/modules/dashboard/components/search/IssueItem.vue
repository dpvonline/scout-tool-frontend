<template>
  <router-link @click="onCloseClicked" :to="{ name: 'MessageDetail', params: {id: props.item.id }}">
    Anfrage: {{ props.item.issueSubject }}
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
