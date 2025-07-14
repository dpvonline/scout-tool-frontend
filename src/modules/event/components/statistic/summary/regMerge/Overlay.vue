<template>
    <OverlayBasic :open="open" :header="header" @close="onCloseClicked">
      <Form></Form>
    </OverlayBasic>
  </template>
  
  <script setup lang="ts">

  import Form from "./Form.vue";
  import OverlayBasic from "@/components/overlay/Basic.vue";
  
  const props = defineProps({
    header: String,
    open: Boolean,
  });
  
  
  const emit = defineEmits(["close"]);
  
  const onCloseClicked = () => {
    emit("close");
  };
  </script>