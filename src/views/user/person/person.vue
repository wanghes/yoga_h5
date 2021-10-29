<template>
    <div class="wrap person_box">
        <div class="form">
            <div class="item">
                <div class="left" v-if="requestStatus">
                    <img class="head" v-if="user.head" :src="user.head" alt="">
                    <img class="head" v-else :src="head" alt="">
                </div>
				<div class="left" v-else>
                    <span class="headBox"></span>
                </div>
                <div class="right" @click="showHeadModal">
                    <span class="text">更换头像</span>
                    <span class="arrow"></span>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <span class="label">昵称</span>
                </div>
                <div class="right" @click="showNickname = true">
                    <span class="text">{{user.name ? user.name : "还没有设置昵称"}}</span>
                    <span class="arrow"></span>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <span class="label">性别</span>
                </div>
                <div class="right" @click="showSex = true">
                    <span class="text">{{user.sex == 1 ? "男" : "女"}}</span>
                    <span class="arrow"></span>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <span class="label">生日</span>
                </div>
                <div class="right" @click="showBirthday = true">
                    <span class="text">{{user.birthday ? user.birthday : "还没有设置生日"}}</span>
                    <span class="arrow"></span>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <span class="label">所在地</span>
                </div>
                <div class="right" @click="showAddress = true">
                    <span class="text">{{user.address ? user.address: "还没设置地址"}}</span>
                    <span class="arrow"></span>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <span class="label">注册时间</span>
                </div>
                <div class="right">
                    <span class="text">{{user.create_time && user.create_time.slice(0, 10)}}</span>
                </div>
            </div>
            <div style="margin-top: 50px">
                <van-button round block type="primary" @click="submit" native-type="submit">保 存</van-button>
            </div>
        </div>

        <van-dialog v-model="showNickname" title="昵称修改" show-cancel-button>
            <br>
            <van-cell-group>
                <van-field v-model="user.name" placeholder="请输入昵称" label="昵称" />
            </van-cell-group>
            <br>
        </van-dialog>

        <van-dialog v-model="showSex" title="性别修改" show-cancel-button>
            <br>
            <van-radio-group v-model="user.sex">
                <van-radio :name="1">男</van-radio>
                <van-radio :name="2">女</van-radio>
            </van-radio-group>
            <br>
        </van-dialog>

        <van-popup v-model="showBirthday" position="bottom">
            <van-datetime-picker @cancel="showBirthday = false" @confirm="okData" v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" :formatter="formatter" />
        </van-popup>
        <van-popup v-model="showAddress" position="bottom">
            <van-area title="选择地址" :area-list="areaList" :columns-placeholder="['请选择', '请选择', '请选择']" @confirm="confirmArea" @cancel="showAddress = false" />
        </van-popup>
        <van-popup v-model="showHead" closeable position="bottom" :style="{ height: '50%' }">
            <van-uploader :after-read="afterRead" />
        </van-popup>
    </div>
</template>

<script>
import { cookie, dateFormat } from "@/utils/index";
const user = require("@/api/user");
const head = require("@/assets/img/head.png");
import { areaList } from "@vant/area-data";

export default {
	data() {
		return {
			head,
			showNickname: false,
			showSex: false,
			showHead: false,
			showBirthday: false,
			showAddress: false,
			user: {},
			areaList,
			currentDate: new Date(),
			minDate: new Date(1950, 0, 1),
			maxDate: new Date(2025, 10, 1),
			requestStatus: false
		};
	},
	mounted() {
		let user_id = cookie.get("user_id");
		this.fetchData(user_id);
	},
	methods: {
		async afterRead(fileObj) {
			// 此时可以自行将文件上传至服务器
			var form = new FormData();
			form.append("file", fileObj.file);
			let res = await user.uploadHead(form);
            this.user.head = res.data.data.imagePath;
			this.showHead = false;
		},
		showHeadModal() {
			this.showHead = true;
		},
		async fetchData(user_id) {
			let res = await user.getUser({
				id: user_id,
			});
			if (res.code == 200) {
				this.user = res.data;
				this.requestStatus = true;
			}
		},
		formatter(type, val) {
			if (type === "year") {
				return `${val}年`;
			} else if (type === "month") {
				return `${val}月`;
			} else if (type === "day") {
				return `${val}日`;
			}
			return val;
		},
		async submit() {
			const { name, sex, birthday, head, address, id } = this.user;

			let res = await user.updateInfo({
				id,
				name,
				sex,
				birthday,
				address,
				head
			});

			if (res.code == 200) {
				this.$notify({ type: "success", message: res.msg });
				setTimeout(() => {
					this.$router.push({
						path: "/my",
					});
				}, 1000);
			}
		},
		okData(value) {
			let day = dateFormat("YYYY-mm-dd", value);
			this.showBirthday = false;
			this.user.birthday = day;
		},
		confirmArea(values) {
			this.user.address = values
				.filter(item => !!item)
				.map(item => item.name)
				.join("-");
			this.showAddress = false;
		},
	},
};
</script>

<style lang="less" scoped>
.form {
	padding: 0 15px;
	box-sizing: border-box;
	.item {
		display: flex;
		min-height: 50px;
		padding: 20px 10px;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		position: relative;
		&:after {
			content: " ";
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 1px;
			background-color: #ccc;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
		.left {
			.label {
				color: #000;
			}
			.head {
				width: 60px;
				height: 60px;
				border-radius: 30px;
			}
			.headBox{
				width: 60px;
				height: 60px;
				display: block;
			}
		}
		.right {
			.text {
				margin-right: 10px;
				color: #999;
			}
			.arrow {
				display: inline-block;
				width: 7px;
				height: 7px;
				border-top: 1px solid #ccc;
				border-right: 1px solid #ccc;
				transform: rotate(45deg);
			}
		}
	}
}
</style>