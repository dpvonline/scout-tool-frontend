<template>
  <div>
    <BaseField component="Text" :label="'Name des Veranstaltungortes'" techName="name" v-model="state.name"
      :errors="errors.name?.$errors" :cols="12" />
    <BaseField component="Text" :label="'Beschreibung des Veranstaltungortes'" techName="description"
      v-model="state.description" :errors="errors.description?.$errors" :cols="12" />
    <BaseField component="ZIP" :label="'Postleitzahl des Veranstaltungortes'" techName="zipCode" v-model="state.zipCode"
      :errors="errors.zipCode?.$errors" :cols="12" />
    <BaseField component="Text" :label="'Adresse des Veranstaltungortes'" techName="address" v-model="state.address"
      :errors="errors.address?.$errors" :cols="12" />
    <PrimaryButton v-if="isUpdate" @click="onSaveClicked" :isLoading="!!isLoading" label="Änderung speichern" />
    <PrimaryButton v-else @click="onSaveClicked" :isLoading="!!isLoading" label="Erstellen" />
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

const format1 = "YYYY-MM-DDTHH:mm";

const state = reactive({
  name: null,
  description: null,
  zipCode: null,
  address: null,
  // lat: null,
  // lon: null
});

const rules = {
  name: {
    required,
  },
  description: {
    required,
  },
  zipCode: {
    required,
  },
  address: {
    required,
  },
  // lat: {
  //   required,
  // },
  // lon: {
  //   required,
  // },
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
  returnObj.id = state?.id;
  returnObj.name = state.name;
  returnObj.description = state.description;
  returnObj.zipCode = state.zipCode;
  returnObj.address = state.address;

  if (isUpdate.value) {
    eventStore
      .updateLocation(returnObj)
      .then((response) => goToRoute(response.data.id));
  } else {
    const eventId = route.params.id;
    eventStore
      .createLocation(returnObj)
      .then((response_location) => eventStore.eventPartialUpdate({
        id: eventId,
        location: response_location.data.id
      }))
      .then((response_event) => goToRoute(response_event.data.id));
  }
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

const isUpdate = computed(() => {
  return !!props.items.id;
});

function setInitData(data) {
  state.id = data?.id;
  state.name = data.name;
  state.description = data.description;
  state.zipCode = data?.zipCode?.zipCode;
  state.address = data.address;
}

const props = defineProps({
  items: Object,
});

onMounted(async () => {
  setInitData(props.items);
});
</script>
