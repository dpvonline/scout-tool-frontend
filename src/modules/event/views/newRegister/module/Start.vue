<template>
  <StepFrame
    :header="`Anmeldung ${event.name}`"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
  >
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Du musst die Registrierung bis zum
        {{ moment(event.registrationDeadline).format(format1) }} absenden.
      </legend>
      <p class="text-sm text-gray-500"></p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Toggle"
          :label="'Ich stimme zu, dass die Daten bis zum Lagerende gespeichert werden.'"
          techName="name"
          v-model="state.hasConfirmed"
          :errors="errors.name?.$errors"
          :cols="12"
        />
      </div>
      <div class="mt-4 space-y-4">
        <BaseField
          component="AutoComplete"
          :label="'Stamm*'"
          techName="scoutGroup"
          v-model="state.scoutGroup"
          :errors="errors.scoutGroup?.$errors"
          :items="registerStore.scoutGroupMappings"
          hint="Suche den Stamm aus, den du anmelden willst."
          :lookupListDisplay="['bund', '$ - Stamm ', 'name']"
          :cols="12"
        />
      </div>
    </fieldset>
    <div class="px-4 py-6 sm:px-6 md:px-0">
      <h2 class="text-lg font-medium text-red-600">Wichtig</h2>
      <p class="mt-1 text-sm text-gray-500">
        Am Ende bekommst du eine Bestätigungs-Email. Nur mit dieser E-Mail ist
        deine Anmeldung erfolgreich abgeschlossen.
      </p>
      <p class="mt-1 text-sm text-gray-500">
        Du kannst deine Anmeldung nach dem Absenden noch bis zum
        {{ moment(event.registrationDeadline).format(format1) }}
        <b>verändern </b> und jederzeit angucken.
      </p>
    </div>
  </StepFrame>
</template>

<script setup lang="ts">
import moment from "moment";
import { reactive, computed, ref, onMounted } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
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

const format1 = "DD.MM.YYYY";

const route = useRoute();

const state = reactive({
  hasConfirmed: false,
  scoutGroup: null,
});

const rules = {
  hasConfirmed: {
    checked: (value) => value === true,
  },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);
const isLoading = ref(false);

function onNextButtonClicked() {
  errors.value.$validate();

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  eventRegisterStore.updateRegisterStart(state);

  router.push({
    name: "RegistrationNewPerson",
  });
}

function setInitData() {
  isLoading.value = true;
  state.hasConfirmed = false;

  console.log(personalData.value);
  console.log(personalData?.value?.scoutGroup);

  if (personalData?.value?.scoutGroup?.id) {
    state.scoutGroup = registerStore.scoutGroupMappings.find(
      (a) => a["id"] === personalData?.value?.scoutGroup.id
    );
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

onMounted(async () => {
  const id = route.params.id;
  isLoading.value = true;
  await Promise.all([
    personalDataStore.fetchPersonalData(),
    eventRegisterStore.fetchEvent(id),
    registerStore.fetchAllMappings(id),
  ]);

  setInitData();
});
</script>
