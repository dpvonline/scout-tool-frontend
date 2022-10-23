<template>
  <div class="h-full">
    <div class="flex flex-1 flex-col 2xl:pa-64">
      <main class="flex-1 pb-8">
        <div class="mt-8">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg font-medium leading-6 text-gray-900">
              Zusammenfassung
            </h2>
            <div
              class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <!-- Card -->
              <div
                v-for="card in cards"
                :key="card.name"
                class="overflow-hidden rounded-lg bg-white shadow"
              >
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <component
                        :is="card.icon"
                        class="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="truncate text-sm font-medium text-gray-500">
                          {{ card.name }}
                        </dt>
                        <dd>
                          <div class="text-lg font-medium text-gray-900">
                            {{ card.amount }}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-5 py-3">
                  <div class="text-sm">
                    <router-link
                      :to="{ name: card.href, params: { id: 1 } }"
                      class="font-medium text-blue-700 hover:text-blue-900"
                      >Anzeigen</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2
            class="
              mx-auto
              mt-8
              max-w-6xl
              px-4
              text-lg
              font-medium
              leading-6
              text-gray-900
              sm:px-6
              lg:px-8
            "
          >
            Neuesten Rezepte
          </h2>

          <!-- Activity list (smallest breakpoint only) -->
          <div class="shadow sm:hidden">
            <ul
              role="list"
              class="
                mt-2
                divide-y divide-gray-200
                overflow-hidden
                shadow
                sm:hidden
              "
            >
              <li v-for="transaction in recipes" :key="transaction.id">
                <router-link
                  :to="{ name: 'RecipeDetail', params: { id: transaction.id } }"
                  class="block bg-white px-4 py-4 hover:bg-gray-50"
                >
                  <span class="flex items-center space-x-4">
                    <span class="flex flex-1 space-x-2 truncate">
                      <BanknotesIcon
                        class="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span
                        class="flex flex-col truncate text-sm text-gray-500"
                      >
                        <span class="truncate">{{ transaction.name }}</span>
                        <span
                          ><span class="font-medium text-gray-900">{{
                            transaction.amount
                          }}</span>
                          {{ transaction.currency }}</span
                        >
                        <time :datetime="transaction.datetime">{{
                          transaction.date
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
                          Transaction
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
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                      <tr
                        v-for="transaction in recipes"
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
                            <a
                              :href="transaction.href"
                              class="
                                group
                                inline-flex
                                space-x-2
                                truncate
                                text-sm
                              "
                            >
                              <BanknotesIcon
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
                                class="
                                  truncate
                                  text-gray-500
                                  group-hover:text-gray-900
                                "
                              >
                                {{ transaction.name }}
                              </p>
                            </a>
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
                          <span class="font-medium text-gray-900">{{
                            transaction.amount
                          }}</span>
                          {{ transaction.currency }}
                        </td>
                        <td
                          class="
                            hidden
                            whitespace-nowrap
                            px-6
                            py-4
                            text-sm text-gray-500
                            md:block
                          "
                        >
                          <span
                            :class="[
                              statusStyles[transaction.status],
                              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                            ]"
                            >{{ transaction.status }}</span
                          >
                        </td>
                        <td
                          class="
                            whitespace-nowrap
                            px-6
                            py-4
                            text-right text-sm text-gray-500
                          "
                        >
                          <time :datetime="transaction.datetime">{{
                            transaction.date
                          }}</time>
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
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/20/solid";

import { useRecipeStore } from "@/modules/recipe/store/index.ts";

const recipeStore = useRecipeStore();

const recipes = computed(() => {
  return recipeStore.recipes.slice(0, 5);
});

const cards = [
  { name: "Rezepte", href: "RecipesMain", icon: ScaleIcon, amount: "30" },
  { name: "Zutaten", href: "IngredientMain", icon: ScaleIcon, amount: "169" },
  { name: "Infos", href: "FaqMain", icon: ScaleIcon, amount: "4" },
  // More items...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

const sidebarOpen = ref(false);

onMounted(() => {
  recipeStore.fetchRecipes();
});
</script>