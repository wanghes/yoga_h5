<template>
    <div class="wrap miaosha_detail">
        <div class="banner">
            <img class="cover" :src="detail.cover" alt="">
            <div class="time">
                <span>活动截止时间：{{detail.over_time}}</span>
            </div>
            <h3>{{detail.name}}</h3>
            <div class="bot">
                <div class="price">
                    <span class="now_price">￥{{detail.now_price && detail.now_price.toFixed(2)}}</span>
                    <span class="old_price">原价:￥{{detail.old_price && detail.old_price.toFixed(2)}}</span>
                </div>
                <div class="sell">已秒 {{detail.people}}</div>
            </div>
        </div>

        <div class="detail">
            <div class="box">
                <h3>会员卡详情</h3>
                <div class="item">
                    <span>卡名称</span>
                    <span>{{detail.card_name}}</span>
                </div>
                <div class="item">
                    <span>余额</span>
                    <span v-if="detail.type == 1">{{detail.times}}次</span>
                    <span v-else-if="detail.type == 6">{{detail.price}}元</span>
                    <span v-else-if="detail.type == 7">{{detail.hours}}小时</span>
                    <span v-else>不限制时间</span>
                </div>
                <div class="item">
                    <span>有效期</span>
                    <span v-if="detail.expire_date_on ==1">{{detail.expire_date}}天</span>
                    <span v-else>不限</span>
                </div>
            </div>
            <div class="box">
                <h3>支持课程</h3>
                <div class="item" v-for="item in binds" :key="item.id">
                    <span>{{item.course_name}}</span>
                </div>
            </div>

            <div class="box">
                <h3>适用场馆</h3>
                <div class="item">
                    <div>{{venues.name}}</div>
                    <div>联系场馆</div>
                </div>
            </div>
            <div class="box">
                <h3>秒杀说明</h3>
                <div class="content">
                    {{detail.des}}
                </div>
            </div>
        </div>

        <div class="detail_info">
            
        </div>

        <div class="btn">
            <van-button plain hairline  class="left_btn" block @click="sSubmit">我的订单</van-button>
            <van-button class="right_btn" block type="info" @click="sSubmit" native-type="submit">立即抢购</van-button>
        </div>

    </div>
</template>
<script>
const miaosha = require("@/api/miaosha");
const venues = require("@/api/venues");
import { getTimeStamp } from "@/utils/index";

export default {
    data() {
        return {
            detail:{
                id: "",
                name: "",
                card_name: "",
                cover: "",
                card_cover: "",
                limit: "",
                now_price: "",
                old_price: "",
                over_time: "",
                people: "",
                price: "",
                status: ""
            },
            binds:[],
            venues:{}
        }
    },
    mounted() {
        this.fetchData();
        this.fetchVenues()
    },
    methods: {
        async fetchData() {
            let id = this.$route.params.id;
            let res = await miaosha.query({
                id
            });

            if (res.code == 200) {
                this.detail = res.data;
                this.getListByCardId(res.data.bind_card_id)
            }
        },
        async getListByCardId(id) {
            let res = await miaosha.listByCardId({
                card_id: id
            });
            if (res.code == 200) {
                this.binds = res.data;
            }
            
        },
        async fetchVenues() {
            let res = await venues.query();
                console.log(res.data)
            if (res.code == 200) {
                this.venues = res.data;
            }
        },
        async sSubmit() {

        }
    }
}
</script>
<style>
.miaosha_detail .van-button--info{
    background-color: #FF5926;
    border: 1px solid #FF5926;
}
</style>
<style lang="less" scoped>
.btn{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
    display: flex;
    .left_btn{
        flex: 1;
    }
    .right_btn{
        flex: 2;
    }
}
.detail_info{
    padding-bottom: 50px;
}
.detail{
    padding: 15px;
    .box{
        font-size: 14px;
        padding-bottom: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
        margin-bottom: 15px;
        &:last-child{
            border-bottom: none;
        }
        h3{
            color: #FF5926;
            font-size: 16px;
            padding: 0;
            margin: 0;
            margin-bottom: 10px;
        }
        .item{
            line-height: 24px;
            display: flex;
            justify-content: space-between;
        }
    }
}

.banner{
    box-sizing: border-box;
    padding: 15px;
    font-size: 14px;
    border-bottom: 5px solid #EFEFEF;
    text-align: center;
    .cover{
        max-width: 100%;
        margin-bottom: 15px;
        margin-left: auto;
        margin-right: auto;
    }
    .time{
        padding: 10px 0;
        text-align: center;
        background-color: rgba(255, 89, 38, 0.1);
        color: #FF5926;
    }
    h3{
        margin: 0;
        padding: 15px 0;
        font-size: 18px;
        text-align: left;
    }
    .bot{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price{
            .now_price{
                font-size: 24px;
                color: #FF5926;
                margin-right: 10px;
            }
            .old_price{
                color: #999999;
                text-decoration: line-through;
            }
        }
        .sell{
            color: #FF5926;
        }
    }
}
</style>