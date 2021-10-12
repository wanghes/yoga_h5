<template>
    <div class="wrap register_box">
        <!-- <div class="top">
            <img class="home" @click="toHome" :src="home" alt="">
        </div> -->

        <h3 class="title">送您VIP瑜伽课，跟我一起打卡吧</h3>
        <div class="info">只用于团体消费，不用于收费早课、孕产及精进类私教课</div>
        <img class="theme" :src="yoga_register" alt="">
        <div class="head">
            <img :src="head" alt="">
        </div>
        <div class="form">
            <div class="form_item">
                <label for="ground">场馆</label>
                <input id="ground" disabled placeholder="这是一个测试" :value="venues.name" type="text" />
            </div>
            <div class="form_item">
                <label for="name">姓名</label>
                <input id="name" placeholder="请输入您的姓名" v-model="name" type="text" />
            </div>
            <div class="form_item">
                <label for="phone">手机号</label>
                <input id="phone" placeholder="请输入您的手机号" v-model="phone" type="text" />
            </div>

            <div class="form_item">
                <label for="vcode">验证码</label>
                <div class="v_code">
                    <input id="vcode" placeholder="请输入验证码" v-model="vcode" type="text" />
                    <span class="send_btn" v-if="!sending" @click="fetchVcode">获取验证码</span>
                    <span class="send_btn send_btn_2" v-else>还剩 {{seconds}} 秒</span>
                </div>
            </div>

            <div class="form_item">
                <label for="guwen">专业瑜伽顾问</label>
                <span id="guwen" @click="showPicker = true">{{adviser_name}}</span>
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar :columns="advisers" value-key="name" @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup>
            </div>
            <div style="margin-top: 16px">
                <van-button round block type="info" @click="doRegister" native-type="submit">提交</van-button>
                <van-divider />
                <van-button round block @click="toHome">随便看看</van-button>
            </div>

            <div class="bot">
                <div>已有账号，<span @click="toLogin">在此登录</span></div>
                <div>点击注册即表示同意<a>用户注册协议</a></div>
            </div>
        </div>
    </div>
</template>

<script>
import yoga_register from "@/assets/img/yoga_register.png";
import home from "@/assets/img/home.png";
import head from "@/assets/img/head.png";
import { cookie } from "@/utils/index";
const adviser = require("@/api/adviser");
const user = require("@/api/user");
const venues = require("@/api/venues");
export default {
	data() {
		return {
			phone: "",
			name: cookie.get("weixin_nickname") || "",
			head: cookie.get("weixin_headimgurl"),
			openid: cookie.get("weixin_openid") || "",
			vcode: "",
			yoga_register,
			home,
			showPicker: false,
			adviser_id: "",
			advisers: [],
			adviser_name: "请选择为您服务的顾问（选填）",
			venues: {},
			verification_key: "",
			sending: false,
			seconds: 60,
		};
	},
	mounted() {
		this.fetchVenues();
		this.fetchAdvisers();
		this.verification_key = cookie.get("verification_key");
	},
	methods: {
		async fetchAdvisers() {
			let res = await adviser.allList();
			if (res.code == 200) {
				this.advisers = res.data;
			}
		},
		async fetchVenues() {
			let res = await venues.query();
			if (res.code == 200) {
				this.venues = res.data;
			}
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
		async doRegister() {
			let phone = this.phone;
			let vcode = this.vcode;
			let adviser = this.adviser_id;
			let name = this.name;
			let head = this.head;
			let openid = this.openid;

			if (!name) {
				this.$notify({
					message: "请填写用户姓名",
				});
				return;
			}

			if (!phone) {
				this.$notify({
					message: "请填写手机号",
				});
				return;
			}

			if (!vcode) {
				this.$notify({
					message: "请填写短信验证码",
				});
				return;
			}

			let res = await user.register({
				phone,
				name,
				vcode,
				adviser,
				openid,
				head,
				verification_key: this.verification_key,
			});

			if (res.code == 200) {
				let { init_password } = res.data;
				this.$router.replace({
					path: "/login",
					query: {
						init_password,
					},
				});
			}
		},
		onConfirm(value) {
			this.adviser_name = value.name;
			this.adviser_id = value.id;
			this.showPicker = false;
		},
		toHome() {
			this.$router.replace({
				path: "/",
			});
		},
		toLogin() {
			this.$router.replace({
				path: "/login",
			});
		},
	},
};
</script>
<style>
.register_box .van-button--info {
	background-color: #ff5926;
	border: 1px solid #ff5926;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
	color: #646464;
	font-size: 14px;
}
</style>

<style lang="less" scoped>
.register_box {
	font-size: 14px;
	display: flex;
	padding: 15px;
	flex-direction: column;
	.info {
		color: #ff5926;
		font-size: 12px;
		text-align: center;
		margin-bottom: 20px;
	}
	.title {
		color: #000;
		margin: 0;
		padding: 0;
		line-height: 40px;
		text-align: center;
		font-size: 18px;
	}
	.head {
		text-align: center;
		padding: 25px 0 0;
		img {
			width: 70px;
			height: 70px;
			border-radius: 50%;
		}
	}
	.form {
		padding: 0 15px;
	}
	.form_item {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		label {
			margin-top: 20px;
			font-size: 16px;
		}
		input {
			border: none;
			padding: 15px 15px 15px 0;
		}
		border-bottom: 1px solid #cccccc;
	}
	.v_code {
		display: flex;
		flex-direction: row;
		input {
			flex: 1;
		}
		.send_btn {
			display: block;
			width: 100px;
			height: 36px;
			line-height: 36px;
			border-radius: 20px;
			border: 1px solid #cccccc;
			color: #999;
			text-align: center;
		}
		.send_btn_2 {
			border: none;
			border-radius: 0;
		}
	}
	.bot {
		padding: 15px 0;
		text-align: center;
		color: #999;
		line-height: 32px;
		span {
			color: #ff5926;
		}
		a {
			color: #000;
		}
	}
	.top {
		display: flex;
		padding: 15px;
		justify-content: space-between;
	}
	.home {
		width: 18px;
		height: 16px;
	}
	.theme {
		width: 100%;
	}

	#guwen {
		display: block;
		height: 50px;
		line-height: 50px;
		color: #888;
	}
}
</style>
