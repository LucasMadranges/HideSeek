<template>
  <q-page class="flex column items-center justify-center q-px-sm">
    <q-btn-dropdown
      class="absolute-top-right q-ma-lg"
      color="blue"
      text-color="white"
      dropdown-icon="person"
      no-icon-animation
      round
      >
      <q-list>
        <q-item clickable>
          <q-item-section>
            <q-item-label>
              Mon profil
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>
            <q-item-label class="text-negative">
              Déconnexion
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <h1 class="q-mb-lg"
        style="color: white; font-weight: 500;">
      HideSeek
    </h1>
    <h3 class="text-center"
        style="color: white; font-weight: 500">Le jeu du chat et de la souris... IRL !</h3>
    <div id="button-container">
      <q-btn class=""
             color="white"
             label="Créer une partie"
             push
             text-color="black"
              @click="dialogCreateParty = true"
      />
      <q-btn color="white"
             label="Rejoindre une partie"
             push
             text-color="black"
             @click="dialogJoinParty = true"
      />
    </div>

  <q-dialog
    v-model="dialogCreateParty"
    persistent

  >
    <q-card class="q-pa-lg bg-primary text-white">
      <q-card-section>
          Créer une partie
      </q-card-section>
      <q-card-section>
          <q-input
            v-model="partyName"
            label="Nom de la partie"
            dense
            outlined
            color="blue"
            bg-color="secondary"
            dark
            class="q-mb-sm rounded-borders"
            suffix="min"
          />
          <q-input
            v-model="partyPassword"
            label="Mot de passe"
            outlined
            color="blue"
            bg-color="secondary"
            dark
            dense
            class="q-pb-sm rounded-borders"
          />
        <div class="row">
          <q-input
            v-model="partyDuration"
            label="Durée de la partie (en minutes)"
            outlined
            color="blue"
            dense
            bg-color="secondary"
            dark
            class="q-pb-sm q-pr-sm rounded-borders"
            type="number"
            max="1000"

          />
          <q-input
            v-model="partyMaxPlayers"
            label="Nombre de joueurs maximum"
            outlined
            color="blue"
            bg-color="secondary"
            dark
            class="rounded-borders"
            dense
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Annuler"
          color="negative"
          text-color="white"
          @click="dialogCreateParty = false"
        />
        <q-btn
          label="Créer"
          color="positive"
          text-color="white"
          @click="createParty"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

    <q-dialog
      v-model="dialogJoinParty"
      persistent
    >
      <q-card class="q-pa-lg bg-primary text-white">
        <q-card-section>
          Rejoindre une partie
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="partyName"
            label="Nom de la partie"
            color="blue"
            bg-color="secondary"
            dark
            outlined
            dense
            class="q-pb-sm"
            suffix="min"
          />
          <q-input
            v-model="partyPassword"
            label="Mot de passe"
            outlined
            color="blue"
            bg-color="secondary"
            dark
            dense
            class="q-pb-sm"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Annuler"
            color="negative"
            text-color="white"
            @click="dialogJoinParty = false"
          />
          <q-btn
            label="Rejoindre"
            color="positive"
            text-color="white"
            @click="joinParty"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const dialogCreateParty = ref(false);
const partyName = ref("");
const partyPassword = ref("");
const partyDuration = ref("");
const partyMaxPlayers = ref("");

const dialogJoinParty = ref(false);

const joinParty = () => {
  dialogJoinParty.value = false
};

const createParty = () => {
  dialogCreateParty.value = false

};

</script>

<style lang="scss"
       scoped>
h1 {
  font-size: 5rem;

  @media (max-width: $breakpoint-xs-max) {
    font-size: 4rem;
  }
}

h3 {
  font-size: 3rem;
  line-height: 1.4;

  @media (max-width: $breakpoint-xs-max) {
    font-size: 2rem;
  }
}

#button-container {
  display: flex;
  gap: 2rem;

  @media (max-width: $breakpoint-xs-max) {
    flex-direction: column;
    width: 100%;

    button {
      height: 50px;
    }
  }
}
</style>
