<template>
  <OverlayBasic :open="open" :header="header" @close="onCloseClicked">
    <component :is="formArray[props.formNo]" :items="items" @close="onCloseClicked"></component>
  </OverlayBasic>
</template>

<script setup lang="ts">
import FormFreeText from "./FormFreeText.vue";
import OverlayBasic from "@/components/overlay/Basic.vue";

const props = defineProps({
  open: Boolean,
  header: String,
  items: Object,
  formNo: Number,
});

const formArray = [FormFreeText]

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>