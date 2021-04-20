<template>
    <div class="wrap home">
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
            <van-swipe-item>
                <img v-lazy="banner_01" alt="">
            </van-swipe-item>
            <van-swipe-item>
                <img v-lazy="banner_02" alt="">
            </van-swipe-item>
        </van-swipe>
        <div class="wrap_inner">
            <div class="btns">
                <div class="items">
                    <div class="item" @click="jump(1)">
                        <img :src="btns.btn_01" alt="">
                        <span>申请体验</span>
                    </div>
                    <div class="item" @click="jump(2)">
                        <img :src="btns.btn_02" alt="">
                        <span>团课预约</span>
                    </div>
                    <div class="item" @click="jump(3)">
                        <img :src="btns.btn_03" alt="">
                        <span>私教预约</span>
                    </div>
                    <div class="item" @click="jump(4)">
                        <img :src="btns.btn_04" alt="">
                        <span>课程培训</span>
                    </div>
                </div>
                <div class="items">
                    <div class="item" @click="jump(4)">
                        <img :src="btns.btn_05" alt="">
                        <span>视频课程</span>
                    </div>
                    <div class="item" @click="jump(21)">
                        <img :src="btns.btn_06" alt="">
                        <span>限时秒杀</span>
                    </div>
                    <div class="item" @click="jump(22)">
                        <img :src="btns.btn_07" alt="">
                        <span>拼团活动</span>
                    </div>
                    <div class="item" @click="jump(22)">
                        <img :src="btns.btn_08" alt="">
                        <span>出廓商城</span>
                    </div>
                </div>
            </div>

            <div class="ground">
                <div class="title">
                    <span></span>
                    <strong>场馆介绍</strong>
                </div>
                <div class="img_guan">
                    <img :src="guan" alt="">
                </div>
                <div class="infos">
                    <div class="name">北京 瑜老师瑜伽馆</div>

                    <div class="zhu">
                        <span class="yin">营业时间</span>
                        <span>周一至周日 09:00-21:00</span>
                    </div>
                </div>
                <van-divider />
                <div class="s_title">
                    <span>环境设施</span>
                </div>
                <van-row>
                    <van-col span="8" class="sevs_item">
                        <img :src="sevs.s_01" alt="">
                        <span>沙发座</span>
                    </van-col>
                    <van-col span="8" class="sevs_item">
                        <img :src="sevs.s_02" alt="">
                        <span>免费WIFI</span>
                    </van-col>
                    <van-col span="8" class="sevs_item">
                        <img :src="sevs.s_03" alt="">
                        <span>有停车场</span>
                    </van-col>
                </van-row>
                <div class="ge"></div>
                <van-row>
                    <van-col span="8" class="sevs_item">
                        <img :src="sevs.s_04" alt="">
                        <span>储物柜</span>
                    </van-col>
                    <van-col span="8" class="sevs_item">
                        <img :src="sevs.s_05" alt="">
                        <span>更衣室</span>
                    </van-col>
                    <van-col span="8" class="sevs_item">
                        <img :src="sevs.s_06" alt="">
                        <span>淋浴房</span>
                    </van-col>
                </van-row><van-divider />
                <div class="s_title">
                    <span>周边交通</span>
                </div>
                <div class="jiaotong">
                    <div class="left">
                        <span class="t_01">中兴投文园金星路24号D座103室</span>
                        <span>距离公交站公安大学西站200</span>
                    </div>
                    <div class="right"></div>
                </div>
            </div>

            <div class="ground">
                <div class="title">
                    <span></span>
                    <strong>授课老师</strong>
                </div>

                <div class="box" v-if="teachers.length > 0">
                    <div class="item" v-for="item in teachers" :key="item.id">
                        <img  v-if="item.head" :src="item.head" alt="">
                        <img  v-else :src="teacherHead" alt="">
                        <div class="inner">
                            <span class="name">{{item.name}}</span>
                            <i class="sj" v-if="item.can_alone">(私教)</i>
                            <div class="zi">
                                {{item.des}}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <van-empty description="还没有数据" />
                </div>
            </div>
        </div>
    
        <div class="support">由 <span>瑜睿科技</span> 提供技术支持 </div>
        <van-tabbar v-model="active" active-color="#FF5926" @change="onChange" inactive-color="#000">
            <van-tabbar-item icon="home-o">场馆</van-tabbar-item>
            <van-tabbar-item icon="notes-o">课表</van-tabbar-item>
            <van-tabbar-item icon="todo-list-o">约课</van-tabbar-item>
            <van-tabbar-item icon="wap-home-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import banner_01 from "@/assets/img/banner_01.png"
import banner_02 from "@/assets/img/banner_02.png"
import btn_01 from "@/assets/img/btn_01.png"
import btn_02 from "@/assets/img/btn_02.png"
import btn_03 from "@/assets/img/btn_03.png"
import btn_04 from "@/assets/img/btn_04.png"
import btn_05 from "@/assets/img/btn_05.png"
import btn_06 from "@/assets/img/btn_06.png"
import btn_07 from "@/assets/img/btn_07.png"
import btn_08 from "@/assets/img/btn_08.png"
import guan from "@/assets/img/guan.jpg"
import s_01 from "@/assets/img/s_01.png"
import s_02 from "@/assets/img/s_02.png"
import s_03 from "@/assets/img/s_03.png"
import s_04 from "@/assets/img/s_04.png"
import s_05 from "@/assets/img/s_05.png"
import s_06 from "@/assets/img/s_06.png"
const teacher = require('@/api/teacher');
import { cookie } from "@/utils/index"
import { Toast } from 'vant';
const teacherHead = require('@/assets/img/teacher.png');

