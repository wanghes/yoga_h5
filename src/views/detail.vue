<template>
    <div class="wrap">
        <div class="detail">
            <div class="left">
                <img v-if="!!detail.teacher_avatar" :src="detail.teacher_avatar" alt="">
                <img v-else :src="teacherHead" alt="">
                <span class="laoshi">{{ detail.teacher_name }}</span>
                <span class="course_type">{{ type == 1? "团课":"私教课" }}</span>
            </div>
            <div class="middle">
                <h3>{{ type==1 ? detail.course_name : "私教课" }}  </h3>
                <div class="item">
                    <label class="label">时间:</label>
                    <span>{{ detail.start_time }}-{{ detail.end_time }}<i class="time">({{detail.diff_time}}分钟)</i></span>
                </div>
                <div class="item">
                    <label class="label">日期:</label>
                    <span v-if="type == 1">{{ detail.start_date && detail.start_date.slice(0,10) }}</span>
                    <span v-else>{{ detail.date && detail.date.slice(0,10) }}</span>
                </div>
                <div class="item">
                    <label class="label">场馆:</label>
                    <span class="ground">{{ detail.room_name }}<i>(还可预约{{ p_num - count }}人)</i></span>
                </div>
            </div>
            <div class="right">
                <div class="share_btn" @click="shareAction">
                    <img :src="share_icon" alt="">
                    <span>分享</span>
                </div>
            </div>
        </div>
        <van-divider />
        <div class="content" v-if="type == 1">
            <h2>课程简介</h2>
            <div class="inner" v-html="detail.content">
            </div>
        </div>
        <!-- <div class="support">由 <span>瑜睿科技</span> 提供技术支持 </div> -->
        <van-tabbar v-model="active" active-color="#FF5926" @change="onChange" inactive-color="#000">
            <van-tabbar-item icon="home-o">场馆</van-tabbar-item>
            <van-tabbar-item icon="notes-o">课表</van-tabbar-item>
            <van-tabbar-item icon="todo-list-o">约课</van-tabbar-item>
            <van-tabbar-item icon="wap-home-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { dateFormatYMD, getTimeStamp } from '@/utils/index';
import { cookie } from "@/utils/index";
import { Toast } from 'vant';
const book = require('@/api/book');
const card = require('@/api/card');
const schedule = require('@/api/schedule');
const teacherHead = require('@/assets/img/teacher.png');
const share_icon = require('@/assets/img/share.png');

export default {
    data() {
        return {
            active: 5,
            teacherHead,
            share_icon,
            type:"",
            p_num: "",
            count: "",
            schedule_id: "",
            detail: {}
        }
    },
    mounted() {
        let query = this.$route.query;
        let { type, schedule_id, count, p_num } = query;
        this.type = type;
        this.schedule_id = schedule_id;
        this.fetchData();
    },
    methods: {  
        async fetchData() {
            let res = await schedule.query({
                type: this.type,
                schedule_id: this.schedule_id
            });
            if (res.code == 200) {
                this.handle(res.data);
                this.detail = res.data;
                this.detail.content = res.data.content.replace(/<img/g,"<img style='max-width:100%; height:auto;'");
            }
        },
        handle(data) {
            let item = data;
            let start_time = 0;
            let end_time = 0;
            if (this.type == 1) {
                start_time = item.start_time.split(":");
                start_time = start_time[0] * 60 + parseInt(start_time[1])
                end_time = item.end_time.split(":");
                end_time = end_time[0] * 60 + parseInt(end_time[1])
            } else {
                start_time = item.start_time.split(":");
                start_time = start_time[0] * 60 + parseInt(start_time[1])
                end_time = item.end_time.split(":");
                end_time = end_time[0] * 60 + parseInt(end_time[1])
            }
            
            let diffTime = end_time - start_time
            item.diff_time = diffTime
        },
        onChange(index) {
            if (index == 0) {
                this.$router.push({
                    path: "/"
                });
                return;
            }
            if (index == 1) {
                this.$router.push({
                    path: "/book/1"
                });
                return;
            }
            if (index == 2) {
                this.$router.push({
                    path: "/my_course"
                });
                return;
            }
            if (index == 3) {
                this.$router.push({
                    path: "/my"
                });
                return;
            }
        },
        shareAction() {
            this.$toast("功能开发中")
        }
    }
}
</script>

<style lang="scss" scoped>
.wrap{
    display: flex;
    flex-direction: column;
    flex-flow: column nowrap;
}
.detail{
    display: flex;
    padding: 20px 20px 10px;
    font-size: 14px;
    position: relative;
    .left{
        display: flex;
        flex-direction: column;
        font-size: 14px;
        padding-right: 20px;
        text-align: center;
        .laoshi{
            color:#FF5926;
        }
        img{
            width:80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 5px;
        }
        .course_type{
            margin-top: 5px;
            display: inline-block;
            padding: 2px 10px;
            color: #fff;
            background-color: #FF5926;
            text-align: center;
        }
    }
    .middle{
        flex: 1;
        display: flex;
        flex-direction: column;
        color: #666666;
        h3{
            margin: 0;
            color:#000;
            padding: 0;
            font-size: 16px;
            margin-bottom: 10px;
            padding-right: 50px;
            box-sizing: border-box;
        }
        .item{
            line-height: 26px;
            display: flex;
            .label{
                width: 40px;
            }
            i{
                font-style: normal;
                color: #FF5926;
                padding-left: 5px;
            }
            .ground{
                width:80%;
            }
        }
    }
    .right{
        display: inline-block;
        position: absolute;
        right: 10px;
        top: 20px;
        background-color: #fff;
        padding-left: 10px;
        .share_btn{
            display: flex;
            align-items: center;
            color: #555;
            img{
                width: 16px;
                height: 14px;
                margin-right:5px;
                
            }
        }
    }
}
.content{
    padding: 10px 20px 0;
    flex: 1;
    min-height: 400px;
    h2{
        font-size: 18px;
        margin:0;
    }
    .inner{
        color: #666;
        padding-bottom: 50px;
    }
}
.support{
    flex: auto;
}
</style>