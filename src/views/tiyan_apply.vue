<template>
    <div class="wrap tiyan_box">
        <h3 class="title">申请体验课</h3>
        <van-divider />
        <van-form @submit="onSubmit">
            <van-field
                readonly
                clickable
                name="picker"
                :value="form.jigou"
                label="机构"
                placeholder="点击选择机构"
                @click="showJigouPicker = true"
                />
                <van-popup v-model="showJigouPicker" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="jigous"
                />
            </van-popup>
            <van-field
                readonly
                clickable
                name="course_id"
                :value="form.course_name"
                label="课程"
                placeholder="点击选择课程"
                @click="showCoursePicker = true"
                />
                <van-popup v-model="showCoursePicker" position="bottom">
                <van-picker
                    show-toolbar
                    @confirm="onConfirmCourse"
                    value-key="name"
                    :columns="courses"
                />
            </van-popup>
            <van-field
                readonly
                clickable
                name="start_time"
                :value="form.start_time"
                label="时间"
                placeholder="点击选择上课时间"
                @click="showTimePicker = true"
                />
                <van-popup v-model="showTimePicker" position="bottom">
                <van-picker
                    show-toolbar
                    @confirm="onConfirmTime"
                    :columns="times"
                />
            </van-popup>
            <van-field
                v-model="form.price"
                name="price"
                label="价格"
                disabled
                placeholder="价格"
            />
            <van-field
                v-model="form.username"
                name="username"
                label="姓名"
                placeholder="姓名必填"
                :rules="[{ required: true, message: '请输入姓名' }]"
            />
            <van-field
                v-model="form.phone"
                name="phone"
                label="手机"
                placeholder="手机必填"
                :rules="[{ required: true, message: '请输入手机' }]"
            />
            <van-field
                v-model="form.des"
                rows="4"
                autosize
                label="留言"
                type="textarea"
                maxlength="100"
                placeholder="请输入留言"
                show-word-limit
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">申请体验</van-button>
                <van-divider />
                <van-button round block type="default" @click="cancel">取 消</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
const icon_01 = require('@/assets/img/tiyan/01.png');
const icon_02 = require('@/assets/img/tiyan/02.png');
const icon_03 = require('@/assets/img/tiyan/03.png');
const icon_04 = require('@/assets/img/tiyan/04.png');
const icon_05 = require('@/assets/img/tiyan/05.png');
const icon_06 = require('@/assets/img/tiyan/06.png');
const icon_07 = require('@/assets/img/tiyan/07.png');
const icon_08 = require('@/assets/img/tiyan/08.png');
const icon_09 = require('@/assets/img/tiyan/09.png');

const course = require('@/api/course');
const user = require("@/api/user");
import { cookie } from "@/utils/index"
import { Toast } from 'vant';

export default {
    data() {
        return {
            icons: {
                icon_01,
                icon_02,
                icon_03,
                icon_04,
                icon_05,
                icon_06,
                icon_07,
                icon_08,
                icon_09
            },
            showJigouPicker: false,
            showCoursePicker: false,
            showTimePicker: false,
            times: [
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00'
            ],
            courses:[],
            jigous: ['北京瑜老师瑜伽馆'],
            form: {
                jigou: "北京瑜老师瑜伽馆",
                username: '',
                start_time: "",
                price: 0,
                phone: '',
                course_id: '',
                course_name: '',
                des: ''
            }
        }
    },
    mounted() {
        this.getCourse();
    },
    methods: {
        async getCourse() {
            let res = await course.get_all_course();
            if (res.code == 200) {
                this.courses = res.data;
            }
        },
        formatData(data){
            let newData = data.map(item => {
                return {
                    text: item.name
                }
            });
            return newData;
        },
        onConfirmTime(value, index) {
            this.form.start_time = value;
            this.showTimePicker = false;
        },
        onConfirmCourse(value, index) {
            // Toast(`当前值：${value.id}, 当前索引：${index}`);
            this.form.course_id = value.id;
            this.form.course_name = value.name;
            this.showCoursePicker = false;
        },
        cancel() {
            this.$router.replace({
                path: "/"
            })
        },
        async redirectLogin(values) {
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
        async onSubmit() {
            let {
                username,
                phone,
                course_id,
                price,
                start_time,
                des
            } = this.form;
            
            let res = await course.apply_tiyan({
                username,
                phone,
                course_id,
                price,
                start_time,
                des,
                new: true
            });

            if (res.code == 200) {
                Toast(res.msg);
                
                setTimeout(() => {
                    if (res.data.add) {
                        this.redirectLogin({
                            phone,
                            password: res.data.init_password
                        });
                    } else {
                        this.$router.replace({
                            path: "/"
                        });
                    }
                }, 1500);
            } else {
                console.log(this.form)
                console.log(res)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.wrap{
    display: flex;
    flex-direction: column;
    padding:20px;
    font-size: 14px;
    .title{
        font-size: 16px;
        color: #333;
        text-align: center;
    }
}

</style>
<style>
.tiyan_box .van-button--info{
    background-color: #FF5926;
    border: 1px solid #FF5926;
}
</style>