<template>
  <StepFrame
    header="Zusammenfassung"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
    :isFinalStep="true"
  >
    <fieldset class="mt-6">
      <div class="text-l font-semibold text-gray-900">
        <h1>Das ist der letzte Schritt...</h1>
      </div>
      <div class="text-md text-gray-800 my-4">
        <h3>
          Überprüfe deine Anmeldung, bevor du sie speicherst. Nach dem Absenden
          bekommst du eine Bestätigungs-Email. Du kannst die Anmeldung noch bis
          zum {{ $dayjs(event.lastPossibleUpdate).format("ll") }} ändern.
        </h3>
      </div>
      <p class="my-2">
        Du hast
        {{
          registerPerson && registerPerson.length ? registerPerson.length : 0
        }}
        Personen zur Veranstaltung <b>{{ event?.name }}</b> angmeldet.
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
import { reactive, computed, ref, onMounted } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";

import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { useRouter } from "vue-router";

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

import { useEventRegisterStore } from "@/modules/event/store/register";
const eventRegisterStore = useEventRegisterStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const format1 = "YYYY-MM-DD";

const props = defineProps({
  step: Object,
});

const state = reactive({
  hasConfirmed: false,
});

const rules = {
  hasConfirmed: {
    checked: helpers.withMessage(
      "Bitte bestätige die Anmeldung.",
      (value: any) => value === true
    ),
  },
};
const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);
const isLoading = ref(false);

function onNextButtonClicked() {
  errors.value.$validate();

  if (errors.value.$error) {
    commonStore.showError("Bitte bestätige die Anmeldung.");
    return;
  }

  isLoading.value = true;
  eventRegisterStore.create().then((response) => {
    if (response?.regId) {
      eventRegisterStore.$reset();
      router.push({
        name: "RegistrationFinish",
        params: {
          id: response.regId,
        },
      });
    } else {
      isLoading.value = false;
      commonStore.showError(response);
    }
  });
}

const registerPerson = computed(() => {
  return eventRegisterStore.registerPerson;
});

const event = computed(() => {
  return eventRegisterStore.event;
});

function setInitData(response: any) {
  isLoading.value = true;

  isLoading.value = false;
}

onMounted(async () => {
  isLoading.value = true;
  const response = await Promise.all([]);

  setInitData(response);
});
</script>
