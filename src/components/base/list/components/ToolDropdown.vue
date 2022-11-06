
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="
          inline-flex
          w-full
          justify-center
          border border-gray-300
          bg-white
          px-4
          py-2
          pb-3
          sm:pb-2
          text-sm
          font-medium
          text-gray-700
          shadow-sm
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:ring-offset-2
          focus:ring-offset-gray-100
        "
      >
        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="
          absolute
          right-0
          z-10
          mt-2
          w-56
          origin-top-right
          divide-y divide-gray-100
          rounded-md
          bg-white
          shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none
        "
      >
        <div class="py-1">
          <template v-for="item in props.buttonList" :key="item.name">
            <MenuItem v-slot="{ active }">
              <router-link
                :to="{ name: item.linkName }"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
              >
                <!-- <PencilSquareIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" /> -->
                {{ item.name }}
              </router-link>
            </MenuItem>
          </template>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/vue/20/solid";
const props = defineProps({
  buttonList: Array,
});

const open = ref(false);
</script>

<style>
</style>