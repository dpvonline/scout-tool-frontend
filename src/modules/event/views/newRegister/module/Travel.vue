<template>
  <StepFrame
    header="Anreise"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
  >
    <fieldset class="mt-6">
      <div class="px-4 sm:px-6 py-3 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Deine Anreise</h1>
            <p class="mt-2 text-sm text-gray-700">
              In dieser Liste sind deine Anreisewege
            </p>
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <PrimaryButton @click="onNewTravelClicked" class="my-1 mx-1">
            Neue Anreise hinzufügen
          </PrimaryButton>
          <SimpleList :items="registerTravel" :isLoading="isLoading">
            <template v-slot:notEmpty="slotProps">
              <TravelListItem
                @onTravelEditClicked="onTravelEdit"
                :item="slotProps.item"
              />
            </template>
            <template v-slot:empty> </template>
          </SimpleList>
        </div>
      </div>
    </fieldset>
    <AddTravelModal
      :open="openNewTravelModal"
      :travel="travel"
      :callbackOnConfirm="onNewTravelConfirmClicked"
      :callbackOnCancel="onNewTravelCancelClicked"
    />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";
import SimpleList from "@/components/list/SimpleList.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import TravelListItem from "@/modules/event/components/registration/TravelListItem.vue";
import AddTravelModal from "@/modules/event/components/registration/AddTravelModal.vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useRouter, useRoute } from "vue-router";

import { useAuthStore } from "@/modules/auth/store/index";
const authStore = useAuthStore();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const state = reactive({});

const travel = ref({});

const rules = {};

const router = useRouter();

const route = useRoute();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);
const isLoading = ref(false);

const openNewTravelModal = ref(false);

function onNewTravelClicked(item) {
  openNewTravelModal.value = true;
  travel.value = item;
}

function onMyselfClicked() {
  openNewTravelModal.value = true;
  travel.value = personalData.value;
}

function onTravelEdit(data) {
  openNewTravelModal.value = true;
  travel.value = data;
}

function onNewTravelCancelClicked() {
  openNewTravelModal.value = false;
}

function onNewTravelConfirmClicked(travel) {
  if (travel.storeId) {
    eventRegisterStore.editTravel({
    storeId: travel.storeId,
    numberPersons: travel.numberPersons,
    typeField: travel.typeField,
    dateTimeField: travel.dateTimeField,
    description: travel.description,
  });
  } else {
    eventRegisterStore.addTravel({
    storeId: travel.storeId,
    numberPersons: travel.numberPersons,
    typeField: travel.typeField,
    dateTimeField: travel.dateTimeField,
    description: travel.description,
  });
  }
  openNewTravelModal.value = false;
}

function onNextButtonClicked() {
  if (
    registerTravel &&
    registerTravel.value &&
    registerTravel.value.length < 1
  ) {
    commonStore.showError("Bitte füge mindestens eine Travel hinzu.");
    return;
  }

  router.push({
    name: "RegistrationNewFreeText",
  });
}

function setInitData() {
  isLoading.value = true;

  isLoading.value = false;
}

import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
const personalDataStore = usePersonalDataStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const personalData = computed(() => {
  return personalDataStore.personalData;
});

const registerTravel = computed(() => {
  return eventRegisterStore.registerTravel;
});

const travelTypeChoices = computed(() => {
  return eventStore.travelTypeChoices;
});

onMounted(async () => {
  const id = route.params.id;
  isLoading.value = true;
  await Promise.all([
    personalDataStore.fetchPersonalData(),
    eventRegisterStore.fetchAllMappings(id),
    eventStore.fetchBookingOptionsById(id),
  ]);

  setInitData();
});
</script>
