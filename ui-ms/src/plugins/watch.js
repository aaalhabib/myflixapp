import api from "../plugins/feathers-client";
export default {
  async mounted() {
    setTimeout(async () => {
      console.log(this.$refs);
      console.log(this.$refs.player);
      this.player = this.$refs.player;
      if (this.video) {
        this.trackWatch();
        this.videoCompleted();
        await this.seekToCountinue();
      }
    }, 100);
  },
  data() {
    return {
      player: null
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async seekToCountinue() {
      try {
        let res = await api.service("api/watches-ms/incompletes").find({
          query: {
            user_id: this.user.id,
            video_id: this.video.id
          }
        });
        this.player.currentTime = res.data[0].paused_at;
      } catch (exp) {
        console.log(exp);
      }
    },
    async videoCompleted() {
      // track play time
      this.player.addEventListener("timeupdate", async () => {
        let current = Math.floor(this.player.currentTime);
        let duration = Math.floor(this.player.duration);
        // if current time is equal to total video time remove it from continue watching
        if (current === duration) {
          setTimeout(async () => {
            await this.videoCompletedAPI();
          }, 100);
        }
      });
    },
    async videoCompletedAPI() {
      try {
        await api.service("api/watches-ms/incompletes").remove(null, {
          query: { user_id: this.user.id, video_id: this.video.id }
        });
      } catch (exp) {
        console.log(exp);
      }
    },
    async trackWatch() {
      this.player.addEventListener("timeupdate", async () => {
        console.log(Math.floor(this.player.currentTime));
        let current = Math.floor(this.player.currentTime);
        if (current % 20 == 0 && current != 0) {
          console.log(this.player.currentTime);
          await this.trackWatchAPI();
        }
      });
    },
    async trackWatchAPI() {
      try {
        // set update if count > 0
        let { total } = await api.service("api/watches-ms/incompletes").find({
          query: {
            user_id: this.user.id,
            video_id: this.video.id,
            $limit: 0
          }
        });
        // set update if count > 0
        if (total > 0) {
          let res = await api.service("api/watches-ms/incompletes").find({
            query: {
              user_id: this.user.id,
              video_id: this.video.id
            }
          });
          await api
            .service("api/watches-ms/incompletes")
            .patch(res.data[0].id, {
              paused_at: Math.floor(this.player.currentTime),
              user_id: this.user.id,
              video_id: this.video.id
            });
        } else {
          // else create new record
          await api.service("api/watches-ms/incompletes").create({
            paused_at: Math.floor(this.player.currentTime),
            user_id: this.user.id,
            video_id: this.video.id
          });
        }
      } catch (exp) {
        console.log(exp);
      }
    }
  }
};
