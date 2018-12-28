<template>
    <div class="table">
        <el-tabs v-model="activeName">
            <el-tab-pane label="按老师" name="teacher">
                <div class="handle-box">
                    <div class="search-warp">
                        <el-input
                                size="mini"
                                v-model="searchTeacher"
                                placeholder="请输入搜索内容"
                                class="search-input">
                            <el-select style="width: 100px;" v-model="selectTeacher" slot="prepend" placeholder="请选择">
                                <el-option label="老师姓名" value="teacher"></el-option>
                                <el-option label="老师电话" value="class"></el-option>
                            </el-select>
                            <el-button class="search-btn" slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                    </div>
                    <el-select size="mini" clearable v-model="particular" placeholder="选择年份" style="width: 200px">
                        <el-option
                                v-for="item in $store.state.YearOptions"
                                :key="item.code"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select size="mini" clearable v-model="particular" placeholder="选择月份" style="width: 200px">
                        <el-option label="一月" value="1"></el-option>
                        <el-option label="二月" value="2"></el-option>
                    </el-select>
                    <el-cascader clearable
                                 size="mini"
                                 expand-trigger="click"
                                 :options="location"
                                 v-model="selectedLocation"
                                 placeholder="选择校区"
                                 change-on-select>
                    </el-cascader>
                    <el-button type="primary" size="mini" style="width: 100px;float: right;margin-right: 20px">导出</el-button>
                </div>
                <el-table :data="data" size="mini" stripe style="width: 100%" >
                    <el-table-column prop="teacher_no" label="教师姓名"></el-table-column>
                    <el-table-column prop="teacher_no" label="员工编号"></el-table-column>
                    <el-table-column prop="teacher_no" label="手机号"></el-table-column>
                    <el-table-column prop="teacher_no" label="年份"></el-table-column>
                    <el-table-column prop="teacher_no" label="季节"></el-table-column>
                    <el-table-column prop="teacher_no" label="续班率"></el-table-column>
                    <el-table-column prop="teacher_no" label="满班率"></el-table-column>
                    <el-table-column prop="teacher_no" label="退费率"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="seeClassTable(scope.$index, scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="按校区" name="compus">
                <div class="handle-box">
                    <el-select size="mini" clearable v-model="particular" placeholder="选择年份" style="width: 200px">
                        <el-option
                                v-for="item in $store.state.YearOptions"
                                :key="item.code"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select size="mini" clearable v-model="particular" placeholder="选择月份" style="width: 200px">
                        <el-option label="一月" value="1"></el-option>
                        <el-option label="二月" value="2"></el-option>
                    </el-select>
                    <el-cascader clearable
                                 size="mini"
                                 expand-trigger="click"
                                 :options="location"
                                 v-model="selectedLocation"
                                 placeholder="选择校区"
                                 change-on-select>
                    </el-cascader>
                    <el-button type="primary" size="mini" style="width: 100px;float: right;margin-right: 20px">导出</el-button>
                </div>
                <el-table :data="data" size="mini" stripe style="width: 100%" >
                    <el-table-column prop="teacher_no" label="大区"></el-table-column>
                    <el-table-column prop="teacher_no" label="城市"></el-table-column>
                    <el-table-column prop="teacher_no" label="校区"></el-table-column>
                    <el-table-column prop="teacher_no" label="年份"></el-table-column>
                    <el-table-column prop="teacher_no" label="季节"></el-table-column>
                    <el-table-column prop="teacher_no" label="续班率"></el-table-column>
                    <el-table-column prop="teacher_no" label="满班率"></el-table-column>
                    <el-table-column prop="teacher_no" label="退费率"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="seeClassTable(scope.$index, scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="按年级" name="grade">
                <div class="handle-box">
                    <el-select size="mini" clearable v-model="particular" placeholder="选择年份" style="width: 200px">
                        <el-option
                                v-for="item in $store.state.YearOptions"
                                :key="item.code"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select size="mini" clearable v-model="particular" placeholder="选择月份" style="width: 200px">
                        <el-option label="一月" value="1"></el-option>
                        <el-option label="二月" value="2"></el-option>
                    </el-select>
                    <el-cascader clearable
                                 size="mini"
                                 expand-trigger="click"
                                 :options="location"
                                 v-model="selectedLocation"
                                 placeholder="选择校区"
                                 change-on-select>
                    </el-cascader>
                    <el-button type="primary" size="mini" style="width: 100px;float: right;margin-right: 20px">导出</el-button>
                </div>
                <el-table :data="data" size="mini" stripe style="width: 100%" >
                    <el-table-column prop="teacher_no" label="组织架构"></el-table-column>
                    <el-table-column prop="teacher_no" label="年级"></el-table-column>
                    <el-table-column prop="teacher_no" label="年份"></el-table-column>
                    <el-table-column prop="teacher_no" label="季节"></el-table-column>
                    <el-table-column prop="teacher_no" label="续班率"></el-table-column>
                    <el-table-column prop="teacher_no" label="满班率"></el-table-column>
                    <el-table-column prop="teacher_no" label="退费率"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="seeClassTable(scope.$index, scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>
<script>
    export default{
        data(){
            return{
                location:[],//校区集合
                organId:"",//机构id
                dataList:[{
                    teacher_no:'121321313'
                }],
                searchTeacher:"",
                activeName:'teacher',
                selectTeacher:'teacher',
                selectedLocation:[],
            }
        },
        computed:{
            data(){
                if(!this.dateList){
                    return [];
                }
                return this.dateList.map(item=>{
                    return item;
                })
            }
        },
        created(){
            this.Util.queryAreaNav(self, -1, function() {self.getData();});
            this.location = this.$store.state.location;
            this.organId=this.$store.state.organId
        },
        methods:{

            search(){

            }
        }
    }
</script>
<style scoped>
    .search-warp {
        display: inline-block;
    }
    .search-input {
        width: 400px;
    }
    .handle-box{
        margin-bottom: 20px;
    }
</style>
