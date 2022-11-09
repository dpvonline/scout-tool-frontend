<template>
  <main
    class="relative h-screen z-40 flex-1 focus:outline-none overflow-y-auto"
  >
    <article class="flex-shrink-0 border border-gray-200 ma-12">
      <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div
          class="
            border-b border-gray-200
            pb-5
            sm:flex sm:items-center sm:justify-between
          "
        >
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ name }}
          </h3>
          <div class="mt-3 sm:mt-0 sm:ml-4">
            <label for="mobile-search-candidate" class="sr-only">Suche</label>
            <label for="desktop-search-candidate" class="sr-only">Suche</label>
            <div class="flex rounded-md shadow-sm">
              <div class="relative flex-grow focus-within:z-10">
                <div
                  class="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-0
                    flex
                    items-center
                    pl-3
                  "
                >
                  <MagnifyingGlassIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="mobile-search-candidate"
                  id="mobile-search-candidate"
                  v-model="searchInput"
                  class="
                    block
                    w-full
                    rounded-none rounded-l-md
                    border-gray-300
                    pl-10
                    focus:border-blue-500 focus:ring-blue-500
                    sm:hidden
                  "
                  placeholder="Search"
                />
                <input
                  type="text"
                  name="desktop-search-candidate"
                  id="desktop-search-candidate"
                  v-model="searchInput"
                  class="
                    hidden
                    w-full
                    rounded-none rounded-l-md
                    border-gray-300
                    pl-10
                    focus:border-blue-500 focus:ring-blue-500
                    sm:block sm:text-sm
                  "
                  placeholder="Suche"
                />
              </div>
              <ToolDropdown :buttonList="buttonList" />
            </div>
          </div>
        </div>
      </div>

      <!-- Filter-Bar -->
      <div class="bg-white">
        <!-- Mobile filter dialog -->
        <TransitionRoot as="template" :show="open">
          <Dialog
            as="div"
            class="relative z-40 sm:hidden"
            @close="open = false"
          >
            <TransitionChild
              as="template"
              enter="transition-opacity ease-linear duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
              <TransitionChild
                as="template"
                enter="transition ease-in-out duration-300 transform"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel
                  class="
                    relative
                    ml-auto
                    flex
                    h-full
                    w-full
                    max-w-xs
                    flex-col
                    overflow-y-auto
                    bg-white
                    py-4
                    pb-12
                    shadow-xl
                  "
                >
                  <div class="flex items-center justify-between px-4">
                    <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      class="
                        -mr-2
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-md
                        bg-white
                        p-2
                        text-gray-400
                      "
                      @click="open = false"
                    >
                      <span class="sr-only">Close menu</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <!-- Filters -->
                  <form class="mt-4">
                    <Disclosure
                      as="div"
                      v-for="section in filters"
                      :key="section.id"
                      class="border-t border-gray-200 px-4 py-6"
                      v-slot="{ open }"
                    >
                      <h3 class="-mx-2 -my-3 flow-root">
                        <DisclosureButton
                          class="
                            flex
                            w-full
                            items-center
                            justify-between
                            bg-white
                            px-2
                            py-3
                            text-sm text-gray-400
                          "
                        >
                          <span class="font-medium text-gray-900">{{
                            section.name
                          }}</span>
                          <span class="ml-6 flex items-center">
                            <ChevronDownIcon
                              :class="[
                                open ? '-rotate-180' : 'rotate-0',
                                'h-5 w-5 transform',
                              ]"
                              aria-hidden="true"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel class="pt-6">
                        <div class="space-y-6">
                          <div
                            v-for="(option, optionIdx) in section.options"
                            :key="option.value"
                            class="flex items-center"
                          >
                            <input
                              :id="`filter-mobile-${section.id}-${optionIdx}`"
                              :name="`${section.id}[]`"
                              :value="option.value"
                              type="checkbox"
                              :checked="option.checked"
                              @change="updateFilters(option, section)"
                              class="
                                h-4
                                w-4
                                rounded
                                border-gray-300
                                text-blue-600
                                focus:ring-blue-500
                              "
                            />
                            <label
                              :for="`filter-mobile-${section.id}-${optionIdx}`"
                              class="ml-3 text-sm text-gray-500"
                              >{{ option.label }}</label
                            >
                          </div>
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </TransitionRoot>

        <!-- Filters -->
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" class="sr-only">Filter</h2>

          <div class="border-b border-gray-200 bg-white pb-4">
            <div
              class="
                mx-auto
                flex
                max-w-7xl
                items-center
                justify-between
                px-4
                sm:px-6
                lg:px-8
              "
            >
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    class="
                      group
                      inline-flex
                      justify-center
                      text-sm
                      font-medium
                      text-gray-700
                      hover:text-gray-900
                    "
                  >
                    {{ activeSort }}
                    <ChevronDownIcon
                      class="
                        -mr-1
                        ml-1
                        h-5
                        w-5
                        flex-shrink-0
                        text-gray-400
                        group-hover:text-gray-500
                      "
                      aria-hidden="true"
                    />
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
                      left-0
                      z-10
                      mt-2
                      w-40
                      origin-top-left
                      rounded-md
                      bg-white
                      shadow-2xl
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                    "
                  >
                    <div class="py-1">
                      <MenuItem
                        v-for="option in sortOptions"
                        :key="option.name"
                        v-slot="{ active }"
                      >
                        <button
                          @click="updateFilters(option)"
                          :class="[
                            option.current
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500 block',
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm',
                          ]"
                        >
                          {{ option.name }}
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>

              <button
                type="button"
                class="
                  inline-block
                  text-sm
                  font-medium
                  text-gray-700
                  hover:text-gray-900
                  sm:hidden
                "
                @click="open = true"
              >
                Filter
              </button>

              <div class="hidden sm:block">
                <div class="flow-root">
                  <PopoverGroup
                    class="-mx-4 flex items-center divide-x divide-gray-200"
                  >
                    <Popover
                      v-for="(section, sectionIdx) in filters"
                      :key="section.id"
                      class="relative inline-block px-4 text-left"
                    >
                      <PopoverButton
                        class="
                          group
                          inline-flex
                          justify-center
                          text-sm
                          font-medium
                          text-gray-700
                          hover:text-gray-900
                        "
                      >
                        <span>{{ section.name }}</span>
                        <!-- <span
                          v-if="sectionIdx === 0"
                          class="
                            ml-1.5
                            rounded
                            bg-gray-200
                            py-0.5
                            px-1.5
                            text-xs
                            font-semibold
                            tabular-nums
                            text-gray-700
                          "
                          >1</span
                        > -->
                        <ChevronDownIcon
                          class="
                            -mr-1
                            ml-1
                            h-5
                            w-5
                            flex-shrink-0
                            text-gray-400
                            group-hover:text-gray-500
                          "
                          aria-hidden="true"
                        />
                      </PopoverButton>

                      <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                      >
                        <PopoverPanel
                          class="
                            absolute
                            right-0
                            z-10
                            mt-2
                            origin-top-right
                            rounded-md
                            bg-white
                            p-4
                            shadow-2xl
                            ring-1 ring-black ring-opacity-5
                            focus:outline-none
                          "
                        >
                          <form class="space-y-4">
                            <div
                              v-for="(option, optionIdx) in section.options"
                              :key="option.value"
                              class="flex items-center"
                            >
                              <input
                                :id="`filter-${section.id}-${optionIdx}`"
                                :name="`${section.id}[]`"
                                :value="option.value"
                                type="checkbox"
                                :checked="option.checked"
                                @change="updateFilters(option, section)"
                                class="
                                  h-4
                                  w-4
                                  rounded
                                  border-gray-300
                                  text-blue-600
                                  focus:ring-blue-500
                                "
                              />
                              <label
                                :for="`filter-${section.id}-${optionIdx}`"
                                class="
                                  ml-3
                                  whitespace-nowrap
                                  pr-6
                                  text-sm
                                  font-medium
                                  text-gray-900
                                "
                                >{{ option.label }}</label
                              >
                            </div>
                          </form>
                        </PopoverPanel>
                      </transition>
                    </Popover>
                  </PopoverGroup>
                </div>
              </div>
            </div>
          </div>

          <!-- Active filters -->
          <div class="bg-gray-100">
            <div
              class="
                mx-auto
                max-w-7xl
                py-3
                px-4
                sm:flex sm:items-center sm:px-6
                lg:px-8
              "
            >
              <h3 class="text-sm font-medium text-gray-500">
                Filter
                <span class="sr-only">, aktiv</span>
              </h3>

              <div
                aria-hidden="true"
                class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
              />

              <div class="mt-2 sm:mt-0 sm:ml-4">
                <div class="-m-1 flex flex-wrap items-center">
                  <div v-for="activeFilters in filters" :key="activeFilters.id">
                    <span
                      v-for="activeFilter in filteredChecked(
                        activeFilters.options
                      )"
                      :key="activeFilter"
                      class="
                        m-1
                        inline-flex
                        items-center
                        rounded-full
                        border border-gray-200
                        bg-white
                        py-1.5
                        pl-3
                        pr-2
                        text-sm
                        font-medium
                        text-gray-900
                      "
                    >
                      <span>
                        {{ activeFilters.name }}: {{ activeFilter.label }}</span
                      >
                      <button
                        type="button"
                        @click="updateFilters(activeFilter, activeFilters)"
                        class="
                          ml-1
                          inline-flex
                          h-4
                          w-4
                          flex-shrink-0
                          rounded-full
                          p-1
                          text-gray-400
                          hover:bg-gray-200 hover:text-gray-500
                        "
                      >
                        <span class="sr-only"
                          >Filter entfernen für {{ activeFilter.label }}</span
                        >
                        <svg
                          class="h-2 w-2"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 8 8"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-width="1.5"
                            d="M1 1l6 6m0-6L1 7"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Directory list -->
      <div class="min-h-0 flex-1 overflow-scroll" aria-label="Directory">
        <div
          class="overflow-hidden bg-white shadow sm:rounded-md overflow-scroll"
        >
          <ul role="list" v-if="items.length" class="divide-y divide-gray-200">
            <li v-for="item in items" :key="item.id">
              <router-link
                :to="{
                  name: props.detailPageLink,
                  params: {
                    id: item.id,
                  },
                }"
                class="block hover:bg-gray-50"
              >
                <div class="flex items-center px-4 py-4 sm:px-6">
                  <slot name="listitem" v-bind:item="item"></slot>
                  <button @click="onDetailPageClicked(item.id, detailPageLink)">
                    <ChevronRightIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </router-link>
            </li>
          </ul>
          <ul v-else >
            <li>
            <p class="mt-1 max-w-2xl text-sm text-gray-500 px-2 py-2">Bitte suche nach einer Gruppe</p>
            </li>
          </ul>
        </div>
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
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
  EllipsisVerticalIcon,
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  BarsArrowUpIcon,
  MapIcon,
  CheckCircleIcon,
  MegaphoneIcon,
  SquaresPlusIcon,
  ChevronDownIcon,
  UserGroupIcon,
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";
import {
  ChevronLeftIcon,
  TagIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
} from "@heroicons/vue/20/solid";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";

