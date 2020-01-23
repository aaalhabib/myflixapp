<template>
  <div class="h-screen" id="app">
    <f-nav />
    <router-view :key="$route.fullPath" />
  </div>
</template>
<script>
import FNav from "./components/nav";

export default {
  name: "App",
  components: { FNav }
};
</script>

<style lang="postcss">
@import "assets/styles/tailwind.postcss";
</style>
