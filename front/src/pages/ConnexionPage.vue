<template>
  <q-page class="flex items-center justify-center">
    <div class="bg-white q-pa-lg rounded-borders flex column"
         style="gap: 1rem;">
      <h3 class="q-mt-lg q-mb-none q-mx-xl">Connexion</h3>
      <div class="q-my-lg"
           style="border-bottom: 1px solid #ccc;"></div>
      <q-input v-model="text"
               :dense="dense"
               label="Nom d'utilisateur"
               outlined/>
      <q-input v-model="text"
               :dense="dense"
               label="Mot de passe"
               outlined/>
      <q-btn color="blue"
             label="Rejoindre une partie"
             push
             text-color="black"/>
    </div>
  </q-page>
</template>

<script lang="ts"
        setup>

import {ref} from "vue";

const text = ref("");
const dense = ref(false);
</script>
