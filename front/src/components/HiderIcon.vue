<script lang="ts"
        setup>
defineProps({
  isAbsolute: {
    type: Boolean,
  },
});
</script>

<template>
  <div :style='["background-color: #E93E00; z-index: 10; border-radius: 12px;", isAbsolute ? "position: absolute; top: 12px; left: 12px;" : ""]'
       class="q-pa-sm">
    <q-icon color="white"
            name="directions_run"
            size="48px"/>
  </div>
</template>
