<template>
    <div class="wrap detail_box">
        <div class="top">
            <img class="theme" :src="detail.course_cover" alt="">
            <div class="bot_info">
                <div class="left">
                    <span v-if="detail.price == 0">免费</span>
                    <span v-else><i class="bi">￥</i>{{detail.price && detail.price.toFixed(2)}}</span>
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
                    <span>共{{detail.course_num}}节课</span>
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
                <van-tab title="课程目录" name="b">
                    <h3 class="class_title">
                        <span>课程列表</span>
                        <span>共有{{detail.course_num}}节课</span>
                    </h3>
                    <div class="class_list">
                        <div class="item" v-for="(item, index) in list" :key="item.id">
                            <div class="item_top">
                                <div class="first">
                                    <span v-if="index<10">{{'0'+(index+1)}}、</span>
                                    <span v-else>{{index+1}}、</span>
                                    <span class="text">{{item.course_name}}</span>
                                </div>
                                <!-- <span class="status">已完课</span> -->
                            </div>
                            <div class="bot">
                                <span>{{item.create_time && item.create_time.slice(0, 10)}}</span>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="用户评价" name="c">
                    
                </van-tab>
            </van-tabs>

            <div class="btn">
                <van-button block type="info" @click="sSubmit" native-type="submit">立即抢购</van-button>
            </div>
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
			detail: {},
            list:[],
            activeName: "a",
            list:[0,1,2,5,5,6,4,54,5,34]
		};
	},
	mounted() {
        let id = this.$route.params.id;
        
        if (!id) {
            this.$toast("参数缺失");
            return;
        }
		this.fetchData(id);
        this.getSeriesListItem(id);
	},
	methods: {
		async fetchData(id) {
            let res = await online.query_series_detail({
                id
            });
           
            if (res.code == 200) {
                this.detail = res.data;   
            }
        },
       async getSeriesListItem(id) {
            let res = await online.query_series_by_pid({
                pid: id
            });
           
            if (res.code == 200) {
                this.list = res.data;
            }
        },
        onClick(name, title){
            // this.$toast(name)
        },
        sSubmit() {
            
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
.class_list{
    padding-top: 10px;
    .item{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #efefef;
        padding-bottom: 8px;
        padding-top: 10px;
        .item_top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .first{
                display: flex;
                span{
                    font-size: 14px;
                    &:first-child{
                        width:24px;
                        
                    }
                }
            }
            .status{
                font-size: 12px;
                width:100px;
                text-align: center;
            }
            
            .text{
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
        .bot{
            padding-top: 10px;
            font-size: 12px;
            padding-left: 24px;
            span{
                color:#999;
            }
        }
    }
}
.top {
	border-bottom: 5px solid #efefef;
	padding-bottom: 10px;
	.theme {
		max-width: 100%;
		display: block;
        margin:0 auto;
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
    padding: 0 15px 40px 15px;
    .class_title{
        display: flex;
        justify-content: space-between;
        height: 20px;
        width:100%;
        align-items: center;
        margin: 0;
        font-size: 14px;
        color: #000;

        span:last-child{
            color:#999;
            font-size: 12px;
        }
    }
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