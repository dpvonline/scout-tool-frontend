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
import PageWrapper from "@/components/base/PageWrapper.vue";
import { useRouter } from "vue-router";
import { useRegisterStore } from "../store";
import { onBeforeRouteLeave } from "vue-router";

const router = useRouter();

const registerStore = useRegisterStore();

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
      link: "RegisterStart",
      status: getStatus("RegisterStart", [
        "RegisterBasics",
        "RegisterScoutDetails",
        "RegisterPersonalDetails",
        "RegisterAdvanced",
      ]),
    },
    {
      id: 2,
      name: "Account",
      link: "RegisterBasics",
      status: getStatus("RegisterBasics", [
        "RegisterScoutDetails",
        "RegisterPersonalDetails",
        "RegisterAdvanced",
      ]),
    },
    {
      id: 3,
      name: "Pfadfinder",
      link: "RegisterScoutDetails",
      status: getStatus("RegisterScoutDetails", [
        "RegisterPersonalDetails",
        "RegisterAdvanced",
      ]),
    },
    {
      id: 4,
      name: "Persönliches",
      link: "RegisterPersonalDetails",
      status: getStatus("RegisterPersonalDetails", ["RegisterAdvanced"]),
    },
    {
      id: 5,
      name: "Anschrift",
      link: "RegisterAdvanced",
      status: getStatus("RegisterAdvanced", []),
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
  registerStore.fetchAllMappings();
});

onBeforeRouteLeave((to, from) => {
  if (registerStore.registered) {
    registerStore.reset();
    return true;
  }
  const exit = window.confirm(
    "Wenn du den Registrierungsprozess verlässt, werden deine Eingaben aus Sicherheitsgründen gelöscht. Möchtest du fortfahren?"
  );
  if (exit) {
    registerStore.reset();
    return true;
  } else {
    return false;
  }
});
</script>
