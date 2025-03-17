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

function handleClick() {
  const btn = document.querySelector("#event-btn") as HTMLElement;

  if (btn) {
    btn.style.backgroundColor = "#499613";

    setTimeout(() => {
      btn.style.backgroundColor = "#060b39";
    }, 5000);
  }
}

</script>
