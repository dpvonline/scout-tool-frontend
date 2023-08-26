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
          :label="'Zusätzliche Nachricht'"
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

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

const format1 = "YYYY-MM-DD";

const props = defineProps({
  step: Object,
});

const state = reactive({
  freeText: null,
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

  eventRegisterStore.updateRegisterFreeText(state)

  router.push({
    name: props.step.nextLink,
    params: {
      module: props.step.nextId,
    },
  });
}

function setInitData() {
  isLoading.value = true;
  if (registerFreeText?.value?.freeText) {
    state.freeText = registerFreeText.value?.freeText;
  }
  isLoading.value = false;
}

const registerFreeText = computed(() => {
  return eventRegisterStore.registerFreeText;
});

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([]);

  setInitData();
});
</script>
