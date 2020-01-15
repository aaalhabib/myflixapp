<template>
  <div v-if="user">
    hi
  </div>
  <div
    class="flex flex-col content-center items-center justify-end h-64"
    v-else
  >
    <div class="text-center font-semibold centered text-4xl text-white block">
      Unlimited movies to watch <br />
      anywhere and any time
    </div>
    <br />
    <router-link
      class="cursor-pointer hover:bg-red-700 bg-orange-700 py-3 px-5 rounded-full text-white text-2xl"
      :to="{ path: '/register' }"
    >
      Try it now!
    </router-link>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  }
};
</script>
