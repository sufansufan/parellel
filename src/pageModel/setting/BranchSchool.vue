<template>
    <div class="table">
        <div class="handle-box">
            <el-cascader clearable
                    size="mini"
                    expand-trigger="click"
                    :options="location"
                    v-model="selectedLocation"
                    placeholder="选择学校"
                    change-on-select
                    @change="handleLocationChange">
            </el-cascader>
            <el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>
            <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="danger" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
           <!-- <div class="search-warp">
                <el-input v-model="select_word" placeholder="" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的姓名/手机号码"></el-input>
                <el-button type="primary" icon="search"  @click="search">搜索</el-button>
            </div>-->
        </div>
        <el-table :data="data" size="mini" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="organ_name" label="分校名称"></el-table-column>
            <el-table-column prop="parent_organ_name" label="所属学校"></el-table-column>
            <el-table-column prop="office_tel" label="联系电话"></el-table-column>
            <el-table-column prop="office_addr" label="地址"></el-table-column>
            <el-table-column prop="organ_leader_name" label="负责人"></el-table-column>
            <el-table-column prop="organ_leader_mobile" label="负责人电话"></el-table-column>

            <el-table-column prop="created_at" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="mini" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
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
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增分校</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">修改分校</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 :rules="rules"
                                 ref="ruleForm"
                                 label-width="100px"
                                 style="height: 400px;overflow-y: scroll;">
                            <el-form-item label="分校名称"  prop="organ_name">
                                <el-input v-model="ruleForm.organ_name"></el-input>
                            </el-form-item>
                            <el-form-item v-if="!changeTeamLayer" label="所属上级">
                                <el-cascader clearable
                                        expand-trigger="click"
                                        :options="location"
                                        v-model="organ_id2"
                                        change-on-select>
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="分校负责人">
                                <el-input v-model="ruleForm.organ_leader_name"></el-input>
                            </el-form-item>
                            <el-form-item label="负责人电话">
                                <el-input v-model="ruleForm.organ_leader_mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="分校电话">
                                <el-input v-model="ruleForm.office_tel"></el-input>
                            </el-form-item>
                            <el-form-item label="分校地址">
                                <el-input v-model="ruleForm.office_addr"></el-input>
                            </el-form-item>
                            <el-form-item label="商户编号">
                                <el-input v-model="ruleForm.merchant_no" pleasehold="网上支付需要用"></el-input>
                            </el-form-item>
                            <el-form-item label="开始运营日期">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.start_operate_time"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-radio-group v-model="ruleForm.status">
                                    <el-radio label="启用"></el-radio>
                                    <el-radio label="禁用"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                <el-button @click="addTeamLayer=!addTeamLayer">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
        </transition>

    </div>
</template>

