<template>
  <div
    class="flex flex-col text-black w-full justify-center"
    style="height: 80%"
  >
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-2xl text-white uppercase content-center font-bold">
        Password Reset
      </h1>
      <br />
      <h3 class="text-white text-xl">New Password</h3>
    </div>
    <form
      class="flex items-center justify-center flex-col form"
      @submit.prevent="sendNewPassword()"
    >
      <input
        type="password"
        class="form-input w-1/3 mb-1"
        required
        v-model="password"
        placeholder="password"
      />
      <input
        type="password"
        class="form-input w-1/3 mb-1"
        required
        v-model="password_confirmation"
        placeholder="password confirmation"
      />
      <div v-if="error_message.length" class="error-message">
        {{ error_message }}
      </div>
      <button
        class="px-3 py-2 text-white bg-orange-600 m-1 rounded-sm hover:bg-red-600"
      >
        save
      </button>
    </form>
  </div>
</template>

<script>
import api from "../plugins/feathers-client.js";
export default {
  name: "password-reset",
  data() {
    return {
      error_message: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    async sendNewPassword() {
      if (this.password !== this.password_confirmation) {
        this.error_message =
          "password and password confirmation fields are not equals";
        return;
      }
      if (this.password.length < 6) {
        this.error_message = "password filed length is less than 6";
        return;
      }
      try {
        await api.service("api/users-ms/password-reset").patch(this.user_id, {
          password: this.password
        });
        this.$router.push("/login");
      } catch (exp) {
        this.error_message = exp.message;
      }
    }
  },
  computed: {
    user_id() {
      return this.$store.state.password_reset_info.id;
    }
  }
};
</script>

<style scoped></style>
