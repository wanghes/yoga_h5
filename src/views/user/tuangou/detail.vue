<template>
    <div class="wrap tuangou_detail">
        <div class="top">
            <div class="cover">
                <van-image width="106%" fit="contain" :src="detail.cover" />
            </div>
            <div class="m_info">
                <div class="left">
                    <div class="left_top">
                        <div class="shou"><img :src="shou" alt=""></div>
                        <em>超值拼团</em>
                    </div>
                    <div class="left_bot">
                        <div class="title">{{detail.name}}</div>
                    </div>
                </div>
                <div class="right">
                    <div class="share" @click="shareAction">
                        <img :src="share" alt="">
                    </div>
                </div>
            </div>
            <div class="second_title">
                {{detail.intro}}
            </div>
            <div class="bot">
                <div class="price">
                    <span class="now_price">拼团价:￥{{detail.now_price}}</span>
                    <span class="old_price">原价:￥{{detail.old_price}}</span>
                </div>
                <div class="sell">已拼 {{detail.people}} 个</div>
            </div>
        </div>

        <div class="detail">
            <div class="box">
                <h3>团购卡详情</h3>
                <div class="item">
                    <span>卡名称</span>
                    <span>{{detail.card_name}}</span>
                </div>
                <div class="item">
                    <span>余额</span>
                    <span v-if="detail.type == 1">{{detail.times}}次</span>
                    <span v-else-if="detail.type == 6">{{detail.old_price}}元</span>
                    <span v-else-if="detail.type == 7">{{detail.hours}}小时</span>
                    <span v-else>不限制时间</span>
                </div>
                <div class="item">
                    <span>有效期</span>
                    <span v-if="detail.expire_date_on ==1">{{detail.expire_date}}天</span>
                    <span v-else>不限</span>
                </div>
                <div class="item">
                    <span>定价</span>
                    <span>{{detail.price}}元</span>
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
                    <div>{{venues.name}}</div>
                    <div class="contact">联系场馆</div>
                </div>
            </div>
            <div class="box">
                <h3>活动信息</h3>
                <div class="content">
                    {{detail.des}}
                </div>
            </div>
            <div class="box">
                <h3>场馆环境</h3>
                <div class="content" v-html="venues.des"></div>
            </div>
        </div>
        <div class="detail_info"></div>
        <div class="btn">
            <van-button :disabled="detail.status==0" class="right_btn" block type="info" @click="sSubmit" native-type="submit">
                <span v-if="detail.status==1">立即抢购</span>
                <span v-else>活动已经结束</span>
            </van-button>
        </div>
        <van-popup v-model="show" closeable position="bottom" :style="{ height: '100%' }">
            <img class="share_img_im" :src="targetImage" alt="">
        </van-popup>

        <div class="tan_box" id="imgBox" style="display:none">
            <div class="head">
                <img :src="head" alt="">
                <span class="user_name">{{name}}</span>
            </div>
            <img class="share_img" :src="detail.share_img+'?'+new Date().getTime()" crossOrigin="anonymous" alt="">
        </div>
    </div>
</template>
<script>
import shou from "@/assets/img/shou.png";
import share from "@/assets/img/share_2.png";
import html2canvas from "html2canvas";
import { cookie } from "@/utils/index";
const tuangou = require("@/api/tuangou");
const venues = require("@/api/venues");
const weixinApi = require("@/api/weixin");
const wx = require("@/assets/js/jweixin-1.6.0.js");

export default {
	data() {
		return {
			shou,
			share,
			detail: {},
			binds: [],
			head: cookie.get("user_head") || "",
			name: cookie.get("user_name") || "",
			venues: {},
			show: false,
			targetImage: "",
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
			let res = await tuangou.query({
				id,
			});

			if (res.code == 200) {
				res.data.share_img = res.data.share_img;
				this.detail = res.data;
				console.log(this.detail);
				this.getListByCardId(res.data.bind_card_id);
			}
		},
		async getListByCardId(id) {
			let res = await tuangou.listByCardId({
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
				this.venues.des = res.data.des.replace(
					/<img/g,
					"<img style='max-width:100%; height:auto;'"
				);
			}
		},
		shareAction() {
			var targetDom = document.querySelector("#imgBox");
			targetDom.style.display = "block";
			window.scrollTo(0, 0);
			html2canvas(targetDom, { useCORS: true }).then(canvas => {
				this.show = true;
				this.targetImage = canvas.toDataURL();
				targetDom.style.display = "none";
			});
		},
		async sSubmit() {
			let that = this;
			let openid = cookie.get("user_openid");
			let name = this.detail.name;
			let card_type_id = this.detail.bind_card_id;
			let active_id = this.detail.id;
			let member_id = this.userId;
			let pay_type = 2;
			let sell_type = 3;
			let sell_type_name = "【线下课程】团购-会员卡购买";
			let times = 0;
			let expire_date = 0;
			let hours = 0;
			let card_model = this.detail.type;
			let remark = "【线下课程】微信支付购卡";
			let normal_amount = this.detail.price;
			let amount = this.detail.now_price;

			if (this.detail.type == 1) {
				times = this.detail.times;
			} else if (this.detail.type == 7) {
				hours = this.detail.hours;
			}

			if (this.detail.expire_date_on == 1) {
				expire_date = this.detail.expire_date;
			}

			if (!openid) {
				this.$toast("获取用户信息失败");
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
							active_id,
							member_id,
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
<style>
.tuangou_detail .van-button--info {
	background-color: #ff5926;
	border: 1px solid #ff5926;
}
</style>
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
}
.top {
	border-bottom: 5px solid #efefef;
	.cover {
		width: 100%;
		font-size: 0;
		display: flex;
		justify-content: center;
	}
	.bot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px 15px;
		.price {
			display: flex;
			align-items: center;
			.now_price {
				font-size: 20px;
				color: #ff5926;
				margin-right: 10px;
			}
			.old_price {
				font-size: 14px;
				color: #999999;
				text-decoration: line-through;
			}
		}
		.sell {
			font-size: 14px;
			color: #ff5926;
		}
	}
	.second_title {
		padding: 15px;
		box-sizing: border-box;
		font-size: 14px;
		color: #666666;
	}
	.m_info {
		display: flex;
		justify-content: space-between;
		background-color: #ff5926;
		align-items: center;
		padding: 8px 15px;
		.left {
			.left_top {
				display: flex;
				color: #fff;
				align-items: center;
				font-size: 14px;
				.shou {
					width: 30px;
					height: 30px;
					display: flex;
					background-color: #ff5926;
					align-items: center;
					justify-content: center;
					img {
						width: 18px;
						height: 18px;
					}
				}
			}
			.left_bot {
				font-size: 18px;
				color: #fff;
				.title {
					font-weight: bold;
				}
			}
		}
		.right {
			.share {
				width: 40px;
				height: 40px;
				background-color: #fff;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					width: 24px;
					height: 24px;
				}
			}
		}
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
			.contact {
				color: #ff5926;
			}
		}
		.content {
			img {
				max-width: 100%;
			}
		}
	}
}
.detail_info {
	padding-bottom: 50px;
}
.tan_box {
	position: relative;
	width: 100%;
	height: 100vh;
	text-align: center;
	.head {
		position: absolute;
		left: 15px;
		z-index: 10;
		top: 15px;
		img {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			vertical-align: middle;
			margin-right: 10px;
		}
	}
	.share_img {
		position: absolute;
		left: 0;
		top: 0;
		max-width: 100%;
	}
}
.share_img_im {
	max-width: 100%;
}
</style>