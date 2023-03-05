<template>
  <StepFrame
    header="Neue Veranstaltung anlegen"
    @click="onNextButtonClicked"
    :isFinalStep="true"
  >
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Einverständniserklärungen
      </legend>
      <p class="text-sm text-gray-500">
        Du musst folgenden Bedinungen zustimmen.
      </p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Select"
          :label="'E-Mail Template'"
          techName="emailSet"
          v-model="state.emailSet"
          :errors="errors.emailSet?.$errors"
          :cols="12"
          :items="themes"
          hint="Legt fest wie die E-Mails aussehen werden."
          :lookupListDisplay="['name']"
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
import { useEventStore } from "@/modules/event/store/index";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const isLoading = ref(false);

const state = reactive({
  emailSet: null,
});

const rules = {
    emailSet: {
      required,
    }
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);

const themes = computed(() => {
  return eventStore.themes;
});

async function onNextButtonClicked() {
  errors.value.$validate();
  console.log(errors.value);
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  eventStore.updateEventCustom(state);

  try {
    const result = await eventStore.createDataRemote();
    console.log(result);
  } catch (e) {
    console.log(e);
    // alert("Fehler: " + JSON.stringify(e.response.data))
  }
}

function setInitData() {
  isLoading.value = true;
  state.emailSet = eventStore.eventNames.emailSet

  if (!state.emailSet) {
    state.emailSet = eventStore.themes[0]
  }

  isLoading.value = false;
}

onMounted(() => {
  setInitData();
});
</script>
