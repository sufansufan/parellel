<style scoped>
.lesson-single {
  padding: 20px;
  background: #ffffff;
}
.lesson-list,
.total-amount {
  padding: 5px 0px 5px 0;
  border-bottom: 1px solid #cccccc;
}
.total-amount .total-apply-amount {
  display: flex;
  justify-content: flex-end;
  line-height: 36px;
}
.total-amount .total-apply-amount div {
  margin-right: 20px;
}
.del-lesson {
  text-align: left;
}
.grid-content {
  height: 36px;
  line-height: 36px;
}
.apply-submit {
  text-align: right;
  margin-top: 10px;
  margin-bottom: 30px;
}
.title-warp {
  width: 100%;
  border-bottom: 2px solid #cccccc;
}
.title {
  padding: 8px 5px;
  display: inline-block;
}
.apply-top-btn {
  display: inline-block;
  float: right;
}
.total-fee-top {
  margin: 0 5px;
}
.lesson-list-warp {
  font-size: 12px;
}
.actual-amount-warp {
  background: #ececec;
}
.choose-type {
  width: 90px;
}
.del-choose-lesson {
  display: inline-block;
  width: 40px;
  text-align: center;
  color: #40d6ff;
}
.table-title-warp {
  margin-top: 30px;
}
.lesson-list-scroll {
  max-height: 40vh;
  overflow-y: auto;
}
.lesson-keci-list ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
.lesson-keci-list ul div {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  height: 35px;
  margin-top: 10px;
  margin-right: 10px;
}
.lesson-keci-list ul li {
  color: #fff;
  width: 54px;
  height: 49px;
  font-size: 18px;
  text-align: center;
  /* cursor: pointer; */
  /*   line-height: 45px; */
  background: #c9c9c9;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: all 0.5s;
  -webkit-user-select: none;
  padding-top: 5px;
  list-style: none;
  line-height: 44px;
  position: relative;
}
/* .lesson-keci-list ul li.actived:not(.finish) {
  background: #409eff;
  color: #fff;
  box-shadow: 0 0 10px #409eff;
} */
.lesson-keci-list ul li.finish {
  background: #409eff;
  box-shadow: 0 0 10px #409eff;
}
.lesson-keci-list ul li.disabled {
  background: #f2f2f2;
  box-shadow: 0 0 10px #f2f2f2;
  color: #544f4f;
}
.lesson-keci-list ul li.finish:after {
  width: 10px;
  content:"\2714";
  height: 10px;
  position: absolute;
  right: 4px;
  bottom: 22px;
  z-index: 30;
}

</style>
<style>
.lesson-keci-list ul li .order-style{
  font-size: 10px;
  position: absolute;
  top: 24px;
  right: 2px;
  color: #5ba5f1;
  opacity: 0;
  cursor: pointer;
}
.lesson-keci-list ul li .order-style:hover{
  opacity: 1;
  transition: all 1s
}
</style>

