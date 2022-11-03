<template>
  <TabPanel class="space-y-12 px-4 py-3">
    <div>
      <div class="mt-5">
        <div
          class="
            px-4
            sm:flex sm:items-center sm:justify-between sm:px-6
            lg:px-8
          "
        >
          <div class="min-w-0 flex-1">
            <h3 class="text-lg font-medium text-gray-900">Portionen von {{ ingredientDetail.name }}</h3>
            <p class="ml-3 max-w-2xl text-sm text-gray-500">
              Mögliche Auswahlen für eine Zutat
            </p>
          </div>
          <div class="mt-4 flex-2 sm:mt-0 sm:ml-4">
            <PrimaryButton
              color="blue"
              label="Portion hinzufügen"
              @click="onNewPortionClicked"
            />
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle">
              <div
                class="
                  overflow-hidden
                  shadow-sm
                  ring-1 ring-black ring-opacity-5
                "
              >
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="
                          py-3.5
                          pl-4
                          pr-3
                          text-left text-sm
                          font-semibold
                          text-gray-900
                          sm:pl-6
                          lg:pl-8
                        "
                      >
                        Name der Portion
                      </th>
                      <th
                        scope="col"
                        class="
                          px-3
                          py-3.5
                          text-left text-sm
                          font-semibold
                          text-gray-900
                        "
                      >
                        Gewicht
                      </th>
                      <th
                        scope="col"
                        class="
                          px-3
                          py-3.5
                          text-left text-sm
                          font-semibold
                          text-gray-900
                        "
                      >
                        Prioität
                      </th>
                      <th
                        scope="col"
                        class="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                      >
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="person in portions" :key="person.email">
                      <td
                        class="
                          whitespace-nowrap
                          py-4
                          pl-4
                          pr-3
                          text-sm
                          font-medium
                          text-gray-900
                          sm:pl-6
                          lg:pl-8
                        "
                      >
                        {{ person.name }}
                      </td>
                      <td
                        class="
                          whitespace-nowrap
                          px-3
                          py-4
                          text-sm text-gray-500
                        "
                      >
                        {{ person.weightG }} g
                      </td>
                      <td
                        class="
                          whitespace-nowrap
                          px-3
                          py-4
                          text-sm text-gray-500
                        "
                      >
                        {{ person.rank }}.
                      </td>
                      <td
                        class="
                          relative
                          whitespace-nowrap
                          py-4
                          pl-3
                          pr-4
                          text-right text-sm
                          font-medium
                          sm:pr-6
                          lg:pr-8
                        "
                      >
                        <a href="#" class="text-blue-600 hover:text-blue-900"
                          >Bearbeiten<span class="sr-only"
                            >, {{ person.name }}</span
                          ></a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TabPanel>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { TabPanel } from "@headlessui/vue";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { useIngredientStore } from "@/modules/ingredient/store/index.ts";
import PrimaryButton from "@/components/button/Primary.vue";

const route = useRoute();
const store = useIngredientStore();

const portions = computed(() => {
  return store.portions;
});

const ingredientDetail = computed(() => {
  return store.ingredientDetail;
});

function onNewPortionClicked() {
}

// onMounted(() => {
//   const id = route.params.id;
//   store.fetchPortions({ ingredient__id: id });
// });
</script>