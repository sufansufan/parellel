<template>
    <div class="table">
        <div class="handle-box">
            <div class="screen">
                <div>
                    <el-select clearable v-model="province_no" size="medium" placeholder="请选择省" style="width: 100%;" @change="getCitys(province_no)">
                        <el-option
                                v-for="item in provinceList"
                                :key="item.province_no"
                                :label="item.province_name"
                                :value="item.province_no">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-select clearable v-model="city_no" size="medium" placeholder="请选择市" style="width: 100%;" @change="getDistrict(city_no)">
                        <el-option
                                v-for="item in cityList"
                                :key="item.city_no"
                                :label="item.city_name"
                                :value="item.city_no">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-select clearable v-model="district_name" size="medium" placeholder="请选择区" style="width: 100%;" @change="districtsBlur">
                        <el-option
                                v-for="item in districtsList"
                                :key="item.district_no"
                                :label="item.district_name"
                                :value="item.district_name">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-select clearable v-model="department" size="medium" placeholder="学部" style="width: 100%;" @change="districtsBlur">
                    <el-option
                            v-for="item in $store.state.DepartmentOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                </div>
                 <div class="search-warp">
                    <el-input v-model="select_word" border="none" size="medium" placholder="" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的学校名称"></el-input>
                    <div class="search-icon">
                        <i class="el-icon-search" @click="search"></i>
                    </div>
                </div>
                <div class="choose">
                    <el-button type="primary" size="mini"   @click="handleAdd">新增</el-button>
                    <el-button type="primary" size="mini"   @click="delAll">批量删除</el-button>
                </div>
            </div>
        </div>
        <el-table :data="dataList" size="mini" stripe style="width: 100% ;margin-top:10px;" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="school_name" label="学校名称"></el-table-column>
            <el-table-column prop="department" label="学部"></el-table-column>
            <el-table-column prop="district_name" label="行政区域"></el-table-column>
            <!--<el-table-column prop="school_phone" label="学校电话"></el-table-column>
            <el-table-column prop="school_no" label="学校代码"></el-table-column>
            <el-table-column prop="remarks"  label="备注"></el-table-column>-->
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini" type="primary"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="page">
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count"
                        :page-size="limit"
                        :page-sizes="[10,20,30,50]">
                </el-pagination>
            </div>
        </div>

        <!--添加/修改弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增中小学</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">编辑中小学信息</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 size="mini"
                                 :rules="rules"
                                 ref="ruleForm"
                                 label-width="100px"
                                 font="16px"
                                 style="height: 100%;">
                            <el-form-item label="学校名称"  prop="school_name" style="padding-top: 50px">
                                <el-input v-model="ruleForm.school_name" size="medium"></el-input>
                            </el-form-item>
                            <el-form-item label="学部" prop="department">
                                <el-select v-model="ruleForm.department" size="medium" placeholder="请选择学部" style="width: 100%;">
                                    <el-option
                                            v-for="item in $store.state.DepartmentOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选择省" prop="province_no">
                                <el-select v-model="ruleForm.province_no" size="medium" placeholder="请选择省" style="width: 100%;" @change="getCitys('')">
                                    <el-option
                                            v-for="item in provinceList"
                                            :key="item.province_no"
                                            :label="item.province_name"
                                            :value="item.province_no">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选择市" prop="city_no">
                                <el-select v-model="ruleForm.city_no" size="medium" placeholder="请选择市" style="width: 100%;" @change="getDistrict('')">
                                    <el-option
                                            v-for="item in cityList"
                                            :key="item.city_no"
                                            :label="item.city_name"
                                            :value="item.city_no">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选择区" prop="district_no">
                                <el-select v-model="ruleForm.district_no" size="medium" placeholder="请选择区" style="width: 100%;">
                                    <el-option
                                            v-for="item in $store.state.DistrictsList"
                                            :key="item.city_no"
                                            :label="item.district_name"
                                            :value="item.district_no">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item style="padding-top:100px">
                                <el-button v-if="!changeTeamLayer" type="primary" size="mini" style="width: 195px;margin-left: 40px" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button v-if="changeTeamLayer" type="primary" @click="submitForm('ruleForm')" style="width: 195px;margin-left: 40px">保存</el-button>
                                <el-button @click="addTeamLayer=!addTeamLayer" size="mini" style="width: 195px;background: #dcdcdc;color: #f3f3f3">取消</el-button>
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
        data(){
            return{
                page:0,//页码
                limit:10,//一次查询多少条
                count:20,//数据总量
                staffId:"",
                select_word:"",//搜索的值
                select_type:"", // 搜索的学部
                school_name:"",
                province_no: "",
                city_no: "",
                district_name:"",
                department:"", //学校类型
                dataList:[], //请求的list
                selectedLocation: [], //选择的地区
                locationArea:[],
                roleIds:[],
                school:[],  //学校导航
                multipleSelection: [], //选中行的集合  即删除行
                provinceList:[], //省市集合
                provinceL:{

                },
                cityList:[], //省市集合
                cityL:{
                    city_no:"",
                },
                districtsList:[],
                districtsL:{},
                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                ruleForm:{//新增数据
                    school_id:"",
                    school_address:"", //学校地址
                    school_phone:"",//学校电话
                    school_no:"", //学校代码
                    school_name:"",//学校名称
                    remarks:"", //备注
                    department:"",//学校类型
                    school_qualifications:"",//办学资质
                    school_grade:"",//办学等级
                    //status:"",
                    province_name:"",//省名称
                    city_no:"",//市编号
                    city_name:"",//市名称
                    district_no:"",//行政区编号
                    district_name:"",//行政区名称
                },

                //接收当前行的信息
                changeForm2:{},
                //表单校验规则
                rules: {
                    school_name: [
                        { required: true, message: '请输入学校名称', trigger: 'blur' },
                        { min: 0, max:20, message: '最多输入20个字符', trigger: 'blur' }
                    ],
                    province_no:[
                        { required: true, message: '请选择省', trigger: 'blur'},
                    ],
                    city_no:[
                        {  message: '先选择省', trigger: 'blur'},
                    ],
                    district_no:[
                        {  message: '先选择省', trigger: 'blur'},
                    ],
                    department:[
                        { required: true, message: '请选择学校类型', trigger: 'blur'},

                    ]
                },
            }
        },
        created() {
            this.Util.querySysconst(this,"007",this.$store.state.DepartmentOptions);//查询学部
            this.getData();
            this.getProvinces();
        },
        watch:{
            selectedLocation:function () {
                if(this.selectedLocation && this.selectedLocation.length &&this.selectedLocation.length>0){
                    this.organId =this.selectedLocation[this.selectedLocation.length-1];
                }
            },
            select_word:function () {
                if( this.select_word!==""){
                    this.school_name = this.select_word;
                }
            },
            select_type:function () {
                if(this.select_type!==""){
                    this.department = this.select_type.join();
                }
            },
            changeForm2:function () {//修改的参数赋值
                this.ruleForm.school_id=this.changeForm2.school_id;  //此学校的唯一id int,  --> 如果为新增,此值为空字符串
                this.ruleForm.school_address=this.changeForm2.school_address; //学校地址
                this.ruleForm.school_phone=this.changeForm2.school_phone; //学校电话
                this.ruleForm.school_no=this.changeForm2.school_no; //学校代码
                this.ruleForm.school_name=this.changeForm2.school_name;  //学校名称
                this.ruleForm.remarks=this.changeForm2.remarks; //备注 =>可能为空
                // this.ruleForm.department=this.changeForm2.department; //学校类型
                if(this.changeForm2.department === '小学部'){
                    this.ruleForm.department = '00701'
                }else if(this.changeForm2.department === '初中部'){
                    this.ruleForm.department = '00702'
                }else {
                     this.ruleForm.department = '00703'
                }
                this.ruleForm.school_qualifications=this.changeForm2.school_qualifications; //办学资质
                this.ruleForm.school_grade=this.changeForm2.school_grade;//办学等级
                this.ruleForm.province_no = this.changeForm2.province_no;
                this.ruleForm.city_no = this.changeForm2.city_no;
                this.ruleForm.district_no = this.changeForm2.district_no;
                this.getCitys();
                this.getDistrict();
            },
        },

        methods: {
            //获取数据
            getData() {
                let objData = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page: this.page, //页数
                    limit: this.limit, //条目数
                    schoolName:this.school_name,
                    department:this.department,
                    districtName:this.district_name,
                };
                this.$axios.post(this.GlobalVal.httpLink.queryPubicSchool, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            this.count = res.data.count;
                            this.dataList = res.data.publicSchools;
                            this.dataList.map((d) => {
                                d.department = this.Util.GetLabelForValue(this.$store.state.DepartmentOptions,d.department);
                                return d;
                            });
                        } else {
                            this.$message({
                                type: "error",
                                message: res.data.errmsg
                            })
                        }
                    },
                    res => {
                        this.$message("请求失败")
                    }
                )

            },
            //重新筛选函数
            screening(){
                this.getData();
            },
            //翻页导航栏
            handleCurrentChange(val) {
                this.page = val-1;
                this.getData();
            },
            //每页显示数目发生变化
            handleSizeChange(val){
                this.limit = val;
                this.getData();
            },

            //搜索学生---刷新
            search() {
                if(this.select_word===""){
                    this.$message({
                        type: 'error',
                        message: '填写要搜索的学校名称'
                    });
                }
                this.getData();
            },
            blur(){
                if( this.department!==""){
                    this.department = this.department.join("");
                }

                this.getData();
            },
            //新增按钮事件
            handleAdd(){
                //this.resetForm("ruleForm");
                this.addTeamLayer = true;
                this.changeTeamLayer = false;
                //清空参数
                this.ruleForm.school_address = "";
                this.ruleForm.school_phone = "";
                this.ruleForm.school_no = "";
                this.ruleForm.school_name = "";
                this.ruleForm.remarks = "";
                this.ruleForm.department = "";
                this.ruleForm.school_qualifications = "";
                this.ruleForm.school_grade = "";
                this.ruleForm.city_no = "";
                this.ruleForm.district_no = "";
                this.ruleForm.province_name = "";
                this.ruleForm.city_name = "";
                this.ruleForm.district_name = "";
                this.ruleForm.province_no = "";
            },
            //修改按钮事件
            handleEdit(index, row){
                this.changeTeamLayer =true;
                this.addTeamLayer = true;
                this.changeForm2= row;
            },

            //新增/修改--提交
            submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            publicSchool:this.varJug(this.ruleForm),
                        };
                        this.$axios.post(this.GlobalVal.httpLink.editPublicSchool,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    self.addTeamLayer = false;
                                    self.getData();
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
            //新增/修改时候参数判断-转换
            varJug(obj){
                let self = this;
                let o = obj;
                return o
            },

            //删除事件
            handleDelete(index, row) {
                console.log(index,row);
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        delList:[{
                            "id": row.school_id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delPubicSchool,JSON.stringify(objData)).then(
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
                                id: self.multipleSelection[i].school_id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:delTeacher
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delPubicSchool,JSON.stringify(objData)).then(
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
            getCitys(no){
                let objData2 = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    province_no:  no ||this.ruleForm.province_no,
                };
                this.$axios.post(this.GlobalVal.httpLink.queryCities, JSON.stringify(objData2)).then(
                    res => {
                        if (res.data.code === "10000") {
                            this.cityList= res.data.citys;
                            this.$store.commit("setCityList",res.data.citys);
                        } else {
                            this.$message({
                                type: "error",
                                message: res.data.errmsg
                            })
                        }
                    },
                    res => {
                        this.$message("请求失败")
                    }
                )
            },
            getDistrict(no){
                let objData2 = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    city_no: no || this.ruleForm.city_no,
                };
                this.$axios.post(this.GlobalVal.httpLink.queryDiss, JSON.stringify(objData2)).then(
                    res => {
                        if (res.data.code === "10000") {
                            this.districtsList= res.data.districts;
                            this.$store.commit("setDistrictsList",res.data.districts);
                        } else {
                            this.$message({
                                type: "error",
                                message: res.data.errmsg
                            })
                        }
                    },
                    res => {
                        this.$message("请求失败")
                    }
                )
            },
            districtsBlur(){
                if( this.ruleForm.district_name!==""){
                    this.district_name = this.district_name;
                }
                this.getData();
            },
            getProvinces(){
                let objData = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                };
                this.$axios.post(this.GlobalVal.httpLink.queryProvince, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            this.provinceList = res.data.provinces;
                            window.sessionStorage.setItem("queryProvince",JSON.stringify(res.data.provinces));
                        } else {
                            this.$message({
                                type: "error",
                                message: res.data.errmsg
                            })
                        }
                    },
                    res => {
                        this.$message("请求失败")
                    }
                )
            }
        }
    }
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .screen{
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
    }
    .screen > div{
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .choose{
        display: flex;
        flex: 1;
        justify-content: flex-end
    }
    .choose > button{
        margin-right: 20px;
        height: 32px;
    }
     /*搜索*/
    .search-icon{
        position: absolute;
        top:4px;
        right: 0;
        display: block;
        margin-left: 3px;
        float: right;
        width: 40px;
        height: 26px;
        border-left: 1px solid #d2d2d2;
    }
    .search-warp{
        position: relative;
        display: block;
        float: right;
        /*border: 1px solid #d2d2d2;*/
        background: #fff;
        height: 36px;
        box-sizing: border-box;
        margin-left: 3px;
    }
    .search-icon>i{
        font-size: 20px;
        width: 30px;
        padding-left: 6px;
        display: block;
        float: right;
        margin-top: 2px;
    }
    .search-warp>input{
        height: 20px;
        width: 230px;
        border: none;
        outline: none;
        padding-left: 15px;
        margin-top: 2px;
    }
    .search-warp>input::placeholder {
        color: #D2D2D2;
        font-size: 16px;
    }
    /*新增*/
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
        height: 605px;
        min-height: 480px;
        margin:auto;
        left: 0;
        bottom:0;
        top: 0;
        right: 0;
        border-radius: 4px;
        background-color: #ffffff;
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
        background: #f3f3f3;
        -webkit-box-shadow: 0px 0px 3px #ccc;
        -moz-box-shadow: 0px 0px 3px #ccc;
        box-shadow: 0px 0px 3px #ccc;
    }
    .title-warp>h3{
        font-size: 16px;
    }
    .transition-box .el-cascader{
        width:100%;
    }
    .el-icon-close::before{
        line-height: 50px;
        color: #b7b7b7;
    }
    .close-btn{
        position: absolute;
        color: #b7b7b7;
        font-size: 24px;
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

    /*分页*/
    .pagination{
        margin-top: 20px;
        z-index: 999999;
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
</style>
