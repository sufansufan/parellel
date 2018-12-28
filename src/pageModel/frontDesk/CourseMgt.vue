<template>
    <div>
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="项目类型" name="first">
                    <v-sysconst massage="ProjectType"></v-sysconst>
                </el-tab-pane>
                <el-tab-pane label="课程分类" name="second">
                    <v-sysconst massage="CourseType"></v-sysconst>
                </el-tab-pane>
                <el-tab-pane label="班型" name="third">
                    <v-sysconst massage="ClassType"></v-sysconst>
                </el-tab-pane>
                <el-tab-pane label="时间段管理" name="a">
                    <v-time-slot></v-time-slot>
                </el-tab-pane>
                <el-tab-pane label="上课日期模板" name="b">
                    <v-date-slot></v-date-slot>
                </el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>

<script>
    import vTimeSlot from './TimeSlot.vue';
    import vDateSlot from './DateSlot.vue';
    import vSysconst from './Sysconst.vue';
    export default {
        data() {
            return {
                activeName: 'second',
            }
        },
        components:{
            vTimeSlot,
            vDateSlot,
            vSysconst,
        },
        //实例创建完成后被立即调用
        created() {

        },
        //计算属性
        computed: {
        },
        watch:{
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
        }
    }
</script>

<style scoped>

</style>
