<template>
  <div>
    <RegSearchList />
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/20/solid";

import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import RegSearchList from "@/modules/event/components/statistic/summary/RegSearchList.vue";

const pages = [{ name: "Alle Anmeldungen", link: "EventMain" }];
</script>