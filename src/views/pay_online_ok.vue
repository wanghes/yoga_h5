<template>
    <div class="wrap">
        <div class="success_box">
            <van-icon name="success" />
            <span>支付成功</span>
        </div>
        <div class="btn_box">
            <van-button round size="normal" @click="jump(1)" block type="primary">回首页</van-button>
            <van-button round size="normal" @click="jump(2)" block type="primary">线上视频课</van-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        jump(num) {
            if (num == 1) {
                this.$router.replace({
                    path: '/'
                })
                return
            }

            if (num == 2) {
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
.success_box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color:#07c160;
    padding: 100px 0 50px;
    font-size: 20px;
    .van-icon{
        color:#07c160;
        font-size: 60px;
        margin-bottom: 20px;
    }
}

.btn_box{
    width: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    .van-button{
        margin-bottom: 10px;
    }
}
</style>