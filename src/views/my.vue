<template>
    <div class="wrap">
        <div class='top_info'>
            <div class="user">
                <img @click="toPerson" class="avatar" v-if="user.head" :src="user.head" alt="">
                <img @click="toPerson" class="avatar" v-else :src="head" alt="">
                <span @click="toPerson">{{user.name}}</span>
                <span class="tuichu" @click="logout">退出</span>
            </div>
            <div class="f_in">
                <div class="item">
                    <span class="num">{{user.member_card_count}}</span>
                    <span>瑜伽卡</span>
                </div>
                <div class="item">
                    <span class="num">{{user_tiyan_num}}</span>
                    <span>体验课</span>
                </div>
                <!--
                <div class="item">
                    <span class="num">0</span>
                    <span>优惠券（张）</span>
                </div>
                -->
            </div>
            <div class="card" v-if="my_cards.length && !!mainCard">
                <div class='inner' @click="lookCards">
                    <div class="left">
                        <img :src="zuan" alt="">
                        <span v-if="mainCard.type == 1">次卡</span>
                        <span v-else-if="mainCard.type ==2">年卡</span>
                        <span v-else-if="mainCard.type ==3">季卡</span>
                        <span v-else-if="mainCard.type ==4">月卡</span>
                        <span v-else-if="mainCard.type ==5">周卡</span>
                        <span v-else-if="mainCard.type ==6">储值卡</span>
                        <span v-else-if="mainCard.type ==7">小时卡</span>
                    </div>
                    <div class="right">
                        <span>卡余额</span>
                        <strong>{{mainCard.leave}}</strong>
                        <img :src="arrow" alt="">
                    </div>
                </div>
            </div>
            <div v-else-if="!my_cards.length" class="info_empty">
                <div class="str">您还没有办卡？ 联系我们的客服办卡吧</div>
            </div>
            <div v-else-if="my_cards.length && !mainCard" class="info_empty">
                <div class="str">还没有设置主卡</div>
            </div>
            <div v-else class="info_empty">
                <div class="str">您还没有办卡？ 联系我们的客服办卡吧</div>
            </div>
        </div>
        <div class="btns">
            <div class="btn" @click="jump(1)">
                <img :src="my_01" alt="">
                <div class="info">
                    <span>我的课程</span>
                    <i>MY COURSES</i>
                </div>
            </div>
            <div class="btn" @click="jump(2)">
                <img :src="my_01" alt="">
                <div class="info">
                    <span>申请请假</span>
                    <i>APPLY FOR LEAVE</i>
                </div>
            </div>
        </div>

        <div class="b_box">
            <div class="title">
                <span>我的课程</span>
                <span @click="showPicker = true" class="time">{{currentDateStr}}<img :src="xia" alt="" /> </span>
            </div>
            <van-popup v-model="showPicker" position="bottom">
                <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" @confirm="onConfirm" @cancel="showPicker = false" :formatter="formatter" />
            </van-popup>
            <van-divider />
            <div v-if="list.length > 0" class="list_box">
                <div class="item" v-for="item in list" :key="item.id">
                    <div class="left">
                        <span v-if="item.book_course_type == 1" class="biaoti">{{item.course_name}} - {{item.tuanke_teacher_name}}</span>
                        <span v-else class="biaoti">私教课-{{item.sijiao_teacher_name}}</span>
                        <span v-if="item.qiandao_status == 1" class="success">已完成</span>
                        <span v-else class="info">未完成</span>
                    </div>
                    <div class="right">
                        <span>已约{{item.diff_time}}课时</span>
                        <span class="d_time">{{item.book_time && item.book_time.slice(0, 10)}}</span>
                    </div>
                </div>
            </div>
            <div v-else>
                <van-empty description="还没有数据" />
            </div>
            <van-divider />
        </div>
        <br>
        <br>
        <br>
        <van-tabbar v-model="active" active-color="#FF5926" @change="onChange" inactive-color="#000">
            <van-tabbar-item icon="home-o">场馆</van-tabbar-item>
            <van-tabbar-item icon="notes-o">课表</van-tabbar-item>
            <van-tabbar-item icon="todo-list-o">约课</van-tabbar-item>
            <van-tabbar-item icon="wap-home-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { dateFormatYMD, getTimeStamp } from "@/utils/index";
import { cookie } from "@/utils/index";
const moment = require("moment");
import { Toast } from "vant";
const book = require("@/api/book");
const course = require("@/api/course");
const card = require("@/api/card");
const user = require("@/api/user");
const head = require("@/assets/img/head.png");
const zuan = require("@/assets/img/zuan.png");
const arrow = require("@/assets/img/arrow.png");
const my_01 = require("@/assets/img/my_01.png");
const my_02 = require("@/assets/img/my_02.png");
const xia = require("@/assets/img/xia.png");