export default {
    data() {
        return {
            active: 0,
            teacherHead,
            banner_02,
            banner_01,
            btns: {
                btn_01,
                btn_02,
                btn_03,
                btn_04,
                btn_05,
                btn_06,
                btn_07,
                btn_08,
            },
            sevs: {
                s_01,
                s_02,
                s_03,
                s_04,
                s_05,
                s_06
            },
            guan,
            teachers:[]
        }
    },
    mounted(){
        this.fetchTeacher()
    },
    methods: {
        async fetchTeacher() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true
            });
            let res = await teacher.list({
                page: 1,
                pageSize: 3
            });
            if (res.code == 200) {
                this.teachers = res.data;
            }
            Toast.clear();
        },
        jump(val) {
            switch(val) {
                case 1:
                    this.$router.replace({
                        path: "/tiyan"
                    });
                    break; 
                case 2:
                    this.$router.replace({
                        path: "/book/1"
                    });
                    break; 
                case 3:
                    this.$router.replace({
                        path: "/book/2"
                    });
                    break; 
                default:
                    this.$notify({
                        message: "项目开发中，敬请期待",
                        color: '#ffffff',
                        background: '#FF5926',
                    });
                    break;
            }
        },
        onChange(index) {
            if (index == 0) return;
            if (index == 1) {
                this.$router.push({
                    path: "/book/1"
                });
                return;
            }
            if (index == 2) {
                if (!cookie.get('user_token')) {
                    this.$notify({
                        message:"请先登录",
                        type: 'danger'
                    });
                    setTimeout(() => {
                        this.$router.replace({
                            path: '/login'
                        });
                    }, 1000)

                    return;
                }
                this.$router.push({
                    path: "/my_course"
                });
                return;
            }
            if (index == 3) {
                if (!cookie.get('user_token')) {
                    this.$notify({
                        message:"请先登录",
                        type: 'danger'
                    });
                    setTimeout(() => {
                        this.$router.replace({
                            path: '/login'
                        });
                    }, 1000)

                    return;
                }
                this.$router.push({
                    path: "/my"
                });
                return;
            }
           
        }
    }
}
</script>
<style>
.home .van-swipe__indicators {
    bottom: 140px;
}
</style>
<style lang="less" scoped>
    .home{
        width:100%;
        min-height: 100vh;
        // background-image: url('../assets/img/banner_01.png');
        // background-repeat: no-repeat;
        // background-size: contain;
        // padding-top: 300px;
    }
    .my-swipe{
        img{
            width:100%;
        }
    }
    .wrap_inner{
        position: relative;
        top: -120px;
    }
    .btns{
        display: flex;
        flex-direction: column;
        margin: 0 15px;
        background: #fff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        box-shadow: 0 2px 8px rgba(136, 109, 109, 0.14);
        padding: 15px 5px;
        .items{
            display: flex;
            justify-content: space-between;
            padding: 15px;
            .item{
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    width: 50px;
                    margin-bottom: 10px;
                }
                span{
                    font-size: 14px;
                }
            }
        }
    }
    .ground{
        display: flex;
        flex-direction: column;
        margin: 10px 15px;
        background: #fff;
        box-shadow: 0 0px 8px rgba(136, 109, 109, 0.14);
        padding: 15px;
        .title{
            display: flex;
            align-items: center;
            span{
                display: block;
                height: 20px;
                width: 5px;
                background-color: #FF5926;
                margin-right: 10px;
            }
            strong{
                font-size: 16px;
            }
        }
        .img_guan{
            width:100%;
            margin: 15px 0;
            img{
                width:100%
            }
        }
        .infos{
            font-size: 14px;
            .name{
                font-size: 16px;
                margin-bottom: 10px;
            }
            .yin{
                color: #FF5926;
                margin-right: 5px;
            }
        }
        .s_title{
            font-size: 16px;
            color: #000;
            margin-bottom: 15px;
        }
        .ge{
            height: 10px;
        }
        .sevs_item{
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #666;
            img{
                width: 18px;
                height: 18px;
                margin-right: 5px;
            }
        }
        .jiaotong{
            font-size: 14px;
            color: #666666;
            .left{
                display: flex;
                flex-direction: column;
            }
            .t_01{
                margin-bottom: 5px;
                color: #000;
            }
        }

        .box{
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            .item{
                width: 33%;
                box-shadow: 0 3px 5px rgba(0,0,0,.2);
                text-align: center;
                margin: 0 3px;
                :last-child{
                    margin-right: 0;
                }
                img{
                    width:100%;
                }
                .inner{
                    padding: 5px 10px 15px;
                    box-sizing: border-box;
                }
                .name{
                    font-size: 14px;
                    color:#000;
                    margin-top: 10px;
                }
                .sj{
                    display: block;
                    color:#FF5926;
                    font-style: normal;
                    font-size: 12px;
                    margin-bottom: 10px;
                }
                .zi{
                    font-size: 12px;
                    color: #666666;
                    text-align: left;
                }
            }
        }
    }
</style>