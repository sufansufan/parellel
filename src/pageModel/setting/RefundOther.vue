<template>
  <div class="refundOther-box">
    <div class="refundOther-header" style="display: block;">
      <p>姓名: {{ruleForm.student_name}}</p>
      <p>学号: {{ruleForm.student_no}}</p>
      <p>收费项目: {{ruleForm.order_name}}</p>
    </div>
    <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="80px">
      <div class="line"></div>
      <el-row style="margin-top:30px;">
        <el-col :span="12">
          <el-form-item label="退费金额">
            <el-input style="width: 80px;" type="number" placeholder="请输入金额" @mousewheel.native.prevent="(() => false)" v-model="ruleForm.real_payment" @blur="calcPrice">
            </el-input>
          </el-form-item>
          <el-form-item label="退费备注">
            <el-input style="width: 192px;" type="text" placeholder="请输入内容" v-model="productRefundRemark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label="退费方式" prop="refundPayType">
            <el-select v-model="ruleForm.refundPayType" style="width:100%">
              <el-option label="银行卡" value="01204"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="line"></div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="bankCardPayee">
            <el-input type="text" placeholder="请输入内容" v-model="ruleForm.bankCardPayee">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-input type="text" placeholder="请输入××银行××支行" size="mini" style="margin-left:10px" v-model="ruleForm.bankName"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="银行卡号" prop="bankcardNo" style="position: relative;">
            <el-input style="width: 100%;" type="text" placeholder="请输入内容" v-model="ruleForm.bankcardNo" @blur="getBankName">
            </el-input>
            <div style="position: absolute; right: -130px; top: 0; width: 120px;">
              <img v-if="bankCode" :src="'https://apimg.alipay.com/combo.png?d=cashier&t='+bankCode">
              <span v-else style="color: #ccc; font-size: 13px;">无法识别该银行卡</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="退费原因">
        <el-input style="width: 100%;" type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.refundReason">
        </el-input>
      </el-form-item>
      <div class="refundOther-Btn">
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">退费</el-button>
        <el-button size="mini" type="primary" @click="$emit('closeDialog')">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["refundOrderData"],
  data() {
    return {
      bankCode: "",
      productRefundAmount: null,
      productRefundRemark: "",
      ruleForm: {
        refundPayType: "01204"
      },
      rules: {
        refundPayType: [
          { required: true, message: "请选择退费方式", trigger: "blur" }
        ],
        bankCardPayee: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        bankcardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
          { pattern: /^\d{10,}$/, message: "银行卡号不正确", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    refundOrderData: {
      handler() {
        this.ruleForm = JSON.parse(JSON.stringify(this.refundOrderData));
        this.ruleForm.refundPayType = "01204";
      },
      deep: true
    }
  },
  created() {
    this.ruleForm = JSON.parse(JSON.stringify(this.refundOrderData));
    this.productRefundAmount = this.ruleForm.real_payment;
    this.ruleForm.refundPayType = "01204";
  },
  methods: {
    calcPrice() {
      if (this.ruleForm.real_payment > this.productRefundAmount) {
        this.$message.error(
          `退费金额不能大于实付金额${this.productRefundAmount}`
        );
        return false;
      }
      return true;
    },
    submitForm(fromName) {
      if (!this.calcPrice()) {
        return;
      }
      if (
        this.ruleForm.real_payment < this.productRefundAmount &&
        this.productRefundRemark === ""
      ) {
        this.$message.error("退费总额小于实付金额时，备注不能为空");
        return;
      }
      this.$refs[fromName].validate(volid => {
        if (volid) {
          let loadingInstance = this.$Loading();
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            source: this.GlobalVal.httpLink.constants,
            orderId: this.ruleForm.order_id,
            refundPayType: this.ruleForm.refundPayType,
            bankCardPayee: this.ruleForm.bankCardPayee,
            bankName: this.ruleForm.bankName,
            productRefundAmount: this.ruleForm.real_payment,
            productRefundRemark: this.productRefundRemark,
            bankcardNo: this.ruleForm.bankcardNo,
            refundReason: this.ruleForm.refundReason
          };
          this.$axios
            .post(this.GlobalVal.httpLink.otherRefund, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message.success("退费成功");
                  this.$emit("closeDialog");
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
                loadingInstance.close();
                this.$message.error("请求失败");
              }
            );
        }
      });
    },
    getBankName() {
      this.$axios
        .get(
          "/bank/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=" +
            this.ruleForm.bankcardNo +
            "&cardBinCheck=true"
        )
        .then(res => {
          this.bankCode = res.data.bank;
        });
    }
  }
};
</script>

<style scoped>
.refundOther-header {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.refundOther-body {
  display: flex;
}
.refundOther-body span {
  margin-right: 20px;
  line-height: 30px;
}
.refundOther-Btn {
  width: 100%;
  text-align: center;
}
.refundOther-Btn button {
  width: 100px;
}
.line {
  width: 100%;
  height: 1px;
  background: #cccccc;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
