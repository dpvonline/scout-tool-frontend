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
              class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <UserMinusIcon
                      class="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900"
                      >{{ props.header }}</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ props.text }}
                      </p>
                      <BaseField
                        component="AutoCompleteRemote"
                        :label="'Stammesmitglied'"
                        techName="person"
                        v-model="state.person"
                        :errors="errors.person?.$errors"
                        :items="persons"
                        @updateSearch="fetchPersons"
                        hint="Wähle das anzumeldene Stammesglied aus."
                        :lookupListDisplay="['displayName']"
                      />
                    </div>
                  </div>
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

<script setup>
import { ref } from "vue";
import { debounce } from "lodash";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { UserMinusIcon } from "@heroicons/vue/24/outline";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import SecondaryButton from "@/components/button/Secondary.vue";
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
  header: { type: String, required: false, default: "Stammesmitglied hinzufügen" },
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
function onButtonClicked() {
  errors.value.$validate();
  console.log(errors);

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  props.callbackOnConfirm(state.person);
}

const state = reactive({
  person: null,
});

const rules = {
  person: {
    required,
  },
};

import { usePersonStore } from "@/modules/person/store/index";
const personStore = usePersonStore();

import { useGroupStore } from "@/modules/group/store/index";
const groupStore = useGroupStore();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);

const route = useRoute();


function updateData(searchQuery) {
  const id = route.params.id;
  if (id) {
    search(id, searchQuery);
  }
}

const isLoading = ref(true);
const persons = ref([]);

watch(
  () => props.open,
  (newValue) => {
    isLoading.value = false;
  }
);

const results = ref([]);
const search = debounce(async (id, searchQuery) => {
  isLoading.value = true;
  let data = await personStore.fetchPersons(id, searchQuery);
  persons.value = data.results;
  isLoading.value = false;
}, 1000);

function fetchPersons(searchQuery) {
  updateData(searchQuery);
}

onMounted(() => {
  updateData("");
});
</script>
