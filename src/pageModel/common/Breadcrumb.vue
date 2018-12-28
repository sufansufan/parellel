<template>
    <div class="breadcrumb">
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><i class="el-icon-location"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in $store.state.breadcrumbs" :key="index">
                    {{item}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    .breadcrumb{
        position: absolute;
        width:100%;
        font-size: 12px;
        padding: 0 0 0 250px;
        z-index:3;
    }
    .breadcrumb>div{
        background: #ffffff;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 5px;
        border-bottom:1px solid #cccccc;
    }
</style>
