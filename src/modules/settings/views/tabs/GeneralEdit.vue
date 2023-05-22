<template>
  <div>
    <div v-if="!isLoading">
      <!-- Profile -->
      <div class="mt-10 divide-y divide-gray-200">
        <div class="space-y-1">
          <div class="flex py-4">
            <div class="flex-grow">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Profil bearbeiten
              </h3>
              <p class="max-w-2xl text-sm text-gray-500">
                Deine persönlichen Angaben.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <dl class="divide-y divide-gray-200">
            <div class="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="Text"
                  :label="'Fahrtenname'"
                  techName="scoutName"
                  v-model="state.scoutName"
                  :errors="errors.scoutName?.$errors"
                />
              </div>
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="Text"
                  :label="'Vorname'"
                  techName="firstName"
                  v-model="state.firstName"
                  :errors="errors.firstName?.$errors"
                />
              </div>
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="Text"
                  :label="'Nachname'"
                  techName="lastName"
                  v-model="state.lastName"
                  :errors="errors.lastName?.$errors"
                />
              </div>
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="Date"
                  :label="'Geburtsdatum'"
                  techName="birthday"
                  v-model="state.birthday"
                  :errors="errors.birthday?.$errors"
                />
              </div>
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="Select"
                  :label="'Geschlecht'"
                  techName="gender"
                  v-model="state.gender"
                  :errors="errors.gender?.$errors"
                  :items="registerStore.genderMappings"
                />
              </div>
            </div>
          </dl>
        </div>
      </div>

      <!-- Contact -->
      <div class="mt-10 divide-y divide-gray-200">
        <div class="space-y-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Kontakt bearbeiten
          </h3>
          <p class="max-w-2xl text-sm text-gray-500">Deine Kontaktangaben.</p>
        </div>
        <div class="mt-6">
          <dl class="divide-y divide-gray-200">
            <div class="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <div class="pt-4 sm:py-5">
                <BaseField
                  disabled="true"
                  component="EMail"
                  :label="'E-Mail-Adresse*'"
                  techName="email"
                  v-model="state.email"
                  :errors="errors.email?.$errors"
                />
              </div>
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="PhoneNumber"
                  :label="'Handynummer'"
                  techName="phoneNumber"
                  v-model="state.phoneNumber"
                  :errors="errors.phoneNumber?.$errors"
                />
              </div>
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="Text"
                  :label="'Addresse'"
                  techName="address"
                  v-model="state.address"
                  :errors="errors.address?.$errors"
                />
              </div>
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="Text"
                  :label="'Addresszusatz'"
                  techName="addressSupplement"
                  v-model="state.addressSupplement"
                  :errors="errors.addressSupplement?.$errors"
                />
              </div>
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="ZIP"
                  :label="'Postleitzahl'"
                  techName="zipCode"
                  v-model="state.zipCode"
                  :errors="errors.zipCode?.$errors"
                />
              </div>
            </div>
          </dl>
        </div>
      </div>

      <!-- Eat Habits
    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Essgewohnheiten bearbeiten
        </h3>
        <p class="max-w-2xl text-sm text-gray-500">Deine Happa-Happa-Habits.</p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="pt-4 sm:py-5">
            <BaseField
              component="Text"
              :label="'Essgewohnheiten - kann aktuell noch nicht bearbeitet werden'"
              techName="eatHabits"
              v-model="state.eatHabits"
              :errors="errors.eatHabits?.$errors"
            />
          </div>
        </dl>
      </div>
    </div> -->

      <!-- Roles -->
      <div class="mt-10 divide-y divide-gray-200">
        <div class="space-y-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Pfadfinderdaten bearbeiten
          </h3>
          <p class="max-w-2xl text-sm text-gray-500">Deine Zugehörigkeiten</p>
        </div>
        <div class="mt-6">
          <dl class="divide-y divide-gray-200">
            <div class="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
              <div class="pt-4 sm:py-5">
                <BaseField
                  component="AutoComplete"
                  :label="'Stamm*'"
                  techName="scoutGroup"
                  v-model="state.scoutGroup"
                  :errors="errors.scoutGroup?.$errors"
                  :items="registerStore.scoutGroupMappings"
                  hint="Suche nach deinem Stammesnamen aus, damit wir dich zuordnen können."
                  :lookupListDisplay="['bund', '$ - Stamm ', 'name']"
                />
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
      <div v-else> <LoadingItem/> </div>
    <!-- <div class="pt-4 sm:py-5">
              <BaseField
                  component="Select"
                  :label="'Stufe'"
                  techName="scoutLevel"
                  v-model="state.scoutLevel"
                  :errors="errors.scoutLevel?.$errors"
                  :items="registerStore.scoutLevelMappings"
              />
            </div> -->
    <!-- <div class="pt-4 sm:py-5">
              <BaseField
                  component="Select"
                  :label="'Position'"
                  techName="leader"
                  v-model="state.leader"
                  :errors="errors.leader?.$errors"
                  :items="leaderChoices"
              />
            </div> -->
    <!-- </div>
        </dl>
      </div>
    </div> -->

    <!-- More -->
    <!-- <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Weitere Angaben bearbeiten
        </h3>
        <p class="max-w-2xl text-sm text-gray-500">
          Kontaktierungsmöglichkeiten und Zustimmung.
        </p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <div class="pt-4 sm:py-5">
              <BaseField
                  component="Select"
                  :label="'Pfadfinderpost'"
                  techName="bundespost"
                  v-model="state.bundespost"
                  :errors="errors.bundespost?.$errors"
                  :items="bundespostChoices"
              />
            </div> -->
    <!-- <div class="pt-4 sm:py-5">
              <BaseField
                  component="Select"
                  :label="'Email Benachrichtigungen'"
                  techName="emailNotification"
                  v-model="state.emailNotification"
                  :errors="errors.emailNotification?.$errors"
                  :items="emailNotificationChoices"
              />
            </div> -->
    <!-- <SwitchGroup as="div" class="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-5 sm:pt-5">
              <SwitchLabel as="dt" class="text-sm font-medium" passive>
                SMS Benachrichtigungen
              </SwitchLabel>
              <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 mr-3">
                <div class="flex-grow"></div>
                <Switch
                    v-model="personalData.smsNotification"
                    :class="[
                  personalData.smsNotification ? 'bg-blue-600' : 'bg-gray-200',
                  'flex-shrink-0 disabled relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                ]"
                >
                <span
                    aria-hidden="true"
                    :class="[
                    personalData.smsNotification
                      ? 'translate-x-5'
                      : 'translate-x-0',
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  ]"
                />
                </Switch>
              </dd>
            </SwitchGroup> -->
    <!-- <SwitchGroup as="div" class="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-5 sm:pt-5">
              <SwitchLabel as="dt" class="text-sm font-medium" passive>
                DSGVO-Zustimmung
              </SwitchLabel>
              <dd class="mt-1 flex text-sm text-gray-900 sm:mt-0 mr-3">
                <div class="flex-grow"></div>
                <Switch
                    v-model="personalData.dsgvoConfirmed"
                    :class="[
                  personalData.dsgvoConfirmed ? 'bg-blue-600' : 'bg-gray-200',
                  'flex-shrink-0 disabled relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                ]"
                >
                <span
                    aria-hidden="true"
                    :class="[
                    personalData.dsgvoConfirmed
                      ? 'translate-x-5'
                      : 'translate-x-0',
                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  ]"
                />
                </Switch>
              </dd>
            </SwitchGroup>
          </div>
        </dl>
      </div>
    </div> -->
    <PrimaryButton
      @click="onButtonClicked"
      label="speichern"
      :isLoading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PrimaryButton from "@/components/button/Primary.vue";
