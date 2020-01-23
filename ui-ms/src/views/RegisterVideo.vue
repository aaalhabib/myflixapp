<template>
  <div class="flex flex-col w-full items-center justify-center">
    <div class="flex flex-row items-center">
      <h1 class="font-bold text-2xl uppercase">Video Registration</h1>
    </div>
    <form
      @submit.prevent="registerVideo()"
      class="pb-6 h-full text-black w-1/3 flex flex-col"
    >
      <label class="block mt-2">
        <span class="text-gray-700">title</span>
        <input
          required
          class="form-input w-full"
          placeholder="Video Title"
          id="title"
          v-model="video.title"
        />
        <div
          class="error-message"
          v-if="errors.title"
          v-text="errors.title[0]"
        />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">description</span>
        <input
          required
          class="form-input w-full"
          placeholder="description"
          id="description"
          v-model="video.description"
        />
        <div
          class="error-message"
          v-if="errors.description"
          v-text="errors.description[0]"
        />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">category</span>
        <select
          required
          class="form-input w-full"
          placeholder="category"
          id="category"
          v-model="video.category"
        >
          <option
            :value="category.title"
            v-for="category in categories"
            :key="category.title"
            v-text="category.title"
          />
        </select>
        <div
          class="error-message"
          v-if="errors.category"
          v-text="errors.category[0]"
        />
      </label>
      <label class="block mt-2" for="">
        <span class="text-gray-700">poster</span>
        <input
          required
          type="file"
          class="form-input w-full bg-gray-900"
          placeholder="poster"
          id="poster_file"
          ref="poster_file"
          @change="setPosterFile()"
        />
        <div
          class="error-message"
          v-if="errors.poster_file"
          v-text="errors.poster_file[0]"
        />
      </label>
      <label class="block mt-2" for="">
        <span class="text-gray-700">file</span>
        <input
          required
          type="file"
          class="form-input bg-gray-900 w-full"
          placeholder="file"
          id="video_file"
          ref="video_file"
          @change="setVideoFile()"
        />
        <div
          class="error-message"
          v-if="errors.video_file"
          v-text="errors.video_file[0]"
        />
      </label>
      <label class="block mt-2" for="">
        <span class="text-gray-700">publish date</span>
        <input
          required
          class="form-input w-full"
          placeholder="publish date"
          id="publish_ts"
          type="date"
          v-model="video.publish_ts"
        />
        <div
          class="error-message"
          v-if="errors.publish_ts"
          v-text="errors.publish_ts[0]"
        />
      </label>
      <div class="flex flex-row justify-center">
        <button
          class="mt-2 w-1/2 font-semibold content-center py-3 px-2 rounded-lg text-white hover:bg-red-700 bg-orange-700"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../plugins/feathers-client";
export default {
  name: "RegisterVideo",
  async created() {
    let data = await api.service("api/videos-ms/categories").find({
      query: {
        $pick: ["title"]
      }
    });
    this.categories = data;
  },
  data() {
    return {
      errors: [],
      categories: [],
      video: {
        title: null,
        category: null,
        video_file: null,
        poster_file: null,
        publish_ts: null,
        description: null
      }
    };
  },
  methods: {
    setPosterFile() {
      this.video.poster_file = this.$refs.poster_file.files[0];
      console.log(this.video.poster_file);
    },
    setVideoFile() {
      this.video.video_file = this.$refs.video_file.files[0];
      console.log(this.video.video_file);
    },
    async registerVideo() {
      let video = new FormData();
      for (let prop in this.video) {
        if (this.video.hasOwnProperty(prop)) {
          video.set(prop, this.video[prop]);
        }
      }
      try {
        let res = await api.service("api/videos-ms/videos").create(video);
        this.$router.push(`/videos/${res.id}`);
      } catch (exp) {
        this.errors = exp.data;
      }
    }
  }
};
</script>
