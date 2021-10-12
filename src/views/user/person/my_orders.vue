<template>
    <div class="wrap">
        <div class="btn_box">
            <van-button icon="wap-home" size="small" @click="jump(1)" plain hairline type="default">回首页</van-button>
            <van-button icon="wap-nav" size="small" @click="jump(2)" plain hairline type="default">去约课</van-button>
            <van-button icon="video" size="small" @click="jump(3)" plain hairline type="default">视频课程</van-button>
        </div>
        <van-tabs v-model="active" type="card" @click="onClick">
            <van-tab title="线上课程">
                <van-list v-if="list1.length > 0">
                    <van-cell v-for="item in list1" :key="item.id">
                        <div class="item">
                            <div class="left">
                                <div class="remark">{{item.remark}}</div>
                                <span>{{item.create_time}}</span>
                            </div>
                            <div class="right">
                                <div>￥<span class="money">{{item.amount}}</span></div>
                            </div>
                        </div>
                    </van-cell>
                </van-list>
                <div class="list" v-else>
                    <van-empty description="还没有数据" />
                </div>
            </van-tab>
            <van-tab title="线下课程">
                <van-list v-if="list2.length > 0">
                    <van-cell v-for="item in list2" :key="item.id">
                        <div class="item">
                            <div class="left">
                                <div class="remark">{{item.remark}}</div>
                                <span>{{item.bill_date}}</span>
                            </div>
                            <div class="right">
                                <div>￥<span class="money">{{item.bill_amount}}</span></div>
                            </div>
                        </div>
                    </van-cell>
                </van-list>
                <div class="list" v-else>
                    <van-empty description="还没有数据" />
                </div>
            </van-tab>
        </van-tabs>
        
    </div>
</template>
<script>
const order = require("@/api/order");
import { cookie } from "@/utils/index";

export default {
    data() {
        return {
            list1:[],
            list2:[],
            active: 0,
            userId: cookie.get("user_id")
        }
    },
    mounted() {
        this.fetchData(1);
    },
    methods: {
        async fetchData(num) {
            let member_id = this.userId;
            let type = num;

            let res = await order.list({
                member_id,
                type
            });

            if (res.code == 200) {
                if (type == 1) {
                    this.list1 = res.data;
                } else {
                    this.list2 = res.data;
                }
            }
        },
        onClick(name, title) {
            if (name == 0) {
                this.fetchData(1);
                return;
            }
            this.fetchData(2);
        },
        jump(num) {
            if (num == 1) {
                this.$router.replace({
                    path: '/'
                })
                return
            }

            if (num == 2) {
                this.$router.replace({
                    path: '/book/1'
                })
                return
            }

             if (num == 3) {
                this.$router.replace({
                    path: '/online/index'
                })
                return
            }
        }
    }
}
</script>

<style lang="less" scoped>
.wrap{
    padding: 15px 0;
    .item{
        display: flex;
        flex-direction: row;
        align-items: center;
        .left{
            display: flex;
            flex-direction: column;
            width: 70%;
            .remark{
                margin-bottom: 5px;
            }
        }
        .right{
            flex: 1;
            text-align: right;
            color:red;
            .money{
                font-size: 14px;
            }
        }
    }
}
.btn_box{
    padding: 0px 0 20px;
    justify-content: center;
    display: flex;
    .van-button{
        margin: 0 7px;
    }
}
</style>