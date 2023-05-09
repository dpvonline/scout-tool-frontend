<template>
  <OverlayBasic :open="open" :header="header" @close="onCloseClicked">
    <component :is="formArray[props.formNo]" :items="items"></component>
  </OverlayBasic>
</template>

<script setup lang="ts">
import FormNames from "./FormNames.vue";
import FormDates from "./FormDates.vue";
import FormAuth from "./FormAuth.vue";
import FormCustom from "./FormCustom.vue";
import FormBookings from "./FormBookings.vue";
import OverlayBasic from "@/components/overlay/Basic.vue";

const props = defineProps({
  open: Boolean,
  header: String,
  items: Object,
  formNo: Number,
});

const formArray = [FormNames, FormDates, FormAuth, FormBookings, FormCustom]

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>