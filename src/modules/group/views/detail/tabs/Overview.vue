<template>
  <div class="">
    <div class="mt-3 border-gray-200">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div v-for="field of infoFields" :key="field.id" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-sm font-medium text-gray-500">{{field.label}}</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{field.value}}</dd>
        </div>
      </dl>
    </div>
    <Children />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useGroupStore } from "@/modules/group/store/index";
import Children from "@/modules/group/views/detail/tabs/Children.vue";

import { useRoute } from "vue-router";

const route = useRoute();

const groupStore = useGroupStore();
const group = computed(() => {
  return groupStore.group;
});

const infoFields: {id: string, label: string, value: string}[] = []

</script>

<style>

</style>