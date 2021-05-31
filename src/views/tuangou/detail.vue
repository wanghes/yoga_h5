<template>
    <div class="wrap tuangou_detail">
        <div class="top">
            <div class="cover">
                <van-image
                    width="106%"
                    fit="contain"
                    :src="detail.cover"
                />
            </div>
            <div class="m_info">
                <div class="left">
                    <div class="left_top">
                        <div class="shou"><img :src="shou" alt=""></div>
                        <em>超值拼团</em>
                    </div>
                    <div class="left_bot">
                        <div class="title">{{detail.name}}</div>
                    </div>
                </div>
                <div class="right">
                    <div class="share">
                        <img :src="share" alt="">
                    </div>
                </div>
            </div>
            <div class="second_title">
                {{detail.intro}}
            </div>
            <div class="bot">
                <div class="price">
                    <span class="now_price">拼团价:￥{{detail.now_price}}</span>
                    <span class="old_price">原价:￥{{detail.old_price}}</span>
                </div>
                <div class="sell">已拼 {{detail.people}} 个</div>
            </div>
        </div>

        <div class="detail">
            <div class="box">
                <h3>团购卡详情</h3>
                <div class="item">
                    <span>卡名称</span>
                    <span>{{detail.card_name}}</span>
                </div>
                <div class="item">
                    <span>余额</span>
                    <span v-if="detail.type == 1">{{detail.times}}次</span>
                    <span v-else-if="detail.type == 6">{{detail.old_price}}元</span>
                    <span v-else-if="detail.type == 7">{{detail.hours}}小时</span>
                    <span v-else>不限制时间</span>
                </div>
                <div class="item">
                    <span>有效期</span>
                    <span v-if="detail.expire_date_on ==1">{{detail.expire_date}}天</span>
                    <span v-else>不限</span>
                </div>
                <div class="item">
                    <span>定价</span>
                    <span>{{detail.price}}元</span>
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
                    <div class="contact">联系场馆</div>
                </div>
            </div>
            <div class="box">
                <h3>活动信息</h3>
                <div class="content">
                    {{detail.des}}
                </div>
            </div>
            <div class="box">
                <h3>场馆环境</h3>
                <div class="content" v-html="venues.des"></div>
            </div>
        </div>
        <div class="detail_info"></div>
        <div class="btn">
            <van-button :disabled="detail.status==0" class="right_btn" block type="info" @click="sSubmit" native-type="submit">
                <span v-if="detail.status==1">立即抢购</span>
                <span v-else>活动已经结束</span>
            </van-button>
        </div>
    </div>
</template>
<script>
import shou from "@/assets/img/shou.png"
import share from "@/assets/img/share_2.png"

const tuangou = require("@/api/tuangou");
const venues = require("@/api/venues");

export default {
    data() {
        return {
            shou,
            share,
            detail:{
            },
            binds:[],
            venues:{}
        }
    },
    mounted() { 
        this.fetchData();
        this.fetchVenues();
    },
    methods: {
        async fetchData() {
            let id = this.$route.params.id;
            let res = await tuangou.query({
                id
            });

            if (res.code == 200) {
                this.detail = res.data;
                this.getListByCardId(res.data.bind_card_id)
            }
        },
        async getListByCardId(id) {
            let res = await tuangou.listByCardId({
                card_id: id
            });
            if (res.code == 200) {
                this.binds = res.data;
            }
            
        },
        async fetchVenues() {
            let res = await venues.query();
            if (res.code == 200) {
                this.venues = res.data;
                this.venues.des = res.data.des.replace(/<img/g,"<img style='max-width:100%; height:auto;'");
            }
        },
        sSubmit() {
            this.$notify({
                message: "功能开发中",
                color: "#ffffff",
                background: "#FF5926"
            })
        }
    }
}
</script>
<style>
.tuangou_detail .van-button--info{
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
}
.top{
    border-bottom: 5px solid #EFEFEF;
    .cover{
        width:100%;
        font-size: 0;
        display: flex;
        justify-content: center;
        // img{
        //     max-width:100%;
        //     display: block;
        // }
    }
    .bot{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px 15px;
        .price{
            display: flex;
            align-items: center;
            .now_price{
                font-size: 20px;
                color: #FF5926;
                margin-right: 10px;
            }
            .old_price{
                font-size: 14px;
                color: #999999;
                text-decoration: line-through;
            }
        }
        .sell{
            font-size: 14px;
            color: #FF5926;
        }
    }
    .second_title{
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
        color: #666666;
    }
    .m_info{
        display: flex;
        justify-content: space-between;
        background-color: #FF5926;
        align-items: center;
        padding: 8px 15px;
        .left{
            .left_top{
                display: flex;
                color:#fff;
                align-items: center;
                font-size:  14px;
                .shou{
                    width: 30px;
                    height: 30px;
                    
                    display: flex;
                    background-color: #FF5926;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: 18px;
                        height: 18px;
                    }
                }
            }
            .left_bot{
                font-size:  18px;
                color:#fff;
                .title{
                    font-weight: bold;
                }
            }
        }
        .right{
            .share{
                width: 40px;
                height: 40px;
                background-color: #fff;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 24px;
                    height: 24px;
                }
            }   
        }
    }
}
.detail{
    padding: 15px 15px 0;
    .box{
        font-size: 14px;
        padding-bottom: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
        margin-bottom: 15px;
        &:last-child{
            border-bottom: none;
            margin-bottom: 0;
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
            color: #333333;
            margin-bottom: 5px;
            .contact{
                color: #FF5926;
            }
        }
        .content{
            img{ 
                max-width: 100%;
            }
        }
    }
}
.detail_info{
    padding-bottom: 50px;
}
</style>