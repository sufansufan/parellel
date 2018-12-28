<template>
  <div class="finance-order-manage">
    <!-- <Refund-title-list>
      <ul>
        <li>
          <span>●</span>
          <div>
            <p>总收入</p>
            <p>￥ {{0}}</p>
          </div>
        </li>
        <li>
          <span>●</span>
          <div>
            <p>课程收入</p>
            <p>￥ {{0}}</p>
          </div>
        </li>
        <li>
          <span>●</span>
          <div>
            <p>其他收费</p>
            <p>￥ {{0}}</p>
          </div>
        </li>
        <li>
          <span>●</span>
          <div>
            <p>报名总人数</p>
            <p>￥ {{0}}</p>
          </div>
        </li>
        <li>
          <span>●</span>
          <div>
            <p>报名总人次</p>
            <p>{{0}}</p>
          </div>
        </li>
        <li>
          <span>●</span>
          <div>
            <p>订单总数</p>
            <p>{{0}}</p>
          </div>
        </li>
      </ul>
    </Refund-title-list> -->
    <OrderList :isAdmin="true" ref="orderList">
      <div class="select-tools" slot="tableSelect">
        <div>
          <el-date-picker clearable v-model="times" type="daterange" align="right" size="mini" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
        <div>
          <el-cascader size="mini" clearable expand-trigger="click" :options="$store.state.location" v-model="selectedLocation" placeholder="学校不限" change-on-select>
          </el-cascader>
        </div>
        <div>
          <el-select clearable v-model="options.watch.orderStatus" placeholder="状态" size="mini">
            <el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input clearable v-model="options.class_name" placeholder="请输入班级名称" class="input-with-select" size="mini" @keyup.native.enter="getOrderData">
            <span slot="prepend">班级名称</span>
            <el-button icon="el-icon-search" slot="append" @click="getOrderData"></el-button>
          </el-input>
        </div>
        <div>
          <el-input clearable v-model="options.tradeno" placeholder="请输入流水号" class="input-with-select" size="mini" @keyup.native.enter="getOrderData">
            <span slot="prepend">流水号</span>
            <el-button icon="el-icon-search" slot="append" @click="getOrderData"></el-button>
          </el-input>
        </div>
        <div>
          <el-input clearable v-model="options.big_order_id" placeholder="请输入订单ID" class="input-with-select" size="mini" @keyup.native.enter="getOrderData">
            <span slot="prepend">订单ID</span>
            <el-button icon="el-icon-search" slot="append" @click="getOrderData"></el-button>
          </el-input>
        </div>
        <div>
          <el-input clearable v-model="options.studentName" placeholder="请输入学生姓名/手机号" class="input-with-select" size="mini" @keyup.native.enter="getOrderData">
            <span slot="prepend">学生姓名/手机号</span>
            <el-button icon="el-icon-search" slot="append" @click="getOrderData"></el-button>
          </el-input>
        </div>
        <div>
          <el-input clearable v-model="options.teacherName" placeholder="请输入老师姓名" class="input-with-select" size="mini" @keyup.native.enter="getOrderData">
            <span slot="prepend">老师姓名</span>
            <el-button icon="el-icon-search" slot="append" @click="getOrderData"></el-button>
          </el-input>
        </div>
        <div>
          <el-select clearable v-model="options.watch.particularYear" placeholder="选择年份" size="mini">
            <el-option v-for="item in $store.state.YearOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.season" placeholder="选择季节" size="mini">
            <el-option v-for="item in $store.state.SeasonOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.periods" placeholder="选择期别" size="mini">
            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.grade" placeholder="选择年级" size="mini">
            <el-option v-for="item in $store.state.GradeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.subject" placeholder="选择科目" size="mini">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.projectType" placeholder="选择类别" size="mini">
            <el-option v-for="item in $store.state.CourseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select clearable v-model="options.watch.classType" placeholder="选择班型" size="mini">
            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="export-order">
          <el-button type="primary" size="mini" @click="exportOrder">导出</el-button>
        </div>
      </div>
      <template slot="operationButton" slot-scope="scope">
        <el-button type="text" size="mini" @click="modifyTime(scope.row)" :style="{color: '#e6a23c', display: $store.state.code.includes('131002') ? '' : 'none'}">修改时间</el-button>
        <el-button type="text" size="mini" @click="modifyPrice(scope.row)" :style="{color: '#e6a23c', margin: '5px 0', display: $store.state.code.includes('131002') ? '' : 'none'}">修改金额</el-button>
        <!-- <el-button type="text" size="mini" style="color: red">订单终结</el-button> -->
      </template>
    </OrderList>
    <Dialog ref="modifyTime" title="修改订单时间" bodyWid="500px" bodyTop="200px" titbg>
      <h4 style="margin-bottom: 5px;">订单信息</h4>
      <el-row class="lesson-list-warp" type="flex" style="margin-bottom: 8px;">
        <el-col :span="12">
          <div class="grid-content">订单ID</div>
          <p>{{orderRes.row.id}}</p>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">学员姓名</div>
          <p>{{orderRes.row.student_name}}</p>
        </el-col>
      </el-row>
      <h4 style="margin-bottom: 5px;">修改时间</h4>
      <el-row class="lesson-list-warp" type="flex" style="align-items: center;">
        <el-col :span="12">
          <div class="grid-content">原订单时间</div>
          <p>{{Util.TimeCycle(new Date(orderRes.row.old_time).getTime(), 'ymd hh-mm-ss')}}</p>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">修改后时间</div>
          <p>
            <el-date-picker size="mini" v-model="orderRes.row.pay_time" type="datetime">
            </el-date-picker>
          </p>
        </el-col>
      </el-row>
      <div style=" display: flex; justify-content: space-between; margin: 20px auto 0; text-align: center;">
        <el-input type="input" v-model="remark" style="width: 80%;" size="mini">
          <template slot="prepend">请填写修改原因</template>
        </el-input>
        <el-button type="primary" @click="handleDateModify(orderRes.row)" size="mini" :disabled="!orderRes.row.pay_time">保存</el-button>
      </div>
    </Dialog>
    <Dialog ref="modify" title="修改订单" titbg class="modify-price">
      <PayFees v-if="reLoadComponent" :modify="true" ref="payfeeBox" @getRes="getRes">
        <h4 slot="modifyAfterTitle">课程订单</h4>
        <p slot="modifyBuyTimes" slot-scope="timesProp">
          <el-input-number type="number" size="mini" class="change-times" :min="1" :max="timesProp.buyTimes.total_times" v-model.number="timesProp.buyTimes.buy_times" style="width: 100px; height: 30px;" @change="val => calcBuyTimes(val, timesProp.buyTimes, timesProp.index)" @mousewheel.native.prevent="() => false"></el-input-number>
        </p>
        <template slot="totalAmount">
          {{null}}
        </template>
        <template slot-scope="scope" slot="rowBtns">
          <el-button type="danger" size="mini" @click="savedModify(scope.index)">修改</el-button>
        </template>
      </PayFees>
      <div style="margin: -65px 20px 0;">
        <h4 style="padding: 10px 0;">其它订单</h4>
        <div style="font-size: 12px;">
          <el-row type="flex" align="middle">
            <el-col :span="10">
              收费内容
            </el-col>
            <el-col :span="3">
              数量
            </el-col>
            <el-col :span="3">
              产品单价
            </el-col>
            <el-col :span="3">
              应付金额
            </el-col>
            <el-col :span="3">
              实付金额
            </el-col>
            <el-col :span="2">
              操作
            </el-col>
          </el-row>
          <el-row type="flex" align="middle" v-for="(item, index) in orderRes.otherOrder" :key="item.oredr_id" style="padding: 10px 0; border-bottom: 1px solid #ccc">
            <el-col :span="10">
              {{item.order_name}}
            </el-col>
            <el-col :span="3">
              {{item.product_number}}
            </el-col>
            <el-col :span="3">
              ￥{{item.single_price}}
            </el-col>
            <el-col :span="3">
              ￥{{item.total_price}}
            </el-col>
            <el-col :span="3">
              <el-input-number type="number" size="mini" class="change-times" :min="0" :max="item.total_price" v-model.number="item.real_payment" style="width: 100px;" @mousewheel.native.prevent="() => false"></el-input-number>
            </el-col>
            <el-col :span="2">
              <el-button type="danger" size="mini" @click="savedModify(index, 'other')">修改</el-button>
            </el-col>
          </el-row>
          <el-row v-if="!orderRes.otherOrder.length" align="center" style="padding: 10px 0; color: #ccc;">
            <el-col :span="24" align="center">无其它订单</el-col>
          </el-row>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 15px 0 0;">
          <div style="width: 500px;">
            <el-input type="input" v-model="remark">
              <template slot="prepend">请填写修改原因</template>
            </el-input>
          </div>
          <div class="modify-commit">
            <el-button type="info" @click="$refs.modify.dialogVisible = false">关闭</el-button>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import OrderList from "../frontOffice/OrderList";
