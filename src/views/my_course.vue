<template>
    <div class="wrap">
        <van-tabs v-model="active" sticky @click="onClick">
            <van-tab title="待上课">
                <div class="list" v-if="list.length">
                    <div class="item" v-for="item in list" :key="item.id">
                        <div class="head" v-if="item.book_course_type == 1">
                            <img v-if="item.tuanke_teacher_head" :src="item.tuanke_teacher_head" alt="">
                            <img v-else :src="teacherHead" alt="">
                        </div>
                        <div class="head" v-else>
                            <img v-if="item.sijiao_teacher_head" :src="item.sijiao_teacher_head" alt="">
                            <img v-else :src="teacherHead" alt="">
                        </div>
                        <div class="info">
                            <h4 v-if="item.book_course_type == 1">{{item.course_name}}</h4>
                            <h4 v-else>私教课</h4>
                            <span v-if="item.book_course_type == 1">教练：{{item.tuanke_teacher_name}}</span>
                            <span v-else>教练：{{item.sijiao_teacher_name}}</span>
                            <span v-if="item.book_course_type == 1">时间：{{item.start_date && item.start_date.slice(0, 10)}} {{item.schedule_start_time}}-{{item.schedule_end_time}} </span>
                            <span v-else>时间：{{item.date && item.date.slice(0, 10)}} {{item.stc_start_time}}-{{item.stc_end_time}} </span>
                        </div>
                        <div class="btn">
                            <!-- <button v-if="!item.guoqi" class="yu_btn">取消</button> -->
                        </div>
                    </div>
                </div>
                <div v-else>
                    <van-empty description="还没有数据" />
                </div>
            </van-tab>
            <van-tab title="已取消">
                <div class="list" v-if="list.length">
                    <div class="item" v-for="item in list" :key="item.id">
                        <div class="head" v-if="item.book_course_type == 1">
                            <img v-if="item.tuanke_teacher_head" :src="item.tuanke_teacher_head" alt="">
                            <img v-else :src="teacherHead" alt="">
                        </div>
                        <div class="head" v-else>
                            <img v-if="item.sijiao_teacher_head" :src="item.sijiao_teacher_head" alt="">
                            <img v-else :src="teacherHead" alt="">
                        </div>
                        <div class="info">
                            <h4 v-if="item.book_course_type == 1">{{item.course_name}}</h4>
                            <h4 v-else>私教课</h4>
                            <span v-if="item.book_course_type == 1">教练：{{item.tuanke_teacher_name}}</span>
                            <span v-else>教练：{{item.sijiao_teacher_name}}</span>
                            <span v-if="item.book_course_type == 1">时间：{{item.start_date && item.start_date.slice(0, 10)}} {{item.schedule_start_time}}-{{item.schedule_end_time}} </span>
                            <span v-else>时间：{{item.date && item.date.slice(0, 10)}} {{item.stc_start_time}}-{{item.stc_end_time}} </span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <van-empty description="还没有数据" />
                </div>
            </van-tab>
            <van-tab title="已上课">
                <div class="list" v-if="list.length">
                    <div class="item" v-for="item in list" :key="item.id">
                        <div class="head" v-if="item.book_course_type == 1">
                            <img v-if="item.tuanke_teacher_head" :src="item.tuanke_teacher_head" alt="">
                            <img v-else :src="teacherHead" alt="">
                        </div>
                        <div class="head" v-else>
                            <img v-if="item.sijiao_teacher_head" :src="item.sijiao_teacher_head" alt="">
                            <img v-else :src="teacherHead" alt="">
                        </div>
                        <div class="info">
                            <h4 v-if="item.book_course_type == 1">{{item.course_name}}</h4>
                            <h4 v-else>私教课</h4>
                            <span v-if="item.book_course_type == 1">教练：{{item.tuanke_teacher_name}}</span>
                            <span v-else>教练：{{item.sijiao_teacher_name}}</span>
                            <span v-if="item.book_course_type == 1">时间：{{item.start_date && item.start_date.slice(0, 10)}} {{item.schedule_start_time}}-{{item.schedule_end_time}} </span>
                            <span v-else>时间：{{item.date && item.date.slice(0, 10)}} {{item.stc_start_time}}-{{item.stc_end_time}} </span>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <van-empty description="还没有数据" />
                </div>
            </van-tab>
            <van-tab title="全部">
                <div class="list" v-if="list.length">
                    <div class="item" v-for="item in list" :key="item.id">
                        <div class="head" v-if="item.book_course_type == 1">
                            <img v-if="item.tuanke_teacher_head" :src="item.tuanke_teacher_head" alt="">
                            <img v-else :src="teacherHead" alt="">
                        </div>
                        <div class="head" v-else>
                            <img v-if="item.sijiao_teacher_head" :src="item.sijiao_teacher_head" alt="">
                            <img v-else :src="teacherHead" alt="">
                        </div>
                        <div class="info">
                            <h4 v-if="item.book_course_type == 1">{{item.course_name}}</h4>
                            <h4 v-else>私教课</h4>
                            <span v-if="item.book_course_type == 1">教练：{{item.tuanke_teacher_name}}</span>
                            <span v-else>教练：{{item.sijiao_teacher_name}}</span>
                            <span v-if="item.book_course_type == 1">时间：{{item.start_date && item.start_date.slice(0, 10)}} {{item.schedule_start_time}}-{{item.schedule_end_time}} </span>
                            <span v-else>时间：{{item.date && item.date.slice(0, 10)}} {{item.stc_start_time}}-{{item.stc_end_time}} </span>
                        </div>
                        <div class="btn">
                            <!-- <button v-if="!item.guoqi" class="yu_btn">取消</button> -->
                        </div>
                    </div>
                </div>
                <div v-else>
                    <van-empty description="还没有数据" />
                </div>
            </van-tab>
        </van-tabs>
        <br>
        <br>
        <br>
        <van-tabbar v-model="activeItem" active-color="#FF5926" @change="onChange" inactive-color="#000">
            <van-tabbar-item icon="home-o">场馆</van-tabbar-item>
            <van-tabbar-item icon="notes-o">课表</van-tabbar-item>
            <van-tabbar-item icon="todo-list-o">约课</van-tabbar-item>
            <van-tabbar-item icon="wap-home-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { Toast } from "vant";
