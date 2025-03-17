<template>
  <div
    ref="mapContainer"
    class="map-container"
    style="z-index: 0;"
  />
</template>

<script lang="ts"
        setup>
import {onMounted, ref} from "vue";
import type {Map as MapboxMap} from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
const mapContainer = ref<HTMLElement | null>(null);
const mapInstance = ref<MapboxMap>();
const userLocation = ref<[number, number] | null>(null);

const position = ref<{ lng: number, lat: number, radius: number } | null>({
  lng: 2.3488,
  lat: 48.8534,
  radius: 500,
});

const initGeolocation = () => {
  if (!mapInstance.value) return;

  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 60000,
    },
    fitBoundsOptions: {
      maxZoom: 15,
    },
    trackUserLocation: true,
    showAccuracyCircle: true,
    showUserLocation: true,
  });

  mapInstance.value.addControl(geolocateControl, "top-right");

  // Écouteurs d'événements plus détaillés
  geolocateControl.on("trackuserlocationstart", () => {
    console.log("Début du suivi de localisation");
  });

  geolocateControl.on("trackuserlocationend", () => {
    console.log("Fin du suivi de localisation");
  });

  geolocateControl.on("geolocate", (position) => {
    console.log("Position mise à jour");
    userLocation.value = [position.coords.longitude, position.coords.latitude];
  });

  geolocateControl.on("error", (err) => {
    console.error("Erreur de géolocalisation:", err);
    // Afficher un message à l'utilisateur
    if (err.code === 1) {
      alert("Veuillez autoriser l'accès à votre position dans les paramètres de votre navigateur");
    }
  });

  return geolocateControl;
};

onMounted(() => {
  if (!mapContainer.value) return;

  mapboxgl.accessToken = mapboxToken;

  if (!position.value) {
    return;
  }

  const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: import.meta.env.VITE_MAPBOX_STYLE_URL,
    center: [position.value?.lng, position.value?.lat],
    pitchWithRotate: false,
    touchPitch: false,
    zoom: 12,
  });

  mapInstance.value = map;

  map.on("load", () => {
    const geolocateControl = initGeolocation();

    map.addSource("game-zone", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [[
            ...Array(65).fill(0).map((_, i) => {
              const radius = position.value?.radius ? (position.value?.radius / 1000) : 0.5; // 500m en kilomètres
              const angle = (i * 360) / 64;
              const rad = angle * Math.PI / 180;
              const lat = 48.8534 + (radius * Math.sin(rad)) / 111;
              const lng = 2.3488 + (radius * Math.cos(rad)) / (111 * Math.cos(48.8534 * Math.PI / 180));
              return [lng, lat];
            }),
          ]],
        },
      },
    });

    map.addLayer({
      id: "game-zone-fill",
      type: "fill",
      source: "game-zone",
      paint: {
        "fill-color": "#45d427",
        "fill-opacity": 0.4,
      },
    });

    map.addLayer({
      id: "game-zone-border",
      type: "line",
      source: "game-zone",
      paint: {
        "line-color": "#45d427",
        "line-width": 3,
        "line-opacity": 1,
      },
    });

    // Attendre que la carte soit complètement chargée
    map.once("idle", () => {
      if (geolocateControl) {
        geolocateControl.trigger();
      }
    });
  });
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100svh;
  position: absolute;
  top: 0;
  left: 0;
}

:deep(.q-page) {
  padding: 0;
  min-height: 100svh;
}

:deep(.mapboxgl-popup) {
  max-width: 200px;
}

:deep(.mapboxgl-popup-content) {
  text-align: center;
  padding: 10px;
}
</style>
