<template>
  <StepFrame header="Neue Veranstaltung anlegen" @click="onNextButtonClicked">
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Steuerung der Zeitpunkte
      </legend>
      <p class="text-sm text-gray-500"></p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="DateTime"
          :label="'Zeitpunkt an dem das Lager beginnt.'"
          techName="startDate"
          v-model="state.startDate"
          :errors="errors.startDate?.$errors"
          :cols="12"
        />
        <BaseField
          component="DateTime"
          :label="'Zeitpunkt an dem das Lager zuende ist.'"
          techName="endDate"
          v-model="state.endDate"
          :errors="errors.endDate?.$errors"
          :cols="12"
        />
        <BaseField
          component="DateTime"
          :label="'Zeitpunkt ab dem sich Teilnehmer zum Lager anmelden dürfen.'"
          techName="registrationStart"
          v-model="state.registrationStart"
          :errors="errors.registrationStart?.$errors"
          :cols="12"
        />
        <BaseField
          component="DateTime"
          :label="'Zeitpunkt bis zu neue Anmeldungen akzeptiert werden.'"
          techName="registrationDeadline"
          v-model="state.registrationDeadline"
          :errors="errors.registrationDeadline?.$errors"
          :cols="12"
        />
        <BaseField
          component="DateTime"
          :label="'Zeitpunkt bis zu dem bestehende Anmeldungen vom Teilnehmer korrigiert werden können.'"
          techName="lastPossibleUpdate"
          v-model="state.lastPossibleUpdate"
          :errors="errors.lastPossibleUpdate?.$errors"
          :cols="12"
        />
      </div>
    </fieldset>
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, ref } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useEventStore } from "@/modules/event/store/index";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const format1 = "YYYY-MM-DD HH:mm:ss"

const state = reactive({
  startDate: null,
  endDate: null,
  registrationStart: null,
  registrationDeadline: null,
  lastPossibleUpdate: null,
});

const rules = {
  startDate: {
    required,
  },
  endDate: {
    required,
  },
  registrationStart: {
    required,
  },
  registrationDeadline: {
    required,
  },
  lastPossibleUpdate: {
    required,
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

  eventStore.updateEventDates(state);

  router.push({
    name: "EventNewAuth",
  });
}

function setInitData() {
  isLoading.value = true;

  state.startDate = eventStore.eventDates.startDate
  state.endDate = eventStore.eventDates.endDate
  state.registrationStart = eventStore.eventDates.registrationStart
  state.registrationDeadline = eventStore.eventDates.registrationDeadline
  state.lastPossibleUpdate = eventStore.eventDates.lastPossibleUpdate

  isLoading.value = false;
}

onMounted(() => {
  setInitData();
});
</script>
