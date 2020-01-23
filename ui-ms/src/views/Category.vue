<template>
  <div>
    <carousel :per-page="5" :loop="true" v-if="categories">
      <slide
        class="flex p-2"
        style="height: 20em"
        v-for="video in categories[0].videos"
        :key="video.id"
      >
        <div class="relative w-full bg-red-300">
          <img class="absolute w-full h-full" :src="url(video.poster_path)" />
          <p
            class="p-2 absolute bottom-0 z-30"
            style="background: rgba(0,0,0, .6)"
          >
            {{ video.title }}
          </p>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";
export default {
  name: "Category",
  data() {
    return {
      title: null,
      categories: null,
      videos: []
    };
  },
  async created() {
    await this.fetchCategories();
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async fetchCategories() {
      this.categories = await api.service("api/videos-ms/categories").find();
    },
    url(path) {
      return `/uploads/${path}`;
    }
  }
};
</script>
