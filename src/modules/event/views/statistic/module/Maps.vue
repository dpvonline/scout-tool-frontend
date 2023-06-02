<template>
  <GoogleMap
    :api-key="GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 800px"
    :center="center"
    :zoom="6"
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
</template>

<script setup>
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY || 'no API Key';
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

const registrationLocationsSummary = computed(() => {
  return eventStore.registrationLocationsSummary;
});

const hierarchyMappingDetailed = computed(() => {
  return eventStore.hierarchyMappingDetailed;
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
    return "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  }
}

function getMarkerOptions(group) {
  return {
    position: {
      lat: parseFloat(group?.zipCode?.lat || 0),
      lng: parseFloat(group?.zipCode?.lon || 0),
    },
    icon: getColorByBund(group),
  };
}

onMounted(() => {
  const eventId = route.params.id;
  Promise.all([
    eventStore.getEventLocationSummary(eventId),
    eventStore.getRegistrationLocationsSummary(eventId),
    eventStore.getHierarchyMappingDetailed(),
  ]);
});
</script>