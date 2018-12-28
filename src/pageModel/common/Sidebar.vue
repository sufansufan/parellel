<template>
    <div class="sidebar">
        <!--<div class="user-info">
            <div class="img-warp">
                <img class="user-logo" src="../../../static/img/img.jpg">
            </div>
            <p class="name">{{staff.staffName}}</p>
            <p class="user-type">{{staff.roleName}}</p>
        </div>-->
        <div style="width: 100%;">
            <img src="../../../static/img/logo.png" alt="" style="width:78%; display: block;">
        </div>
        <div class="sidebarCon">
            <!--<el-menu
                    text-color="#fff"
                    border="none"
                    background-color="#262b30"
                    active-text-color="#ffffff"
                    :default-active="onRoutes"
                    class="el-menu-vertical-demo"
                    unique-opened
                    router>
                <template v-for="(item,index) in menuBar">
                    <template v-if="item.subMenus">
                        <el-submenu :index="index">
                            <template slot="title"><i :class="item.menuIcon"></i>{{ item.menuName }}</template>
                            &lt;!&ndash;<template v-for="(subItem,index) in item.subMenus">
                                <template v-if="subItem.subMenus">
                                </template>
                            </template>&ndash;&gt;
                            <el-menu-item v-for="(subItem,i) in item.subMenus" :key="i" :index="subItem.menuUrl">{{ subItem.menuName }}</el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.menuUrl">
                            <i :class="item.menuIcon"></i>{{ item.menuName }}
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>-->
            <el-menu
                    text-color="#fff"
                    border="none"
                    active-text-color="#ffffff"
                    :default-active="onRoutes"
                    class="el-menu-vertical-demo"
                    unique-opened
                    router>
                <template v-for="(item, indexs) in menuBar">
                    <template v-if="item.subMenus.length>0">
                        <el-submenu :index="'/'+item.menuUrl" :key="indexs">
                            <template slot="title">
                                <i v-if="item.menuName=='前台系统'"><img src="../../../static/img/icon1_1.png" alt="" style="padding-right: 10px"></i>
                                <i v-if="item.menuName=='后台系统'"><img src="../../../static/img/icon1_2.png" alt="" style="padding-right: 10px"></i>
                                <i v-if="item.menuName=='配置'"><img src="../../../static/img/icon1_3.png" alt="" style="padding-right: 10px"></i>
                                <i v-if="item.menuName=='财务'"><img src="../../../static/img/cw.png" alt="" style="padding-right: 10px"></i>
                                <i v-if="item.menuName=='admin'"><img src="../../../static/img/ad.png" alt="" style="padding-right: 10px"></i>
                                <i v-if="item.menuName=='学科'"><img src="../../../static/img/xk.png" alt="" style="padding-right: 10px"></i>
                                <span>{{item.menuName}}</span>
                            </template>
                            <template v-for="(item2, index2) in item.subMenus">
                                <el-submenu :index="'/' + item2.menuUrl" v-if="item2.subMenus.length>0" :key="index2">
                                    <template slot="title"><span class="left-nav-circle">●</span>{{ item2.menuName }}</template>
                                    <el-menu-item v-for="(subItem,i) in item2.subMenus" :key="i" :index="'/' + subItem.menuUrl">{{ subItem.menuName }}</el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="'/'+ item2.menuUrl" :key="index2"><span class="left-nav-circle">●</span>{{ item2.menuName }}</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="'/'+ item.menuUrl" :key="indexs">
                            <i :class="item.menuIcon"></i>
                            <span slot="title">{{ item.menuName }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'admin',
                staff:JSON.parse(window.sessionStorage.getItem("staff")),
                menuBar:JSON.parse(window.sessionStorage.getItem("menuBar")),
            }
        },
        mounted(){
           //console.log(this.menuBar)
        },
        computed:{
            onRoutes(){
                //this.$store.commit("sidebarShowFalse");
                let path = this.$route.path.split('/')[1];
                return '/' + (path === 'studentInfo' ? 'apply' : path);
            },
        }
    }
</script>

<style>
    .user-info{
        margin-top: 20px;
        margin-bottom: 30px;
        color: #262b30;
    }
    .img-warp{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
    }
    .img-warp img{
        width: 100%;
    }
    .name{
        margin-top: 10px;
        text-align: center;
        font-size: 16px;
        height: 24px;
        line-height: 24px;
    }
    .user-type{
        text-align: center;
        font-size: 14px;
        height: 28px;
        line-height: 28px;
    }

    .el-submenu__title{
        height: 42px;
        line-height: 42px;
        color: #ffffff;
    }
    .sidebar{
        display: block;
        position: absolute;
        width: 260px;
        left: 0;
        top: 0px;
        bottom:0;
        background: #262b30;
    }
    .sidebarCon>ul{
        background: #262b30;
        border: none;
    }

    .left-nav-circle {
        padding-right: 5px;
        color: #4c5053;
    }

    .el-submenu.is-opened li.is-active .left-nav-circle {
        color: #fff;
    }
</style>
<style>
    .el-menu-item:focus, .el-menu-item:hover{
        background: none;
    }
    .el-submenu,.el-menu-item{
        background: #262b30;
    }
    .el-menu-vertical-demo{
        color: #ffffff;
    }
    .el-submenu .el-menu{
        padding: 5px 0;
        color: #acaeb1;
    }
    .el-submenu .el-menu>li{
        color: #acaeb1 !important;
    }

    .el-submenu .el-menu,
    .el-menu el-menu--inline{
        background: #262b30;
    }
    .el-submenu .el-menu-item:hover{
        background: #272c30;
        color: #fff !important;
    }

    .el-menu-item, .sidebarCon>.el-menu>.el-submenu>.el-submenu__title{
        height: 42px;
        line-height: 42px;
    }
    .el-submenu .el-menu-item, .el-menu-item, .el-submenu__title{
        height: 30px;
        line-height: 30px;
    }
    .el-submenu__title:hover{
        background: #272c30;
    }
    .el-submenu__title{
        font-size: 14px;
    }
    .el-menu-item{
        font-size: 13px;
    }
    .el-menu.el-menu-vertical-demo>.el-menu-item{
        height: 40px;
        line-height: 40px;
        color: #ffffff;
        background: #227ed3;
        margin: 10px;
        border-radius: 3px;
    }
    body .el-submenu.is-opened>.el-submenu__title{
        background: #227ed3 !important;
        color: #fff !important;
    }
    .el-menu > .el-submenu > .el-menu > .el-submenu.el-submenu.is-opened>.el-submenu__title{
        color: #fff !important;
        background: #262b30 !important;
    }
    .el-submenu.is-opened li.is-active{
        background: #262b30;
        color: #ffffff!important;
    }

    /*一级*/
    .el-menu > .el-submenu > .el-submenu__title {
        padding-left: 20px !important;
    }

    /*二级*/
    .el-menu > .el-submenu > .el-menu > .el-menu-item {
        margin: 0;
    }

    .el-menu > .el-submenu > .el-menu > .el-menu-item,
    .el-menu > .el-submenu > .el-menu > .el-submenu > .el-submenu__title {
        padding-left: 50px !important;
    }

    /*三级*/
    .el-menu > .el-submenu > .el-menu > .el-submenu > .el-submenu__title{
        color: #acaeb1 !important;
    }
    .el-menu > .el-submenu > .el-menu > .el-submenu > .el-menu > .el-menu-item {
        padding-left: 80px !important;
    }
</style>
