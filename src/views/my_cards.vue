<template>
    <div class="wrap">
		<div class="j_btn">
			<van-button type="primary" @click="jump" block>办理新卡</van-button>
			<van-button plain type="primary" @click="toHome" block>回到首页</van-button>
		</div>
        <div class="item" v-for="item in my_cards" :key="item.id">
			<img class="cover" :src="item.cover" alt="">
            <h3>{{item.card_name}} <span class="card_style">{{item.card_style_name}}</span></h3>
            <div class="card_no">
                <span>完整卡号：</span>
                <span>{{item.card_no}}</span>
            </div>
            <div class="time">
                <span>有效日期：</span>
                <span>{{item.open_start_time && item.open_start_time.slice(0, 10)}} 至 {{item.open_end_time && item.open_end_time.slice(0, 10)}}</span>
            </div>
            <div class="time">
				<span>卡内剩余：</span>
                <span>{{item.leave}}</span>
            </div>
			<div class="time">
				<span>当前状态：</span>
                <span v-if="item.status == 0">待激活</span>
                <span v-else-if="item.status == 1">正常</span>
                <span v-else>已用完</span>
            </div>
			<div class="time">
				<span>是默认卡：</span>
                <span v-if="item.default == 0">否</span>
                <span v-else>是</span>
            </div>
			<div class="btns">
				<van-button v-if="item.status == 0" @click="activeCard(item)" plain size="small" color="#ff5926">激活该卡</van-button>
				<van-button v-if="item.default==0" @click="setDefault(item)" size="small" color="linear-gradient(to right, #ff6034, #ff5926)">设为默认</van-button>
			</div>
        </div>
		
    </div>
</template>
<script>
import { cookie } from "@/utils/index";
import { Toast } from "vant";
const moment = require("moment");
const card = require("@/api/card");

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
		async activeCard(row){
			let { card_no } = row;
			let res = await card.activeCard({
				card_no
			});

			if (res.code == 200) {
				this.fetchData();
			}
		},
		async setDefault(row){
			let { card_no, member_id } = row;
			let res = await card.defaultCard({
				card_no,
				member_id
			});

			if (res.code == 200) {
				this.fetchData();
			}
		},
		jump() {
			this.$router.push({
				path: "/cards"
			})
		},
		toHome() {
			this.$router.push({
				path: "/"
			})
		}
	},
};
</script>

<style lang="less" scoped>
.wrap {
	padding: 15px;
	box-sizing: border-box;
	.item {
		background-color: #fff;
		color: #333;
		font-size: 14px;
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;
		width: 100%;
        margin-bottom: 15px;
		box-shadow: 0 2px 5px rgba(0,0,0,.2);
		h3 {
			font-size: 20px;
			line-height: 1;
			margin-bottom: 10px;
			margin-top: 10px;
		}
		.card_no {
			margin-bottom: 5px;
		}
		.time {
			margin-bottom: 5px;
		}
		.card_style {
			font-size: 14px;
			margin-right: 10px;
			color:#ff5926;
		}
	}
	.cover{
		max-width: 100%;
	}
	.btns{
		display: flex;
		justify-content: space-between;
		.van-button--small{
			&:first-child{
				margin-right: 10px;
			}
			width:50%;
		}
	}
	.j_btn{
		margin-bottom: 15px;
		display: flex;
		justify-content: space-between;
		.van-button{
			flex: 1;
			&:first-child{
				margin-right: 10px;
			}
		}
	}
}
</style>