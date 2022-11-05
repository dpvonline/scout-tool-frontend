<template>
  <div class="lg:border-t lg:border-b lg:border-gray-200">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
      <StepperNav :steps="steps" />
    </nav>
    <router-view />
    <span class="isolate inline-flex rounded-md shadow-sm">
      <PrimaryButton>Keks: Weiter</PrimaryButton>
    </span>
  </div>
</template>
<script setup lang="ts">
import StepperNav from "@/components/stepper/StepperNav.vue"
import PrimaryButton from "@/components/button/Primary.vue";
import { useRouter } from "vue-router"

const router = useRouter();

const steps = computed(() => {
    return [
        {
            id: 1,
            name: "Basics",
            description: "Technische Must-haves",
            link: "RegisterBasics",
            status: getStatus("RegisterBasics", ["RegisterScoutDetails", "RegisterPersonalDetails"])
        },
        {
            id: 2,
            name: "Scout details",
            description: "Pfadi-Details",
            link: "RegisterScoutDetails",
            status: getStatus("RegisterScoutDetails", ["RegisterBasics", "RegisterPersonalDetails"])
        },
        {
            id: 3,
            name: "Personal details",
            description: "Persönliche Details",
            link: "RegisterPersonalDetails",
            status: getStatus("RegisterPersonalDetails", ["RegisterBasics", "RegisterScoutDetails"])
        }
    ]
})

function getStatus(value: string, next: Array<String>) {
  let status = router.currentRoute.value.name === value ? 'current' : '';
  status = next.includes(router.currentRoute.value.name) ? 'complete' : status
  return status;
}
</script>