<template>
  <div>
      <BaseField component="Text" v-model="eventEditStore.event.name" :label="'Eventname'" />
      <BaseField component="Text" v-model="eventEditStore.event.shortDescription" label="Kurze Beschreibung" />
      <BaseField component="TextArea" v-model="eventEditStore.event.longDescription" label="Einladungstext" />
      <BaseField component="DateTime" v-model="eventEditStore.event.startDate" label="Start" />
      <BaseField component="DateTime" v-model="eventEditStore.event.endDate" label="Ende" />
      <BaseField component="DateTime" v-model="eventEditStore.event.registrationStart" label="Anmeldestart" />
      <BaseField component="DateTime" v-model="eventEditStore.event.registrationDeadline" label="Anmeldeschluss" />
      <BaseField component="DateTime" v-model="eventEditStore.event.lastPossibleUpdate" label="Anmeldeänderungsschluss" />
      <BaseField component="Toggle" v-model="eventEditStore.event.isPublic" label="Sichtbarkeit" />
      <BaseField component="Select" v-model="eventEditStore.event.theme" label="Theme" />
      <BaseField component="Text" v-model="eventEditStore.event.location" label="Ort" />
      <BaseField component="Toggle" v-model="eventEditStore.event.personalDataRequired" label="???" />

    <PrimaryButton @click="onSaveClicked" :isLoading="!!isLoading" label="Nachricht speichern" />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/modules/common/store/index";
import {useEventEditStore} from "@/modules/event/store/edit";
import { onMounted, ref } from "vue";
import BaseField from "@/components/field/Base.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute } from "vue-router";
import router from "@/router";

const commonStore = useCommonStore();
const eventEditStore = useEventEditStore();
const route = useRoute();

const rules = {};

const props = defineProps({});

const v$ = useVuelidate(rules, eventEditStore.event);

const errors = ref([]);
const isLoading = ref(false);

function onSaveClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  isLoading.value = true;
  eventEditStore.saveState().then(() => goToRoute(0))//todo correct id
}

function goToRoute(id: number) {
  router.push({
    name: "MessageDetail",
    params: {
      id: id,
    },
  });
  //todo
  if (router.currentRoute.value.name === "MessageDetail") {
    router.go(router.currentRoute.value);
  }
}

onMounted(async () => {
    const id = route.params.id;
    if (id) {
        eventEditStore.fetchInitialEventState(id)
    }
});
</script>
