<template>
  <q-page class="flex column items-center justify-center q-px-sm">
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
             text-color="black"/>
      <q-btn color="white"
             label="Rejoindre une partie"
             push
             text-color="black"/>
    </div>
  </q-page>
</template>

<script lang="ts"
        setup>

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
