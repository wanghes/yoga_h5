<template>
    <div class="wrap detail_box">
        <div class="top">
            <img class="theme" :src="detail.course_cover" alt="">
            <!--
            <div class="bot_info">
                <div class="left">
                    <span class="mianfei" v-if="detail.pay_money == 0">免费</span>
                    <span v-else><i class="bi">￥</i>{{detail.pay_money}}</span>
                </div>
                <div class="right">
                    <span>限时特价</span>
                </div>
            </div>
			-->
            <div class="title">
                <span>{{detail.course_name}}</span>
            </div>
            <div class="t_info">
                <span>
                    <van-icon name="points" />
                    <span>共1节课</span>
                </span>
                <span>
                    <van-icon name="replay" />
                    <span>支持重播</span>
                </span>
            </div>
        </div>
        <div class="content">
            <van-tabs v-model="activeName">
                <van-tab title="课程介绍" name="a">
                    <div v-html="detail.course_content"></div>
                </van-tab>
                <van-tab title="用户评价" name="b">
                </van-tab>
            </van-tabs>
        </div>

        <div class="btn" v-if="buyQueryStatus && !buyStatus">
            <van-button block type="info" @click="sSubmit" native-type="submit">
				<img :src="huo" class="huo" alt="">
                <span>立即抢购</span>
                <span class="money" v-if="detail.pay_money == 0">免费</span>
                <span class="money" v-else><em class="bi">￥</em>{{detail.pay_money.toFixed(2)}}</span>
            </van-button>
        </div>
		<div class="btn" v-else>
			<van-button block type="info" @click="gotoClass" native-type="submit">
				<span>进入课程</span>
			</van-button>
		</div>
    </div>
</template>
<script>
import ke from "@/assets/img/img.png";
import huo from "@/assets/img/huo.png";
import { cookie } from "@/utils/index";
const online = require("@/api/online");
const weixinApi = require("@/api/weixin");
const wx = require("@/assets/js/jweixin-1.6.0.js");


export default {
	data() {
		return {
			ke,
			huo,
			detail: {
				pay_money: 0,
			},
			hideBtn: false,
			activeName: "a",
			userId: cookie.get("user_id"),
            buyStatus: false,
            buyQueryStatus: false
		};
	},
	mounted() {
		let id = this.$route.params.id;
		if (!id) {
			this.$toast("参数缺失");
			return;
		}

		this.fetchData(id);
		this.executeWeixin();
	},
	methods: {
		async queryBuyStatus() {
            let course_id = this.detail.id;
            let member_id = this.userId;

            
            let res = await online.query_alone_buy_status({
                course_id,
                member_id
            });
            if (res.code == 200) {
                this.buyStatus = res.data;
                this.buyQueryStatus = true;
            }
        },

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
		async fetchData(id) {
			let res = await online.query_alone_detail({
				id,
			});

			if (res.code == 200) {
				this.detail = res.data;
				this.queryBuyStatus(); 
			}
		},
		gotoClass(){
            let id = this.detail.id;
            if (!id) {
                this.$toast("id参数缺失");
                return;
            }
            this.$router.push({
                path: `/online/video/${id}`,
                query: {
                    type: 1
                }
            })
        },
		async sSubmit() {
			let that = this;
			let openid = cookie.get('user_openid');
			let name = this.detail.course_name;
			let course_id = this.detail.id;
			let member_id = this.userId;
			let pay_type = 1; // 1是微信支付
			let sell_type_name = "【线上课程】购买线上课程-单课";
	
			let remark = `【线上课程】购买课程-${this.detail.course_name}`;

			let amount = this.detail.pay_money;

			if (!openid) {
				this.$toast("请先登录");
                this.$router.push({
                    path: '/login'
                })
				return;
			}

			// 免费的情况
			if (amount == 0) {
				let res = await weixinApi.pay_free_online_Ok({
					name,
					course_type: 1, // 1是单课，2是系列课
					course_id,
					member_id,
					amount,
					remark
				});

				if (res.code == 200) {
					that.$notify({
						message: res.msg,
						color: "#ffffff",
						background: "#00B76F"
					});
					that.fetchData(course_id);
				}
				return;
			}

			let res = await weixinApi.pay({
				openid: openid,
				total_fee: Math.ceil(amount * 100)
			});

			if (res.code == 200) {
				wx.ready(async () => {
					let data = res.data; 
					let options = data.options;
					let extra = data.extra;

					options.success = async () => {
						// 支付成功后将数据插入到表中
						let result = await weixinApi.pay_online_Ok({
							...extra,
							name,
                            course_type: 1, // 1是单课， 2是系列课
                            course_id,
							sell_type_name,
							openid,
							member_id,
							pay_type,
							amount,
							remark
						});
                       
						if (result.code == 200) {
							that.$notify({
								message: result.msg,
							    color: "#ffffff",
							    background: "#00B76F"
							});
							that.fetchData(course_id);
						}
					};
					
					//  取消支付的操作
					options.cancel = function () {
						console.log("已经取消")
					};
					// 支付失败的处理 
					options.fail = function () {
						console.log("支付失败")
					};
					// 传入参数，发起JSAPI支付
					wx.chooseWXPay(options);

				})
			} else {
				console.log(res);
			}
		},
	},
};
</script>
<style>
.detail_box .van-tabs--line .van-tabs__wrap {
	border-bottom: 1px solid #efefef;
}
.detail_box .van-tabs__line {
	background-color: #ff5927;
}
.detail_box .van-cell {
	padding: 15px;
}
.detail_box .van-tab__pane {
	padding: 15px 0;
}
.detail_box .van-tab__pane img {
	max-width: 100%;
}
.detail_box .van-button--info {
	background-color: #ff5926;
	border: 1px solid #ff5926;
}
.detail_box .van-button--normal{
	font-size: 18px;
	font-weight: bold;
}
.detail_box .van-button__text{
	display: flex;
	align-items: flex-end;
}
</style>   

<style lang="less" scoped>
.top {
	border-bottom: 5px solid #efefef;
	padding-bottom: 10px;
	.theme {
		max-width: 100%;
		display: block;
		margin: 0 auto;
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
			font-size: 30px;
			font-weight: bold;
			line-height: 50px;
			.bi {
				font-size: 14px;
				font-style: normal;
			}
			.mianfei {
				font-size: 20px;
			}
		}
		.right {
			flex: 1;
			color: #fff;
			height: 0;
			font-size: 20px;
			font-weight: bold;
			line-height: 50px;
			text-align: center;
			border-bottom: 50px solid #ff5926;
			border-left: 20px solid transparent;
		}
	}
	.title {
		padding: 15px;
		font-size: 16px;
		line-height: 24px;
		box-sizing: border-box;
		height: 60px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.t_info {
		padding: 0 15px;
		height: 30px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #999;
		font-size: 14px;
		span {
			display: flex;
			align-items: center;
			i {
				margin-right: 5px;
			}
		}
	}
}
.content {
	padding: 0 15px;
}
.btn {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	font-size: 16px;
	z-index: 999;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	background-color: #fff;
	.huo{
		display: inline-block;
		width: 18px;
		height: 22px;
		margin-right: 5px;
		vertical-align: middle;
	}
	.money{
		display: inline-block;
		color:#fff;
		margin-left: 5px;
		font-size: 12px;
		font-weight: normal;
		em{
			font-style: normal;
		}
	}
}

</style>