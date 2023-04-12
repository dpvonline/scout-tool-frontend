<template>
  <StepFrame
    header="Zur Veranstaltung anmelden"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
  >
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900"></legend>
      <p class="text-sm text-gray-500"></p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Toggle"
          :label="'Ich möchte mit der Anmeldung starten'"
          techName="name"
          v-model="state.hasConfirmed"
          :errors="errors.name?.$errors"
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
  hasConfirmed: false,
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
  console.log(errors);

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  router.push({
    name: "RegistrationNewFreeText",
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
