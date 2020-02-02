<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="flex flex-row items-center">
      <h1 class="font-bold text-2xl uppercase">Registration</h1>
    </div>
    <form class="pb-6 h-full text-black w-1/3 flex flex-col">
      <label class="block mt-2">
        <span class="text-gray-700">name</span>
        <input
          class="form-input w-full"
          placeholder="your good name"
          id="name"
          v-model="user.name"
        />
        <div class="error-message" v-if="errors.name" v-text="errors.name[0]" />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">email</span>
        <input
          class="form-input w-full"
          placeholder="email address"
          id="email"
          v-model="user.email"
        />
        <div
          class="error-message"
          v-if="errors.email"
          v-text="errors.email[0]"
        />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">password</span>
        <input
          class="form-input w-full"
          placeholder="password"
          id="password"
          v-model="user.password"
        />
        <div
          class="error-message"
          v-if="errors.password"
          v-text="errors.password[0]"
        />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">security question</span>
        <input
          class="form-input w-full"
          placeholder="add security question"
          id="security_question"
          v-model="user.security_question"
        />
        <div
          class="error-message"
          v-if="errors.security_question"
          v-text="errors.security_question[0]"
        />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">security answer</span>
        <input
          class="form-input w-full"
          placeholder="add security answer"
          id="security_answer"
          v-model="user.security_answer"
        />
        <div
          class="error-message"
          v-if="errors.security_answer"
          v-text="errors.security_answer[0]"
        />
      </label>
      <div class="flex flex-row justify-center">
        <button
          @click.prevent="registerUser()"
          class="mt-2 w-1/2 font-semibold content-center py-3 px-2 rounded-lg text-white hover:bg-red-700 bg-orange-700"
        >
          Continue to payment
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";

export default {
  name: "Register",
  data() {
    return {
      errors: {},
      user: {
        name: "",
        email: "",
        password: "",
        security_question: "",
        security_answer: ""
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        let user = await api.service("api/users-ms/users").create(this.user);
        console.log(user);
        let res = await api.authenticate({
          strategy: "local",
          email: user.email,
          password: this.user.password
        });
        this.$store.state.auth.user = res.user;
        this.$store.state.auth.token = res.accessToken;
        this.$router.push({ path: "/subscribe", params: { id: user.id } });
      } catch (exp) {
        this.errors = exp.data;
      }
    }
  }
};
</script>

<style lang="postcss">
.error-message {
  @apply bg-red-400 text-gray-100 rounded-lg px-2 py-1 mt-1;
}
</style>
