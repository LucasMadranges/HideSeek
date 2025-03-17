<template>
  <button id="event-btn"
          class="q-pa-sm"
          style="background-color: #060b39; position:absolute; bottom: 64px; right: 12px; z-index: 10; border-radius: 12px; border: none; transition: all 0.2s;"
          @click="handleClick">
    <q-icon color="white"
            name="notifications_active"
            size="48px"/>
  </button>
</template>

<script lang="ts"
        setup>

import {ref} from "vue";
import {SoundManager} from "components/SoundManager";

import soundUniversalFunnyTheme from "../assets/sounds/universal_funny_theme.mp3";
import soundEmotionalDamage from "../assets/sounds/emotional_damage.mp3";
import soundBadToTheBone from "../assets/sounds/bad-to-the-bone-meme.mp3";
import soundBruh from "../assets/sounds/bruh-effect.mp3";
import soundCartoonChase from "../assets/sounds/cartoon-chase-effect.mp3";
import soundMariosAgony from "../assets/sounds/marios-agony-effect.mp3";
import soundNoNoSquare from "../assets/sounds/no-no-square-effect.mp3";
import soundWidePutinWalkin from "../assets/sounds/wide-putin-walkin.mp3";
import soundXFile from "../assets/sounds/x-files-theme.mp3";

function handleClick() {
  const soundManager = new SoundManager([
    soundUniversalFunnyTheme,
    soundEmotionalDamage,
    soundBadToTheBone,
    soundBruh,
    soundCartoonChase,
    soundMariosAgony,
    soundNoNoSquare,
    soundWidePutinWalkin,
    soundXFile,
  ]);

  const btn = document.querySelector("#event-btn") as HTMLElement;
  const tauntActive = ref(false);

  if (btn && !tauntActive.value) {
    btn.style.backgroundColor = "#499613";
    tauntActive.value = true;
    soundManager.playRandom();

    setTimeout(() => {
      btn.style.backgroundColor = "#060b39";
      tauntActive.value = false;
    }, 5000);
  }
}

</script>