import { computed, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";

import ToolDropdown from "@/components/base/list/components/ToolDropdown.vue";

const props = defineProps({
  name: String,
  items: Array,
  sortOptions: Array,
  filters: Array,
  mainPageLink: String,
  detailPageLink: String,
  buttonList: Array,
});

onBeforeMount(() => {
  const route_query = router.currentRoute.value.query;

  const filterIdArray = props.filters.map((a) => a.id);
  for (const [key, value] of Object.entries(route_query)) {
    if (filterIdArray.includes(key)) {
      const filterCategory = props.filters.filter((item) => item.id === key)[0];
      const filterItem = filterCategory.options.filter(
        (item) => item.value === value
      )[0];
      filterItem.checked = true;
    }
    if (key === "search") {
      searchInput.value = value;
    } else {
    }
  }
});

const router = useRouter();

let query = { ...router.currentRoute.value.query };

function filteredChecked(ary) {
  return ary.filter((item) => item.checked);
}

function updateFilters(option, section) {
  query = { ...router.currentRoute.value.query };

  if (option.search) {
    query.search = option.search;
  }
  if (option.current === false) {
    // set all Sortings Buttons to false
    props.sortOptions.map((item) => (item.current = false));
    option.current = true;
    query.ordering = option.value;
    activeSort.value = option.name;
  }
  if (section) {
    option.checked = !option.checked;
    if (option.checked) {
      query[section.id] = option.value;
    } else {
      delete query[section.id];
    }
  }
  router.push({
    name: props.mainPageLink,
    query: {
      ...query,
    },
  });
}

const searchInput = ref("");


const activeSort = ref("A-Z");

watch(searchInput, (searchInput) => {
  updateFilters({ search: searchInput });
});

function onDetailPageClicked(id) {
  router.push({
    name: props.detailPageLink,
    params: {
      id,
    },
  });
}

const open = ref(false);
</script>
