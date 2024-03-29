<template>
  <StepFrame
    header="Neue Veranstaltung anlegen"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
  >
    <fieldset class="mt-6">
      <legend class="contents text-base font-medium text-gray-900">
        Geb die Basis Daten deiner Veranstaltung
      </legend>
      <p class="text-sm text-gray-500"></p>
      <div class="mt-4 space-y-4">
        <BaseField
          component="Text"
          :label="'Veranstaltungsname'"
          techName="name"
          v-model="state.name"
          :errors="errors.name?.$errors"
          :cols="12"
          hint="Wähle einen sprechenden kurzen Veranstaltungsnamen."
        />
        <BaseField
          component="Date"
          :label="'Starttag'"
          techName="startDate"
          v-model="state.startDate"
          :errors="errors.startDate?.$errors"
          :cols="12"
          hint="Wähle das Datum aus, an dem die Veranstaltung beginnen sollt."
        />
        <BaseField
          component="AutoComplete"
          :label="'Einladene Gruppe*'"
          techName="invitedGroup"
          v-model="state.invitedGroup"
          :errors="errors.invitedGroup?.$errors"
          :items="shortGroups"
          hint="Lege eine Standardgruppe fest, die zu dieser Veranstaltung einlädt. Die Zugriffsrechte können später genauer konfigurtiert werden."
          :lookupListDisplay="['displayName']"
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
import { useRouter, useRoute } from "vue-router";

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

import { useEventStore } from "@/modules/event/store/index";
const eventStore = useEventStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

import { useGroupStore } from "@/modules/group/store/index";
const groupStore = useGroupStore();

const format1 = "YYYY-MM-DD";

const state = reactive({
  name: null,
  startDate: null,
  invitedGroup: null,
});

const rules = {
  name: {
    required,
  },
  startDate: {
    required,
  },
  invitedGroup: {
    required,
  },
};

const router = useRouter();
const route = useRoute();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);
const isLoading = ref(false);

function onNextButtonClicked() {
  errors.value.$validate();

  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  eventStore.updateEventStart(state);

  router.push({
    name: "EventNewNames",
  });
}

const shortGroups = computed(() => {
  return groupStore.shortGroups;
});

const djangoGroups = computed(() => {
  return eventStore.djangoGroups;
});

function setInitData() {
  isLoading.value = true;
  state.name = eventStore.eventStart.name;
  state.startDate = eventStore.eventStart.startDate;
  state.invitedGroup = eventStore.eventStart.invitedGroup;

  if (!state.name) {
    state.name = "Dein Lager";
  }
  if (!state.startDate) {
    state.startDate = moment(new Date()).subtract(-2, "month").format(format1);
  }
  if (!state.invitedGroup) {
    state.invitedGroup = shortGroups.value[0];
  }
  isLoading.value = false;
}

onMounted(async () => {
  isLoading.value = true;
  const eventId = route.params.id;

  await Promise.all([
    eventStore.fetchMyGroups(),
    eventStore.fetchScoutOrgaLevel(),
    eventStore.fetchDjangoGroups(),
    eventStore.fetchThemes(),
    eventStore.fetchEmailSets(),
    eventStore.fetchEventLocations(),
    groupStore.fetchGroupsShort(),
    registerStore.fetchAllMappings(eventId),
  ]);

  setInitData();
});
</script>
