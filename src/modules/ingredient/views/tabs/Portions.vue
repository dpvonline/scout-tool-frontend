<template>
  <TabPanel class="space-y-12 px-4 py-6">
    <div>
      <div>
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Nutri Punkte
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Negative sind positiv
        </p>
      </div>
      <div class="mt-5 border-t border-gray-200">
        <dl
          class="sm:divide-y sm:divide-gray-200"
          v-for="item in portions"
          :key="`key-${item.name}`"
        >
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {{ item.name }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </TabPanel>
</template>


<script setup>
import { ref } from "vue";
import {
  TabPanel,
} from "@headlessui/vue";
import { useRoute } from 'vue-router'
import { onMounted, computed } from "vue";
//import users store
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";

const route = useRoute()
const store = useIngredientStore();

const portions = computed(() => {
  return store.portions;
});
onMounted(() => {
  const id = route.params.id
  store.fetchPortions({ ingredient__id: id });
});
</script>