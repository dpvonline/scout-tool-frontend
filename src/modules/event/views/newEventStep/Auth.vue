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
          techName="keycloakAdminPath"
          v-model="state.keycloakAdminPath"
          :errors="errors.keycloakAdminPath?.$errors"
          :items="djangoGroups"
          hint="Diese Gruppe darf alle  persönlichen Daten der Anmeldenden sehen."
          :lookupListDisplay="['name']"
          :cols="12"
        />
        <BaseField
          component="Select"
          :label="'Zugriff auf aggrigierte Anmeldedaten'"
          techName="keycloakPath"
          v-model="state.keycloakPath"
          :errors="errors.keycloakPath?.$errors"
          :cols="12"
          :items="djangoGroups"
          hint="Diese Gruppe darf alle nicht persönlichen Daten der Anmeldenden sehen."
          :lookupListDisplay="['name']"
        />
        <!-- <BaseField
          component="Select"
          :label="'limitedRegistrationHierarchy'"
          techName="limitedRegistrationHierarchy"
          v-model="state.limitedRegistrationHierarchy"
          :errors="errors.limitedRegistrationHierarchy?.$errors"
          :cols="12"
          :items="djangoGroups"
          hint="Suche nach deinem Stammesnamen aus, damit wir dich zuordnen können."
          :lookupListDisplay="['name']"
        /> -->
        <BaseField
          component="Select"
          :label="'Anmeldeebene'"
          techName="groupRegistrationLevel"
          v-model="state.groupRegistrationLevel"
          :errors="errors.groupRegistrationLevel?.$errors"
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
  keycloakPath: null,
  keycloakAdminPath: null,
  limitedRegistrationHierarchy: null,
  groupRegistrationLevel: null,
  isPublic: null,
});

const rules = {
  keycloakPath: {
    required,
  },
  keycloakAdminPath: {
    required,
  },
  limitedRegistrationHierarchy: {
    required,
  },
  groupRegistrationLevel: {
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

  eventStore.updateEventCustom(state);

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


function setInitData() {
  isLoading.value = true;
  state.keycloakPath = eventStore.eventAuth.keycloakPath
  state.keycloakAdminPath = eventStore.eventAuth.keycloakAdminPath
  state.limitedRegistrationHierarchy = eventStore.eventAuth.limitedRegistrationHierarchy
  state.groupRegistrationLevel = eventStore.eventAuth.groupRegistrationLevel
  state.isPublic = eventStore.eventAuth.isPublic

  if (!state.groupRegistrationLevel) {
    state.groupRegistrationLevel = scoutOrgaLevels.value[0]
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
