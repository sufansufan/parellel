<template>
    <div class="financial-campus">
         <div class="handle-box">
            <el-date-picker
                clearable
                size="medium"
                v-model="daterange"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            <el-cascader
                clearable
                size="medium"
                change-on-select
                expand-trigger="click"
                :options="location"
                v-model="selectedLocation"
                placeholder="学校不限"
                style="margin-right:5px; margin-top: 1px;width:200px;">
            </el-cascader>
            <div class="confirm-pay">
                <p>确认总收入￥{{sumAllIncome.all_confirm_amount}}</p>
                <p>可退总余额￥{{sumAllIncome.all_left_amount}}</p>
            </div>
        </div>
        <el-table size="mini" :data="dataList"  stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="school_name" label="大区"></el-table-column>
            <el-table-column prop="branch_school_name" label="城市"></el-table-column>
            <el-table-column prop="campus_name" label="校区"></el-table-column>
            <el-table-column prop="countClass" label="班级数"></el-table-column>
            <el-table-column prop="countLecture" label="授课人数"></el-table-column>
            <el-table-column prop="countSignIn" label="签到"></el-table-column>
            <el-table-column prop="countSignLate" label="迟到"></el-table-column>
            <el-table-column prop="countSignleave" label="请假"></el-table-column>
            <el-table-column prop="countSignAbsent" label="旷课"></el-table-column>
            <el-table-column prop="countSignAbsenteeism" label="补签"></el-table-column>
            <el-table-column prop="left_amount" label="可退金额"></el-table-column>
            <el-table-column prop="confirm_amount" label="确认收入"></el-table-column>
            <el-table-column prop="real_payment" label="收入">
                <template slot-scope="scope">
                    <div @click="$emit('income',scope.row.campus_id)" style="color: #409EFF;cursor: pointer;">{{scope.row.real_payment}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="exportFinancialConfirmation(scope.row)">导出</el-button>
                </template>     
            </el-table-column>                                    
        </el-table >
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChangeCampus"
                    @current-change="handleCurrentChangeCampus"
                    layout="total, slot, sizes, prev, pager, next, jumper"
                    :current-page="page + 1"
                    :total="count"
                    :page-size="limit"
                    :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                count: 20,
                limit: 10,
                page: 0,
                dataList: [],
                objData: {},
                selectedLocation: [],
                daterange: [new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate() - 1), new Date()],
                sumAllIncome: {},
                start_time: new Date().getTime() - 3600 * 1000 * 24 * (new Date().getDate() - 1),
                end_time: new Date().getTime()
            }
        },
        watch:{
            daterange(){
                if(this.daterange){
                    this.start_time = new Date(this.daterange[0]).getTime()
                    this.end_time = new Date(this.daterange[1]).getTime()
                }else{
                    this.start_time = "";
                    this.end_time = "";
                }   
                this.getData('clearPage');
            },
            selectedLocation(o, n){
                if(this.selectedLocation.includes(JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId)){
                    if(o[o.length-1] !== n[n.length-1]){
                        this.organ_id = o[o.length-1];
                        this.getData('clearPage');
                    }
                }else if(this.selectedLocation.length === 0){
                    this.organ_id = "";
                    this.getData('clearPage');
                }
            }
        },
        created(){
            this.location = this.$store.state.location;
            this.Util.queryAreaNav(this, -1, () => this.getData());
        },
        methods: {
            //查询获取数据
            getData(clearPage){
                this.objData = {
                    limit: this.limit,
                    page:  clearPage ? this.page = 0 : this.page,
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    source: this.GlobalVal.constants.source,
                    start_time: this.start_time,
                    end_time: this.end_time,
                    organ_id: this.organ_id || '',
                }
                this.loading = true;
                this.$axios.post(this.GlobalVal.httpLink.listFinancialConfirmationByOrgan, JSON.stringify(this.objData)).then(
                    res => {
                        if(res.data.code === "10000"){
                            this.count = res.data.data.count;
                            this.dataList = res.data.data.financialConfirmations || [];
                            this.sumAllIncome = res.data.data.sumAllIncome || {};
                            this.sumAllIncome.all_confirm_amount = this.sumAllIncome.all_confirm_amount.toLocaleString();
                            this.sumAllIncome.all_left_amount = this.sumAllIncome.all_left_amount.toLocaleString();
                        }else{
                            this.$message({
                                type: "error",
                                message: res.data.errmsg
                            });
                            this.loading = false;
                        }
                        this.loading = false;
                    },
                    res => {
                        this.$message("请求失败");
                        this.loading = false;
                    }
                )
            },
            //限制每页的条数
            handleSizeChangeCampus(val){
                this.limit = val;
                this.getData('clearPage');
            },
            //翻页
            handleCurrentChangeCampus(val){
                this.page = val - 1; 
                this.getData();
            },
            exportFinancialConfirmation(row) {
                this.objData.organ_id = row.campus_id
                this.objData.start_time = this.Util.TimeCycle(this.start_time);
                this.objData.end_time = this.Util.TimeCycle(this.end_time);
                this.$exportExcel({
                    dataList: this.dataList,
                    objData: this.objData,
                    httpUrl: "exportFinancialConfirmation",
                    title: this.$route.meta.title
                });
            },
        },
    }
</script>
<style scoped>
    .financial-campus .handle-box{
        margin: 6px 0px 20px;
    }
    .confirm-pay{
        margin-top: 2px;
        float: right;
        display: flex;
        justify-content: flex-end;
    }
    .confirm-pay p{
        width: 200px;
        height: 34px;
        background: #fff;
        line-height: 34px;
        font-size: 14px;
        font-weight: 700;
        margin-left:5px;
        padding-left: 5px;
    }
</style>
<style>
    .financial-campus .handle-box .el-range-editor--mini.el-input__inner{
        height: 31px;
        margin-top: -2px;
    }
</style>

