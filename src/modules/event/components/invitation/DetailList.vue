<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div
        class="-ml-4 -mt-4 flex grow items-center justify-between sm:flex-nowrap"
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
        <div class="inline-flex rounded-md shadow-sm" v-if="isEdit">
          <button
            type="button"
            class="relative inline-flex items-center rounded-l-md bg-green-600 px-3 py-2 text-sm font-semibold text-gray-100 ring-1 ring-inset ring-gray-100 hover:bg-green-700 focus:z-10"
            @click="onRegClicked(event)"
          >
            <PencilIcon class="h-5 w-5" aria-hidden="true" />
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
                  <MenuItem
                    v-for="item in buttonItems"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <router-link
                      :to="item.link"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                    >
                      {{ item.name }}
                    </router-link>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <!-- <div class="flex">
          <div class="grow"></div>
          <div
            v-if="
              event.status == 'pending' &&
              !event?.existingRegister?.id
            "
            class="ml-4 mt-4 flex flex-shrink-0"
          >
            <PrimaryButton
              @click="onInvitationClicked(event.id)"
              :icon="PaperAirplaneIcon"
              class="mx-0 my-2"
              :disabled="!startDateInFuture(event)"
            >
              Jetzt Anmelden
            </PrimaryButton>
          </div>
          <div
            v-if="event.status == 'pending' && event?.existingRegister?.id"
            class="ml-4 mt-4 flex flex-shrink-0"
          >
            <PrimaryButton
              @click="onRegClicked(event)"
              color="green"
              :icon="PencilIcon"
              class="mx-0 my-2"
              :label="windowWidth > 800 ? 'Anmeldung' : 'Anmeldung'"
            >
            </PrimaryButton>
          </div>
          <div
            v-if="event.status == 'pending' && event?.existingRegister?.id"
            class="ml-4 mt-4 flex flex-shrink-0"
          >
            <PrimaryButton
              color="red"
              @click="onInvitationClicked(event.id)"
              :icon="PlusSmallIcon"
              class="mx-0 my-2"
              :label="windowWidth > 800 ? 'neu' : 'neu'"
            >
            </PrimaryButton>
          </div>
        </div> -->
      </div>
    </div>
    <div
      v-if="event.status == 'pending' && event?.existingRegister?.id"
      class="border-t-8 border-gray-100 px-4 py-5 sm:px-6"
    >
      <button
        type="submit"
        class="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-10 py-1 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        @click="onRegClicked(event)"
      >
        Deine Anmeldung öffnen
      </button>
    </div>
    <div class="border-t-8 border-gray-100 px-4 py-5 sm:px-6" v-if="!isEdit">
      <button
        type="submit"
        class="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-10 py-1 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        @click="onInvitationClicked(event)"
        :disabled="!startDateInFuture(event)"
      >
        Anmeldung starten
      </button>
    </div>
    <EventDetailsReadOnly :event="event"/>

  </div>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, ref} from "vue";
import {CalendarIcon, PencilIcon} from "@heroicons/vue/24/outline";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {ChevronDownIcon} from "@heroicons/vue/20/solid";
import {useEventRegisterStore} from "@/modules/event/store/register.ts";
import {useRouter} from "vue-router";
import dayjs from "dayjs";
import EventDetailsReadOnly from "@/modules/event/components/invitation/EventDetailsReadOnly.vue";

const eventRegisterStore = useEventRegisterStore();

const router = useRouter();

dayjs.locale("de");

const buttonItems = computed(() => {
  return [
    {
      name: "neue Gruppe anmelden",
      link: {
        name: "RegistrationIntroduction",
        params: {
          id: props.event?.id || 0,
          module: getRegistrationIntroductionId(props.event),
        },
      },
    },
  ];
});

const isEdit = computed(() => {
  return (
    props?.event?.status == "pending" && props?.event?.existingRegister?.id
  );
});

function getRegistrationIntroductionId(event) {
  return event?.eventmoduleSet?.find((a) => a.name == "Introduction")?.id;
}

function onInvitationClicked(event) {
  eventRegisterStore.$reset();

  router.push({
    name: "RegistrationIntroduction",
    params: {
      id: event.id,
      module: getRegistrationIntroductionId(event),
    },
  });
}

function startDateInFuture(event: any) {
  return dayjs().diff(dayjs(event.registrationStart)) > 0;
}

const windowWidth = ref(100);

function onRegClicked(event: any) {
  router.push({
    name: "RegistrationsDetail",
    params: {
      id: event?.existingRegister?.id,
    },
  });
}

function onResize() {
  windowWidth.value = window.innerWidth;
}

const props = defineProps({
  event: Object,
});

onMounted(() => {
  onResize();
  nextTick(() => {
    window.addEventListener("resize", onResize);
  });
});
</script>
