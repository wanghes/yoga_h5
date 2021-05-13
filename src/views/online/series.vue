<template>
    <div class="wrap list_box">
        <van-tabs @click="onClick">
            <van-tab v-for="item in channels" :title="item.name" :name="item.id" :key="item.id">
                <div class="box">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <van-cell v-for="item in list" :key="item.id" @click="jumpDetailSeries(item.id)">
                            <div class="item">
                                <div class="left">
                                    <img :src="item.course_cover" alt="">
                                </div>
                                <div class="info">
                                    <h3 class="title">{{item.course_name}}</h3>
                                    <div class="w_b">
                                        <div class="center">
                                            <!-- <span class="cu">促</span> -->
                                            <span class="price">￥139</span>
                                        </div>
                                        <div class="remo">
                                            <span>共10节课</span>
                                        </div>
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
import ke from "@/assets/img/ke.png";
const online = require("@/api/online");
export default {
	data() {
		return {
			loading: false,
			ke,
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
			currentPage: 1
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
				this.total = res.data.total;
				if (this.list.length == 0) {
					this.list = res.data.list;
				} else {
					this.list = this.list.concat(res.data.list);
				}

                this.loading = false;
				if (this.list.length == this.total) {
					this.finished = true;
				}

				this.pageSize = this.currentPage + 1;
			}
		},
        jumpDetailSeries(id) {
            this.$router.push({
                path: `/online/series_detail/${id}`
            })
        },
        onClick(name, title) {
            this.list = [];
            this.currentPage = 1;
            this.fetchData(name);
        }
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
		padding-top: 10px;
		flex-direction: column;
		.item {
			display: flex;
			flex-direction: row;
			align-items: center;
			.left {
				width: 130px;
				padding-right: 10px;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				img {
					width: 120px;
					border-radius: 3px;
				}
			}
			.info {
				display: flex;
				flex-direction: column;
				font-size: 12px;
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
					height: 36px;
					color: #000;
					margin: 0;
					margin-bottom: 6px;
				}
				.w_b {
					color: #999;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.cu {
					background-color: #ff5927;
					color: #fff;
					padding: 3px;
					width: 18px;
					height: 18px;
					border-radius: 50%;
					text-align: center;
					display: inline-block;
					margin-right: 5px;
				}
				.price {
					color: #ff5927;
					font-weight: bold;
				}
			}
		}
	}
}
</style>