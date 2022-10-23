<template>
  <div class="flex h-full">
    <LeftNav>
      <router-view />
    </LeftNav>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  ComboboxOption,
  Combobox,
  ComboboxLabel,
  ComboboxInput,
  ComboboxOptions,
  ComboboxButton,
  TransitionRoot,
} from "@headlessui/vue";

import {
  Bars3Icon,
  CogIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

import { ref } from "vue";
import { useRoute } from "vue-router";

import LeftNav from "@/modules/nav/components/LeftNav.vue";

</script>