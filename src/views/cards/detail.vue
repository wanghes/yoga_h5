<template>
    <div class="wrap card_detail">
        <div class="top">
            <div class="cover">
                <img src="http://assets.yoga.com/storage/group_purchase_cover/9e/d1b5840643e4b1513d6044e395f93f.png" alt="">
            </div>
            <div class="bot">
                <div class="left">
                    <em>￥</em>
                    <span>500.00</span>
                    <i>私教卡</i>
                </div>
                <div class="right">
                    <div class="share">
                        <img :src="share" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="detail">
            <div class="box">
                <h3>会员卡详情</h3>
                <div class="item">
                    <span>卡名称</span>
                    <span>母亲节特惠卡</span>
                </div>
                <div class="item">
                    <span>余额</span>
                    <span>10次</span>
                </div>
                <div class="item">
                    <span>有效期</span>
                    <span>1个月</span>
                </div>
            </div>
            <div class="box">
                <h3>支持课程</h3>
                <div class="item">
                    <span>哈他瑜伽</span>
                </div>
                <div class="item">
                    <span>哈他瑜伽</span>
                </div>
                <div class="item">
                    <span>哈他瑜伽</span>
                </div>
            </div>

            <div class="box">
                <h3>适用场馆</h3>
                <div class="item">
                    <div>瑜老师 （北京市大兴区）</div>
                    <div>联系场馆</div>
                </div>
            </div>
            <div class="box">
                <h3>场馆环境</h3>
                <div class="content">
                    瑜老师瑜老师瑜老师瑜老师瑜老师瑜老师
                </div>
            </div>
        </div>

        <div class="btn">
            <div  class="left_btn"><span>￥</span>500.60</div>
            <van-button class="right_btn" block type="info" @click="sSubmit" native-type="submit">立即抢购</van-button>
        </div>


    </div>
</template>
<script>
import share from "@/assets/img/share_2.png"
export default {
    data() {
        return {
            share
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {

        }
    }
}
</script>
<style>
.card_detail .van-button--info{
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
        background-color: rgba(255, 89, 38, 0.2);
        color:#FF5926;
        font-weight: normal;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
            font-size: 14px;
        }
    }
    .right_btn{
        flex: 1;
    }
}
.top{
    .cover{
        padding: 15px;
        box-sizing: border-box;
        font-size: 0;
        img{
            width:100%;
        }
    }
    .bot{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FF5926;
        color: #fff;
        padding: 8px 15px;
        .left{
            display: flex;
            align-items: center;
            em{
                font-size: 14px;
                font-style: normal;
            }
            span{
                font-size: 26px;
                font-weight: bold;
                margin-right: 10px;
            }
            i{
                font-style: normal;
                font-size: 12px;
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
    padding: 15px 15px 50px;
    .box{
        font-size: 14px;
        padding-bottom: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
        margin-bottom: 15px;
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
</style>