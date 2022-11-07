<template>
  <div>
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
      <dl class="divide-y divide-gray-200">
        <div class="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
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
              component="Text"
              :label="'Fahrten-Name'"
              techName="scoutName"
              v-model="state.scoutName"
              :errors="errors.scoutName?.$errors"
            />
          </div>
          <div class="pt-4 sm:py-5">
            <BaseField
              component="Date"
              :label="'Geburtsdatum'"
              techName="birthdate"
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
                techName="mobileNumber"
                v-model="state.mobileNumber"
                :errors="errors.mobileNumber?.$errors"
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

    <!-- Eat Habits -->
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
              :label="'Essgewohnheiten - TODO'"
              techName="eatHabits"
              v-model="state.eatHabits"
              :errors="errors.eatHabits?.$errors"
            />
          </div>
        </dl>
      </div>
    </div>

    <!-- Roles -->
    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Rollen</h3>
        <p class="max-w-2xl text-sm text-gray-500">
          Deine Aufgaben und Rollen.
        </p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Gruppe</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                personalData.scoutGroup?.name || ""
              }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Stufe</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ personalData.scoutLevel }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Position</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ personalData.leader }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- More -->
    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Weitere Angaben
        </h3>
        <p class="max-w-2xl text-sm text-gray-500">
          Kontaktierungsmöglichkeiten und Zustimmung.
        </p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Pfadfinderpost</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ personalData.bundespost }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">
              Email Benachrichtigungen
            </dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                personalData.emailNotification
              }}</span>
            </dd>
          </div>
          <SwitchGroup
            as="div"
            class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
          >
            <SwitchLabel
              as="dt"
              class="text-sm font-medium text-gray-500"
              passive
            >
              SMS Benachrichtigungen
            </SwitchLabel>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <Switch
                v-model="personalData.smsNotification"
                :class="[
                  personalData.smsNotification ? 'bg-blue-600' : 'bg-gray-200',
                  'disabled relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
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
          </SwitchGroup>
          <SwitchGroup
            as="div"
            class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
          >
            <SwitchLabel
              as="dt"
              class="text-sm font-medium text-gray-500"
              passive
            >
              DSGVO-Zustimmung
            </SwitchLabel>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <Switch
                v-model="personalData.dsgvoConfirmed"
                :class="[
                  personalData.dsgvoConfirmed ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
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
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
import { useRegisterStore } from "@/modules/auth/store";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { computed, onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import BaseField from "@/components/field/Base.vue";

const registerStore = useRegisterStore();
const personalDataStore = usePersonalDataStore();

const route = useRoute();

const state = reactive({
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
});

const errors = ref([]);

const personalData = computed(() => {
  return personalDataStore.personalData;
});

onMounted(() => {
  registerStore.fetchAllMappings();
  personalDataStore.fetchPersonalData(route.query);
});

watch(personalData.value, (newValue) => {
  alert(`Changed DSGVO: ${newValue}`);
});
</script>