export default {
	data() {
		return {
			xia,
			currentDate: new Date(),
			currentDateStr: "",
			my_01,
			my_02,
			arrow,
			zuan,
			head,
			user_id: "",
			active: 3,
			list: [],
			member_id: "",
			user: {},
			showPicker: false,
			my_cards: [],
			mainCard: null,
			user_tiyan_num: 0,
		};
	},
	mounted() {
		let user_id = cookie.get("user_id");
		if (user_id) {
			this.user_id = user_id;
			this.fetchUser(user_id);
			this.fetchData();
		} else {
			this.$notify({
				message: "请先登录",
				type: "danger",
			});
			setTimeout(() => {
				this.$router.replace({
					path: "/login",
				});
			}, 1000);

			return;
		}

		this.currentDateStr =
			this.currentDate.getFullYear() +
			"年" +
			(this.currentDate.getMonth() + 1) +
			"月";
	},
	methods: {
		async fetchData() {
			let year = this.currentDate.getFullYear();
			let month = this.currentDate.getMonth() + 1;
			let date = this.getMonthDateRange(year, month);

			let start_date = dateFormatYMD(date.start.toDate()) + " 00:00:00";
			let end_date = dateFormatYMD(date.end.toDate()) + " 23:59:59";

			Toast.loading({
				message: "加载中...",
				forbidClick: true,
			});
			let res = await book.getCourse({
				book_member_id: this.user_id,
				start_date,
				end_date,
			});
			if (res.code == 200) {
				res.data.forEach(item => {
					let start_time = 0;
					let end_time = 0;
					if (item.book_course_type == 1) {
						start_time = item.schedule_start_time.split(":");
						start_time =
							start_time[0] * 60 + parseInt(start_time[1]);
						end_time = item.schedule_end_time.split(":");
						end_time = end_time[0] * 60 + parseInt(end_time[1]);
					} else {
						start_time = item.stc_start_time.split(":");
						start_time =
							start_time[0] * 60 + parseInt(start_time[1]);
						end_time = item.stc_end_time.split(":");
						end_time = end_time[0] * 60 + parseInt(end_time[1]);
					}

					let diffTime = ((end_time - start_time) / 60).toFixed(1);
					item.diff_time = diffTime;
					item.book_time = item.book_time.replace(/-/g, "/");
				});
				this.list = res.data;
			}
			Toast.clear();
		},
		getMonthDateRange(year, month) {
			var startDate = moment([year, month - 1]);
			var endDate = moment(startDate).endOf("month");
			return { start: startDate, end: endDate };
		},
		async fetchUser(user_id) {
			let res = await user.getUser({
				id: user_id,
			});
			if (res.code == 200) {
				this.user = res.data;
			}

			let cardRes = await card.myCards({
				member_id: user_id,
			});

			if (cardRes.code == 200) {
				cardRes.data.forEach(item => {
					if (item.default == 1) {
						this.mainCard = item;
					}
				});
				this.my_cards = cardRes.data;

				if (this.mainCard) {
					let { open_end_time, type } = this.mainCard;

					let m1 = moment();

					if (type == 1) {
						this.mainCard.leave = this.mainCard.surplus + "次";
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
							this.mainCard.leave = diff + "天";
						} else {
							this.mainCard.leave = "已用完";
						}
					} else if (type == 6) {
						this.mainCard.leave =
							"￥" + this.mainCard.surplus.toFixed(2) + "元";
					} else if (type == 7) {
						this.mainCard.leave =
							this.mainCard.surplus.toFixed(2) + "小时";
					}
				}
				// console.log(this.mainCard)
			}

			let tiyanRes = await course.get_tiyan_list({
				username: this.user.name,
			});
			if (tiyanRes.code == 200) {
				let len = tiyanRes.data.length;
				this.user_tiyan_num = len;
			}
		},
		onConfirm(time) {
			this.currentDateStr =
				time.getFullYear() + "年" + (time.getMonth() + 1) + "月";
			this.showPicker = false;
			this.fetchData();
		},
		formatter(type, val) {
			if (type === "year") {
				return `${val}年`;
			} else if (type === "month") {
				return `${val}月`;
			}
			return val;
		},
		toPerson() {
			this.$router.push({
				path: "/person",
			});
		},
		jump(num) {
			if (num == 1) {
				this.$router.replace({
					path: "/my_course",
				});
			} else {
                this.$toast('功能开发中')
            }
		},
		onChange(index) {
			if (index == 0) {
				this.$router.replace({
					path: "/",
				});
				return;
			}
			if (index == 1) {
				this.$router.replace({
					path: "/book/1",
				});
				return;
			}
			if (index == 2) {
				this.$router.replace({
					path: "/my_course",
				});
				return;
			}
			if (index == 3) {
				return;
			}
		},
		lookCards() {
			this.$router.push({
				path: "/my_cards",
			});
		},
		logout() {
			cookie.del("user_id");
			cookie.del("user_token");
			setTimeout(() => {
				this.$router.replace({ path: "/" });
			}, 500);
		},
	},
};
</script>
<style lang="less" scoped>
.top_info {
	height: 300px;
	width: 100%;
	background-color: #ff5926;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: #fff;
	box-sizing: border-box;
	padding: 30px 20px 0;
	.user {
		color: #fff;
		display: flex;
		align-items: center;
		img {
			background-color: #fff;
			border-radius: 50%;
			margin-right: 20px;
			border: 1px solid #fff;
		}
		.avatar {
			width: 70px;
			height: 70px;
		}
		span {
			font-size: 20px;
		}
		.tuichu {
			font-size: 14px;
			margin-left: 15px;
		}
	}
	.f_in {
		padding-top: 20px;
		justify-content: space-between;
		display: flex;
		justify-content: space-between;
		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 100%;
			font-size: 16px;
			.num {
				font-size: 24px;
				margin-bottom: 10px;
			}
		}
	}

	.card {
		width: 100%;
		box-sizing: border-box;
		height: 60px;
		padding: 0;
		.inner {
			width: 100%;
			height: 100%;
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
			background-color: #2d1740;
			color: rgb(238, 210, 160);
			display: flex;
			justify-content: space-between;
			line-height: 24px;
			padding: 15px;
			box-sizing: border-box;
			.left {
				font-size: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					width: 22px;
					height: 18px;
					margin-right: 5px;
				}
			}
			.right {
				display: flex;
				justify-content: center;
				align-items: center;
				span {
					font-size: 16px;
				}
				strong {
					margin-right: 15px;
					font-size: 18px;
					margin-left: 5px;
				}
				img {
					height: 20px;
				}
			}
		}
	}
	.info_empty {
		width: 100%;
		box-sizing: border-box;
		height: 60px;
		padding: 0;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		background-color: #2d1740;
		color: rgb(238, 210, 160);
		display: flex;
		justify-content: space-between;
		line-height: 24px;
		padding: 15px;
		box-sizing: border-box;
	}
}
.btns {
	display: flex;
	box-sizing: border-box;
	padding: 20px;
	.btn {
		padding: 15px 10px;
		background-color: #fff;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
		display: flex;
		margin-right: 5px;
		flex: 1;
		align-items: center;
		&:last-child {
			margin-right: 0;
		}
		img {
			width: 50px;
			height: 50px;
			margin-right: 5px;
		}
		.info {
			display: flex;
			flex-direction: column;
			font-size: 16px;
			i {
				font-style: normal;
				color: #7e7e7e;
				font-weight: normal;
				font-size: 10px;
			}
		}
	}
}

