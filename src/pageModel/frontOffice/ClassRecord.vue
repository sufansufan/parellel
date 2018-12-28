<style>
    .class-query-screen .el-cascader{
        width:15.111%;
    }
    .class-query-screen .el-select{
        width:10.111%;
    }
    .el-input-group__append, .el-input-group__prepend{
        border-radius: 0px !important;
    }
    .class-query .el-input-group__append{
        background-color: #fff;
    }

</style>
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
    }
    .transition-box {
        position: absolute;
        width: 600px;
        height: 580px;
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
    .fotter-warp{
        position: absolute;
        width: 600px;
        height: 50px;
        bottom: 0;
        right: 0;
        z-index: 10;
        background: #ffffff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        padding-left: 20px;
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
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .search-input{
        width: 400px;
    }

    .checkbox-warp{
        margin-top: 10px;
    }
    .class-query .el-checkbox__label{
        font-size: 12px;
    }
    .vertical-moulding{
        display: inline-block;
        width: 1px;
        height: 12px;
        background: #cccccc;
        position: relative;
        top: 1px;
        left: 12px;
    }
    .vertical-moulding+.el-checkbox {
        margin-left: 25px;
    }
</style>
<template>
    <div class="class-query table2">
        <el-table size="mini" :data="data"  stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="oldcampus_name" label="原校区"></el-table-column>
            <el-table-column prop="oldclass_name" label="在读班级名称" width="250"></el-table-column>
            <el-table-column prop="oldteacher_name" label="老师"></el-table-column>
            <el-table-column prop="oldclass_week_day" label="重复周期"></el-table-column>
            <el-table-column prop="oldtime_interval" label="上课时段" width="95"></el-table-column>
            <el-table-column prop="oldclassroom_name" label="教室"></el-table-column>
            <el-table-column prop="total_price" label="价格"></el-table-column>
            <el-table-column prop="oldsequence" label="调出课次"></el-table-column>
            <el-table-column prop="oldsequence_datestring" label="课次日期" width="95"></el-table-column>
            <el-table-column prop="newcampus_name" label="现校区"></el-table-column>
            <el-table-column prop="newclass_name" label="调入的班级名称" width="250"></el-table-column>
            <el-table-column prop="newteacher_name" label="老师"></el-table-column>
            <el-table-column prop="newclass_week_day" label="重复周期"></el-table-column>
            <el-table-column prop="endtime_interval" label="上课时段" width="95"></el-table-column>
            <el-table-column prop="newclassroom_name" label="教室"></el-table-column>
            <el-table-column prop="newsequence" label="调入课次"></el-table-column>
            <el-table-column prop="newsequence_datestring" label="课次日期" width="95"></el-table-column>
            <el-table-column prop="staff_name" label="操作人"></el-table-column>
            <el-table-column prop="operate_time" label="操作时间" width="95"></el-table-column>
           <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.remark === null" size="mini" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">取消调课
                    </el-button>
                    <el-button v-else size="mini" disabled type="info">已取消</el-button>
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
        <!--添加/修改弹出框-->
    </div>
</template>

<script>
    import vLessonsingle from "./LessonSingle.vue"
    import vPayfees from "./PayFees.vue"
    export default {
        components:{
            vLessonsingle,
            vPayfees
        },
        data() {
            return {
                cur_page: 0, //页码
                cur_limit:10, //每次请求的数据数
                count:0, //数据总量
                organId:null, // 机构id
                //搜索日期
                startTime:"", //开始日期
                endTime:"", //结束日期
                //搜索久条件
                selectTeacherOrClass:"teacher",
                className:"", //班级名称
                teacherName:"", //老师名字
                teacherMobile:"", //老师电话
                select_word:"",  //搜索的值
                oldParticularYear:"",//旧班级年份
                oldSeason:"",//旧班级季节暑假，秋季，寒假，春季
                oldPeriods:"",//旧班级期别
                oldGrade:"",//旧班级适用年级，一年级，二年级等
                oldSubject:"",//旧班级科目，数学，物理等
                oldProjectType:"",//旧班级项目类型：长期，短期，公益，考试等
                oldClassType:"",//旧班级班型，超常，培优等
                oldTeacherOrClassName:"",//旧教师或班级姓名
                oldCampusName:"",//旧班级校区名称
                oldCampusId:"",//旧班级校区id

                //搜索新条件
                newParticularYear:"",//新班级年份
                newSeason:"",//新班级季节暑假，秋季，寒假，春季
                newPeriods:"",//新班级期别
                newGrade:"",//新班级适用年级，一年级，二年级等
                newSubject:"",//新班级科目，数学，物理等
                newProjectType:"",//新班级项目类型：长期，短期，公益，考试等
                newClassType:"",//新班级班型，超常，培优等
                newTeacherOrClassName:"",//新教师或班级姓名
                newCampusName:"",//新班级校区名称
                newCampusId:"",//新班级校区id

                //变量
                role_name:"",
                status:"",
                organ_id2:[], //新增组件内的学校id,
                dataList:[], //请求的list
                roleIds:[],
                location: [],  //校区导航
                oldtime_interval:"", //旧时间段
                newtime_interval:"", //新时间段
                selectedLocation: [], //选择校区
                selectedLocation1: [], //
                multipleSelection: [], //选中行的集合
                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                //表单校验规则
                rules: {
                    class_name: [
                        { required: true, message: '请输入班级名称', trigger: 'blur' },
                    ]
                },

            }
        },
        //实例创建完成后被立即调用
        created() {
            const self= this;
            this.Util.queryAreaNav(self,undefined,function(){self.getData()});
            this.Util.querySysconst(self,"006",this.$store.state.SeasonOptions);//查询季节
            this.Util.querySysconst(self,"009",this.$store.state.PeriodsOptions);//查询期别
            this.Util.querySysconst(self,"101",this.$store.state.GradeOptions);//查询年级
            this.Util.querySysconst(self,"100",this.$store.state.SubjectOptions);//查询科目
            this.Util.querySysconst(self,"002",this.$store.state.CourseTypeOptions);//查询类别/课型
            this.Util.querySysconst(self,"003",this.$store.state.ClassTypeOptions);//查询班型
            this.Util.querySysconst(this,"007",this.$store.state.DepartmentOptions);//查询学部
            self.location = self.$store.state.location;
            self.organId=self.$store.state.organId;
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
                    d.turn_class_time = self.Util.TimeCycle(d.turn_class_time,'ymd');
                    d.operate_time = self.Util.TimeCycle(d.operate_time,'ymd');
                    d.oldtime_interval = d.oldstart_time +'-'+ d.oldend_time;
                    d.endtime_interval = d.newstart_time +'-'+ d.newend_time;
                    d.adjust_time = d.newsequence - d.oldsequence;
                    return d;
                });
            },

        },
        watch:{
            selectedLocation:function () {
                if(this.selectedLocation && this.selectedLocation.length &&this.selectedLocation.length>0){
                    this.oldCampusId =this.selectedLocation[this.selectedLocation.length-1];
                    this.getData();
                }
            },
            selectedLocation1:function () {
                if(this.selectedLocation && this.selectedLocation.length &&this.selectedLocation.length>0){
                    this.newCampusId =this.selectedLocation[this.selectedLocation.length-1];
                    this.getData();
                }
            },

            organ_id2:function () {
                console.log(this.organ_id2);
                if(this.organ_id2 && this.organ_id2.length &&this.organ_id2.length>0){
                    console.log(this.organ_id2[this.organ_id2.length-1]);
                    this.ruleForm.parent_organ_id =this.organ_id2[this.organ_id2.length-1];
                }
            },
            select_word:function () {
                const self = this;
                self.teacherName = self.select_word;
            },
            oldParticularYear:function(){
                this.getData();
            },
            oldSeason:function(){
                this.getData();
            },
            oldPeriods:function(){
                this.getData();
            },
            oldGrade:function(){
                this.getData();
            },
            oldSubject:function(){
                this.getData();
            },
            oldProjectType:function(){
                this.getData();
            },
            oldClassType:function () {
                this.getData();
            },
            newParticularYear:function () {
                this.getData();
            },
            newSeason:function () {
                this.getData();
            },
            newPeriods:function () {
                this.getData();
            },
            newGrade:function () {
                this.getData();
            },
            newSubject:function () {
                this.getData();
            },
            newProjectType:function () {
                this.getData();
            },
            newClassType:function () {
                this.getData();
            },
            startTime:function(){
                this.getData();
            },
            endTime:function () {
                this.getData();
            }
        },
        methods: {
            //获取数据
            getData(){
                const self =this;
                let objData={
                    source:this.GlobalVal.constants.source,  //请求方式   Wechat，Android，PC，IOS
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page:this.cur_page, //页数
                    limit:this.cur_limit, //条目数
                    studentId:this.$store.state.chooseStudentInfo.student_id, //学生id
                    startTime:this.startTime,//转班时间开始范围
                    endTime:this.endTime,//转班时间结束范围
                    oldParticularYear:this.oldParticularYear,//旧班级年份
                    oldSeason:this.oldSeason,//旧班级季节暑假，秋季，寒假，春季
                    oldPeriods:this.oldPeriods,//旧班级期别
                    oldGrade:this.oldGrade,//旧班级适用年级，一年级，二年级等
                    oldSubject:this.oldSubject,//旧班级科目，数学，物理等
                    oldProjectType:this.oldProjectType,//旧班级项目类型：长期，短期，公益，考试等
                    oldClassType:this.oldClassType,//旧班级班型，超常，培优等
                    oldTeacherOrClassName:this.oldTeacherOrClassName,//旧教师或班级姓名
                    oldCampusName:this.oldCampusName,//旧班级校区名称
                    oldCampusId:this.oldCampusId,//旧班级校区id
                    newParticularYear:this.newParticularYear,//新班级年份
                    newSeason:this.newSeason,//新班级季节暑假，秋季，寒假，春季
                    newPeriods:this.newPeriods,//新班级期别
                    newGrade:this.newGrade,//新班级适用年级，一年级，二年级等
                    newSubject:this.newSubject,//新班级科目，数学，物理等
                    newProjectType:this.newProjectType,//新班级项目类型：长期，短期，公益，考试等
                    newClassType:this.newClassType,//新班级班型，超常，培优等
                    newTeacherOrClassName:this.newTeacherOrClassName,//新教师或班级姓名
                    newCampusName:this.newCampusName,//新班级校区名称
                    newCampusId:this.newCampusId,//新班级校区id

                };
                //搜索框中的选择老师或者是班级搜索
                if(this.selectTeacherOrClass ==="class"){
                    //objData.className=this.select_word;
                    //objData.teacherName="";
                }else{
                    //objData.className="";
                    //objData.teacherName=this.select_word;
                }
                console.log("查询班级发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.queryChangeClassScheduleHistory,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("查询班级列表获取的对象",res.data);
                            self.count = res.data.count;
                            self.dataList=res.data.turnClassHistories;
                        }else{
                            console.error(res);
                            /*self.$message({
                                type:"error",
                                message:res.data.errmsg
                            })*/
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

            //删除事件
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        delList:[{
                            "id": row.class_id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delClassMag,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code ==="10000"){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getData();
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
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除操作'
                    });
                });
            },
            //下架事件
            handleDown(index, row) {
                const self = this;
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    classId:row.class_id, //班级ID
                    status:false //boolean, true:上架， false:下架
                };
                console.log("下架事件发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.changeClassStatus,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code ==="10000"){
                            this.$message({
                                type: 'success',
                                message: '下架成功!'
                            });
                            self.getData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.errmsg
                            });
                        }
                    },
                    res=>{
                        this.$message({
                            type: 'error',
                            message: "操作失败"
                        });
                    }
                );
            },
            //删除全部
            delAll() { //批量删除按钮触发
                const self = this;
                if(this.multipleSelection.length>0) {
                    this.$confirm('此操作将永久删除这些名单, 是否继续?', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let delArr = [];
                        for (let i = 0, length = self.multipleSelection.length; i < length; i++) {
                            delArr.push({
                                id: self.multipleSelection[i].class_id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:delArr
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delClassMag,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getData();
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
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '没有选中任何项'
                    });
                }
            },

            //将选中的行存储在一个变量中
            handleSelectionChange(val) {
                this.multipleSelection = val;
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

            //搜索班级---刷新
            search() {
                if(this.select_word===""){
                    this.$message({
                        type: 'error',
                        message: '填写要搜索的姓名或电话'
                    });
                }
                this.getData();
            },
            //新增按钮事件
            handleAdd(){
                this.$router.push({
                    path:"/editClass",
                    query: {
                        handle: "add",
                    }
                });
            },


            //修改按钮事件
            handleEdit(index, row) {
                let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        id: row.id
                    };
                    const loading = this.$Loading();
                    this.$axios.post(this.GlobalVal.httpLink.cancleChangeCourseSchedule,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code==="10000"){
                                this.$message.success('操作成功');
                                this.getData();
                            }else{
                                console.error(res);
                                this.$message({
                                    type:"error",
                                    message:res.data.errmsg
                                })
                            }
                            loading.close();
                        },
                        res=>{
                            loading.close();
                            this.$message("请求失败");
                        }
                    )
            },
            //新增/修改班级等级--重置--暂时不用
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //搜索框动态提示内容
            queryTeacherOrClassname(queryString, cb){
                if(this.selectTeacherOrClass==="class"){
                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        page:1, //页数
                        limit:10, //条目数
                        className:queryString , //班级名字
                    };
                    console.log("查询班级搜索提出内容发起请求的参数",objData);
                    this.$axios.post(this.GlobalVal.httpLink.queryClassName,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code==="10000"){
                                console.log("查询班级搜索提出内容获取的对象",res.data);
                                cb(res.data.res);
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
                }else if(this.selectTeacherOrClass==="teacher"){
                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        page:1, //页数
                        limit:10, //条目数
                        teacherName:queryString , //班级名字
                    };
                    console.log("查询老师搜索提示内容发起请求的参数",objData);
                    this.$axios.post(this.GlobalVal.httpLink.queryTeacherName,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code==="10000"){
                                console.log("查询老师搜索提示内容获取的对象",res.data);
                                cb(res.data.res);
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
                }

            },
        }
    }
</script>
