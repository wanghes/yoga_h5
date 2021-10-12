<template>
    <div class="wrap">
        <div class="video_box" v-if="requestDone && buyQueryStatus && buyStatus">
            <video-player :options="videoOptions" />
        </div>
		<div v-else>
			<img class="theme" :src="detail.course_cover" alt="">
		</div>
        <div class="title">
            <span>{{detail.course_name}}</span>
        </div>
    </div>
</template>
<script>
const online = require("@/api/online");
import { cookie } from "@/utils/index";
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
	data() {
		return {
			detail: {},
			player: null,
			videoOptions: {},
			requestDone: false,
			buyStatus: false,
			buyQueryStatus: false,
			userId: cookie.get('user_id'),
			detailId:""
		};
	},
	components: {
		VideoPlayer,
	},
	mounted() {
		let id = this.$route.params.id;
		this.detailId = id;
		let type = this.$route.query.type;
		if (type == 1) {
			this.queryBuyStatus(id,type);
		} else {
			let pid = this.$route.query.pid;
			this.queryBuyStatus(pid,type);
		}
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
		async queryBuyStatus(id, type) {
            let course_id = id;
            let member_id = this.userId;

			let res = null;
			if (type == 2) {
				res = await online.query_series_buy_status({
					course_id,
					member_id
				});
	
			} else {
				res = await online.query_alone_buy_status({
					course_id,
					member_id
				});
			}

            if (res.code == 200) {
                this.buyStatus = res.data;
                this.buyQueryStatus = true;
				this.fetchData(this.detailId);
            }
        },
		initVideoOptions(res) {
			this.requestDone = true;
			this.videoOptions = {
				autoplay: false,
				controls: true,
				poster: res.course_cover,
				width: window.innerWidth,
				height: "220",
				sources: [
					{
						src: res.course_video,
						type: "video/mp4",
					},
				],
			};
		},
	},
};
</script>

<style lang="less" scoped>
.theme {
	max-width: 100%;
	display: block;
	margin:0 auto;
}
.title {
	padding: 15px;
	font-size: 16px;
	line-height: 24px;
	box-sizing: border-box;
	font-weight: bold;
	margin-bottom: 5px;
}
</style>