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
          :items="emailSets"
          hint="Legt fest wie die E-Mails aussehen werden."
          :lookupListDisplay="['name']"
        />
      </div>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Select"
          :label="'Layout'"
          techName="theme"
          v-model="state.theme"
          :errors="errors.theme?.$errors"
          :cols="12"
          :items="themes"
          hint="Legt fest in welchem Layout die Anmeldungen erscheinen sollen."
          :lookupListDisplay="['name']"
        />
      </div>
        <BaseField
          component="Currency"
          :label="'Lagerbeitrag'"
          techName="price"
          v-model="state.price"
          :errors="errors.price?.$errors"
          :cols="12"
          hint="Der Standardpreis für das Lager. Weitere Preisoptionen können später hinzugefügt werden."
        />
      <div class="mt-4 space-y-4">
        <BaseField
          component="Select"
          :label="'Ort'"
          techName="location"
          v-model="state.location"
          :errors="errors.location?.$errors"
          :cols="12"
          :items="eventLocations"
          hint="Legt fest in welchem Layout die Anmeldungen erscheinen sollen."
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
  theme: null,
  price: 17.0,
  location: null,
});

const rules = {
    emailSet: {
      required,
    },
    theme: {
      required,
    },
    price: {
      required,
    },
    location: {
      required,
    },
};

const router = useRouter();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);

const themes = computed(() => {
  return eventStore.themes;
});

const emailSets = computed(() => {
  return eventStore.emailSets;
});

const eventLocations = computed(() => {
  return eventStore.eventLocations;
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
    
    router.push({
      name: "EventDetail",
      params: {
        id: result.data.id
      }
    });
  } catch (e) {
    console.log(e);
    // alert("Fehler: " + JSON.stringify(e.response.data))
  }
}

function setInitData() {
  isLoading.value = true;
  state.emailSet = eventStore.eventNames.emailSet

  if (!state.theme) {
    state.theme = eventStore.themes[0]
  }
  if (!state.emailSet) {
    state.emailSet = eventStore.emailSets[0]
  }
  if (!state.price) {
    state.price = 18.00;
  }

  isLoading.value = false;
}

onMounted(() => {
  setInitData();
});
</script>
