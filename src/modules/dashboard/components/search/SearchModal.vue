<template>
  <div>
    <button
      @click="isOpen = true"
      v-bind="$attrs"
      class="
        flex
        items-center
        space-x-2
        border border-gray-900/10
        shadow-sm
        px-3
        py-1.5
        bg-white
        hover:border-gray-300
        focus:outline-none focus:border-gray-300
        rounded-lg
      "
    >
      <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      <span class="text-sm text-gray-400 flex-1 text-left">Suche...</span>
      <span class="flex-none text-xs font-semibold text-gray-400">{{
        keyboardShortcut
      }}</span>
    </button>

    <TransitionRoot :show="isOpen" as="template">
      <Dialog
        class="fixed inset-0 z-50 flex justify-center items-start"
        :open="isOpen"
        @close="isOpen = false"
      >
        <TransitionChild
          enter="duration-200 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
          as="template"
        >
          <DialogOverlay
            class="fixed inset-0 bg-black bg-opacity-70"
          ></DialogOverlay>
        </TransitionChild>

        <TransitionChild
          enter="duration-200 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
          as="template"
        >
          <div
            class="
              flex flex-col
              overflow-hidden
              w-full
              max-w-2xl
              bg-white
              rounded-lg
              mx-4
              max-h-[80vh]
              mt-[10vh]
              relative
            "
          >
            <form class="relative flex items-center" action="#">
              <div
                class="
                  absolute
                  inset-y-0
                  left-0
                  flex
                  items-center
                  pl-4
                  pointer-events-none
                  text-gray-200
                "
              >
                <MagnifyingGlassIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>

              <input
                @input="(e) => search(e.target.value)"
                class="
                  w-full
                  py-4
                  pl-12
                  border-b border-gray-100
                  outline-none
                  placeholder-gray-400
                "
                type="text"
                placeholder="Suche..."
              />

              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  @click="isOpen = false"
                  class="
                    flex
                    items-center
                    p-1.5
                    uppercase
                    font-semibold
                    tracking-wider
                    text-gray-700
                    rounded-md
                    border border-gray-200
                    focus:outline-none focus:border-gray-300
                    text-xxs
                  "
                  type="button"
                >
                  Esc
                </button>
              </div>
            </form>

            <div class="overflow-auto">
              <div
                v-for="category_results in Object.keys(results)"
                :key="category_results"
                class="relative"
              >
                <div
                  class="
                    sticky
                    top-0
                    z-10
                    border-t border-b border-gray-200
                    bg-gray-50
                    px-6
                    py-1
                    text-sm
                    font-medium
                    text-gray-500
                  "
                >
                  <h3>{{ getTitleBySearchCategory(category_results) }}</h3>
                </div>
                <ul class="divide-y divide-gray-100">
                  <li
                    v-for="(item, index) in results[category_results]"
                    :key="index"
                    class="flex items-center px-4 py-2.5 relative"
                  >
                    <component @close="isOpen = false" :is="getCompBySearchCategory(category_results)" :item="item">
                    </component>
                  </li>
                </ul>
                <p
                  v-if="results[category_results].length === 0"
                  class="p-10 text-lg text-center text-gray-400"
                >
                  Kein Ergebnis in dieser Kategorie
                </p>
              </div>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
import { debounce } from "lodash";

import {
  ChevronLeftIcon,
  TagIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
} from "@heroicons/vue/20/solid";

import IssueItem from '@/modules/dashboard/components/search/IssueItem.vue'
import GroupItem from '@/modules/dashboard/components/search/GroupItem.vue'

const isAppleOS = () => {
  const platform =
    navigator?.userAgentData?.platform || navigator?.platform || "unknown";
  return /(Mac|iPhone|iPod|iPad)/i.test(platform);
};

const keyboardShortcut = isAppleOS() ? "⌘K" : "Ctrl+K";
const isOpen = ref(false);

const onKeyDown = (event) => {
  if (isOpen.value) return;

  if ((event.metaKey || event.ctrlKey) && event.key === "k") {
    isOpen.value = true;
  }
};

const results = ref([]);
const search = debounce(async (term) => {
  let { data } = await axios.get(`${BASE_URL}/basic/search/`, {
    params: { query: term },
  });
  results.value = data;
}, 250);

function getTitleBySearchCategory(state) {
  const nameTemplates = {
    issue: "Aufgaben",
    group: "Gruppen",
    user: "User",
  };
  return nameTemplates[state];
}

function getCompBySearchCategory(state) {
  const nameTemplates = {
    issue: IssueItem,
    group: GroupItem,
    user: IssueItem,
  };
  return nameTemplates[state];
}

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
  search();
});
onUnmounted(() => window.removeEventListener("keydown", onKeyDown));
</script>

