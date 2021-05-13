<template>
    <div class="wrap login_box">
        <div class="top">
            <img class="close" @click="toHome" :src="close" alt="">
        </div>
        <h3 class="title">修改密码</h3>
        <div class="tab_content">
            <div class="form">
                <div class="form_item">
                    <span class="pre">+86 ></span>
                    <input v-model="phone" placeholder="请填写用户手机" type="text"/>
                </div>
                <div class="form_item">
                    <input v-model="vcode" placeholder="请输入验证码" type="text"/>
                    <span class="last" @click="fetchVcode">获取验证码</span>
                </div>
                <div class="form_item">
                    <input v-model="password" placeholder="设定新密码(6位或以上）" type="password"/>
                </div>
                <div style="margin-top: 50px">
                    <van-button round block type="info" @click="onSubmit" native-type="submit">提 交</van-button>
                </div>
            </div>
        </div>
        <div class="bot_f">
            <span @click="toRegister">立即注册</span>
        </div>
    </div>
</template>


<script>
import {cookie} from "@/utils/index"
import close from "@/assets/img/close.png"
const user = require("@/api/user");
export default {
    data() {
        return {
            phone: "15810849752",
            password: "",
            vcode: "",
            verification_key: "",
            close
        };
    },
    mounted() {
        this.verification_key = cookie.get("verification_key");
    },
    methods: {
        async onSubmit() {
            const phone = this.phone;
            const vcode = this.vcode;
            const verification_key = this.verification_key;
            const password = this.password;
    
            let res = await user.editPassword({
                phone,
                password,
                vcode,
                verification_key,
            });

            return;

            if (res.code == 200) {
                this.$router.push({
                    path: "/findOk"
                });
            }
        },
        toHome() {
            this.$router.replace({
                path: "/"
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
        padding-top: 15px;
        text-align: left;
        font-size: 24px;
        font-weight: normal;
    }
    .top{
        display: flex;
        padding: 0px;
        justify-content: space-between;
        .close{
            width: 16px;
            height: 16px;
        }
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