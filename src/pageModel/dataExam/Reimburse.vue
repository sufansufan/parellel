<template>
    <div class="table">
        <el-table :data="data" size="mini" stripe style="width: 100% ;margin-top:10px;" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="student_name" label="学生姓名"></el-table-column>
            <el-table-column prop="class_name" label="班级名称"></el-table-column>
            <el-table-column prop="refund_times" label="退款课次"></el-table-column>
            <el-table-column prop="refund_apply_time" label="申请退款时间"></el-table-column>
            <el-table-column prop="bankcard_no" label="银行卡卡号"></el-table-column>
            <el-table-column prop="audit_staff_name" label="审核人姓名"></el-table-column>

            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary"
                               @click="handleEdit(scope.$index, scope.row)">详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--详情/修改弹出框-->
        <transition name="el-fade-in-linear">
            <div v-show="addTeamLayer" class="bg-layer">
                <transition name="el-zoom-in-center">
                    <div v-if="addTeamLayer" class="transition-box">
                        <div class="title-warp">
                            <div class="close-btn" @click="addTeamLayer=!addTeamLayer"><i class="el-icon-close"></i></div>
                            <h3 v-if="!changeTeamLayer" class="modify-title">新增中小学</h3>
                            <h3 v-if="changeTeamLayer" class="modify-title">编辑学生信息</h3>
                        </div>
                        <el-form :model="changeForm2"
                                 size="mini"
                                 :rules="rules"
                                 ref="changeForm2"
                                 label-width="100px"
                                 font="16px"
                                 style="height: 100%;">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="学生姓名" prop="class_name" disabled>
                                        {{changeForm2.student_name}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="班级名称" prop="class_name" disabled>
                                        {{changeForm2.class_name}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="订单总价" prop="total_price" disabled>
                                        {{changeForm2.total_price}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="购买次数" prop="buyTimes" disabled>
                                        {{changeForm2.buyTimes}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="签到次数" prop="checkin_num" disabled>
                                        {{changeForm2.checkin_num}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="申请退款原因" prop="refund_reason" disabled>
                                        {{changeForm2.refund_reason}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="退款课次" prop="refund_times" disabled>
                                        {{changeForm2.refund_times}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="银行卡卡号" prop="bankcard_no" disabled>
                                        {{changeForm2.bankcard_no}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="审核人姓名" prop="audit_staff_name" disabled>
                                        {{changeForm2.audit_staff_name}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="审核时间" prop="audit_time" disabled>
                                        {{changeForm2.audit_time}}
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="实际退款金额" prop="total_price" disabled>
                                        {{changeForm2.total_price}}

                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="实际退款时间" prop="real_refund_time" disabled>
                                        {{changeForm2.real_refund_time}}
                                    </el-form-item>
                                </el-col>
                                <!--审核是否通过按钮-->
                                <el-col style="padding-top: 20px;text-align: center">
                                    <el-button type="primary" size="mini" icon="delete" class="handle-del mr10" @click="Verify">确认退款</el-button>
                                    <!--<el-button size="mini" type="primary" @click="">审核不通过</el-button>-->
                                </el-col>
                            </el-row>
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
            return {
                /*变量*/
                page: 0,//页码
                limit: 10,//一次查询多少条
                count: "",//数据总量
                multipleSelection: [],//多选数据
                dataList: [],//List
                /*弹出框*/
                addTeamLayer: false,  //新增弹出框状态
                noStandard: [],//审核不合格
                //表单校验规则
                rules: {
                    /*school_name: [
                        { required: true, message: '请输入学校名称', trigger: 'blur' },
                    ],*/
                },
                ruleForm: {
                    //编辑数据
                },
                //接收当前行的信息
                changeForm2: {},
                input: '',
            }
        },
        created() {
            this.getData();
        },
        computed: {
            //相当于过滤器
            data() {
                const self = this;
                if (!self.dataList) {
                    return []
                }
                return self.dataList.filter(function (d) {
                    return d;
                });
            },
        },
        methods: {
            //获取数据
            getData() {
                const self = this;
                let objData = {
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page: this.page,
                    limit: this.limit,
                    source: "PC",
                };
                this.$axios.post(this.GlobalVal.httpLink.queryRefundRecordByStatus1, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            console.log("获取异常状态的父母信息", res.data);
                            self.dataList = res.data.refundRecords;
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.errmsg
                            });
                        }
                    }, res => {
                        this.$message("请求失败")
                    }
                );
            },
            //将选中的行存储在一个变量中
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //详情按钮事件
            handleEdit(index, row) {
                this.changeTeamLayer = true;
                this.addTeamLayer = true;
                this.changeForm2 = row;
                const self = this;
                /*let objData = {
                    source:this.GlobalVal.constants.source,  //请求方式   Wechat，Android，PC，IOS
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    page: this.page, //页数
                    limit: this.limit, //条目数
                    parents_name:row.parents_name, //家长姓名
                    parents_mobile:row.parents_mobile, //家长电话
                };
                console.log("查询关联学员发起请求的参数", objData)
                this.$axios.post(this.GlobalVal.httpLink.queryStudentByParents, JSON.stringify(objData)).then(
                    res => {
                        if (res.data.code === "10000") {
                            console.log("查询关联学员列表获取的对象", res.data);
                            self.count = res.data.count;
                            self.dataList1 = res.data.students;
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
                )*/
            },
            //确认退款
            Verify() {
                const self = this;
                this.$confirm('确定进行退款操作, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let objData = {
                        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        source: "PC",
                        refundRecord: {
                            id: this.changeForm2.id,
                            refund_status: "02003",
                            student_id: this.changeForm2.student_id,//学生id(携带原有数据)
                            student_name: this.changeForm2.student_name,//学生姓名(携带原有数据)
                            class_id: this.changeForm2.class_id,//班级id(携带原有数据)
                            class_name: this.changeForm2.class_name,//班级名称(携带原有数据)
                            order_id: this.changeForm2.order_id,//订单id(携带原有数据)
                            class_total_price: this.changeForm2.class_total_price,//班级课程总价(携带原有数据)
                            total_times: this.changeForm2.total_times,//课程总次数(携带原有数据)
                            single_price: this.changeForm2.single_price,//课程单价(携带原有数据)
                            total_price: this.changeForm2.total_price,//订单总价=单价*购买次数(携带原有数据)
                            buytimes: this.changeForm2.buytimes,//购买次数(携带原有数据)
                            real_price: this.changeForm2.real_price,//订单应付款: 实际价钱，指总价减去折扣，减去优惠券的价钱(携带原有数据)
                            real_payment: this.changeForm2.real_payment,//订单实付款: 实际支付的价钱(携带原有数据)
                            debt: this.changeForm2.debt,//欠款: 应收款与实付款这差(携带原有数据)
                            liberal_type: this.changeForm2.liberal_type,//优惠类型：均价优惠还是买赠优惠(携带原有数据)
                            refund_single_price: this.changeForm2.refund_single_price,//根据优惠类型计算出来的退款单价(携带原有数据)
                            checkin_num: this.changeForm2.checkin_num,//签到次数即上课次数(携带原有数据)
                            refund_times: this.changeForm2.refund_times,//退款课次：=购买课次-上课次数(携带原有数据)
                            class_refund_amount: this.changeForm2.class_refund_amount,//课程退款金额：退款单价*退款课次(携带原有数据)
                            other_refund_amount: this.changeForm2.other_refund_amount,//其它退款金额，根据情况灵活机动(携带原有数据)
                            refund_apply_time: this.changeForm2.refund_apply_time,//申请退款时间(携带原有数据)
                            refund_apply_source: "PC",//申请退款来源(携带原有数据)
                            apply_refund_amount: this.changeForm2.apply_refund_amount,//申请退款金额: 申请退款金额=classRefundAmount+otherRefundAmount(携带原有数据)
                            refund_reason: this.changeForm2.refund_reason,//申请退款原因(携带原有数据)
                            refund_pay_type: this.changeForm2.refund_pay_type,//退款支付类型(携带原有数据)
                            bankcard_no: this.changeForm2.bankcard_no,//银行卡卡号(携带原有数据)
                            bank_card_payee: this.changeForm2.bank_card_payee,//银行卡户主(携带原有数据)
                            opening_bank: this.changeForm2.opening_bank,//开户行(携带原有数据)
                            alipay_acount: this.changeForm2.alipay_acount,//支付宝帐号(携带原有数据)
                            wechat_acount: this.changeForm2.wechat_acount,//微信支付帐号(携带原有数据)
                            apply_staff_id: this.changeForm2.apply_staff_id,//申请退款的员工ID，仅在从前台申请退款时用(携带原有数据)
                            apply_staff_name: this.changeForm2.apply_staff_name,//申请退款的员工姓名，仅在从前台申请退款时用(携带原有数据)
                            audit_staff_id: this.changeForm2.audit_staff_id,//审核人id(携带原有数据)
                            audit_staff_name: this.changeForm2.audit_staff_name,//审核人姓名(携带原有数据)
                            audit_time: this.changeForm2.audit_time,//审核时间(携带原有数据)
                            real_refund_amount: this.input,//实际退款金额(携带原有数据)
                            real_refund_time: this.changeForm2.real_refund_time,//实际退款时间(携带原有数据)
                            refund_staff_id: this.changeForm2.refund_staff_id,//实际退款员工ID(携带原有数据)
                            refund_staff_name: this.changeForm2.refund_staff_name,//实际退款员工姓名(携带原有数据)
                            created_at: this.changeForm2.created_at,//创建时间(携带原有数据)
                        },
                    };
                    this.$axios.post(this.GlobalVal.httpLink.editRefundRecord, JSON.stringify(objData)).then(
                        res => {
                            if (res.data.code === "10000") {
                                this.addTeamLayer = false;
                                this.getData();
                                this.$message({
                                    type: 'success',
                                    message: "审核通过！",
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.errmsg
                                });
                            }
                        },
                    );
                })
            },
            aaa() {
                console.log(this.input);
            }
        },
    }
</script>
<style>
    /*新增*/
    .bg-layer {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }

    .transition-box.change {
        height: 400px;
        min-height: 400px;
    }

    .transition-box {
        position: absolute;
        width: 750px;
        height: 400px;
        margin: auto;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        border-radius: 4px;
        background-color: #ffffff;
        color: #333;
        padding-top: 60px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        box-sizing: border-box;
        z-index: 10;
    }

    .title-warp {
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

    .title-warp > h3 {
        font-size: 16px;
    }

    .transition-box .el-cascader {
        width: 100%;
    }

    .el-icon-close::before {
        line-height: 50px;
        color: #b7b7b7;
    }

    .close-btn {
        position: absolute;
        color: #b7b7b7;
        font-size: 24px;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .modify-title {
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        color: #666666;
        border-bottom: 1px solid #cccccc;
        text-align: left;
        padding-left: 20px;
    }
</style>
