<script lang="ts"
        setup>

import SeekerIcon from "components/SeekerIcon.vue";
import PlayersLeft from "components/PlayersLeft.vue";
import PlayersList from "components/PlayersList.vue";
import TauntEvent from "components/TauntEvent.vue";
import TimeLeft from "components/TimeLeft.vue";
</script>

<template>
  <SeekerIcon :isAbsolute="true"/>

  <PlayersLeft/>

  <TimeLeft/>

  <PlayersList/>

  <TauntEvent/>
</template>

<style scoped>

</style>
