<template>
  <div v-if="user">
    <div class="p-5" v-if="incompletes.videos.length">
      <div>
        <h1 class="font-bold text-2xl">Incompletes</h1>
        <category-slide :category="incompletes" />
      </div>
    </div>
    <div class="p-5" v-if="categories != null">
      <div :key="category.title" v-for="category in categories">
        <category-slide :category="category" />
      </div>
    </div>
  </div>
  <div
    class="flex flex-col content-center items-center justify-end h-64"
    v-else
  >
    <div class="text-center font-semibold centered text-4xl text-white block">
      Unlimited movies to watch <br />
      anywhere and any time
    </div>
    <br />
    <router-link
      class="cursor-pointer hover:bg-red-700 bg-orange-700 py-3 px-5 rounded-full text-white text-2xl"
      :to="{ path: '/register' }"
    >
    </router-link>
    Try it now!
  </div>
</template>

<script>
import CategorySlide from "../components/category-slide.vue";
import api from "../plugins/feathers-client";
export default {
  name: "home",
  components: { CategorySlide },
  async created() {
    await this.fetchCategories();
    await this.fetchIncompletes();
  },
  data() {
    return {
      incompletes: {
        videos: []
      },
      categories: null
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async fetchCategories() {
      this.categories = await api.service("api/videos-ms/categories").find({
        query: {
          $homeCategories: true
        }
      });
    },
    async fetchIncompletes() {
      try {
        let res = await api.service("api/watches-ms/incompletes").find({
          query: {
            user_id: this.user.id,
            $select: ["video_id"]
          }
        });
        let ids = res.data.map(({ video_id }) => video_id);
        this.incompletes.videos = await api
          .service("api/videos-ms/videos")
          .find({
            query: {
              id: {
                $in: ids
              }
            }
          });
      } catch (exp) {}
    }
  }
};
</script>
