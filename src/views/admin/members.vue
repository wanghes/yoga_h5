<template>
    <div class="wrap admin">
        <div class="total">共有 {{total}} 个会员</div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell class="van-cell2" v-for="item in list" :key="item.id">
                <div class="item">
                    <div class="left">
                        <van-image round fit="head" :src="item.head"></van-image>
                    </div>
                    <div class="center">
                        <h3 class="title">
                            {{item.username}}
                        </h3>
                        <span class="time">{{item.create_time}}</span>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import { dateFormat } from "@/utils/index";
const venues = require("@/api/venues");
import { cookie } from "@/utils/index";

export default {
	data() {
		return {
			loading: false,
			finished: false,
			list: [],
			total: 0,
			pageSize: 10,
			currentPage: 1,
		};
	},
	created() {},
	methods: {
		onLoad() {
			this.fetchData(1);
		},
		async fetchData() {
			let admin_user_id = cookie.get("admin_user_id");
			let res = await venues.fetchMembers({
				admin_user_id,
				page: this.currentPage,
				pageSize: this.pageSize,
			});

			if (res.code == 200) {
				this.loading = false;
				this.total = res.data.total;

				if (this.list.length == 0) {
					this.list = res.data.list;
				} else {
					this.list = this.list.concat(res.data.list);
				}

				if (this.list.length == this.total) {
					this.finished = true;
				}

				this.currentPage = this.currentPage + 1;
			}
		},
	},
};
</script>

<style lang="less" scoped>
.admin {
	padding: 15px;
	box-sizing: border-box;
	.money {
		padding: 10px 15px;
		color: #999;
		font-size: 14px;
		box-sizing: border-box;
		border-bottom: 1px solid #efefef;
	}
    .total{

    }
    .item{
        display: flex;
        align-items: center;
        .left{
            width:60px;
            padding: 10px 10px 10px 0;
            box-sizing: border-box;
            img{
                width:50px;
            }
        }
        .center{
            width:200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            h3{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin: 0;
            }
        }
        .amount{
            flex: 1;
            text-align: right;
            font: 14px;
            color:green;
        }
        
    }
}


</style>