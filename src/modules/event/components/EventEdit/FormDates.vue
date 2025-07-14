<template>
  <div>
    <BaseField
      component="DateTime"
      :label="'Zeitpunkt an dem das Lager beginnt.'"
      techName="startDate"
      v-model="state.startDate"
      :errors="errors.startDate?.$errors"
      :cols="12"
    />
    <BaseField
      component="DateTime"
      :label="'Zeitpunkt an dem das Lager zuende ist.'"
      techName="endDate"
      v-model="state.endDate"
      :errors="errors.endDate?.$errors"
      :cols="12"
    />
    <BaseField
      component="DateTime"
      :label="'Zeitpunkt ab dem sich Teilnehmer zum Lager anmelden dürfen.'"
      techName="registrationStart"
      v-model="state.registrationStart"
      :errors="errors.registrationStart?.$errors"
      :cols="12"
    />
    <BaseField
      component="DateTime"
      :label="'Zeitpunkt bis zu neue Anmeldungen akzeptiert werden.'"
      techName="registrationDeadline"
      v-model="state.registrationDeadline"
      :errors="errors.registrationDeadline?.$errors"
      :cols="12"
    />
    <BaseField
      component="DateTime"
      :label="'Zeitpunkt bis zu dem bestehende Anmeldungen vom Teilnehmer korrigiert werden können.'"
      techName="lastPossibleUpdate"
      v-model="state.lastPossibleUpdate"
      :errors="errors.lastPossibleUpdate?.$errors"
      :cols="12"
    />

    <PrimaryButton
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Speichern"
    />
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

import { reactive, onMounted, ref, watch, computed } from "vue";
import { useCommonStore } from "@/modules/common/store/index";
import { useEventEditStore } from "@/modules/event/store/edit";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute } from "vue-router";
import router from "@/router";
import { required, email, minLength, maxLength } from "@vuelidate/validators";

const commonStore = useCommonStore();
const eventEditStore = useEventEditStore();
const route = useRoute();

const format1 = "YYYY-MM-DDTHH:mm";

const state = reactive({
  startDate: null,
  endDate: null,
  registrationStart: null,
  registrationDeadline: null,
  lastPossibleUpdate: null,
});

const rules = {
  startDate: {
    required,
  },
  endDate: {
    required,
  },
  registrationStart: {
    required,
  },
  registrationDeadline: {
    required,
  },
  lastPossibleUpdate: {
    required,
  },
};

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

  const returnObj = data.value;
  returnObj.startDate = state.startDate;
  returnObj.endDate = state.endDate;
  returnObj.registrationStart = state.registrationStart;
  returnObj.registrationDeadline = state.registrationDeadline;
  returnObj.lastPossibleUpdate = state.lastPossibleUpdate;

  eventEditStore
    .updateEvent(returnObj)
    .then((response) => goToRoute(response.data.id));
}

function goToRoute(id: number) {
  router.push({
    name: "EventDetail",
    params: {
      id: id,
    },
  });
  //todo
  if (router.currentRoute.value.name === "EventDetail") {
    router.go(router.currentRoute.value);
  }
}

function setInitData(data) {
  state.startDate = moment(data.startDate).format('YYYY-MM-DDTHH:mm');
  state.endDate = moment(data.endDate).format('YYYY-MM-DDTHH:mm');
  state.registrationStart = moment(data.registrationStart).format('YYYY-MM-DDTHH:mm');
  state.registrationDeadline = moment(data.registrationDeadline).format('YYYY-MM-DDTHH:mm');
  state.lastPossibleUpdate = moment(data.lastPossibleUpdate).format('YYYY-MM-DDTHH:mm');
}

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    const response = await eventEditStore.fetchTechById(id);
    setInitData(response.data);
    data.value = response.data;
  }
});
</script>
