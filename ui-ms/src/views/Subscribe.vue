<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="flex flex-row items-center">
      <h1 class="font-bold text-2xl uppercase">Subscription</h1>
    </div>
    <form class="pb-6 h-full text-black w-1/3 flex flex-col">
      <label class="block mt-2">
        <span class="text-gray-700"> Card Number</span>
        <input
          type="number"
          class="form-input w-full"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          id="name"
          v-model="card.number"
          :maxlength="max"
        />
        <div
          class="error-message"
          v-if="errors.number"
          v-text="errors.number[0]"
        />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">Expiry Year</span>
        <input
          class="form-input w-full"
          placeholder="Enter the expity year"
          id="expiry_year"
          v-model.number="card.expiry_year"
        />
        <div
          class="error-message"
          v-if="errors.expiry_year"
          v-text="errors.expiry_year[0]"
        />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">Expiry Month</span>
        <input
          class="form-input w-full"
          placeholder="Enter the expiry month"
          id="expiry_month"
          v-model.number="card.expiry_month"
        />
        <div
          class="error-message"
          v-if="errors.expiry_month"
          v-text="errors.expiry_month[0]"
        />
      </label>

      <label class="block mt-2">
        <span class="text-gray-700">CVC</span>
        <input
          class="form-input w-full"
          placeholder="Add the three digit CVC"
          id="cvc"
          v-model.number="card.cvc"
        />
        <div class="error-message" v-if="errors.cvc" v-text="errors.cvc[0]" />
      </label>
      <div class="flex flex-row justify-center">
        <button
          @click.prevent="registerCard()"
          class="mt-2 w-1/2 font-semibold content-center py-3 px-2 rounded-lg text-white hover:bg-red-700 bg-orange-700"
        >
          complete subscription
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";

export default {
  name: "Subscribe",
  data() {
    return {
      errors: {},
      card: {
        number: null,
        expiry_year: null,
        expiry_month: null,
        cvc: null
      }
    };
  },
  methods: {
    async registerCard() {
      try {
        this.card.user_id = this.$store.state.auth.user.id;
        let card = await api.service("api/payment-ms/cards").create(this.card);
        this.$store.state.user.subscription_expiry_date =
          card.subscription_expiry_date;

        this.$router.push({ path: "/" });
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
