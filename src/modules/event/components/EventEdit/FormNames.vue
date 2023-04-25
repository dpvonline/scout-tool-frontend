<template>
  <div>
    <BaseField component="Text" v-model="state.name" :label="'Eventname'" />
    <BaseField
      component="Text"
      v-model="state.shortDescription"
      label="Kurze Beschreibung"
    />
    <BaseField
      component="TextArea"
      v-model="state.longDescription"
      label="Einladungstext"
    />
    <BaseField
      component="TextArea"
      v-model="state.technicalName"
      label="Einladungstext"
    />

    <PrimaryButton
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Speichern"
    />
  </div>
</template>

<script setup lang="ts">
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

const state = reactive({
  name: "",
  shortDescription: null,
  longDescription: null,
  technicalName: null,
});

const rules = {
  name: {
    required,
  },
  shortDescription: {
    required,
  },
  technicalName: {
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
    debugger;
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }

  isLoading.value = true;

  const returnObj = data.value;
  returnObj.name = state.name;
  returnObj.shortDescription = state.shortDescription;
  returnObj.longDescription = state.longDescription;
  returnObj.technicalName = state.technicalName;

  debugger;

  eventEditStore
    .updateEvent(returnObj)
    .then((response) => goToRoute(response.data.id));
}

function goToRoute(id: number) {
  debugger;
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
  state.name = data.name;
  state.shortDescription = data.shortDescription;
  state.longDescription = data.longDescription;
  state.technicalName = data.technicalName;
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
