<template>
  <div id="mapContainer"></div>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEventStore } from "@/modules/event/store";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { get } from "@vueuse/core";

const router = useRouter();

const eventStore = useEventStore();

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
      picked: "invited",
      types: [
        { id: "registered", title: "Angemeldet" },
        { id: "invited", title: "Eingeladen" },
      ],
    };
  },
  methods: {
    parseGeoHierachy(data) {
      return data
        .filter((obj) => obj?.zipCode?.lat)
        .map((item) => {
          if (item.zipCode) {
            // check duplidate
            const indexList = data.filter(stamm => stamm.zipCode?.zipCode === item.zipCode?.zipCode)
            let index = indexList.indexOf(item)

            return {
              bund: item.bund,
              lat: parseFloat(item.zipCode.lat) + 0.01 * index,
              lng: item.zipCode.lon,
              stamm: item.displayName,
              city: item.zipCode.city,
            };
          }
        });
    },
  },
  mounted() {
    var greenIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var redIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var blueIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var orangeIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var yellowIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var violetIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var greyIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var goldIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var blackIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    function getColorByBund(group) {
      if (group?.bund) {
        switch (group?.bund) {
          case "DPBM":
            return blueIcon;
          case "PB Boreas":
            return greenIcon;
          case "PBMV":
            return redIcon;
          case "PBW":
            return redIcon;
          case "PB-Nordlicht":
            return goldIcon;
          case "PSD":
            return yellowIcon;
          case "PB-Horizonte":
            return orangeIcon;
          case "BEP":
            return greyIcon;
          case "FPS":
            return yellowIcon;
          case "Jomsburg":
            return violetIcon;
          case "DPBH":
            return orangeIcon;
          default:
            return blackIcon;
        }
      } else {
        return blackIcon;
      }
    }

    const route = useRoute();
    const eventId = route.params.id;

    eventStore.getHierarchyMappingDetailed().then((response) => {
      const data = response;
      this.map = L.map("mapContainer").setView([51.05, 10.05], 6);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      //use a mix of renderers
      var customPane = this.map.createPane("customPane");
      var canvasRenderer = L.canvas({ pane: "customPane" });
      customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400
      const geoData = this.parseGeoHierachy(data);
      geoData.forEach((element) => {
        L.marker([element.lat, element.lng], {
          renderer: canvasRenderer,
          icon: getColorByBund(element),
        })
          .bindPopup(
            L.popup({ maxWidth: 500 }).setContent(
              "<div>" +
                "<h3>" +
                element.stamm +
                "</h3>" +
                "<p>" +
                "Bund: " +
                element.bund +
                "</p>" +
                "<p>" +
                "Stadt: " +
                element.city +
                "</p>" +
                "</div>"
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