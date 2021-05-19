<template>
    <div class="wrap">
        <div class="title"><span>在售卡项</span></div>
        <div class="list">
            <div class="item">
                <div class="left">
                    <img src="http://assets.yoga.com/storage/group_purchase_cover/39/986d20775860e638a48ca9dea04f77.png" alt="">
                </div>
                <div class="right">
                    <div class="right_top">
                        <span>100元储值卡</span>
                        <em>￥100.00</em>
                    </div> 
                    <div class="right_bottom">
                        <div class="right_item">
                            <span>类型：私教卡</span>
                            <span>有效期：100天</span>
                        </div>
                        <div class="right_item">
                            <span>课程：次卡</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	data() {
		return {};
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		async fetchData() {},
	},
};
</script>

<style lang="less" scoped>
.wrap{
    padding: 15px;
}
.title{
    font-size: 16px;
    color: #000;
    font-weight: bold;
    padding: 0 0 15px 0; 
    border-bottom: 1px solid #efefef;
    span{
        display: inline-block;
        padding-left: 10px;
        border-left: 3px solid #FF5926;
    }
}
.list{
    padding: 0;
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #efefef;
        .left{
            width:30%;
            margin-right: 15px;
           img{
               width:100%;
           }
        }
        .right{
            flex: 1;
            .right_top{
                padding-bottom: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                span{
                    font-size: 16px;
                }
                em{
                    font-size: 16px;
                    font-weight: bold;
                    color:#FF5926;
                    font-style: normal;
                }
            }
            .right_item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                color: #666;
            }
        }
    }
}
</style>