<template>
<OverlayBasic :open="open" :header="header" @close="onCloseClicked">
  <Form :reciptItem="reciptItem"></Form>
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
  open: Boolean,
  header: String,
  reciptItem: Object,
});

const emit = defineEmits(["close"]);

const onCloseClicked = () => {
  emit("close");
};
</script>