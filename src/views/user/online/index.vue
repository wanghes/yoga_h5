<template>
    <div class="wrap online_list_box">
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
            <div class="box jingpin_box" v-if="jingpins.length > 0">
                <div class="item jingpin_item" v-for="item in jingpins" :key="item.id" @click="jumpDetailSeries(item.id)">
                    <van-image fit="cover" :src="item.course_cover"></van-image>
                    <span>{{item.course_name}}</span>
                </div>
            </div>
            <div class="box" v-else>
                <van-empty description="还没有数据" />
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
                        <div class="box box_2" v-if="seriesList.length > 0">
                            <div class="item2" v-for="it in seriesList" :key="it.id" @click="jumpDetailSeries(it.id)">
                                <div class="left">
                                    <van-image fit="cover" :src="it.course_cover"></van-image>
                                </div>
                                <div class="info">
                                    <h3 class="title">
                                        {{it.course_name}}
                                    </h3>
                                    <div class="center">
                                        <span v-if="it.pay_type == 1 && it.cu_status" class="cu">促</span>
                                        <span v-if="it.pay_type == 1 && it.cu_status" class="price">
                                            <em>￥{{it.cu_price.toFixed(2)}}</em>
                                        </span>
                                        <span v-if="it.price == 0" class="price">免费</span>
                                        <span v-else class="price">
                                            <del class='del_price' v-if="it.pay_type == 1 && it.cu_status">￥{{it.price.toFixed(2)}}</del>
                                            <em v-else-if="it.pay_type == 1">￥{{it.price.toFixed(2)}}</em>
                                            <em v-else-if="it.pay_type == 2">￥{{it.price.toFixed(2)}}/天</em>
                                            <em v-else-if="it.pay_type == 3">￥{{it.price.toFixed(2)}}/月</em>
                                            <em v-else>￥{{it.price.toFixed(2)}}/年</em>
                                        </span>
                                    </div>
                                    <div class="remo">
                                        <span>已开课{{it.has_count}}节/共{{it.course_num}}节课</span>
                                    </div>
                                </div>
                            </div>

                            <div class="more" @click="toSeries">
                                <span>点击查看更多</span>
                                <span class="arrow_down"></span>
                            </div>

                        </div>
                        <div class="box box_2" v-else>
                            <van-empty description="还没有数据" />
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
            <div class="box box_2" v-if="alonelist.length > 0">
                <div class="item2" v-for="item in alonelist" :key="item.id" @click="jumpDetailAlone(item.id)">
                    <div class="left">
                        <van-image fit="cover" :src="item.course_cover"></van-image>
                    </div>
                    <div class="info">
                        <h3 class="title">
                            {{item.course_name}}
                        </h3>
                        <div class="center">
                            <span v-if="item.pay_money == 0" class="price mian_price">免费</span>
                            <span v-else class="price">￥{{item.pay_money.toFixed(2)}}</span>
                        </div>
                        <div class="remo">
                            <span>{{item.create_time}}</span>
                        </div>
                    </div>
                </div>
                <div class="more" @click="toAlones">
                    <span>点击查看更多</span>
                    <span class="arrow_down"></span>
                </div>
            </div>
            <div class="box box_2" v-else>
                <van-empty description="还没有数据" />
            </div>
        </div>

    </div>
</template>
<script>
import search from "@/assets/img/search.png";
import zuan from "@/assets/img/zuan2.png";
import ma from "@/assets/img/ma.png";
const online = require("@/api/online");
const focus = require("@/api/focus");
export default {
	data() {
		return {
			search,
			zuan,
			ma,
			seriesList: [],
			alonelist: [],
			jingpins: [],
			focuses: [],
			channels: [
				{
					id: 0,
					name: "全部",
				},
			],
		};
	},
	mounted() {
		this.fetchJingpin();
		this.fetchChannels();
		this.fetchSeriesData(0);
		this.fetchAlonesData();
		this.fetchPic();
	},
	methods: {
		async fetchPic() {
			let res = await focus.list({
				type: 2,
			});
			if (res.code == 200) {
				this.focuses = res.data;
			}
		},
		async fetchJingpin() {
			let res = await online.query_jingpin_series_class({
				pageSize: 10,
				page: 1,
			});
			if (res.code == 200) {
				this.jingpins = res.data;
			}
		},
		async fetchAlonesData() {
			let res = await online.alones_list({
				pageSize: 6,
				page: 1,
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
				path: "/online/series",
			});
		},
		toAlones() {
			this.$router.push({
				path: "/online/alones",
			});
		},
		onClick(name, title) {
			this.seriesList = [];
			this.fetchSeriesData(name);
		},
		jumpDetailSeries(id) {
			this.$router.push({
				path: `/online/series_detail/${id}`,
			});
		},
		jumpDetailAlone(id) {
			this.$router.push({
				path: `/online/alones_detail/${id}`,
			});
		},
	},
};
</script>
                      
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
	&:last-child {
		.box {
			border-bottom: none;
		}
	}
	.title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
		.left {
			font-size: 20px;
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
		justify-content: flex-start;
		border-bottom: 3px solid #efefef;
		padding-bottom: 20px;
		.item {
			width: 150px;
			font-size: 14px;
			margin-right: 10px;
			.van-image {
				width: 150px;
				height: 90px;
			}
			span {
				width: 150px;
				overflow: hidden;
				white-space: normal;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin: 5px 0;
			}
		}
		&.jingpin_box {
			width: 100%;
			overflow-x: scroll;
			overflow-y: hidden;
			white-space: nowrap;
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
			align-items: flex-start;
			padding-bottom: 15px;
			.left {
				width: 150px;
				padding-right: 10px;
				box-sizing: border-box;
				.van-image {
					width: 140px;
					height: 90px;
				}
			}
			.info {
				display: flex;
				flex-direction: column;
				height: 90px;
				font-size: 12px;
				justify-content: space-between;
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
					color: #000;
					margin: 0;
					margin-bottom: 6px;
				}

				.center {
					display: flex;
					align-items: center;
				}
				.cu {
					background-color: #ff5927;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					padding: 3px;
					font-size: 12px;
					width: 14px;
					height: 14px;
					border-radius: 50%;
					margin-right: 5px;
				}
				.price {
					color: #ff5927;
					font-weight: bold;
					em {
						font-style: normal;
					}
					.del_price {
						color: #999;
						margin-left: 10px;
					}
				}
				.mian_price {
					color: #0bcfb1;
				}
				.remo {
					color: #999;
				}
			}
		}
	}
}
</style>