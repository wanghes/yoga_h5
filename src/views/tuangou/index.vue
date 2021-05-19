<template>
    <div class="wrap">
        <div class="list" v-if="list.length > 0">
            <div class="item" v-for="item in list" :key="item.id" @click="jump(item.id)">
                <img class="left" :src="item.cover" alt="">
                <div class="right">
                    <h3>{{item.name}}</h3>
                    <div class="info">{{item.intro}}</div>
                    <div v-if="item.status ==1" class="bot ing">
                        <span class="status">进行中</span>
                        <span class="label">低至{{item.price && item.price.toFixed(2)}}元</span>
                    </div>
                    <div v-else class="bot">
                        <span class="status">已结束</span>
                        <span class="label">低至{{item.price && item.price.toFixed(2)}}元</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
             <van-empty description="还没有数据" />
        </div>
    </div>
</template>
<script>

const tuangou = require("@/api/tuangou");

export default {
    data() {
        return {
            list:[]
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            let res = await tuangou.allList();
           
            if (res.code == 200) {
                this.list = res.data;
            }
        },
        jump(id) {
            this.$router.push({
                path: "/tuangou/" + id
            })
        }
    }
}
</script>

<style lang="less" scoped>
.list{
    padding: 0 15px 0;
    box-sizing: border-box;
    .item{
        display: flex;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #efefef;
        .left{
            width: 30%;
            flex: 1;
            margin-right: 10px;
        }
        .right{
            width: 60%;
            font-size: 14px;
            h3{
                margin: 0;
                padding: 0;
                font-size: 16px;
                margin-bottom: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                line-clamp: 1;
                -webkit-box-orient: vertical;
            }
            .info{
                color: #999;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .bot{
                display: flex;
                justify-content: space-between;
                padding-top: 5px;
                &.ing{
                    .status{
                        color:#fff;
                        background-color: #FF5926;
                    }
                    .label{
                        color: #FF5926;
                    }
                }
                .status{
                    display: inline-block;
                    padding: 2px 10px;
                    border-radius: 3px;
                    color:#999;
                    font-size: 12px;
                    background-color: #efefef;
                }
            }
        }
    }
}
</style>