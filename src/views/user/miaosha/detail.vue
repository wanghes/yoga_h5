<template>
    <div class="wrap miaosha_detail">
        <div class="banner">
            <img class="cover" :src="detail.cover" alt="">
            <div class="time">
                <span>活动截止时间：{{detail.over_time}}</span>
            </div>
            <h3>{{detail.name}}</h3>
            <div class="bot">
                <div class="price">
                    <span class="now_price">￥{{detail.now_price && detail.now_price.toFixed(2)}}</span>
                    <span class="old_price">原价:￥{{detail.old_price && detail.old_price.toFixed(2)}}</span>
                </div>
                <div class="sell">已秒 {{detail.people}}/{{detail.limit}}</div>
            </div>
        </div>

        <div class="detail">
            <div class="box">
                <h3>会员卡详情</h3>
                <div class="item">
                    <span>卡名称</span>
                    <span>{{detail.card_name}}</span>
                </div>
                <div class="item">
                    <span>余额</span>
                    <span v-if="detail.type == 1">{{detail.times}}次</span>
                    <span v-else-if="detail.type == 6">{{detail.price}}元</span>
                    <span v-else-if="detail.type == 7">{{detail.hours}}小时</span>
                    <span v-else>不限制时间</span>
                </div>
                <div class="item">
                    <span>有效期</span>
                    <span v-if="detail.expire_date_on ==1">{{detail.expire_date}}天</span>
                    <span v-else>不限</span>
                </div>
            </div>
            <div class="box">
                <h3>支持课程</h3>
                <div class="item" v-for="item in binds" :key="item.id">
                    <span>{{item.course_name}}</span>
                </div>
            </div>

            <div class="box">
                <h3>适用场馆</h3>
                <div class="item">
                    <div class="ve_name">
						<span class="name_i">{{venues.name}}</span>
						<span>{{venues.adress}}</span>
					</div>
                    <div class="contact">联系场馆</div>
                </div>
            </div>
            <div class="box">
                <h3>秒杀说明</h3>
                <div class="content">
                    {{detail.des}}
                </div>
            </div>
        </div>

        <div class="detail_info" v-html="detail.content">
        </div>

        <div class="btn">
            <van-button plain hairline class="left_btn" block>我的订单</van-button>
            <van-button :disabled="detail.tempStatus==0" class="right_btn" block type="primary" @click="sSubmit" native-type="submit">
                <span v-if="detail.tempStatus==1">立即抢购</span>
                <span v-else>活动已经结束</span>
            </van-button>
        </div>

    </div>
</template>
<script>
import { getTimeStamp } from "@/utils/index";
import { cookie } from "@/utils/index";
const miaosha = require("@/api/miaosha");
const venues = require("@/api/venues");
const weixinApi = require("@/api/weixin");
const wx = require("@/assets/js/jweixin-1.6.0.js");

