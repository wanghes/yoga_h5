<template>
    <div class="wrap card_detail">
        <div class="top">
            <div class="cover">
                <img :src="detail.cover" alt="">
            </div>
            <div class="bot">
                <div class="left">
                    <em>￥</em>
                    <span>{{detail.price && detail.price.toFixed(2)}}</span>
                    <i>{{detail.name}}</i>
                </div>
                <div class="right">
                    <div class="share">
                        <img :src="share" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="detail">
            <div class="box">
                <h3>会员卡详情</h3>
                <div class="item">
                    <span>卡项名称</span>
                    <span>{{detail.name}}</span>
                </div>
                <div class="item">
                    <span>卡项类型</span>
                    <span v-if="detail.type == 1">次卡</span>
                    <span v-if="detail.type == 2">年卡</span>
                    <span v-if="detail.type == 3">季卡</span>
                    <span v-if="detail.type == 4">月卡</span>
                    <span v-if="detail.type == 5">周卡</span>
                    <span v-if="detail.type == 6">储值卡</span>
                    <span v-if="detail.type == 7">小时卡</span>
                </div>
                <div class="item">
                    <span>有效期</span>
                    <span v-if="detail.expire_date_on == 1">{{detail.expire_date}}天</span>
                    <span v-else>不限</span>
                </div>
                <div class="item">
                    <span>每人限购</span>
                    <span>1张</span>
                </div>
                <div class="item">
                    <span>激活方式</span>
                    <span>手动激活</span>
                </div>
                <div class="item">
                    <span>卡内可用</span>
                    <span v-if="detail.type == 1">{{detail.times}}次</span>
                    <span v-else-if="detail.type == 6">{{detail.price}}元</span>
                    <span v-else-if="detail.type == 7">{{detail.hours}}小时</span>
                    <span v-else>{{detail.expire_date}}天</span>
                </div>
            </div>
            <div class="box">
                <h3>支持课程</h3>
                <div class="item" v-for="item in bindCourses" :key="item.id">
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
                <h3>场馆环境</h3>
                <div class="content" v-html="venues.des"></div>
            </div>
        </div>

        <div class="btn">
            <div class="left_btn">
                <span class="fuhao">￥</span>
                <span class="money">{{detail.price && detail.price.toFixed(2)}}</span>
            </div>
            <van-button class="right_btn" block type="info" @click="sSubmit" native-type="submit">立即抢购</van-button>
        </div>

    </div>
</template>
<script>
import share from "@/assets/img/share_2.png";
const cards = require("@/api/card");
const venues = require("@/api/venues");
export default {
	data() {
		return {
			share,
			detail: {},
			venues: {},
			bindCourses: [],
		};
	},
	mounted() {
		this.fetchData();
		this.fetchVenues();
	},
	methods: {
		async fetchData() {
			const id = this.$route.params.id;
			let res = await cards.query({
				id,
			});

			if (res.code == 200) {
				let { detail, bindCourses } = res.data;
				this.detail = detail;
				this.bindCourses = bindCourses;
			}
		},
		async fetchVenues() {
			let res = await venues.query();
			if (res.code == 200) {
				this.venues = res.data;
                this.venues.des = res.data.des.replace(/<img/g,"<img style='max-width:100%; height:auto;'");
			}
		},
		async sSubmit() {
			this.$notify({
				message: "功能开发中",
                color: "#ffffff",
                background: "#FF5926"
			});
		},
	},
};
</script>
<style>
.card_detail .van-button--info {
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
	.left_btn {
		flex: 1;
		background-color: rgba(255, 89, 38, 0.2);
		color: #ff5926;
		font-weight: normal;
		font-size: 22px;
		display: flex;
		align-items: center;
		justify-content: center;
		.fuhao {
			font-size: 14px;
		}
	}
	.right_btn {
		flex: 1;
	}
}
.top {
	.cover {
		padding: 15px;
		box-sizing: border-box;
		font-size: 0;
		img {
			width: 100%;
		}
	}
	.bot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ff5926;
		color: #fff;
		padding: 8px 15px;
		.left {
			display: flex;
			align-items: flex-end;
			em {
				font-size: 14px;
				font-style: normal;
			}
			span {
				font-size: 26px;
				font-weight: bold;
				margin-right: 10px;
			}
			i {
				font-style: normal;
				font-size: 14px;
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
	padding: 15px 15px 50px;
	.box {
		font-size: 14px;
		padding-bottom: 15px;
		box-sizing: border-box;
		border-bottom: 1px solid #efefef;
		margin-bottom: 15px;
        &:last-child{
            border-bottom: none;
            margin-bottom: 0;
        }
		h3 {
			color: #000;
			font-size: 16px;
			font-weight: bold;
			padding: 0;
			margin: 0;
			margin-bottom: 10px;
		}
		.item {
			line-height: 24px;
			display: flex;
			justify-content: space-between;
			color: #333;
            margin-bottom: 5px;
			.contact {
				color: #ff5926;
			}
		}
        .content{
            color:#666;
            img{
                max-width: 100%;
            }
        }
	}
}
</style>