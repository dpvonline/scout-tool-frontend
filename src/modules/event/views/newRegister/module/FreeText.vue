<template>
  <StepFrame
    header="Zusätzliche Bemerkung"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
  >
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Möchstest du der Lagerleitung noch etwas mitgeben?
      </legend>
      <p class="text-sm text-gray-500"></p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="TextArea"
          :label="'Zusätziche Nachricht'"
          techName="freeText"
          v-model="state.freeText"
          :errors="errors.freeText?.$errors"
          :cols="12"
        />
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
import { required } from "@vuelidate/validators";
import { useRouter } from "vue-router";

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

import { useEventStore } from "@/modules/event/store/index";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const format1 = "YYYY-MM-DD";

const state = reactive({
  freeText: "",
});

const rules = {
  freeText: {},
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

  router.push({
    name: "RegistrationNewSummary",
  });
}

function setInitData() {
  isLoading.value = true;
  state.hasConfirmed = false;
  isLoading.value = false;
}

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([]);

  setInitData();
});
</script>