export default {
	data() {
		return {
			detail: {
				id: "",
				name: "",
				card_name: "",
				cover: "",
				card_cover: "",
				limit: "",
				now_price: "",
				old_price: "",
				over_time: "",
				people: "",
				price: "",
				status: "",
			},
			binds: [],
			venues: {},
			userId: cookie.get("user_id"),
		};
	},
	mounted() {
		this.fetchData();
		this.fetchVenues();
		this.executeWeixin();
	},
	methods: {
		async executeWeixin() {
			let res = await weixinApi.jssdk_config({
				url: location.href.split("#")[0],
			});
			if (res.code == 200) {
				let config = res.data;
				// 微信JSSDK异常处理
				wx.error(function (e) {
					console.log(e);
				});
				wx.config({
					...config,
					debug: false,
				});
			}
		},
		async fetchData() {
			let id = this.$route.params.id;
			let res = await miaosha.query({
				id,
			});

			if (res.code == 200) {
				this.detail = res.data;
				this.detail.content = res.data.content.replace(
					/<img/g,
					"<img style='max-width:100%; height:auto;'"
				);

				let nowTime = new Date().getTime();

				if (res.data.status == 1) {
					let time = getTimeStamp(res.data.over_time).timeStamp;
					if (nowTime > time) {
						this.detail.tempStatus = 0;
					} else {
						this.detail.tempStatus = 1;
					}
				}

				this.getListByCardId(res.data.bind_card_id);
			}
		},
		async getListByCardId(id) {
			let res = await miaosha.listByCardId({
				card_id: id,
			});
			if (res.code == 200) {
				this.binds = res.data;
			}
		},
		async fetchVenues() {
			let res = await venues.query();
			if (res.code == 200) {
				this.venues = res.data;
				console.log(this.venues)
			}
		},
		async sSubmit() {
			if (this.detail.tempStatus == 0) {
				this.$$toast("活动结束了");
				return;
			}
			let that = this;
			let openid = cookie.get("user_openid");
			let name = this.detail.name;
			let active_id = this.detail.id; // 设置活动的ID
			let card_type_id = this.detail.bind_card_id;
			let amount = this.detail.now_price;
			let member_id = this.userId;
			let pay_type = 2;
			let sell_type = 2; 
			let sell_type_name = "【线下课程】秒杀-会员卡购买";
			let times = 0;
			let expire_date = 0;
			let hours = 0;
			let card_model = this.detail.type;
			let remark = "【线下课程】微信支付购卡";
			let normal_amount = this.detail.price;

			if (this.detail.type == 1) {
				times = this.detail.times;
			} else if (this.detail.type == 7) {
				hours = this.detail.hours;
			}

			if (this.detail.expire_date_on == 1) {
				expire_date = this.detail.expire_date;
			}

			if (!openid) {
				this.$toast("请先登录");
				this.$router.push({
                    path: '/login'
                });
				return;
			}

			let res = await weixinApi.pay({
				openid: openid,
				total_fee: Math.ceil(this.detail.now_price * 100),
			});

			if (res.code == 200) {
				wx.ready(async () => {
					let data = res.data;
					let options = data.options;
					let extra = data.extra;

					options.success = async () => {
						// 支付成功后将数据插入到表中
						let result = await weixinApi.payOk({
							...extra,
							name,
							sell_type_name,
							sell_type,
							openid,
							member_id,
							active_id,
							card_type_id,
							pay_type,
							amount,
							normal_amount,
							times,
							expire_date,
							hours,
							card_model,
							remark,
						});

						if (result.code == 200) {
							that.$notify({
								message: result.msg,
								color: "#ffffff",
								background: "#00B76F",
							});
							setTimeout(() => {
								that.$router.push({
									path: "/pay/success",
								});
							}, 500);
						}
					};
					//  取消支付的操作
					options.cancel = function () {
						console.log("已经取消");
					};
					// 支付失败的处理
					options.fail = function () {
						console.log("支付失败");
					};
					// 传入参数，发起JSAPI支付
					wx.chooseWXPay(options);
				});
			} else {
				console.log(res);
			}
		},
	},
};
</script>

<style lang="less" scoped>
.btn {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 999;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	background-color: #fff;
	display: flex;
	.left_btn {
		flex: 1;
	}
	.right_btn {
		flex: 2;
	}
}
.detail_info {
	border-top: 5px solid #efefef;
	padding: 15px 15px 50px;
	box-sizing: border-box;
	img {
		max-width: 100%;
	}
}
.detail {
	padding: 15px 15px 0;
	.box {
		font-size: 14px;
		padding-bottom: 15px;
		box-sizing: border-box;
		border-bottom: 1px solid #efefef;
		margin-bottom: 15px;
		&:last-child {
			border-bottom: none;
			margin-bottom: 0;
		}
		h3 {
			color: #ff5926;
			font-size: 16px;
			padding: 0;
			margin: 0;
			margin-bottom: 10px;
		}
		.item {
			line-height: 24px;
			display: flex;
			justify-content: space-between;
			color: #333333;
			margin-bottom: 5px;
			align-items: center;
			.ve_name{
				display: flex;
				flex-direction: column;
				font-size: 12px;
				.name_i{
					color: red;
					font-weight: bold;
					font-size: 14px;
				}
			}
			.contact {
				color: #ff5926;
			}
		}
		.content {
			color: #333;
		}
	}
}

.banner {
	box-sizing: border-box;
	padding: 15px;
	font-size: 14px;
	border-bottom: 5px solid #efefef;
	text-align: center;
	.cover {
		max-width: 100%;
		margin-bottom: 15px;
		margin-left: auto;
		margin-right: auto;
	}
	.time {
		padding: 10px 0;
		text-align: center;
		background-color: rgba(255, 89, 38, 0.1);
		color: #ff5926;
	}
	h3 {
		margin: 0;
		padding: 15px 0;
		font-size: 18px;
		text-align: left;
	}
	.bot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.price {
			.now_price {
				font-size: 24px;
				color: #ff5926;
				margin-right: 10px;
			}
			.old_price {
				color: #999999;
				text-decoration: line-through;
			}
		}
		.sell {
			color: #ff5926;
		}
	}
}
</style>