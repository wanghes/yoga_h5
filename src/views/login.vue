<template>
    <div class="wrap login_box">
        <!-- <h3 class="title">手机帐号登录</h3> -->
        <div class="tab_menu">
            <span @click="tabClick(1)" :class="tab_01_show ? 'active': ''">密码登录</span>
            <span @click="tabClick(2)" :class="tab_02_show ? 'active': ''">短信登录</span>
        </div>

        <div class="tab_content">
            <div v-if="tab_01_show" class="tab_01">
                <div class="form">
                    <div class="form_item">
                        <span class="pre">+86 ></span>
                        <input v-model="phone" placeholder="请填写用户手机" type="text"/>
                    </div>
                    <div class="form_item">
                        <input v-model="password" placeholder="请填写密码" type="password"/>
                    </div>
                    <div style="margin-top: 50px">
                        <van-button round block type="info" @click="onSubmit" native-type="submit">提交</van-button>
                    </div>
                </div>
            </div>
            <div v-if="tab_02_show" class="tab_02">
                <div class="form">
                    <div class="form_item">
                        <span class="pre">+86 ></span>
                        <input v-model="phone" placeholder="请填写用户手机" type="text"/>
                    </div>
                    <div class="form_item">
                        <input v-model="vcode" placeholder="请输入验证码" type="text"/>
                        <span class="last" @click="fetchVcode">获取验证码</span>
                    </div>
                    <div style="margin-top: 50px">
                        <van-button round block type="info" @click="smsSubmit" native-type="submit">提交</van-button>
                        
                    </div>
                </div>
            </div>
        </div>

        <van-divider />
        <van-button round block @click="toHome">随便看看</van-button>

        <div class="bot_f" v-if="tab_01_show">
            <span @click="toForget">忘记密码</span>
            <span @click="toRegister">立即注册</span>
        </div>

        <div class="bot_f" v-if="tab_02_show">
            <span @click="toRegister">立即注册</span>
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
            vcode: "",
            verification_key: "",
            tab_01_show: true,
            tab_02_show: false
        };
    },
    mounted() {
        this.verification_key = cookie.get("verification_key");
    },
    methods: {
        async onSubmit() {
            const phone = this.phone;
            const password = this.password;
        
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
        async smsSubmit() {
            const phone = this.phone;
            const vcode = this.vcode;
            const verification_key = this.verification_key;

            let res = await user.smsLogin({
                phone,
                vcode,
                verification_key
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
        toHome() {
            this.$router.replace({
                path: "/"
            })
        },
        toForget() {
            this.$router.push({
                path: "/forget"
            })
        },
        async fetchVcode() {
            const phone = this.phone;
            if (!phone) {
                this.$notify({
                    message: "请填写手机号",
                    color: '#ffffff'
                });
                return;
            }
            let res = await user.getVcode({
                phone: phone
            });
            if (res.code == 200) {
                cookie.set('verification_key', res.data.verification_key);
                this.verification_key = res.data.verification_key 
            }
        },
        tabClick(index) {
            if (index == 1) {
                this.tab_01_show = true;
                this.tab_02_show = false;
            } else {
                this.tab_01_show = false;
                this.tab_02_show = true;
            }
        },
        toRegister() {
            this.$router.replace({
                path: "/register"
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

.login_box{
    padding: 30px;
    box-sizing: border-box;
    .title{
        text-align: left;
        font-size: 24px;
        font-weight: normal;
    }
    .tab_menu{
        font-size: 18px;
        padding: 20px 0;
        span{
            margin-right: 0;
            display: inline-block;
            position: relative;
            height: 40px;
            line-height: 40px;
            margin-right: 20px;
        }
        .active{
            &:after{
                position: absolute;
                content: " ";
                bottom: 0;
                left: 50%;
                transform: translate(-50%,0);
                width:30px;
                height: 2px;
                background-color: #FF5926;
            }
        }
    }
    .tab_content{
        width:100%;
        .form{
            .form_item{
                width:100%;
                display: flex;
                padding-top: 15px;
                align-items: center;
                border-bottom: 1px solid #CCCCCC;
                .pre{
                    color:#FF5926;
                    width:80px;
                    padding-right: 15px;
                    box-sizing: border-box;
                    text-align: right;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                input{
                    flex:1;
                    width:100%;
                    border: none;
                    padding: 15px;
                    box-sizing: border-box;
                }
                .last{
                    display: block;
                    position: relative;
                    height: 36px;
                    width: 100px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 36px;
                    box-sizing: border-box;
                    &:after{
                        position: absolute;
                        content: " ";
                        width:1px;
                        height: 20px;
                        background-color: #b5b5b5;
                        top: 8px;
                        color: #999999;
                        left: 0;
                    }
                }
            }
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
</style>