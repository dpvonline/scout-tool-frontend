<template>
  <div class="2xl:px-64 xl:px-30">
    <Breadcrumbs :pages="pages" />
    <main class="relative z-40 flex-1 focus:outline-none">
      <article v-if="group.name">
        <!-- Tabs -->
        <TabGroup as="div" class="mt-2">
          <div class="border-b border-gray-200">
            <TabList class="-mb-px flex space-x-8 px-4">
              <Tab as="template" v-for="tab in tabs" :key="tab.name">
                <router-link
                  :to="{ name: tab.linkName }"
                  tag="button"
                  :class="[
                    tab.selected
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
      </article>
      <div class="xl:hidden" v-else>Bitte Wähle eine Zutat</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import Breadcrumbs from "@/components/breadcrumbs/Header.vue";
import { useRoute } from "vue-router";
import { useGroupStore } from "@/modules/group/store/index.ts";
import { useAuthStore } from "@/modules/auth/store/index.ts";

const route = useRoute();

const pages = computed(() => {
  return [
    { name: "Gruppe", link: "GroupMain" },
    {
      name: `${group.value.name}`,
      link: `GroupChilden`,
    },
  ];
});

const tabs = computed(() => {
  return [
    {
      name: "Übersicht",
      id: 1,
      linkName: "GroupOverview",
      component: "GroupOverview",
      selected: route.name === "GroupOverview",
    },
    {
      name: "Mitglieder",
      id: 2,
      linkName: "GroupMember",
      component: "GroupMember",
      selected: route.name === "GroupMember",
    },
    {
      name: "Untergruppen",
      id: 3,
      linkName: "GroupChilden",
      component: "GroupChilden",
      selected: route.name === "GroupChilden",
    },
  ];
});

const groupStore = useGroupStore();
const group = computed(() => {
  return groupStore.group;
});

const authStore = useAuthStore();
const isAuth = computed(() => {
  return groupStore.isAuth;
});

watch(
  () => route,
  () => {
    if (isAuth) {
      refreshData();
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => tabs,
  () => {
    debugger;
  }
);

function refreshData() {
  const id = route.params.id;
  groupStore.fetchGroupById(id);
}

onMounted(() => {
  refreshData();
});
</script>