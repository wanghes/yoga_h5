<template>
    <div class="wrap list_box">
        <van-tabs @click="onClick">
            <van-tab v-for="item in channels" :title="item.name" :name="item.id" :key="item.id">
                <div class="box">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <van-cell v-for="item in list" :key="item.id" @click="jumpDetailSeries(item.id)">
                            <div class="item">
                                <div class="left">
                                    <van-image fit="cover" :src="item.course_cover"></van-image>
                                </div>
                                <div class="info">
                                    <h3 class="title">
                                        {{item.course_name}}
                                    </h3>
                                    <div class="center">
                                        <span v-if="item.pay_type == 1 && item.cu_status" class="cu">促</span>
                                        <span v-if="item.pay_type == 1 && item.cu_status" class="price">
                                            <em>￥{{item.cu_price.toFixed(2)}}</em>
                                        </span>
                                        <span v-if="item.price == 0" class="price">免费</span>
                                        <span v-else class="price">
                                            <del class='del_price' v-if="item.pay_type == 1 && item.cu_status">￥{{item.price.toFixed(2)}}</del>
                                            <em v-else-if="item.pay_type == 1">￥{{item.price.toFixed(2)}}</em>
                                            <em v-else-if="item.pay_type == 2">￥{{item.price.toFixed(2)}}/天</em>
                                            <em v-else-if="item.pay_type == 3">￥{{item.price.toFixed(2)}}/月</em>
                                            <em v-else>￥{{item.price.toFixed(2)}}/年</em>
                                        </span>
                                    </div>
                                    <div class="remo">
                                        <span>已开课{{item.has_count}}节/共{{item.course_num}}节课</span>
                                    </div>
                                </div>
                            </div>
                        </van-cell>
                    </van-list>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
const online = require("@/api/online");
export default {
	data() {
		return {
			loading: false,
			finished: false,
			list: [],
			channels: [
				{
					id: 0,
					name: "全部",
				},
			],
			total: 0,
			pageSize: 10,
			currentPage: 1,
		};
	},
	mounted() {
		this.fetchChannels();
	},
	methods: {
		onLoad() {
			this.fetchData(0);
		},
		async fetchChannels() {
			let res = await online.series_channels({});
			if (res.code == 200) {
				this.channels = this.channels.concat(res.data);
			}
		},
		async fetchData(cid) {
			let params = {
				pageSize: this.pageSize,
				page: this.currentPage,
			};
			params.cid = cid;

			let res = await online.series_list(params);

			if (res.code == 200) {
				this.loading = false;
				this.total = res.data.total;
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
		jumpDetailSeries(id) {
			this.$router.push({
				path: `/online/series_detail/${id}`,
			});
		},
		onClick(name, title) {
			this.list = [];
			this.currentPage = 1;
			this.fetchData(name);
		},
	},
};
</script>
            
<style>
.list_box .van-tabs--line .van-tabs__wrap {
	border-bottom: 1px solid #e9e9e9;
}
.list_box .van-tabs__line {
	background-color: #ff5927;
}
.list_box .van-cell {
	padding: 15px;
}
.list_box .van-image__img {
	border-radius: 3px !important;
}
</style>            

<style lang="less" scoped>
.list_box {
	display: flex;
	flex-direction: column;

	box-sizing: border-box;
	.box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-direction: column;
		.item {
			display: flex;
			flex-direction: row;
			align-items: center;
			.left {
				width: 150px;
				padding-right: 10px;
				box-sizing: border-box;
				.van-image {
					width: 140px;
					height: 90px;
				}
			}
			.info {
				display: flex;
				flex-direction: column;
				height: 90px;
				font-size: 12px;
				justify-content: space-between;
				flex: 1;
				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 14px;
					line-height: 18px;
					color: #000;
					margin: 0;
					margin-bottom: 6px;
				}

				.center {
					display: flex;
					align-items: center;
				}
				.cu {
					background-color: #ff5927;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					padding: 3px;
					font-size: 12px;
					width: 14px;
					height: 14px;
					border-radius: 50%;
					margin-right: 5px;
				}
				.price {
					color: #ff5927;
					font-weight: bold;
					em {
						font-style: normal;
					}
					.del_price {
						color: #999;
						margin-left: 10px;
					}
				}
				.remo {
					color: #999;
				}
			}
		}
	}
}
</style>