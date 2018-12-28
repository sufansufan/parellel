<template>
  <div class="table">
    <div class="handle-box">
      <!-- <el-cascader size="small" expand-trigger="click" ref="cascaderLoaction" :options="location" v-model="selectedLocation" placeholder="选择学校" style="opacity: 0; position: absolute; left: 30px;" change-on-select @change="handleLocationChange">
      </el-cascader>
      <div class="multi-cascader" @click="openCascader">
        <span v-for="(item, index) in multiCascader" :key="item.value">
          <i class="el-tag__close el-icon-close" @click="removeCascaderItem(index, item, $event)"></i>
          {{ item.label }}
        </span>
        <p v-show="multiCascader.length === 0">请选择校区</p>
      </div> -->
      <el-cascader clearable size="mini" expand-trigger="click" :options="location" v-model="selectedLocation" placeholder="选择学校" change-on-select @change="handleLocationChange">
        </el-cascader>
      <el-date-picker v-model="dateSlot" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" size="mini" @click="getData()">搜索</el-button>
    </div>
    <div style="display: flex; flex-wrap: wrap; background: #fff; padding: 20px;">
      <div style="width: calc(50% - 2px); border-right: 4px solid #efefef; position: relative;">
        <span style="position: absolute; left: 50%; top: calc(50% + 5px); font-size: 16px; transform: translateX(-50%)">总计：￥
          <b>{{chartData.total[0] | numToFixed}}</b>
        </span>
        <ve-ring ref="listPaied" :data="chartData.listPaied" :settings="chartSettings" :change-delay="200" :extend="chartData.listPaied.chartExtend" v-loading="loading"></ve-ring>
      </div>
      <div style="width: calc(50% - 2px); position: relative;">
        <span style="position: absolute; left: 50%; top: calc(50% + 5px); font-size: 16px; transform: translateX(-50%)">总计：￥
          <b>{{chartData.total[1] | numToFixed}}</b>
        </span>
        <ve-ring ref="listRefund" :data="chartData.listRefund" :settings="chartSettings" :extend="chartData.listRefund.chartExtend" v-loading="loading"></ve-ring>
      </div>
      <div style="width: 100%; margin-top: 20px; padding-top: 20px; border-top: 4px solid #efefef;">
        <ve-histogram :data="chartData.listStudent" :extend="chartData.listStudent.hsitogramExtend" v-loading="loading"></ve-histogram>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      cur_page: 0, //页码
      cur_limit: 10, //每次请求的数据数
      count: 0, //数据总量
      organId: "",
      organName: "",
      multiCascader: [],
      selectedLocation: [], //学校
      dataList: [], //请求的list
      school_ids: [], // 大区
      branch_school_ids: [], // 分校
      campus_ids: [], //　校区
      dateSlot: [], //开始时间
      chartEvents: {},
      organ_id: "",
      chartData: {
        listPaied: {},
        listRefund: {},
        total: [0, 0],
        listStudent: {},
        chartExtend: {
          title: {
            text: "标题",
            left: "center",
            top: "38%",
            padding: [24, 0],
            textStyle: {
              fontSize: 18,
              align: "center"
            }
          }
        }
      },
      chartSettings: {},
      //表单校验规则
      rules: {
        organ_name: [
          { required: true, message: "请输入分校名称", trigger: "blur" }
        ]
      }
    };
  },
  //实例创建完成后被立即调用
  created() {
    this.Util.queryAreaNav(this, -1, () => {
      this.getData();
    });
    this.location = this.$store.state.location;
    this.organId = this.$store.state.organId;
    console.log(this.location);
  },
  //计算属性
  computed: {
    //相当于过滤器
    data() {
      const self = this;
      if (!self.dataList) {
        return [];
      }
      return self.dataList.filter(function(d) {
        if (d.organ_level === 2) {
          self.count++;
          return d;
        }
      });
    }
  },
  watch: {
    multiCascader() {
      this.getData();
    },
    dateSlot() {
      this.startTime = this.dateSlot
        ? this.Util.TimeCycle(new Date(this.dateSlot[0]).getTime(), "ymd")
        : "";
      this.endTime = this.dateSlot
        ? this.Util.TimeCycle(new Date(this.dateSlot[1]).getTime(), "ymd")
        : "";
      this.getData();
    },
    selectedLocation: function(o, n) {
      if (
        this.selectedLocation.includes(
          JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
        )
      ) {
        if (o[o.length - 1] !== n[n.length - 1]) {
          this.organ_id = o[o.length - 1];
          this.getData();
        }
      } else if (this.selectedLocation.length === 0) {
        this.organ_id = "";
        this.getData();
      }
    },
  },
  filters: {
    numToFixed(value) {
      return value.toLocaleString();
    }
  },
  mounted() {
    const veRingArr = ["listPaied", "listRefund"];
    veRingArr.forEach((item, index) => {
      this.$refs[item].echarts.on("legendselectchanged", obj => {
        let selected = obj.selected,
          legend = obj.name,
          charts = this.chartData[item],
          total = 0;
        charts.rows.forEach(item => {
          if (selected[item.name]) {
            total += item.value;
          }
        });
        this.$set(this.chartData.total, index, total);
      });
    });
  },
  methods: {
    //重新选择了地区事件
    handleLocationChange(value) {
      let val = value[value.length - 1];
      let arr = null;
      const returnVal = data => {
        data.children.forEach(item => {
          if (item.value === val) {
            arr = {
              type: item.type,
              label: item.label
            };
          } else {
            item.children && !arr && returnVal(item);
          }
        });
      };
      returnVal(this.location[0]);
      let keys = this.multiCascader.map(item => item.value);
      if (!keys.includes(val) || !keys.length) {
        if (arr) {
          switch (arr.type) {
            case 1:
              this.school_ids.push({
                id: val
              });
              break;
            case 2:
              this.branch_school_ids.push({
                id: val
              });
              break;
            case 3:
              this.campus_ids.push({
                id: val
              });
              break;
            default:
          }
          if (
            value.includes(
              JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId
            )
          ) {
            this.multiCascader.push({
              type: arr.type,
              value: val,
              label: arr.label
            });
          }
        }
      }
    },
    removeCascaderItem(index, item, event) {
      event.stopPropagation();
      const arr = ["school_ids", "branch_school_ids", "campus_ids"];
      let thisData = this[arr[item.type - 1]];
      thisData = thisData.map(val => {
        if (val.id !== item.value) {
          return val;
        }
      });
      this[arr[item.type - 1]] = thisData.filter(item => item);
      this.multiCascader.splice(index, 1);
    },
    openCascader() {
      this.$refs.cascaderLoaction.$el.click();
    },
    //获取数据
    getData() {
      let objData = {
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
        /* school_ids: this.school_ids,
        branch_school_ids: this.branch_school_ids,
        campus_ids: this.campus_ids,
        startDate: this.startTime, */
        organ_id: this.organ_id,
        endDate: this.endTime
      };
      this.loading = true;
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryRefundOrPaiedForECharts,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
              this.chartData.chartExtend.title.text = "  缴费额（元）";

              this.chartData.listPaied = {
                columns: res.data.data.names,
                rows: res.data.data.listPaied,
                chartExtend: JSON.parse(
                  JSON.stringify(this.chartData.chartExtend)
                )
              };
              this.chartData.total[0] = res.data.data.listPaied.reduce(
                (o, n) => ({ value: o.value + n.value }),
                { value: 0 }
              )["value"];

              this.chartData.chartExtend.title.text = "  退费额（元）";

              this.chartData.listRefund = {
                columns: res.data.data.names,
                rows: res.data.data.listRefund,
                chartExtend: JSON.parse(
                  JSON.stringify(this.chartData.chartExtend)
                )
              };
              this.chartData.total[1] = res.data.data.listRefund.reduce(
                (o, n) => ({ value: o.value + n.value }),
                { value: 0 }
              )["value"];

              this.chartData.listStudent = res.data.data.listStudent.map(
                item => {
                  return {
                    columns: ["data", item.name],
                    rows: res.data.data.dates.map((val, index) => {
                      return {
                        data: val,
                        [item.name]: item.data[index]
                      };
                    })
                  };
                }
              )[0];

              this.chartData.listStudent.hsitogramExtend = {
                barMaxWidth: 30,
                title: {
                  text:
                    "新学员总计：" +
                    res.data.data.listStudent[0].data.reduce(
                      (o, n) => o + n,
                      0
                    ) +
                    "人",
                  subtext: "单位/人"
                }
              };
              this.chartSettings = {
                dimension: "name",
                metrics: "value",
                position: "inside"
              };
            } else {
              console.error(res);
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
    //重新筛选函数
    screening() {
      this.getData();
    },

    //翻页导航栏
    handleCurrentChange(val) {
      this.cur_page = val - 1;
      this.getData();
    },

    //每页显示数目发生变化
    handleSizeChange(val) {
      this.cur_limit = val;
      this.getData();
    }
  }
};
</script>

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
  min-height: 400px;
}

.transition-box {
  position: absolute;
  width: 600px;
  height: 480px;
  min-height: 480px;
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
  overflow: hidden;
}

.search-warp {
  float: right;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.multi-cascader {
  font-size: 14px;
  line-height: 25px;
  margin-right: 20px;
  padding: 5px 5px 0 15px;
  color: #606266;
  width: 217px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  text-align: left;
  border: 1px solid #dcdfe6;
  float: left;
  min-height: 25px;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
}
.multi-cascader > span {
  background-color: #f0f2f5;
  border-radius: 4px;
  color: #909399;
  height: 24px;
  line-height: 24px;
  margin: 0 0 5px;
  padding: 0 23px 0 8px;
  margin-right: 5px;
  position: relative;
  font-size: 12px;
}
.multi-cascader > p {
  color: #d1c4d0;
}
.multi-cascader > span > i::after {
  position: absolute;
  content: "\E60F";
  transform: translateY(0.5px);
  background-color: #c0c4cc;
  right: 5px;
  top: 5px;
  border-radius: 50%;
  color: #fff;
}
.multi-cascader > span > i::before {
  content: "";
}
</style>
