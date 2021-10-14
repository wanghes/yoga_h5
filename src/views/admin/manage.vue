<template>
    <div class="wrap admin">
        <van-notice-bar :scrollable="false" text="请复制您的管理地址，在电脑端打开后台管理平台" />
        <div class="top">
            <h3>您的后台管理地址</h3>
            <div class="shuru"><input :value="link" readonly /></div>
            <van-button round block type="danger" size="normal" v-clipboard:copy="link" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</van-button>
        </div>
        <van-tabbar v-model="active" active-color="#FF5926" @change="onChange" inactive-color="#000">
            <van-tabbar-item icon="shop">场馆信息</van-tabbar-item>
            <van-tabbar-item icon="cluster">管理后台</van-tabbar-item>
            <van-tabbar-item icon="wap-home-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
const venues = require("@/api/venues");
import { cookie } from "@/utils/index";

export default {
	data() {
		return {
			active: 1,
			info: {},
			link: "",
		};
	},
	mounted() {
		this.fetchVenues();
	},
	methods: {
		onChange(index) {
			if (index == 1) return;
			if (index == 0) {
				this.$router.replace({
					path: "/admin",
				});
				return;
			}
			if (index == 2) {
				this.$router.replace({
					path: "/my",
				});
			}
		},
		// 复制成功时的回调函数
		onCopy(e) {
			this.$toast("内容已复制到剪切板！");
		},
		// 复制失败时的回调函数
		onError(e) {
			this.$toast("抱歉，复制失败！");
		},
		async fetchVenues() {
			let admin_user_id = cookie.get("admin_user_id");
			let res = await venues.fetchVenues({
				admin_user_id,
			});
			if (res.code == 200) {
				this.info = res.data;
				let venuesId = res.data.venues_id;
				this.link = "http://admin.yogaguanjia.com/?aid=" + venuesId;
			}
		},
	},
};
</script>
<style>
.admin .van-button--danger {
	color: #fff;
	background-color: #ff5926;
	border: 1px solid #ff5926;
}
</style>
<style lang="less" scoped>
.admin {
	width: 100%;
	position: relative;
	.top {
		padding: 15px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		.shuru {
			width: 100%;
			padding: 5px 10px;
			box-sizing: border-box;
			border: 1px solid #dedede;
			border-radius: 5px;
			margin: 15px 0;
			input {
				border: none;
				width: 100%;
				color: #dedede;
				font-size: 14px;
			}
		}
	}
}
</style>