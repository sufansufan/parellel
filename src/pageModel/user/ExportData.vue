<template>
    <div class="exportData-box">
        <div class="exportData-search-box">
            <el-date-picker
                size="mini"
                v-model="selectDate"
                type="datetimerange"
                align="right"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            <el-select v-model="search.is_interrupt" placeholder="请选择状态" size="mini" clearable>
                <el-option label="中断" :value="true"></el-option>
                <el-option label="成功" :value="false"></el-option>
            </el-select>
            <el-cascader clearable
                    size="mini"
                    expand-trigger="click"
                    :options="location"
                    v-model="selectedLocation"
                    placeholder="选择学校"
                    change-on-select>
            </el-cascader>
            <el-input placeholder="请输入内容" v-model="search.name" size="mini" class="exportData-search" clearable>
                <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
            </el-input>
        </div>
        <el-table :data="data" size="mini" stripe style="width: 100%" ref="multipleTable" v-loading="loading">
            <el-table-column prop="start_time" label="开始日期"></el-table-column>
            <el-table-column prop="end_time" label="结束日期"></el-table-column>
            <el-table-column prop="staff_name" label="操作人"></el-table-column>
            <el-table-column prop="admin_organ_name" label="校区"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="size" label="导出条数"></el-table-column>
            <el-table-column prop="name" label="导出名称"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                    :current-page="page + 1"
                    :page-size="limit"
                    :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                limit: 10,
                page: 0,
                count: 20,
                loading: false,
                dataList: [],
                selectDate: [],
                selectedLocation: [],
                search:{
                    min_date: '',
                    max_date: '',
                    name: '',
                    staff_name: '',
                    is_interrupt: '',
                    organId: '',
                }
            }
        },
        computed:{
            data(){
                return this.dataList.map((item) => {
                    item.start_time = this.Util.TimeCycle(item.start_time);
                    item.end_time = this.Util.TimeCycle(item.end_time);
                    item.status = item.is_interrupt ? '中断' : '完成';
                    return item;
                })
            }
        },
        watch:{
            search:{
                handler(){
                    this.page = 0;
                    this.getData()
                },
                deep:true
            },
            selectedLocation:function () {
                if(this.selectedLocation.includes(JSON.parse(window.sessionStorage.getItem("staff")).staffOrganId)){
                    this.search.organId = this.selectedLocation[this.selectedLocation.length - 1];
                }else if(this.selectedLocation.length === 0){
                    this.search.organId = "";
                }
            },
            selectDate(){
                if(this.selectDate){
                    this.search.min_date = new Date(this.selectDate[0]).getTime();
                    this.search.max_date = new Date(this.selectDate[1]).getTime();
                }else{
                    this.search.min_date = "";
                    this.search.max_date = "";
                }              
            }
        },
        created(){
            this.location = this.$store.state.location;
            this.getData();
        },
        methods:{
            getData(){
                let objData = {
                    limit: this.limit,
                    page: this.page,
                    staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    source: this.GlobalVal.constants.source,
                    organ_id: this.search.organId,
                    staff_name: this.search.staff_name,
                    min_date: this.search.min_date,
                    max_date: this.search.max_date,
                    is_interrupt: this.search.is_interrupt,
                    name: this.search.name,
                }
                this.$axios.post(this.GlobalVal.httpLink.listExportRecord, JSON.stringify(objData)).then(
                    res => {
                        if(res.data.code === '10000'){
                            this.dataList = res.data.data.exportRecords || [];
                            this.count = res.data.data.count;
                        }else{
                            this.$message.error(res.data.errmsg)
                        }
                       
                    },
                    res => {
                        this.$message.error('操作失败')
                    }
                )
            },
            searchBtn(){
                this.page = 0;
                this.getData();
            },
            handleSizeChange(val){
                this.limit = val;
                this.getData();
            },
            handleCurrentChange(val){
                this.page = val - 1;
                this.getData();
            }   
        }
    }    
</script>
<style scoped>
    .exportData-box{
        padding: 20px;
    }
    .exportData-search-box{
        margin-bottom: 20px;
    }
   .exportData-search{
       width:260px;
   }
</style>
<style>
    .exportData-search-box .el-range-editor--mini.el-input__inner{
        height: 30px;
        margin-top: -2px;
    }
</style>

