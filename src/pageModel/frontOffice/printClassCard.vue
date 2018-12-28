<template>
    <div class="printClassCard-box">
        <div id="box">
            <div class="s_center">
                <div class="s_centerLeft">
                <div class="s_LeftTop">
                    <vue-q-art :qr-value="printInfo.student_no" class="s_TowCode"></vue-q-art>
                    <div class="s_essential" style="margin-top: 75px;">
                    <span class="details">
                        <i>上课时间</i>
                        <p>{{printInfo.time_name}}</p>
                    </span>
                    <span class="details">
                        <i>任课老师</i>
                        <p>{{printInfo.teacher_name}}</p>
                    </span>
                    <span class="details">
                        <i>听课证编号</i>
                        <p>{{printInfo.orderno}}</p>
                    </span>
                    </div>
                </div>
                <div class="s_LeftRight">
                    <span class="detailsLeft">
                    <i>姓名</i>
                    <p>{{printInfo.student_name}}</p>
                    </span>
                    <span class="detailsLeft">
                    <i>学员号</i>
                    <p>{{printInfo.student_no}}</p>
                    </span>
                    <span class="detailsLeft">
                    <i>校区／教室／实付金额</i>
                    <p>{{printInfo.campus_name}} ／{{printInfo.classroom_name}} ／ ￥{{printInfo.real_payment || 0}}元</p>
                    </span>
                    <span class="detailsLeft">
                    <i>日期</i>
                    <p>{{printInfo.start_date.replace(/-/g, '/')}}-{{printInfo.end_date.replace(/-/g, '/')}}</p>
                    </span>
                    <span class="detailsLeft">
                    <i>班级</i>
                    <p>{{printInfo.class_name}}</p>
                    </span>
                </div>
                </div>
                <div class="s_centerRight">
                <div class="s_Leftzoom" style="margin-top:50px ;">
                    <span class="detailsLeft shrink">
                    <i>姓名／学员号</i>
                    <p>{{printInfo.student_name}}／{{printInfo.student_no}}</p>
                    </span>
                    <span class="detailsLeft shrink">
                    <i>校区／教室</i>
                    <p>{{printInfo.campus_name}}　{{printInfo.classroom_name}}</p>
                    </span>
                    <span class="detailsLeft shrink">
                    <i>日期</i>
                    <p>{{printInfo.start_date.replace(/-/g, '/')}}-{{printInfo.end_date.replace(/-/g, '/')}}</p>
                    </span>
                    <span class="detailsLeft shrink">
                    <i>班级</i>
                    <p>{{printInfo.class_name}}</p>
                    </span>
                </div>
                <div class="s_Flortzoom">
                    <!-- <img src="img/听课证A4_画板 1 副本 2.png" alt=""  class="s_TowCode" style="float: right;width: 64px;margin-bottom:10px; ;"/> -->
                    <vue-q-art :qr-value="printInfo.student_no" style="float: right;width: 64px;margin-bottom:10px;"></vue-q-art>
                    <div class="s_essential" style="float: left;width: 100%;">
                    <span class="details shrink">
                        <i>上课时间</i>
                        <p>{{printInfo.time_name}}</p>
                    </span>
                    <span class="details shrink">
                        <i>任课老师</i>
                        <p>{{printInfo.teacher_name}}</p>
                    </span>
                    <span class="details shrink">
                        <i>听课证编号</i>
                        <p>{{printInfo.orderno}}</p>
                    </span>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <el-button size="mini" type="primary" style="width: 200px;float: right;margin-right: 70px;margin-top: 40px" @click="$emit('cencelPrint')">取消</el-button>
        <el-button size="mini" type="primary" style="width: 200px;float: right;margin-right: 70px;margin-top: 40px" @click="doPrint">打印</el-button>
    </div>
</template>
<script>
import VueQArt from "../QRCode/QRCode.vue";
    export default {
        props:["printInfo"],
        components:{
            VueQArt,
        },
        data(){
            return{

            }
        },
        methods:{
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
            },
        }
    }
</script>

<style scoped>
.printClassCard-box{
    overflow-y: auto;
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