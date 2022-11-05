<template>
  <div>
    <!-- Description list with inline editing -->
    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Profil
        </h3>
        <p class="max-w-2xl text-sm text-gray-500">
          Deine persönlichen Angaben.
        </p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Nutzername
            </dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow text-gray-400">{{ personalData.username }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Name
            </dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ personalData.firstName }} {{ personalData.lastName }}</span>
              <span class="ml-4 flex-shrink-0">
                <button
                  type="button"
                  class="
                    rounded-md
                    bg-white
                    font-medium
                    text-blue-600
                    hover:text-blue-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:ring-offset-2
                  ">
                  Bearbeiten
                </button>
              </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Fahrten-Name
            </dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ personalData.scoutName }}</span>
              <span
                class="
                  ml-4
                  flex flex-shrink-0
                  items-start
                  space-x-4
                ">
                <button
                  type="button"
                  class="
                  rounded-md
                  bg-white
                  font-medium
                  text-blue-600
                  hover:text-blue-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:ring-offset-2
                ">
                  Bearbeiten
                </button>
                <span class="text-gray-300" aria-hidden="true">|</span>
                <button
                  type="button"
                  class="
                  rounded-md
                  bg-white
                  font-medium
                  text-blue-600
                  hover:text-blue-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:ring-offset-2
                ">
                Entfernen
              </button>
            </span>
            </dd>
          </div>
          <div class="
            py-4
            sm:grid
            sm:grid-cols-3
            sm:gap-4
            sm:border-b
            sm:border-gray-200
            sm:py-5
          ">
            <dt class="text-sm font-medium text-gray-500">
              Geschlecht
            </dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ personalData.gender }}</span>
              <span class="ml-4 flex-shrink-0">
                <button
                    type="button"
                    class="
                    rounded-md
                    bg-white
                    font-medium
                    text-blue-600
                    hover:text-blue-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:ring-offset-2
                  ">
                  Bearbeiten
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Kontakt
        </h3>
        <p class="max-w-2xl text-sm text-gray-500">
          Deine Kontaktangaben.
        </p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div
              class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
          >
            <dt class="text-sm font-medium text-gray-500">
              Email
            </dt>
            <dd
                class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
            >
                            <span class="flex-grow"
                            >{{ personalData.email }}</span
                            >
              <span class="ml-4 flex-shrink-0">
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Bearbeiten
                              </button>
                            </span>
            </dd>
          </div>
          <div
              class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
          >
            <dt class="text-sm font-medium text-gray-500">
              Telefonnummer
            </dt>
            <dd
                class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
            >
                            <span class="flex-grow"
                            >{{ personalData.mobileNumber }}</span
                            >
              <span
                  class="
                                ml-4
                                flex flex-shrink-0
                                items-start
                                space-x-4
                              "
              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Bearbeiten
                              </button>
                              <span class="text-gray-300" aria-hidden="true"
                              >|</span
                              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Entfernen
                              </button>
                            </span>
            </dd>
          </div>
          <div
              class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5"
          >
            <dt class="text-sm font-medium text-gray-500">
              Straße Hausnummer
            </dt>
            <dd
                class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
            >
              <span class="flex-grow">{{ personalData.address }}</span>
              <span class="ml-4 flex-shrink-0">
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Bearbeiten
                              </button>
                            </span>
            </dd>
          </div>
          <div
              class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
          >
            <dt class="text-sm font-medium text-gray-500">
              Adresszusatz
            </dt>
            <dd
                class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
            >
              <span class="flex-grow">{{ personalData.addressSupplement }}</span>
              <span
                  class="
                                ml-4
                                flex flex-shrink-0
                                items-start
                                space-x-4
                              "
              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Bearbeiten
                              </button>
                              <span class="text-gray-300" aria-hidden="true"
                              >|</span
                              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Entfernen
                              </button>
                            </span>
            </dd>
          </div>
          <div
              class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
          >
            <dt class="text-sm font-medium text-gray-500">
              Postleitzahl
            </dt>
            <dd
                class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
            >
              <span class="flex-grow">{{ personalData.zipCode }}</span>
              <span
                  class="
                                ml-4
                                flex flex-shrink-0
                                items-start
                                space-x-4
                              "
              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Bearbeiten
                              </button>
                              <span class="text-gray-300" aria-hidden="true"
                              >|</span
                              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Entfernen
                              </button>
                            </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Weitere Angaben
        </h3>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div
              class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
          >
            <dt class="text-sm font-medium text-gray-500">
              E-Mail Benachrichtigungen
            </dt>
            <dd
                class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
            >
              <span class="flex-grow">{{ personalData.emailNotification }}</span>
              <span
                  class="
                                ml-4
                                flex flex-shrink-0
                                items-start
                                space-x-4
                              "
              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Bearbeiten
                              </button>
                            </span>
            </dd>
          </div>
          <SwitchGroup
              as="div"
              class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
          >
            <SwitchLabel
                as="dt"
                class="text-sm font-medium text-gray-500"
                passive
            >DSGVO-Zustimmung
            </SwitchLabel
            >
            <dd
                class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
            >
              <Switch
                  v-model="personalData.dsgvoConfirmed"
                  :class="[
                                personalData.dsgvoConfirmed
                                  ? 'bg-blue-600'
                                  : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-auto',
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
          <div
              class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
          >
            <dt class="text-sm font-medium text-gray-500">
              Adresszusatz
            </dt>
            <dd
                class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
            >
              <span class="flex-grow">{{ personalData.addressSupplement }}</span>
              <span
                  class="
                                ml-4
                                flex flex-shrink-0
                                items-start
                                space-x-4
                              "
              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Bearbeiten
                              </button>
                              <span class="text-gray-300" aria-hidden="true"
                              >|</span
                              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Entfernen
                              </button>
                            </span>
            </dd>
          </div>
          <div
              class="
                            py-4
                            sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5
                          "
          >
            <dt class="text-sm font-medium text-gray-500">
              Postleitzahl
            </dt>
            <dd
                class="
                              mt-1
                              flex
                              text-sm text-gray-900
                              sm:col-span-2 sm:mt-0
                            "
            >
              <span class="flex-grow">{{ personalData.zipCode }}</span>
              <span
                  class="
                                ml-4
                                flex flex-shrink-0
                                items-start
                                space-x-4
                              "
              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Bearbeiten
                              </button>
                              <span class="text-gray-300" aria-hidden="true"
                              >|</span
                              >
                              <button
                                  type="button"
                                  class="
                                  rounded-md
                                  bg-white
                                  font-medium
                                  text-blue-600
                                  hover:text-blue-500
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-blue-500
                                  focus:ring-offset-2
                                "
                              >
                                Entfernen
                              </button>
                            </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {usePersonalDataStore} from "@/modules/settings/store/personal-data";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";

const personalDataStore = usePersonalDataStore();

const route = useRoute();

const personalData = computed(() => {
  return personalDataStore.personalData;
});

onMounted(() => {
  personalDataStore.fetchPersonalData(route.query);
});
</script>
