<template>
  <div class="flow-root">
    <ul role="list" class="-mb-8">
      <li v-for="(event, eventIdx) in timeline" :key="event.id">
        <div class="relative pb-8">
          <span
            v-if="eventIdx !== timeline.length - 1"
            class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
          <div class="relative flex space-x-3">
            <div>
              <span
                :class="[
                  event.iconBackground,
                  'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                ]"
              >
                <component
                  :is="event.icon"
                  class="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
              <div>
                <p class="text-sm text-gray-500">
                  {{ event.content }}
                </p>
                <p class="font-medium text-gray-900">
                  {{ event.target }} ({{
                    daydeltaToNow(event.date) >= 0 ? "in" : "seit"
                  }}
                  {{ Math.abs(daydeltaToNow(event.date)) }} Tagen)
                </p>
              </div>
              <div class="whitespace-nowrap text-right text-sm text-gray-500">
                <time :datetime="event.datetime">{{
                  event.date.format("DD.MMM HH:mm")
                }}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
  ClockIcon,
  MinusIcon,
} from "@heroicons/vue/20/solid";
import { computed, ref, watch, inject, getCurrentInstance } from "vue";

const app = getCurrentInstance();
const dayjs = app.appContext.config.globalProperties.$dayjs;

function daydeltaToNow(date) {
  const days = (dayjs(date).diff(dayjs()) / (60 * 60 * 24 * 1000)).toFixed(0);
  return days;
}

const timeline = computed(() => {
  const now = dayjs();

  const registrationStart = dayjs(props?.event?.registrationStart);
  const registrationDeadline = dayjs(props?.event?.registrationDeadline);
  const startDate = dayjs(props?.event?.startDate);
  const endDate = dayjs(props?.event?.endDate);

  return [
    {
      id: 1,
      content: "Anmeldung",
      target: "Start",
      href: "#",
      date: registrationStart,
      datetime: props?.event?.startDate,
      icon: registrationStart.diff(now) > 0 ? ClockIcon : CheckIcon,
      iconBackground:
        registrationStart.diff(now) > 0 ? "bg-red-500" : "bg-green-500",
    },
    {
      id: 2,
      content: "Anmeldung",
      target: "Ende",
      href: "#",
      date: registrationDeadline,
      datetime: "2020-09-22",
      icon: registrationDeadline.diff(now) > 0 ? ClockIcon : MinusIcon,
      iconBackground:
        registrationDeadline.diff(now) > 0 ? "bg-yellow-500" : "bg-red-500",
    },
    {
      id: 3,
      content: "Veranstaltung",
      target: "Start",
      href: "#",
      date: startDate,
      datetime: "2020-09-28",
      icon: startDate.diff(now) > 0 ? ClockIcon : CheckIcon,
      iconBackground:
        startDate.diff(now) > 0 ? "bg-yellow-500" : "bg-green-500",
    },
    {
      id: 4,
      content: "Veranstaltung",
      target: "Ende",
      href: "#",
      date: endDate,
      datetime: "2020-09-30",
      icon: endDate.diff(now) > 0 ? ClockIcon : CheckIcon,
      iconBackground: endDate.diff(now) > 0 ? "bg-yellow-500" : "bg-green-500",
    },
  ];
});

const props = defineProps({
  event: Object,
});
</script>
