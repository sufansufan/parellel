<template>
  <div class="login-back">
    <div class="login-wrap">
      <div class="ms-title">
        <img src="../../../static/img/logoBack.png" alt="">
        <div class="ms-login">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="用户名" id="input" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password" style="padding-top:10px">
              <el-input type="password" clearable placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <!-- <p style="font-size:12px;line-height:10px;color:#999; text-align: right">提示 : 如果忘记密码，请点击<a href="javascript:void(0)">忘记密码</a> </p> -->
            <div class="login-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>

    </div>
    <iframe src="static/demo.html" frameborder="0" width="100%" height="1500px" style="overflow: hidden"></iframe>
  </div>

</template>
<script>
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isLogin");
    this.$store.commit("setUser", {});
    //TODO change 1312321
    document.querySelector("input").focus();
  },
  methods: {
    submitForm(formName) {
      const self = this;
      const objData = {
        userName: self.ruleForm.username,
        password: self.ruleForm.password
      };

      //没有登陆名直接登录
      /*sessionStorage.setItem("isLogin",true); //设置登陆状态位true'
                this.$store.commit('isLoginTrue');      //设置登陆状态为 true
                let redirect = decodeURIComponent(this.$route.query.redirect || '/1');//如果是手动输入的地址，则登陆后跳回到这个页面
                self.$router.push({
                    path:redirect
                });*/

      //需要验证
      self.$refs[formName].validate(valid => {
        //验证 element的表单验证
        if (valid) {
          this.$axios
            .post(this.GlobalVal.httpLink.login, JSON.stringify(objData))
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message({
                    message: "登陆成功了",
                    type: "warning"
                  });
                  if (res.data.staff) {
                    //存储数据
                    //self.$store.commit("setUser",res.data.staff);
                    window.sessionStorage.setItem(
                      "staff",
                      JSON.stringify(res.data.staff)
                    );
                  }
                  if (res.data.menuBar.length) {
                    //self.$store.commit("setMenuBar",res.data.menuBar);
                    window.sessionStorage.setItem(
                      "menuBar",
                      JSON.stringify(res.data.menuBar)
                    );
                    let code = "";
                    res.data.menuBar.forEach((item, index) => {
                      if (item.subMenus.length) {
                        item.subMenus.forEach((val, index) => {
                          if (val.button_ids) {
                            code += val.button_ids;
                          }
                          if (val.subMenus.length) {
                            val.subMenus.forEach((cost, index) => {
                              if (cost.button_ids) {
                                code += cost.button_ids;
                              }
                            });
                          }
                        });
                      }
                    });
                    // let code = res.data.menuBar[0].subMenus[0].button_ids + res.data.menuBar[0].subMenus[2].button_ids;
                    if (code) {
                      this.$store.commit("setAdminCode", code);
                    }
                  }
                  this.Util.queryAreaNav(self, -1, function() {});
                  window.sessionStorage.setItem("isLogin", true); //设置登陆状态位true'
                  this.$store.commit("isLoginTrue"); //设置登陆状态为 true
                  let redirect = decodeURIComponent(
                    this.$route.query.redirect || "/apply"
                  ); //如果是手动输入的地址，则登陆后跳回到这个页面
                  self.$router.push({
                    path: redirect
                  });
                } else {
                  if (res.data.errmsg) {
                    this.$message({
                      //message: res.data.errmsg,
                      message: res.data.errmsg,
                      type: "warning"
                    });
                  } else {
                    this.$message({
                      //message: res.data.errmsg,
                      message: "未知错误",
                      type: "warning"
                    });
                  }
                  return false;
                }
              },
              //回调的第二个参数
              res => {
                //失败
                this.$message({
                  message: "请求失败",
                  type: "warning"
                });
              }
            );
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-back {
  position: relative;
}
.login-wrap {
  width: 410px;
  height: 520px;
  background: #ffffff;
  box-shadow: 0px 0px 10px 10px #edf0f3;
  position: absolute;
  top: 180px;
  right: 210px;
  border-radius: 8px;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: 80px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-top: 40px;
  background-color: #51a6f6;
  border-color: #51a6f6;
}
</style>
