<template>
  <StepFrame
    header="Zusammenfassung"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
    :isFinalStep="true"
  >
    <fieldset class="mt-6">
      <p>
        Du hast
        {{
          registerPerson && registerPerson.length ? registerPerson.length : 0
        }}
        Personen zur Veranstaltung {{ event.name }} angmeldet.
      </p>
      <BaseField
        component="Toggle"
        :label="'Ich möchte die Anmeldung verbindlich absenden.'"
        techName="hasConfirmed"
        v-model="state.hasConfirmed"
        :errors="errors.hasConfirmed?.$errors"
        :cols="12"
      />
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

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

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

  eventRegisterStore.create().then((response) => {
    eventRegisterStore.$reset();
    router.push({
      name: "RegistrationsDetail",
      params: {
        id: response.data.id,
      },
    });
  });
}

const registerPerson = computed(() => {
  return eventRegisterStore.registerPerson;
});

const event = computed(() => {
  return eventRegisterStore.event;
});

function setInitData() {
  isLoading.value = true;

  isLoading.value = false;
}

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([]);

  setInitData();
});
</script>
