<template>
  <div class="2xl:px-64 xl:px-30">
    <Breadcrumbs :pages="pages" />
    <main class="relative z-40 flex-1 focus:outline-none">
      <h2>Du hast keinen Zugriff auf diese Daten</h2>
    </main>
  </div>
</template>

<script setup lang="ts">
import { usePersonStore } from "@/modules/person/store";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ReadOnlyPerson from '@/modules/person/components/list/ReadOnlyPerson.vue'
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";

const pages = [{ name: "Alle User", link: "AllUsers" }];

</script>
