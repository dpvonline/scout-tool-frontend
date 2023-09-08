<template>
  <div>
    <BaseField
      component="AutoComplete"
      label="Hauptanmeldung"
      techName="regPrimary"
      v-model="state.regPrimary"
      :errors="errors.regPrimary?.$errors"
      :cols="12"
      :items="registrations"
      hint="Wähle eine Regestrierung falls du nur eine Regestrierung sehen willst."
      :lookupListDisplay="[
        'scoutOrganisationDisplay',
        'responsiblePersonsExtended',
        '$Anzahl',
        'participantCount',
      ]"
    />
    <BaseField
      component="AutoComplete"
      label="Nebenanmeldung"
      techName="regSecondary"
      v-model="state.regSecondary"
      :errors="errors.regSecondary?.$errors"
      cols="12"
      :items="registrations"
      hint="Wähle eine Regestrierung falls du nur eine Regestrierung sehen willst."
      :lookupListDisplay="[
        'scoutOrganisationDisplay',
        'responsiblePersonsExtended',
        '$Anzahl',
        'participantCount',
      ]"
    />
    <BaseField
        component="Toggle"
        :label="'Nebenanmeldung löschen'"
        techName="deleteSecondary"
        v-model="state.deleteSecondary"
        :errors="errors.deleteSecondary?.$errors"
        :cols="12"
      />
      <BaseField
        component="Toggle"
        :label="'Verantwortliche Personen von Nebenanmeldung übernehmen'"
        techName="copyResponsiblePersons"
        v-model="state.copyResponsiblePersons"
        :errors="errors.copyResponsiblePersons?.$errors"
        :cols="12"
      />
    <PrimaryButton
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Zusammenfügen"
    />
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

import { reactive, onMounted, ref, watch, computed } from "vue";
import { useCommonStore } from "@/modules/common/store/index";
import { useEventStore } from "@/modules/event/store";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute } from "vue-router";
import router from "@/router";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const commonStore = useCommonStore();
const eventStore = useEventStore();
const route = useRoute();

const state = reactive({
  regPrimary: null,
  regSecondary: null,
  copyResponsiblePersons: false,
  deleteSecondary: false,
});

const rules = {
  regPrimary: {
    required,
  },
  regSecondary: {
    required,
  },
  copyResponsiblePersons: {
    required,
  },
  deleteSecondary: {
    required,
  },
};

const registrations = computed(() => {
  return eventStore.eventSummary.results;
});

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(false);
const data = ref({});

function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  isLoading.value = true;

  const eventId = route.params.id;

  eventStore
    .mergeRegistrations(eventId, {
      regPrimary: state.regPrimary.id,
      regSecondary: state.regSecondary.id,
      copyResponsiblePersons: state.copyResponsiblePersons,
      deleteSecondary: state.deleteSecondary,
    })
    .then((response_event) => goToRoute(response_event.data.id));
}

function goToRoute(id: number) {
  router.push({
    name: "EventStatisticRegistration",
    params: {
      id: id,
    },
  });
  //todo
  if (router.currentRoute.value.name === "EventStatisticRegistration") {
    router.go(router.currentRoute.value);
  }
}
</script>
