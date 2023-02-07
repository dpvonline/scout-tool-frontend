<template>
  <TabWrapper>
    <UserList />
  </TabWrapper>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { TagIcon } from "@heroicons/vue/20/solid";
import List from "@/components/base/list/Main.vue";
import UserList from "@/modules/person/components/list/UserList.vue";
import { useRoute } from "vue-router";
import { usePersonStore } from "@/modules/person/store/index.ts";
import TabWrapper from "@/components/base/TabWrapper.vue";
</script>
