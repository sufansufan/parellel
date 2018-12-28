<style>
.class-query-screen .el-cascader {
  width: 15.111%;
}
.class-query-screen .el-select {
  width: 10.111%;
}
.el-input-group__append,
.el-input-group__prepend {
  border-radius: 0px !important;
}
.class-query .el-input-group__append {
  background-color: #fff;
}
/* .class-query .el-table td, .el-table th.is-leaf {
    box-sizing: border-box;
    border: 1px solid #f5f7fa;
} */
</style>
<style scoped>
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
}
.transition-box {
  position: absolute;
  width: 600px;
  height: 580px;
  margin: auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  border-radius: 4px;
  background-color: #ffffff;
  overflow-y: scroll;
  color: #fff;
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  z-index: 10;
}

.title-warp {
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
.fotter-warp {
  position: absolute;
  width: 600px;
  height: 50px;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: #ffffff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 20px;
}
.transition-box .el-cascader {
  width: 100%;
}
.close-btn {
  position: absolute;
  color: #ff6808;
  font-size: 20px;
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
.handle-box {
  margin-bottom: 20px;
}
.search-warp {
  display: flex;
  /*float: right;*/
}
.search-warp > div:not(:last-child) {
  width: 40%;
  margin-right: 3px;
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
.search-input {
  width: 400px;
}
.search-input1 {
  width: 200px;
}
.checkbox-warp {
  margin-top: 10px;
}
.class-query .el-checkbox__label {
  font-size: 12px;
}
.vertical-moulding {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: #cccccc;
  position: relative;
  top: 1px;
  left: 12px;
}
.vertical-moulding + .el-checkbox {
  margin-left: 25px;
}
.signRecord-box {
  height: 700px;
}
.order-manage{
  margin-top: -20px;
  margin-left: -20px;
}
</style>
<template>
  <div class="class-query table">
    <div v-if="$route.path === '/orderManage'">
      <div class="handle-box">
        <!--筛选旧条件-->
        <div class="class-query-screen">
          <el-date-picker style="margin-bottom: 15px;" clearable unlink-panels v-model="dateSlot" align="right" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
          <el-select clearable v-model="orderSource" size="mini" placeholder="订单来源">
            <el-option v-for="item in orderSourceList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="checkStatus" size="mini" placeholder="订单状态">
            <el-option v-for="item in orderStatus" v-if="item.show" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="paymentType" size="mini" placeholder="支付方式">
            <el-option v-for="item in $store.state.PaymentTypeOptions" :key="item.code" :label="item.pay_type_name" :value="item.code">
            </el-option>
          </el-select>
          <el-select clearable v-model="payStatus" size="mini" placeholder="支付状态">
            <el-option v-for="item in payStatusList" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="particularYear" size="mini" placeholder="年度">
            <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="season" size="mini" placeholder="季节">
            <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
            <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <el-select clearable v-model="projectType" size="mini" placeholder="类别/课型不限">
            <el-option v-for="item in $store.state.CourseTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="classType" size="mini" placeholder="班型不限">
            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" @change="handleLocationChange">
          </el-cascader>
        </div>
        <!--动态旧搜索框-->
        <br>
        <div class="search-warp">
          <el-input size="mini" clearable v-model="select_word" placeholder="请输入搜索内容" class="search-input" style="width: 400px;">
            <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
              <el-option label="学生姓名" value="student"></el-option>
              <el-option label="学生电话" value="studentMobile"></el-option>
              <el-option label="老师姓名" value="teacher"></el-option>
              <el-option label="班级" value="class"></el-option>
            </el-select>
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <el-input size="mini" clearable placeholder="请输入搜索内容" v-model="tradeno" style="width: 400px;">
            <template slot="prepend">业务流水号</template>
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <el-button v-if="!reqLink && $store.state.code.includes('011401')" @click="exportOrder" size="mini" type="primary">导出订单</el-button>
          <!-- <el-button v-if="reqLink && $store.state.code.includes('031001')" @click="$emit('removeOrder', 'all', multipleSelection,'deleteOrder')" type="danger" size="mini">删除选中的订单</el-button> -->
        </div>
      </div>
      <el-table size="mini" :data="porders" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading" :span-method="objectSpanMethod">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-if="reqLink" prop="order_id" label="订单ID" fixed></el-table-column>
        <el-table-column prop="campus_name" label="校区"></el-table-column>
        <el-table-column prop="class_name" label="班级名称" width="300" fixed></el-table-column>
        <el-table-column width="150" label="时间">
          <template slot-scope="scope">
            <div>
              {{Util.TimeCycle(new Date(scope.row.pay_time).getTime(), 'ymd hh-mm-ss')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="teacher_name" label="老师" width="100"></el-table-column>
        <el-table-column prop="student_name" label="学员姓名" fixed width="100"></el-table-column>
        <el-table-column prop="student_mobile" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="order_source" label="订单来源" width="100"></el-table-column>
        <el-table-column prop="payment_type" label="支付方式" width="120"></el-table-column>
        <el-table-column prop="paystatus" label="支付状态" width="100"></el-table-column>
        <el-table-column prop="orderStatus" fixed label="订单状态" width="100"></el-table-column>
        <el-table-column prop="total_price" label="报名金额" width="100"></el-table-column>
        <el-table-column prop="discount_price" label="折扣金额" width="100">
          <template slot-scope="scope">
            <!--  toFixed(2) -->
            {{scope.row.discount_price || 0}}
          </template>
        </el-table-column>
        <el-table-column prop="real_payment" label="实付金额" width="100"></el-table-column>
        <el-table-column label="手续费" width="100">
          <template slot-scope="scope">
            <!--  toFixed(2) -->
            {{scope.row.service_charge}}
          </template>
        </el-table-column>
        <el-table-column label="财务收入" width="100">
          <template slot-scope="scope">
            <!--  toFixed(2) -->
            {{scope.row.financialincome || 0}}
          </template>
        </el-table-column>
        <el-table-column prop="trade_no" label="业务流水号" width="150"></el-table-column>
        <el-table-column prop="staff_name" label="操作人"></el-table-column>
        <el-table-column v-if="reqLink" fixed="right" label="操作" width="265">
          <template slot-scope="scope">
            <slot :row="scope.row"></slot>
            <el-button v-if="$store.state.code.includes('031001')" @click="$emit('removeOrderSelf', 'self', scope.row,'deleteOrder')" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page + 1" layout="total, slot, sizes, prev, pager, next, jumper" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
          <slot name="slot">
            <span>金额：￥{{ priceSum && priceSum.toLocaleString() || 0 }} 元</span>
          </slot>
        </el-pagination>
      </div>
    </div>

    <!-- 校区对账 - 报名缴费 - 其他收费-->
    <el-tabs v-model="activeName" v-else-if="$route.path =='/campusIncome'" @tab-click="otherCost">
      <el-tab-pane label="订单管理" name="orderMagage">
        <div class="order-manage">
          <finance-order-manage></finance-order-manage>
        </div>
      </el-tab-pane>
      <el-tab-pane label="报名缴费" name="applySearch">
        <div class="handle-box">
          <!--筛选旧条件-->
          <div class="class-query-screen">
            <el-date-picker style="margin-bottom: 15px;" clearable unlink-panels v-model="dateSlot" align="right" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
            <el-select clearable v-model="orderSource" size="mini" placeholder="订单来源">
              <el-option v-for="item in orderSourceList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="checkStatus" size="mini" placeholder="订单状态">
              <el-option v-for="item in orderStatus" v-if="item.show" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="paymentType" size="mini" placeholder="支付方式">
              <el-option v-for="item in $store.state.PaymentTypeOptions" :key="item.code" :label="item.pay_type_name" :value="item.code">
              </el-option>
            </el-select>
            <el-select clearable v-model="payStatus" size="mini" placeholder="支付状态">
              <el-option v-for="item in payStatusList" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="particularYear" size="mini" placeholder="年度">
              <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="season" size="mini" placeholder="季节">
              <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
              <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
              <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
              <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select clearable v-model="projectType" size="mini" placeholder="类别/课型不限">
              <el-option v-for="item in $store.state.CourseTypeOptions" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="classType" size="mini" placeholder="班型不限">
              <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" @change="handleLocationChange">
            </el-cascader>
          </div>
          <!--动态旧搜索框-->
          <br>
          <div class="search-warp">
            <el-input size="mini" clearable v-model="select_word" placeholder="请输入搜索内容" class="search-input" style="width: 400px;">
              <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
                <el-option label="学生姓名" value="student"></el-option>
                <el-option label="学生电话" value="studentMobile"></el-option>
                <el-option label="老师姓名" value="teacher"></el-option>
                <el-option label="班级" value="class"></el-option>
              </el-select>
              <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-input size="mini" clearable placeholder="请输入搜索内容" v-model="tradeno" style="width: 400px;">
              <template slot="prepend">业务流水号</template>
              <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-button v-if="!reqLink && $store.state.code.includes('011401')" @click="exportOrder" size="mini" type="primary">导出订单</el-button>
            <!-- <el-button v-if="reqLink && $store.state.code.includes('031001')" @click="$emit('removeOrder', 'all', multipleSelection,'deleteOrder')" type="danger" size="mini">删除选中的订单</el-button> -->
          </div>
        </div>
        <el-table size="mini" :data="dataList" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading" :span-method="objectSpanMethod">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column v-if="reqLink" prop="order_id" label="订单ID" fixed></el-table-column>
          <el-table-column prop="campus_name" label="校区"></el-table-column>
          <el-table-column prop="class_name" label="班级名称" width="300" fixed></el-table-column>
          <el-table-column width="100" label="时间">
            <template slot-scope="scope">
              <div>
                {{Util.TimeCycle(new Date(scope.row.pay_time).getTime(), 'ymd hh-mm-ss')}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="当前校区/班级" width="380">
            <template slot-scope="scope">
              <div>
                {{scope.row.now_organ_name}} / {{scope.row.now_class_name}} / {{scope.row.now_periods | fixStatus($store.state.PeriodsOptions)}}
              </div>
            </template></el-table-column>
          <el-table-column prop="teacher_name" label="老师" width="100"></el-table-column>
          <el-table-column prop="student_name" label="学员姓名" fixed width="100"></el-table-column>
          <el-table-column prop="student_mobile" label="联系电话" width="120"></el-table-column>
          <el-table-column prop="order_source" label="订单来源" width="100"></el-table-column>
          <el-table-column prop="payment_type" label="支付方式" width="120"></el-table-column>
          <el-table-column prop="paystatus" label="支付状态" width="100"></el-table-column>
          <el-table-column prop="orderStatus" fixed label="订单状态" width="100"></el-table-column>
          <el-table-column prop="total_price" label="报名金额" width="100"></el-table-column>
          <el-table-column prop="discount_price" label="折扣金额" width="100">
            <template slot-scope="scope">
              <!--  toFixed(2) -->
              {{scope.row.discount_price || 0}}
            </template>
          </el-table-column>
          <el-table-column prop="real_payment" label="实付金额" width="100"></el-table-column>
          <el-table-column label="手续费" width="100">
            <template slot-scope="scope">
              <!--  toFixed(2) -->
              {{scope.row.service_charge}}
            </template>
          </el-table-column>
          <el-table-column label="财务收入" width="100">
            <template slot-scope="scope">
              <!--  toFixed(2) -->
              {{scope.row.financialincome || 0}}
            </template>
          </el-table-column>
          <el-table-column prop="trade_no" label="业务流水号" width="150"></el-table-column>
          <el-table-column prop="staff_name" label="操作人"></el-table-column>
          <el-table-column v-if="reqLink" fixed="right" label="操作" width="265">
            <template slot-scope="scope">
              <slot :row="scope.row"></slot>
              <el-button v-if="$store.state.code.includes('031001')" @click="$emit('removeOrderSelf', 'self', scope.row,'deleteOrder')" type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page + 1" layout="total, slot, sizes, prev, pager, next, jumper" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
            <slot name="slot">
              <span>金额：￥{{ priceSum && priceSum.toLocaleString() || 0 }} 元</span>
            </slot>
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="其他收费" name="otherCost">
        <div class="handle-box">
          <div class="class-query-screen">
            <el-date-picker style="margin-bottom: 15px;" clearable unlink-panels v-model="dateSlotOther" align="right" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
            <el-select clearable v-model="orderSourceOther" size="mini" placeholder="订单来源">
              <el-option v-for="item in orderSourceList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="checkStatusOther" size="mini" placeholder="订单状态">
              <el-option v-for="item in orderStatus" v-if="item.show" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable v-model="paymentTypeOther" size="mini" placeholder="支付方式">
              <el-option v-for="item in $store.state.PaymentTypeOptions" :key="item.code" :label="item.pay_type_name" :value="item.code">
              </el-option>
            </el-select>
            <el-select clearable v-model="payStatusOther" size="mini" placeholder="支付状态">
              <el-option v-for="item in payStatusList" :key="item.code" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocationOther" placeholder="学校不限" @change="handleLocationChange">
            </el-cascader>
          </div>
          <!--动态旧搜索框-->
          <div class="search-warp">
            <el-input size="mini" clearable v-model="select_word" placeholder="请输入搜索内容" style="width: 400px;">
              <el-select style="width: 100px;" v-model="selectStudentOrIphone" slot="prepend" placeholder="请选择">
                <el-option label="学生姓名" value="student"></el-option>
                <el-option label="学生电话" value="studentMobile"></el-option>
              </el-select>
              <el-button class="search-btn" slot="append" icon="el-icon-search" @click="searchOther"></el-button>
            </el-input>
            <el-input size="mini" clearable placeholder="请输入搜索内容" v-model="tradenoOther" style="width: 400px">
              <template slot="prepend">业务流水号</template>
              <el-button class="search-btn" slot="append" icon="el-icon-search" @click="searchOther"></el-button>
            </el-input>
            <el-button v-if="!reqLink && $store.state.code.includes('011202')" @click="exportOtherOrder" size="mini" type="primary">导出订单</el-button>
            <el-button v-if="reqLink" @click="$emit('removeOrder', 'all', multipleSelection,'deleteOrder')" type="danger" size="mini">删除选中的订单</el-button>
          </div>
        </div>
        <el-table size="mini" :data="dataOtherList" stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="created_at" label="时间"></el-table-column>
          <el-table-column prop="campus_name" label="校区"></el-table-column>
          <el-table-column prop="student_name" label="学员姓名"></el-table-column>
          <el-table-column prop="student_mobile" label="联系电话" width="120"></el-table-column>
          <el-table-column prop="order_source" label="订单来源"></el-table-column>
          <el-table-column prop="order_name" label="收费项目" width="200"></el-table-column>
          <el-table-column prop="payment_type" label="支付方式" width="120"></el-table-column>
          <el-table-column prop="paystatus" label="支付状态"></el-table-column>
          <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
          <el-table-column prop="total_price" label="收费金额"></el-table-column>
          <el-table-column prop="real_payment" label="实付金额"></el-table-column>
          <el-table-column label="优惠方式">
            <template slot-scope="scope">
              {{scope.row.discount_type}}
            </template>
          </el-table-column>
          <el-table-column label="手续费">
            <template slot-scope="scope">
              {{scope.row.service_charge}}
            </template>
          </el-table-column>
          <el-table-column label="财务收入">
            <template slot-scope="scope">
              {{scope.row.financial_income}}
            </template>
          </el-table-column>
          <el-table-column prop="trade_no" label="业务流水号"></el-table-column>
          <el-table-column prop="staff_name" label="操作人"></el-table-column>
          <el-table-column v-if="reqLink" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="$emit('removeOrder', 'self', scope.row.order_id,'deleteOrder')" type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" layout="total, slot, sizes, prev, pager, next, jumper" :total="countOther" :page-size="other_limit" :page-sizes="[10,20,30,50]">
            <slot name="slot">
              <span>金额：￥{{ otherPriceSum && otherPriceSum.toLocaleString() || 0 }} 元</span>
            </slot>
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 缴费查询 - 报名缴费 -->
    <div v-else-if="$route.path =='/applyQuery'">
      <div class="handle-box">
        <!--筛选旧条件-->
        <div class="class-query-screen">
          <el-date-picker style="margin-bottom: 15px;" clearable unlink-panels v-model="dateSlot" align="right" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
          <el-select clearable v-model="orderSource" size="mini" placeholder="订单来源">
            <el-option v-for="item in orderSourceList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="checkStatus" size="mini" placeholder="订单状态">
            <el-option v-for="item in orderStatus" v-if="item.show" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="paymentType" size="mini" placeholder="支付方式">
            <el-option v-for="item in $store.state.PaymentTypeOptions" :key="item.code" :label="item.pay_type_name" :value="item.code">
            </el-option>
          </el-select>
          <el-select clearable v-model="payStatus" size="mini" placeholder="支付状态">
            <el-option v-for="item in payStatusList" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="particularYear" size="mini" placeholder="年度">
            <el-option v-for="item in $store.state.YearOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <el-select clearable v-model="season" size="mini" placeholder="季节">
            <el-option v-for="item in $store.state.SeasonOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
            <el-option v-for="item in $store.state.PeriodsOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
            <el-option v-for="item in $store.state.GradeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
            <el-option v-for="item in $store.state.SubjectOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <el-select clearable v-model="projectType" size="mini" placeholder="类别/课型不限">
            <el-option v-for="item in $store.state.CourseTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select clearable v-model="classType" size="mini" placeholder="班型不限">
            <el-option v-for="item in $store.state.ClassTypeOptions" :key="item.code" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-cascader clearable size="mini" change-on-select expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="学校不限" @change="handleLocationChange">
          </el-cascader>
        </div>
        <!--动态旧搜索框-->
        <br>
        <div class="search-warp">
          <el-input size="mini" clearable v-model="select_word" placeholder="请输入搜索内容" class="search-input" style="width: 400px;">
            <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
              <el-option label="学生姓名" value="student"></el-option>
              <el-option label="学生电话" value="studentMobile"></el-option>
              <el-option label="老师姓名" value="teacher"></el-option>
              <el-option label="班级" value="class"></el-option>
            </el-select>
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <el-input size="mini" clearable placeholder="请输入搜索内容" v-model="tradeno" style="width: 400px;">
            <template slot="prepend">业务流水号</template>
            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <el-button v-if="!reqLink && $store.state.code.includes('011201')" @click="exportOrder" size="mini" type="primary">导出订单</el-button>
          <el-button v-if="reqLink" @click="$emit('removeOrder', 'all', multipleSelection, 'deleteOrder')" type="danger" size="mini">删除选中的订单</el-button>
        </div>
      </div>
      <el-table size="mini" :data="dataList" stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-if="reqLink" prop="order_id" label="订单ID" fixed></el-table-column>
        <el-table-column prop="campus_name" label="校区"></el-table-column>
        <el-table-column prop="class_name" label="班级名称" width="300" fixed></el-table-column>
        <el-table-column :width="isOrderManage ? 300 : '110'" label="时间" fixed>
          <template slot-scope="scope">
            <div v-if="isOrderManage">
              <el-date-picker width="200" size="mini" v-model="scope.row.pay_time" type="datetime" @change="handleDateChange(scope.row.pay_time, scope.row.old_time, scope.$index)">
              </el-date-picker>
              <el-button v-if="scope.row.old_time !== scope.row.pay_time" type="primary" @click="handleDateModify(scope.row)" size="mini">修改</el-button>
            </div>
            <div v-else>
              {{Util.TimeCycle(new Date(scope.row.pay_time).getTime(), 'ymd')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="teacher_name" label="老师"></el-table-column>
        <el-table-column prop="student_name" label="学员姓名" fixed></el-table-column>
        <el-table-column prop="student_mobile" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="order_source" label="订单来源"></el-table-column>
        <el-table-column prop="payment_type" label="支付方式" width="120"></el-table-column>
        <el-table-column prop="paystatus" label="支付状态"></el-table-column>
        <el-table-column prop="orderStatus" fixed label="订单状态"></el-table-column>
        <el-table-column prop="total_price" label="报名金额"></el-table-column>
        <el-table-column prop="discount_price" label="折扣金额"></el-table-column>
        <el-table-column prop="real_payment" label="实付金额"></el-table-column>
        <el-table-column label="优惠方式">
          <template slot-scope="scope">
            {{scope.row.discount_type | filterType($store.state.DiscountTypeOptions)}}
          </template>
        </el-table-column>
        <el-table-column label="手续费">
          <template slot-scope="scope">
            {{scope.row.service_charge.toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column label="财务收入">
          <template slot-scope="scope">
            {{scope.row.financialincome.toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="refund_amount" label="退费金额"></el-table-column>
        <el-table-column prop="confirm_amount" label="确认金额"></el-table-column>
        <el-table-column prop="left_amount" label="可退金额"></el-table-column>
        <el-table-column prop="trade_no" label="业务流水号"></el-table-column>
        <el-table-column prop="staff_name" label="操作人"></el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="applySignRecord(scope.row.order_id)">签到记录</el-button>
            <el-button type="primary" size="mini" @click="applySignRecord(scope.row.order_id, 'confrim')">确认记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, slot, sizes, prev, pager, next, jumper" :total="count" :page-size="cur_limit" :page-sizes="[10,20,30,50]">
          <slot name="slot">
            <span>金额：￥{{ priceSum && priceSum.toLocaleString() || 0 }} 元</span>
          </slot>
        </el-pagination>
      </div>
    </div>
    <Dialog ref="signRecord" :title="selectOrderInfo[1] ? '确认记录': '签到记录'" titbg>
      <div class="signRecord-box">
        <Sign-record signSearch="signSearch" :info="selectOrderInfo"></Sign-record>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../common/Dialog.vue";
import SignRecord from "../frontOffice/SignRecord.vue";
import FinanceOrderManage from "../dataExam/FinanceOrderManage";
export default {
  props: ["reqLink"],
  components: {
    Dialog,
    SignRecord,
    FinanceOrderManage
  },
  data() {
    return {
      loading: true,
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      countOther: 0,
      other_page: 0, //页码
      other_limit: 10, //每次请求的数据数
      priceNum: 0, // 金额总量
      organId: null, // 机构id
      //搜索日期
      startTime: "", //开始日期
      endTime: "", //结束日期
      selectOrderInfo: [],
      //搜索久条件
      selectTeacherOrClass: this.reqLink ? "student" : "teacher",
      selectStudentOrIphone: "student",
      className: "", //班级名称
      teacherName: "", //老师名字
      teacherMobile: "", //老师电话
      select_word: "", //搜索的值
      tradeno: "", //业务流水号
      particularYear: "", //旧班级年份
      season: "", //季节暑假，秋季，寒假，春季
      periods: "", //旧班级期别
      grade: "", //旧班级适用年级，一年级，二年级等
      subject: "", //旧班级科目，数学，物理等
      projectType: "", //旧班级项目类型：长期，短期，公益，考试等
      classType: "", //旧班级班型，超常，培优等
      oldTeacherOrClassName: "", //旧教师或班级姓名
      oldCampusName: "", //旧班级校区名称
      oldCampusId: "", //旧班级校区id

      //变量
      role_name: "",
      status: "",
      organ_id2: [], //新增组件内的学校id,
      dataList: [], //请求的list
      roleIds: [],
      location: [], //校区导航
      oldtime_interval: "", //旧时间段
      newtime_interval: "", //新时间段
      selectedLocation: [], //选择校区
      selectedLocationOther: [], //其他收费选择校区
      selectedLocation1: [], //
      multipleSelection: [], //选中行的集合
      porders: [],
      dateSlot: [],
      dateSlotOther: [],
      otherData: {},
      spanArr: [],
      paymentType: "",
      paymentTypeOther: "",
      payStatus: "",
      payStatusOther: "",
      tradenoOther: "",
      otherPriceSum: "",
      activeName: "orderMagage",
      dataOtherList: [],
      payStatusList: [
        {
          value: "01301",
          label: "未支付"
        },
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
      ],
      orderSource: "",
      orderSourceOther: "",
      orderSourceList: [
        {
          value: "PC",
          label: "PC"
        },
        {
          value: "IOS",
          label: "IOS"
        },
        {
          value: "Android",
          label: "Android"
        }
      ],
      checkStatus: "",
      checkStatusOther: "",
      orderStatus: [
        {
          value: "01001",
          label: "已报名",
          show: false
        },
        {
          value: "01002",
          label: "已候补",
          show: false
        },
        {
          value: "01003",
          label: "发起支付",
          show: true
        },
        {
          value: "01004",
          label: "支付完成",
          show: true
        },
        {
          value: "01005",
          label: "在读",
          show: true
        },
        {
          value: "01006",
          label: "课程结束",
          show: true
        },
        {
          value: "01007",
          label: "申请退费",
          show: true
        },
        {
          value: "01008",
          label: "退费成功",
          show: true
        },
        {
          value: "01009",
          label: "已取消",
          show: false
        },
        {
          value: "01010",
          label: "已收藏",
          show: false
        },
        {
          value: "01011",
          label: "转班转出",
          show: true
        }
      ],
      //表单校验规则
      rules: {
        class_name: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      objData: {},
      priceSum: 0,
      cascaderData: []
    };
  },
  created() {
    this.Util.querySysconst(this, "021", this.$store.state.KnowChannleOptions); //查询了解渠道
    this.Util.querySysconst(this, "100", this.$store.state.SubjectOptions); //查询科目
    this.Util.querySysconst(this, "006", this.$store.state.SeasonOptions); //查询季节
    this.Util.querySysconst(this, "009", this.$store.state.PeriodsOptions); //查询期别
    this.Util.querySysconst(this, "101", this.$store.state.GradeOptions); //查询年级
    this.Util.querySysconst(this, "002", this.$store.state.CourseTypeOptions); //查询类别/课型
    this.Util.querySysconst(this, "003", this.$store.state.ClassTypeOptions); //查询班型
    this.Util.querySysconst(this, "007", this.$store.state.DepartmentOptions); //查询学部
    this.Util.querySysconst(this, "025", this.$store.state.LiberalTypeOptions); //优惠类型
    this.Util.querySysconst(
      this,
      "024",
      this.$store.state.TurnClassConditionOptions
    ); //转班条件
    this.Util.querySysconst(this, "001", this.$store.state.ProjectTypeOptions); //项目类型
    this.Util.chargeMode(this); //查询支付方式
    this.$store.state.DiscountTypeOptions = [
      {
        value: "02801",
        label: "无优惠"
      },
      {
        value: "02802",
        label: "仅打折"
      },
      {
        value: "02803",
        label: "仅立减"
      },
      {
        value: "02804",
        label: "仅优惠券"
      },
      {
        value: "02805",
        label: "立减优惠"
      },
      {
        value: "02806",
        label: "打折立减"
      },
      {
        value: "02807",
        label: "打折优惠"
      },
      {
        value: "02808",
        label: "打折优惠立减"
      }
    ];
    this.Util.queryAreaNav(this, -1, () => {});
    this.location = this.$store.state.location;
    // this.reqLink && this.getData();
    this.getData();
    /* this.$route.path ==="/applyQuery" && this.getOtherData(); */
  },
  //计算属性
  computed: {
    isOrderManage() {
      return this.$route.path.includes("orderManage");
    },
    //相当于过滤器
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        d.turn_class_time = self.Util.TimeCycle(d.turn_class_time, "ymd");
        d.operate_time = self.Util.TimeCycle(d.operate_time, "ymd");
        d.oldtime_interval = d.oldstart_time + "-" + d.oldend_time;
        d.endtime_interval = d.newstart_time + "-" + d.newend_time;
        d.adjust_time = d.newsequence - d.oldsequence;
        return d;
      });
    }
  },
  filters: {
    filterType(val, data) {
      val = data.filter(v => v.value === val)[0].label;
      return val;
    },
    fixStatus(code, status) {
      return code ? status.find(item => item.value === code).label : code;
    }
  },
  watch: {
    "$route.path": {
      handler() {
        this.getParams(); // 重置参数
        this.location = this.$store.state.location;
        // this.organId = this.$store.state.organId;
        this.getData();
      }
    },
    selectedLocationOther: function(o, n) {
      if (
        this.selectedLocationOther.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organId = o[o.length - 1];
          this.other_page = 0;
          this.getOtherData();
        }
      } else if (this.selectedLocationOther.length === 0) {
        this.organId = "";
        this.other_page = 0;
        this.getOtherData();
      }
    },
    selectedLocation: function() {
      if (
        this.cascaderData.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        this.getData();
      }
    },
    selectedLocation1: function() {
      if (
        this.selectedLocation &&
        this.selectedLocation.length &&
        this.selectedLocation.length > 0
      ) {
        this.newCampusId = this.selectedLocation[
          this.selectedLocation.length - 1
        ];
        this.getData();
      }
    },

    organ_id2: function() {
      if (
        this.organ_id2 &&
        this.organ_id2.length &&
        this.organ_id2.length > 0
      ) {
        this.ruleForm.parent_organ_id = this.organ_id2[
          this.organ_id2.length - 1
        ];
      }
    },
    dateSlot: function() {
      if (this.dateSlot) {
        this.startTime = this.Util.TimeCycle(
          new Date(this.dateSlot[0]).getTime(),
          "ymd"
        );
        this.endTime = this.Util.TimeCycle(
          new Date(this.dateSlot[1]).getTime(),
          "ymd"
        );
      } else {
        this.startTime = "";
        this.endTime = "";
      }
      this.cur_page = 0;
    },
    dateSlotOther: function() {
      if (this.dateSlotOther != null) {
        this.startTimeOther = this.Util.TimeCycle(
          new Date(this.dateSlotOther[0]).getTime(),
          "ymd"
        );
        this.endTimeOther = this.Util.TimeCycle(
          new Date(this.dateSlotOther[1]).getTime(),
          "ymd"
        );
      } else {
        this.startTimeOther = "";
        this.endTimeOther = "";
      }
      this.other_page = 0;
      this.getOtherData();
    },
    select_word: function() {
      const self = this;
      self.teacherName = self.select_word;
    },
    particularYear: function() {
      this.getData();
    },
    season: function() {
      this.getData();
    },
    periods: function() {
      this.getData();
    },
    grade: function() {
      this.getData();
    },
    subject: function() {
      this.getData();
    },
    projectType: function() {
      this.getData();
    },
    classType: function() {
      this.getData();
    },
    startTime: function() {
      this.getData();
    },
    endTime: function() {
      this.getData();
    },
    checkStatus() {
      this.getData();
    },
    orderSource() {
      this.getData();
    },
    paymentType() {
      this.getData();
    },
    payStatus() {
      this.getData();
    },
    //其他收费搜索
    orderSourceOther() {
      this.other_page = 0;
      this.getOtherData();
    },
    checkStatusOther() {
      this.other_page = 0;
      this.getOtherData();
    },
    paymentTypeOther() {
      this.other_page = 0;
      this.getOtherData();
    },
    payStatusOther() {
      this.other_page = 0;
      this.getOtherData();
    },
    porders() {
      this.spanArr = [];
      this.porders.forEach((item, index) => {
        if (item.porders) {
          if (item.porders.length > 0) {
            this.spanArr.push(item.porders.length + 1);
          } else {
            this.spanArr.push(1);
          }
        } else {
          this.spanArr.push(0);
        }
      });
    }
  },
  methods: {
    otherCost(tab) {
      if (tab.label === "其他收费") {
        this.getOtherData();
      }
    },
    // 导出订单
    /* exportOrder() {
      if (!this.dataList.length) {
        this.$message.warning("未查询出数据，无法导出");
        return false;
      }
      let dataLink =
        this.GlobalVal.httpLink[
          this.$route.path.includes("campusIncome")
            ? "exportCampusIncome"
            : "exportOrder"
        ] + "?";
      for (let i in this.objData) {
        this.objData[i] &&
          i !== "page" &&
          i !== "limit" &&
          (dataLink += i + "=" + this.objData[i] + "&");
      }
      window.open(dataLink);
    }, */
    exportOrder() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.objData,
        httpUrl: this.$route.path.includes("campusIncome")
          ? "exportCampusIncome"
          : "exportOrder",
        title: this.$route.meta.title
      });
      /* var source = new EventSource('http://192.168.1.187/pxxmanage/home/common/export/exportLength'+'?length=length_exportOrder&nowLength=nowLength_exportOrder&staffId='+JSON.parse(window.sessionStorage.getItem("staff")).staffId);
      source.onmessage = function(e){
        console.log(e.data);
      }; */
    },
    //导出其他收费
    /* exportOtherOrder() {
        if (!this.dataList.length) {
            this.$message.warning("未查询出数据，无法导出");
            return false;
        }
        let dataLink =
            this.GlobalVal.httpLink.exportOtherOrder + "?";
        for (let i in this.objData) {
            this.objData[i] && i !== "page" && i !== "limit" &&
            (dataLink += i + "=" + this.objData[i] + "&");
        }
        window.open(dataLink);
      }, */
    exportOtherOrder() {
      this.$exportExcel({
        dataList: this.dataList,
        objData: this.otherData,
        httpUrl: "exportOtherOrder",
        title: this.$route.meta.title
      });
    },
    // 获取参数
    getParams(type = 0) {
      this.objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS 1
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId, // 1
        startDate: this.startTime, //开始时间(前台给) 1
        endDate: this.endTime, //结束时间(前台给) 1
        order_source: this.orderSource, // 订单来源 1
        payment: this.paymentType, //支付类型 1
        paymentStatus: this.payStatus, //支付状态 1
        tradeno: this.tradeno || "",
        studentName:
          type && this.selectTeacherOrClass === "student"
            ? this.select_word
            : "", //this.studentName, 学生姓名 1
        studentMobile:
          type && this.selectTeacherOrClass === "studentMobile"
            ? this.select_word
            : "", //学生手机号 1
        particular_year: this.particularYear, //年份
        season: this.season, //期别,暑假\秋季\寒假\春季
        periods: this.periods, //期数
        grade: this.grade, //适用年级,一年级\二年级等
        subject: this.subject, //科目,数学\物理等
        projectType: this.projectType, //项目类型:长期,短期,公益等
        classType: this.classType, //班型,超常\培优等
        department: this.department, //学部
        campusId: this.campusId, //校区名称
        teacherName:
          type && this.selectTeacherOrClass === "teacher"
            ? this.select_word
            : "", //教师名称
        className:
          type && this.selectTeacherOrClass === "class" ? this.select_word : "", //班级名称
        organId:
          this.selectedLocation.length &&
          this.selectedLocation.includes(
            JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
          )
            ? this.selectedLocation[this.selectedLocation.length - 1]
            : null, // 机构id
        orderStatus: this.checkStatus // 订单状态
      };
      this.objData = Object.assign({}, this.objData, {
        page: this.cur_page, //页数 1
        limit: this.cur_limit //条目数 1
      });
      /*  type !== 2 &&
        (this.objData = Object.assign({}, this.objData, {
          page: this.cur_page, //页数 1
          limit: this.cur_limit //条目数 1
        })); */
    },
    //时间变更
    handleDateChange(newTime, oldTime, index) {
      // if(!newTime){
      //   console.log(this.$refs['picker' + index])
      //   this.$refs['picker' + index].$emit('pick', oldTime);
      // }
    },
    //时间保存
    handleDateModify(row) {
      let objData = {
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS 1
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId, // 1
        orderId: row.order_id,
        payTime: new Date(row.pay_time).getTime()
      };
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.changeOrderTime, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message.success("修改成功");
              this.getData();
            } else {
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
    //获取数据
    getData(type = 1) {
      const self = this;
      this.getParams(type);
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink[
            this.reqLink || this.$route.path.includes("applyQuery")
              ? "queryPaymentOrder"
              : "campusIncome"
          ],
          JSON.stringify(this.objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.count = res.data.count;
              this.priceSum = res.data.sum && res.data.sum.toFixed(2);
              this.dataList = res.data.orders;
              let pordersArr = [];
              this.porders = [];
              this.dataList = this.dataList.map((item, index) => {
                item.pay_time = new Date(item.pay_time);
                item.old_time = item.pay_time;
                item.paystatus = this.payStatusList.filter(
                  val => val.value === item.paystatus
                )[0].label;
                item.payment_type = this.Util.GetIdNameForValue(
                  this.$store.state.PaymentTypeOptions,
                  item.payment_type,
                  "code",
                  "pay_type_name"
                );
                item.orderStatus = this.orderStatus.filter(
                  val => val.value === item.orderStatus
                )[0].label;
                return item;
              });
              this.porders.push(...this.dataList);
              this.dataList
                .filter(item => item.porders.length > 0)
                .forEach(item => {
                  pordersArr.push(...item.porders);
                });
              pordersArr.forEach(d => {
                this.porders.forEach((item, index) => {
                  if (item.order_id == d.signup_order_id) {
                    d.class_name = d.order_name;
                    d.payment_type = this.Util.GetIdNameForValue(
                      this.$store.state.PaymentTypeOptions,
                      d.payment_type,
                      "code",
                      "pay_type_name"
                    );
                    d.paystatus = this.payStatusList.filter(
                      val => val.value === d.paystatus
                    )[0].label;
                    //  d.pay_time = d.created_at
                    this.porders.splice(index + 1, 0, d);
                  }
                });
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.loading = false;
            this.$message("请求失败");
          }
        );
    },
    getOtherData() {
      this.loading = true;
      this.otherData = {
        limit: this.other_limit,
        page: this.other_page,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId, //
        startDate: this.startTimeOther, //开始时间(前台给)
        endDate: this.endTimeOther, //结束时间(前台给)
        order_source: this.orderSourceOther, // 订单来源
        orderStatus: this.checkStatusOther, // 订单状态
        paymentStatus: this.payStatusOther, //支付状态
        payment: this.paymentTypeOther, //支付类型
        tradeno: this.tradenoOther || "",
        studentName:
          this.selectStudentOrIphone === "student" ? this.select_word : "", //this.studentName, 学生姓名 1
        studentMobile:
          this.selectStudentOrIphone === "studentMobile"
            ? this.select_word
            : "", //学生手机号 1
        campusId: this.campusId, //校区名称
        organId: this.organId
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryOtherOrder,
          JSON.stringify(this.otherData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.countOther = res.data.data.count;
              this.dataOtherList = res.data.data.productOrders;
              this.otherPriceSum = res.data.data.sum;
              this.dataOtherList = this.dataOtherList.map(item => {
                //item.pay_time = new Date(item.pay_time);
                //item.old_time = item.pay_time;
                let payStatusList = this.payStatusList.filter(
                  val => val.value === item.paystatus
                );
                let orderStatus = this.orderStatus.filter(
                  val => val.value === item.orderStatus
                );
                item.created_at = this.Util.TimeCycle(item.created_at, "ymd");
                item.paystatus = payStatusList[0] && payStatusList[0].label;
                item.payment_type = this.Util.GetIdNameForValue(
                  this.$store.state.PaymentTypeOptions,
                  item.payment_type,
                  "code",
                  "pay_type_name"
                );
                item.orderStatus = orderStatus[0] && [0].label;
                return item;
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            this.loading = false;
          },
          res => {
            this.loading = false;
            this.$message("请求失败");
          }
        );
    },
    //重新选择了地区事件
    handleLocationChange(value) {
      this.cascaderData = value;
    },

    //删除事件
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let objData = {
            staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
            delList: [
              {
                id: row.class_id
              }
            ]
          };
          this.$axios
            .post(this.GlobalVal.httpLink.delClassMag, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.getData();
                } else {
                  this.$message({
                    type: "error",
                    message: res.data.errmsg
                  });
                }
              },
              res => {
                this.$message({
                  type: "error",
                  message: "操作失败"
                });
              }
            );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除操作"
          });
        });
    },
    //下架事件
    handleDown(index, row) {
      const self = this;
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        classId: row.class_id, //班级ID
        status: false //boolean, true:上架， false:下架
      };
      this.$axios
        .post(
          this.GlobalVal.httpLink.changeClassStatus,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.$message({
                type: "success",
                message: "下架成功!"
              });
              self.getData();
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
          },
          res => {
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    },
    //删除全部
    delAll() {
      //批量删除按钮触发
      const self = this;
      if (this.multipleSelection.length > 0) {
        this.$confirm("此操作将永久删除这些名单, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let delArr = [];
            for (
              let i = 0, length = self.multipleSelection.length;
              i < length;
              i++
            ) {
              delArr.push({
                id: self.multipleSelection[i].class_id
              });
            }

            let objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              delList: delArr
            };
            self.multipleSelection = [];
            this.$axios
              .post(
                this.GlobalVal.httpLink.delClassMag,
                JSON.stringify(objData)
              )
              .then(
                res => {
                  if (res.data.code === "10000") {
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                    this.getData();
                  } else {
                    this.$message({
                      type: "error",
                      message: res.data.errmsg
                    });
                  }
                },
                res => {
                  this.$message({
                    type: "error",
                    message: "操作失败"
                  });
                }
              );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "没有选中任何项"
        });
      }
    },

    //将选中的行存储在一个变量中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //翻页导航栏
    handleCurrentChange(val) {
      this.cur_page = val - 1;
      this.getData();
    },
    handleCurrentChange1(val) {
      this.other_page = val - 1;
      this.getOtherData();
    },

    //每页显示数目发生变化
    handleSizeChange(val) {
      this.cur_limit = val;
      this.getData();
    },
    handleSizeChange1(val) {
      this.other_limit = val;
      this.getOtherData();
    },

    //搜索班级---刷新
    search() {
      this.cur_page = 0;
      this.getData(2);
    },
    searchOther() {
      this.other_page = 0;
      this.getOtherData();
    },
    //新增按钮事件
    handleAdd() {
      this.$router.push({
        path: "/editClass",
        query: {
          handle: "add"
        }
      });
    },
    //修改按钮事件
    handleEdit(index, row) {
      this.$store.commit("setChooseClassMge", row);
      this.$router.push({
        path: "/editClass",
        query: {
          handle: "edit"
        }
      });
    },
    //新增/修改班级等级--重置--暂时不用
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //搜索框动态提示内容
    queryTeacherOrClassname(queryString, cb) {
      if (this.selectTeacherOrClass === "class") {
        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          page: 1, //页数
          limit: 10, //条目数
          className: queryString //班级名字
        };
        this.$axios
          .post(this.GlobalVal.httpLink.queryClassName, JSON.stringify(objData))
          .then(
            res => {
              if (res.data.code === "10000") {
                cb(res.data.res);
              } else {
                self.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
            },
            res => {
              this.$message("请求失败");
            }
          );
      } else if (this.selectTeacherOrClass === "teacher") {
        let objData = {
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
          page: 1, //页数
          limit: 10, //条目数
          teacherName: queryString //班级名字
        };
        this.$axios
          .post(
            this.GlobalVal.httpLink.queryTeacherName,
            JSON.stringify(objData)
          )
          .then(
            res => {
              if (res.data.code === "10000") {
                cb(res.data.res);
              } else {
                self.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
            },
            res => {
              this.$message("请求失败");
            }
          );
      }
    },
    //合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 19) {
        const _row = this.spanArr[rowIndex];
        const _col = _row ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    //签到记录
    applySignRecord(id, type) {
      this.selectOrderInfo = [id, type];
      this.$refs.signRecord.dialogVisible = true;
    }
  }
};
</script>
