<template>
  <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
    <div class="pb-3">
      <div class="flex w-0 items-center">
        <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
          Einladung
        </h3>
      </div>
    </div>
    <div class="sm:col-span-2">
      <div class="sm:col-span-2 border border-1 px-2 py-2">
        <dt class="text-sm font-medium text-gray-500">Einladungtext</dt>
        <p v-html="event.longDescription"></p>
      </div>
    </div>
  </div>
  <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
    <div class="pb-3">
      <div class="flex w-0 items-center">
        <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
          Termin
        </h3>
      </div>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Alles rund um die Termine
      </p>
    </div>
    <TimelineEvent :event="event" />
  </div>
  <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
    <div class="pb-3">
      <div class="flex w-0 items-center">
        <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
          Ort
        </h3>
      </div>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        An welchem Ort findet das Lager statt?
      </p>
    </div>
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Name</dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ event.location?.name }}
        </dd>
      </div>
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Entfernung</dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ (event?.location?.distance || 0).toFixed(0) }} Km
        </dd>
      </div>
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Ort</dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ event?.location?.zipCode?.city }}
        </dd>
      </div>
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Adresse</dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ event?.location?.address || "Keine Adresse angegeben" }}
        </dd>
      </div>
    </dl>
  </div>
  <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
    <div class="pb-3">
      <div class="flex w-0 items-center">
        <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
          Rechte und Zugriffe
        </h3>
      </div>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Wer kann die Daten sehen und ändern?
      </p>
    </div>
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          Wer darf deine Anmeldungen sehen?
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ event.viewGroup?.name }}
        </dd>
      </div>
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          Wer darf die persönlichen Daten deiner Anmeldungen sehen?
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ event.adminGroup?.displayName }}
        </dd>
      </div>
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          Welche Organisation läd ein?
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ event.invitingGroup?.displayName }}
        </dd>
      </div>
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">
          Veranwortliche Personen
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ event.responsiblePersons?.map((a) => `${a.username}`).join(", ") }}
        </dd>
      </div>
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Ebene der Anmeldung</dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ event.registrationLevel?.name }}
        </dd>
      </div>
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">Wer ist eingeladen?</dt>
        <dd
          v-if="event.invitedGroups && event.invitedGroups.length > 0"
          class="mt-1 text-sm text-gray-900"
        >
          {{ event.invitedGroups?.map((a) => `${a.displayName}`).join(", ") }}
        </dd>
        <dd v-else class="mt-1 text-sm text-gray-900">Jeder</dd>
      </div>
    </dl>
  </div>
  <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
    <div class="pb-3">
      <div class="flex w-0 items-center">
        <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
          Datenabfrage
        </h3>
      </div>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Welche Daten brauchst du für die Anmeldung?
      </p>
    </div>
    <div class="sm:col-span-2" v-if="event.eventmoduleSet?.length">
      <dl class="space-y-6 divide-y divide-gray-900/10">
        <Disclosure
          v-for="child in event.eventmoduleSet"
          :key="child.id"
          v-slot="{ open }"
          class="pt-2"
          as="div"
        >
          <dt>
            <DisclosureButton
              class="flex w-full items-start justify-between text-left text-gray-900"
            >
              <span class="text-base font-normal leading-7">{{
                child.header
              }}</span>
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
            <p
              class="text-base leading-7 text-gray-600"
              v-html="child.description || ''"
            ></p>
            <div
              v-for="attribute in child.attributeModules"
              :key="attribute.id"
              class="mb-3"
            >
              <p class="text-sm leading-7 text-gray-800">
                {{ attribute.title }}
              </p>
              <p
                class="text-sm leading-7 text-gray-500"
                v-html="attribute.text"
              ></p>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </dl>
    </div>
  </div>
  <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
    <div class="pb-3">
      <div class="flex w-0 items-center">
        <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
          Preise und Anmeldeoptionen
        </h3>
      </div>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Mit diesen Optionen kannst du dich und andere Teilnehmende anmelden.
      </p>
    </div>
    <div class="sm:col-span-2" v-if="event?.bookingOptions?.length">
      <dd class="text-sm text-gray-900">
        <ul
          role="list"
          class="divide-y divide-gray-200 rounded-md border border-gray-200"
        >
          <li
            class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
            v-for="child in event?.bookingOptions"
            :key="child.id"
          >
            <div class="flex w-0 flex-1 items-center">
              <AdjustmentsVerticalIcon
                class="h-5 w-5 mr-2 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <span> {{ `${child.name} - ${child.price} €` }}</span>
              <span v-if="child.bookableTill" class="text-red-500 ml-3">
                {{ ` bis ${$dayjs(child.bookableTill).format("ll")}` }}</span
              >
            </div>
            <div class="ml-4 flex-shrink-0"></div>
          </li>
        </ul>
      </dd>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import {
  AdjustmentsVerticalIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/vue/24/outline";

import TimelineEvent from "@/modules/event/components/general/TimelineEvent.vue";

const props = defineProps({
  event: Object,
});
</script>
