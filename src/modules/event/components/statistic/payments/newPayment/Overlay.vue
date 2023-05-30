<template>
<OverlayBasic :open="open" :header="header" @close="onCancelClicked">
  <Form
    :items="props.currentPayment"
    :callbackOnConfirm="onConfirmClicked"
    :callbackOnCancel="onCancelClicked"
  />
</OverlayBasic>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

import Form from "./Form.vue"
import OverlayBasic from '@/components/overlay/Basic.vue'

const props = defineProps({
  open: { type: Boolean, required: true },
  header: { type: String, required: false, default: "Anftrag Senden" },
  text: {
    type: String,
    required: false,
    default:
      "Willst du an den Admin der Gruppen einen antrag auf aufnahme schicken?",
  },
  currentPayment: {
    type: Object,
    required: true,
    default: {}
  },
  callbackOnConfirm: { type: Function, required: true },
  callbackOnCancel: { type: Function, required: true },
});

function onCancelClicked() {
  props.callbackOnCancel();
}
function onConfirmClicked(props) {
  props.callbackOnConfirm(props);
}
</script>
