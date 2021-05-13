<template>
    <div class="wrap detail_box">
        <div class="top">
            <img class="theme" :src="detail.course_cover" alt="">
            <div class="bot_info">
                <div class="left">
                    <span class="mianfei" v-if="detail.pay_money == 0">免费</span>
                    <span v-else><i class="bi">￥</i>{{detail.pay_money}}</span>
                </div>
                <div class="right">
                    <span>限时特价</span>
                </div>
            </div>
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
            <van-tabs v-model="activeName" @click="onClick">
                <van-tab title="课程介绍" name="a">
                    <div v-html="detail.course_content"></div>
                </van-tab>
                <van-tab title="用户评价" name="b">
                </van-tab>
            </van-tabs>
        </div>

         <div class="btn" v-if="detail.pay_money != 0">
            <van-button block type="info" @click="sSubmit" native-type="submit">立即抢购</van-button>
        </div>
    </div>
</template>
<script>
import ke from "@/assets/img/img.png";
const online = require("@/api/online");
export default {
	data() {
		return {
			ke,
			detail: {
                pay_money: 0
            },
			hideBtn: false,
            activeName: "a"
		};
	},
	mounted() {
        let id = this.$route.params.id;
        
        if (!id) {
            this.$toast("参数缺失");
            return;
        }
        
		this.fetchData(id);
	},
	methods: {
		async fetchData(id) {
            let res = await online.query_alone_detail({
                id
            });
           
            if (res.code == 200) {
                this.detail = res.data;
            }
        },
        onClick(name, title){
            // this.$toast(name)
        },
		async queryIfOrder() {

		},
        async sSubmit() {
			let id = this.$route.params.id;
			let res = await online.alone_buy({
				course_id: id
			});
			
			if(res.code == 200) {
				this.$notify({
					type: "success",
					message: res.msg
				});
				this.hideBtn = true;
			}

        }
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
.detail_box .van-cell{
    padding: 15px;
}
.detail_box .van-tab__pane{
    padding: 15px 0;
}
.detail_box .van-tab__pane img{
    max-width: 100%;
}
.detail_box .van-button--info{
    background-color: #FF5926;
    border: 1px solid #FF5926;
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
            .mianfei{
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
.content{
    padding: 0 15px;
}
.btn{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
}
</style>