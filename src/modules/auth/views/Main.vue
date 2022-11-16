<template>
  <div class="lg:border-t lg:border-b lg:border-gray-200">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
      <StepperNav :steps="steps" />
    </nav>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import StepperNav from "@/components/stepper/StepperNav.vue"
import { useRouter } from "vue-router"
import { useRegisterStore } from "../store"
import { onBeforeRouteLeave } from "vue-router"

const router = useRouter()

const registerStore = useRegisterStore()

const steps = computed(() => {
  return [
    {
      id: 1,
      name: "Basics",
      description: "Technische Must-haves",
      link: "RegisterBasics",
      status: getStatus("RegisterBasics", ["RegisterScoutDetails", "RegisterPersonalDetails"]),
    },
    {
      id: 2,
      name: "Scout details",
      description: "Pfadi-Details",
      link: "RegisterScoutDetails",
      status: getStatus("RegisterScoutDetails", ["RegisterPersonalDetails"]),
    },
    {
      id: 3,
      name: "Personal details",
      description: "Persönliche Details",
      link: "RegisterPersonalDetails",
      status: getStatus("RegisterPersonalDetails", []),
    },
  ]
})

function getStatus(value: string, next: Array<String>) {
  let status = router.currentRoute.value.name === value ? "current" : ""
  status = next.includes(router.currentRoute.value.name?.toString() || "") ? "complete" : status
  return status
}

onMounted(() => {
  registerStore.fetchAllMappings()
})

onBeforeRouteLeave((to, from) => {
  if (registerStore.registered) {
    registerStore.reset()
    return true
  }
  const exit = window.confirm(
    "Wenn du den Registrierungsprozess verlässt, werden deine Eingaben aus Sicherheitsgründen gelöscht. Möchtest du fortfahren?"
  )
  if (exit) {
    registerStore.reset()
    return true
  } else {
    return false
  }
})
</script>
