<template>
    <div class="video_wrap">
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script>
import videojs from "video.js";
import 'video.js/dist/video-js.css'

export default {
	name: "VideoPlayer",
	props: {
		options: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			player: null,
		};
	},
	mounted() {
		this.player = videojs(
			this.$refs.videoPlayer,
			this.options,
			function onPlayerReady() {
				console.log("onPlayerReady", this);
			}
		);
	},
	beforeDestroy() {
		if (this.player) {
			this.player.dispose();
		}
	},
};
</script>

<style lang="less" scoped>
.video_wrap{
	width:100%;
	height: 300px;
	video{
		width:100%;
		height: 100%;
	}
}
</style>