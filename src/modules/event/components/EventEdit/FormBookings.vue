<template>
  <div>
    <div v-if="!isLoading">
      <BaseField
        component="Text"
        v-model="state.name"
        :label="'Name des Buchungstyp*'"
        hint="Name der den Buchungstyp beschreibt. z.B. Frühbucher, Normalpreis, Tagesgast etc."
      />
      <BaseField
        component="Currency"
        :label="'Lagerbeitrag*'"
        techName="price"
        v-model="state.price"
        :errors="errors.price?.$errors"
        :cols="12"
        hint="Preis für diese Option."
      />
      <BaseField
        component="DateTime"
        :label="'Beginn'"
        techName="stateDate"
        v-model="state.startDate"
        :cols="12"
        hint="Wann beginnt das Lager für eine Person mit dieser Option?"
      ></BaseField>
      <BaseField
        component="DateTime"
        :label="'Ende'"
        techName="endDate"
        v-model="state.endDate"
        :cols="12"
        hint="Wann endet das Lager für eine Person mit dieser Option?"
      ></BaseField>
      <BaseField
        component="DateTime"
        :label="'Buchbar ab'"
        techName="bookableFrom"
        v-model="state.bookableFrom"
        :cols="12"
        hint="Ab wann ist diese Option buchbar? Leer lassen, wenn von Beginn an buchbar."
      ></BaseField>
      <BaseField
        component="DateTime"
        :label="'Buchbar bis'"
        techName="bookableTill"
        v-model="state.bookableTill"
        :cols="12"
        hint="Bis wann ist diese Option buchbar? Leer lassen, wenn bis zum Ende buchbar."
      ></BaseField>
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
    <div v-else>
      <LoadingItem />
    </div>
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
import LoadingItem from "@/components/list/LoadingItem.vue";

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
  stateDate: {},
  endDate: {},
  bookableFrom: {},
  bookableTill: {},
};

const v$ = useVuelidate(rules, state);

const errors = ref([]);
const isLoading = ref(true);
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
  returnObj.startDate =
    state.startDate === "Invalid date" ? null : state.startDate;
  returnObj.endDate = state.endDate === "Invalid date" ? null : state.endDate;
  returnObj.bookableFrom =
    state.bookableFrom === "Invalid date" ? null : state.bookableFrom;
  returnObj.bookableTill =
    state.bookableTill === "Invalid date" ? null : state.bookableTill;

  const eventId = route.params.id;
  const bookingId = props.items?.id;

  if (bookingId) {
    eventEditStore
      .updateBookingOptionById(eventId, bookingId, returnObj)
      .then((response) => goToRoute(response.data.id));
  } else {
    eventEditStore
      .createBookingOption(eventId, returnObj)
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
import moment from "moment";
const eventStore = useEventStore();

function setInitData(data) {
  state.name = data.name;
  state.price = parseFloat(data.price);
  state.startDate = moment(data.startDate).format("YYYY-MM-DDTHH:mm");
  state.endDate = moment(data.endDate).format("YYYY-MM-DDTHH:mm");
  state.bookableFrom = moment(data.bookableFrom).format("YYYY-MM-DDTHH:mm");
  state.bookableTill = moment(data.bookableTill).format("YYYY-MM-DDTHH:mm");

  isLoading.value = false;
}

const props = defineProps({
  items: Object,
});

onMounted(async () => {
  const eventId = route.params.id;
  const bookingId = props.items?.id;

  isLoading.value = true;

  if (eventId && bookingId) {
    const response = await eventEditStore.fetchBookingOptionsByBookingId(
      eventId,
      bookingId
    );
    setInitData(response.data);
    data.value = response.data;
  }
  if (eventId && !bookingId) {
    const response = await eventStore.fetchEvent(eventId);

    const defaultData = {
      name: null,
      price: null,
      startDate: response?.data?.startDate,
      endDate: response?.data?.endDate,
      bookableFrom: null,
      bookableTill: null,
    };

    setInitData(defaultData);
    data.value = defaultData;
  }
});
</script>
