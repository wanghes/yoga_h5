<template>
    <div class="wrap admin">
        <div class="top">
            <div class="info">
                <div class="head">
                    <van-image width="5rem" height="5rem" round fit="cover" :src="info.avatar" />
                </div>
                <div class="right">
                    <span class="name">{{info.name}}</span>
                    <span class="label">ID：{{info.venues_id}}</span>
                </div>
            </div>
            <div class="slist">
                <div class="item" @click="linkTo(1)">
                    <van-icon name="friends-o" size="36px" color="rgb(255, 89, 38)" />
                    <span>学员列表</span>
                </div>
                <div class="item" @click="linkTo(2)">
                    <van-icon name="todo-list" size="36px" color="rgb(255, 89, 38)" />
                    <span>课程订单</span>
                </div>
                <div class="item" @click="linkTo(3)">
                    <van-icon name="balance-list" size="36px" color="rgb(255, 89, 38)" />
                    <span>我的收入</span>
                </div>
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
			active: 2,
			info: {},
		};
	},
	mounted() {
		this.fetchVenues();
	},
	methods: {
		linkTo(val) {
			if (val == 1) {
				this.$router.push({
					path: "/members",
				});
				return;
			}
			if (val == 2) {
				this.$router.push({
					path: "/orders",
				});
				return;
			}
			if (val == 3) {
				this.$router.push({
					path: "/profit",
				});
				return;
			}
		},
		onChange(index) {
			if (index == 2) return;
			if (index == 1) {
				this.$router.replace({
					path: "/manage",
				});
				return;
			}

			if (index == 0) {
				this.$router.replace({
					path: "/admin",
				});
			}
		},
		async fetchVenues() {
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

<style lang="less" scoped>
.admin {
	width: 100%;
	position: relative;
	.top {
		display: flex;
		flex-direction: column;
		.info {
			display: flex;
			flex-direction: row;
			padding: 15px;
			box-sizing: border-box;
			align-items: center;
			.head {
				padding-right: 15px;
			}
			.right {
				display: flex;
				flex-direction: column;
				.name {
					font-size: 18px;
					color: #666;
					margin-bottom: 7px;
				}
				.label {
					color: #ccc;
					font-size: 14px;
				}
			}
		}
	}

	.slist {
		padding: 0 15px 15px;
		display: flex;
		justify-content: center;
		.item {
			width: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 30px 15px;
			border: 1px solid #efefef;
			box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
			span {
				margin-top: 8px;
				font-size: 14px;
			}
		}
	}
}
</style>