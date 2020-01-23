<template>
  <div v-if="video" class="w-full px-5 py-2">
    <h1 class="font-bold text-2xl">{{ video.title }}</h1>
    <div v-if="video" class="mt-3 flex justify-round">
      <video
        ref="player"
        v-if="video.poster_url"
        :poster="video.poster_url"
        class="w-2/3 border"
        controls
      >
        <source :src="video.file_url" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="flex-1 relative p-3">
        <span
          class="mt-1 p-1 font-semibold block text-xl underline uppercase"
          >{{ video.category }}</span
        >
        <span class="mt-3 px-1 text-gray-300 block">
          <strong
            ><span class="uppercase">release date : </span
            >{{ format(video.publish_ts) }}</strong
          >
        </span>
        <br />
        <p>{{ video.description }}</p>
        <div class="flex absolute text-black bottom-0 mt-10">
          <like
            class="p-1 m-2 border rounded-lg hover:bg-gray-600"
            :video-id="video.id"
          />
          <dislike
            class="p-1 m-2 border rounded-lg hover:bg-gray-600"
            :video-id="video.id"
          />
          <favorite
            class="p-1 m-2 border rounded-lg hover:bg-gray-600"
            :video-id="video.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";
import like from "../components/like";
import dislike from "../components/dislike";
import favorite from "../components/favorite";
import watch from "../plugins/watch";
import moment from "moment";

export default {
  name: "Video",
  mixins: [watch],
  components: { like, dislike, favorite },
  async beforeRouteEnter(to, from, next) {
    let video = await api.service("api/videos-ms/videos").get(to.params.id);
    next(vm => vm.setVideoInfo(video));
  },
  data() {
    return {
      video: null
    };
  },
  methods: {
    format(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    setVideoInfo(info) {
      this.video = info;
      this.setUrls();
    },
    setUrls() {
      this.video.poster_url = "/uploads/" + this.video.poster_path;
      this.video.file_url = "/uploads/" + this.video.file_path;
    }
  }
};
</script>
