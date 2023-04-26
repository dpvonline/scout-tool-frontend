<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" @close="close" class="relative z-10">
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
          class="relative inset-0 z-100 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
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
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="mt-4 space-y-4">
                  <BaseField
                    component="Toggle"
                    :label="'Person dauerhaft speichern'"
                    techName="allowPermanently"
                    v-model="state.allowPermanently"
                    :errors="errors.allowPermanently?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Text"
                    :label="'Vorname'"
                    techName="firstName"
                    v-model="state.firstName"
                    :errors="errors.firstName?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Text"
                    :label="'Nachname'"
                    techName="lastName"
                    v-model="state.lastName"
                    :errors="errors.lastName?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Text"
                    :label="'Fahrtenname'"
                    techName="scoutName"
                    v-model="state.scoutName"
                    :errors="errors.scoutName?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Date"
                    :label="'Geburtstag'"
                    techName="birthday"
                    v-model="state.birthday"
                    :errors="errors.birthday?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Radio"
                    :label="'Geschlecht'"
                    techName="gender"
                    v-model="state.gender"
                    :errors="errors.gender?.$errors"
                    :choices="[
                      { id: 'F', title: 'weiblich' },
                      { id: 'M', title: 'männlich' },
                      { id: 'D', title: 'divers' },
                      { id: 'N', title: 'keine Angabe' },
                    ]"
                    hint="Wir brauchen dein Geschlecht für Anmeldungen bei Veranstaltungen."
                    :cols="6"
                  />
                  <BaseField
                    component="Text"
                    :label="'Straße und Hausnummer*'"
                    techName="street"
                    v-model="state.street"
                    :errors="errors.street?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Text"
                    :label="'Postleitzahl'"
                    techName="zipCode"
                    v-model="state.zipCode"
                    :errors="errors.zipCode?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="AutoCompleteMulti"
                    :label="'Essenbesonderheiten'"
                    techName="eatHabit"
                    v-model="state.eatHabit"
                    :errors="errors.eatHabit?.$errors"
                    :items="eatHabitMappings2"
                    :cols="6"
                  />
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
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="onButtonSaveClicked"
                >
                  Speichern
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="close"
                  ref="cancelButtonRef"
                >
                  Abbrechen
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import BaseField from "@/components/field/Base.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, helpers } from "@vuelidate/validators";

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const rules = {
  allowPermanently: {
    required,
  },
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  scoutName: {},
  birthday: {
    required,
  },
  gender: {
    required,
  },
  street: {
    required,
  },
  zipCode: {
    required,
  },
  eatHabit: {},
  bookingOption: {
    required,
  },
};

const state = reactive({
  allowPermanently: true,
  firstName: null,
  lastName: null,
  scoutName: null,
  gender: "N",
  street: null,
  zipCode: null,
  eatHabit: [],
  bookingOption: null,
});

const genderMappings = computed(() => {
  return registerStore.genderMappings;
});

const eatHabitMappings = computed(() => {
  debugger;
  return registerStore.eatHabitMappings.filter(item => item.public === true);
});

const eatHabitMappings2 = computed(() => {
  if (registerStore.eatHabitMappings && registerStore.eatHabitMappings.length) {
    let arr = JSON.parse(JSON.stringify(registerStore.eatHabitMappings));
    arr.forEach(function (data) {
      data["value"] = data["id"];
      data["label"] = data["name"];
      delete data["id"];
      delete data["name"];
    });
    return arr;
  } else {
    return [];
  }
});

const bookingOptions = computed(() => {
  return eventStore.bookingOptions;
});

const v$ = useVuelidate(rules, state);
const errors = ref(v$);

const props = defineProps({
  open: { type: Boolean, required: true },
  person: { type: Object, required: false, default: {} },
  callbackOnConfirm: { type: Function, required: true },
  callbackOnCancel: { type: Function, required: true },
});
function close() {
  props.callbackOnCancel();
}
function onButtonSaveClicked() {
  errors.value.$validate();
  console.log(errors.value);
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  props.callbackOnConfirm(state);
}

onUpdated(() => {
  if (props.open && props.person && props.person != {} && props.person.id) {
    state.id = props?.person.id;
    state.firstName = props?.person.firstName;
    state.lastName = props?.person.lastName;
    state.scoutName = props?.person.scoutName;
    state.street = props?.person.address;
    state.birthday = props?.person.birthday;
    state.zipCode = props?.person.zipCode?.zipCode;
    state.eatHabit = props?.person.eatHabit;
    state.gender = genderMappings.value.find(
      (a) => a["name"] === props?.person.gender
    ).value;
  }
});
</script>