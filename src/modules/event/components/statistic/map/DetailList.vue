<template>
  <div id="mapContainer"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEventStore } from "@/modules/event/store";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();

const eventStore = useEventStore();

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
    };
  },
  methods: {
    parseGeo(data) {
      return data.results.map((item) => {
        return {
          lat: item.scoutOrganisation.zipCode.lat,
          lng: item.scoutOrganisation.zipCode.lon,
          stamm: item.scoutOrganisation.displayName,
          count: item.participantCount,
        };
      });
    },
  },
  mounted() {
    const route = useRoute();
    const eventId = route.params.id;

    eventStore.fetchEventSummary(eventId).then((response) => {
      const data = response.data;
      this.map = L.map("mapContainer").setView([46.05, 11.05], 5);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      //use a mix of renderers
      var customPane = this.map.createPane("customPane");
      var canvasRenderer = L.canvas({ pane: "customPane" });
      customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400
      const geoData = this.parseGeo(data);
      geoData.forEach((element) => {
        L.marker([element.lat, element.lng], {
          renderer: canvasRenderer,
        })
          .bindPopup(
            L.popup({ maxWidth: 500 }).setContent(
              "<div><h3>" +
                element.stamm +
                "</h3><p>Teilnehmer: " +
                element.count +
                "</p></div>"
            )
          )
          .addTo(this.map);
      });
    });
  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>