<template>
  <div
    :class="{ 'bg-orange-600': user }"
    class="py-3 mb-5 flex items-center justify-between px-4"
  >
    <h1
      class="cursor-pointer font-extrabold text-xl"
      @click="$router.push('/')"
    >
      FLIX<span class="text-orange-200">.IO</span>
    </h1>
    <div v-if="user" class="flex items-center">
      <router-link
        class="hover:text-white px-2 text-black font-semibold"
        to="/"
      >
        Home
      </router-link>
      <a class="hover:text-white px-2 text-black font-semibold" href="#">
        Categories
      </a>
      <a class="hover:text-white px-2 text-black font-semibold" href="#">
        My List
      </a>
      <input
        class="text-black form-input mx-10 focus:shadow-none focus:border-gray-700 border border-gray-500"
        v-model="search"
        type="text"
        placeholder="search"
      />
    </div>
    <nav-user-dropdown v-if="user" />
    <div v-if="!user" class="pr-2 hover:text-black">
      <router-link
        v-if="['register', 'home'].includes($route.name)"
        class="cursor-pointer hover:bg-orange-700 bg-orange-600 py-2 px-3 text-white font-semibold"
        :to="{ path: '/login' }"
      >
        Sign in
      </router-link>
      <router-link
        v-if="['login'].includes($route.name)"
        class="cursor-pointer hover:bg-orange-700 bg-orange-600 py-2 px-3 text-white font-semibold"
        :to="{ path: '/register' }"
      >
        Sign Up
      </router-link>
    </div>
  </div>
</template>

<script>
import NavUserDropdown from "./nav-user-dropdown";

export default {
  name: "f-nav",
  components: {
    NavUserDropdown
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

<style scoped></style>
