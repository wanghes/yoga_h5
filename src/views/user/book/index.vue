<template>
    <div class="wrap">
        <div class="btns">
            <span :class="type == 1 ? 'active':''" @click="changeClass(1)">团课</span>
            <span :class="type == 2 ? 'active':''" @click="changeClass(2)">私教课</span>
        </div>
        <div class="rili">
            <div class="item_wrap" v-for="(item, idx) in rankWeeks" :key="idx">
                <div :class="item.today ? 'item today':'item'">
                    <span>{{item.week}}</span>
                    <strong>{{item.day}}</strong>
                    <span>{{item.month}}</span>
                </div>
            </div>
        </div>
        <van-divider />
         <!-- 团课 -->
        <div class="list" v-if="type == 1 && tuankeList.length > 0">
            <div class="item" v-for="item in tuankeList" :key="item.schedule_id" @click="toDetail(item, type)">
                <div class="head">
                    <img :src="item.teacher_head" alt="">
                </div>
                <div class="info">
                    <h4>{{item.course_name}}</h4>
                    <span>教练：{{item.teacher_name}}</span>
                    <span>时间：{{item.weekDay}} {{item.start_time}} - {{item.end_time}} </span>
                    <span>还能预约 {{item.p_num - item.count}} 人</span>
                </div>
                <div class="btn">
                    <button v-if="item.guoqi" class="yu_btn cross">已过期</button>
                    <button v-else-if="item.can_book" class="yu_btn" @click.stop="bookAction(item.schedule_id)">预约</button>
                    <button v-else :disabled="!item.can_book" :class="!item.can_book ? 'yu_btn yu_btn_dis':'yu_btn' ">预约</button>
                </div>
            </div>
        </div>
        <div class="list" v-else-if="type == 1 && !tuankeList.length">
            <van-empty description="还没有数据" />
        </div>

        <!-- 私教课 -->
        <div class="list" v-if="sijiaoList.length > 0 && type ==2">
            <div class="item" v-for="item in sijiaoList" :key="item.schedule_id" @click="toDetail(item, type)">
                <div class="head">
                    <img :src="item.teacher_head" alt="">
                </div>
                <div class="info">
                    <h4>{{item.course_name}}</h4>
                    <span>教练：{{item.teacher_name}}</span>
                    <span>时间：{{item.weekDay}} {{item.start_time}} - {{item.end_time}}</span>
                    <span>还能预约 {{item.p_num - item.count}} 人</span>
                </div>
                <div class="btn">
                    <button v-if="item.guoqi" class="yu_btn cross">已过期</button>
                    <button v-else-if="item.can_book" class="yu_btn" @click.stop="bookAction(item.schedule_id)">预约</button>
                    <button v-else :disabled="!item.can_book" :class="!item.can_book ? 'yu_btn yu_btn_dis':'yu_btn' ">预约已满</button>
                </div>
            </div>
        </div>
        <div class="list" v-else-if="type == 2 && !sijiaoList.length">
            <van-empty description="还没有数据" />
        </div>

        <van-tabbar v-model="activeTab" active-color="#FF5926" @change="onChange" inactive-color="#000">
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
import { Toast } from "vant";
const book = require("@/api/book");
const card = require("@/api/card");
const teacherHead = require("@/assets/img/teacher.png");
export default {
	data() {
		return {
			teacherHead,
			activeTab: 1,
			active: 1,
			dateValue: new Date(),
			rankWeeks: [],
			type: "",
			date: {
				start: "",
				end: "",
			},
			tuankeList: [],
			sijiaoList: [],
			cards: [],
		};
	},
	mounted() {
		this.type = this.$route.params.type;
		if (this.type == 1) {
			this.rankWeeks = this.getWeekTime();
			this.fetchTuankeData();
		} else {
			this.rankWeeks = this.getWeekTime();
			this.fetchSijiaoData();
		}
	},
	updated() {
		this.type = this.$route.params.type;
	},
	methods: {
		changeClass(type) {
			if (this.type == type) return;
			this.$router.replace({
				path: "/book/" + type,
			});
			this.type = type;
			if (this.type == 1) {
				this.rankWeeks = this.getWeekTime();
				this.fetchTuankeData();
			} else {
				this.rankWeeks = this.getWeekTime();
				this.fetchSijiaoData();
			}
		},
		async fetchTuankeData() {
			let start_date =
				dateFormatYMD(new Date(this.date.start)) + " 00:00:00";
			let end_date = dateFormatYMD(new Date(this.date.end)) + " 23:59:59";
			Toast.loading({
				message: "加载中...",
				forbidClick: true,
			});
			let res = await book.tuanke_list({
				start_date,
				end_date,
			});

			if (res.code == 200) {
				let data = res.data;
				data.forEach(item => {
					let start_date = item.start_date.slice(0, 10);
					let str = start_date + " " + item.start_time + ":00";
					let timeObj = getTimeStamp(str);
					item.timeStamp = timeObj.timeStamp;
					item.weekDay = timeObj.weekDay;
					item.guoqi = false;
					item.can_book = true;
					if (this.dateValue.getTime() > item.timeStamp) {
						item.guoqi = true;
					}
					if (item.count >= item.p_num) {
						item.can_book = false;
					}
				});
				this.tuankeList = data;
			}
			Toast.clear();
		},
		async fetchSijiaoData() {
			let start_date =
				dateFormatYMD(new Date(this.date.start)) + " 00:00:00";
			let end_date = dateFormatYMD(new Date(this.date.end)) + " 23:59:59";
			Toast.loading({
				message: "加载中...",
				forbidClick: true,
			});
			let res = await book.sijiao_list({
				start_date,
				end_date,
			});

			if (res.code == 200) {
				let data = res.data;
				data.forEach(item => {
					let start_date = item.date.slice(0, 10);
					let str = start_date + " " + item.start_time + ":00";
					let timeObj = getTimeStamp(str);
					item.timeStamp = timeObj.timeStamp;
					item.weekDay = timeObj.weekDay;
					item.guoqi = false;
					item.can_book = true;
					if (this.dateValue.getTime() > item.timeStamp) {
						item.guoqi = true;
					}
					item.p_num = 1;

					if (item.count >= item.p_num) {
						item.can_book = false;
					}
				});
				this.sijiaoList = data;
			}
			Toast.clear();
		},

		formatDate(date) {
			const month = date.getMonth() + 1 + "月";
			const day = date.getDate();
			const dayweek = date.getDay();
			const week = [
				"周日",
				"周一",
				"周二",
				"周三",
				"周四",
				"周五",
				"周六",
			][dayweek];
			let today = false;
			var temp = this.dateValue.getDay();

			if (temp == dayweek) {
				today = true;
			}
			return {
				month,
				day,
				today,
				week,
			};
		},
		getWeekTime() {
			let that = this;
			var currentFirstDate;

			let addDate = function (date, n) {
				date.setDate(date.getDate() + n);
				return date;
			};

			let setDate = date => {
				var week = date.getDay() - 1;
				week = week == -1 ? 6 : week;
				date = addDate(date, week * -1);
				currentFirstDate = new Date(date);

				var arr = [];

				for (var i = 0; i < 7; i++) {
					var a = this.formatDate(i == 0 ? date : addDate(date, 1)); //星期一开始
					arr.push(a);
					if (i == 0) {
						that.date.start = date.valueOf();
					}

					if (i == 6) {
						that.date.end = date.valueOf();
					}
				}
				return arr;
			};
			var num = 0;
			setDate(new Date(this.dateValue.valueOf()));
			return setDate(addDate(currentFirstDate, 7 * num));
		},
		async bookAction(schedule_id) {
			let user_token = cookie.get("user_token");
			if (!user_token) {
				this.$notify({
					message: "请先登录",
					type: "danger",
				});
				setTimeout(() => {
					this.$router.push({
						path: "/login",
					});
				}, 1000);
				return;
			}

			let user_id = cookie.get("user_id");
			let res = await card.myCards({
				member_id: user_id,
			});

			if (res.code == 200) {
				let data = res.data;
				if (data.length) {
					this.cards = data;
				} else {
					this.$notify({
						message: "请您先办理会员卡",
						type: "danger",
					});
					return;
				}
			}

			let dafaultCard = null;
			this.cards.forEach(item => {
				if (item.default == 1) {
					dafaultCard = item;
				}
			});
			if (!dafaultCard) {
				this.$notify({
					message: "请联系客服设置默认的会员卡",
					type: "danger",
				});
				return;
			}

			let card_no = dafaultCard.card_no;

			let book_course_type = 1;
			if (this.type == 1) {
				book_course_type = 1;
			} else {
				book_course_type = 2;
			}
			let result = await book.add({
				book_card_no: card_no,
				book_course_id: schedule_id,
				book_course_type: book_course_type,
				book_member_id: user_id,
			});
			if (result.code == 200) {
				this.$notify({
					message: result.msg,
					type: "success",
				});
				setTimeout(() => {
					this.$router.push({
						path: "/my_course",
					});
				}, 1000);
			} else {
				console.log(result)
			}
		},
		toDetail(row, type) {
			this.$router.push({
				path: "/detail",
				query: {
					schedule_id: row.schedule_id,
					type,
					count: row.count,
					p_num: row.p_num,
				},
			});
		},
		onChange(index) {
			if (index == 0) {
				this.$router.replace({
					path: "/",
				});
			}
			if (index == 1) {
				return;
			}
			if (index == 2) {
				if (!cookie.get("user_token")) {
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
				this.$router.replace({
					path: "/my_course",
				});
				return;
			}
			if (index == 3) {
				if (!cookie.get("user_token")) {
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
				this.$router.push({
					path: "/my",
				});
				return;
			}
		},
	},
};
</script>

<style lang="less" scoped>
.wrap {
	padding: 15px 15px 49px;
}
.btns {
	display: flex;
	span {
		display: inline-block;
		padding: 4px 20px;
		background-color: #f5f5f5;
		color: #3f3f3f;
		border-radius: 3px;
		font-size: 16px;
		margin: 0 5px;
	}
	span.active {
		background-color: #ff5926;
		color: #fff;
	}
}
.rili {
	padding: 15px 0;
	display: flex;
	justify-content: space-between;
	.item_wrap {
		width: 100%;
		border: 1px solid #fff;
	}
	.item {
		text-align: center;
		width: 100%;
		background-color: #f5f5f5;
		font-size: 16px;
		color: #3f3f3f;
		display: flex;
		padding: 10px 0;
		border-radius: 5px;
		flex-direction: column;
		span {
			font-size: 12px;
		}
	}
	.today {
		background-color: #ff5926;
		color: #fff;
	}
}
.list {
	padding: 0;
	display: flex;
	flex-direction: column;
	.item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 15px 0;
		border-bottom: 1px solid #efefef;
	}
	.head {
		width: 80px;
		height: 80px;
		margin-right: 15px;
		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.info {
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #666666;
		h4 {
			margin: 0;
			font-size: 16px;
			margin-bottom: 5px;
			color: #000;
		}
	}
	.btn {
		flex: 1;
		text-align: right;
		.yu_btn {
			border: 1px solid #ff5926;
			background-color: #ff5926;
			font-size: 14px;
			color: #fff;
			&.cross {
				border: 1px solid #efefef;
				background-color: #efefef;
				color: #666;
			}
			&.yu_btn_dis {
				background-color: #efefef;
				border: 1px solid #efefef;
				color: #666;
			}
		}
	}
}
</style>