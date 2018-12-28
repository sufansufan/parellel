<template>
    <div class="table">
        <div class="handle-box">
            <el-cascader clearable
                    size="mini"
                    expand-trigger="click"
                    :options="locationArea"
                    v-model="selectedLocationArea"
                    placeholder="选择省市行政区"
                    change-on-select
                    @change="handleLocationChange">
            </el-cascader>
            <div class="subject-change-warp">
                <el-select v-model="subject" size="mini" placeholder="所有科目">
                    <el-option
                            v-for="item in subjectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" size="mini" icon="search"  @click="screening">筛选</el-button>
            <el-button type="primary" size="mini" icon="plus" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-button type="danger" size="mini" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        </div>
        <el-table :data="dataList" size="mini" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="campus" label="校区名称"></el-table-column>
            <el-table-column prop="school" label="大区"></el-table-column>
            <el-table-column prop="branchSchool" label="市区"></el-table-column>
            <el-table-column prop="chreateTime" label="创建时间"></el-table-column>
            <el-table-column prop="teachingSchoolNum" label="教学点数量"></el-table-column>
            <el-table-column prop="subject" label="科目"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="mini"  type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                    :page-size="cur_limit"
                    :page-sizes="[10,20,30,50]">
            </el-pagination>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                cur_page: 0, //页码
                cur_limit:10, //每次请求的数据数
                count:0, //数据总量
                organId:"",
                organName:"",
                subject:"",
                subjectOptions:[],
                dataList:[],
                locationArea: [],
                selectedLocationArea: [], //选择的行政区域
                multipleSelection: [], //选中的项
                province_name:"",
                city_name:"",
                district_name:"",

            }
        },
        //实例创建完成后被立即调用
        created() {
            const self= this;
            if(window.sessionStorage.getItem("proviceNav")){ //已经加载过一次区域导航了
                this.locationArea = JSON.parse(window.sessionStorage.getItem("proviceNav"));
                this.getData();
            }else{ //没有加载过区域导航
                let objData={
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                };
                this.$axios.post(this.GlobalVal.httpLink.getProviceNav,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code ==="10000"){
                            self.locationArea = res.data.proviceNav;
                            window.sessionStorage.setItem("proviceNav",JSON.stringify(res.data.proviceNav));
                        }else{
                            console.error(res);
                            this.$message({
                                type:"error",
                                message:res.data.errmsg
                            });
                        }
                        self.getData();
                    },
                    res=>{
                        this.$message("请求失败");
                        self.getData();
                    }
                )
            }
        },
        //计算属性
        computed: {

        },
        watch:{

        },
        methods: {
            //获取数据
            getData(){
                const self = this;
                let objData={
                    page:this.cur_page, //页数
                    limit:this.cur_limit, //条目数
                    staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                    organId:this.organId,
                    organName:this.organName,
                    subject:this.subject,  //可能为"",  科目
                };
                console.log("获取管理机构信息列表",objData);
                this.$axios.post(this.GlobalVal.httpLink.getSchoolList,JSON.stringify(objData)).then(
                    res=>{
                        if(res.data.code==="10000"){
                            console.log("获取管理机构信息列表获取到的对象",res.data);
                            self.count = res.data.count;
                            self.dataList=res.data.campusList;
                        }else{
                            console.error(res);
                            self.$message({
                                type:"error",
                                message:res.data.errmsg
                            })
                        }
                    },
                    res=>{
                        self.$message("请求失败")
                    }
                )
            },
            //重新选择了地区事件
            handleLocationChange(value){

            },
            //重新筛选函数
            screening(){
                this.getData();
            },

            //删除事件
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let objData={
                        staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                        idList:[{
                            "id": row.id
                        }]
                    };
                    this.$axios.post(this.GlobalVal.httpLink.delSchoolList,JSON.stringify(objData)).then(
                        res=>{
                            if(res.data.code ==="10000"){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getData();
                            }else{
                                console.error(res);
                                this.$message({
                                    type: 'error',
                                    message: res.data.errmsg
                                });
                            }
                        },
                        res=>{
                            console.error(res);
                            this.$message({
                                type: 'error',
                                message: "操作失败"
                            });
                        }
                    );
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除操作'
                    });
                });
            },

            //删除全部
            delAll() { //批量删除按钮触发
                const self = this;
                if(this.multipleSelection.length>0) {
                    this.$confirm('此操作将永久删除这些名单, 是否继续?', '警告', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let idList = [];
                        for (let i = 0, length = self.multipleSelection.length; i < length; i++) {
                            idList.push({
                                id: self.multipleSelection[i].id
                            });
                        }

                        let objData={
                            staffId:JSON.parse(window.sessionStorage.getItem("staff")).staffId,
                            idList:idList
                        };
                        self.multipleSelection = [];
                        this.$axios.post(this.GlobalVal.httpLink.delTeacher,JSON.stringify(objData)).then(
                            res=>{
                                console.error(res);
                                if(res.data.code==="10000"){
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.getData();
                                }else{
                                    this.$message({
                                        type: 'error',
                                        message: res.data.errmsg
                                    });
                                }
                            },
                            res=>{
                                console.error(res);
                                this.$message({
                                    type: 'error',
                                    message: "操作失败"
                                });
                            }
                        );
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: '没有选中任何项'
                    });
                }
            },


            //修改按钮事件
            handleEdit(index, row) {
                this.$message({
                    type: 'info',
                    message: '此功能正在开发中,请等待...'
                });
            },


            //将选中的行存储在一个变量中
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //翻页导航栏
            handleCurrentChange(val) {
                this.cur_page = val-1;
                this.getData();
            },

            //每页显示数目发生变化
            handleSizeChange(val){
                this.cur_limit = val;
                this.getData();
            },

            handleAdd(){
                this.$message({
                    type: 'info',
                    message: '此功能正在开发中,请等待...'
                });
                //this.$router.push({path:"/addSchool"})
            },
        }
    }
</script>

<style scoped>
    .subject-change-warp{
        width: 110px;
        display: inline-block;
    }
    .search-warp{
        display: inline-block;
        float: right;
    }
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    /*修改组织弹出框的*/
    .bg-layer{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
    .transition-box {
        position: absolute;
        width: 400px;
        min-height: 300px;
        top: 50%;
        left:50%;
        margin-left: -200px;
        margin-top: -150px;
        border-radius: 4px;
        background-color: #ffffff;
        overflow-y: scroll;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        z-index: 10;
    }
    .close-btn{
        position: absolute;
        color: #ff6808;
        font-size: 20px;
        right: 10px;
        top: 10px;
    }
    .page-nav{
        position: absolute;
        display: inline-block;
        color: #ff6808;
        margin:auto;
        left: 0;
        right: 0;
        font-size: 20px;
        bottom: 20px;
    }
    .modify-title{
        font-size: 20px;
        color: #666666;
        border-bottom:1px solid #cccccc;
        text-align: left;
        padding: 3px 10px;
    }
    .add-reminder{
        color: #888;
        font-size: 14px;
        text-align: center;
        display: block;
        height:60px;
        line-height: 60px;
    }
    .code-input{
        width: 320px;
        margin-bottom: 30px;
    }
</style>
