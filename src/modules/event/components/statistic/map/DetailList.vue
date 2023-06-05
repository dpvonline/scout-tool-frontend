<template>
  <div>
    <div>
      <fieldset class="my-4 mx-2">
        <legend class="sr-only">Notification method</legend>
        <div
          class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
        >
          <div v-for="type in types" :key="type.id" class="flex items-center">
            <input
              :id="type.id"
              name="notification-method"
              type="radio"
              :checked="type.id === picked"
              :value="type.id"
              v-model="picked"
              class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <label
              :for="type.id"
              class="ml-3 block text-sm font-medium leading-6 text-gray-900"
              >{{ type.title }}</label
            >
          </div>
        </div>
      </fieldset>
    </div>
    <GoogleMap
      :api-key="GOOGLE_MAPS_API_KEY"
      style="width: 100%; height: 800px"
      :center="center"
      :zoom="7"
    >
      <Marker
        v-for="group in hierarchyMappingDetailed"
        :key="group.id"
        :options="getMarkerOptions(group)"
      >
        <InfoWindow>
          <div id="contet">
            <div id="siteNotice"></div>
            <h1 id="firstHeading" class="firstHeading">{{ group.name }}</h1>
            <div id="bodyContent">
              <p></p>
            </div>
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  </div>
</template>

<script setup>
const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY || "no Key";
import { defineComponent, onMounted } from "vue";
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

import { useEventStore } from "@/modules/event/store";
const eventStore = useEventStore();

const center = { lat: 51, lng: 10 };

import { useRoute } from "vue-router";
const route = useRoute();

const eventLocationSummary = computed(() => {
  return eventStore.eventLocationSummary;
});

const hierarchyMappingDetailed = computed(() => {
  if (picked.value === "invited") {
    return eventStore.hierarchyMappingDetailed;
  } else {
    return eventStore.registrationLocationsSummary;
  }
});

function getColorByBund(group) {
  if (group?.bund) {
    switch (group?.bund) {
      case "DPBM":
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      case "PB Boreas":
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      case "PBMV":
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      case "PBW":
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      case "PB-Nordlicht":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "PSD":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "PB-Horizonte":
        return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      case "BEP":
        return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      case "FPS":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "Jomsburg":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "DPBH":
        return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      default:
        return "http://maps.google.com/mapfiles/ms/icons/pink-dot.png";
    }
  } else {
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  }
}

function getMarkerOptions(group) {
  if (group?.zipCode?.lat) {
    return {
      position: {
        lat: parseFloat(group?.zipCode?.lat || 0),
        lng: parseFloat(group?.zipCode?.lon || 0),
      },
      icon: getColorByBund(group),
    };
  }
  if (group?.scoutOrganisation?.zipCode?.lat) {
    return {
      position: {
        lat: parseFloat(group?.scoutOrganisation?.zipCode?.lat || 0),
        lng: parseFloat(group?.scoutOrganisation?.zipCode?.lon || 0),
      },
      icon: getColorByBund(group),
    };
  }
}

const types = [
  { id: "registered", title: "Angemeldet" },
  { id: "invited", title: "Eingeladen" },
];

const picked = ref("registered");

onMounted(() => {
  const eventId = route.params.id;
  Promise.all([
    eventStore.getEventLocationSummary(eventId),
    eventStore.getRegistrationLocationsSummary(eventId),
    eventStore.getHierarchyMappingDetailed(),
  ]);
});
</script>