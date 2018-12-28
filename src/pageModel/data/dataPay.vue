<template>
    <div class="table">
        <div class="handle-box">
          <!--  <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="danger" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
            <div class="search-warp">
                <el-input v-model="select_word" size="mini" placeholder="" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的学生姓名\订单编号"></el-input>
                <el-button type="primary" size="mini" icon="search"  @click="search">搜索</el-button>
            </div>
        </div>
        <el-table :data="data" size="mini" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form size="mini" label-position="left" inline class="demo-table-expand">
                        <el-form-item label="学生ID">
                            <span>{{ props.row.student_id }}</span>
                        </el-form-item>
                        <el-form-item label="班级ID">
                            <span>{{ props.row.class_id }}</span>
                        </el-form-item>
                        <el-form-item label="订单id">
                            <span>{{ props.row.order_id }}</span>
                        </el-form-item>
                        <el-form-item label="订单实付价">
                            <span>{{ props.row.real_payment }}</span>
                        </el-form-item>
                        <el-form-item label="订单编号">
                            <span>{{ props.row.orderno }}</span>
                        </el-form-item>
                        <el-form-item label="业务流水号">
                            <span>{{ props.row.tradeno }}</span>
                        </el-form-item>
                        <el-form-item label="操作员工ID">
                            <span>{{ props.row.staff_id }}</span>
                        </el-form-item>
                        <el-form-item label="做员工姓名">
                            <span>{{ props.row.staff_name}}</span>
                        </el-form-item>
                        <el-form-item label="来源">
                            <span>{{ props.row.source}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="student_name" label="学生姓名"></el-table-column>
            <el-table-column prop="class_name" label="班级名称"></el-table-column>
            <el-table-column prop="total_price" label="订单总价"></el-table-column>
            <el-table-column prop="payment_type" label="支付类型"></el-table-column>
            <!--<el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button><br>
                    <el-button size="mini"type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>-->
        </el-table>
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
        <!--添加/修改弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增支付信息</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">修改支付信息</h3>
                        </div>
                        <el-form :model="ruleForm"
                                 :rules="rules"
                                 size="mini"
                                 ref="ruleForm"
                                 label-width="100px"
                                 style="height: 400px;overflow-y: scroll;">
                            <el-form-item label="学生ID"  prop="student_id">
                                <el-input v-model="ruleForm.student_id"></el-input>
                            </el-form-item>
                            <el-form-item label="学生姓名"  prop="student_name">
                                <el-input v-model="ruleForm.student_name"></el-input>
                            </el-form-item>
                            <el-form-item label="班级ID"  prop="class_id">
                                <el-input v-model="ruleForm.class_id"></el-input>
                            </el-form-item>
                            <el-form-item label="班级名称"  prop="class_name">
                                <el-input v-model="ruleForm.class_name"></el-input>
                            </el-form-item>
                            <el-form-item label="订单ID"  prop="order_id">
                                <el-input v-model="ruleForm.order_id"></el-input>
                            </el-form-item>
                            <el-form-item label="订单总价"  prop="total_price">
                                <el-input v-model="ruleForm.total_price"></el-input>
                            </el-form-item>
                            <el-form-item label="订单实付价"  prop="real_payment">
                                <el-input v-model="ruleForm.real_payment"></el-input>
                            </el-form-item>
                            <el-form-item label="支付类型"  prop="payment_type">
                                <el-input v-model="ruleForm.payment_type"></el-input>
                            </el-form-item>
                            <el-form-item label="订单编号"  prop="orderno">
                                <el-input v-model="ruleForm.orderno"></el-input>
                            </el-form-item>
                            <el-form-item label="业务流水号"  prop="tradeno">
                                <el-input v-model="ruleForm.tradeno"></el-input>
                            </el-form-item>
                            <el-form-item label="操作员工id"  prop="staff_id">
                                <el-input v-model="ruleForm.staff_id"></el-input>
                            </el-form-item>
                            <el-form-item label="操作员工姓名"  prop="staff_name">
                                <el-input v-model="ruleForm.staff_name"></el-input>
                            </el-form-item>
                            <el-form-item label="来源"  prop="source">
                                <el-input v-model="ruleForm.source"></el-input>
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
        data(){
            return{
                page:"", //第几页
                limit:"", //每次查询多少条
                count:3, //数据的总量
                staffId:"", //用户id3
                select_word:"",  //搜索的值
                student_id:"", //学生id
                student_name:"", //学生姓名 搜索
                class_id:"",  //  班级ID
                class_name:"", //班级名称
                order_id:"",//订单id
                creator_name:"",//支付类型
                orderno:"",  //订单编号
                tradeno:"", //业务流水号
                dataList:[{
                    id:"",//主键
                    student_id:"21" ,//学生ID
                    student_name:"苏凡" ,//学生姓名
                    class_id:"2" ,//班级ID
                    class_name:"精英班" , //班级名称
                    order_id:"13" ,//订单ID
                    total_price:"3000",//订单总价
                    real_payment:"3000",//订单实付价
                    payment_type:"微信",//支付类型
                    orderno:"123456789",//订单编号
                    tradeno:"213",//业务流水号
                    staff_id:"12",//操作员工id
                    staff_name:"李四",//操作员工姓名
                    source:"wert",//来源
                }],
                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                ruleForm:{ //新增数据
                    id:"",//主键
                    student_id:"" ,//学生ID
                    student_name:"" ,//学生姓名
                    class_id:"" ,//班级ID
                    class_name:"" , //班级名称
                    order_id:"" ,//订单ID
                    total_price:"",//订单总价
                    real_payment:"",//订单实付价
                    payment_type:"",//支付类型
                    orderno:"",//订单编号
                    tradeno:"",//业务流水号
                    staff_id:"",//操作员工id
                    staff_name:"",//操作员工姓名
                    source:"",//来源
                },
                //接收当前行的信息
                changeForm2:{},
                //表单校验规则
                rules: {
                    school_name: [
                        { required: true, message: '请输入学校名称', trigger: 'blur' },
                    ],
                    school_phone:[
                        { required: true, message: '请输入学校电话', trigger: 'blur'},
                    ]
                },
            }
        },
        created(){
            const self= this;
            self.getData();
        },
        computed:{
            data(){
                const self = this;
                if(!self.dataList){
                    return [];
                }
                return self.dataList.filter(function(d){
                   return d;
                })
            }
        },
        watch:{
            select_word:function () {
                const self = this;
                if((/^\d+$/).test(this.select_word) && this.select_word!==""){
                    console.log('1');
                    self.orderno = this.select_word;
                    self.student_name="";
                }else if(this.select_word!==""){
                    console.log('2');
                    self.student_name= this.select_word;
                    console.log(self.student_name);
                    self.orderno ="";
                }else{
                    console.log('3');
                    self.student_name ="";
                    self.orderno="";
                }
            },
            changeForm2:function(){//修改参数赋值
                this.ruleForm.student_id=this.changeForm2.student_id; //学生id
                this.ruleForm.student_name = this.changeForm2.student_name;   //学生姓名
                this.ruleForm.class_id = this.changeForm2.class_id;  //班级id
                this.ruleForm.class_name = this.changeForm2.class_name; //班级名称
                this.ruleForm.order_id = this.changeForm2.order_id;  //订单ID
                this.ruleForm.total_price = this.changeForm2.total_price //订单总价
                this.ruleForm.real_payment = this.changeForm2.real_payment; //订单实付价
                this.ruleForm.payment_type = this.changeForm2.payment_type; //支付类型
                this.ruleForm.orderno = this.changeForm2.orderno; //订单编号
                this.ruleForm.tradeno = this.changeForm2.tradeno //业务流水号
                this.ruleForm.staff_id = this.changeForm2.staff_id; //操作员工id
                this.ruleForm.staff_name = this.changeForm2.staff_name;//操作员工姓名
                this.ruleForm.source = this.changeForm2.source;//请求方式
                this.ruleForm.created_at = this.changeForm2.created_at //创建日期
                this.ruleForm.update_at = this.changeForm2.update_at //修改日期
            }
        },
        methods:{
            getData(){
                const self = this;
                let objData = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page: this.page, //页数
                    limit: this.limit, //条目数
                    studentId: this.student_id, //学生ID
                    studentName: this.student_name,  //学生姓名
                    classId: this.class_id,  //  班级ID
                    className: this.class_name, //班级名称
                    orderId: this.order_id,//订单id
                    paymentType: this.creator_name,//支付类型
                    orderno: this.orderno,  //订单编号
                    tradeno: this.tradeno, //业务流水号
                };
                console.log("查询支付订单发起请求的参数", objData);
                this.$axios.post(this.GlobalVal.httpLink.queryPayRecord, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            console.log("查询支付订单列表获取的对象", res.data);
                            self.count = res.data.count;
                            self.dataList = res.data.paymentRecords;
                        } else {
                            console.error(res);
                            self.$message({
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
            //翻页导航栏
            handleCurrentChange(val) {
                this.cur_page = val-1;
                this.getData();
            },
            //每页显示数目发生变化
            handleSizeChange(val){
                this.limit = val;
                this.getData();
            },
            //搜索订单---刷新
            search() {
                if(this.select_word===""){
                    this.$message({
                        type: 'error',
                        message: '填写要搜索的学生姓名或订单编号'
                    });
                }
                this.getData();
            },
            //新增按钮事件
            handleAdd(){
                //this.resetForm("ruleForm");
                this.addTeamLayer = true;
                this.changeTeamLayer = false;
                //清空参数
            },
            //修改按钮事件
            handleEdit(index, row){
                this.changeTeamLayer =true;
                this.addTeamLayer = true;
                this.changeForm2= row;
            },
            submitForm(formName) {
                const self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            paymentRecord:this.varJug(this.ruleForm),

                        };
                        console.log("新增/修改支付订单发起请求的参数",objData);
                        this.$axios.post(this.GlobalVal.httpLink.editPayRecord,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("新增/修改支付订单获取的对象",res.data);
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
            varJug(obj){
                let self = this;
                let o = obj;
               /* o.created_at=new Date(o.created_at).getTime();
                o.update_at=new Date(o.update_at).getTime();*/
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
                            "id": row.id,
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delPayRecord,JSON.stringify(objData)).then(
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
                                id: self.multipleSelection[i].id,
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            delList:delTeacher
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delPayRecord,JSON.stringify(objData)).then(
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
            handleSelectionChange(val){
                this.multipleSelection = val;
            }
        }
    }
</script>
<style>
    .handle-box {
        margin-bottom: 20px;
    }
    .search-warp{
        display: inline-block;
        float: right;
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
        width: 100px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item{
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
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
</style>
