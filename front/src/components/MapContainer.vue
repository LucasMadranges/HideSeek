<template>
  <div
    v-show="isMapReady"
    ref="mapContainer"
    class="map-container"
    style="z-index: 0;"
  />
  <div v-show="!isMapReady"
       class="loading-container">
    <q-spinner-dots size="50px"/>
    Chargement de la carte...
  </div>
</template>

<script lang="ts"
        setup>
import {onMounted, ref} from "vue";
import type {Map as MapboxMap} from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const isMapReady = ref(false);

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
const mapContainer = ref<HTMLElement | null>(null);
const mapInstance = ref<MapboxMap>();
const userLocation = ref<[number, number] | null>(null);

const position = ref<{ lng: number, lat: number, radius: number } | null>({
  lng: 2.3488,
  lat: 48.8534,
  radius: 500,
});

const generateTestPlayers = (numberOfPlayers: number = 10) => {
  const centerPoint = {
    lat: 48.8534,  // Paris latitude
    lng: 2.3488,    // Paris longitude
  };

  const players = [];

  for (let i = 0 ; i < numberOfPlayers ; i++) {
    // Génère une position aléatoire dans un rayon de 500m
    const radius = Math.random() * 0.5; // 500m en kilomètres
    const angle = Math.random() * 360;  // Angle aléatoire
    const rad = angle * Math.PI / 180;

    // Calcul des nouvelles coordonnées
    const lat = centerPoint.lat + (radius * Math.sin(rad)) / 111;
    const lng = centerPoint.lng +
      (radius * Math.cos(rad)) / (111 * Math.cos(centerPoint.lat * Math.PI / 180));

    players.push({
      id: `player-${i}`,
      username: `Joueur${i}`,
      position: {
        lat: lat,
        lng: lng,
      },
      team: "Hider",
    });
  }

  return players;
};

const initGeolocation = () => {
  if (!mapInstance.value) return;

  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 30000,
    },
    trackUserLocation: true,
    showAccuracyCircle: true,
    showUserLocation: true,
  });

  mapInstance.value.addControl(geolocateControl, "top-right");

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

const testPlayers = generateTestPlayers(10);

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

    map.addSource("players", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: testPlayers.map(player => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [player.position.lng, player.position.lat],
          },
          properties: {
            id: player.id,
            username: player.username,
          },
        })),
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

    map.addLayer({
      id: "players-layer",
      type: "circle",
      source: "players",
      paint: {
        "circle-radius": 8,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#FFFFFF",
      },
    });

    testPlayers.forEach(player => {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      })
        .setLngLat([player.position.lng, player.position.lat])
        .setHTML(`<div>${player.username}</div>`);

      // Créer un élément DOM pour le marqueur
      const markerElement = document.createElement("div");
      markerElement.style.width = "20px";
      markerElement.style.height = "20px";
      markerElement.style.borderRadius = "50%";
      markerElement.style.backgroundColor = player.team === "Hider" ? "#0083D4" : "#E93E00";
      markerElement.style.border = "2px solid white";

      new mapboxgl.Marker(markerElement)
        .setLngLat([player.position.lng, player.position.lat])
        .setPopup(popup)
        .addTo(map);
    });

    // Attendre que la carte soit complètement chargée
    map.once("idle", () => {
      if (geolocateControl) {
        geolocateControl.trigger();
      }
    });

    isMapReady.value = true;

    // NOTE: Si on peut changer ça pour resize la map à son apparition
    setTimeout(() => map.resize(), 0);
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

.loading-container {
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
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
