<template>
  <div class="shadow sm:hidden">
    <ul
      role="list"
      class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
    >
      <li
        v-for="transaction in props.recipes.slice(0, 5)"
        :key="transaction.id"
      >
        <router-link
          :to="{ name: 'RecipeDetail', params: { id: transaction.id } }"
          class="block bg-white px-4 py-4 hover:bg-gray-50"
        >
          <span class="flex items-center space-x-4">
            <span class="flex flex-1 space-x-2 truncate">
              <CircleStackIcon
                class="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <span class="flex flex-col truncate text-sm text-gray-500">
                <span class="truncate">{{ transaction.name }}</span>

                <time :datetime="transaction.createdAt">{{
                  moment(transaction.createdAt).format("ll")
                }}</time>
              </span>
            </span>
            <ChevronRightIcon
              class="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </router-link>
      </li>
    </ul>

    <nav
      class="
        flex
        items-center
        justify-between
        border-t border-gray-200
        bg-white
        px-4
        py-3
      "
      aria-label="Pagination"
    >
      <div class="flex flex-1 justify-between">
        <router-link
          :to="{ name: 'RecipesMain' }"
          class="
            relative
            ml-3
            inline-flex
            items-center
            rounded-md
            border border-gray-300
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            hover:text-gray-500
          "
          >Alle Rezepte</router-link
        >
      </div>
    </nav>
  </div>

  <!-- Activity table (small breakpoint and up) -->
  <div class="hidden sm:block">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mt-2 flex flex-col">
        <div
          class="
            min-w-full
            overflow-hidden overflow-x-auto
            align-middle
            shadow
            sm:rounded-lg
          "
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="
                    bg-gray-50
                    px-6
                    py-3
                    text-left text-sm
                    font-semibold
                    text-gray-900
                  "
                  scope="col"
                >
                  Rezepte
                </th>
                <th
                  class="
                    bg-gray-50
                    px-6
                    py-3
                    text-right text-sm
                    font-semibold
                    text-gray-900
                  "
                  scope="col"
                >
                  Erstellt
                </th>
                <th
                  class="
                    bg-gray-50
                    px-6
                    py-3
                    text-right text-sm
                    font-semibold
                    text-gray-900
                  "
                  scope="col"
                ></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="transaction in props.recipes"
                :key="transaction.id"
                class="bg-white"
              >
                <td
                  class="
                    w-full
                    max-w-0
                    whitespace-nowrap
                    px-6
                    py-4
                    text-sm text-gray-900
                  "
                >
                  <div class="flex">
                    <router-link
                      :to="{
                        name: 'RecipeDetail',
                        params: { id: transaction.id },
                      }"
                      class="group inline-flex space-x-2 truncate text-sm"
                    >
                      <CircleStackIcon
                        class="
                          h-5
                          w-5
                          flex-shrink-0
                          text-gray-400
                          group-hover:text-gray-500
                        "
                        aria-hidden="true"
                      />
                      <p
                        class="truncate text-gray-500 group-hover:text-gray-900"
                      >
                        {{ transaction.name }}
                      </p>
                    </router-link>
                  </div>
                </td>
                <td
                  class="
                    whitespace-nowrap
                    px-6
                    py-4
                    text-right text-sm text-gray-500
                  "
                >
                  <time :datetime="transaction.createdAt">{{
                    moment(transaction.createdAt).format("ll")
                  }}</time>
                </td>
                <td>
                    <router-link
                      :to="{
                        name: 'RecipeDetail',
                        params: { id: transaction.id },
                      }"
                      class="group inline-flex space-x-2 truncate text-sm"
                    >
                  <ChevronRightIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                    </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Footer -->
          <nav
            class="
              flex
              items-center
              justify-between
              border-t border-gray-200
              bg-white
              px-4
              py-3
              sm:px-6
            "
            aria-label="Pagination"
          >
            <div class="flex flex-1 justify-between sm:justify-end">
              <router-link
                :to="{ name: 'RecipesMain' }"
                class="
                  relative
                  ml-3
                  inline-flex
                  items-center
                  rounded-md
                  border border-gray-300
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                "
                >Alle Rezepte</router-link
              >
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

import { CircleStackIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  recipes: Array,
});
</script>