<script>
    export default {
        data() {
            var checkNum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('容纳人数不能为空'));
                }
                setTimeout(() => {
                    if(isNaN(value)){
                        callback(new Error('请输入数字值'));
                    }else{
                        if(value>999|| value<1){
                            callback(new Error('容纳人数在1-999之间'));
                        }else{
                            callback();
                        }
                    }
                }, 500);
            };

            return {
                cur_page: 0, //页码
                cur_limit:10, //每次请求的数据数
                count:0, //数据总量
                organId:"",
                organName:"",
                subject:"",
                select_word:"",  //搜索的值
                organ_id2:[], //新增组件内的学校id,

                dataList:[{ //渲染列表信息
                    organ_level:3,
                    parent_organ_name:"croom_name",
                    organ_id:"organ_id",
                    organ_name:"organ_name",
                    office_addr:1222222222,
                    merchant_no:"equipment",
                    subject:"a,吧,才]",
                    status:true,
                }], //请求的list
                location: [],  //分校导航
                selectedLocation: [], //选择分校
                multipleSelection: [], //选中行的集合


                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                ruleForm:{  //新增数据
                    organ_id:"",
                    organ_name:"",
                    organ_short_name:"",
                    organ_level:"",
                    parent_organ_id:"",
                    parent_organ_name:"",
                    child_organ_num:"",
                    organ_leader_name:"",
                    organ_leader_mobile:"",
                    office_tel:"",
                    office_addr:"",
                    merchant_no:"",
                    province_no:"",
                    province_name:"",
                    city_no:"",
                    city_name:"",
                    district_name:"",
                    district_no:"",
                    start_operate_time:"",
                    subject:"",
                    online_signup_enable:"",
                    status:"",
                    created_at:null,
                },
                //接收当前行的信息
                changeForm2:{},
                //表单校验规则
                rules: {
                    organ_name: [
                        { required: true, message: '请输入分校名称', trigger: 'blur' },
                    ]
                },
            }
        },
        //实例创建完成后被立即调用
        created() {
            const self= this;
            //查询区域导航
            this.Util.queryAreaNav(self,3,function () {self.getData()});
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
                    if(d.organ_level===2){
                        self.count++;
                        return d;
                    }
                });
            },

        },
        watch:{
            selectedLocation:function () {
                if(this.selectedLocation && this.selectedLocation.length &&this.selectedLocation.length>0){
                    this.organId =this.selectedLocation[this.selectedLocation.length-1];
                }
            },
            organ_id2:function () {
                console.log(this.organ_id2);
                if(this.organ_id2 && this.organ_id2.length &&this.organ_id2.length>0){
                    console.log(this.organ_id2[this.organ_id2.length-1]);
                    this.ruleForm.parent_organ_id =this.organ_id2[this.organ_id2.length-1];
                }
            },
            /*select_word:function () {
                if((/^\d+$/).test(this.select_word) && this.select_word!==""){
                    this.teacherMobile = this.select_word;
                    this.teacherName=null
                }else if(this.select_word!==""){
                    this.teacherName= this.select_word;
                    this.teacherMobile =null
                }else{
                    this.teacherMobile =null;
                    this.teacherName=null
                }
            },*/
            changeForm2:function () {//修改的参数赋值
                if(this.changeForm2.status){
                    this.ruleForm.status="启用"
                }else{
                    this.ruleForm.status="禁用"
                }
                this.ruleForm.organ_id=this.changeForm2.organ_id;
                this.ruleForm.organ_name=this.changeForm2.organ_name;
                this.ruleForm.organ_short_name=this.changeForm2.organ_short_name;
                this.ruleForm.organ_level=this.changeForm2.organ_level;
                this.ruleForm.parent_organ_id=this.changeForm2.parent_organ_id;
                this.ruleForm.parent_organ_name=this.changeForm2.parent_organ_name;
                this.ruleForm.child_organ_num=this.changeForm2.child_organ_num;
                this.ruleForm.organ_leader_name=this.changeForm2.organ_leader_name;
                this.ruleForm.organ_leader_mobile=this.changeForm2.organ_leader_mobile;
                this.ruleForm.office_tel=this.changeForm2.office_tel;
                this.ruleForm.office_addr=this.changeForm2.office_addr;
                this.ruleForm.merchant_no=this.changeForm2.merchant_no;
                this.ruleForm.province_no=this.changeForm2.province_no;
                this.ruleForm.province_name=this.changeForm2.province_name;
                this.ruleForm.city_no=this.changeForm2.city_no;
                this.ruleForm.city_name=this.changeForm2.city_name;
                this.ruleForm.district_name=this.changeForm2.district_name;
                this.ruleForm.district_no=this.changeForm2.district_no;
                this.ruleForm.start_operate_time=this.changeForm2.start_operate_time;
                this.ruleForm.subject=this.changeForm2.subject;
                this.ruleForm.online_signup_enable=this.changeForm2.online_signup_enable;
                this.ruleForm.created_at=this.changeForm2.created_at;

            }

        },
        methods: {
            //获取数据
            getData(){
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page:this.cur_page, //页数
                    limit:this.cur_limit, //条目数

                    organId:this.organId,  //按电话号码搜索
                    organName:this.organName,  //按电话号码搜索
                    subject:this.subject,     //按名字搜索
                    organLevel:2,
                };
                console.log("查询分校发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.queryAdminOrgans,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("查询分校列表获取的对象",res.data);
                            //this.count = res.data.count;
                            this.dataList=res.data.adminOrgans;
                        }else{
                            console.error(res);
                            this.$message({
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
                            "id": row.organ_id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delAdminOrgan,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code ==="10000"){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                window.sessionStorage.removeItem("areaNav");
                                this.getData();
                            }else{
                                console.error(res);
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

            //删除全部
            delAll() { //批量删除按钮触发
                const self = this;
                if(this.multipleSelection.length>0) {
                    this.$confirm('此操作将永久删除这些名单, 是否继续?', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let delTeacher = [];
                        for (let i = 0, length = self.multipleSelection.length; i < length; i++) {
                            delTeacher.push({
                                id: self.multipleSelection[i].organ_id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:delTeacher
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delAdminOrgan,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    window.sessionStorage.removeItem("areaNav");
                                    this.getData();
                                }else{
                                    console.error(res);
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

            //搜索老师---刷新
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
                //this.resetForm("ruleForm");
                this.addTeamLayer = true;
                this.changeTeamLayer =false;
                //清空参数
                this.ruleForm.organ_id="";
                this.ruleForm.organ_name="";
                this.ruleForm.organ_short_name="";
                this.ruleForm.organ_level="";
                this.ruleForm.parent_organ_id="";
                this.ruleForm.parent_organ_name="";
                this.ruleForm.child_organ_num="";
                this.ruleForm.organ_leader_name="";
                this.ruleForm.organ_leader_mobile="";
                this.ruleForm.office_tel="";
                this.ruleForm.office_addr="";
                this.ruleForm.merchant_no="";
                this.ruleForm.province_no="";
                this.ruleForm.province_name="";
                this.ruleForm.city_no="";
                this.ruleForm.city_name="";
                this.ruleForm.district_name="";
                this.ruleForm.district_no="";
                this.ruleForm.start_operate_time="";
                this.ruleForm.subject="";
                this.ruleForm.online_signup_enable="";
                this.ruleForm.status="";
                this.ruleForm.created_at="";
            },
            //新增/修改时候参数判断-转换
            varJug(obj){
                let self = this;
                let o = obj;

                o.organ_level=2; //分校得级别标识符
                if(o.status==="启用"){
                    o.status=true;
                }else {
                    o.status = false;
                }
                if(o.start_operate_time){
                    o.start_operate_time = (new Date(o.start_operate_time)).getTime();
                }
                return o
            },

            //新增--提交
            submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            adminOrgan:this.varJug(this.ruleForm)
                        };
                        console.log("新增分校发起请求的参数",objData);
                        this.$axios.post(this.GlobalVal.httpLink.editAdminOrgan,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("新增分校获取的对象",res.data);
                                    self.addTeamLayer = false;
                                    if(this.changeTeamLayer){
                                        self.$message({
                                            type:"success",
                                            message:"修改成功"
                                        });
                                    }else{
                                        self.$message({
                                            type:"success",
                                            message:"新增成功"
                                        });
                                    }
                                    window.sessionStorage.removeItem("areaNav");
                                    self.getData();
                                }else{
                                    console.error(res);
                                    self.$message({
                                        type:"error",
                                        message:res.data.errmsg
                                    })
                                }
                            },
                            res=>{
                                self.$message("请求失败")
                            }
                        )
                    } else {
                        return false;
                    }
                });
            },
            //修改按钮事件
            handleEdit(index, row) {
                this.changeTeamLayer =true;
                this.addTeamLayer = true;
                this.changeForm2= row;
            },
            //新增/修改分校等级--重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
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
        width: 600px;
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
        float: right;
    }
    .search-warp{
        display: inline-block;
        float: right;
    }
    .handle-box {
        margin-bottom: 20px;
    }


    .handle-input {
        width: 300px;
        display: inline-block;
    }

</style>
