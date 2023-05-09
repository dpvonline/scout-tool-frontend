<template>
  <StepFrame
    header="Neue Veranstaltung anlegen"
    @click="onNextButtonClicked"
  >
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Namen und Texte
      </legend>
      <p class="text-sm text-gray-500">
        Gebe hier die Texte für ein Lager ein.
      </p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Text"
          :label="'Veranstaltungsname'"
          techName="name"
          v-model="state.name"
          :errors="errors.name?.$errors"
          :readonly="readonly"
          :cols="12"
        />
        <BaseField
          component="Text"
          :label="'Technischer Name*'"
          techName="technicalName"
          v-model="state.technicalName"
          :errors="errors.technicalName?.$errors"
          :cols="12"
        />
        <BaseField
          component="Text"
          :label="'Kurze Beschreibung*'"
          techName="shortDescription"
          v-model="state.shortDescription"
          :errors="errors.shortDescription?.$errors"
          :cols="12"
        />
        <BaseField
          component="Html"
          :label="'Einladungstext'"
          techName="longDescription"
          v-model="state.longDescription"
          :errors="errors.longDescription?.$errors"
          :cols="12"
        />
      </div>
    </fieldset>
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useEventStore } from "@/modules/event/store/index";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const state = reactive({
  name: '',
  technicalName: '',
  shortDescription: '',
  longDescription: '',
});

const rules = {
  name: {
    required,
  },
  technicalName: {
    required,
    maxLength: maxLength(15)
  },
  shortDescription: {
    required,
  },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);
const isLoading = ref(false);

function onNextButtonClicked() {
  errors.value.$validate();
  console.log(errors);

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

    eventStore.updateEventNames(state);

  router.push({
    name: "EventNewDates",
  });
}

function setInitData() {
  isLoading.value = true;
  state.name = eventStore.eventNames.name
  state.technicalName = eventStore.eventNames.technicalName
  state.shortDescription = eventStore.eventNames.shortDescription
  state.longDescription = eventStore.eventNames.longDescription

  isLoading.value = false;
}

onMounted(() => {
  setInitData();
});
</script>
