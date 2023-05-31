<template>
  <div class="px-3 py-3">
    <CashSearchList />
  </div>
</template>

<script setup lang="ts">
import CashSearchList from "@/modules/event/components/statistic/summary/CashSearchList.vue";

const pages = [{ name: "Alle Anmeldungen", link: { name: "EventMain" } }];
</script>