<template>
  <div>
    <Disclosure as="nav" class="bg-white shadow" v-slot="{ open, close }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div
              v-for="tab in props.tabs"
              :key="tab.name"
              class="hidden sm:ml-6 sm:flex sm:space-x-8"
            >
              <component
                :is="tab.disabled ? 'span' : 'router-link'"
                :to="tab.linkName"
                :class="[
                  tab.current
                    ? 'text-gray-900 fron-semibold border-blue-600'
                    : 'text-gray-500 border-transparent',
                  tab.disabled ? 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-300 opacity-50' :
                  'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
                ]"
                >{{ tab.name }}</component
              >
            </div>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div
          v-for="tab in props.tabs"
          :key="tab.name"
          class="space-y-1 sm:pb-3 sm:pt-2"
        >
          <DisclosureButton
            :class="[
              tab.current ? 'bg-indigo-50' : '',
              'block border-l-4 border-blue-500 py-2 pl-3 pr-4 text-base font-medium text-blue-700',
            ]"
          >
            <router-link @click.native="doClose(close)" :to="tab.linkName">
              {{ tab.name }}
            </router-link>
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  tabs: Array,
});

function doClose(close) {
  close();
}
</script>
