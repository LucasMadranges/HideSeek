<template>
  <q-page>
    <div
      ref="mapContainer"
      class="map-container"
      style="z-index: 0;"
    />
  </q-page>
  <GameHud/>
</template>

<script lang="ts"
        setup>
import {onMounted, ref} from "vue";
import type {Map as MapboxMap} from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GameHud from "src/components/GameHUD.vue";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
const mapContainer = ref<HTMLElement | null>(null);
const mapInstance = ref<MapboxMap>();
const userLocation = ref<[number, number] | null>(null);

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

  const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: import.meta.env.VITE_MAPBOX_STYLE_URL,
    center: [2.3488, 48.8534],
    zoom: 12,
  });

  mapInstance.value = map;

  map.on("load", () => {
    const geolocateControl = initGeolocation();

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
