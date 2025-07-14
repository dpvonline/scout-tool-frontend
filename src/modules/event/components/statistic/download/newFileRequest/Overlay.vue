<template>
  <OverlayBasic :open="open" :header="header">
    <Form @close="onCancelClicked" />
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

import Form from "./Form.vue";
import OverlayBasic from "@/components/overlay/Basic.vue";

const props = defineProps({
  open: { type: Boolean, required: true },
  header: { type: String, required: false, default: "Anftrag Senden" },
  text: {
    type: String,
    required: false,
    default:
      "Willst du an den Admin der Gruppen einen antrag auf aufnahme schicken?",
  },
});

const emit = defineEmits(["close"]);

const onCancelClicked = () => {
  emit("close");
};
</script>
