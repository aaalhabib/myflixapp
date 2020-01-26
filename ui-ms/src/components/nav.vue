<template>
  <div
    :class="{ ' bg-transparent': user }"
    class="py-3 mb-5 flex items-center  px-4"
  >
    <h1
      class="cursor-pointer font-extrabold text-2xl"
      @click="$router.push('/')"
    >
      <span class=" text-red-700">MyFlix</span>
    </h1>
    <div v-if="user" class="flex mx-4 -mb-1 items-center ">
      <router-link
        class="hover:text-red-700 px-2 text-white font-semibold"
        to="/"
      >
        Home
      </router-link>
      <router-link
        to="/favorites"
        class="hover:text-red-700 px-2  text-white font-semibold"
      >
        My List
      </router-link>
    </div>
    <div v-if="user" class="flex w-1/2 mx-48 items-center">
      <input
        class="text-black form-input mx-10 focus:shadow-none focus:border-gray-700 border h-8 w-full border-gray-500"
        v-model="search"
        type="text"
        placeholder="search"
      />
    </div>
    <nav-user-dropdown v-if="user" />
    <div
      v-if="!user"
      class=" absolute mr-4 mt-2 right-0 pr-2 hover:text-red-700"
    >
      <router-link
        v-if="['register', 'home'].includes($route.name)"
        class="cursor-pointer hover:bg-red-700 bg-orange-600 py-2 px-3 text-white font-semibold"
        :to="{ path: '/login' }"
      >
        Sign in
      </router-link>
      <router-link
        v-if="['login'].includes($route.name)"
        class="cursor-pointer hover:bg-red-700 bg-orange-600 py-2 px-3 text-white font-semibold"
        :to="{ path: '/register' }"
      >
        Sign Up
      </router-link>
    </div>
  </div>
</template>

<script>
import NavUserDropdown from "./nav-user-dropdown";
//import api from "../plugins/feathers-client";

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
