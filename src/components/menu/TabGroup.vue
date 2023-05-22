<template>
  <main class="flex-1">
    <div class="pt-1 sm:pt-3 pb-16">
      <div class="px-1 sm:px-6 sm:py-2">
        <div class="py-1 md:py-3">
          <TabGroup as="div" class="mt-2">
            <!-- Tabs -->
            <div class="lg:block">
              <TabList class="-mb-px flex space-x-8 px-4">
                <Tab v-for="tab in props.tabs" :key="tab.name" as="template">
                  <router-link
                    :to="tab.linkName"
                    :class="[
                      tab.current
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-900 border-transparent',
                      'flex-1 whitespace-nowrap border-b-2 pb-2 md:py-4 px-1 sm:text-base text-sm sm:text-md font-medium text-center',
                    ]"
                  >
                    {{ tab.name }}
                  </router-link>
                </Tab>
              </TabList>
            </div>

            <TabPanels as="template">
              <router-view></router-view>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, watch, computed } from "vue";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  tabs: Array,
});
</script>