export default {
  components: {
    RefundTitleList: resolve => require(["./RefundTitleList"], resolve),
    OrderList,
    PayFees: resolve => require(["../frontOffice/PayFees"], resolve),
    Dialog: resolve => require(["../common/Dialog"], resolve)
  },
  data() {
    return {
      options: {
        tradeno: "",
        teacherName: "",
        big_order_id: "",
        studentName: "",
        studentMobile: "",
        class_name: "",
        startDate: "",
        endDate: "",

        watch: {
          organId: "",
          orderStatus: "",
          particularYear: "",
          season: "",
          periods: "",
          grade: "",
          subject: "",
          projectType: "",
          classType: ""
        }
      },
      selectedLocation: [],
      times: [],
      countMap: {},
      reLoadComponent: true,
      remark: "",
      params: {},
      orderRes: {
        row: {},
        courseOrder: [],
        otherOrder: []
      },
      mBuyTimes: 0,
      orderStatus: [
        {
          value: "01302",
          label: "已支付"
        },
        {
          value: "01303",
          label: "申请退款"
        },
        {
          value: "01304",
          label: "退款成功"
        }
      ]
    };
  },
  created() {
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
  },
  watch: {
    times: {
      handler() {
        this.getOrderData();
      },
      deep: true
    },
    "options.watch": {
      handler() {
        this.getOrderData();
      },
      deep: true
    },
    selectedLocation: function(o, n) {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.options.watch.organId = o[o.length - 1];
          this.getOrderData();
        }
      } else if (this.selectedLocation.length === 0) {
        this.options.watch.organId = "";
        this.getOrderData();
      }
    },
  },
  methods: {
    getRes(res) {
      this.discountRes = res;
    },
    calcBuyTimes(val, timesProp, index) {
      this.mBuyTimes = val;
      const res = this.$refs.payfeeBox.discountRes;
      this.$set(res, index, timesProp);
      this.$refs.payfeeBox.lineTotalPrice(timesProp.code, timesProp);
    },
    modifyPrice(row = {}) {
      this.orderRes.row = JSON.parse(JSON.stringify(row));
      this.orderRes.courseOrder = row.childOrders.filter(
        item => item.type === 1
      );
      this.orderRes.otherOrder = row.childOrders.filter(
        item => item.type === 2
      );
      this.$store.commit("setChoosePaymentItems", this.orderRes.courseOrder);
      this.mBuyTimes = this.orderRes.row.buy_times;
      this.$refs.modify.dialogVisible = true;
      this.reLoadComponent = false;
      this.$nextTick().then(() => {
        this.reLoadComponent = true;
      });
    },
    modifyTime(row = {}) {
      this.orderRes.row = JSON.parse(JSON.stringify(row));
      this.orderRes.row.pay_time = new Date(this.orderRes.row.pay_time);
      this.orderRes.row.old_time = JSON.parse(
        JSON.stringify(this.orderRes.row)
      ).pay_time;
      this.$refs.modifyTime.dialogVisible = true;
    },
    handleDateModify(row) {
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS 1
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId, // 1
        bigOrderId: row.id,
        orderIds: row.childOrders
          .filter(item => item.type === 1)
          .map(item => item.order_id),
        otherOrderIds: row.childOrders
          .filter(item => item.type === 2)
          .map(item => item.order_id),
        remark: this.remark,
        payTime: new Date(row.pay_time).getTime()
      };
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.changeOrderTime, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message.success("修改成功");
              this.getOrderData();
              this.$refs.modifyTime.dialogVisible = false;
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
            this.$message("请求失败");
          }
        );
    },
    savedModify(index, type = "course") {
      const {
        order_id,
        discount,
        discount_reason,
        subtract_amount,
        subtract_reason,
        buy_times,
        all_price,
        real_payment
      } =
        type === "other"
          ? this.orderRes.otherOrder[index]
          : this.discountRes[index];
      let params = {
        source: this.GlobalVal.constants.source,
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        orderId: order_id
      };
      params = Object.assign(
        {},
        params,
        type === "other"
          ? { realPyment: real_payment }
          : {
              discount: discount / 10,
              discountReason: discount_reason,
              subtractAmount: subtract_amount,
              subtractReason: subtract_reason,
              remark: this.remark,
              buyTimes: buy_times,
              realPyment: all_price
            }
      );
      let loadingInstance = this.$Loading();
      this.$axios
        .post(
          this.GlobalVal.httpLink[
            type === "other" ? "changeOtherPayment" : "changePayment"
          ],
          JSON.stringify(params)
        )
        .then(res => {
          loadingInstance.close();
          if (res.data.code === "10000") {
            this.$message.success("修改成功");
            this.getOrderData();
          } else {
            this.$message.error(res.data.errmsg);
          }
        })
        .catch(() => {
          loadingInstance.close();
        });
    },
    getOrderData() {
      const options = JSON.parse(JSON.stringify(this.options));
      if (options.studentName) {
        if (/^\d+$/.test(options.studentName)) {
          options.studentMobile = options.studentName;
          options.studentName = "";
        }
      }
      delete options.watch;
      const times = this.times || ["", ""];
      options.startDate = times[0];
      options.endDate = times[1];
      this.params = Object.assign({}, options, { ...this.options.watch });
      this.$refs.orderList.getData(this.params, data => {
        this.countMap = data.data.countMap;
      });
    },
    exportOrder(){
      this.params.startDate = this.Util.TimeCycle(
        new Date(this.params.startDate).getTime()
      );
      this.params.endDate = this.Util.TimeCycle(
        new Date(this.params.endDate).getTime()
      );
      this.$exportExcel({
        dataList: this.$refs.orderList.dataList,
        objData: Object.assign({},this.params,{staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,}),
        httpUrl: "exportBigOrder",
        title: this.$route.meta.title
      });
    }
  }
};
</script>
<style>
.finance-order-manage {
  padding: 20px;
}
.modify-price .el-input--mini .el-input__inner {
  height: 28px !important;
}
</style>
<style scoped>
  .export-order{
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
</style>
