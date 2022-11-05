<template>
  <div>
    <!-- Content area -->
    <div class="md:pa-64">
      <div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
        <main class="flex-1">
          <div class="relative mx-auto max-w-4xl md:px-8 xl:px-0">
            <div class="pt-10 pb-16">
              <div class="px-4 sm:px-6 md:px-0">
                <div class="py-6">
                  <TabGroup as="div" class="mt-2">
                    <!-- Tabs -->
                    <div class="lg:hidden">
                      <label for="selected-tab" class="sr-only"
                        >Select a tab</label
                      >
                      <select
                        id="selected-tab"
                        name="selected-tab"
                        class="
                          mt-1
                          block
                          w-full
                          rounded-md
                          border-gray-300
                          py-2
                          pl-3
                          pr-10
                          text-base
                          focus:border-blue-500
                          focus:outline-none
                          focus:ring-blue-500
                          sm:text-sm
                        "
                      >
                        <option
                          v-for="tab in tabs"
                          :key="tab.name"
                          :selected="tab.current"
                        >
                          <router-link
                            :to="{ name: tab.ComponentName }"
                          >
                            {{ tab.name }}
                          </router-link>

                        </option>
                      </select>
                    </div>
                    <div class="hidden lg:block">
                      <TabList class="-mb-px flex space-x-8 px-4">
                        <Tab v-for="tab in tabs" :key="tab.name" as="template">
                          <router-link
                            :to="{ name: tab.linkName }"
                            :class="[
                              tab.current
                                ? 'text-blue-600 border-blue-600'
                                : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium text-center',
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
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, watch } from "vue";

const route = useRoute();
const router = useRouter();

const tabs = computed(() => {
  return [
    { name: "Allgemein", linkName: "SettingsAllgemein", current: route.name === "SettingsAllgemein" },
    { name: "Passwort", linkName: "SettingsPassword", current: route.name === "SettingsPassword" },
    { name: "Benachrichtigungen", linkName: "SettingsNotifications", current: route.name === "SettingsNotifications" },
  ];
});

</script>
