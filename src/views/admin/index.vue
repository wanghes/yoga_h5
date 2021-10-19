<template>
    <div class="wrap admin">
        <div class="detail">
            <div class="head">
				<van-image width="100%" fit="cover" :src="info.cover" />
				<span class="name">{{info.name}}</span>
			</div>
			<div class="list">
				<div class="title">品牌介绍</div>
				<div class="intro" v-html="info.des"></div>
			</div>
			<div class="list">
				<div class="title">营业时间</div>
				<div class="intro">{{info.time}}</div>
			</div>
			<div class="list">
				<div class="title">地址信息</div>
				<div class="intro">{{info.adress}} {{info.traffic}}</div>
			</div>
			<div class="btn_wrap">
				<van-button type="danger" @click="jump" block round>请在PC端进入我的后台管理</van-button>
			</div>
			
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
			active: 0,
			info: {},
		};
	},
	mounted() {
		this.fetchVenuesDetail();
	},
	methods: {
		onChange(index) {
			if (index == 0) return;
			if (index == 1) {
				this.$router.replace({
					path: "/manage"
				});
				return;
			}

			if (index == 2) {
				this.$router.replace({
					path: "/my"
				});
			}
		},
		jump() {
			this.$router.push({
				path: "/manage"
			})
		},
		async fetchVenuesDetail() {
			let admin_user_id = cookie.get("admin_user_id");
			let res = await venues.fetchVenues({
				admin_user_id,
			});
			if (res.code == 200) {
				this.info = res.data;
			}
		},
	},
};
</script>
<style>
.admin .van-button--danger {
    color: #fff;
    background-color: #FF5926;
    border: 1px solid #FF5926;
}
</style>
<style lang="less" scoped>
.admin {
	width: 100%;
	position: relative;
	padding-bottom: 55px;
	.detail {
		display: flex;
		flex-direction: column;
		.head {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.name{
				font-size: 18px;
				color:#000;
				margin-top: 7px;
			}
			
		}
		.list{
			padding: 15px;
			box-sizing: border-box;
		}
		.intro{
			line-height: 1.6em;
			color: #333;
			font-size: 14px;
		}
		.title{
			font-size: 16px;
			border-left: 3px solid red;
			padding-left: 8px;
			color: #000;
			font-weight: bold;
			margin-bottom: 10px;
		}
		.btn_wrap{
			padding: 30px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}

	
}
</style>