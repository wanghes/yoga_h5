<template>
    <div class="wrap">
        <div class="video_box" v-if="requestDone">
            <video-player :options="videoOptions"/>
        </div>
    </div>
</template>
<script>
const online = require("@/api/online");
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
	data() {
		return {
			detail: {},
            player: null,
            videoOptions:{},
            requestDone: false
		};
	},
    components: {
		VideoPlayer
	},
	mounted() {
		let id = this.$route.params.id;
		this.fetchData(id);
	},
	methods: {
		async fetchData(id) {
			let res = await online.query_alone_detail({
				id,
			});

			if (res.code == 200) {
				this.detail = res.data;
				this.initVideoOptions(res.data);
			}
		},
        initVideoOptions(res) {
            this.requestDone = true
            this.videoOptions = {
                autoplay: false,
				controls: true,
                poster: res.course_cover,
                width: window.innerWidth,
                height: "220",
				sources: [
					{
						src: res.course_video,
						type: "video/mp4"
					}
				]
            }
        },
	},
};
</script>

<style lang="less" scoped>
</style>