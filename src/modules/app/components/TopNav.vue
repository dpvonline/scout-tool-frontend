<template>
  <div class="inline-flex items-center justify-center">
    <router-link
      v-for="item in props.navigation"
      :key="item.name"
      :to="{ name: item.linkName }"
      class="
        text-sm
        rounded-md
        bg-white bg-opacity-0
        px-3
        py-2
        hover:bg-opacity-10
      "
      :class="[
        currentRoute.includes(item.route)
          ? 'font-bold text-white '
          : 'font-medium text-blue-100',
      ]"
    >
      {{ item.name }}
      <span
        v-if="item.count & (item.count > 0)"
        :class="[
          item.current ? 'bg-white' : 'bg-red-600 group-hover:bg-gray-200',
          'ml-1 inline-block py-0.5 px-3 text-xs font-medium rounded-full',
        ]"
        >{{ item.count }}</span
      >
    </router-link>
    <Popover class="relative px-3" v-if="additionalNavigation && additionalNavigation.length">
      <PopoverButton
        class="inline-flex items-center gap-x-1 text-sm leading-6 text-white"
      >
        <span>Weitere Anwendungen</span>
        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
      </PopoverButton>

      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <PopoverPanel
          class="
            absolute
            left-1/2
            z-10
            mt-5
            flex
            w-screen
            max-w-max
            -translate-x-1/2
            px-4
          "
        >
          <div
            class="
              w-screen
              max-w-sm
              flex-auto
              rounded-lg
              bg-white
              p-4
              text-sm
              leading-6
              shadow-lg
              ring-1 ring-gray-900/5
            "
          >
            <div
              v-for="item in additionalNavigation"
              :key="item.name"
              class="relative rounded-lg p-4 hover:bg-gray-50"
            >
              <router-link
                :key="item.name"
                :to="{ name: item.linkName }"
                class="font-semibold text-gray-900">
                  {{ item.name }}
              </router-link>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  navigation: { type: Array, required: true },
  additionalNavigation: { type: Array, required: true },
});

const route = useRoute();

const currentRoute = computed(() => {
  return route.fullPath;
});

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

</script>
