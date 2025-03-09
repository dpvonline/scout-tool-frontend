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
                  <div v-if="props.blockBookingOption && state.bookingOption">
                    Buchungstyp {{ `${state.bookingOption?.name} ${state.bookingOption?.price}€` }}
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
                    <div>
                      Die folgenden Angaben sind nur für Teilnehmer der DPBM Bundesfahrt nach Nordmazedonien wichtig und können von allen anderen ignoriert werden.
                      Die Angabe der Information ist freiwillig. Allerdings wird die Personalausweis- / Reisepassnummer für die Dt. Botschaft benötigt und müssen daher bei der Lagerleitung abgebenen werden.
                      Die Lagerleitung sind die einzigen, die darauf Zugriff haben.
                    </div>
                    <BaseField
                        component="Text"
                        :label="'Personalausweis- oder Reisepass- Nummer'"
                        techName="idNumber"
                        v-model="state.idNumber"
                        :errors="errors.idNumber?.$errors"
                        :cols="6"
                    />
                    <BaseField
                        component="Text"
                        :label="'Pfadfinderstufe (Wölfing, Sippling, Rover)'"
                        techName="scoutLevel"
                        v-model="state.scoutLevel"
                        :errors="errors.scoutLevel?.$errors"
                        :cols="6"
                    />
                    <BaseField
                        component="Text"
                        :label="'Pfadfinderfunktion (z.B. Stammeführung, Sippenführung, Meutenführung, etc.)'"
                        techName="scoutFunction"
                        v-model="state.scoutFunction"
                        :errors="errors.scoutFunction?.$errors"
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
import { reactive, computed, ref } from "vue";
import moment from "moment";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import BaseField from "@/components/field/Base.vue";

import { useVuelidate } from "@vuelidate/core";
import {
  required,
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

import { useRoute } from "vue-router";

const route = useRoute();

const zipCheck = async (value) => {
  if (!value || value == "") {
    return false;
  }
  return !(await registerStore.zipCheck(value));
};

const checkPersonRemote = async (regId, person) => {
  if (!person || !person.firstName || !person.lastName || !person.birthday) {
    return 'Pflichtfleder fehlen';
  }
  return await registerStore.checkPerson(regId, person);
};

const checkPersonLocal = (person) => {
  let returnVal = false;
  eventRegisterStore.registerPerson.forEach((element) => {
    if (
      element.firstName == person.firstName &&
      element.lastName == person.lastName &&
      element.birthday == person.birthday
    ) {
      returnVal = "Du hast die Person grade bereits angemeldet. War das ein Fehler?";
    }
  });
  return returnVal;
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
    maxDateCustom: helpers.withMessage(
      "Die Person muss jünger als 100 Jahre sein.",
      function (value) {
        return new Date(value) >= new Date("1945-01-01");
      }
    ),
    minDateCustom: helpers.withMessage(
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
    required: helpers.withMessage("Du musst eine Buchungsoption auswählen.", required),
  },
  idNumber: {},
  scoutLevel: {},
  scoutFunction: {},
};

const state = reactive({
  id: null,
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
  idNumber: null,
  scoutLevel: null,
  scoutFunction: null,
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
  const regId = route.params.id;
  errors.value.$validate();
  if (errors.value.$error) {
    errors.value.$errors.forEach(error => {
      commonStore.showError(error.$message);
    });
    return;
  }

  const checkPersonLocalState = checkPersonLocal(state);

  if (checkPersonLocalState) {
    commonStore.showError(checkPersonLocalState);
    return;
  }

  checkPersonRemote(regId, state).then((response) => {
    if (response) {
      commonStore.showError(response);
      return;
    } else {
      props.callbackOnConfirm(state);
    }
  });
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

import {usePersonalDataStore} from "@/modules/settings/store/personal-data";

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
  if (bookingOptionId?.id) {
    return bookingOptionId;
  } else if(Number.isInteger(bookingOptionId)){
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
    },
);

function resetData() {
  state.allowPermanently = true;
  state.firstName = null;
  state.lastName = null;
  state.scoutName = null;
  state.gender = "N";
  state.address = null;
  state.eatHabit = null;
  state.idNumber = null;
  state.scoutLevel = null;
  state.scoutFunction = null;
  state.bookingOption = bookingOptions.value[0];
  state.zipCode = personalDataStore?.personalData?.scoutGroup?.zipCode?.zipCode;
  state.birthday = moment().add(-10, "y").format("YYYY-MM-DD");
}

function initData(eatHabits) {
  if (
    props.open &&
    props.person &&
    props.person !== {} &&
    (props.person.storeId ||props.person.id)) {
    state.id = props.person.storeId || props.person.id;
    state.firstName = props.person.firstName;
    state.lastName = props.person.lastName;
    state.scoutName = props.person.scoutName;
    state.address = props.person.address;
    state.birthday = moment(props.person.birthday).format("YYYY-MM-DD");
    state.bookingOption = getBookingObj(props.person.bookingOption);
    state.zipCode = getZipCodeString(props.person.zipCode);
    state.eatHabit = props.person.eatHabit;
    state.gender = getGenderValue(props.person.gender);
    state.idNumber = props.person.idNumber;
    state.scoutLevel =  props.person.scoutLevel;
    state.scoutFunction = props.person.scoutLevel;
  } else {
    resetData();
  }

}
</script>
