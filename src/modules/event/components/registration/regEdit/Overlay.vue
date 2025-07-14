<template>
  <OverlayBasic :open="open" :header="header" @close="onCloseClicked">
    <FormCustom :items="items" :value="value" @close="onCloseClicked"></FormCustom>
  </OverlayBasic>
</template>

<script setup lang="ts">
import FormCustom from "./FormCustom.vue";
import OverlayBasic from "@/components/overlay/Basic.vue";

const props = defineProps({
  open: Boolean,
  header: String,
  items: Object,
  value: Object,
  formNo: Number,
});

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>