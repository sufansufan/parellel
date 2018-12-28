<template>
    <div>
        <div class="handleClass">
            <el-date-picker
                v-model="value6"
                type="daterange"
                size="small"
                style="margin-right:3px;width:390px;"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-cascader
                clearable
                size="mini"
                change-on-select
                expand-trigger="click"
                :options="location"
                v-model="selectedLocation"
                placeholder="学校不限"
                style="margin-right:5px;width:193px;">
            </el-cascader>
            <span class="classPay" v-show="reqrefund">
               跨区转班退费总额￥1,231,245.00 
            </span>
            <span class="classPay" v-show="reqapply">
               跨区转班报名总额￥1,231,245.00 
            </span>
            <el-button type="primary" size="mini" style="height:29px;" icon="el-icon-download">导出</el-button>
        </div>
         <div class="oldClass">
            <el-select clearable v-model="particularYear" size="mini" placeholder="年度">
                <el-option
                        v-for="item in $store.state.YearOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="season" size="mini" placeholder="季节">
                <el-option
                        v-for="item in $store.state.SeasonOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="periods" size="mini" placeholder="期别不限">
                <el-option
                        v-for="item in $store.state.PeriodsOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="grade" size="mini" placeholder="年级不限">
                <el-option
                        v-for="item in $store.state.GradeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="subject" size="mini" placeholder="科目不限">
                <el-option
                        v-for="item in $store.state.SubjectOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="projectType" size="mini" placeholder="类别/课型不限">
                <el-option
                        v-for="item in $store.state.CourseTypeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="classType" size="mini" placeholder="班型不限">
                <el-option
                        v-for="item in $store.state.ClassTypeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
                <el-select clearable v-model="classType" size="mini" placeholder="行政区域">
                <el-option
                        v-for="item in $store.state.ClassTypeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <div style="margin-top: 10px;"></div>
            <el-select clearable v-model="classType" size="mini" placeholder="财务区域">
                <el-option
                        v-for="item in $store.state.ClassTypeOptions"
                        :key="item.code"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input
                    size="mini"
                    clearable
                    v-model="select_word"
                    placeholder="请输入搜索内容"
                    class="search-input"
                    style="width: 390px;">
                <el-select style="width: 100px;" v-model="selectTeacherOrClass" slot="prepend" placeholder="请选择">
                    <el-option label="老师姓名" value="teacher"></el-option>
                    <el-option label="班级" value="class"></el-option>
                </el-select>
                <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-cascader clearable
                size="mini"
                expand-trigger="click"
                :options="location"
                v-model="selectedLocation"
                placeholder="选择学校"
                change-on-select
                @change="handleLocationChange" style="" @blur="blur">
            </el-cascader>
            <el-table size="mini" :data="dataList"  stripe style="width: 100%; margin-top:20px;" v-loading="loading">
                <el-table-column prop="teacher_name" label="学院姓名"></el-table-column>
                <el-table-column prop="student_name" label="学员编码"></el-table-column>
                <el-table-column prop="student_mobile" label="联系电话"></el-table-column>
                <el-table-column prop="order_source" label="校区"></el-table-column>
                <el-table-column prop="payment_type" label="行政区域"></el-table-column>
                <el-table-column prop="paystatus" label="财务区域"></el-table-column>
                <el-table-column prop="orderStatus" label="班级名称"></el-table-column>
                <el-table-column prop="total_price" label="老师"></el-table-column>
                <el-table-column prop="discount_price" label="重复周期"></el-table-column>
                <el-table-column prop="real_payment" label="上课时段"></el-table-column>
                <el-table-column prop="discount_type" label="教室"></el-table-column>
                <el-table-column prop="discount_type" label="价格"></el-table-column>                                 
                <el-table-column prop="discount_type" label="课次剩余"></el-table-column>                                 
                <el-table-column prop="discount_type" label="课次退费" v-if="reqrefund"></el-table-column>                                 
                <el-table-column prop="discount_type" label="报名费用" v-if="reqapply"></el-table-column>                                 
                <el-table-column prop="discount_type" label="操作人"></el-table-column>                                 
                <el-table-column prop="discount_type" label="操作时间"></el-table-column>                                                               
            </el-table >
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page+1"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count"
                        :page-size="limit"
                        :page-sizes="[10,20,30,50]">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:["reqapply","reqrefund"],
        data(){
            return {
                page: 0,
                limit: 10,
                count: 0,
            }
        },
        created(){
            console.log(this.reqlink);
        }
    }
</script>
<style scoped>
    .handleClass{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px;
    }
    .classPay{
        width: 300px;
        height: 30px;
        background: #fff;
        margin-right: 5px;
        padding-left: 20px;
        line-height: 30px;
        font-size: 14px;
        font-weight: 600;
    }
    .handleClass .el-date-editor.el-input{
        padding-right:3px;
    }
    .el-range-editor--small.el-input__inner{
        height: 30px;
    }
</style>