import { getTimeStamp } from "@/utils/index";
const teacherHead = require("@/assets/img/teacher.png");
const book = require("@/api/book");
import { cookie } from "@/utils/index";
export default {
	data() {
		return {
			teacherHead,
			activeItem: 2,
			active: 0,
			list: [],
			member_id: "",
		};
	},
	mounted() {
		let book_member_id = cookie.get("user_id");
		this.member_id = book_member_id;
		this.fetchData({
			qiandao_status: 0,
			book_member_id,
		});
	},
	methods: {
		async fetchData(params) {
			Toast.loading({
				message: "加载中...",
				forbidClick: true,
			});
			let res = await book.getCourse({
				...params,
			});
			if (res.code == 200) {
				res.data.forEach(item => {
					if (item.book_course_type == 1) {
						let start_date = item.start_date.slice(0, 10);
						let str =
							start_date + " " + item.schedule_start_time + ":00";
						let timeObj = getTimeStamp(str);
						item.timeStamp = timeObj.timeStamp;
						item.weekDay = timeObj.weekDay;
						item.guoqi = false;

						if (new Date().getTime() > item.timeStamp) {
							item.guoqi = true;
						}
					} else {
						let start_date = item.date.slice(0, 10);
						let str =
							start_date + " " + item.stc_start_time + ":00";
						let timeObj = getTimeStamp(str);
						item.timeStamp = timeObj.timeStamp;
						item.weekDay = timeObj.weekDay;
						item.guoqi = false;

						if (new Date().getTime() > item.timeStamp) {
							item.guoqi = true;
						}
					}
				});
				this.list = res.data;
			}
			Toast.clear();
		},
		onClick(name, title) {
			let book_member_id = cookie.get("user_id");
			if (name == 0) {
				this.fetchData({
					qiandao_status: 0,
					book_member_id,
				});
			}
			if (name == 1) {
				this.fetchData({
					book_status: 2,
					book_member_id,
				});
			}
			if (name == 2) {
				this.fetchData({
					qiandao_status: 1,
					book_member_id,
				});
			}
			if (name == 3) {
				this.fetchData({
					book_member_id,
				});
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
				return;
			}
			if (index == 3) {
				this.$router.replace({
					path: "/my",
				});
				return;
			}
		},
	},
};
</script>
<style lang="less" scoped>
.list {
	padding: 0 15px;
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
<style>
.wrap .van-sticky {
	border-bottom: 1px solid #efefef !important;
}
.wrap .van-tab {
	font-size: 16px;
	position: relative;
}
.wrap .van-tabs__line {
	background-color: #ff5926;
}
.wrap .van-tab--active {
	color: #ff5926;
}
.wrap .van-tabs--line .van-tabs__wrap {
	height: 50px;
}
.wrap .van-tab::after {
	position: absolute;
	right: 0;
	top: 18px;
	content: " ";
	width: 1px;
	height: 16px;
	background: #efefef;
}
</style>