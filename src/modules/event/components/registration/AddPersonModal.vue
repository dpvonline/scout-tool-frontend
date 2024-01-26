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
                    v-if="!props.blockBookingOption"
                    component="Select"
                    :label="'Buchungsoption'"
                    techName="bookingOption"
                    v-model="state.bookingOption"
                    :errors="errors.bookingOption?.$errors"
                    :cols="6"
                    :lookupListDisplay="['name', 'price', '$ €']"
                    :items="bookingOptions"
                    hint="Wähle die Buchungsoption aus, die du für diese Person buchen möchtest."
                  />
                  <div v-if="props.blockBookingOption">
                    Buchungstyp {{ `${state.bookingOption.name} ${state.bookingOption.price}€` }}
                  </div>
                  <div v-if="props.blockBookingOption">
                    Buchungstypen sind nicht veränderbar
                  </div>
                  <BaseField
                    v-if="!state.id"
                    component="Toggle"
                    :label="'Person dauerhaft speichern'"
                    techName="allowPermanently"
                    v-model="state.allowPermanently"
                    :errors="errors.allowPermanently?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Text"
                    :label="'Vorname*'"
                    techName="firstName"
                    v-model="state.firstName"
                    :errors="errors.firstName?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Text"
                    :label="'Nachname*'"
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
                    :label="'Geburtstag*'"
                    techName="birthday"
                    v-model="state.birthday"
                    :errors="errors.birthday?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Radio"
                    :label="'Geschlecht*'"
                    techName="gender"
                    v-model="state.gender"
                    :errors="errors.gender?.$errors"
                    :choices="[
                      { id: 'F', name: 'weiblich' },
                      { id: 'M', name: 'männlich' },
                      { id: 'D', name: 'divers' },
                      { id: 'N', name: 'keine Angabe' },
                    ]"
                    hint="Wir brauchen dein Geschlecht für Anmeldungen bei Veranstaltungen."
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
                    component="Text"
                    :label="'Straße und Hausnummer*'"
                    techName="address"
                    v-model="state.address"
                    :errors="errors.address?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Text"
                    :label="'Postleitzahl*'"
                    techName="zipCode"
                    v-model="state.zipCode"
                    :errors="errors.zipCode?.$errors"
                    :cols="6"
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
import moment from "moment";
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
import {
  required,
  minLength,
  sameAs,
  email,
  helpers,
} from "@vuelidate/validators";

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

const zipCheck = async (value) => {
  if (!value || value == "") {
    return false;
  }
  return !(await registerStore.zipCheck(value));
};

const rules = {
  allowPermanently: {
    required,
  },
  firstName: {
    required: helpers.withMessage("Du musst ein Vornamen angeben.", required),
  },
  lastName: {
    required: helpers.withMessage("Du musst ein Nachnamen angeben.", required),
  },
  scoutName: {},
  birthday: {
    required,
    minDateCustom: helpers.withMessage(
      "Die Person muss jünger als 100 Jahre sein.",
      function (value) {
        return new Date(value) >= new Date("1945-01-01");
      }
    ),
    mminDateCustom: helpers.withMessage(
      "Die Person muss bereits geboren sein.",
      function (value) {
        return new Date(value) <= new Date();
      }
    ),
  },
  gender: {
    required: helpers.withMessage("Du musst eine Auswahl treffen.", required),
  },
  address: {
    required: helpers.withMessage(
      "Du eine Straße mit Hausnummer angeben.",
      required
    ),
  },
  city: {},
  zipCode: {
    validPLZ: helpers.withMessage(
      "Bitte gib eine gültige Postleitzahl an.",
      function (value) {
        return /^[0-9]{5}$/.test(value);
      }
    ),
    required: helpers.withMessage(
      "Du musst eine gültige Postleitzahl angeben.",
      required
    ),
    metBackendRules1: helpers.withMessage(
      "Diese Postleitzahl ist nicht gültig.",
      helpers.withAsync(zipCheck)
    ),
  },
  eatHabit: {},
  bookingOption: {
    required: helpers.withMessage("Du musst eine Auswahl treffen.", required),
  },
};

