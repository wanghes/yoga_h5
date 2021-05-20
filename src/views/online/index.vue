<template>
    <div class="wrap list_box">
        <div class="top">
            <div class="search">
                <img :src="search" alt="">
                <input type="text" placeholder="请输入课程名称">
            </div>
            <!-- <div class="g_btn">
                <img :src="zuan" alt="">
                <span>购买会员</span>
            </div> -->
            <div class="ma">
                <img :src="ma" alt="">
            </div>
        </div>
        <div class="swiper">
            <div class="inner">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(image) in focuses" :key="image.id">
                        <img v-lazy="image.pic" class="s_img" />
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>

        <div class="list">
            <div class="title">
                <span class="left">精品课程</span>
                <!-- <div class="btn">
                    <span>查看全部</span>
                    <span class="arrow"></span>
                </div> -->
            </div>
            <div class="box">
                <div class="item jingpin_item" v-for="item in jingpins" :key="item.id" @click="jumpDetailAlone(item.id)">
                    <img :src="item.course_cover" alt="">
                    <span>{{item.course_name}}</span>
                </div>
            </div>
        </div>
        <div class="list">
            <div class="title">
                <span class="left">系列课程</span>
                <div class="btn" @click="toSeries">
                    <span>查看全部</span>
                    <span class="arrow"></span>
                </div>
            </div>
            <div class="menu">
                <van-tabs type="card" @click="onClick">
                    <van-tab v-for="item in channels" :title="item.name" :name="item.id" :key="item.id">
                        <div class="box box_2">
                            <div class="item2" v-for="it in seriesList" :key="it.id" @click="jumpDetailSeries(it.id)">
                                <div class="left">
                                    <img :src="it.course_cover" alt="">
                                </div>
                                <div class="info">
                                    <h3 class="title">
                                        {{it.course_name}}
                                    </h3>
                                    <div class="w_b">
                                        <div class="center">
                                            <!-- <span class="cu">促</span> -->
                                            <span v-if="it.price == 0" class="price">免费</span>
                                            <span v-else class="price">￥{{it.price.toFixed(2)}}</span>
                                        </div>
                                        <div class="remo">
                                            <span>共{{it.course_num}}节课</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="more" @click="toSeries">
                                <span>点击查看更多</span>
                                <span class="arrow_down"></span>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>

        <div class="list">
            <div class="title" style="margin-bottom: 0">
                <span class="left">单课程</span>
                <div class="btn" @click="toAlones">
                    <span>查看全部</span>
                    <span class="arrow"></span>
                </div>
            </div>
            <div class="box box_2">
                <div class="item2" v-for="item in alonelist" :key="item.id"  @click="jumpDetailAlone(item.id)">
                    <div class="left">
                        <img :src="item.course_cover" alt="">
                    </div>
                    <div class="info">
                        <h3 class="title">
                            {{item.course_name}}
                        </h3>
                        <div class="w_b">
                            <div class="center">
                                <!-- <span class="cu">促</span> -->
                                <span v-if="item.pay_money == 0" class="price">免费</span>
                                <span v-else class="price">￥{{item.pay_money.toFixed(2)}}</span>
                            </div>
                            <div class="remo">
                                <span>共1节课</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="more" @click="toAlones">
                    <span>点击查看更多</span>
                    <span class="arrow_down"></span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import search from "@/assets/img/search.png";
import zuan from "@/assets/img/zuan2.png";
import ma from "@/assets/img/ma.png";
import banner from "@/assets/img/banner2.png";
import ke from "@/assets/img/ke.png";
const online = require("@/api/online");
const focus = require("@/api/focus");
export default {
	data() {
		return {
			search,
			zuan,
			ma,
			images: [banner, banner],
			ke,
            seriesList:[],
            alonelist:[],
            jingpins:[],
            focuses: [],
            channels:[
                {
					id: 0,
					name: "全部",
				},
            ],
		};
	},
    mounted() {
        this.fetchJingpin()
        this.fetchChannels();
        this.fetchSeriesData(0);
        this.fetchAlonesData();
        this.fetchPic()
    },
    methods: {
        async fetchPic() {
            let res = await focus.list({
                type: 2
            })
            if (res.code == 200) {
                this.focuses = res.data
            }
        },
        async fetchJingpin() {
            let res = await online.query_jingpin_class({
                pageSize: 2,
                page: 1
            });
            if (res.code == 200) {
                this.jingpins = res.data;
			}
        },
        async fetchAlonesData() {
            let res = await online.alones_list({
                pageSize: 6,
                page: 1
            });
		
			if (res.code == 200) {
                this.alonelist = res.data.list;
			}
        },
        async fetchSeriesData(cid) {
	    	let params = {
				pageSize: 6,
				page: 1,
			};
			params.cid = cid;

			let res = await online.series_list(params);
			if (res.code == 200) {
				this.seriesList = res.data.list;
                console.log(this.seriesList)
			}
		},
        async fetchChannels() {
			let res = await online.series_channels({});
			if (res.code == 200) {
				this.channels = this.channels.concat(res.data);
			}
		},
        toSeries() {
            this.$router.push({
                path: "/online/series"
            })
        },
        toAlones() {
            this.$router.push({
                path: "/online/alones"
            })
        },
        onClick(name, title) {
            this.seriesList = [];
            this.fetchSeriesData(name);
        },
        jumpDetailSeries(id) {
            this.$router.push({
                path: `/online/series_detail/${id}`
            })
        },
        jumpDetailAlone(id) {
            this.$router.push({
                path: `/online/alones_detail/${id}`
            })
        }
    },
};
</script>
            
