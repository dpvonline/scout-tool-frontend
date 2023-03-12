<template>
  <div class="px-2">
    <!-- Profile -->
    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <div class="flex py-4">
          <div class="flex-grow">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Profil</h3>
            <p class="max-w-2xl text-sm text-gray-500">
              Dein DPV-Account
            </p>
          </div>
          <div v-if="props.editable" class="ml-4 flex-shrink-0 sm:ml-16">
            <router-link
              :to="{ name: 'SettingsGeneralEdit' }"
              class="
                inline-flex
                items-center
                justify-center
                rounded-md
                border border-transparent
                bg-blue-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                shadow-sm
                hover:bg-blue-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                sm:w-auto
              "
            >
              <PencilIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Bearbeiten
            </router-link>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Nutzername (nicht änderbar)</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow text-gray-400">{{
                props.personalData.username
              }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">E-Mail-Adresse</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.personalData.email }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>

 <!-- Roles -->
    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Pfadfinder Daten</h3>
        <p class="max-w-2xl text-sm text-gray-500">
          Deine Aufgaben und Rollen.
        </p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Stamm</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                props.personalData.scoutGroup?.name || ""
              }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Fahrten-Name</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.personalData.scoutName }}</span>
            </dd>
          </div>
          <!-- <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Stufe</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.personalData.scoutLevel }}</span>
            </dd>
          </div> -->
          <!-- <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Position</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.personalData.leader }}</span>
            </dd>
          </div> -->
        </dl>
      </div>
    </div>

    <!-- Contact -->
    <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Persönliche Daten</h3>
        <p class="max-w-2xl text-sm text-gray-500">Deine Kontaktangaben.</p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow"
                >{{ props.personalData.firstName }} {{ props.personalData.lastName }}</span
              >
            </dd>
          </div>
          <div
            class="
              py-4
              sm:grid
              sm:grid-cols-3
              sm:gap-4
              sm:border-b
              sm:border-gray-200
              sm:py-5
            "
          >
            <dt class="text-sm font-medium text-gray-500">Geschlecht</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.personalData.gender }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Geburtsdatum</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">
                {{ props.personalData.birthday ? moment(props.personalData.birthday).format("DD.MM.YYYY") : 'Nicht angegeben' }}
              </span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">Telefonnummer</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.personalData.phoneNumber || 'Noch keine Telefonnummer' }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Adresse</dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{ props.personalData.address || 'Noch keine Adresse' }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">Adresszusatz </dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                props.personalData.addressSupplement || 'Noch keine Adresszusatz'
              }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Postleitzahl & Ort
            </dt>
            <dd
              class="
                mt-1
                flex flex-grow
                text-sm text-gray-900
                sm:col-span-2 sm:mt-0
              "
            >
              <span
                >{{ props.personalData.zipCode?.zipCode || "" }}
                {{ props.personalData.zipCode?.city || "" }}</span
              >
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Eat Habits -->
    <!-- <div class="mt-10 divide-y divide-gray-200">
      <div class="space-y-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Essgewohnheiten
        </h3>
        <p class="max-w-2xl text-sm text-gray-500">Deine Happa-Happa-Habits.</p>
      </div>
      <div class="mt-6">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">
              Alle deine Essgewohnheiten
            </dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                props.personalData.eatHabits?.map((item) => item.name).join(", ") ||
                "-"
              }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div> -->

   

    <!-- More -->
    <!-- <div class="mt-10 divide-y divide-gray-200">
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
              <span class="flex-grow">{{ props.personalData.bundespost }}</span>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
            <dt class="text-sm font-medium text-gray-500">
              Email Benachrichtigungen
            </dt>
            <dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span class="flex-grow">{{
                props.personalData.emailNotification
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
                v-model="props.personalData.smsNotification"
                :class="[
                  props.personalData.smsNotification ? 'bg-blue-600' : 'bg-gray-200',
                  'disabled relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                ]"
              >
                <span
                  aria-hidden="true"
                  :class="[
                    props.personalData.smsNotification
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
                v-model="props.personalData.dsgvoConfirmed"
                :class="[
                  props.personalData.dsgvoConfirmed ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                ]"
              >
                <span
                  aria-hidden="true"
                  :class="[
                    props.personalData.dsgvoConfirmed
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
    </div> -->
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { usePersonalDataStore } from "@/modules/settings/store/personal-data";
import { PencilIcon } from "@heroicons/vue/20/solid";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const personalDataStore = usePersonalDataStore();

const route = useRoute();

const props = defineProps({
  personalData: Object,
  editable: Boolean,
});

</script>
