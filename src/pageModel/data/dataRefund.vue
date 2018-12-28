<template>
    <div class="table">
        <div class="handle-box">
            <!--<el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="danger" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
            <div class="search-warp">
                <el-input v-model="select_word" size="mini" placeholder="" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索的优惠券面值"></el-input>
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
                        <el-form-item label="订单总价">
                            <span>{{ props.row.total_price }}</span>
                        </el-form-item>
                        <el-form-item label="订单实付价">
                            <span>{{ props.row.real_payment }}</span>
                        </el-form-item>
                        <el-form-item label="课程总次数">
                            <span>{{ props.row.total_times }}</span>
                        </el-form-item>
                        <el-form-item label="课程剩余次数">
                            <span>{{ props.row.left_times }}</span>
                        </el-form-item>
                        <el-form-item label="申请退款时间">
                            <span>{{ props.row.refund_apply_time}}</span>
                        </el-form-item>
                        <el-form-item label="申请退款来源">
                            <span>{{ props.row.refund_apply_source}}</span>
                        </el-form-item>
                        <el-form-item label="申请退款金额">
                            <span>{{ props.row.apply_refund_amount}}</span>
                        </el-form-item>
                        <el-form-item label="申请退款原因">
                            <span>{{ props.row.refund_reason}}</span>
                        </el-form-item>
                        <el-form-item label="退款支付类型">
                            <span>{{ props.row.refund_pay_type}}</span>
                        </el-form-item>
                        <el-form-item label="银行卡卡号">
                            <span>{{ props.row.bankcard_no}}</span>
                        </el-form-item>
                        <el-form-item label="银行卡户主">
                            <span>{{ props.row.bank_card_payee}}</span>
                        </el-form-item>
                        <el-form-item label="开户行">
                            <span>{{ props.row.opening_bank}}</span>
                        </el-form-item>
                        <el-form-item label="支付宝帐号">
                            <span>{{ props.row.alipay_acount}}</span>
                        </el-form-item>
                        <el-form-item label="微信支付帐号">
                            <span>{{ props.row.wechat_acount}}</span>
                        </el-form-item>
                        <el-form-item label="申请退款的员工ID">
                            <span>{{ props.row.apply_staff_id}}</span>
                        </el-form-item>
                        <el-form-item label="申请退款的员工姓名">
                            <span>{{ props.row.apply_staff_name}}</span>
                        </el-form-item>
                        <el-form-item label="实际退款金额">
                            <span>{{ props.row.real_refund_amount}}</span>
                        </el-form-item>
                        <el-form-item label="实际退款时间">
                            <span>{{ props.row.real_refund_time}}</span>
                        </el-form-item>
                        <el-form-item label="实际退款员工ID">
                            <span>{{ props.row.refund_staff_id}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="student_name" label="学生姓名"></el-table-column>
            <el-table-column prop="class_name" label="班级名称"></el-table-column>
            <el-table-column prop="total_price" label="订单总价"></el-table-column>
            <el-table-column prop="refund_status" label="是否退款"></el-table-column>
            <el-table-column prop="refund_staff_name" label="退款员工姓名"></el-table-column>
           <!-- <el-table-column label="操作" width="150">
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
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增退款信息</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">修改退款信息</h3>
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
                            <el-form-item label="课程总次数"  prop="total_times">
                                <el-input v-model="ruleForm.total_times"></el-input>
                            </el-form-item>
                            <el-form-item label="课程剩余次数"  prop="left_times">
                                <el-input v-model="ruleForm.left_times"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款时间"  prop="refund_apply_time">
                                <el-input v-model="ruleForm.refund_apply_time"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款来源"  prop="refund_apply_source">
                                <el-input v-model="ruleForm.refund_apply_source"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款金额"  prop="apply_refund_amount">
                                <el-input v-model="ruleForm.apply_refund_amount"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款原因"  prop="refund_reason">
                                <el-input v-model="ruleForm.refund_reason"></el-input>
                            </el-form-item>
                            <el-form-item label="退款支付类型"  prop="refund_pay_type">
                                <el-input v-model="ruleForm.refund_pay_type"></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡卡号"  prop="bankcard_no">
                                <el-input v-model="ruleForm.bankcard_no"></el-input>
                            </el-form-item>
                            <el-form-item label="开户行"  prop="opening_bank">
                                <el-input v-model="ruleForm.opening_bank"></el-input>
                            </el-form-item>
                            <el-form-item label="支付宝帐号"  prop="alipay_acount">
                                <el-input v-model="ruleForm.alipay_acount"></el-input>
                            </el-form-item>
                            <el-form-item label="微信支付帐号"  prop="wechat_acount">
                                <el-input v-model="ruleForm.wechat_acount"></el-input>
                            </el-form-item>
                            <el-form-item label="员工ID"  prop="apply_staff_id">
                                <el-input v-model="ruleForm.apply_staff_id"></el-input>
                            </el-form-item>
                            <el-form-item label="员工姓名"  prop="apply_staff_name">
                                <el-input v-model="ruleForm.apply_staff_name"></el-input>
                            </el-form-item>
                            <el-form-item label="实际退款金额"  prop="real_refund_amount">
                                <el-input v-model="ruleForm.real_refund_amount"></el-input>
                            </el-form-item>
                            <el-form-item label="实际退款时间"  prop="real_refund_time">
                                <el-input v-model="ruleForm.real_refund_time"></el-input>
                            </el-form-item>
                            <el-form-item label="实际退款员工ID"  prop="refund_staff_id">
                                <el-input v-model="ruleForm.refund_staff_id"></el-input>
                            </el-form-item>
                            <el-form-item label="实际退款员工姓名"  prop="refund_staff_name">
                                <el-input v-model="ruleForm.refund_staff_name"></el-input>
                            </el-form-item>
                            <el-form-item label="申请退款状态"  prop="refund_status">
                                <el-input v-model="ruleForm.refund_status"></el-input>
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
                select_word:"", //搜索集合
                staffId:"", //用户id3
                student_id:"" ,//学生ID
                student_name:"" ,//学生姓名
                class_id:"" ,//班级ID
                class_name:"" ,//班级名称
                order_id:"" ,//订单ID
                refund_apply_source:"",//申请退款来源
                refund_pay_type:"",//退款支付类型
                refund_status:"",//申请退款状态：申请退款，退款成功
                dataList:[{
                    id:"",//主键
                    student_id:"" ,//学生ID
                    student_name:"2131" ,//学生姓名
                    class_id:"" ,//班级ID
                    class_name:"133" ,//班级名称
                    order_id:"" ,//订单ID
                    total_price:"",//订单总价
                    real_payment:"",//订单实付价
                    total_times:"",//课程总次数
                    left_times:"",//课程剩余次数
                    refund_apply_time:"",//申请退款时间
                    refund_apply_source:"",//申请退款来源
                    apply_refund_amount:"",//申请退款金额n
                    refund_reason:"",//申请退款原因
                    refund_pay_type:"",//退款支付类型
                    bankcard_no:"",//银行卡卡号
                    bank_card_payee:"",//银行卡户主
                    opening_bank:"",//开户行
                    alipay_acount:"",//支付宝帐号
                    wechat_acount:"",//微信支付帐号
                    apply_staff_id:"",//申请退款的员工ID，仅在从前台申请退款时用
                    apply_staff_name:"",//申请退款的员工姓名，仅在从前台申请退款时用
                    real_refund_amount:"",//实际退款金额
                    real_refund_time:"",//实际退款时间
                    refund_staff_id:"",//实际退款员工ID
                    refund_staff_name:"",//实际退款员工姓名
                    refund_status:"",//申请退款状态：申请退款，退款成功
                }],
                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                ruleForm:{//新增数据
                    id:"",//主键
                    student_id:"" ,//学生ID
                    student_name:"" ,//学生姓名
                    class_id:"" ,//班级ID
                    class_name:"" ,//班级名称
                    order_id:"" ,//订单ID
                    total_price:"",//订单总价
                    real_payment:"",//订单实付价
                    total_times:"",//课程总次数
                    left_times:"",//课程剩余次数
                    refund_apply_time:"",//申请退款时间
                    refund_apply_source:"",//申请退款来源
                    apply_refund_amount:"",//申请退款金额
                    refund_reason:"",//申请退款原因
                    refund_pay_type:"",//退款支付类型
                    bankcard_no:"",//银行卡卡号
                    bank_card_payee:"",//银行卡户主
                    opening_bank:"",//开户行
                    alipay_acount:"",//支付宝帐号
                    wechat_acount:"",//微信支付帐号
                    apply_staff_id:"",//申请退款的员工ID，仅在从前台申请退款时用
                    apply_staff_name:"",//申请退款的员工姓名，仅在从前台申请退款时用
                    real_refund_amount:"",//实际退款金额
                    real_refund_time:"",//实际退款时间
                    refund_staff_id:"",//实际退款员工ID
                    refund_staff_name:"",//实际退款员工姓名
                    refund_status:"",//申请退款状态：申请退款，退款成功
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
                this.ruleForm.id=this.changeForm2.id; //学生id
                this.ruleForm.student_id=this.changeForm2.student_id; //学生id
                this.ruleForm.student_name = this.changeForm2.student_name;   //学生姓名
                this.ruleForm.class_id = this.changeForm2.class_id;  //班级id
                this.ruleForm.class_name = this.changeForm2.class_name; //班级名称
                this.ruleForm.order_id = this.changeForm2.order_id;  //订单ID
                this.ruleForm.total_price = this.changeForm2.total_price //订单总价
                this.ruleForm.real_payment = this.changeForm2.real_payment; //订单实付价
                this.ruleForm.total_times = this.changeForm2.total_times; //支付类型
                this.ruleForm.left_times = this.changeForm2.left_times; //订单编号
                this.ruleForm.refund_apply_time = this.changeForm2.refund_apply_time //业务流水号
                this.ruleForm.refund_apply_source = this.changeForm2.refund_apply_source; //操作员工id
                this.ruleForm.apply_refund_amount = this.changeForm2.apply_refund_amount;//操作员工姓名
                this.ruleForm.refund_reason = this.changeForm2.refund_reason;//请求方式
                this.ruleForm.refund_pay_type = this.changeForm2.refund_pay_type //创建日期
                this.ruleForm. bankcard_no = this.changeForm2. bankcard_no //修改日期
                this.ruleForm. bank_card_payee = this.changeForm2. bank_card_payee //修改日期
                this.ruleForm. opening_bank = this.changeForm2. opening_bank //修改日期
                this.ruleForm. alipay_acount = this.changeForm2. alipay_acount //修改日期
                this.ruleForm. wechat_acount = this.changeForm2. wechat_acount //修改日期
                this.ruleForm. apply_staff_id = this.changeForm2. apply_staff_id //修改日期
                this.ruleForm. apply_staff_name = this.changeForm2. apply_staff_name //修改日期
                this.ruleForm. real_refund_amount = this.changeForm2. real_refund_amount //修改日期
                this.ruleForm. refund_staff_id = this.changeForm2. refund_staff_id //修改日期
                this.ruleForm. refund_staff_name = this.changeForm2. refund_staff_name //修改日期
                this.ruleForm. refund_status = this.changeForm2. refund_status //修改日期
                this.ruleForm. created_at = this.changeForm2. created_at //修改日期
                this.ruleForm. updated_at = this.changeForm2. updated_at //修改日期
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
                    refundApplySource:this.refund_apply_source, //申请退款来源
                    refundPayType:this.refund_pay_type, //退款支付的类型
                    refundStatus:this.refund_status, //申请退款的状态

                };
                console.log("查询退款订单发起请求的参数", objData);
                this.$axios.post(this.GlobalVal.httpLink.queryRefundRecord, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            console.log("查询支付订单列表获取的对象", res.data);
                            self.count = res.data.count;
                            self.dataList = res.data.refundRecords;
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
            //搜索退款---刷新
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
                            refundRecord:this.varJug(this.ruleForm),

                        };
                        console.log("新增/修改退款订单发起请求的参数",objData);
                        this.$axios.post(this.GlobalVal.httpLink.editRefundRecord,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("新增/修改退款订单获取的对象",res.data);
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
                    this.$axios.post(this.GlobalVal.httpLink.delRefundRecord,JSON.stringify(objData)).then(
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
                        this.$axios.post(this.GlobalVal.httpLink.delRefundRecord,JSON.stringify(objData)).then(
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
