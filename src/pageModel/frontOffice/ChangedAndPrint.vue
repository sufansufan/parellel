<template>
  <div>
    <!--转班-->
    <div v-if="display.turnClassSwitch" class="bg-layer">
      <div class="transition-box">
        <div class="title-warp">
          <div class="classTable">
            <v-turnclass :orderId="rowInfo.order_id" dType="zb" :attendclassList="attendclassList"></v-turnclass>
            <div style="float: right;margin-bottom: 20px;margin-right: 10px">
              <el-button type="primary" @click="$emit('close')" style="width: 80px" size="mini">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--调课-->
    <div v-if="display.classCourseLayer" class="bg-layer">
      <div class="transition-box">
        <div class="couseTable">
          <v-turnclass :orderId="rowInfo.order_id" dType="tk" :attendclassList="attendclassList"></v-turnclass>
          <div style="float: right;margin-bottom: 20px;margin-right: 10px">
            <el-button type="primary" @click="$emit('close')" style="width: 80px" size="mini">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--打印-->
    <div v-if="display.printLayer" class="bg-layer">
      <div class="transition-box">
        <div style="width:100%; height: 500px;overflow-y: auto; padding-right: 20px;">
          <!--startprint-->
          <div id="box">
            <div class="s_center">
              <div class="s_centerLeft">
                <div class="s_LeftTop">
                  <vue-q-art :qr-value="rowInfo.student_no" class="s_TowCode"></vue-q-art>
                  <div class="s_essential" style="margin-top: 75px;">
                    <span class="details">
                      <i>上课时间</i>
                      <p>{{rowInfo.time_name}}</p>
                    </span>
                    <span class="details">
                      <i>任课老师</i>
                      <p>{{rowInfo.teacher_name}}</p>
                    </span>
                    <span class="details">
                      <i>听课证编号</i>
                      <p>{{rowInfo.orderno}}</p>
                    </span>
                  </div>
                </div>
                <div class="s_LeftRight">
                  <span class="detailsLeft">
                    <i>姓名</i>
                    <p>{{rowInfo.student_name}}</p>
                  </span>
                  <span class="detailsLeft">
                    <i>学员号</i>
                    <p>{{rowInfo.student_no}}</p>
                  </span>
                  <span class="detailsLeft">
                    <i>校区／教室／实付金额</i>
                    <p>{{rowInfo.campus_name}} ／ {{rowInfo.classroom_name}} ／ ￥{{rowInfo.real_payment || 0}}元</p>
                  </span>
                  <span class="detailsLeft">
                    <i>日期</i>
                    <p>{{rowInfo.start_date | timeFix(Util.TimeCycle, '/')}}-{{rowInfo.end_date | timeFix(Util.TimeCycle, '/')}}</p>
                  </span>
                  <span class="detailsLeft">
                    <i>班级</i>
                    <p>{{rowInfo.class_name}}</p>
                  </span>
                </div>
              </div>
              <div class="s_centerRight">
                <div class="s_Leftzoom" style="margin-top:50px ;">
                  <span class="detailsLeft shrink">
                    <i>姓名／学员号</i>
                    <p>{{rowInfo.student_name}}／{{rowInfo.student_no}}</p>
                  </span>
                  <span class="detailsLeft shrink">
                    <i>校区／教室／实付金额</i>
                    <p>{{rowInfo.campus_name}} ／ {{rowInfo.classroom_name}} ／ ￥{{rowInfo.real_payment || 0}}元</p>
                  </span>
                  <span class="detailsLeft shrink">
                    <i>日期</i>
                    <p>{{rowInfo.start_date | timeFix(Util.TimeCycle, '/')}}-{{rowInfo.end_date | timeFix(Util.TimeCycle, '/')}}</p>
                  </span>
                  <span class="detailsLeft shrink">
                    <i>班级</i>
                    <p>{{rowInfo.class_name}}</p>
                  </span>
                </div>
                <div class="s_Flortzoom">
                  <!-- <img src="img/听课证A4_画板 1 副本 2.png" alt=""  class="s_TowCode" style="float: right;width: 64px;margin-bottom:10px; ;"/> -->
                  <vue-q-art :qr-value="rowInfo.student_no" style="float: right;width: 64px;margin-bottom:10px;"></vue-q-art>
                  <div class="s_essential" style="float: left;width: 100%;">
                    <span class="details shrink">
                      <i>上课时间</i>
                      <p>{{rowInfo.time_name}}</p>
                    </span>
                    <span class="details shrink">
                      <i>任课老师</i>
                      <p>{{rowInfo.teacher_name}}</p>
                    </span>
                    <span class="details shrink">
                      <i>听课证编号</i>
                      <p>{{rowInfo.orderno}}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--endprint-->
          <el-button size="mini" type="primary" style="width: 200px;float: right;margin-right: 70px;margin-top: 40px" @click="$emit('close')">取消</el-button>
          <el-button size="mini" type="primary" style="width: 200px;float: right;margin-right: 70px;margin-top: 40px" @click="doPrint">打印</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQArt from "../QRCode/QRCode.vue";
