<template>
  <button class="q-pa-sm"
          style="background-color: #060b39; position:absolute; bottom: 64px; left: 12px; z-index: 10; border-radius: 12px; border: none;"
          @click="() => isOpen = !isOpen">
    <q-icon color="white"
            name="groups"
            size="48px"/>
  </button>

  <Transition name="slide">
    <div v-if="isOpen"
         style="position: absolute; bottom: 0; left: 0; width: 100%; height: calc(100svh - 200px); z-index: 20; background-color: #060b39; border-radius: 12px; padding: 32px 12px 64px;color: white; display: flex;">
      <button style="background-color: transparent; border: none; position: absolute; top: 12px; right: 0;"
              @click="() => isOpen = !isOpen">
        <q-icon color="white"
                name="close"
                size="32px"
        />
      </button>

      <div style="width: 100%; height: fit-content;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <SeekerIcon :isAbsolute="false"
                      class="q-mb-lg"/>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
              <img alt="Avatar picture"
                   src="../assets/anonymous-icon.png"
                   style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #666;"/>
              <div style="font-size: 18px">Edixoo</div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
              <img alt="Avatar picture"
                   src="../assets/anonymous-icon.png"
                   style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #666;"/>
              <div style="font-size: 18px">Edixoo</div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
              <img alt="Avatar picture"
                   src="../assets/anonymous-icon.png"
                   style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #666;"/>
              <div style="font-size: 18px">Edixoo</div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
              <img alt="Avatar picture"
                   src="../assets/anonymous-icon.png"
                   style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #666;"/>
              <div style="font-size: 18px">Edixoo</div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-mx-lg"
           style="border-left: 1px solid #666; height: 100%; width: 1px;"></div>
      <div style="width: 100%; height: fit-content;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <HiderIcon :isAbsolute="false"
                     class="q-mb-lg"/>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
              <img alt="Avatar picture"
                   src="../assets/anonymous-icon.png"
                   style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #666;"/>
              <div style="font-size: 18px">Edixoo</div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
              <img alt="Avatar picture"
                   src="../assets/anonymous-icon.png"
                   style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #666;"/>
              <div style="font-size: 18px">Edixoo</div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
              <img alt="Avatar picture"
                   src="../assets/anonymous-icon.png"
                   style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #666;"/>
              <div style="font-size: 18px">Edixoo</div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
              <img alt="Avatar picture"
                   src="../assets/anonymous-icon.png"
                   style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid #666;"/>
              <div style="font-size: 18px">Edixoo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts"
        setup>

import HiderIcon from "components/HiderIcon.vue";
import SeekerIcon from "components/SeekerIcon.vue";
import {ref} from "vue";

const isOpen = ref(false);
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
</style>
