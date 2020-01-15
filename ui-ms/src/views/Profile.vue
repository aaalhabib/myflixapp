import moment from 'moment';

<template>
  <div class="mt-10 flex flex-col bg-gray-900 text-white items-center">
    <div class="flex w-1/3 justify-center items-center">
      <h1 class="uppercase font-bold text-2xl text-white">Profile</h1>
    </div>
    <div class="mt-3 flex row justify-between w-1/3">
      <span>Name</span>
      <span>{{ user.name }}</span>
    </div>
    <hr class="my-3 w-1/3" />
    <div class="flex row justify-between w-1/3">
      <span>Email</span>
      <span>{{ user.email }}</span>
    </div>
    <div class="flex row justify-between w-1/3">
      <span>Subscribtion Expire Date</span>
      <span>{{ user.subscription_expiry_date }}</span>
    </div>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";
export default {
  name: "Profile",
  async created() {
    await this.fetchInfo();
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    format(date) {
      return moment.utc(date).format("DD-MM-YYYY");
    },
    async fetchInfo() {
      const { user } = await api.reAuthenticate();

      let cards_info = await api.service("api/payments-ms/cards").find({
        user_id: user.id
      });
      console.log(cards_info);
      user.subscription_expiry_date =
        cards_info.data[0].subscription_expiry_date;
      this.$store.commit("SET_USER", user);
    }
  }
};
</script>

<style scoped></style>
