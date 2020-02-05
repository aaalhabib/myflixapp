<template>
  <div
    :class="{ 'text-black': dropdown }"
    style="z-index: 1000"
    class="relative flex flex-col items-center cursor-pointer hover:text-red-700"
  >
    <a class="absolute w-40 -mt-3 right-0" @click="dropdown = !dropdown">{{
      "Welcome " + user.name
    }}</a>
    <button
      v-if="dropdown"
      @click="dropdown = false"
      class="fixed inset-0 w-screen h-screen"
      type="button"
    ></button>
    <div
      v-if="dropdown"
      class="absolute flex flex-col items-start overflow-hidden right-0 top-10 ml-10 mt-8 bg-gray-200 w-40 rounded-sm"
    >
      <router-link class="drop-link" to="/profile">
        Account
      </router-link>
      <router-link class="drop-link" to="/friends">
        Friends
      </router-link>
      <a class="drop-link" @click.prevent="signOut()">
        Sign Out
      </a>
    </div>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";

export default {
  name: "nav-dropdown",
  data() {
    return {
      dropdown: false
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async signOut() {
      await api.logout();
      this.$store.commit("LOG_OUT");
    }
  }
};
</script>

<style lang="postcss" scoped>
.drop-link {
  @apply px-3 w-full py-2 text-black;
}
.drop-link:hover {
  @apply bg-blue-600 text-white;
}
</style>
