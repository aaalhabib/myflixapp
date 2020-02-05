<template>
  <div class="flex text-black w-full justify-center">
    <form @submit.prevent="loginUser()" class="h-full w-1/3 flex flex-col">
      <div class="flex flex-row justify-center">
        <h1 class="text-2xl text-white uppercase content-center font-bold">
          Sign in
        </h1>
      </div>
      <label class="block mt-2">
        <span class="text-gray-700">email</span>
        <input
          required
          type="email"
          class="form-input w-full"
          placeholder="email address"
          id="email"
          v-model="user.email"
        />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">password</span>
        <input
          type="password"
          required
          class="form-input w-full"
          placeholder="password"
          id="password"
          v-model="user.password"
        />
      </label>
      <div class="error-message" v-if="message" v-text="message" />

      <div class="flex justify-between">
        <button
          class="mt-2 w-1/2 inline-block font-semibold py-3 px-2 rounded-lg text-white hover:bg-red-700 bg-orange-700"
        >
          login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";

export default {
  name: "Login",
  data() {
    return {
      message: "",
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let res = await api.authenticate({
          strategy: "local",
          email: this.user.email,
          password: this.user.password
        });
        this.$store.commit("SET_USER", res.user);
        this.$store.commit("SET_TOKEN", res.accessToken);
        this.$router.push({ path: "/" });
      } catch (exp) {
        this.message = exp.message;
      }
    }
  }
};
</script>
