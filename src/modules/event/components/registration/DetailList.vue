<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div
        class="-ml-4 -mt-4 flex items-center justify-between flex-nowrap"
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
          <button
            type="button"
            class="relative inline-flex items-center rounded-l-md bg-red-600 px-3 py-2 text-sm font-semibold text-gray-100 ring-1 ring-inset ring-gray-100 hover:bg-red-700 focus:z-10"
            @click="onRegDeleteClicked"
          >
            <TrashIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <Menu as="div" class="relative -ml-px block">
            <MenuButton
              class="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-100 hover:bg-gray-50 focus:z-10"
            >
              <span class="sr-only">Open options</span>
              <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <PrimaryButton
                    class="my-1"
                    color="blue"
                    @click="onConfirmMailClicked"
                    :isLoading="isLoading"
                  >
                    Bestätigungs-Email erneut senden
                  </PrimaryButton>
                  <PrimaryButton
                    class="my-1"
                    color="blue"
                    @click="onAddResponsablePersonClicked"
                    :isLoading="isLoading"
                  >
                    Verantwortliche Person hinzufügen
                  </PrimaryButton>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <!-- <div class="ml-4 mt-4 flex flex-shrink-0">
          <PrimaryButton
            :icon="EnvelopeIcon"
            @click="onConfirmMailClicked"
            class="mx-0 my-2"
          >
            Bestätigung senden
          </PrimaryButton>
        </div>
        <div class="ml-4 mt-4 flex flex-shrink-0">
          <PrimaryButton
            :icon="TrashIcon"
            @click="onRegDeleteClicked"
            color="red"
            class="mx-0 my-2"
          >
            Löschen
          </PrimaryButton>
        </div> -->
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
            {{ registration?.participantCount }} ({{
              registration?.price?.toFixed(2)
            }}
            €)
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
              $dayjs(registration?.event?.registrationDeadline).format("llll")
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
          Folgende Personen hast du angemeldet:
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
              <button
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
                @click="onDeletePersonClicked(person)"
                type="button"
                class="flex-shrink-0 rounded-full bg-transarent p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <XMarkIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
              <p class="text-base leading-7 text-gray-600">
                Geschlecht: {{ person.getGenderDisplay }}
              </p>
              <p class="text-base leading-7 text-gray-600">
                Geburtsdatum: {{ $dayjs(person.birthday).format("ll") }}
              </p>
              <p class="text-base leading-7 text-gray-600">
                Essenbesonderheiten:
                {{
                  person?.eatHabit?.length
                    ? person?.eatHabit?.map((a) => `${a}`).join(", ")
                    : "Keine"
                }}
              </p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
      <div v-else>
        <p class="text-sm text-gray-400">Noch niemanden angemeldet</p>
      </div>
    </div>
    <div
      v-for="mod in getOverviewModules(registration)"
      :key="mod.id"
      class="border-t-8 border-gray-100 px-4 py-5 sm:px-6"
    >
      <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
        {{ mod.header }}
      </h3>
      <p
        class="mt-1 max-w-2xl text-sm leading-6 text-gray-500"
        v-html="mod.description || ''"
      ></p>
      <dl
        v-for="modu in mod.attributeModules"
        :key="modu.id"
        class="grid grid-cols-1 mt-2 gap-x-4 gap-y-8 sm:grid-cols-2"
      >
        <div v-if="filterAttribute(modu.id).length > 0">
          <div v-for="attribute in filterAttribute(modu.id)" :key="modu.id">
            <component
              :is="components[attribute.attributeModule.fieldType]"
              :data="modu"
              :value="attribute"
            >
            </component>
          </div>
        </div>
        <div v-else>
          <component
            :is="components[modu.fieldType]"
            :data="modu"
            :value="null"
          >
          </component>
        </div>
      </dl>
    </div>
    <DeleteModal
      :open="openDeleteModal"
      :header="'Anmeldung löschen?'"
      :text="'Bist du dir sicher, dass du die Anmeldung unwiderruflich löschen möchtest?'"
      :callbackOnConfirm="deleteReg"
      :callbackOnCancel="cancelModal"
    >
    </DeleteModal>
    <DeleteModalPerson
      :open="openDeletePersonModal"
      :callbackOnConfirm="deletePerson"
      :callbackOnCancel="cancelModalPerson"
    >
    </DeleteModalPerson>
    <AddPersonModal
      :open="openNewPersonModal"
      :person="person"
      :callbackOnConfirm="onNewPersonConfirmClicked"
      :callbackOnCancel="onNewPersonCancelClicked"
    />
    <AddMemberModal
      :header="'User zur Fahrtenleitung hinzufügen'"
      :text="'Welchen User möchtest du zu dieser Anmeldung hinzufügen?'"
      :open="openAddMember"
      :callbackOnConfirm="onAddMemberConfirmClicked"
      :callbackOnCancel="onAddMemberCancellicked"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

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
  TrashIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";
