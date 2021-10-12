<template>
    <div class="wrap">
        <div class="list" v-if="list.length > 0">
            <div class="item" v-for="item in list" :key="item.id" @click="jump(item.id)">
                <div class="top" v-if="item.tempStatus == 1">
                    <div class="left">
                        <img :src="dian" alt="">
                        <span>活动结束时间</span>
                        <em>{{item.over_time}}</em>
                    </div>
                    <div class="right">进行中</div>
                </div>
                <div class="top over" v-else>
                    <div class="left">
                        <img :src="dian" alt="">
                        <span>活动结束时间</span>
                        <em>{{item.over_time}}</em>
                    </div>
                    <div class="right">已结束</div>
                </div>
                <div class="middle">
                    <van-image width="36%" fit="contain" :src="item.cover" />
                    <div class="right">
                        <h3>{{item.name}}</h3>
                        <div class="m_bot">
                            <div class="progress">
                                <van-progress v-if="item.tempStatus == 1" color="#FF5926" :percentage="item.percentage" stroke-width="10" />
                                <van-progress v-else inactive :percentage="item.percentage" stroke-width="10" />
                            </div>
                            <span>已抢{{item.people}}件</span>
                        </div>
                    </div>
                </div>
                <div class="bot_info" v-if="item.tempStatus == 1">
                    <div class="left">
                        <span><i class="bi">￥</i>{{item.now_price && item.now_price.toFixed(2)}}</span>
                    </div>
                    <div class="right">
                        <span>马上抢</span>
                    </div>
                </div>
                <div class="bot_info over" v-else>
                    <div class="left">
                        <span><i class="bi">￥</i>{{item.now_price && item.now_price.toFixed(2)}}</span>
                    </div>
                    <div class="right">
                        <span>马上抢</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <van-empty description="还没有数据" />
        </div>
    </div>
</template>
<script>
import dian from "@/assets/img/dian.png";
const miaosha = require("@/api/miaosha");

import { getTimeStamp } from "@/utils/index";

export default {
	data() {
		return {
			dian,
			list: [],
		};
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			let res = await miaosha.allList();

			if (res.code == 200) {
				this.formatData(res.data);
				this.list = res.data;
			}
		},
		jump(id) {
			this.$router.push({
				path: "/miaosha/" + id,
			});
		},
		formatData(list) {
			let nowTime = new Date().getTime();
			list.forEach(item => {
				if (item.status == 1) {
					let time = getTimeStamp(item.over_time).timeStamp;
					if (nowTime > time) {
						item.tempStatus = 0;
					} else {
						item.tempStatus = 1;
					}
				} else {
					item.tempStatus = 0;
				}
				let percentage = Math.ceil((item.people / item.limit) * 100);
				item.percentage = percentage;
			});
		},
	},
};
</script>

<style lang="less" scoped>
.list {
	.item {
		margin-bottom: 15px;
		border-top: 1px solid #f2f2f2;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
		.top {
			display: flex;
			justify-content: space-between;
			background-color: #fbfbfb;
			padding: 15px 15px;
			box-sizing: border-box;
			border-bottom: 1px solid #f2f2f2;
			.left {
				display: flex;
				align-items: center;
				img {
					width: 10px;
					height: 16px;
					margin-right: 5px;
				}
				span {
					color: #000000;
					margin-right: 10px;
				}
				em {
					font-style: normal;
					color: #ff5926;
				}
			}
			.right {
				color: #ff5926;
			}
			&.over {
				.left {
					span {
						color: #999;
						margin-right: 10px;
					}
					em {
						font-style: normal;
						color: #999;
					}
				}
				.right {
					color: #999;
				}
			}
		}
		.middle {
			padding: 15px;
			display: flex;
			// img{
			//     width: 125px;
			//     height: auto;
			// }
			.right {
				padding-left: 15px;
				color: #000000;
				flex: 1;
				h3 {
					margin: 0;
					padding: 0;
					font-size: 16px;
					font-weight: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.m_bot {
					padding-top: 15px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 14px;
					color: #ff5926;
					flex: 1;
					width: 100%;
					.progress {
						width: 50%;
					}
				}
			}
		}
		.bot_info {
			display: flex;
			justify-content: space-between;
			background-color: #ffe3db;
			.left {
				flex: 1.2;
				padding-left: 15px;
				box-sizing: border-box;
				color: #ff5926;
				height: 50px;
				font-size: 22px;
				line-height: 50px;
				.bi {
					font-size: 14px;
					font-style: normal;
				}
			}
			.right {
				flex: 1;
				color: #fff;
				height: 0;
				font-size: 16px;
				line-height: 50px;
				text-align: center;
				border-bottom: 50px solid #ff5926;
				border-left: 20px solid transparent;
			}
			&.over {
				background-color: #efefef;
				.left {
					color: #666;
				}
				.right {
					border-bottom: 50px solid #ccc;
					color: #666;
				}
			}
		}
	}
}
</style>