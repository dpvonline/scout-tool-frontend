<template>
  <NewMessageForm/>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import {
  ChevronRightIcon,
  LockClosedIcon,
  PlusIcon,
} from "@heroicons/vue/20/solid";
import { useRoute } from "vue-router";

import NewMessageForm from "@/modules/message/components/NewMessageForm.vue";
</script>