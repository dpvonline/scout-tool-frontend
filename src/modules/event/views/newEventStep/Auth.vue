<template>
  <StepFrame header="Neue Veranstaltung anlegen" @click="onNextButtonClicked">
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Steuerung der Zugriffsrechte und Sichtbarkeit
      </legend>
      <p class="text-sm text-gray-500"></p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Select"
          :label="'Zugriff auf Persönliche Anmeldedaten'"
          techName="adminGroup"
          v-model="state.adminGroup"
          :errors="errors.adminGroup?.$errors"
          :items="shortGroupsshortGroups"
          hint="Diese Gruppe darf alle  persönlichen Daten der Anmeldenden sehen."
          :lookupListDisplay="['name']"
          :cols="12"
        />
        <BaseField
          component="Select"
          :label="'Zugriff auf aggrigierte Anmeldedaten'"
          techName="viewGroup"
          v-model="state.viewGroup"
          :errors="errors.viewGroup?.$errors"
          :cols="12"
          :items="shortGroups"
          hint="Diese Gruppe darf alle nicht persönlichen Daten der Anmeldenden sehen."
          :lookupListDisplay="['name']"
        />
        <BaseField
          component="Select"
          :label="'invitedGroups'"
          techName="invitedGroups"
          v-model="state.invitedGroups"
          :errors="errors.invitedGroups?.$errors"
          :cols="12"
          :items="shortGroups"
          hint="Suche nach deinem Stammesnamen aus, damit wir dich zuordnen können."
          :lookupListDisplay="['name']"
        />
        <BaseField
          component="Select"
          :label="'Anmeldeebene'"
          techName="registrationLevel"
          v-model="state.registrationLevel"
          :errors="errors.registrationLevel?.$errors"
          :items="scoutOrgaLevels"
          hint="Die Ebene legt fest welche Ebene deine Anmeldung hat."
          :lookupListDisplay="['name']"
          :cols="12"
        />
        <BaseField
          component="Toggle"
          :label="'Öffentlich Sichtbar?'"
          techName="isPublic"
          v-model="state.isPublic"
          :errors="errors.isPublic?.$errors"
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

const state = reactive({
  viewGroup: null,
  adminGroup: null,
  invitedGroups: null,
  invitingGroup: null,
  registrationLevel: null,
  isPublic: false,
});

const rules = {
  viewGroup: {
    required,
  },
  adminGroup: {
    required,
  },
  invitedGroups: {
    required,
  },
  registrationLevel: {
    required,
  },
  isPublic: {
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

  eventStore.updateEventAuth(state);

  router.push({
    name: "EventNewCustom",
  });
}

const djangoGroups = computed(() => {
  return eventStore.djangoGroups;
});

const scoutOrgaLevels = computed(() => {
  return eventStore.scoutOrgaLevels;
});

const shortGroups = computed(() => {
  return eventStore.shortGroups;
});


function setInitData() {
  isLoading.value = true;
  state.viewGroup = eventStore.eventAuth.viewGroup
  state.adminGroup = eventStore.eventAuth.adminGroup
  state.invitedGroups = eventStore.eventAuth.invitedGroups
  state.invitingGroup = eventStore.eventAuth.invitingGroup
  state.registrationLevel = eventStore.eventAuth.registrationLevel
  state.isPublic = eventStore.eventAuth.isPublic

  if (!state.registrationLevel) {
    state.registrationLevel = scoutOrgaLevels.value[0]
  }

  if (!state.isPublic) {
    state.isPublic = false
  }

  isLoading.value = false;
}

onMounted(() => {
  setInitData();
});
</script>
