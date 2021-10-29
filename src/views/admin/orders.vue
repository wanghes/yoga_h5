<template>
    <div class="wrap admin_order">
        <div class="money">共有 {{total}} 个订单</div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="van-cell2" v-for="item in list" :key="item.id">
                <div class="item">
                    <div class="info">订单编号：{{item.order_no}}</div>
                    <div class="con">
                        <div class="left">
                            <van-image fit="cover" :src="item.course_cover"></van-image>
                        </div>
                        <div class="center">
                            <h3 class="title">
                                {{item.order_name}}
                            </h3>
                            <span class="type">课程类型：{{item.course_type == "1" ? "单课":"系列课"}}</span>
                        </div>
                        <div class="amount">￥{{item.amount}}</div>
                    </div>
                    <div class="bot">
                        <span>下单时间：{{item.create_time}}</span>
                        <span>支付方式：微信支付</span>
                    </div>
                    <div class="operate">

                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
const venues = require("@/api/venues");
import { dateFormat } from "@/utils/index";
import { cookie } from "@/utils/index";

export default {
	data() {
		return {
			currentDate: new Date(),
			nowDate: new Date(),
			query_date: "",
			value: "",
			loading: false,
			finished: false,
			list: [],
			total: 0,
			totalSum: 0,
			pageSize: 10,
			currentPage: 1
		};
	},
	mounted() {
		// this.value = dateFormat("YYYY年mm月dd日", this.currentDate);
	},
	methods: {
		onLoad() {
			this.fetchData(1);
		},
		async fetchData(type) {
			let admin_user_id = cookie.get("admin_user_id");
			if (type == 1) {
				let res = await venues.fetchOrders({
					admin_user_id,
					page: this.currentPage,
					pageSize: this.pageSize
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
			}
		},
		onClick(type) {
			this.list = [];
			this.currentPage = 1;
			this.fetchData(type);
		},
		cancel() {
			this.list = [];
			this.currentPage = 1;
			this.showPicker = false;
			this.value = "";
			this.query_date = "";
			this.fetchData(1);
		},
		confirm(value) {
			this.list = [];
			this.currentPage = 1;
			this.value = dateFormat("YYYY年mm月dd日", value);
			this.query_date = dateFormat("YYYY-mm-dd", value);
			this.showPicker = false;
			this.fetchData(1);
		},
	},
};
</script>

<style lang="less" scoped>
.admin_order {
	padding: 15px;
	box-sizing: border-box;
	.money {
		padding: 10px 15px;
		color: #999;
		font-size: 14px;
		box-sizing: border-box;
		border-bottom: 1px solid #efefef;
	}
	.item {
		display: flex;
		flex-direction: column;
        padding: 10px 10px 10px 0;
        .info{
            color:red;
            margin-bottom: 10px;
        }
        .con{
            display: flex;
            align-items: center;
        }
		.left {
			width: 120px;
			padding-right: 10px;
			box-sizing: border-box;	
		}
		.center {
			width: 200px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			h3 {
				overflow: hidden;
                font-weight: normal;
                font-size: 14px;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 0;
			}
            .type{
                color:#666;
            }
		}
		.amount {
			flex: 1;
			text-align: right;
			font: 14px;
			color: black;

		}
        .bot{
            color:#999;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
        }
	}
}
</style>