.b_box {
	margin-top: 10px;
	padding: 0 20px;
	box-sizing: border-box;
	.title {
		font-size: 18px;
		color: #333;
		display: flex;
		justify-content: space-between;
		.time {
			font-size: 14px;
			display: flex;
			align-items: center;
			img {
				width: 12px;
				height: 8px;
			}
		}
	}
}
.list_box {
	display: flex;
	flex-direction: column;
	.item {
		height: 40px;
		display: flex;

		font-size: 14px;
		justify-content: space-between;
		align-items: center;
		color: #999;
		.left {
			width: 180px;
			display: flex;
			align-items: center;
			.success {
				height: 20px;
				font-size: 12px;
				display: inline-block;
				padding: 2px 5px;
				background-color: #ff5926;
				color: #fff;
				border-radius: 3px;
			}
			.info {
				font-size: 12px;
				height: 20px;
				display: inline-block;
				padding: 2px 5px;
				border-radius: 3px;
				background-color: #f5f5f5;
				color: #3b3b3b;
			}
		}
		.biaoti {
			color: #000;
			font-size: 16px;
			line-height: 40px;
			height: 40px;
			width: 100px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			display: inline-block;
		}
		.rigth {
			font-size: 12px;
		}
		.d_time {
			margin-left: 5px;
		}
		.van-tag {
			line-height: 1;
		}
	}
}
</style>

<style>
.list_box .van-tag {
	line-height: 1;
}
</style>