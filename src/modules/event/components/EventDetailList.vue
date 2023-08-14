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
                {{ event.name }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ event.shortDescription }}
              </p>
            </div>
          </div>
        </div>
        <div class="ml-4 mt-4 flex flex-shrink-0">
          <PrimaryButton
            :icon="DocumentChartBarIcon"
            @click="onStatisticsClicked"
            class="mx-0 my-2"
          >
            Statistiken anzeigen
          </PrimaryButton>
        </div>
      </div>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-6 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Namen und Texte
          </h3>
          <button
            @click="onEventEditClicked(0)"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PencilSquareIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Alle arten von Texten, die für die Veranstaltung wichtig ist.
        </p>
      </div>
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Titel der Veranstaltung
          </dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.name }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Kurze Beschreibung</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.shortDescription }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Technischer Name</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ event.technicalName }}</dd>
        </div>
        <div class="sm:col-span-2">
          <div class="sm:col-span-2 border border-1 px-2 py-2">
            <dt class="text-sm font-medium text-gray-500">Einladungtext</dt>
            <dd
              class="mt-1 text-sm text-gray-900"
              v-html="event.longDescription"
            ></dd>
          </div>
        </div>
      </dl>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Termine
          </h3>
          <button
            @click="onEventEditClicked(1)"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PencilSquareIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Termine and Anmeldeschluss
        </p>
      </div>
      <TimelineEvent :event="event" />
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Ort der Veranstaltung
          </h3>
          <button
            @click="onLocationEditClicked({})"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
          <button
            @click="onLocationEditClicked(event.location)"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PencilSquareIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
          <!-- <button @click="onEventEditClicked" type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <ListBulletIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button> -->
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
          <button
            @click="onEventEditClicked(2)"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PencilSquareIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Wer kann die Daten sehen und ändern?
        </p>
      </div>
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Wer darf die Anmeldungen sehen?
          </dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.viewGroup?.displayName }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Wer darf die persönliche Daten der Anmeldungen sehen?
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
            {{ event.responsiblePersons?.map((a) => `${a}`).join(", ") }}
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
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">
            Öffentlich einsehbar?
          </dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.isPublic ? "Ja" : "Nein" }}
          </dd>
        </div>
      </dl>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Buchung Optionen
          </h3>
          <button
            @click="onEventEditClicked(3, {})"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div class="sm:col-span-2" v-if="event?.bookingOptions?.length">
        <dd class="mt-1 text-sm text-gray-900">
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
                <button
                  @click="onEventEditClicked(3, child)"
                  type="button"
                  class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PencilSquareIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div class="ml-4 flex-shrink-0"></div>
            </li>
          </ul>
        </dd>
      </div>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Module
          </h3>
          <button
            @click="onEventModuleNewClicked"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Die Reihenfolge kann per Drag and Drop verändert werden.
        </p>
      </div>
      <div class="sm:col-span-2" v-if="event?.eventmoduleSet?.length">
        <dd class="mt-1 text-sm text-gray-900">
          <ul
            role="list"
            class="divide-y divide-gray-200 rounded-md border border-gray-200"
          >
            <draggable v-model="eventmodules" item-key="ordering">
              <template #item="{ element }">
                <div class="drag-item">
                  <li
                    class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                    :key="element.ordering"
                  >
                    <div class="flex w-0 flex-1 items-center">
                      <Bars3Icon
                        v-if="!element.required"
                        class="h-5 w-5 mr-2 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span class="text-md font-medium">
                        {{ `${element.ordering + 1}` }} -
                        {{ `${element.header}` }}</span
                      >
                      <button
                        @click="onEventModuleEditClicked(element)"
                        type="button"
                        class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <PencilSquareIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        v-if="!element.required"
                        @click="onRegDeleteClicked(element)"
                        type="button"
                        class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <TrashIcon
                          class="h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        @click="addNewAttributeClicked(element)"
                        type="button"
                        class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <PlusCircleIcon
                          class="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </li>
                  <li class="mx-7">
                    <ul role="list" class="">
                      <li
                        v-for="attribute in element.attributeModules"
                        :key="attribute.id"
                        class="flex gap-x-4 pb-5"
                      >
                        <div class="flex min-w-0 gap-x-4">
                          <div class="min-w-0 flex-auto">
                            <p class="text-xs font-medium text-gray-900">
                              {{ attribute.title }}
                              <button
                                @click="
                                  onModuleAttributeEditClicked(
                                    attribute,
                                    element
                                  )
                                "
                                type="button"
                                class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                <PencilSquareIcon
                                  class="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                @click="
                                  onAttributeDeleteClicked(attribute, element)
                                "
                                type="button"
                                class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                <TrashIcon
                                  class="h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                              </button>
                            </p>
                            <p
                              class="mt-1 truncate text-xs leading-5 text-gray-500"
                            >
                              {{ attribute.text }}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </div>
              </template>
            </draggable>
          </ul>
        </dd>
      </div>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6">
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Layout und Design
          </h3>
          <button
            @click="onEventEditClicked(4)"
            type="button"
            class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PencilSquareIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Besondere Anpassungen
        </p>
      </div>
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">E-Mail Template?</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.emailSet?.name }}
          </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Theme</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ event.theme?.name }}
          </dd>
        </div>
      </dl>
    </div>
    <EventEditOverlay
      :open="openEventEdit"
      :items="eventData"
      @close="onEventClosedClicked"
      header="Event bearbeiten"
      :formNo="eventEditForm"
    />
    <LocationOverlay
      :open="openLocationEdit"
      :items="locationData"
      @close="onLocationEditClosedClicked"
      header="Ort"
    />
    <EventModalOverlay
      :open="openEventModuleEdit"
      :items="eventModuleData"
      @close="onEventModuleClosedClicked"
      header="Module"
    />
    <DeleteModal
      :open="openDeleteModal"
      :header="'Module entfernen?'"
      :text="'Bist du dir sicher, dass du dieses Module entfernen möchtest?'"
      :callbackOnConfirm="onModuleDelete"
      :callbackOnCancel="cancelModal"
    >
    </DeleteModal>
    <ModuleAttributeOverlay
      :open="openModuleAttributeEdit"
      :items="moduleAttributeData"
      @close="onModuleAttributeClosedClicked"
      header="Attribute"
    />
    <DeleteModal
      :open="openAttributeDeleteModal"
      :header="'Attribute löschen?'"
      :text="'Bist du dir sicher, dass du dieses Attribute unwiderruflich löschen möchtest?'"
      :callbackOnConfirm="onModuleAttributeDelete"
      :callbackOnCancel="cancelModuleAttributeModal"
    >
    </DeleteModal>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();
