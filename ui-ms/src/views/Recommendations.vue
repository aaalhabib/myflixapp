<template>
  <div class="px-3">
    <h2 class="font-bold text-2xl">Recommendations</h2>
    <div class="mt-2 flex flex-row flex-wrap w-40" v-if="list.length">
      <div
        v-for="reco in list"
        :key="reco.id"
        style="cursor: pointer"
        class="relative flex flex-col items-center justify-around"
      >
        <img
          :src="reco.poster_url"
          :alt="reco.title"
          @click="goToVideoPage(reco.id)"
        />
        <strong @click="goToVideoPage(reco.id)">{{ reco.title }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";
export default {
  name: "Recommendations",
  async created() {
    this.list = await api
      .service("api/recommendations-ms/recommendations")
      .find({
        query: {
          user_id: this.$store.state.auth.user.id
        }
      });
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    goToVideoPage(id) {
      this.$router.push("/videos/" + id);
    }
  }
};
</script>
