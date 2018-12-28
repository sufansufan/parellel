<template>
    <div class="table">
        <div class="student-info-warp">
            <div class="student-info">姓名: {{chooseStudent.student_name}}</div>
            <div class="student-info">学号: {{chooseStudent.student_no}}</div>
            <div class="student-info">学生电话: {{chooseStudent.student_mobile}}</div>
            <div class="student-info">年级: {{chooseStudent.student_grade}}</div>
            <div class="student-info btn">
                <router-link to="/student">重新选择学生</router-link>
            </div>
        </div>
        <div class="handle-box">
            <div class="screen">
                <el-cascader clearable
                        size="mini"
                        expand-trigger="click"
                        :options="location"
                        v-model="selectedLocation"
                        placeholder="学校不限"
                        change-on-select
                        @change="handleLocationChange">
                </el-cascader>
                <el-select v-model="projectType" size="mini" placeholder="课型不限">
                    <el-option
                            v-for="item in $store.state.CourseTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="grade" size="mini" placeholder="年级不限">
                    <el-option
                            v-for="item in $store.state.GradeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="subject" size="mini" placeholder="科目不限">
                    <el-option
                            v-for="item in $store.state.SubjectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="season" size="mini" placeholder="期别不限">
                    <el-option
                            v-for="item in $store.state.SeasonOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="classType" size="mini" placeholder="班型不限">
                    <el-option
                            v-for="item in $store.state.ClassTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>


                <el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>
            </div>
            <div>
                <div class="search-warp">
                    <el-input v-model="select_word" size="mini" placeholder="" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的任课老师"></el-input>
                    <el-button type="primary" icon="search" size="mini" @click="search">搜索</el-button>
                </div>
            </div>
        </div>
        <el-table size="mini" :data="data" border style="width: 100%" ref="multipleTable">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="class_name" label="班级名称"></el-table-column>
            <el-table-column prop="campus_name" label="校区"></el-table-column>
            <el-table-column prop="teacher_name" label="任课老师"></el-table-column>
            <el-table-column prop="start_end_time" label="时间段"></el-table-column>
            <el-table-column prop="start_date" label="上课日期"></el-table-column>
            <el-table-column prop="left_times" label="剩余科次"></el-table-column>
            <el-table-column prop="total_fee" label="费用"></el-table-column>
            <el-table-column prop="max_students_no" label="限额"></el-table-column>
            <el-table-column prop="signup_number" label="报名人数"></el-table-column>
            <el-table-column prop="payment_number" label="缴费人数"></el-table-column>
            <el-table-column prop="remain_number" label="剩余名额"></el-table-column>
            <el-table-column prop="waiting_number" label="候补人数"></el-table-column>
            <el-table-column label="操作" width="70">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleApply(scope.$index, scope.row)">报名</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                    :page-size="cur_limit"
                    :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                // option value
                chooseStudent:{}, //当前被学中的学生信息
                projectType:"",//项目类型 [长期，短期，公益，考试]等
                courseType:"", //课程类型，[小学数学，小升初专题]等
                classType:"",  //班型，[超常，培优]等
                subject:"",//科目，[数学，物理]等
                grade:"",  //适用年级，[一年级，二年级]等
                season:"", // 期别：[暑假，秋季，寒假，春季]等
                teacherName:null, //老师名字

                cur_page: 0, //页码
                cur_limit:10, //每次请求的数据数
                count:0, //数据总量
                organId:"",
                organName:"",
                select_word:"",  //搜索的值
                status:"",
                organ_id2:[], //新增组件内的学校id,
                dataList:[/*{
                    course_name:"test"
                }*/], //请求的list

                roleIds:[],

                location: [],  //校区导航
                selectedLocation: [], //选择校区
                multipleSelection: [], //选中行的集合

            }
        },
        //实例创建完成后被立即调用
        created() {
            const self= this;
            //查询区域导航
            this.Util.queryAreaNav(self,-1,function () {self.getData()});

            self.location = self.$store.state.location;
            self.organId=self.$store.state.organId;

            this.chooseStudent=this.$store.state.chooseStudent;

            this.Util.querySysconst(self,"002",this.$store.state.CourseTypeOptions);//
            this.Util.querySysconst(self,"101",this.$store.state.GradeOptions);//
            this.Util.querySysconst(self,"100",this.$store.state.SubjectOptions);//科目分类
            this.Util.querySysconst(self,"006",this.$store.state.SeasonOptions);//期别分类
            this.Util.querySysconst(self,"003",this.$store.state.ClassTypeOptions);//班型分类
            this.getData();
        },
        //计算属性
        computed: {
            //相当于过滤器
            data() {
                const self = this;
                if(!self.dataList){
                    return []
                }
                return self.dataList.filter(function (d) {

                    if(d.status){
                        d.statusStr = "启用"
                    }else{
                        d.statusStr = "禁用"
                    }
                    d.start_end_time = d.start_time+"-"+d.end_time;
                    return d;
                });
            },

        },
        watch:{
            selectedLocation:function () {
                if(this.selectedLocation && this.selectedLocation.length &&this.selectedLocation.length>0){
                    this.organId =this.selectedLocation[this.selectedLocation.length-1];
                }
            },
            select_word:function () {
                this.teacherName = this.select_word;
            },
        },
        methods: {
            //获取数据
            getData(){
                const self =this;
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page:this.cur_page, //页数
                    limit:this.cur_limit, //条目数
                    organId:this.organId, //
                    projectType:this.projectType,//项目类型 [长期，短期，公益，考试]等
                    courseType:this.courseType, //课程类型，[小学数学，小升初专题]等
                    classType:this.classType,  //班型，[超常，培优]等
                    subject:this.subject,//科目，[数学，物理]等
                    grade:this.grade,  //适用年级，[一年级，二年级]等
                    season:this.season, // 期别：[暑假，秋季，寒假，春季]等
                    teacherName:this.teacherName, //老师名字
                };
                console.log("查询班级发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.queryClass,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("查询班级获取的对象",res.data);
                            self.count = res.data.count;
                            self.dataList=res.data.pxxClasses;
                        }else{
                            console.error(res);
                            self.$message({
                                type:"error",
                                message:res.data.errmsg
                            })
                        }
                    },
                    res=>{
                        this.$message("请求失败")
                    }
                )
            },
            //重新选择了地区事件
            handleLocationChange(value){

            },
            //重新筛选函数
            screening(){
                this.getData();
            },

            //翻页导航栏
            handleCurrentChange(val) {
                this.cur_page = val-1;
                this.getData();
            },

            //每页显示数目发生变化
            handleSizeChange(val){
                this.cur_limit = val;
                this.getData();
            },

            //搜索用户---刷新
            search() {
                if(this.select_word===""){
                    this.$message({
                        type: 'error',
                        message: '填写要搜索的名称'
                    });
                }
                this.getData();
            },
            //报名
            handleApply(index,row){
                const self= this;
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    studentId:this.$route.query.student_id, //学生id
                    classId:row.class_id, //班级id
                    source:"PC"
                };
                this.$axios.post(this.GlobalVal.httpLink.studentSignUp,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code ==="10000"){
                            self.$message({
                                type: 'success',
                                message: '安排成功!'
                            });
                            self.$router.push({
                                path:"/student"
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.errmsg
                            });
                        }
                    },
                    res=>{
                        console.error(res);
                        this.$message({
                            type: 'error',
                            message: "操作失败"
                        });
                    }
                );

            },
        }
    }
