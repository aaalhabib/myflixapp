<template>
  <div v-if="videos" class="p-3">
    <h1 class="text-2xl">Favorites</h1>
    <div class="flex flex-wrap flex-row">
      <div
        class="relative m-4 bg-red-300"
        style="height: 15em; width: 12em; cursor: pointer"
        :key="video.id"
        v-for="video in videos"
      >
        <button
          @click="removeIt(video.id)"
          class="z-10 px-2 pb-1 absolute inline-block top-0 right-0 border bg-gray-900 border-gray-500"
        >
          x
        </button>
        <img
          @click="goToVideosPage(video.id)"
          class="static w-full h-full"
          :src="url(video.poster_path)"
        />
        <p
          @click="goToVideosPage(video.id)"
          style="background: rgba(0,0,0,.6)"
          class="absolute bottom-0 w-full py-2 text-center text-gray-200 font-semibold"
        >
          {{ video.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";
export default {
  name: "Favorites",
  async created() {
    let selected = await api.service("api/watches-ms/favorites").find({
      query: {
        user_id: this.user.id,
        $select: ["video_id", "visited_at"]
      }
    });
    let ids = selected.data.map(({ video_id }) => video_id);
    if (ids.length > 0) {
      this.videos = await api.service("api/videos-ms/videos").find({
        query: {
          id: {
            $in: ids
          }
        }
      });
    }
  },
  data() {
    return {
      videos: []
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async removeIt(id) {
      try {
        await api.service("api/watches-ms/favorites").remove(null, {
          query: {
            user_id: this.user.id,
            video_id: id
          }
        });
        this.videos = this.videos.filter(video => video.id != id);
      } catch (exp) {}
    },
    url(path) {
      return `/uploads/${path}`;
    },
    goToVideosPage(id) {
      this.$router.push(`/videos/${id}`);
    }
  }
};
</script>
