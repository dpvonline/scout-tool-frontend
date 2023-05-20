<template>
  <div class="px-3 py-3">
    <CashSearchList />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useEventStore } from "@/modules/event/store";

import { PlusIcon } from "@heroicons/vue/20/solid";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import CashSearchList from "@/modules/event/components/statistic/summary/CashSearchList.vue";

const pages = [{ name: "Alle Anmeldungen", link: { name: "EventMain" } }];

const eventStore = useEventStore();

import { useRoute } from "vue-router";

const route = useRoute();
</script>