</script>

<style scoped>

    .bg-layer{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
    .transition-box.change{
        height: 400px;
        min-height: 400px;
    }
    .transition-box {
        position: absolute;
        width: 600px;
        height: 480px;
        min-height: 480px;
        margin:auto;
        left: 0;
        bottom:0;
        top: 0;
        right: 0;
        border-radius: 4px;
        background-color: #ffffff;
        overflow-y: scroll;

        color: #fff;
        padding-top: 60px;
        padding-left:20px;
        padding-right: 20px;
        padding-bottom: 20px;
        box-sizing: border-box;
        z-index: 10;
    }

    .title-warp{
        position: absolute;
        width: 100%;
        height: 50px;
        top: 0px;
        right: 0;
        z-index: 10;
        background: #ffffff;
        -webkit-box-shadow: 0px 0px 3px #ccc;
        -moz-box-shadow: 0px 0px 3px #ccc;
        box-shadow: 0px 0px 3px #ccc;
    }
    .transition-box .el-cascader{
        width:100%;
    }
    .close-btn{
        position: absolute;
        color: #ff6808;
        font-size: 20px;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        line-height:40px;
        text-align: center;
    }
    .modify-title{
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        color: #666666;
        border-bottom:1px solid #cccccc;
        text-align: left;
        padding-left: 20px;
    }
    .handle-box {
        margin-bottom: 20px;
    }
    .search-warp{
        display: inline-block;
        /*float: right;*/
    }
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .screen{
        margin-bottom: 5px;
    }
    .student-info-warp{
        width: 100xp;
        height: 40px;
        clear: both;
    }
    .student-info{
        float: left;
        padding-right: 8px;
        line-height:40xp;
        color: #888888;
        font-size: 14px;
    }
    .student-info.btn{
        text-decoration:underline;
    }

</style>
