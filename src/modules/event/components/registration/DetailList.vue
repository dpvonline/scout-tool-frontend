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
          <PrimaryButton
            :icon="HandThumbUpIcon"
            class="mx-0 my-2"
          >
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
            {{ registration?.responsiblePersons?.map((a) => `${a.email}`).join(", ") }}
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