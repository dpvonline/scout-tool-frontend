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
          :items="shortGroups"
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
          component="AutoCompleteMulti"
          :label="'Eingeladene Gruppen'"
          techName="invitedGroups"
          v-model="state.invitedGroups"
          :errors="errors.invitedGroups?.$errors"
          :cols="12"
          :items="shortGroups2"
          hint="Suche nach deinem Stammesnamen aus, damit wir dich zuordnen können."
          :lookupListDisplay="['name']"
          valueField="value"
        />
        <BaseField
          component="Select"
          :label="'Einladene Gruppe'"
          techName="invitingGroup"
          v-model="state.invitingGroup"
          :errors="errors.invitingGroup?.$errors"
          :cols="12"
          :items="shortGroups"
          hint="Welche Gruppe lädt ein?"
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

import { useGroupStore } from "@/modules/group/store/index";
const groupStore = useGroupStore();

const state = reactive({
  viewGroup: null,
  adminGroup: null,
  invitedGroups: [],
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
  invitingGroup: {
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
  return groupStore.shortGroups;
});

const shortGroups2 = computed(() => {
  if (groupStore.shortGroups && groupStore.shortGroups.length) {
    console.log(groupStore.shortGroups);
    let arr = JSON.parse(JSON.stringify(groupStore.shortGroups));
    arr.forEach(function (data) {
      data["value"] = data["id"];
      data["label"] = data["name"];
      delete data["id"];
      delete data["name"];
    });
    return arr;
  } else {
    return [];
  }
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
