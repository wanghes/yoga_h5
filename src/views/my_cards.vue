<template>
    <div class="wrap">
        <div class="item" v-for="item in my_cards" :key="item.id">
            <h3>{{item.card_name}}</h3>
            <div class="card_no">
                <span>卡号：</span>
                <span>{{item.card_no}}</span>
            </div>
            <div class="time">
                <span>开始和结束日期：</span>
                <span>{{item.open_start_time && item.open_start_time.slice(0, 10)}} 至 {{item.open_end_time && item.open_end_time.slice(0, 10)}}</span>
            </div>
            <div>
                <span class="card_style">{{item.card_style_name}}</span>
                <span>剩余 {{item.leave}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { dateFormatYMD, getTimeStamp } from "@/utils/index";
import { cookie } from "@/utils/index";
const moment = require("moment");
import { Toast } from "vant";
const book = require("@/api/book");
const card = require("@/api/card");
const user = require("@/api/user");
export default {
	data() {
		return {
			user_id: "",
			my_cards: [],
			cards: ["次卡", "年卡", "季卡", "月卡", "周卡", "储值卡", "小时卡"],
			mainCard: {},
		};
	},
	mounted() {
		let member_id = cookie.get("user_id");
		this.user_id = member_id;
		this.fetchData();
	},
	methods: {
		async fetchData() {
			Toast.loading({
				message: "加载中...",
				forbidClick: true,
			});
			let cardRes = await card.myCards({
				member_id: this.user_id,
			});

			if (cardRes.code == 200) {
				let idx = null;
				let mainCard = null;
				// 有主卡则放到第一位
				cardRes.data.forEach((item, index) => {
					if (item.default == 1) {
						mainCard = item;
						idx = index;
					}
				});
				if (mainCard) {
					cardRes.data.splice(idx, 1);
					cardRes.data.unshift(mainCard);
				}

				this.my_cards = cardRes.data;

				cardRes.data.forEach(item => {
					let { open_end_time, type } = item;

					let m1 = moment();

					if (type == 1) {
						item.leave = item.surplus + "次";
					} else if (
						type == 2 ||
						type == 3 ||
						type == 4 ||
						type == 5
					) {
						let m2 = moment(
							new Date(
								open_end_time.slice(0, 10).replace(/-/g, "/")
							)
						);
						let diff = m2.diff(m1, "day");
						if (diff >= 0) {
							item.leave = diff + "天";
						} else {
							item.leave = "已用完";
						}
					} else if (type == 6) {
						item.leave = "￥" + item.surplus.toFixed(2) + "元";
					} else if (type == 7) {
						item.leave = item.surplus.toFixed(2) + "小时";
					}
					item["card_style_name"] = this.cards[type - 1];
				});

				this.my_cards = cardRes.data;
			}
			Toast.clear();
		},
	},
};
</script>

<style lang="less" scoped>
.wrap {
	padding: 15px;
	box-sizing: border-box;
	.item {
		background-color: #2d1740;
		color: #fff;
		font-size: 14px;
		border-radius: 10px;
		padding: 15px;
		box-sizing: border-box;
		width: 100%;
		height: 180px;
        margin-bottom: 15px;
		h3 {
			font-size: 20px;
			line-height: 0;
			margin-bottom: 25px;
		}
		.card_no {
			margin-bottom: 10px;
		}
		.time {
			margin-bottom: 10px;
		}
		.card_style {
			font-size: 16px;
			margin-right: 10px;
		}
	}
}
</style>