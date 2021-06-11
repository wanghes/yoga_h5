<template>
    <div class="wrap list_box">
        <div class="box">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" offset="20" @load="onLoad">
                <van-cell v-for="item in list" :key="item.id" @click="toDetail(item.id)">
                    <div class="item">
                        <div class="left">
                            <van-image fit="cover" :src="item.course_cover"></van-image>
                        </div>
                        <div class="info">
                            <h3 class="title">
                                {{item.course_name}}
                            </h3>
                            <div class="center">
                                <span v-if="item.pay_money == 0" class="price">免费</span>
                                <span v-else class="price">￥{{item.pay_money.toFixed(2)}}</span>
                            </div>
                            <div class="remo">
                                <span>{{item.create_time}}</span>
                            </div>
                        </div>
                    </div>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>
<script>
import ke from "@/assets/img/ke.png";
const online = require("@/api/online");
export default {
	data() {
		return {
			ke,
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
			let res = await online.alones_list({
				pageSize: this.pageSize,
				page: this.currentPage,
			});

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

		toDetail(id) {
			this.$router.push({
				path: "/online/alones_detail/" + id,
			});
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
</style>            

<style lang="less" scoped>
.list_box {
	// display: flex;
	// flex-direction: column;
	min-height: 100vh;
	box-sizing: border-box;
	.box {
		// display: flex;
		// flex-direction: row;
		// justify-content: center;
		padding-top: 0px;
		// flex-direction: column;
		.item {
			display: flex;
			flex-direction: row;
			align-items: center;
			.left {
				width: 150px;
				padding-right: 10px;
				height: 90px;
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
				
				.center{
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
					em{
						font-style: normal;
					}
				}
				.remo{
					color: #999;
				}
			}
		}
	}
}
</style>