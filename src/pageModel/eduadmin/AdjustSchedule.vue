<template>
    <div class="table">
        <div class="handle-box">
            <el-input v-model="select_word" size="mini" placeholder="" class="handle-input mr10" @keyup.enter.native="search" placeholder="输入要搜索学生的姓名/电话"></el-input>
            <el-button type="primary" size="mini" icon="search"  @click="search">搜索</el-button>
        </div>
        <el-table :data="data" size="mini" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="student_no" label="学号"></el-table-column>
            <el-table-column prop="student_name" label="姓名"></el-table-column>
            <el-table-column prop="student_sex" label="性别"></el-table-column>
            <el-table-column prop="student_gread" label="年级"></el-table-column>
            <el-table-column prop="student_mobile_computed" label="学生电话"></el-table-column>
            <el-table-column prop="class_name" label="所在班级"></el-table-column>
            <el-table-column prop="campus_name" label="校区"></el-table-column>
            <el-table-column prop="teacher_name" label="任课老师"></el-table-column>
            <el-table-column prop="start_end_time" label="时间段"></el-table-column>
            <el-table-column prop="class_type" label="状态"></el-table-column>
            <el-table-column label="业务办理" width="150">
                <template slot-scope="scope">
                    <el-dropdown size="mini" type="primary" trigger="click" @command="handleCommand">
                        <el-button  size="mini" type="primary">
                            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{command:'turnClass',row:scope.row}">转班</el-dropdown-item>
                            <el-dropdown-item :command="{command:'turnObject',row:scope.row}">调课</el-dropdown-item>
                            <!--<el-dropdown-item :command="{command:'leave',row:scope.row}">请假</el-dropdown-item>-->
                            <el-dropdown-item :command="{command:'payment',row:scope.row}">缴费</el-dropdown-item>
                            <el-dropdown-item v-if="scope=='01302'||scope=='01303'" :command="{command:'refund',row:scope.row}">退费</el-dropdown-item>
                            <!--<el-dropdown-item :command="{command:'refund',row:scope.row}">退费</el-dropdown-item>-->
                        </el-dropdown-menu>
                    </el-dropdown>
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
        <!--缴费弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="paymentLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="paymentLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="paymentLayer=!paymentLayer"><i class="el-icon-close"></i></div>
                            <h3 class="modify-title">缴费</h3>
                        </div>
                        <el-form :model="paymentForm"
                                 :rules="rules"
                                 size="mini"
                                 ref="ruleForm"
                                 label-width="100px"
                                 style="overflow-y: scroll;">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="应收款" prop="total_fee">
                                        <el-input style="width: 100%;" @blur="parseFloatRule('realPrice')" v-model="paymentForm.realPrice"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="实收款">
                                        <el-input style="width: 100%;" @blur="parseFloatRule('realPayment')" v-model="paymentForm.realPayment"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="折扣">
                                <el-input style="width: 100%;" @blur="parseFloatRule('discount')" v-model="paymentForm.discount" placeholder="例如85折,填写:0.85"></el-input>
                            </el-form-item>
                            <el-form-item label="打折原因">
                                <el-input
                                        style="width: 100%;"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="paymentForm.discountReason">
                                </el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="优惠券">
                                        <el-select v-model="chooseCoupon"
                                                   @change="handlerCouponChange"
                                                   size="mini"
                                                   placeholder="请选择"
                                                   style="width: 100%;">
                                            <el-option
                                                    v-for="item in couponOptions"
                                                    :key="item.coupon_id"
                                                    :label="item.coupon_name"
                                                    :value="item">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="支付方式">
                                        <el-select v-model="paymentForm.paymentType" size="mini" placeholder="请选择" style="width: 100%;">
                                            <el-option
                                                    v-for="item in $store.state.PaymentTypeOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="业务流水">
                                        <el-input style="width: 100%;" v-model="paymentForm.tradeno" placeholder="填入业务流水号或POS机号"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="手续费">
                                        <el-input style="width: 100%;" @blur="parseFloatRule('serviceCharge')" v-model="paymentForm.serviceCharge"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="财务收入" prop="total_fee">
                                        <el-input style="width: 100%;" @blur="parseFloatRule('financialIncome')" v-model="paymentForm.financialIncome"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="收费项目">
                                        <el-input style="width: 100%;" v-model="paymentForm.chargeItem"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item>
                                <el-button type="primary" @click="submitPaymentForm('paymentForm')">缴费</el-button>
                                <el-button @click="paymentLayer=!paymentLayer">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
        </transition>
        <!--退费的弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="refundLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="refundLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="refundLayer=!refundLayer"><i class="el-icon-close"></i></div>
                            <h3 class="modify-title">退费</h3>
                        </div>
                        <el-form :model="paymentForm"
                                 :rules="rules"
                                 size="mini"
                                 ref="refundForm"
                                 label-width="100px"
                                 style="overflow-y: scroll;">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="总价">
                                        {{rowInfo.total_price}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="实付款">
                                        {{rowInfo.real_payment}}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="课程总次数">
                                        {{rowInfo.total_times}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="剩余次数">
                                        {{rowInfo.left_times}}
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-form-item label="实际退款金额">
                                <div style="color: #ff6942;font-weight: bold;">{{refundForm.refundAmount}}</div>
                            </el-form-item>
                            <el-form-item label="退款原因">
                                <el-input
                                        style="width: 100%;"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="refundForm.refundReason">
                                </el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="退款方式">
                                        <el-select v-model="refundForm.refundPayType"
                                                   size="mini"
                                                   placeholder="请选择"
                                                   style="width: 100%;">
                                            <el-option
                                                    v-for="item in $store.state.RefundTypeOptions"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row v-if="refundForm.refundPayType==='01201'">
                                <el-form-item label="微信号">
                                    <el-input style="width: 100%;" v-model="refundForm.wechatAcount" placeholder="请填写要退款的微信号"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row v-if="refundForm.refundPayType==='01202'">
                                <el-form-item label="支付宝账号" prop="total_fee">
                                    <el-input style="width: 100%;" v-model="refundForm.alipayAcount" placeholder="请填写要退款的支付宝账号"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row v-if="refundForm.refundPayType==='01205'">
                                <el-col :span="12">
                                    <el-form-item label="银行卡卡号">
                                        <el-input style="width: 100%;" v-model="refundForm.bankCardNo"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="收款人">
                                        <el-input style="width: 100%;" v-model="refundForm.bankCardPayee"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="开户行">
                                        <el-input style="width: 100%;" v-model="refundForm.openingBank"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-form-item>
                                <el-button type="primary" @click="submitRefundForm('refundForm')">退费</el-button>
                                <el-button @click="refundLayer=!refundLayer">取消</el-button>
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
                select_word:"",  //搜索的值
                studentMobile:"",  //学生电话号码搜索
                studentName:"",     //学生名字搜索

                rowInfo:{}, //要操作的当前行
                couponOptions:{},//获取的优惠券信息
                chooseCoupon:{}, //选择的优惠券信息
                /*01201 微信
                01202 支付宝
                01203 现金
                01205 银行卡*/
                showRefundPayType:"", //




                //-------------------------------------

                role_name:"",
                status:"",
                organ_id2:[], //新增组件内的学校id,
                dataList:[], //请求的list

                roleIds:[],

                location: [],  //校区导航
                selectedLocation: [], //选择校区

                /*弹出框*/
                paymentLayer:false,
                refundLayer:false,

                addTeamLayer:false,  //新增弹出框状态
                changeTeamLayer:false,  //修改弹出框状态
                //缴费参数
                paymentForm:{
                    realPrice:"",//float,应收款，即总价减去优惠券再减去折扣后的价钱
                    realPayment:"", //float，实收款
                    discount:"", //float,折扣
                    discountReason:"",//打折原因
                    couponId:666, //优惠券ID
                    couponName:"优惠券名字",//优惠券名称
                    couponAmount:60,//优惠券金额
                    paymentType:"",//支付方式：包括  微信，    支付宝，    现金，POS机，银行卡
                    tradeno:"", //业务流水号，POS机号
                    serviceCharge:0,//手续费
                    financialIncome:0,//财务收入
                    chargeItem:"",//收费项目
                },
                //退费参数
                refundForm:{
                    refundAmount:0,//float,实际退款金额
                    refundReason:"",//退款原因
                    refundPayType:"",//退款方式：现金，银行卡，微信，支付宝
                    bankCardNo:"",//银行卡卡号，银行卡退款时用
                    bankCardPayee:"", //银行卡收款人，银行卡退款时用
                    openingBank:"",//开户行,银行卡退款时用
                    alipayAcount:"",//支付宝帐号,支付宝支付时用
                    wechatAcount:""//微信号，微信支付时用
                },

                ruleForm:{  //新增数据
                    student_id:null,  //此课学生的唯一id int,  --> 如果为新增,此值为空字符串
                    student_name:"", //学生姓名
                    student_no:null, //学生学号
                    student_birthday:null, //学生生日
                    student_grade:"",  //年级    [10010]
                    student_mobile:"", //学生电话   ==>可能为空
                    primary_school:"", //小学名字
                    middle_school:"", //中学名字
                    high_school:"",//高中名字
                    enter_score:"",//入学成绩，百分制
                    matching_class:"", //班型,(string)  ==> 数组转得字符串 ["10004,10005"]
                    home_address:"", //家庭住址
                    father_name:"",   //父亲名字
                    father_mobile:"",  //父亲电话号码
                    father_sms_enable: false,  // 父亲是否接收短信 (true:接收,folse:不接收)
                    mother_name:"",  //母亲名字
                    mother_mobile:"", //母亲电话号码
                    mother_sms_enable:false, //母亲是否接受短信   (true:接收,folse:不接收)
                    student_status:"",  //学生状态: 已注册，已试听，已测试，公益课，已报名，已缴费，已候补，短期班在读，长期班在读，学习完成，申请退费，已退费
                    created_at:null, //创建时间,时间戳
                },
                //表单校验规则
                rules: {
                    student_name: [
                        { required: true, message: '请输入学生名称', trigger: 'blur' },
                    ]
                },

                upload:false,

            }
        },
        mounted(){
            this.Util.querySysconst(this,"012",this.$store.state.PaymentTypeOptions);//查询支付方式
        },
        //实例创建完成后被立即调用
        created() {
            const self= this;
            self.getData();
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
                    if(d.student_mobile){
                        d.student_mobile_computed=self.Util.formatPhone(d.student_mobile)
                    }else{
                        d.student_mobile_computed="无"
                    }
                    if(d.student_birthday){
                        d.student_birthday_computed=self.Util.TimeCycle(d.student_birthday, "ymd")
                    }
                    if(d.matching_class){
                        d.matching_class_computed=self.Util.changeCode(d.matching_class)
                    }
                    d.start_end_time = d.start_time+"-" + d.end_time;
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
                const self = this;
                if((/^\d+$/).test(this.select_word) && this.select_word!==""){
                    console.log('1');
                    self.studentMobile = this.select_word;
                    self.studentName=null
                }else if(this.select_word!==""){
                    console.log('2');
                    self.studentName= this.select_word;
                    self.studentMobile =null
                }else{
                    console.log('3');
                    self.studentName =null;
                    self.studentMobile=null
                }
            },
            changeForm2:function () {//修改的参数赋值
                this.ruleForm.student_status=this.changeForm2.student_status;
                this.ruleForm.student_id=this.changeForm2.student_id;  //此课学生的唯一id int,  --> 如果为新增,此值为空字符串
                this.ruleForm.student_name=this.changeForm2.student_name; //学生姓名
                this.ruleForm.student_no=this.changeForm2.student_no; //学生学号
                this.ruleForm.student_birthday=this.changeForm2.student_birthday; //学生生日
                this.ruleForm.student_grade=this.changeForm2.student_grade;  //年级    [10010]
                this.ruleForm.student_mobile=this.changeForm2.student_mobile; //学生电话   ==>可能为空
                this.ruleForm.primary_school=this.changeForm2.primary_school; //小学名字
                this.ruleForm.middle_school=this.changeForm2.middle_school; //中学名字
                this.ruleForm.high_school=this.changeForm2.high_school;//高中名字
                this.ruleForm.enter_score=this.changeForm2.enter_score;//入学成绩，百分制
                this.ruleForm.matching_class=this.changeForm2.matching_class; //班型,(string)  ==> 数组转得字符串 ["10004,10005"]
                this.ruleForm.home_address=this.changeForm2.home_address; //家庭住址
                this.ruleForm.father_name=this.changeForm2.father_name;   //父亲名字
                this.ruleForm.father_mobile=this.changeForm2.father_mobile;  //父亲电话号码
                this.ruleForm.father_sms_enable=this.changeForm2.father_sms_enable;  // 父亲是否接收短信 (true:接收,folse:不接收)
                this.ruleForm.mother_name=this.changeForm2.mother_name;  //母亲名字
                this.ruleForm.mother_mobile=this.changeForm2.mother_mobile; //母亲电话号码
                this.ruleForm.mother_sms_enable=this.changeForm2.mother_sms_enable; //母亲是否接受短信   (true:接收,folse:不接收)
                this.ruleForm.created_at=this.changeForm2.created_at; //更新时间,时间戳
            }
        },
        methods: {
            //获取数据
            getData(){
                const self =this;
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page:this.cur_page, //页数
                    limit:this.cur_limit, //条目数
                    studentName:this.studentName , //学生名字
                    studentMobile:this.studentMobile, //学生电话
                    orderSource:null, //订单来源
                    paymentType:null,//支付方式
                    paystatus:null, //支付状态
                    timeStart:null, //开始时间
                    timeEnd:null,  //结束时间
                    subject:null,  //科目
                    organId:null, //学校Id
                    orderNo:null, //订单号
                };
                console.log("查询报名表发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.querySignupOrder,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("查询报名表获取的对象",res.data);
                            self.count = res.data.count;
                            self.dataList=res.data.signupOrder;
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

            //搜索报名表---刷新
            search() {
                if(this.select_word===""){
                    this.$message({
                        type: 'error',
                        message: '未填写要搜索的姓名或电话,页面只做刷新操作'
                    });
                }
                this.getData();
            },

            //转班
            handleTurnClass(index, row) {
                this.$store.commit("setChooseSignuporder",row);
                this.$router.push({
                    path:"/turnClass",
                    query: {
                        order_id:row.order_id,
                        total_times:row.total_times,
                        left_times:row.left_times,
                        index:index
                    }
                });
            },
            //转课
            handleTurnObject(index, row) {

            },
            //请假
            /*handleLeave(index, row) {

            },*/
            //缴费
            submitPaymentForm(paymentForm) {
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    source:this.GlobalVal.constants.source,  //请求方式   Wechat，Android，PC，IOS
                    orderId:this.rowInfo.order_id, //学生报名表id
                    realPrice:parseFloat(this.paymentForm.realPrice),//float,应收款，即总价减去优惠券再减去折扣后的价钱
                    realPayment:parseFloat(this.paymentForm.realPayment), //float，实收款
                    discount:parseFloat(this.paymentForm.discount), //float,折扣
                    discountReason:this.paymentForm.discountReason,//打折原因
                    couponId:this.paymentForm.coupon_id?parseInt(this.paymentForm.coupon_id):666, //优惠券ID
                    couponName:this.paymentForm.couponName,//优惠券名称
                    couponAmount:this.paymentForm.couponAmount,//优惠券金额
                    paymentType:this.paymentForm.paymentType,//支付方式：包括  微信，    支付宝，    现金，POS机，银行卡
                    tradeno:this.paymentForm.tradeno, //业务流水号，POS机号
                    serviceCharge:parseFloat(this.paymentForm.serviceCharge),//手续费
                    financialIncome:parseFloat(this.paymentForm.financialIncome),//财务收入
                    chargeItem:this.paymentForm.chargeItem,//收费项目
                };
                console.log("缴费发起请求的参数",objData);
                this.$axios.post(this.GlobalVal.httpLink.payment,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("缴费获取的对象",res.data);
                            self.$message("缴费成功");
                            self.paymentLayer=false;
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
            //优惠券选择
            handlerCouponChange(){
                this.paymentForm.coupon_id=this.chooseCoupon.coupon_id?this.chooseCoupon.coupon_id:666;
                this.paymentForm.couponName=this.chooseCoupon.coupon_name?this.chooseCoupon.coupon_name:"优惠券名字";
                this.paymentForm.couponAmount=this.chooseCoupon.coupon_amount?this.chooseCoupon.coupon_amount:50;
            },

            //退费
            submitRefundForm(refundForm) {
                const self = this;
                this.$refs[refundForm].validate((valid) => {
                    if (valid) {
                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            source:this.GlobalVal.constants.source,  //请求方式   Wechat，Android，PC，IOS
                            orderId:this.rowInfo.order_id, //学生报名表id
                            totalPrice:self.rowInfo.total_price,//float，总价
                            realPayment:self.rowInfo.real_payment,//float,实付款
                            totalTimes:self.rowInfo.total_times,//short, 课程总次数
                            leftTimes:self.rowInfo.left_times,//short,剩余次数
                            refundAmount:self.refundForm.refundAmount,//float,实际退款金额
                            refundReason:self.refundForm.refundReason,//退款原因
                            refundPayType:self.refundForm.refundPayType,//退款方式：现金，银行卡，微信，支付宝
                            bankCardNo:self.refundForm.bankCardNo,//银行卡卡号，银行卡退款时用
                            bankCardPayee:self.refundForm.bankCardPayee, //银行卡收款人，银行卡退款时用
                            openingBank:self.refundForm.openingBank,//开户行,银行卡退款时用
                            alipayAcount:self.refundForm.alipayAcount,//支付宝帐号,支付宝支付时用
                            wechatAcount:self.refundForm.wechatAcount//微信号，微信支付时用
                        };
                        console.log("退费发起请求的参数",objData);
                        this.$axios.post(this.GlobalVal.httpLink.refund,JSON.stringify(objData)).then(
                            res=>{
                                if(res.data.code==="10000"){
                                    console.log("缴费获取的对象",res.data);
                                    self.$message("退费成功");
                                    self.refundLayer=false;
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
                    } else {
                        return false;
                    }
                });

            },
            //业务办理功能选择
            handleCommand(obj){
                const self = this;
                if(obj.command==="turnClass"){ //转班
                    this.handleTurnClass(1,obj.row);
                }
                if(obj.command==="turnObject"){ //调课
                    this.handleTurnClass(2,obj.row);
                }
                /*if(obj.command==="leave"){ //请假
                    this.handleLeave(3,obj.row);
                }*/
                if(obj.command==="payment"){ //选择缴费
                    this.paymentLayer=true;
                    this.rowInfo=obj.row;
                    //清空参数
                    this.couponOptions=[];
                    this.paymentForm.realPrice="";//float,应收款，即总价减去优惠券再减去折扣后的价钱
                    this.paymentForm.realPayment=""; //float，实收款
                    this.paymentForm.discount=""; //float,折扣
                    this.paymentForm.discountReason="";//打折原因
                    this.paymentForm.couponId=666; //优惠券ID
                    this.paymentForm.couponName="优惠券名字";//优惠券名称
                    this.paymentForm.couponAmount=60;//优惠券金额
                    this.paymentForm.paymentType="";//支付方式：包括  微信，    支付宝，    现金，POS机，银行卡
                    this.paymentForm.tradeno=""; //业务流水号，POS机号
                    this.paymentForm.serviceCharge=0;//手续费
                    this.paymentForm.financialIncome=0;//财务收入
                    this.paymentForm.chargeItem="";//收费项目

                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        source:this.GlobalVal.constants.source,  //请求方式   Wechat，Android，PC，IOS
                        isvalid:true,//优惠券是否有效 true-有效，false-无效
                    };
                    console.log("查询优惠券发起请求的参数",objData);
                    this.$axios.post(this.GlobalVal.httpLink.querySignupOrder,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code==="10000"){
                                console.log("查询优惠券获取的对象",res.data);
                                self.count = res.data.count;
                                self.couponOptions=res.data.coupon;
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
                if(obj.command==="refund"){ //退费
                    this.refundLayer=true;
                    this.rowInfo=obj.row;
                    //清空参数

                    //实付款-原价/总次数*上了的次数=退款金额。
                    this.refundForm.refundAmount=parseFloat(obj.row.real_payment - (obj.row.total_price / obj.row.total_times) * (obj.row.total_times - obj.row.left_times)).toFixed(2);
                }
            },
            /**
             * 自动转换为浮点类的数
             * @param val
             */
            parseFloatRule(val){
                const self = this;
                if(this.paymentForm[val]){
                    if(this.paymentForm[val].match(/\d+.+/)){
                        this.paymentForm[val] = parseFloat(self.paymentForm[val].match(/\d+.+/)[0])
                    }
                    else{
                        this.paymentForm[val]=0;
                    }
                }
            },
            /**
             * 自动转换为整形的数
             * @param val
             */
            parseIntRule(val){
                console.log(val);
                const self = this;
                if(this.paymentForm[val]){
                    if(this.paymentForm[val].match(/\d+.+/)){
                        this.paymentForm[val] = parseInt(self.paymentForm[val].match(/\d+.+/)[0])
                    }
                    else{
                        this.paymentForm[val]=0;
                    }
                }
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
    .transition-box {
        position: absolute;
        width: 600px;
        height: 440px;
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
