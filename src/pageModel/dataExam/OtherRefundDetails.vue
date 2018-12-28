<template>
    <div class="otherRefund-details">
        <div class="otherRefund-hender">
            <b>姓名:{{rowInfoOther.student_name}}</b>
            <b>所属校区:{{rowInfoOther.organ_name}}</b>
            <b>收费校区:{{rowInfoOther.organ_name}}</b>
            <b>状态:{{rowInfoOther.refund_status}}</b>
        </div>
        <div class="line"></div>
        <div class="otherRefund-item">
            <el-row>
                <el-col :span="10" :offset="1">
                    {{rowInfoOther.order_name}}
                </el-col>
                <el-col :span="8" :offset="1">
                    ×1
                </el-col>
                <el-col :span="3" :offset="1">
                    ￥{{rowInfoOther.single_price}}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" :offset="12">
                    实付金额
                </el-col>
                <el-col :span="3" :offset="1">
                    ￥{{rowInfoOther.real_price}}
                </el-col>
            </el-row>
        </div>
            <el-row>
                <el-col :span="8" :offset="12">
                    <b>退费总额</b> 
                </el-col>
                <el-col :span="3" :offset="1">
                    <b>￥{{rowInfoOther.apply_refund_amount}}</b> 
                </el-col>
            </el-row>
        <div class="line"></div>
        <div class="otherRefund-card">
            <span>退费方式:网银转账</span>
            <span>姓名:{{rowInfoOther.bank_card_payee}}</span>
            <span>卡号:{{rowInfoOther.bankcard_no}}</span>
            <span>银行:{{rowInfoOther.bank_name}}</span>
        </div>
        <div class="line"></div>
        <el-row style="padding-top: 15px;">
            <el-col :span="24">
            <div style="display: flex; justify-content: space-between;">
                <span>退费原因</span>
                <span>申请人：{{rowInfoOther.apply_name}} | 时间：{{rowInfoOther.refund_apply_time}}</span>
            </div>
            <div style="padding: 6px 10px; line-height: 26px; height: 26px; border: 1px solid #dcdfe6; color: #6d6c6c">{{rowInfoOther.refund_reason || '未填写'}}</div>
            </el-col>
            <el-col :span="24">
            <div style="display: flex; justify-content: space-between;">
                <span>审核</span>
                <span v-if="isAdmin && rowInfoOther.refund_status >= '02002'">审核人：{{rowInfoOther.audit_name}} | 时间：{{rowInfoOther.audit_time}}</span>
                <span v-else-if="rowInfoOther.refund_status >= '02002'">审核人：{{rowInfoOther.audit_staff_name}} | 时间：{{rowInfoOther.audit_time}}</span>
            </div>
            <div style="display: flex;">
                <div v-if="isAdmin && rowInfoOther.refund_status === '02001'" style="display: flex; width: 100%;">
                <div style="width: 100%;">
                    <el-input v-model="auditOpinion" ref="auditOpinionInp" :disabled="!$store.state.code.includes('030302')" placeholder="必须填写审核意见"></el-input>
                </div>
                <div style="margin-left: 10px; width: 225px;" v-if="$store.state.code.includes('030302')">
                    <el-button size="mini" type="primary" @click="refundAudit(true)">通过
                    </el-button>
                    <el-button size="mini" type="primary" @click="refundAudit(false)">不通过
                    </el-button>
                </div>
                </div>
                <div v-else style="width: 100%; padding: 6px 10px; line-height: 26px; height: 26px; border: 1px solid #dcdfe6; color: #6d6c6c">
                {{rowInfoOther.audit_result ? ('已审核' + ' : ' + (rowInfoOther.audit_remark || '无')) : '未审核'}}
                </div>
            </div>
            </el-col>
            <el-col :span="24" v-if="rowInfoOther.audit_result === true">
            <div style="display: flex; justify-content: space-between;">
                <span>打款</span>
                <span v-if="isAdmin && rowInfoOther.refund_status === '02003'">打款人：{{rowInfoOther.refund_name}} | 时间：{{rowInfoOther.real_refund_time}}</span>
                <span v-else-if="rowInfoOther.refund_status === '02003'">打款人：{{rowInfoOther.audit_staff_name}} | 时间：{{rowInfoOther.audit_time}}</span>
            </div>
            <div v-if="isAdmin && rowInfoOther.refund_status === '02002'" style="display: flex; width: 100%;">
                <div style="width: 100%;">
                <el-input v-model="refundPayNo" placeholder="填写业务流水号" :disabled="!$store.state.code.includes('030303')"></el-input>
                </div>
                <div style="margin-left: 10px; width: 60px;" v-if="$store.state.code.includes('030303')">
                <el-button size="mini" type="primary" @click="refundPay()">打款</el-button>
                </div>
            </div>
            <div v-else style="width: calc(100% - 20px); padding: 6px 10px; line-height: 26px; height: 26px; border: 1px solid #dcdfe6; color: #6d6c6c">
                {{ rowInfoOther.refund_status === '02001' ? '等待审核' : rowInfoOther.refund_status === '02002' ? '已审核，等待打款' : ('流水号 : ' + (rowInfoOther.refund_tradeno || '无'))}}
            </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        props:['rowInfoOther'],
        data(){
            return {
                auditOpinion: '',
                refundPayNo: '',
            }
        },
        created(){
            console.log(this.rowInfoOther)
        },
        computed:{
            isAdmin() {
                return this.$route.path.includes("queryMoney");
            }
        },
        methods:{
            // 退款审核
            refundAudit(res) {
            let inp = this.$refs.auditOpinionInp.$el.children[0];
            if (this.auditOpinion === "") {
                inp.style.borderColor = "#f56c6c";
                this.$message.warning("必须填写审核意见");
                return;
            } else {
                inp.style.borderColor = "#dcdfe6";
            }
            let loadingInstance = this.$Loading();
            let objData = {
                source: this.GlobalVal.constants.source,
                staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                order_id: this.rowInfoOther.productorder_id,
                refund_record_id: this.rowInfoOther.id,
                audit_result: res,
                audit_remark: this.auditOpinion
            };
            this.$axios
                .post(this.GlobalVal.httpLink.otherRefundAudit, JSON.stringify(objData))
                .then(
                res => {
                    if (res.data.code === "10000") {
                    this.$message.success("审核成功");
                    this.$emit('closeDialog');
                    } else {
                    console.error(res);
                    this.$message({
                        type: "error",
                        message: res.data.errmsg
                    });
                    }
                    loadingInstance.close();
                },
                res => {
                    this.$message("请求失败");
                    loadingInstance.close();
                }
                );
            },
            refundPay() {
                this.$confirm(`确定发放退款?`, "提示", {
                    confirmButtonText: "发放",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                }).then(() => {
                    let objData = {
                        source: this.GlobalVal.constants.source,
                        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        order_id: this.rowInfoOther.productorder_id,
                        refund_record_id: this.rowInfoOther.id,
                        refund_tradeno: this.refundPayNo || ""
                    };
                    let loadingInstance = this.$Loading();
                    this.$axios
                        .post(this.GlobalVal.httpLink.otherRefundPay, JSON.stringify(objData))
                        .then(
                        res => {
                            if (res.data.code === "10000") {
                            this.$message.success("打款成功");
                            this.$emit('closeDialog');
                            } else {
                            this.$message({
                                type: "error",
                                message: res.data.errmsg
                            });
                            }
                            this.refundPayNo = "";
                            loadingInstance.close();
                        },
                        res => {
                            this.$message("请求失败");
                            loadingInstance.close();
                        }
                        );
                    })
                    .catch(() => {});
                },
        }
    }
</script>

<style scoped>
    .otherRefund-details{
        font-size: 16px;
        color: #000;
    }
    .otherRefund-hender{
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .line {
        width: 100%;
        height: 1px;
        background: #cccccc;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .otherRefund-item{
        background: #f5f5f5;
        color: #000;
        margin: 20px 0px;
        font-size: 16px;
    }
    .otherRefund-card{
        display: flex;
        justify-content: space-between; 
        font-size: 16px;
    }
</style>