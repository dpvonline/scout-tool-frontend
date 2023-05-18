<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="relative z-100" @close="close">
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
              class="relative transform z-100 rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <UserPlusIcon
                      class="h-6 w-6 text-green-600"
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
                        class="z-15"
                        component="AutoCompleteRemote"
                        :label="'Benutzer'"
                        techName="scoutGroup"
                        v-model="state.user"
                        :errors="errors.user?.$errors"
                        :items="inevitableMembers"
                        @updateSearch="inevitableMembersUpdateSearch"
                        hint="Wähle einen User ein, den du hinzufügen willst."
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
                  label="Hinzufügen"
                  :isLoading="isLoading"
                >
                </PrimaryButton>
                <SecondaryButton
                  class="mx-2"
                  :isLoading="isLoading"
                  label="Abbrechen"
                  @click="close"
                >
                </SecondaryButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch } from "vue";
import { debounce } from "lodash";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ExclamationTriangleIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/outline";
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
  header: { type: String, required: false, default: "Anftrag Senden" },
  text: {
    type: String,
    required: false,
    default:
      "Willst du an den Admin der Gruppen einen antrag auf aufnahme schicken?",
  },
  callbackOnConfirm: { type: Function, required: true },
  callbackOnCancel: { type: Function, required: true },
});
function close() {
  isLoading.value = true;
  props.callbackOnCancel();
}
function onButtonClicked() {
  errors.value.$validate();

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  isLoading.value = true;
  props.callbackOnConfirm(state.user.id);
}

const state = reactive({
  user: 0,
});

const rules = {
  user: {
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

const inevitableMembers = computed(() => {
  return groupStore.inevitableMembers;
});

function updateData(searchQuery) {
  const id = route.params.id;
  if (id) {
    search(id, searchQuery);
  }
}

const isLoading = ref(true);

watch(
  () => props.open,
  (newValue) => {
    isLoading.value = false;
  }
);

const results = ref([]);
const search = debounce(async (id, searchQuery) => {
  isLoading.value = true;
  let { data } = groupStore.fetchInevitableMembersById(id, searchQuery);
  isLoading.value = false;
}, 1000);

function inevitableMembersUpdateSearch(searchQuery) {
  updateData(searchQuery);
}

onMounted(() => {
  updateData("");
});
</script>