import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
import { useRegisterStore } from "@/modules/auth/store";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { computed, onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import BaseField from "@/components/field/Base.vue";
import LoadingItem from "@/components/list/LoadingItem.vue";


import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  sameAs,
  email,
  helpers,
} from "@vuelidate/validators";

const registerStore = useRegisterStore();

const personalDataStore = usePersonalDataStore();

const route = useRoute();

const state = reactive({
  id: null,
  firstName: "",
  lastName: "",
  scoutName: "",
  birthday: "",
  gender: "",
  email: "",
  phoneNumber: "",
  address: "",
  addressSupplement: "",
  zipCode: "",
  eatHabits: [],
  scoutGroup: "",
  scoutLevel: "",
  leader: "",
  bundespost: "",
  emailNotification: "",
  smsNotification: false,
  dsgvoConfirmed: false,
});

const leaderChoices = [
  {
    id: 1,
    name: "Kein Amt",
    value: "Kein Amt",
  },
  {
    id: 2,
    name: "DPV-Führung",
    value: "DPV-Führung",
  },
  {
    id: 3,
    name: "Bundesführung",
    value: "Bundesführung",
  },
  {
    id: 4,
    name: "Ringführung",
    value: "Ringführung",
  },
  {
    id: 5,
    name: "Stammesführung",
    value: "Stammesführung",
  },
  {
    id: 6,
    name: "Sippenführung",
    value: "Sippenführung",
  },
  {
    id: 7,
    name: "Roverrundenführung",
    value: "Roverrundenführung",
  },
  {
    id: 8,
    name: "Meutenführung",
    value: "Meutenführung",
  },
];

