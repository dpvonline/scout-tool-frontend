<template>
  <PageWrapper class="mt-12 sm:mt-0">
    <div class="lg:border-t lg:border-b lg:border-gray-200">
      <nav
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:py-8"
        aria-label="Progress"
      >
        <component :is="components[compNo]" :steps="steps" />
      </nav>
      <router-view />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

import StepperNavSmall from "@/components/stepper/StepperNavSmall.vue";
import StepperNav from "@/components/stepper/StepperNav.vue";
import PageWrapper from "@/components/base/PageWrapper.vue";
import { useRouter } from "vue-router";
import { useEventStore } from "@/modules/event/store/index";
import { onBeforeRouteLeave } from "vue-router";

const router = useRouter();

const eventStore = useEventStore();

const components = [StepperNavSmall, StepperNavSmall];

const compNo = computed(() => {
  return window.innerWidth < 1200 ? 0 : 1;
});

const steps = computed(() => {
  return [
    {
      id: 1,
      name: "",
      description: "",
      link: "EventNewStart",
      status: getStatus("EventNewStart", [
        "EventNewNames",
        "EventNewDates",
        "EventNewAuth",
        "EventNewCustom",
      ]),
    },
    {
      id: 2,
      name: "",
      link: "EventNewNames",
      status: getStatus("EventNewNames", [
        "EventNewDates",
        "EventNewAuth",
        "EventNewCustom",
      ]),
    },
    {
      id: 3,
      name: "",
      link: "EventNewDates",
      status: getStatus("EventNewDates", [
        "EventNewAuth",
        "EventNewCustom",
      ]),
    },
    {
      id: 4,
      name: "",
      link: "EventNewAuth",
      status: getStatus("EventNewAuth", [
        "EventNewCustom",
      ]),
    },
    {
      id: 5,
      name: "",
      link: "EventNewCustom",
      status: getStatus("EventNewCustom", [
      ]),
    },
  ];
});

function getStatus(value: string, next: Array<String>) {
  let status = router.currentRoute.value.name === value ? "current" : "";
  status = next.includes(router.currentRoute.value.name?.toString() || "")
    ? "complete"
    : status;
  return status;
}

onMounted(() => {
  eventStore.fetchAllMappings();
});

onBeforeRouteLeave((to, from) => {
  // if (eventStore.registered) {
  //   eventStore.reset();
  //   return true;
  // }
  // const exit = window.confirm(
  //   "Wenn du den Registrierungsprozess verlässt, werden deine Eingaben aus Sicherheitsgründen gelöscht. Möchtest du fortfahren?"
  // );
  // if (exit) {
  //   eventStore.reset();
  //   return true;
  // } else {
  //   return false;
  // }
});
</script>
