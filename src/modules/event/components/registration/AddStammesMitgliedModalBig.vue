<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform rounded-lg bg-white text-left shadow-xl transition-all w-full h-full"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <div
                    class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white"
                  >
                    <div>
                      <BaseField
                        component="Select"
                        :label="'Buchungsoption'"
                        techName="bookingOption"
                        v-model="state.bookingOption"
                        :errors="errors.bookingOption?.$errors"
                        :cols="6"
                        :lookupListDisplay="['name', 'price', '$ €']"
                        :items="bookingOptions"
                      />
                    </div>
                    <BaseField
                      component="Text"
                      :label="'Suche'"
                      techName="search"
                      v-model="searchInput"
                      hint="Suche nach deinen Mitgliedern."
                      :lookupListDisplay="['displayName']"
                    ></BaseField>
                  </div>
                  <table
                    class="w-full text-sm text-left rtl:text-right text-gray-500"
                  >
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" class="p-4">
                          <div class="flex items-center"></div>
                        </th>
                        <th scope="col" class="px-6 py-3">Name</th>
                        <th scope="col" class="px-6 py-3">Alter</th>
                        <th scope="col" class="px-6 py-3">Status</th>
                        <!-- <th scope="col" class="px-6 py-3">Action</th> -->
                      </tr>
                    </thead>
                    <tbody v-if="!isLoading">
                      <tr
                        v-for="(person, index) in persons"
                        :key="person.id"
                        class="bg-white border-b hover:bg-gray-50"
                      >
                        <td class="w-4 p-4">
                          <div class="flex items-center">
                            <input
                              id="checkbox-table-search-1"
                              type="checkbox"
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                              v-model="selectedPersons[index]"
                            />
                            <label for="checkbox-table-search-1" class="sr-only"
                              >checkbox</label
                            >
                          </div>
                        </td>
                        <th
                          scope="row"
                          class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                        >
                          <div class="ps-3">
                            <div class="text-base font-semibold">
                              {{ person.displayName }}
                            </div>
                            <div class="font-normal text-gray-500">
                              {{ person.user?.email || "" }}
                            </div>
                          </div>
                        </th>
                        <td class="px-6 py-4">
                          {{
                            (
                              -$dayjs(person.birthday).diff($dayjs()) /
                              (60 * 60 * 24 * 1000 * 365)
                            ).toFixed(0)
                          }}
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr v-if="!isLoading && persons.length === 0">
                        <td colspan="4" class="text-center py-4">
                          Keine Ergebnisse
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr v-if="isLoading">
                        <td colspan="4" class="text-center py-4">
                          <LoadingItem />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <PrimaryButton
                  @click="onButtonClicked"
                  label="Anmelden"
                  :isLoading="isLoading"
                />
                <SecondaryButton
                  class="mx-2"
                  :isLoading="isLoading"
                  label="Abbrechen"
                  @click="close"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { debounce } from "lodash";
import BaseField from "@/components/field/Base.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { UserMinusIcon } from "@heroicons/vue/24/outline";
import PrimaryButton from "@/components/button/Primary.vue";
import SecondaryButton from "@/components/button/Secondary.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  sameAs,
  email,
  helpers,
} from "@vuelidate/validators";

const props = defineProps({
  open: { type: Boolean, required: true },
  header: {
    type: String,
    required: false,
    default: "Stammesmitglied hinzufügen",
  },
  text: {
    type: String,
    required: false,
    default:
      "Wähle das Stammesmitglied aus, welches zu dieser Veranstaltung hinzugeügt werden soll.",
  },
  callbackOnConfirm: { type: Function, required: true },
  callbackOnCancel: { type: Function, required: true },
});
function close() {
  props.callbackOnCancel();
}

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

function onButtonClicked() {
  errors.value.$validate();
  console.log(errors);

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  isLoading.value = true;

  let list = [];

  selectedPersons.value.forEach((selected, index) => {
    if (selected) {
      persons.value[index].bookingOption = state.bookingOption;
      list.push(persons.value[index]);
    }
  });
  props.callbackOnConfirm(list);
}

const state = reactive({
  bookingOption: null,
});

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const bookingOptions = computed(() => {
  return eventStore.bookingOptions;
});

const rules = {
  bookingOption: {
    required,
  },
};

import { usePersonStore } from "@/modules/person/store/index";
const personStore = usePersonStore();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);

const route = useRoute();

const searchInput = ref("");

function reset() {
  searchInput.value = "";
  selectedPersons.value = [];
  state.bookingOption = bookingOptions.value[0];
  isLoading.value = false;
}

watch(searchInput, (searchInput) => {
  updateData({ search: searchInput });
});

watch(
  () => props.open,
  (newValue) => {
    reset();
  }
);

function updateData(searchQuery) {
  const id = route.params.id;
  if (id) {
    search(searchQuery);
  }
}

const isLoading = ref(true);
const persons = ref([]);
const selectedPersons = ref([]);

const results = ref([]);
const search = debounce(async (searchQuery) => {
  isLoading.value = true;
  let response = await personStore.fetchAddable(searchQuery);
  persons.value = response.results;
  isLoading.value = false;
}, 1000);

function setInitData() {
  state.bookingOption = bookingOptions.value[0];
}

onMounted(async () => {
  const unknownId = route.params.id;
  let eventId = "";
  // check if it is a registrationId
  await Promise.all([eventStore.fetchRegistration(unknownId)]).then(
    (response) => {
      if (
        response &&
        response[0] &&
        response[0].data &&
        response[0].data.event
      ) {
        eventId = response[0].data.event.id;
      } else {
        eventId = unknownId;
      }
    }
  );
  await Promise.all([eventStore.fetchBookingOptionsById(eventId)]);
  setInitData();
  updateData("");
});
</script>
