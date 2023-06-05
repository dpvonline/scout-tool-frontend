<template>
  <div class="mx-2 my-2">
    <div class="col-span-full">
      <label
        for="about"
        class="block text-sm font-medium leading-6 text-gray-900"
        >E-Mails aller Fahrtenleitungen</label
      >
      <div class="mt-2">
        <textarea
          id="about"
          name="about"
          rows="3"
          :value="getRegistrationResponsiblePersonsText()"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
      </div>
      <p class="mt-3 text-sm leading-6 text-gray-600">
        Hier werden alle Verantwortliche Personen angezeigt.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, computed } from "vue";

import { useRoute } from "vue-router";
const route = useRoute();

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const registrationsResponsiblePersons = computed(() => {
  return eventStore.registrationsResponsiblePersons;
});

function getRegistrationResponsiblePersonsText() {
  return registrationsResponsiblePersons.value.map((x) => x.email).join(";");
}

onMounted(() => {
  const eventId = route.params.id;
  Promise.all([eventStore.getRegistrationsResponsiblePersons(eventId, {})]);
});
</script>
