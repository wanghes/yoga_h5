<template>
    <div class="wrap admin">
        <van-tabbar v-model="active" active-color="#FF5926" @change="onChange" inactive-color="#000">
            <van-tabbar-item icon="home-o">收入汇总</van-tabbar-item>
            <van-tabbar-item icon="wap-home-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>


export default {
	data() {
		return {
			active: 0
		};
	},
	mounted() {

		this.fetchVenues();
		
	},
	methods: {
        onChange() {

        },
		async fetchVenues() {
			
		}
	},
};
</script>
<style>
.home .van-swipe__indicators {
	bottom: 140px;
}
</style>
<style lang="less" scoped>
.home {
	width: 100%;
	position: relative;
}
</style>