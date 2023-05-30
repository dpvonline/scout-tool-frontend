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
                    component="Number"
                    :label="'Anzahl Personen'"
                    techName="numberPersons"
                    v-model="state.numberPersons"
                    :errors="errors.numberPersons?.$errors"
                    :cols="6"
                  />
                  <BaseField
                    component="Select"
                    :label="'Reiseart'"
                    techName="typeField"
                    v-model="state.typeField"
                    :errors="errors.typeField?.$errors"
                    :cols="6"
                    :items="travelTypeChoices"
                    hint="Wähle die Art des Reisemittels aus."
                    :lookupListDisplay="['name']"
                  />
                  <BaseField
                    component="DateTime"
                    :label="'Uhrzeit'"
                    techName="dateTimeField"
                    v-model="state.dateTimeField"
                    :errors="errors.dateTimeField?.$errors"
                    :cols="6"
                    hint="Um wieviel Uhr kommt ihr an?"
                  />
                  <BaseField
                    component="Text"
                    :label="getDescriptionText"
                    techName="description"
                    v-model="state.description"
                    :errors="errors.description?.$errors"
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
import { required, sameAs, helpers } from "@vuelidate/validators";

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const rules = {
  numberPersons: {
    required,
  },
  typeField: {
    required,
  },
  dateTimeField: {
    required,
  },
  description: {
    required,
  },
};

const state = reactive({
    numberPersons: null,
    typeField: null,
    dateTimeField: null,
    description: ''
});

const genderMappings = computed(() => {
  return eventRegisterStore.genderMappings;
});

const travelTypeChoices = computed(() => {
  return eventStore.travelTypeChoices;
});

const bookingOptions = computed(() => {
  return eventStore.bookingOptions;
});

const event = computed(() => {
  return eventStore._event;
});

const getDescriptionText = computed(() => {
  switch (state.typeField?.value) {
    case 'T': {
      return "Welcher Bahnhof";
      break;
    }
    case 'B': {
      return "Welche Reisegesellschaft?";
      break;
    }
    case 'C': {
      return "Wieviele Autos?'";
      break;
    }
    default: {
      return "Wie reist du an?";
      break;
    }
  }
  return 'Döner'
});

const v$ = useVuelidate(rules, state);
const errors = ref(v$);

const props = defineProps({
  open: { type: Boolean, required: true },
  travel: { type: Object, required: false, default: {} },
  callbackOnConfirm: { type: Function, required: true },
  callbackOnCancel: { type: Function, required: true },
});
function close() {
  props.callbackOnCancel();
}
function onButtonSaveClicked() {
  errors.value.$validate();
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
  }

  props.callbackOnConfirm(state);
}

function getTravelTypeObj(value) {
  return travelTypeChoices.value.find((a) => a["value"] === value);
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
    state.numberPersons = eventRegisterStore.registerPersonCount;
    state.typeField = travelTypeChoices.value[0]
    state.dateTimeField = moment(eventRegisterStore.event.startDate).format('YYYY-MM-DDTHH:mm');
    state.description = '';
}

function initData(eatHabits) {
  state.id = null;
  if (
    props.open &&
    props.travel &&
    props.travel != {} &&
    props.travel.storeId
  ) {
    state.storeId = props?.travel?.storeId;
    state.numberPersons = props?.travel?.numberPersons;
    state.typeField = props?.travel?.typeField;
    state.dateTimeField = moment(props?.travel?.dateTimeField).format('YYYY-MM-DDTHH:mm');
    state.description = props?.travel?.description;
  } else if (
    props.open &&
    props.travel &&
    props.travel != {} &&
    props.travel.id
  ) {
    state.id = props?.travel.id;
    state.numberPersons = props?.travel?.numberPersons;
    state.typeField = getTravelTypeObj(props?.travel?.typeField)
    state.dateTimeField = moment(props?.travel?.dateTimeField).format('YYYY-MM-DDTHH:mm');
    state.description = props?.travel?.description;
  } else {
    resetData();
  }
};
</script>
