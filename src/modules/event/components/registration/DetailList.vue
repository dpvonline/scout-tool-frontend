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
          <PrimaryButton :icon="HandThumbUpIcon" class="mx-0 my-2">
            bearbeiten
          </PrimaryButton>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Deine Anmeldezahl</dt>
          <dd class="mt-1 text-sm text-gray-900">
            {{ registration?.participantCount }}
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
      <div class="pb-3">
        <div class="flex w-0 items-center">
          <h3 class="flex-none text-base font-semibold leading-7 text-gray-900">
            Datenabfrage
          </h3>
          <button
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
          Welche Daten brauchst du für die Anmeldung?
        </p>
      </div>
      <div class="sm:col-span-2" v-if="event?.eventmodulemapperSet?.length">
        <dd class="mt-1 text-sm text-gray-900">
          <ul
            role="list"
            class="divide-y divide-gray-200 rounded-md border border-gray-200"
          >
            <li
              class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              v-for="child in event?.eventmodulemapperSet"
              :key="child.ordering"
            >
              <div class="flex w-0 flex-1 items-center">
                <QueueListIcon
                  class="h-5 w-5 mr-2 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span> {{ child.module.header }}</span>
              </div>
              <div class="ml-4 flex-shrink-0">
                <!-- <router-link
                  v-if="child.ordering"
                  :to="{
                    name: 'GroupOverview',
                    params: {
                      id: 1,
                    },
                  }"
                  class="text-blue-600 hover:text-blue-900"
                  >Admingruppe öffnen<span class="sr-only"
                    >, {{ child.ordering }}</span
                  ></router-link
                > -->
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </div>
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
} from "@heroicons/vue/24/outline";
import PrimaryButton from "@/components/button/Primary.vue";

import MessageEditOverlay from "@/modules/message/components/MessageEdit/Overlay.vue";
import IssueEditOverlay from "@/modules/message/components/IssueEdit/Overlay.vue";

import { useRouter } from "vue-router";
const router = useRouter();

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
</script>