const state = reactive({
  allowPermanently: true,
  firstName: null,
  lastName: null,
  scoutName: null,
  gender: "N",
  address: null,
  zipCode: null,
  eatHabit: null,
  bookingOption: null,
  city: null,
});

const genderMappings = computed(() => {
  return registerStore.genderMappings;
});

const eatHabitMappings = computed(() => {
  return registerStore.eatHabitMappings.filter((item) => item.public === true);
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
  blockBookingOption: { type: Boolean, required: false, default: false },
});
function close() {
  props.callbackOnCancel();
}
function onButtonSaveClicked() {
  errors.value.$validate();
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  props.callbackOnConfirm(state);
}

function getGenderValue(genderString) {
  let genderValue = "";
  let genderName = "";
  if (!genderString) {
    return null;
  }
  genderValue = genderMappings.value.find((a) => a["value"] === genderString);

  if (genderValue && genderValue.value) {
    return genderValue.value;
  }
  genderName = genderMappings.value.find((a) => a["name"] === genderString);
  if (genderName && genderName.value) {
    return genderName.value;
  }
  return null;
}

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
const personalDataStore = usePersonalDataStore();

const personalData = computed(() => {
  return personalDataStore.personalData;
});

function getZipCodeString(zipCodeData) {
  if (!zipCodeData) {
    return null;
  }

  if (zipCodeData && zipCodeData.zipCode) {
    return zipCodeData.zipCode;
  }

  return zipCodeData;
}

function getBookingObj(bookingOptionId) {
  let tempId = bookingOptionId;
  if (bookingOptionId?.id) {
    tempId = bookingOptionId.id;
  }
  if (tempId) {
    return bookingOptions.value.find((a) => a["id"] === tempId);
  }
  return bookingOptions.value[0];
}

function getEatHabits(eatHabits) {
  if (eatHabits) {
    let arr = JSON.parse(JSON.stringify(eatHabits));
    const newArr = arr.map(
      (a) => eatHabitMappings2.value.find((item) => item.label == a)["value"]
    );
    return newArr;
  }
  return [];
}

watch(
  () => props.open,
  (newValue) => {
    if (newValue) {
      resetData();
      initData();
    }
  }
);

function resetData() {
  state.allowPermanently = true;
  state.firstName = null;
  state.lastName = null;
  state.scoutName = null;
  state.gender = "N";
  state.address = null;
  state.eatHabit = null;
  state.bookingOption = bookingOptions.value[0];
  state.zipCode = personalDataStore?.personalData?.scoutGroup?.zipCode?.zipCode;
  state.birthday = moment().add(-10, "y").format("YYYY-MM-DD");
}

function initData(eatHabits) {
  state.id = null;
  if (
    props.open &&
    props.person &&
    props.person != {} &&
    props.person.storeId
  ) {
    state.storeId = props?.person.storeId;
    state.firstName = props?.person.firstName;
    state.lastName = props?.person.lastName;
    state.scoutName = props?.person.scoutName;
    state.address = props?.person.address;
    state.birthday = moment(props?.person.birthday).format("YYYY-MM-DD");
    state.bookingOption = getBookingObj(props?.person.bookingOption);
    state.zipCode = getZipCodeString(props?.person.zipCode);
    state.eatHabit = props?.person?.eatHabit;
    state.gender = getGenderValue(props?.person?.gender);
  } else if (
    props.open &&
    props.person &&
    props.person != {} &&
    props.person.id
  ) {
    state.id = props?.person.id;
    state.firstName = props?.person.firstName;
    state.lastName = props?.person.lastName;
    state.scoutName = props?.person.scoutName;
    state.address = props?.person.address;
    state.birthday = moment(props?.person.birthday).format("YYYY-MM-DD");
    state.bookingOption = getBookingObj(props?.person.bookingOption);
    state.zipCode = getZipCodeString(props?.person.zipCode);
    state.eatHabit = getEatHabits(props?.person?.eatHabit);
    state.gender = getGenderValue(props?.person?.gender);
  } else {
    resetData();
  }
}
</script>