import VTurnclass from "./../frontDesk/TurnClass";
export default {
  props: {
    display: {
      type: Object,
      default: () => ({
        printLayer: false,
        turnClassSwitch: false,
        classCourseLayer: false
      })
    },
    rowInfo: {
      type: Object,
      default: () => ({
        student_no: ""
      })
    }
  },
  components: {
    VueQArt,
    VTurnclass
  },
  data() {
    return {
      oldClassTimeOptions: [],
      newClassTimeOptions: [],
      oldClassSequence: [],
      newClassSequence: [],
      attendclassList: [],
      attendList: []
    };
  },
  watch: {
    display: {
      handler(o) {
        switch (Object.keys(o)[0]) {
          case "turnClassSwitch":
            this.$store.commit("setTurnClassInfo", this.rowInfo);
            //清空参数
            this.oldClassTimeOptions = [];
            this.newClassTimeOptions = [];
            this.oldClassSequence = null;
            this.newClassSequence = null;
            var objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              source: "PC",
              orderId: this.rowInfo.order_id //订单编号
            };
            this.$axios
              .post(
                this.GlobalVal.httpLink.getclassinfo,
                JSON.stringify(objData)
              )
              .then(
                res => {
                  if (res.data.code === "10000") {
                    this.attendclassList = res.data.checkinlist;
                    this.attendList = res.data.classinfo;
                    this.$store.commit("setTurnClassInfo", this.attendList);
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
            break;
          case "":
            this.$store.commit("setTurnClassInfo", row);
            this.$store.commit("setCouserSwitch", true);
            this.orderId = row.order_id;
            this.rowInfo = row;
            //清空参数
            this.oldClassTimeOptions = [];
            this.newClassTimeOptions = [];
            this.oldClassSequence = null;
            this.newClassSequence = null;
            this.reason = "";
            var objData = {
              staffId: JSON.parse(window.sessionStorage.getItem("staff"))
                .staffId,
              source: "PC",
              orderId: this.rowInfo.order_id //订单编号
            };
            this.$axios
              .post(
                this.GlobalVal.httpLink.getclassinfo,
                JSON.stringify(objData)
              )
              .then(
                res => {
                  if (res.data.code === "10000") {
                    this.classCourseLayer = true;
                    this.attendList = res.data.classinfo;
                    this.attendclassList = res.data.checkinlist;
                    this.$store.commit("setClassCourseInfo", this.attendList);
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
            break;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    doPrint() {
      let newWindow = window.open("_blank"); //打开新窗口
      let codestr = document.getElementById("box").innerHTML; //获取需要生成pdf页面的div代码
      codestr += `<style>
                *{
                  margin: 0;
                  padding: 0;
                  font-size: 12px;
                }
                .qr-code-img{
                    position: absolute;
                    left: 5px;
                    top: 80px;
                }
                #box{
                    width: 800px;
                    height: 698px;
                    background-size:100%;
                    padding-top:1５0px;
                    box-sizing: border-box;
                    overflow: hidden;
                    color: #333333;
                    margin: 0 auto;
                }
                .s_center{
                    float: left;
                    width: 100vw;
                    height:auto;
                    position: relative;
                    overflow: hidden;
                }
                .s_centerLeft{
                    width: 60%;
                    float: left;
                    margin-left:10px;
                    overflow: hidden;
                }
                .s_LeftRight{
                  margin-top: -55px;
                }
                .s_LeftTop{
                    width: 100%;
                    height: auto;
                    overflow: hidden;
                }
                img.s_TowCode{
                    float: left;
                    display: block;
                    width:100px;
                    height: auto;
                }
                .s_essential{
                    float: right;
                    width: 50%;
                    margin-top:100px;
                    margin-right: 10px;
                }
                span.details{
                    display: inline-block;
                    width: 100%;
                    height: auto;
                    overflow: hidden;
                }
                span.details>i{
                    display: block;
                    text-align: right;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    color: gray;
                }
                span.details>p{
                    text-align: right;
                    height: 30px;
                    line-height: 30px;
                    font-weight: 700;
                }
                span.detailsLeft>i,span.detailsLeft>p{
                    text-align: left;
                }
                span.detailsLeft{
                    display: block;
                    margin-bottom:6px;
                }
                span.detailsLeft>i{
                    display: block;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    color: gray;
                }
                span.detailsLeft>p{
                    height: 30px;
                    line-height: 30px;
                    font-weight: 700;
                }
                span.shrink{
                    margin-bottom:6px;
                }
                span.shrink>i{
                    height: 16px;
                    line-height: 16px;
                    font-size: 12px;
                    color: gray;
                }
                span.shrink>p{
                    height: 18px;
                    line-height: 18px;
                    font-size: 12px;
                }
                .s_centerRight{
                    width: 400px;
                    height: 100%;
                    float: left;
                    position: absolute;
                    right: -215px;
                    top: 0;
                    -moz-transform:rotate(-90deg);
                    -webkit-transform:rotate(-90deg);
                    -o-transform:rotate(-90deg);
                    -ms-transform:rotate(-90deg);
                    transform:rotate(-90deg);
                }
                .s_Leftzoom{
                    float: left;
                    width: 65%;
                    height: auto;
                }
                .s_Flortzoom{
                    width: 35%;
                    height: auto;
                    margin-top: -10px;
                    position: absolute;
                    top: 0;
                    right: 68px;
                }
                .s_Flortzoom .qr-code-img{
                  top: 46px;
                  left: auto;
                  right: 0;
                }
                </style>`;
      newWindow.document.write(codestr); //向文档写入HTML表达式或者JavaScript代码
      newWindow.document.close(); //关闭document的输出流, 显示选定的数据
      newWindow.print(); //打印当前窗口
      return true;
    }
  }
};
</script>
<style scoped>
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
</style>
<style scoped>
.transition-box.change {
  height: 400px;
}
.transition-box1.change {
  height: 400px;
}
.transition-box {
  border-radius: 4px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding-bottom: 20px;
}
.transition-box1 {
  height: 740px;
  border-radius: 4px;
  background-color: #ffffff;
  color: #333333;
  box-sizing: border-box;
}
.couseTable > .table,
.classTable > .table {
  height: 580px;
  overflow-y: auto;
  margin-bottom: 20px;
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
.fotter-warp1 {
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
.transition-box1 .el-cascader {
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
.close-btn1 {
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
.modify-title1 {
  font-size: 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #666666;
  border-bottom: 1px solid #cccccc;
  text-align: left;
  padding-left: 20px;
  z-index: 100;
}
.handle-box {
  margin-bottom: 20px;
}
.search-warp {
  display: inline-block;
  /*float: right;*/
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
.student-info-warp {
  color: #333333;
  padding-left: 20px;
}
.student-info {
  display: inline-block;
}
/*分割线*/
.line {
  width: 100%;
  height: 1px;
  background: #cccccc;
  margin-bottom: 10px;
  margin-top: 10px;
}
/*打印听课证*/
i {
  font-style: normal;
}
#box {
  width: 800px;
  height: 698px;
  background-image: url("../../../static/img/printback.png");
  background-size: 100%;
  padding-top: 142px;
  box-sizing: border-box;
  overflow: hidden;
  color: #333333;
  margin: 0 auto;
}
.s_center {
  float: left;
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
}
.s_centerLeft {
  width: 50%;
  float: left;
  margin-left: 70px;
  overflow: hidden;
}
.s_LeftTop {
  width: 100%;
  height: auto;
  overflow: hidden;
}
img.s_TowCode {
  float: left;
  display: block;
  width: 100px;
  height: auto;
}
.s_essential {
  float: right;
  width: 50%;
  margin-top: 6px;
}
span.details {
  display: inline-block;
  width: 100%;
  height: auto;
  overflow: hidden;
}
span.details > i {
  display: block;
  text-align: right;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
span.details > p {
  text-align: right;
  height: 30px;
  line-height: 30px;
  font-weight: 700;
}
span.detailsLeft > i,
span.detailsLeft > p {
  text-align: left;
}
span.detailsLeft {
  display: block;
  margin-bottom: 6px;
}
span.detailsLeft > i {
  display: block;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
span.detailsLeft > p {
  height: 30px;
  line-height: 30px;
  font-weight: 700;
}
span.shrink {
  margin-bottom: 6px;
}
span.shrink > i {
  height: 16px;
  line-height: 16px;
  font-size: 12px;
}
span.shrink > p {
  height: 18px;
  line-height: 18px;
  font-size: 14px;
}
.s_centerRight {
  width: 54%;
  height: 57%;
  float: left;
  position: absolute;
  right: -65px;
  top: 103px;
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.s_Leftzoom {
  float: left;
  width: 50%;
  height: auto;
}
.s_Flortzoom {
  float: left;
  width: 50%;
  height: auto;
}
</style>
