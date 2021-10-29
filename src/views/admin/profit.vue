<template>
    <div class="wrap admin_profit">
        <!-- <van-tabs @click="onClick" type="card">
            <van-tab title="购买课程收入" name="1"> -->
                <div class="box">
                    <van-field readonly clickable name="picker" right-icon="arrow-down" :value="value" placeholder="选择日期日期" @click="showPicker = true" />
                    <van-popup v-model="showPicker" position="bottom">
                        <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :max-date="nowDate" @confirm="confirm" @cancel="cancel" />
                    </van-popup>
                    <div class="money">收入 ￥{{totalSum}}</div>
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <van-cell class="van-cell2" v-for="item in list" :key="item.id">
                            <div class="item">
                                <div class="left">
                                    <van-image round fit="cover" :src="item.head"></van-image>
                                </div>
                                <div class="center">
                                    <h3 class="title">
                                        {{item.order_name}}
                                    </h3> 
                                    <span class="time">{{item.update_time}}</span> 
                                </div>
                                <div class="amount">+{{item.amount}}</div>
                            </div>
                        </van-cell>
                    </van-list>
                </div>
            <!-- </van-tab>
            <van-tab title="购买会员卡收入" name="2">
            </van-tab>
        </van-tabs> -->
    </div>
</template>

<script>
import { dateFormat } from "@/utils/index";
const venues = require("@/api/venues");
import { cookie } from "@/utils/index";
import row from "@/assets/img/row.png";

export default {
	data() {
		return {
			currentDate: new Date(),
			nowDate: new Date(),
            query_date:"",
			value: "",
			loading: false,
			finished: false,
			list: [],
			total: 0,
            totalSum: 0,
			pageSize: 10,
			showPicker: false,
			currentPage: 1,
			row,
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
				let res = await venues.fetchBills({
					admin_user_id,
					page: this.currentPage,
					pageSize: this.pageSize,
                    date: this.query_date,
				});

				if (res.code == 200) {
					this.loading = false;
					this.total = res.data.total;
                    this.totalSum = res.data.sum;
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
.admin_profit {
	padding: 15px;
	box-sizing: border-box;
	.money {
		padding: 10px 15px;
		color: #999;
		font-size: 14px;
		box-sizing: border-box;
		border-bottom: 1px solid #efefef;
	}
    .item{
        display: flex;
        align-items: center;
        .left{
            width:60px;
            padding: 10px 10px 10px 0;
            box-sizing: border-box;
            img{
                width:50px;
            }
        }
        .center{
            width:200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            h3{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 0;
            }
        }
        .amount{
            flex: 1;
            text-align: right;
            font: 14px;
            color:green;
        }
        
    }
}
</style>