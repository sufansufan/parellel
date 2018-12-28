<template>
    <div>
        <inquire-list :chart="true"></inquire-list>
    </div>
</template>

<script>
    import InquireList from '../dataExam/inquireList.vue';
    const mixinObj = {
        created(){
            this.getData()
        },
        watch: {
           lineData (){

           }
        },
        methods: {// 设置数据
            setParams(staff = null) {
                this.objData = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page: this.page,
                    limit: this.limit,
                    school_ids: this.school_ids,
                    branch_school_ids: this.branch_school_ids,
                    campus_ids: this.campus_ids,
                    opeId: staff, // 操作人id
                    startDate: this.startAndEndDate.length
                    ? new Date(this.startAndEndDate[0]).getTime()
                    : "",
                    endDate: this.startAndEndDate.length
                    ? new Date(this.startAndEndDate[1]).getTime()
                    : "",
                    source: "PC"
                };
            },
            //获取数据
            getData(staff = null) {
                this.setParams(staff);
                this.$axios
                .post(
                this.GlobalVal.httpLink.queryStudentBusinessForECharts,
                JSON.stringify(this.objData)
                )
                .then(
                res => {
                    if (res.data.code === "10000") {
                    console.log("获取信息", res.data);
                    this.dataList = res.data.data.studentBusinessInfos;
                    this.dataList =
                        this.dataList &&
                        this.dataList.map(val => {
                        let grade = this.$store.state.GradeOptions.filter(
                            item => item.value === val.student_grade
                        );
                        val.student_grade = grade && grade[0].label;
                        return val;
                        });
                    this.count = res.data.data.count;
                    } else {
                    this.$message({
                        type: "error",
                        message: res.data.errmsg
                    });
                    }
                    this.loading = false;
                },
                res => {
                    this.loading = false;
                    this.$message("请求失败");
                }
                );
            },
        }
    }
    export default {
        components: {
            InquireList,
        },
    }
</script>

<style scoped>

</style>