<template>
  <div class="lesson-single">
    <div class="title-warp">
      <h3 class="title">购课单</h3>
      <div class="apply-top-btn">费用总计
        <span class="total-fee-top">￥{{applyAll}}</span>
        <el-button size="mini" type="primary" @click="applyBtn($store.state.code.includes('010101') ? 1 : 0)" :disabled="single_time.some(item => item <= 0)">全部报名</el-button>
      </div>
    </div>
    <div class="table-title-warp">
      <el-row class="lesson-list-warp">
        <el-col :span="2" class="del-lesson">
          <div class="grid-content">操作</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">班级名称 </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content">数量</div>
        </el-col>
        <el-col :span="1" style="text-align: center;">
          <div class="grid-content">剩余课节</div>
        </el-col>
        <el-col :span="3" style="text-align: center;">
          <div class="grid-content">选取课节数</div>
        </el-col>
        <el-col :span="3" style="text-align: center;">
          <div class="grid-content">课节费</div>
        </el-col>
        <el-col :span="5" style="text-align: center;">
          <div class="grid-content">费用</div>
        </el-col>
      </el-row>
    </div>
    <div class="lesson-list-scroll">
      <div class="lesson-list" v-for="(item,index) in arr" :key="index">
        <el-row class="lesson-list-warp">
          <el-col :span="2" class="del-lesson">
            <div class="grid-content del-choose-lesson" @click="delChooseLesson(index)">
              <i class="el-icon-error" style="font-size: 20px; cursor: pointer; margin-top: 10px;"></i>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">{{item.class_name}}</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content">{{item.total_times}}</div>
          </el-col>
          <el-col :span="1" style="text-align: center;">
            <div class="grid-content">{{item.left_times}}</div>
          </el-col>
          <el-col :span="3" style="text-align: center;">
            <div class="grid-content" style="display: flex; justify-content:flex-end;">
              <!--  <span size="mini" style="width: 70px">
                <el-input type="number" @keyup.native="singleCouseTime($event, index)" size="mini" style="width:100px;text-align:center" v-model="single_time[index]" :max="item.total_times" :min="1">
                </el-input>
              </span> -->
              <el-popover placement="bottom" width="512" trigger="click" ref="popover">
                <el-button slot="reference" type="text" size="mini" style="color:#409EFF; margin: 0 auto;" @click="timeSumClick(index)">{{single_time[index]}}</el-button>

                <div class="lesson-keci-list">
                  <ul>
                    <li v-for="(n,i) in Array(item.total_times)" :key="i" :ref="'timeRefs_'+ index" @click="timeClick(index, $event)">
                      {{i+1}}
                    </li>
                    <div>
                      <el-button type="primary" size="mini" @click="allSelectTime(index)">一键选择</el-button>
                    </div>
                  </ul>
                </div>
              </el-popover>
              <el-button type="primary" size="mini" @click="allSelectTime(index,'outside')" style="height: 30px;">一键选择</el-button>
            </div>
          </el-col>
          <el-col :span="3" style="text-align: center;">
            <div class="grid-content">￥{{item.single_price && item.single_price.toFixed(2)}}</div>
          </el-col>
          <el-col :span="5" style="text-align: center;">
            <div class="grid-content">￥{{singleTotal[index] && singleTotal[index].toFixed(2)}}</div>
          </el-col>
        </el-row>
        <div v-if="reduceCost">
          <el-row>
            <el-col :span="6" :offset="12">
              <div class="grid-content choose-type">
                <el-select v-model="item.gridContentType" size="mini" placeholder="请选择">
                  <el-option label="打折" value="1"></el-option>
                  <el-option label="立减" value="2"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-input v-model="item.gridContentValue" size="mini" placeholder="请输入"></el-input>
              </div>
            </el-col>
          </el-row>
          <div class="actual-amount-warp">
            <el-row>
              <el-col :span="6" :offset="12">
                <div class="grid-content">实际金额</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">{{item.actualAmount}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="total-amount">
      <div class="total-apply-amount">
        <div>合计金额</div>
        <div>￥{{applyAll}}</div>
      </div>
    </div>
    <div class="apply-submit">
      <el-button v-if="$store.state.code.includes('010101')" type="primary" @click="applyBtn(1)" size="mini" :disabled="single_time.some(item => item <= 0)">超额报名</el-button>
      <el-button v-else type="primary" @click="applyBtn(0)" size="mini" :disabled="single_time.some(item => item <= 0)">全部报名</el-button>
      <!-- <el-button type="primary" @click="$emit('closed')" size="mini">取消</el-button> -->
      <el-button type="primary" @click="handleNarrow" size="mini" class="narrow-button">缩小窗口</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["arr", "isExcess"],
  data() {
    return {
      singleTotal: [],
      single_time: [],
      reduceCost: false, //是否显示打折类型以及其他信息
      gridContentType: "", //折扣类型
      gridContentValue: "", //折扣类型后的输入值
      applyAll: 0, //合计金额
      ChooseClass: "", //把报名信息赋值
      studentAttendClasses: "",
      flag: false
    };
  },
  //计算属性
  computed: {
    //相当于过滤器
    chooseClassList() {
      //ChooseClassApply
      const self = this;
      if (!this.arr) {
        return [];
      } else {
        /*  let applyAll = 0;
            for(let i = 0; i<this.singleTotal.length; i++){
                applyAll += this.singleTotal[i]
            }
            return applyAll*/
      }
    }
  },
  mounted() {
    let applyAll = 0;
    for (let i = 0; i < this.arr.length; i++) {
      // this.single_time[i] = this.arr[i].left_times;
      if (this.flag) {
        this.single_time[this.arr.length - 1] = 0;
      } else {
        this.single_time[i] = 0;
      }
      this.singleTotal[i] = this.arr[i].single_price * this.single_time[i];
      this.singleTotal.filter(function(d) {
        d.toFixed(2);
        return d;
      });
      applyAll += this.singleTotal[i];
    }
    this.applyAll = applyAll.toFixed(2);
    this.flag = true;
  },
  created() {
    this.ChooseClass = this.arr;
  },
  watch: {
    single_time: {
      handler(n) {
        let applyAll = 0;
        for (let i = 0; i < n.length; i++) {
          if (!this.arr[i]) continue;
          this.singleTotal[i] = this.arr[i].single_price * n[i];
          applyAll += this.singleTotal[i];
        }
        this.applyAll = applyAll.toFixed(2);
      },
      deep: true
    },
    ChooseClass() {
      let applyAll = 0;
      for (let i = 0; i < this.arr.length; i++) {
        // this.single_time[i] = this.arr[i].left_times;
        if (this.single_time.some(item => item !== 0)) {
          this.single_time.forEach((item, i) => {
            this.$set(this.single_time, i, item);
          });
        } else {
          if (this.flag) {
            this.single_time[this.arr.length - 1] = 0;
          } else {
            this.single_time[i] = 0;
          }
        }
        this.singleTotal[i] = this.arr[i].single_price * this.single_time[i];
        applyAll += this.singleTotal[i];
      }
      this.applyAll = applyAll.toFixed(2);
    }
  },
  methods: {
    handleNarrow(event) {
      if (event) {
        event.preventDefault();
        this.$emit("onNarrow");
      }
    },
    applyBtn(o = false) {
      //this.reduceCost=!this.reduceCost;  //test
      const self = this;
      //self.$store.commit("isPayFeesCommit",false)  //test
      self.$store.commit("setChoosePaymentItems", []);
      let objData = {
        source: "PC",
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        studentId: self.$store.state.chooseStudentInfo.student_id, //学生id
        isexcessSignup: o ? true : false,
        classList: [] //班级
      };
      if (!this.arr.every(item => item.campus_id === this.arr[0].campus_id)) {
        this.$message.error("已选择班级不在一个校区，无法报名！");
        return;
      }
      for (let i = 0; i < this.arr.length; i++) {
        let time = "";
        this.$refs["timeRefs_" + i].filter(item => {
          if (item.className.includes("finish")) {
            time += item.innerHTML.trim() + ",";
          }
        });
        let obj = {
          classId: null, //班级id
          buytimes: null, //购买次数
          preorderId: null,
          couponId: null,
          couponName: "",
          couponAmount: 0,
          realPrice: 0, //this.arr[i].total_price,
          buyAttendClassString: time.slice(0, -1)
        };
        obj.classId = this.arr[i].class_id;
        obj.buytimes = this.single_time[i]; /* this.arr[i].left_times */
        objData.classList.push(obj);
      }
      let loadingInstance = this.$Loading();
      this.$axios
        .post(this.GlobalVal.httpLink.signup, JSON.stringify(objData))
        .then(
          res => {
            if (res.data.code === "10000") {
              self.$message({
                type: "success",
                message: "报名成功!"
              });
              // this.$store.commit("setChooseClassApply", []);
              this.$emit("resetChooseClassApply");
              self.$store.commit(
                "setChoosePaymentItems",
                res.data.signupOrders
              );
              self.$store.commit(
                "setStudentValidCoupons",
                res.data.studentValidCoupons
              );
              if (res.data.signupOrders.length) {
                let data = {
                  staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                    .staffId,
                  source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
                  studentId: res.data.signupOrders[0].student_id, //学生id，可以为空
                  orderId: res.data.signupOrders[0].order_id //订单 ID，可以为空
                };
                this.$axios
                  .post(
                    this.GlobalVal.httpLink.getnotpaidorder,
                    JSON.stringify(data)
                  )
                  .then(
                    res => {
                      if (res.data.code === "10000") {
                        // self.$store.commit("setChoosePaymentItems", res.data.signupOrders);
                        self.$store.commit(
                          "setStudentValidCoupons",
                          res.data.studentValidCoupons
                        );
                      } else {
                        console.error(res);
                        self.$message({
                          type: "error",
                          message: res.data.errmsg
                        });
                      }
                      self.$store.commit("isPayFeesCommit", false);
                    },
                    res => {
                      this.$message("请求失败");
                    }
                  );
              }
            } else {
              this.$message({
                type: "error",
                message: res.data.errmsg
              });
            }
            loadingInstance.close();
          },
          res => {
            console.error(res);
            loadingInstance.close();
            this.$message({
              type: "error",
              message: "操作失败"
            });
          }
        );
    },
    delChooseLesson(index) {
      // this.arr.forEach((item, i) => {});
      let timeArr = [];
      let chooseClassObj = this.arr;
      chooseClassObj.splice(index, 1);
      this.single_time.splice(index, 1);
      // this.$store.commit("setChooseClassApply", chooseClassObj)
      this.arr = chooseClassObj;
      this.singleTotal.splice(index, 1);
      let applyAll = 0;
      for (let i = 0; i < this.singleTotal.length; i++) {
        applyAll += this.singleTotal[i];
      }
      this.applyAll = applyAll;
    },
    singleCouseTime(e, index) {
      if (
        !(e.target.value >= 1 && this.arr[index].total_times >= e.target.value)
      ) {
        this.$message({
          type: "error",
          message: `第${index + 1}项选择课节有误`
        });
        return;
      }
    },
    timeClick(index, e) {
      let timeArr = [];
      if (
        e.target.classList.length &&
        e.target.classList[0].includes("disabled")
      ) {
        return false;
      }
      if (
        e.target.classList.length &&
        e.target.classList[0].includes("finish")
      ) {
        e.target.classList.remove("finish");
      } else {
        e.target.classList.add("finish");
      }
      timeArr = this.$refs["timeRefs_" + index].filter(item =>
        item.className.includes("finish")
      );
      this.$set(this.single_time, index, timeArr.length);
    },
    timeSumClick(index) {
      let objData = {
        source: "PC",
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        student_id: this.$store.state.chooseStudentInfo.student_id, //学生id
        class_id: this.arr[index].class_id
      };
      return new Promise((resolve, reject) => {
        this.$axios
          .post(
            this.GlobalVal.httpLink.listStudentSignupAttendClass,
            JSON.stringify(objData)
          )
          .then(
            ({ data }) => {
              if (data.code === "10000") {
                resolve(data.code);
                this.studentAttendClasses = data.data.studentAttendClasses;
                this.studentAttendClasses.map((item, i) => {
                  this.$refs["timeRefs_" + index].forEach(n => {
                    if (item.classSequence == n.innerHTML.trim()) {
                       n.innerHTML = `<el-tooltip placement="top">
                          <div slot="content" class="order-style">${item.orderId}</div>
                          <el-button>${item.classSequence}</el-button>
                        </el-tooltip>`
                      n.classList.add("disabled");
                    }
                  });
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
            },
            res => {
              this.$message("请求失败");
            }
          );
      });
    },
    allSelectTime(index, type) {
      if (type === "outside") {
        this.timeSumClick(index).then(data => {
          if (data === "10000") {
            this.disabledSelect(index);
          }
        });
      } else {
        this.disabledSelect(index);
      }
    },
    disabledSelect(index) {
      let selectable = [];
      selectable = this.$refs["timeRefs_" + index].filter(
        item => !item.className.includes("disabled")
      );
      selectable.map(n => n.classList.add("finish"));
      if (selectable.length === 0) {
        this.$message.success("该班已全部报过");
      }
      this.$set(this.single_time, index, selectable.length);
    }
  }
};
</script>
