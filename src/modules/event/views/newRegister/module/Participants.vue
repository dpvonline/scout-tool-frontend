<template>
  <StepFrame
    header="Personen zur Anmeldung hinzufügen"
    :isLoading="isLoading"
    @click="onNextButtonClicked"
  >
    <fieldset class="mt-6">
      <p v-html="props.step?.description" class="text-lg text-gray-800"></p>
      <div class="px-4 sm:px-6 py-3 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Deine Personen</h1>
            <p class="mt-2 text-sm text-gray-700">
              In dieser Liste sind alle Personen, die du anmelden willst.
              Du kannst komplett neue Personen anmelden, wenn du auf "Neue Person hinzufügen" klickst.
              Du kannst dich selbst anmelden, wenn du auf "Mich selbst anmelden" klickst.
              Du kannst Stammesmitglieder anmelden, wenn du auf "Stammesmitglied anmelden" klickst.
              Stammesmitglieder sind Personen, die bereits von dir oder jemanden aus deinem Stamm
              angemeldet wurden. Du kannst sie hier nochmal auswählen, um sie zu deiner Anmeldung hinzuzufügen.
              Dazu können sie mithilfe einer Excel-Datei importiert werden.
            </p>
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <PrimaryButton @click="onNewPersonClicked" class="my-1 mx-1">
            Neue Person hinzufügen
          </PrimaryButton>
          <PrimaryButton @click="onMyselfClicked" class="my-1 mx-1">
            Mich selbst anmelden
          </PrimaryButton>
          <PrimaryButton @click="onStammesMitgliedClicked" class="my-1 mx-1">
            Stammesmitglied anmelden
          </PrimaryButton>
          <SimpleList :items="registerPerson" :isLoading="isLoading">
            <template v-slot:notEmpty="slotProps">
              <PersonListItem @onPersonEditClicked="onPersonEditClicked2" :item="slotProps.item" />
            </template>
            <template v-slot:empty>
              <p>Noch keine Person</p>
            </template>
          </SimpleList>
        </div>
      </div>
    </fieldset>
    <AddPersonModal
      :open="openNewPersonModal"
      :person="person"
      :callbackOnConfirm="onNewPersonConfirmClicked"
      :callbackOnCancel="onNewPersonCancelClicked"
      :blockBookingOption="blockBookingOption.value && !eventEditAdmin.value"
    />
    <AddStammesMitgliedModalBig
      :open="openAddStammesMitgliedModal"
      :callbackOnConfirm="onAddStammesMitgliedConfirmClicked"
      :callbackOnCancel="onAddStammesMitgliedCancelClicked"
    />
  </StepFrame>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from "vue";
import BaseField from "@/components/field/Base.vue";
import StepFrame from "@/components/stepper/StepFrame.vue";
import SimpleList from "@/components/list/SimpleList.vue";
import PrimaryButton from "@/components/button/Primary.vue";
import PersonListItem from "@/modules/event/components/registration/PersonListItem.vue";
import AddPersonModal from "@/modules/event/components/registration/AddPersonModal.vue";
import AddStammesMitgliedModalBig from "@/modules/event/components/registration/AddStammesMitgliedModalBig.vue";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useRouter, useRoute } from "vue-router";

import { useRegisterStore } from "@/modules/auth/store/index";
const registerStore = useRegisterStore();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const blockBookingOption = ref(true);


const props = defineProps({
  step: Object,
});

const state = reactive({});

const person = ref({});

const rules = {};

const router = useRouter();

const route = useRoute();

const v$ = useVuelidate(rules, state);
const errors = reactive(v$);
const isLoading = ref(false);

const openNewPersonModal = ref(false);
const openAddStammesMitgliedModal = ref(false);

function onNewPersonClicked() {
  openNewPersonModal.value = true;
  person.value = {};
}

function onMyselfClicked() {
  openNewPersonModal.value = true;
  person.value = personalData.value;
}

function onStammesMitgliedClicked() {
  openAddStammesMitgliedModal.value = true;
}

function onPersonEditClicked2(data) {
  openNewPersonModal.value = true;
  person.value = data;
}

function onNewPersonCancelClicked() {
  openNewPersonModal.value = false;
}

function onAddStammesMitgliedCancelClicked() {
  openAddStammesMitgliedModal.value = false;
}
function onAddStammesMitgliedConfirmClicked(selectedPersons: any) {
  if (selectedPersons.length < 1) {
    commonStore.showError("Bitte wähle mindestens eine Person aus.");
    return;
  }
  selectedPersons.forEach((person: any) => {
    person.eatHabit = person.eatHabits.map((eatHabit: any) => eatHabit.id);
    eventRegisterStore.addPerson(person);
  });
  openAddStammesMitgliedModal.value = false;

}

function onNewPersonConfirmClicked(newPerson) {
  if (newPerson.storeId) {
    eventRegisterStore.editPerson(newPerson);
  } else {
    eventRegisterStore.addPerson(newPerson);
  }
  openNewPersonModal.value = false;
}

function onNextButtonClicked() {
  if (registerPerson && registerPerson.value && registerPerson.value.length < 1) {
    commonStore.showError("Bitte füge mindestens eine Person hinzu.");
    return;
  }

  router.push({
    name: props.step.nextLink,
    params: {
      module: props.step.nextId,
    }
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

const registerPerson = computed(() => {
  return eventRegisterStore.registerPerson;
});

const eventEditAdmin = computed(() => {
  return eventStore.event?.canEdit === 'Admin';
});

onMounted(async () => {
  const id = route.params.id;
  isLoading.value = true;
  await Promise.all([
    personalDataStore.fetchPersonalData(),
    registerStore.fetchAllMappings(),
    eventStore.fetchBookingOptionsById(id),
    eventStore.fetchEvent(id),
  ]);

  setInitData();
});
</script>
