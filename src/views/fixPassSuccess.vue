<template>
    <div class="wrap success_box">
        <div class="top">
            <img class="close" @click="toHome" :src="close" alt="">
        </div>
        <h3 class="title">找回密码</h3>
        <div class="success_content">
            <img class="duihao" :src="duihao" alt="">
            <div class="text">恭喜您密码找回成功！ 请立即登录吧</div>
        </div>
        <div>
            <van-button round block type="info" @click="toLogin">立即登录</van-button>
        </div>
    </div>
</template>

<script>
import {cookie} from "@/utils/index"
import close from "@/assets/img/close.png"
import duihao from "@/assets/img/duihao.png"

export default {
    data() {
        return {
            close,
            duihao
        };
    },
    methods: {
        toLogin() {
            this.$router.replace({
                path: "/login"
            })
        },
        toHome() {
             this.$router.replace({
                path: "/"
            })
        }
    }
}
</script>

<style>
.success_box .van-button--info{
    background-color: #FF5926;
    border: 1px solid #FF5926;
}
</style>
<style lang="less" scoped>
.success_box{
    padding: 30px;
    box-sizing: border-box;
    .top{
        display: flex;
        padding: 0px;
        justify-content: space-between;
        .close{
            width: 16px;
            height: 16px;
        }
    }
    .bot_f{
        display: flex;
        padding:15px;
        justify-content: space-between;
        font-size: 14px;
        color:#646464;
    }
}
.success_content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 100px 0 50px;
    .duihao{
        width: 70px;
        height: 70px;
        margin-bottom: 20px;
    }
    .text{
        width: 200px;
        color:#FF5926;
        font-size: 20px;
    }
}
</style>