import PrimaryButton from "@/components/button/Primary.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import MessageEditOverlay from "@/modules/message/components/MessageEdit/Overlay.vue";
import IssueEditOverlay from "@/modules/message/components/IssueEdit/Overlay.vue";
import AddPersonModal from "@/modules/event/components/registration/AddPersonModal.vue";

import booleanAttribute from "@/modules/event/components/registration/attribute/booleanAttribute.vue";
import dateTimeAttribute from "@/modules/event/components/registration/attribute/dateTimeAttribute.vue";
import integerAttribute from "@/modules/event/components/registration/attribute/integerAttribute.vue";
import floatAttribute from "@/modules/event/components/registration/attribute/floatAttribute.vue";
import stringAttribute from "@/modules/event/components/registration/attribute/stringAttribute.vue";
import travelAttribute from "@/modules/event/components/registration/attribute/travelAttribute.vue";

import AddMemberModal from "@/modules/event/components/registration/AddMemberModal.vue";

import DeleteModal from "@/components/modal/Delete.vue";
import DeleteModalPerson from "@/components/modal/Delete.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

import { useEventRegisterStore } from "@/modules/event/store/register.ts";
const eventRegisterStore = useEventRegisterStore();

import { useCommonStore } from "@/modules/common/store";
const commonStore = useCommonStore();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const openDeleteModal = ref(false);
const openDeletePersonModal = ref(false);

const isLoading = ref(false);

const components = {
  booleanAttribute,
  dateTimeAttribute,
  integerAttribute,
  floatAttribute,
  stringAttribute,
  travelAttribute,
};

function filterAttribute(id: any) {
  return props.registration?.attributes.filter(
    (item) => item.attributeModule.id === id
  );
}