<style>
.list_box .van-tabs__nav--card {
	margin: 0;
}
.list_box .van-tabs__nav--card .van-tab.van-tab--active {
	color: #fff;
	background-color: #ff5927;
}
.list_box .van-tabs__nav--card {
	border: none;
}
.list_box .van-tabs__nav--card .van-tab {
	background-color: #f5f5f5;
	color: #545454;
	border: none;
	margin-right: 5px;
	font-size:14px;
	border-radius: 3px;
}
.list_box .van-tabs__nav--complete {
	padding: 0;
}
</style>            

<style lang="less" scoped>
.top {
	display: flex;
	padding: 30px 15px 15px;
	.search {
		border: 1px solid #ccc;
		display: flex;
		flex: 1;
		height: 38px;
		border-radius: 20px;
		padding: 0 10px;
		align-items: center;
		margin-right: 10px;
		img {
			width: 15px;
			height: 15px;
			margin-right: 5px;
		}
		input {
			border: none;
			width: 100px;
			flex: 1;
			height: 24px;
		}
	}
	.g_btn {
		height: 40px;
		width: 120px;
		background: linear-gradient(169deg, #e7cba3, #c69f65);
		border-radius: 33px;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 15px;
			height: 14px;
			margin-right: 5px;
		}
		color: #67340b;
		margin: 0 10px;
	}
	.ma {
		height: 40px;
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		background: #f5f5f5;
		img {
			width: 20px;
			height: 20px;
		}
	}
}
.swiper {
	width: 100%;
	padding: 0px 15px;
	box-sizing: border-box;
	.inner {
		width: 100%;
		.s_img {
			width: 100%;
		}
	}
}

.list {
	display: flex;
	flex-direction: column;
	padding: 15px 15px 0;
	box-sizing: border-box;
	&:last-child{
		.box{
			border-bottom: none;
		}
	}
	.title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
		.left {
			font-size: 18px;
			color: #000;
			font-weight: bold;
		}
		.btn {
			color: #999;
			display: flex;
			font-size: 12px;
			align-items: center;
			justify-content: center;
			padding: 5px 15px;
			border: 1px solid #ccc;
			border-radius: 15px;
			.arrow {
				display: inline-block;
				margin-left: 3px;
				width: 5px;
				height: 5px;
				border-top: 1px solid #ccc;
				border-right: 1px solid #ccc;
				transform: rotate(45deg);
			}
		}
	}
	.box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		border-bottom: 3px solid #efefef;
		padding-bottom: 20px;
		.item {
			width: 100%;
			flex: 1;
			font-size: 14px;
			img {
				width: 100%;
			}
			&:first-child {
				margin-right: 15px;
			}
			span {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				margin: 5px 0;
				box-sizing: border-box;
			}
		}
        .jingpin_item{
            img {
				width: 100%;
                
			}
        }
	}
	.box_2 {
		padding-top: 20px;
		flex-direction: column;
		.more {
			color: #999;
			text-align: center;
			font-size: 12px;
            padding-top: 10px;
		}
		.arrow_down {
			display: inline-block;
			position: relative;
			top: -3px;
			margin-left: 10px;
			width: 5px;
			height: 5px;
			border-bottom: 1px solid #999;
			border-right: 1px solid #999;
			transform: rotate(45deg);
		}
		.item2 {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-bottom: 15px;
			.left {
				width: 130px;
				padding-right: 10px;
				box-sizing: border-box;
				img {
					width: 120px;
					border-radius: 3px;
				}
			}
			.info {
				display: flex;
				flex-direction: column;
				font-size: 12px;
                flex: 1;
				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 14px;
					line-height: 18px;
                    height: 36px;
					color: #000;
					margin: 0;
					margin-bottom: 6px;
				}
				.w_b {
					color: #999;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.cu {
					background-color: #ff5927;
					color: #fff;
					padding: 3px;
					width: 18px;
					height: 18px;
					border-radius: 50%;
					text-align: center;
					display: inline-block;
					margin-right: 5px;
				}
				.price {
					color: #ff5927;
					font-weight: bold;
				}
			}
		}
	}
}
</style>