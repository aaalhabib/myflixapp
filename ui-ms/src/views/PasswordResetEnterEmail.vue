<template>
  <div
    class="flex flex-col text-black w-full justify-center"
    style="height: 80%"
  >
    <div class="flex flex-row items-center justify-center">
      <h1 class="text-2xl text-white uppercase content-center font-bold">
        Password Reset
      </h1>
    </div>
    <form
      class="flex items-center justify-center flex-row form"
      @submit.prevent="sendEmailReset()"
    >
      <input
        class="form-input"
        required
        type="email"
        v-model="email"
        placeholder="your account email"
      />
      <button
        class="px-3 py-2 text-white bg-orange-600 m-1 rounded-sm hover:bg-red-600"
      >
        Check Email
      </button>
      <br />
      <div v-if="error_message.length" class="error-message">
        {{ error_message }}
      </div>
    </form>
  </div>
</template>

<script>
import api from "@/plugins/feathers-client";

export default {
  name: "ResetWithEmail",
  data() {
    return {
      email: "",
      error_message: ""
    };
  },
  methods: {
    async sendEmailReset() {
      try {
        let res = await api
          .service("api/users-ms/password-reset")
          .get(this.email);
        if (res.hasOwnProperty("security_question")) {
          this.$store.commit("SET_PASSWORD_RESET_EMAIL_INFO", res);
          this.$router.push("/password-reset/security-question");
        }
        this.error_message = "operation failed";
      } catch (exp) {
        this.error_message = exp.message;
      }
    }
  }
};
</script>