const bundespostChoices = [
  {
    id: 1,
    name: "Keine Bundespost",
    value: "Keine Bundespost",
  },
  {
    id: 2,
    name: "Nur Digital",
    value: "Nur Digital",
  },
  {
    id: 3,
    name: "Digital und Post",
    value: "Digital und Post",
  },
  {
    id: 4,
    name: "Nur per Post",
    value: "Nur per Post",
  },
];

const emailNotificationChoices = [
  {
    id: 1,
    name: "Alles",
    value: "Alles",
  },
  {
    id: 2,
    name: "Täglich",
    value: "Täglich",
  },
  {
    id: 3,
    name: "Wöchentlich",
    value: "Wöchentlich",
  },
  {
    id: 4,
    name: "Nur wichtiges",
    value: "Nur wichtiges",
  },
];

import { useCommonStore } from "@/modules/common/store/index";
const commonStore = useCommonStore();

const errors = ref([]);
const isLoading = ref(false);

const personalData = computed(() => {
  return personalDataStore.personalData;
});

async function fetchAllMappings() {
  const id = route.params.id;
  await registerStore.fetchAllMappings(id);
}

async function fetchPersonalData() {
  await personalDataStore.fetchPersonalData(route.query);
}

const zipCheck = async (value) => {
  if (!value || value == "") {
    return false;
  }
  console.log(value);
  return !(await registerStore.zipCheck(value));
};

const rules = {
  firstName: {
    required,
  },
  zipCode: {
    validPLZ: helpers.withMessage(
      "Bitte gib eine gültige Postleitzahl an.",
      function (value) {
        return /^[0-9]{5}$/.test(value);
      }
    ),
    required: helpers.withMessage(
      "Du musst eine gültige Postleitzahl angeben.",
      required
    ),
    metBackendRules1: helpers.withMessage(
      "Diese Postleitzahl ist nicht gültig.",
      helpers.withAsync(zipCheck)
    ),
  },
};

const v$ = useVuelidate(rules, state);

import { useRouter } from "vue-router";
const router = useRouter();

function onButtonClicked() {
  v$.value.$validate();
  errors.value = v$.value;
  if (errors.value.$error) {
    commonStore.showError("Bitte Felder überprüfen");
    return;
  }
  isLoading.value = true;
  personalDataStore
    .updatePersonalData({
      id: state?.id,
      firstName: state?.firstName,
      lastName: state?.lastName,
      scoutName: state?.scoutName,
      birthday: state?.birthday,
      bundespost: "nothing",
      leader: "N",
      scoutLevel: "N",
      gender: state.gender?.value,
      scoutGroup: state.scoutGroup?.id,
      email: state.email,
      phoneNumber: state.phoneNumber,
      address: state.address,
      addressSupplement: state.addressSupplement,
      zipCode: state.zipCode,
    })
    .then((response) => {
      if (response && response.status === 200) {
        router.push({
          name: "SettingsGeneral",
        });
        commonStore.showSuccess("Person erfolgreich geändert");
      } else if (response && response.status === 400) {
        commonStore.showSuccess(`Die Anfrage ist Fehlerhaft.${response.data}`);
      } else {
        console.log(response);
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
}

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([fetchAllMappings()]);

  await fetchPersonalData();
  fillpersonalDataStore();
  state.gender = registerStore.genderMappings.find(
    (a) => a["name"] === state.gender
  );
  state.scoutGroup = registerStore.scoutGroupMappings.find(
    (a) => a["id"] === state?.scoutGroup?.id
  );
  // state.scoutLevel = registerStore.scoutLevelMappings.find(a => a['name'] === state.scoutLevel);
  // state.bundespost = bundespostChoices.find(a => a['name'] === state.bundespost);
  // state.emailNotification = emailNotificationChoices.find(a => a['name'] === state.emailNotification);
  isLoading.value = false;
});

function fillpersonalDataStore() {
  const tempData = personalDataStore.personalData;
  state.id = tempData.id;
  state.firstName = tempData.firstName;
  state.lastName = tempData.lastName;
  state.scoutName = tempData.scoutName;
  state.birthday = tempData.birthday;
  state.gender = tempData.gender;
  state.email = tempData.email;
  state.phoneNumber = tempData.phoneNumber;
  state.address = tempData.address;
  state.addressSupplement = tempData.addressSupplement;
  state.zipCode = tempData.zipCode?.zipCode;
  state.scoutGroup = tempData.scoutGroup;
  state.scoutLevel = tempData.scoutLevel;
  state.bundespost = tempData.bundespost;
  state.emailNotification = tempData.emailNotification;
  state.smsNotification = tempData.smsNotification;
  state.dsgvoConfirmed = tempData.dsgvoConfirmed;
}
</script>
