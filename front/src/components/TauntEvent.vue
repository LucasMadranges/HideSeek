<template>
  <button id="event-btn"
          :disabled="tauntActive"
          :style="buttonStyle"
          class="q-pa-sm"
          @click="handleClick">
    <q-icon color="white"
            name="notifications_active"
            size="48px"/>
  </button>
</template>

<script lang="ts"
        setup>

import {computed, ref} from "vue";
import {SoundManager} from "components/SoundManager";

import type {CSSProperties} from "vue";

import soundUniversalFunnyTheme from "../assets/sounds/universal_funny_theme.mp3";
import soundEmotionalDamage from "../assets/sounds/emotional_damage.mp3";
import soundBadToTheBone from "../assets/sounds/bad-to-the-bone-meme.mp3";
import soundBruh from "../assets/sounds/bruh-effect.mp3";
import soundCartoonChase from "../assets/sounds/cartoon-chase-effect.mp3";
import soundMariosAgony from "../assets/sounds/marios-agony-effect.mp3";
import soundNoNoSquare from "../assets/sounds/no-no-square-effect.mp3";
import soundWidePutinWalkin from "../assets/sounds/wide-putin-walkin.mp3";
import soundXFile from "../assets/sounds/x-files-theme.mp3";
import soundSnoopDog from "../assets/sounds/snoop-dogg-smoke.mp3";
import soundJixawMetalPipe from "../assets/sounds/jixaw-metal-pipe.mp3";
import soundWiiStartup from "../assets/sounds/wii-startup-effect.mp3";
import soundSpongeBob from "../assets/sounds/spongebob-effect.mp3";
import soundCatLaught from "../assets/sounds/cat-laught-effect.mp3";
import soundAugghh from "../assets/sounds/augghh-effect.mp3";
import soundEverybodyWasKungfu from "../assets/sounds/everybody-was-kungfu.mp3";
import soundKeyboard from "../assets/sounds/keyboard-effect.mp3";
import soundLaughtEffect from "../assets/sounds/laugh-effect.mp3";
import soundToothlessDance from "../assets/sounds/toothless-dance.mp3";
import soundWindowsError from "../assets/sounds/windows-error.mp3";
import soundAnimeWow from "../assets/sounds/anime-wow-effect.mp3";

const tauntActive = ref(false);

const buttonStyle = computed<CSSProperties>(() => ({
  backgroundColor: tauntActive.value ? "#499613" : "#060b39",
  position: "absolute" as const,
  bottom: "64px",
  right: "12px",
  zIndex: 10,
  borderRadius: "12px",
  border: "none",
  transition: "all 0.2s",
}));

function handleClick() {
  if (!tauntActive.value) {
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
      soundSnoopDog,
      soundJixawMetalPipe,
      soundWiiStartup,
      soundSpongeBob,
      soundCatLaught,
      soundAugghh,
      soundEverybodyWasKungfu,
      soundKeyboard,
      soundLaughtEffect,
      soundToothlessDance,
      soundWindowsError,
      soundAnimeWow,
    ]);

    tauntActive.value = true;
    const currentSound = soundManager.playRandom();

    if (currentSound === undefined) {
      return;
    }

    currentSound.addEventListener("ended", () => {
      tauntActive.value = false;
    });
  }
}

</script>
