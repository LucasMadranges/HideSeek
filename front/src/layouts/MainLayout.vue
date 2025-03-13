<template>
  <q-layout class="overflow-hidden"
            view="">
    <q-page-container>
      <div class="image-container">
        <img alt="Description"
             class="bg-img"
             src="../assets/bg-main.png">
      </div>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts"
        setup>

</script>

<style scoped>
.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 51, 0.6)
}

</style>
