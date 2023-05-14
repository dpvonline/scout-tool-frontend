<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div
        class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
      >
        <div class="ml-4 mt-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span
                class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100"
              >
                <CalendarIcon />
              </span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Deine Anmeldung zu {{ registration?.event?.name }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ registration?.responsablePerson?.name }}
              </p>
            </div>
          </div>
        </div>
        <div class="ml-4 mt-4 flex flex-shrink-0">
          <PrimaryButton :icon="EnvelopeIcon"  @click="onConfirmMailClicked" class="mx-0 my-2">
            Bestätigung senden
          </PrimaryButton>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
        Zusammenfassung
      </h3>
      <dl class="grid grid-cols-1 mt-2 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Deine Anmeldezahl</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ registration?.participantCount }} ({{ registration?.price?.toFixed(2) }} €)
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Dein Stamm</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ registration.scoutOrganisation?.name }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Verantwortlich</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{
              registration?.responsiblePersons
                ?.map((a) => `${a.email}`)
                .join(", ")
            }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Anmeldeschluss</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{
              moment(registration?.event?.registrationDeadline).format("llll")
            }}
          </dd>
        </div>
      </dl>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <div class="pb-2">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Personen
          </h3>
          <button
            @click="onNewPersonClicked"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <UserPlusIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Folgende Personen hast du angemeldet
        </p>
      </div>
      <div
        class="sm:col-span-2"
        v-if="registration?.registrationparticipantSet?.length"
      >
        <dl class="mt-2 space-y-6 divide-y divide-gray-900/10">
          <Disclosure
            as="div"
            v-for="person in registration?.registrationparticipantSet"
            :key="person.id"
            class="pt-3"
            v-slot="{ open }"
          >
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-gray-900"
              >
                <span class="text-base font-semibold leading-7"
                  >{{ person.displayName }} --
                  {{ person.bookingOption.name }} ({{
                    person.bookingOption.price
                  }}€ )</span
                >
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <!-- <button
                @click="onEditPersonClicked(person)"
                type="button"
                class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PencilSquareIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <XMarkIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </button> -->
              <p class="text-base leading-7 text-gray-600">
                Geschlecht: {{ person.getGenderDisplay }}
              </p>
              <p class="text-base leading-7 text-gray-600">
                Geburtsdatum: {{ moment(person.birthday).format("ll") }}
              </p>
              <p class="text-base leading-7 text-gray-600">
                Essenbesonderheiten: {{ person?.eatHabit?.map((a) => `${a}`).join(", ") }}
              </p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
      <div v-else>
        <p class="text-sm text-gray-400">Noch niemanden angemeldet</p>
      </div>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
        Weitere Daten
      </h3>
      <dl
        class="grid grid-cols-1 mt-2 gap-x-4 gap-y-8 sm:grid-cols-2"
        v-for="attribute in registration?.attributes"
        :key="attribute.id"
      >
        <component :is="components[attribute.type]" :data="attribute">
        </component>
      </dl>
    </div>
    <AddPersonModal
      :open="openNewPersonModal"
      :person="person"
      :callbackOnConfirm="onNewPersonConfirmClicked"
      :callbackOnCancel="onNewPersonCancelClicked"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

import moment from "moment";
import {
  PaperClipIcon,
  PencilIcon,
  ChatBubbleLeftIcon,
  InboxIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  HandThumbUpIcon,
  MinusSmallIcon,
  PlusSmallIcon,
  AdjustmentsVerticalIcon,
  PencilSquareIcon,
  XMarkIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/outline";
import PrimaryButton from "@/components/button/Primary.vue";

import MessageEditOverlay from "@/modules/message/components/MessageEdit/Overlay.vue";
import IssueEditOverlay from "@/modules/message/components/IssueEdit/Overlay.vue";
import AddPersonModal from "@/modules/event/components/registration/AddPersonModal.vue";

import booleanAttribute from "@/modules/event/components/registration/attribute/booleanAttribute.vue";
import stringAttribute from "@/modules/event/components/registration/attribute/stringAttribute.vue";
import travelAttribute from "@/modules/event/components/registration/attribute/travelAttribute.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

const components = {
  booleanAttribute,
  stringAttribute,
  travelAttribute,
};

function onRegistrationClicked(id) {
  router.push({
    name: "RegistrationNewStart",
    params: {
      id: id,
    },
  });
}

const props = defineProps({
  registration: Object,
});

const person = ref({});
const openNewPersonModal = ref(false);

function onNewPersonClicked() {
  openNewPersonModal.value = true;
  person.value = {};
}
function onEditPersonClicked(item) {
  openNewPersonModal.value = true;
  person.value = item;
}

function onNewPersonCancelClicked() {
  openNewPersonModal.value = false;
}

function onNewPersonConfirmClicked(newPerson) {
  openNewPersonModal.value = false;
}

function onConfirmMailClicked() {
  const regId = route.params.id;
  eventRegisterStore.sendConfirmMail(regId).them
}
</script>