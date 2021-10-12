<template>
    <div class="wrap">
        <div class="title">
            <span>在售卡项</span>
            <img class="home" @click="toHome" :src="home" alt="">
        </div>
        <van-list class="list" v-model="loading" :finished="finished" finished-text="没有更多了" offset="20" @load="onLoad">
            <van-cell v-for="item in list" :key="item.id" @click="toDetail(item.id)">
                <div class="item">
                    <div class="left">
                        <img :src="item.cover" alt="">
                    </div>
                    <div class="right">
                        <div class="right_top">
                            <span>{{item.name}}</span>
                            <em>￥{{item.price && item.price.toFixed(2)}}</em>
                        </div>
                        <div class="right_bottom">
                            <div class="right_item">
                                <span v-if="item.type == 1">类型：次卡</span>
                                <span v-if="item.type == 2">类型：年卡</span>
                                <span v-if="item.type == 3">类型：季卡</span>
                                <span v-if="item.type == 4">类型：月卡</span>
                                <span v-if="item.type == 5">类型：周卡</span>
                                <span v-if="item.type == 6">类型：储值卡</span>
                                <span v-if="item.type == 7">类型：小时卡</span>
                                <span v-if="item.expire_date_on == 1">有效期：{{item.expire_date}}天</span>
                                <span v-else>有效期：不限</span>
                            </div>
                            <div class="right_item">
                                <span>支持课程：{{item.count}} 门</span>
                            </div>
                        </div>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
const cards = require("@/api/card");
import home from "@/assets/img/home.png";
export default {
	data() {
		return {
			home,
			loading: false,
			finished: false,
			list: [],
			total: 0,
			pageSize: 10,
			currentPage: 1,
		};
	},
	mounted() {},
	methods: {
		onLoad() {
			this.fetchData();
		},
		async fetchData() {
			let params = {
				pageSize: this.pageSize,
				page: this.currentPage,
			};

			let res = await cards.list(params);

			if (res.code == 200) {
				this.total = res.data.total;
				this.loading = false;
				if (this.list.length == 0) {
					this.list = res.data.list;
				} else {
					this.list = this.list.concat(res.data.list);
				}

				if (this.list.length == this.total) {
					this.finished = true;
				}

				this.currentPage = this.currentPage + 1;
			}
		},
		toDetail(card_id) {
			this.$router.push({
				path: "/card/" + card_id,
			});
		},
		toHome() {
			this.$router.replace({
				path: "/",
			});
		},
	},
};
</script>

<style lang="less" scoped>
.title {
	display: flex;
	font-size: 16px;
	color: #000;
	font-weight: bold;
	padding: 15px;
	border-bottom: 1px solid #efefef;
	justify-content: space-between;
	align-items: center;
	span {
		display: block;
		padding-left: 10px;
		border-left: 3px solid #ff5926;
	}
	.home {
		width: 18px;
		height: 16px;
	}
}
.list {
	padding: 0;
	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left {
			width: 30%;
			margin-right: 15px;
			img {
				width: 100%;
			}
		}
		.right {
			flex: 1;
			.right_top {
				padding-bottom: 5px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				span {
					font-size: 16px;
				}
				em {
					font-size: 16px;
					font-weight: bold;
					color: #ff5926;
					font-style: normal;
				}
			}
			.right_item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				color: #666;
			}
		}
	}
}
</style>