const route = useRoute();

import {
  PencilIcon,
  CalendarIcon,
  PencilSquareIcon,
  QueueListIcon,
  AdjustmentsVerticalIcon,
  PlusCircleIcon,
  CpuChipIcon,
  ArrowSmallUpIcon,
  DocumentChartBarIcon,
  PlusIcon,
  TrashIcon,
  ListBulletIcon,
  Bars3Icon,
} from "@heroicons/vue/24/outline";
import PrimaryButton from "@/components/button/Primary.vue";
import DeleteModal from "@/components/modal/Delete.vue";

import EventEditOverlay from "@/modules/event/components/EventEdit/Overlay.vue";
import LocationOverlay from "@/modules/event/components/EventEdit/location/Overlay.vue";
import EventModalOverlay from "@/modules/event/components/eventModule/Overlay.vue";
import ModuleAttributeOverlay from "@/modules/event/components/moduleAttribute/Overlay.vue";

import TimelineEvent from "@/modules/event/components/general/TimelineEvent.vue";
import draggable from "vuedraggable";

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

// edit Event
const openEventEdit = ref(false);
const eventData = ref({});
const eventEditForm = ref(0);

// location
const openLocationEdit = ref(false);
const locationData = ref({});

// event Module
const openEventModuleEdit = ref(false);
const eventModuleData = ref({});

function onEventModuleClosedClicked() {
  openEventModuleEdit.value = false;
  eventModuleData.value = {};
}

function onEventModuleEditClicked(data) {
  openEventModuleEdit.value = true;
  eventModuleData.value = data;
}

function onEventModuleNewClicked() {
  openEventModuleEdit.value = true;
}
// event Module ends

// module Attribute
const openModuleAttributeEdit = ref(false);
const moduleAttributeData = ref({});

function onModuleAttributeClosedClicked() {
  openModuleAttributeEdit.value = false;
  moduleAttributeData.value = {};
}

function onModuleAttributeEditClicked(attribute, module) {
  openModuleAttributeEdit.value = true;
  moduleAttributeData.value = {
    eventModule: module.id,
    ...attribute,
  };
}

function addNewAttributeClicked(module) {
  openModuleAttributeEdit.value = true;
  moduleAttributeData.value = {
    eventModule: module.id
  };
}
// event Module ends

function saveModules(modules) {
  const eventId = route.params.id;
  let eventModuleId = null;
  modules.forEach((module, index) => {
    eventModuleId = module.id;
    eventStore.updatePartialEventModuleById(eventId, eventModuleId, {
      ordering: index,
    });
  });
  eventStore.fetchEvent(eventId);
}

const eventmodules = computed({
  get() {
    return eventStore.eventmodules;
  },
  set(newValue) {
    saveModules(newValue);
  },
});

function onEventEditClicked(formNo, child = null) {
  openEventEdit.value = true;
  eventEditForm.value = formNo;
  if (child === null) {
    eventData.value = props.event;
  } else {
    eventData.value = child;
  }
}

function onLocationEditClicked(data) {
  openLocationEdit.value = true;
  locationData.value = data;
}

function onEventClosedClicked() {
  openEventEdit.value = false;
  eventData.value = {};
}

function onLocationEditClosedClicked() {
  openLocationEdit.value = false;
  locationData.value = {};
}

function onStatisticsClicked() {
  const id = route.params.id;
  router.push({
    name: "EventStatisticSummary",
    params: {
      id,
    },
  });
}

function onModuleDelete() {
  const eventId = route.params.id;
  const id = deleteId.value;
  eventStore.deleteEventModule(eventId, id).then(() => {
    eventStore.fetchEvent(eventId);
    openDeleteModal.value = false;
  });
}

function onModuleAttributeDelete(data) {
  const id = deleteAttributeId.value;
  const eventId = route.params.id;
  eventStore.deleteModuleAttribute(id).then(() => {
    eventStore.fetchEvent(eventId);
    openAttributeDeleteModal.value = false;
  });
}

const openDeleteModal = ref(false);
const openAttributeDeleteModal = ref(false);
const deleteId = ref(null);

async function onRegDeleteClicked(data) {
  openDeleteModal.value = true;
  deleteId.value = data.id;
}
const deleteAttributeId = ref(null);

async function onAttributeDeleteClicked(data) {
  openAttributeDeleteModal.value = true;
  deleteAttributeId.value = data.id;
}

function cancelModal() {
  openDeleteModal.value = false;
}

function cancelModuleAttributeModal() {
  openAttributeDeleteModal.value = false;
}

const props = defineProps({
  event: Object,
});
</script>