<template>
  <q-page class="flex items-center justify-center">
    <div class="bg-white q-pa-lg rounded-borders flex column"
         style="gap: 1rem;">
      <h3 class="q-mt-lg q-mb-none q-mx-xl">Inscription</h3>
      <div class="q-my-lg"
           style="border-bottom: 1px solid #ccc;"></div>
      <q-input v-model="textUsername"
               :dense="dense"
               label="Nom d'utilisateur"
               outlined/>
      <q-input v-model="textEmail"
               :dense="dense"
               label="Email"
               outlined/>
      <q-input v-model="textPassword"
               :dense="dense"
               label="Mot de passe"
               outlined/>
      <q-input v-model="textConfirmPassword"
               :dense="dense"
               label="Confirmation de mot de passe"
               outlined/>
      <div class="q-my-lg"
           style="border-bottom: 1px solid #ccc;"></div>
      <q-btn color="blue"
             label="S'inscrire"
             push
             text-color="black"/>
    </div>
  </q-page>
</template>

<script lang="ts"
        setup>

import {ref} from "vue";

const textUsername = ref("");
const textEmail = ref("");
const textPassword = ref("");
const textConfirmPassword = ref("");
const dense = ref(false);
</script>
