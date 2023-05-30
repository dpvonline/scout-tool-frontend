<template>
  <div>
    <BaseField component="Text" v-model="state.name" :label="'Veranstaltungsname'" />
    <BaseField
      component="Currency"
      :label="'Lagerbeitrag'"
      techName="price"
      v-model="state.price"
      :errors="errors.price?.$errors"
      :cols="12"
      hint="Der Standardpreis für das Lager. Weitere Preisoptionen können später hinzugefügt werden."
    />

    <PrimaryButton
      class="my-4"
      @click="onSaveClicked"
      :isLoading="!!isLoading"
      label="Speichern"
    />
    <!-- <PrimaryButton
      class="my-4 mx-4"
      color="red"
      @click="onDeleteClicked"
      :isLoading="!!isLoading"
      label="Löschen"
    /> -->
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

const format1 = "YYYY-MM-DDTHH:mm";

const state = reactive({
  name: null,
  price: null,
});

const rules = {
  name: {
    required,
  },
  price: {
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
  returnObj.name = state.name;
  returnObj.price = state.price;

  const eventId = route.params.id;
  const bookingId = props.items?.id;

  if (bookingId) {
    eventEditStore
      .updateBookingOptionById(eventId, bookingId, returnObj)
      .then((response) => goToRoute(response.data.id));
  } else {
    eventEditStore.createBookingOption(eventId, returnObj)
      .then((response) => goToRoute(response.data.id));

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

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

function setInitData(data) {
  state.name = data.name;
  state.price = parseFloat(data.price);
}

const props = defineProps({
  items: Object,
});

onMounted(async () => {
  const eventId = route.params.id;
  const bookingId = props.items?.id;

  if (eventId && bookingId) {
    const response = await eventEditStore.fetchBookingOptionsByBookingId(
      eventId,
      bookingId
    );
    setInitData(response.data);
    data.value = response.data;
  }
});
</script>
