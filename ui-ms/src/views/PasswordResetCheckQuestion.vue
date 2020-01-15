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
      <h3 class="text-white text-xl">Security Question</h3>
    </div>
    <form
      class="flex items-center justify-center flex-col form"
      @submit.prevent="sendSecurityAnswer()"
    >
      <label class="bg-red-700 px-2 py-3 text-gray-900 font-bold w-1/3 mb-1">
        <h3>{{ security_question }}</h3>
      </label>
      <textarea
        class="form-input w-1/3"
        required
        v-model="security_answer"
        placeholder="answer security question"
      />
      <div v-if="error_message.length" class="error-message">
        {{ error_message }}
      </div>
      <button
        class="px-3 py-2 text-white bg-orange-600 m-1 rounded-sm hover:bg-red-600"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script>
import api from "../plugins/feathers-client.js";

export default {
  name: "ResetQuestion",
  data() {
    return {
      error_message: "",
      security_answer: ""
    };
  },
  computed: {
    security_question() {
      return this.$store.state.password_reset_info.security_question;
    }
  },
  methods: {
    async sendSecurityAnswer() {
      try {
        let res = await api.service("api/users-ms/password-reset").find({
          query: {
            email: this.$store.state.password_reset_info.email,
            security_answer: this.security_answer
          }
        });
        if (res && res.data && res.data.id) {
          this.$store.commit("SET_PASSWORD_RESET_EMAIL_INFO", {
            id: res.data.id
          });
          this.$router.push("/password-reset/reset-form");
        }
      } catch (exp) {
        console.log(exp);
        this.error_message = exp.message;
      }
    }
  }
};
</script>

<style scoped></style>
