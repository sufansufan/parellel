<template>
    <div class="table">
        <div class="handle-box">
            <el-cascader clearable
                    size="mini"
                    expand-trigger="click"
                    :options="location"
                    v-model="selectedLocation"
                    placeholder="校区不限"
                    change-on-select
                    @change="handleLocationChange">
            </el-cascader>
            <!--<el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>-->
            <el-input placeholder="输入要搜索的姓名/手机号码" v-model="select_word" class="input-with-select" size="mini" @keyup.enter.native="search" :maxlength="12" style="width:250px;">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
           <!--  <div class="search-warp">
                <input v-model="select_word" size="mini" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的姓名/手机号码" maxlength="12">
                <i class="el-icon-search"  @click="search"></i>
            </div> -->

            <div class="button-right">
                <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
                <el-button type="danger" size="mini" icon="delete" class="handle-del mr10" @click="delAll" v-if="$route.path === '/userManagement'">批量删除</el-button>
                <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="resetPassword" v-if="$route.path === '/userManagement'">批量重置</el-button>
                <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="exportStaff" v-if="$route.path === '/userManagement'">导出</el-button>
            </div>
            <!--<div class="search-warp">
                <el-input v-model="select_word" size="mini" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的姓名/手机号码"></el-input>
                <el-button type="primary" size="mini" icon="search"  @click="search">搜索</el-button>
            </div>-->
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="staff_name" label="员工姓名"></el-table-column>
            <el-table-column prop="staff_mobile" label="用户电话"></el-table-column>
            <el-table-column prop="role_name" label="角色名字"></el-table-column>
            <el-table-column prop="staff_no" label="员工工号"></el-table-column>
            <el-table-column prop="statusStr" label="状态"></el-table-column>
            <el-table-column label="操作" :width="$route.path === '/userManagement' ? 300 : 100">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="mini" type="danger" v-if="$route.path === '/userManagement'"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button size="mini" type="primary" v-if="$route.path === '/userManagement'"
                               @click="resetPassword(scope.$index, scope.row)">重置密码
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :current-page="cur_page + 1"
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
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增用户</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">编辑用户</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 :rules="rules"
                                 ref="ruleForm"
                                 label-width="100px"
                                 style="height: 560px;overflow-y: auto;margin-top:20px;padding-right:20px;margin-right:-20px;">
                            <el-form-item label="员工姓名"  prop="staff_name" maxlength="12">
                                <el-input v-model="ruleForm.staff_name" maxlength="12"></el-input>
                            </el-form-item>
                            <el-form-item label="员工工号"  prop="staff_name" maxlength="12">
                                <el-input v-model="ruleForm.staff_no" maxlength="12"></el-input>
                            </el-form-item>
                             <el-form-item label="员工手机" prop="staff_mobile">
                                <el-input v-model="ruleForm.staff_mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="员工用户名" >
                                <el-input v-model="ruleForm.staff_user_name"></el-input>
                            </el-form-item>
                            <el-form-item v-if="!changeTeamLayer" label="登陆密码">
                                <el-input v-model="ruleForm.password" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="选择学校">
                                <el-cascader clearable
                                        expand-trigger="click"
                                        :options="location"
                                        v-model="organ_id2"
                                        change-on-select>
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="角色名字">
                                <el-select v-model="roleId"
                                           multiple
                                           placeholder="请选择角色名字">
                                    <el-option v-for="item in roleIds" :key="item.role_id" :label="item.role_name" :value="item.role_id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-radio-group v-model="ruleForm.status">
                                    <el-radio :label="true">启用</el-radio>
                                    <el-radio :label="false">禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="!changeTeamLayer" type="primary" @click="submitForm('ruleForm')"  style="width: 195px;margin-left: 40px">保存</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')"  style="width: 195px;margin-left: 40px">保存</el-button>
                                <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                <el-button @click="addTeamLayer=!addTeamLayer" style="width: 195px;background: #dcdcdc;color: #f3f3f3">取消</el-button>
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
        props:["reqLink"],
        data() {
            return {
                cur_page: 0, //页码
                cur_limit:10, //每次请求的数据数
                count:0, //数据总量
                organId:"",
                organName:"",
                select_word:"",  //搜索的值
                staffMobile:"",  //员工电话号码搜索
                staffName:"",     //员工名字搜索
                role_name:"",
                status:"",
                organ_id2:[], //新增组件内的学校id,
                dataList:[], //请求的list
                roleIds:[],
                location: [],  //校区导航
                selectedLocation: [], //选择校区
                multipleSelection: [], //选中行的集合
                areaNavName:[], //区域name
                areaNavId:[], //区域id
                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                loading: true,
                roleId: [],
                ruleForm:{  //新增数据
                    staff_id:"",
                    staff_name:"",
                    staff_user_name:"",
                    password:"",
                    staff_mobile:"",
                    staff_img:"",
                    admin_organ_id:"",
                    admin_organ_name:"",
                    roleIds:[],
                    role_name:"",
                    status: true,
                    login_status:false,
                    /* created_at:null, */
                    staff_no:"",
                },
                //接收当前行的信息
                changeForm2:{},
                objData: {},
                //表单校验规则
                rules: {
                    staff_name: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                    ],
                    staff_mobile:[
                        {required: true, validator: this.Checkout.phone, trigger: 'blur' }
                    ]
                },

            }
        },
        //实例创建完成后被立即调用
        created() {
            const self= this;
            this.Util.queryAreaNav(this,-1, () => this.getData());
            this.location = this.$store.state.location;
            // this.organId = this.$store.state.organId;
            let objData={
                staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            };
            this.$axios.post(this.GlobalVal.httpLink.queryRoles,JSON.stringify(objData)).then(
                res=>{
                    if(res.data.code==="10000"){
                        this.roleIds = res.data.roles;
                    }else{
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
                    return d;
                });
            },

        },
        watch:{
            selectedLocation:function () {
                if(this.selectedLocation.includes(JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId)){
                    this.organ_id =this.selectedLocation[this.selectedLocation.length-1];
                    this.cur_page = 0
                    this.getData();
                }else if(this.selectedLocation.length === 0){
                    this.organ_id = '';
                    this.cur_page = 0
                    this.getData();
                }
                /*function getOrganName(obj,id) {
                    for(let i =0; i<obj.length; i++){
                        if(obj[i].value===id){
                            if(obj[i].children.length>0){
                                return obj[i].children;
                            }
                        }
                    }
                }

                if(this.organ_id2 && this.organ_id2.length &&this.organ_id2.length>0){
                    let obj=this.location;
                    for(let i=0; i<this.organ_id2.length-1; i++){
                        obj = getOrganName(obj,this.organ_id2[i])
                    }
                    for(let i =0; i<obj.length; i++){
                        if(this.organ_id2[this.organ_id2.length-1]===obj[i].value){
                            this.ruleForm.admin_organ_name=obj[i].label;
                        }
                    }

                    this.ruleForm.admin_organ_id =this.organ_id2[this.organ_id2.length-1];
                }*/
            },
            organ_id2:function () { //选择学校
            this.ruleForm.admin_organ_id =this.organ_id2[this.organ_id2.length-1];
                /* function getOrganName(obj,id) {
                    for(let i =0; i<obj.length; i++){
                        if(obj[i].value===id){
                            if(obj[i].children.length>0){
                                return obj[i].children;
                            }
                        }
                    }
                }
                if(this.organ_id2 && this.organ_id2.length &&this.organ_id2.length>0){
                    let obj=this.location;
                    for(let i=0; i<this.organ_id2.length-1; i++){
                        obj = getOrganName(obj,this.organ_id2[i])
                    }
                    for(let i =0; i<obj.length; i++){
                        if(this.organ_id2[this.organ_id2.length-1]===obj[i].value){
                            this.ruleForm.admin_organ_name=obj[i].label;
                            if(this.areaNavName.length>3){
                                    this.areaNavName[i] = obj[i].label
                            }else{
                                this.areaNavName.push(this.ruleForm.admin_organ_name);
                            }
                        }
                    }
                    this.ruleForm.admin_organ_id =this.organ_id2[this.organ_id2.length-1];
                    if(this.changeTeamLayer){
                        this.areaNavId = this.organ_id2;
                    }
                    if(!this.changeTeamLayer){
                        if(this.areaNavId.length>3){
                            this.areaNavId = this.organ_id2;
                        }else{
                            this.areaNavId.push(this.ruleForm.admin_organ_id);
                        }
                    }
                } */
            },
            select_word:function () {
                if((/^\d+$/).test(this.select_word) && this.select_word!==""){
                    this.staffMobile = this.select_word;
                    this.staffName=null
                }else if(this.select_word!==""){
                    this.staffName= this.select_word;
                    this.staffMobile =null
                }else{
                    this.staffMobile =null;
                    this.staffName=null
                }
            },
            changeForm2:function () {//修改的参数赋值
                this.ruleForm.staff_id=this.changeForm2.staff_id;
                this.ruleForm.staff_name=this.changeForm2.staff_name;
                this.ruleForm.staff_user_name=this.changeForm2.staff_user_name;
                this.ruleForm.password=this.changeForm2.password;
                this.ruleForm.staff_mobile=this.changeForm2.staff_mobile;
                this.ruleForm.staff_img=this.changeForm2.staff_img;
                this.ruleForm.admin_organ_id=this.changeForm2.admin_organ_id;
                this.ruleForm.admin_organ_name=this.changeForm2.admin_organ_name;
                this.ruleForm.role_name=this.changeForm2.role_name;
                this.ruleForm.login_status=this.changeForm2.login_status;
                this.ruleForm.staff_no=this.changeForm2.staff_no;
                this.ruleForm.status = this.changeForm2.status;
                this.organ_id2[0] = 1;
                this.organ_id2[1] = this.changeForm2.school_id;
                this.organ_id2[2] = this.changeForm2.branch_school_id;
                this.organ_id2[3] = this.changeForm2.campus_id;
                let arr = [];
                for(let i =0; i<this.changeForm2.roleIds.length; i++){
                    arr.push(this.changeForm2.roleIds[i].id);
                }
                this.roleId = arr;
                this.ruleForm.created_at = this.changeForm2.created_at;
            }
        },
        methods: {
            //获取数据
            getData(){
                const self =this;
                this.loading = true;
                this.objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page:this.cur_page, //页数
                    limit:this.cur_limit, //条目数
                    organId:this.organ_id,
                    /*school_id:this.school_id, //大区id
                    school_name:this.school_name,// 大区名称
                    branch_school_id:this.branch_school_id,//分校id
                    branch_school_name:this.branch_school_name,//分校id
                    campus_id:this.campus_id, //校区id
                    campus_name:this.campus_name, //校区id*/
                    staffMobile:this.staffMobile,  //按电话号码搜索
                    staffName:this.staffName     //按名字搜索
                };
                this.$axios.post(this.GlobalVal.httpLink.queryStaffs,JSON.stringify(this.objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            self.count = res.data.count;
                            self.dataList=res.data.staffs;
                        }else{
                            console.error(res);
                            self.$message({
                                type:"error",
                                message:res.data.errmsg
                            })
                        }
                        this.loading = false;
                    },
                    res=>{
                        this.$message("请求失败")
                        this.loading = false;
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
                            "id": row.staff_id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delStaff,JSON.stringify(objData)).then(
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
                                id: self.multipleSelection[i].staff_id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:delTeacher
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delStaff,JSON.stringify(objData)).then(
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
            //重置密码
            resetPassword(index, row){
                if(this.multipleSelection.length > 0 || row){
                    this.$confirm('此操作将会重置密码, 是否继续', '警告',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let resetPassword = [];
                        for (let i = 0; i < this.multipleSelection.length; i++) {
                            resetPassword.push({
                                id: this.multipleSelection[i].staff_id
                            });
                        }
                        if(row){
                            resetPassword.push({
                                id: row.staff_id
                            });
                        }
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            source: this.GlobalVal.constants.source,
                            delList:resetPassword
                        };
                        this.$axios.post(this.GlobalVal.httpLink.resetPassword,JSON.stringify(objData)).then(
                           res=>{
                                if(res.data.code==="10000"){
                                    this.$message({
                                        type: 'success',
                                        message: '重置成功!'
                                    });
                                    resetPassword = [];
                                    this.multipleSelection = [];
                                    this.cur_page = 0;
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
                        )
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消重置密码'
                        });
                    })
                }else{
                    this.$message({
                        type: 'info',
                        message: '没有选中任何项'
                    })
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

            //搜索用户---刷新
            search() {
                this.cur_page = 0;
                this.getData();
            },
            //新增按钮事件
            handleAdd(){
                //this.resetForm("ruleForm");
                this.addTeamLayer = true;
                this.changeTeamLayer =false;
                this.ruleForm.status = true;
                //清空参数
                this.ruleForm.staff_id="";
                this.ruleForm.staff_name="";
                this.ruleForm.staff_user_name="";
                this.ruleForm.password="";
                this.ruleForm.staff_mobile="";
                this.ruleForm.staff_img="";
                this.ruleForm.admin_organ_id="";
                this.ruleForm.admin_organ_name="";
                this.ruleForm.role_name="";
                this.ruleForm.login_status=false;
                this.organ_id2=[];
                //this.ruleForm.created_at=null;
                this.ruleForm.staff_no="";
                this.roleId = [];

            },
            //新增/修改时候参数判断-转换
            varJug(obj){
                let self = this;
                let o = obj;
                /* if(o.status==="启用"){
                    o.status = true;
                }else {
                    o.status = false;
                } */
                if(this.roleId){
                    o.role_name="";
                    let arr = [];
                    for(let i =0; i<this.roleId.length; i++){
                        for(let j=0; j<this.roleIds.length; j++){
                            if(this.roleId[i] ===this.roleIds[j].role_id){
                                if(o.role_name ===""){
                                    o.role_name += this.roleIds[j].role_name;
                                }else{
                                    o.role_name += "," + this.roleIds[j].role_name;
                                }
                            }
                        }
                        arr.push({id:this.roleId[i]})
                    }
                    o.roleIds = arr;
                }
                o.campus_id = this.organ_id2[3] || '';
                o.branch_school_id = this.organ_id2[2] || '';
                o.school_id = this.organ_id2[1] || '';
                o.campus_name = ''; //this.ruleForm.admin_organ_name
                o.branch_school_name = ''; //this.areaNavName[2]
                o.school_name = ''; //this.areaNavName[1]
                return o
            },
            //新增--提交
            submitForm(formName) {
                const self = this;
                if(!(this.organ_id2.includes(JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId))){
                    this.$message.error('请选择正确的校区')
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            staff:this.varJug(this.ruleForm)
                        };
                        this.$axios.post(this.GlobalVal.httpLink.editStaff,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    self.addTeamLayer = false;
                                    this.areaNavId = [];
                                    this.areaNavName = [];
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

                                    self.getData();
                                }else{
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
                this.changeForm2 = row;
                // this.organ_id2 = this.Util.getCityLevel(this.location, row.campus_id);
            },
            //新增/修改教师等级--重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            exportStaff(){
                this.$exportExcel({
                    dataList: this.dataList,
                    objData: this.objData,
                    httpUrl: "exportStaff",
                    title: this.$route.meta.title
                });
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
        width: 750px;
        height: 640px;
        min-height: 480px;
        margin:auto;
        left: 0;
        bottom:0;
        top: 0;
        right: 0;
        border-radius: 4px;
        background-color: #ffffff;
        color: #fff;
        padding-left:20px;
        padding-right: 20px;
        box-sizing: border-box;
        z-index: 10;
    }
    .transition-box .el-cascader{
        width:100%;
    }
    .close-btn{
        position: absolute;
        color: #ff6808;
        font-size: 20px;
        top: 0;
        right: 10px;
        width: 40px;
        height: 40px;
        line-height:40px;
        text-align: center;
    }
    .el-icon-close::before{
        line-height: 50px;
        color: #b7b7b7;
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

    /*搜索*/
    .search-warp{
        display: inline-block;
        border: 1px solid #d2d2d2;
        background: #fff;
        height: 33px;
        box-sizing: border-box;
    }
    .search-warp>i{
        font-size: 20px;
        width: 30px;
        padding-left: 8px;
        display: block;
        float: right;
        border-left: 1px solid #d2d2d2;
        margin-top: 6px;
    }
    .search-warp>input{
        height: 30px;
        width: 230px;
        border: none;
        outline: none;
        padding-left: 15px;
        margin-top: 1px;
    }
    .search-warp>input::placeholder {
        color: #ebebeb;
    }
    /*按钮右*/
    .button-right{
        width: auto;
        height: auto;
        float: right;
        margin-right: 20px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
<style>
    .el-input.is-disabled .el-input__inner{
        color: #3a3c3f;
    }
    .el-cascader.is-disabled .el-cascader__label{
        color: #3a3c3f;
    }
</style>
