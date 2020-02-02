<template>
  <div class="p-5 w-2/3">
    <div class="register">
      <h2 class="font-bold text-2xl">Add Friend</h2>
      <input
        class="mx-1 form-input text-gray-900"
        v-model="other_user_email"
        type="email"
        placeholder="Enter Friend Email"
        required
      />
      <button
        class="hover:bg-green-800 rounded-lg p-2 bg-green-600 text-white font-bold text-centered capitalize"
        :disabled="!other_user_email"
        @click.prevent="registerFriendship()"
      >
        be friends
      </button>
    </div>
    <div
      class="flex flex-col overflow-wrap justify-btween mt-2 px-2 border bg-gray-800 w-full"
      style="min-height: 20em"
    >
      <h2 class="font-bold text-2xl">Friends</h2>
      <div class="relative p-2 my-3" v-for="user in users" :key="user.id">
        <span class="absolute font-semi-bold left-0">
          {{ user.name }}
        </span>
        <button
          @click.prevent="removeFriendship(user.id)"
          class="px-2 py-1 absolute right-0 bg-red-600 hover:bg-red-800 text-white"
        >
          x
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";

export default {
  name: "Friends",
  async created() {
    this.users = await api.service("api/recommendations-ms/friends").find({
      query: {
        user_id: this.$store.state.auth.user.id,
        paginate: false
      }
    });
  },
  data() {
    return {
      users: [],
      other_user_email: null
    };
  },
  methods: {
    async registerFriendship() {
      let users = [];
      users.push(this.$store.state.auth.user);
      try {
        let other_user_response = await api.service("api/users-ms/users").find({
          query: {
            email: this.other_user_email,
            $limit: 1
          }
        });
        users.push(other_user_response.data[0]);
        let friend = await api
          .service("api/recommendations-ms/friends")
          .create({
            users
          });
        window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    },
    async removeFriendship(id) {
      let users = [];
      users.push(this.$store.state.auth.user.id);
      users.push(id);
      try {
        let friend = await api
          .service("api/recommendations-ms/friends")
          .remove(null, {
            query: { users }
          });
        window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
