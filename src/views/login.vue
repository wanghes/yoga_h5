<template>
    <div class="wrap login_box">
        <h3 class="title">登录信息</h3>
        <van-form @submit="onSubmit">
            <van-field
                v-model="phone"
                name="phone"
                label="用户名"
                placeholder="用户手机"
                :rules="[{ required: true, message: '请填写用户手机' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <van-divider />
        <div style="margin: 16px">
            <van-button round block type="default" @click="zhuan">先转一转</van-button>
        </div>
    </div>
</template>


<script>
import {cookie} from "@/utils/index"
const user = require("@/api/user");
export default {
    data() {
        return {
            phone: "",
            password: "",
        };
    },
    methods: {
        async onSubmit(values) {
            const {
                phone,
                password
            } = values;

            let res = await user.login({
                phone,
                password
            });

            if (res.code == 200) {
                let data = res.data;
                cookie.set('user_id', data.user_id);
                cookie.set('user_token', data.token);
                cookie.set('user_phone', data.phone);
                cookie.set('user_head', data.head);

                this.$router.push({
                    path: "/"
                });
            }
        },
        zhuan() {
            this.$router.replace({
                path: "/"
            })
        }
    }
};
</script>
<style>
.login_box .van-button--info{
    background-color: #FF5926;
    border: 1px solid #FF5926;
}
</style>
<style lang="less" scoped>
.title{
    padding-top: 150px;
    text-align: center;
}
</style>