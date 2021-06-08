<template>
    <div class="wrap">
        <div class="title">申请的体验课</div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item.id">
                <div class="item">
                    <div class="left">
                        <span>{{item.course_name}}</span>
                        <span>{{item.apply_time}}</span>
                    </div>
                    <div class="right">
                        <van-tag v-if="item.status == 0" round type="primary">审核中</van-tag>
                        <van-tag v-else-if="item.status == 1" round type="success">审核通过</van-tag>
                        <van-tag v-else round type="danger">被驳回</van-tag>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { cookie } from "@/utils/index";
const course = require("@/api/course");

export default {
	data() {
		return {
			loading: false,
			finished: false,
            phone: cookie.get("user_phone") || "",
            list:[]
		};
	},
    mounted() {},
    methods: {
        async onLoad() {
            if (!this.phone) {
                this.$toast("没有获取到用户信息");
                return
            }
			let tiyanRes = await course.get_tiyan_list({
				phone: this.phone,
			});
			if (tiyanRes.code == 200) {
				this.list = tiyanRes.data;
                this.finished = true;
                this.loading = false;
			}
        }
    }
};
</script>

<style lang="less" scoped>
.title{
    padding: 15px;
    font-size: 16px;
    color: #333;
    background-color: aliceblue;
}
.item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        width:70%;
        span{
            &:first-child{
                margin-bottom: 5px;
            }
        }
    }
    .right{
        width:20%;
    }
}
</style>
