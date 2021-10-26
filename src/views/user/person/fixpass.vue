<template>
    <div class="wrap login_box">
        <h3 class="title">修改密码</h3>
        <div class="tab_content">
            <div class="form">
                <div class="form_item">
                    <span class="pre">+86 ></span>
                    <input v-model="phone" placeholder="请填写用户手机" type="text" />
                </div>
                <div class="form_item">
                    <input v-model="vcode" placeholder="请输入验证码" type="text" />
					<span class="last" v-if="!sending" @click="fetchVcode">获取验证码</span>
                    <span class="last" v-else>还剩 {{seconds}} 秒</span>
                </div>
                <div class="form_item">
                    <input v-model="password" placeholder="设定新密码(6位或以上）" type="password" />
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
import { cookie } from "@/utils/index";
const user = require("@/api/user");
export default {
	data() {
		return {
			phone: "15810849752",
			password: "",
			vcode: "",
			verification_key: "",
			sending: false,
			seconds: 60
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

			if (res.code == 200) {
				this.$router.push({
					path: "/findOk",
				});
			}
		},
		toHome() {
			this.$router.replace({
				path: "/",
			});
		},
		async fetchVcode() {
			const phone = this.phone;
			if (!phone) {
				this.$notify({
					message: "请填写手机号",
					color: "#ffffff",
				});
				return;
			}
			let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
			
			if (!reg_tel.test(phone)) {
				this.$notify({
					message: "请填写正确的手机号",
					color: "#ffffff"
				});
				return;
			}

			this.startReadSeconds();

			let res = await user.getVcode({
				phone: phone,
			});
			if (res.code == 200) {
				cookie.set("verification_key", res.data.verification_key);
				this.verification_key = res.data.verification_key;
			}
		},
		startReadSeconds() {
			this.sending = true;
			var timer = setInterval(() => {
				if (this.seconds == 0) {
					clearInterval(timer);
					timer = null;
					this.sending = false;
					this.seconds = 60;
					return;
				}
				this.seconds = this.seconds - 1;
			}, 1000);
		},
		toRegister() {
			this.$router.replace({
				path: "/register",
			});
		},
	},
};
</script>
<style>
.login_box .van-button--info {
	background-color: #ff5926;
	border: 1px solid #ff5926;
}
</style>
<style lang="less" scoped>
.login_box {
	padding: 30px;
	box-sizing: border-box;
	.title {
		text-align: left;
		font-size: 24px;
		font-weight: normal;
	}
	.tab_menu {
		font-size: 18px;
		padding: 20px 0;
		span {
			margin-right: 0;
			display: inline-block;
			position: relative;
			height: 40px;
			line-height: 40px;
			margin-right: 20px;
		}
		.active {
			&:after {
				position: absolute;
				content: " ";
				bottom: 0;
				left: 50%;
				transform: translate(-50%, 0);
				width: 30px;
				height: 2px;
				background-color: #ff5926;
			}
		}
	}
	.tab_content {
		width: 100%;
		.form {
			.form_item {
				width: 100%;
				display: flex;
				padding-top: 15px;
				align-items: center;
				border-bottom: 1px solid #cccccc;
				.pre {
					color: #ff5926;
					width: 80px;
					padding-right: 15px;
					box-sizing: border-box;
					text-align: right;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				input {
					flex: 1;
					width: 100%;
					border: none;
					padding: 15px;
					box-sizing: border-box;
				}
				.last {
					display: block;
					position: relative;
					height: 36px;
					width: 100px;
					font-size: 14px;
					text-align: center;
					line-height: 36px;
					box-sizing: border-box;
					&:after {
						position: absolute;
						content: " ";
						width: 1px;
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
	.bot_f {
		display: flex;
		padding: 15px;
		justify-content: space-between;
		font-size: 14px;
		color: #646464;
	}
}
</style>