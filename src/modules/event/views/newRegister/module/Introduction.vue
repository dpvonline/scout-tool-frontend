<template>
  <StepFrame
    :header="`Anmeldung ${event.name}`"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
  >
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Du musst die Registrierung bis zum
        {{ moment(event?.registrationDeadline).format(format1) }} absenden.
      </legend>
      <div class="px-4 py-6 sm:px-6 md:px-0">
        <h2 class="text-lg font-medium text-red-600">Wichtig</h2>
        <p class="mt-1 text-sm text-gray-500">
          Am Ende bekommst du eine Bestätigungs-Email. Nur mit dieser E-Mail ist
          deine Anmeldung erfolgreich abgeschlossen.
        </p>
        <p class="mt-1 text-sm text-gray-500">
          Du kannst deine Anmeldung nach dem Absenden noch bis zum
          {{ moment(event?.registrationDeadline).format(format1) }}
          <b>verändern </b> und jederzeit angucken.
        </p>
      </div>
      <div class="mt-4 space-y-4">
        <p class="text-sm text-gray-800 mt-4">
          Diese Anmeldung ist auf der Ebene:
          <b>{{ event?.registrationLevel?.name }}</b>
        </p>
        <BaseField
          component="AutoComplete"
          :label="'Gruppe*'"
          techName="scoutGroup"
          v-model="state.scoutGroup"
          :errors="errors.scoutGroup?.$errors"
          :items="registerStore.scoutGroupMappings"
          hint="Suche dir die Gruppe aus, die du anmelden willst."
          :lookupListDisplay="['name']"
          :cols="12"
        />
      </div>
      <p
        v-html="props.step?.description"
        class="text-lg text-gray-800 my-4"
      ></p>
      <div class="mt-4 space-y-4">
        <div
          v-for="attribute in currentAttributes"
          class="mt-4 space-y-4"
          :key="attribute.id"
        >
          <BaseField
            :component="getComponentType(attribute.fieldType)"
            :label="attribute.title"
            :techName="`value_${attribute.id}`"
            v-model="state[`value_${attribute.id}`]"
            :cols="12"
            :hint="attribute.text"
            :errors="errors[`value_${attribute.id}`]?.$errors"
          />
        </div>
      </div>
    </fieldset>
  </StepFrame>
</template>

<script setup lang="ts">
import moment from "moment";
import { reactive, computed, ref, onMounted } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

import { useEventStore } from "@/modules/event/store/index";
const eventStore = useEventStore();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
const personalDataStore = usePersonalDataStore();

const props = defineProps({
  step: Object,
});

const format1 = "DD.MM.YYYY";

const route = useRoute();

const state = reactive({
  hasConfirmed: false,
  scoutGroup: null,
});

function checked(value) {
  return value === true;
}

const currentModuleId = computed(() => {
  try {
    return eventStore.event.eventmoduleSet.find(
      (module) => module.name == "Introduction"
    ).id;
  } catch (error) {
    return [];
  }
});

const currentAttributes = computed(() => {
  try {
    return eventStore.event.eventmoduleSet.find(
      (module) => module.name == "Introduction"
    ).attributeModules;
  } catch (error) {
    return [];
  }
});

const rules = computed(() => {
  const rulesSet = {};
  if (currentAttributes?.value) {
    currentAttributes.value.forEach((element) => {
      if (element.isRequired) {
        rulesSet[`value_${element.id}`] = {
          checked: helpers.withMessage(
              "Bitte  bestätige das Feld.",
              checked
            ),
        };
      }
    });
  }
  rulesSet['scoutGroup'] = {
  required: helpers.withMessage(
      "Du musst einen Stamm/Bund angeben.",
      required
    ),
  };
  console.log(rulesSet);
  return rulesSet;
});

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);
const isLoading = ref(false);
const currentCustomData = ref({});

function onNextButtonClicked() {
  errors.value.$validate();

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  eventRegisterStore.updateRegisterStart(state);

  eventRegisterStore.updateRegisterCustom(currentModuleId.value, state);

  router.push({
    name: props.step.nextLink,
    params: {
      module: props.step.nextId,
    },
  });
}

function setInitData() {
  isLoading.value = true;
  state.hasConfirmed = false;

  const scoutGroup= personalData?.value?.scoutGroup;

  if(scoutGroup) {
    const myBund = scoutGroup.bund;
    const eventLevelId = event?.value?.registrationLevel?.id;

    if (eventLevelId === 3 && myBund) {
      state.scoutGroup = registerStore.scoutGroupMappings.find(
          (a) => a["name"] === myBund
      );
    } else {
      state.scoutGroup = registerStore.scoutGroupMappings.find(
          (a) => a["id"] === scoutGroup.id
      );
    }
  }

  const moduleId = currentModuleId.value;
  isLoading.value = true;
  try {
    currentCustomData.value = registerCustom?.value[moduleId];
    const valueFields = Object.keys(currentCustomData.value);
    valueFields.forEach(
      (field) => (state[field] = currentCustomData.value[field])
    );
  } catch (e) {
    currentCustomData.value = {};
  }

  isLoading.value = false;
}

const event = computed(() => {
  return eventRegisterStore.event;
});

const scoutGroupMappings = computed(() => {
  return registerStore.scoutGroupMappings;
});

const personalData = computed(() => {
  return personalDataStore.personalData;
});

function getComponentType(fieldType: string) {
  switch (fieldType) {
    case "booleanAttribute":
      return "Toggle";
    case "dateTimeAttribute":
      return "DateTime";
    case "integerAttribute":
      return "Number";
    case "floatAttribute":
      return "Number";
    case "stringAttribute":
      return "Text";
    default: {
      return "";
    }
  }
}

const registerCustom = computed(() => {
  return eventRegisterStore.registerCustom;
});

const currentModule = computed(() => {
  return eventStore.event.eventmoduleSet[props.step.id - 1];
});

onMounted(async () => {
  const id = route.params.id;
  isLoading.value = true;
  await Promise.all([
    personalDataStore.fetchPersonalData(),
    eventRegisterStore.fetchEvent(id),
    registerStore.fetchAllMappings(event?.value?.registrationLevel?.id),
  ]);

  setInitData();
});
</script>