function onRegistrationClicked(id: any) {
  router.push({
    name: "RegistrationIntroduction",
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

const fieldTypes = {
  booleanAttribute: "booleanField",
  dateTimeAttribute: "dateTimeField",
  integerAttribute: "integerField",
  floatAttribute: "floatField",
  stringAttribute: "stringField",
  travelAttribute: "travelField",
};

function getValueByAttribute(currentAttribute, attributes) {
  try {
    const valueObj = attributes.find((attribute) => {
      return attribute.attributeModule.id == currentAttribute.id;
    });
    return valueObj;
  } catch (e) {
    return null;
  }
}

function getOverviewModules(registration: any) {
  try {
    const list = registration?.event?.eventmoduleSet;
    const arrB = ["Custom", "Letter", "Travel", "TravelBack"];
    const filteredArray = list.filter(
      (itm: any) => arrB.indexOf(itm.name) > -1
    );
    return filteredArray;
  } catch (e) {
    return [];
  }
}

function onNewPersonClicked() {
  openNewPersonModal.value = true;
  person.value = {};
}
function onEditPersonClicked(item) {
  openNewPersonModal.value = true;
  person.value = item;
}

function onDeletePersonClicked(item) {
  openDeletePersonModal.value = true;
  person.value = item;
}

function onNewPersonCancelClicked() {
  openNewPersonModal.value = false;
}

async function onNewPersonConfirmClicked(newPerson) {
  openNewPersonModal.value = false;
  const regId = route.params.id;
  let response = null;

  if (!newPerson.id) {
    response = await eventRegisterStore.addPersonToReg(regId, newPerson);
  } else if (newPerson.id) {
    response = await eventRegisterStore.updatePersonToReg(regId, newPerson);
  }
  if (response && response.status === 201) {
    const response = await eventStore.fetchRegistration(regId);
    commonStore.showSuccess("Person erfolgreich angelegt");
  } else if (response && response.status === 400) {
    commonStore.showSuccess(`Die Anfrage ist Fehlerhaft.${response.data}`);
  } else {
    console.log(response);
  }

  if (response && response.status === 200) {
    const response = await eventStore.fetchRegistration(regId);
    commonStore.showSuccess("Person erfolgreich aktuallisiert");
  } else if (response && response.status === 400) {
    commonStore.showSuccess(`Die Anfrage ist Fehlerhaft.${response.data}`);
  } else {
    console.log(response);
  }
}

async function onRegDeleteClicked() {
  openDeleteModal.value = true;
}

function deleteReg() {
  const regId = route.params.id;
  eventStore.deleteRegistration(regId).then((response) => {
    console.log(response);
    if (response?.status === 204) {
      router.push({
        name: "EventRegistrations",
        query: { status: "pending" },
      });
      commonStore.showSuccess("Anmeldung erfolgreich gelöscht");
      openDeleteModal.value = false;
    } else {
      commonStore.showError(response?.response?.data?.detail);
    }
  });
}

function cancelModalPerson() {
  openDeletePersonModal.value = false;
}

async function deletePerson() {
  const regId = route.params.id;
  const response = await eventRegisterStore.deletePersonToReg(
    regId,
    person.value
  );
  if (response && response.status === 204) {
    const response = await eventStore.fetchRegistration(regId);
    commonStore.showSuccess("Person erfolgreich aktuallisiert");
    openDeletePersonModal.value = false;
  } else if (response && response.status === 400) {
    commonStore.showSuccess(`Die Anfrage ist Fehlerhaft.${response.data}`);
  } else {
    console.log(response);
  }
}

function cancelModal() {
  openDeleteModal.value = false;
}

async function onConfirmMailClicked() {
  isLoading.value = true;
  const regId = route.params.id;
  let response = null;
  try {
    response = await eventRegisterStore.sendConfirmMail(regId);
  } catch (e: any) {
    const statusCode = e.response.status; // 400
    const statusText = e.response.statusText; // Bad Request
    response = e;
  }
  if (response && response?.status === 200) {
    commonStore.showSuccess("E-Mail erfolgreich versendet");
    isLoading.value = false;
  } else {
    commonStore.showError("E-Mail nicht versendet");
    isLoading.value = false;
  }
}

// - - - - - Add User - - - - - - - - - - -
function onAddResponsablePersonClicked() {
  openAddMember.value = true;
  isLoading.value = true;
}

const openAddMember = ref(false);
function onAddMemberClicked() {
  openAddMember.value = true;
}
async function onAddMemberConfirmClicked(userId) {
  const regId = route.params.id;
  eventRegisterStore.addResponsablePerson({
    id: regId,
    responsiblePersons: props.registration?.responsiblePersons
      .map((a) => a.id)
      .concat([userId]),
  });
  const response = await eventStore.fetchRegistration(regId);
  commonStore.showSuccess("User zur Fahrtenleitung hinzugefügt");
  openAddMember.value = false;
  isLoading.value = false;
}
function onAddMemberCancellicked() {
  openAddMember.value = false;
}
</script>
