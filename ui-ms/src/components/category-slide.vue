<template>
  <div v-if="category">
    <h1 v-if="category.title" class="text-2xl font-bold">
      {{ category.title }}
    </h1>
    <carousel :per-page="5" :loop="true" v-if="category.videos">
      <slide
        @click.prevent="goToVideoPage(video.id)"
        class="flex p-2"
        style="height: 20em; cursor: pointer"
        v-for="video in category.videos"
        :key="video.id"
      >
        <div class="relative w-full">
          <img
            class="absolute w-full h-full"
            @click.prevent="goToVideoPage(video.id)"
            :src="url(video.poster_path)"
          />
          <p
            @click.prevent="goToVideoPage(video.id)"
            class="p-2 absolute bottom-0 z-30 w-full"
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
export default {
  name: "category-slide",
  props: { category: Object },
  methods: {
    url(path) {
      return "/uploads/" + path;
    },
    goToVideoPage(id) {
      this.$router.push(`/videos/${id}`);
    }
  }
};
</script>
