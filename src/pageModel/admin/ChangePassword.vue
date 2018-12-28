<template>
    <div>
        <el-form :model="ruleForm2"
                 status-icon
                 :rules="rules2"
                 label-position="left"
                 ref="ruleForm2"
                 label-width="80px"
                 class="form-warp">
            <el-form-item label="原密码" prop="oldpwd">
                <el-input type="password" v-model="ruleForm2.oldpwd"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')" size="mini">提交</el-button>
                <el-button type="primary" @click="resetForm('ruleForm2')" size="mini">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    let checkOldPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("原始密码不能为空"));
      }
      callback();
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        oldpwd: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpwd: [{ validator: checkOldPwd, trigger: "blur" }]
      }
    };
  },
  watch:{
    ['ruleForm2.oldpwd']:function(){
      console.log(this.ruleForm2.oldpwd);
    },
    ['ruleForm2.checkPass']:function(){
      console.log(this.ruleForm2.checkPass)
    }
  },
  methods: {
    submitForm(formName) {
      let objData = {
        staffUserName: JSON.parse(window.sessionStorage.getItem("staff"))
          .staffUserName,
        oldpwd: this.ruleForm2.oldpwd,
        newpwd: this.ruleForm2.checkPass,
        source: this.GlobalVal.constants.source, //请求方式   Wechat，Android，PC，IOS
        staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
      };

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(
              this.GlobalVal.httpLink.changePassword,
              JSON.stringify(objData)
            )
            .then(
              res => {
                if (res.data.code === "10000") {
                  this.$message({
                    message: "修改成功",
                    type: "info"
                  });
                  setTimeout(() => {
                    this.$router.push({
                      path: "/login"
                    });
                  }, 1000);
                } else {
                  this.$message({
                    message: "修改失败",
                    type: "error"
                  });
                }
              },
              res => {
                this.$message({
                  message: "请求失败",
                  type: "error"
                });
              }
            );
        } else {
          console.info("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.form-warp {
  width: 400px;
  height: 220px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 40px 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 220px;
}
</style>
