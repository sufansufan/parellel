<template>
  <div class="header">
    <div class="breadcrumb">
      <div class="bread" v-show="!$route.path.includes('index')">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;line-height: 54px;">
          <el-breadcrumb-item v-for="(item, index) in $store.state.breadcrumbs" :key="index">
            {{item}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

    </div>
    <div class="logout">
      <img src="../../../static/img/1.png" alt="">
      <el-dropdown size="small" type="primary" @command="handleCommand" trigger="click">
        <div class="el-dropdown-link" style="float: right;margin-top: -22px;cursor: pointer">
          <div>
            <p class="staff-name">{{staff.staffName}}</p>
            <p class="staff-campus">{{staff.organName}}</p>
            <p class="staff-role">{{staff.roleName}}</p>
          </div>
          <i class="el-icon--right el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changeSkin">
            <span>换肤</span>
          </el-dropdown-item>
          <el-dropdown-item command="rePwd">
            <span>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <span>退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Dialog ref="dialog" titbg title="选择皮肤">
      <div class="change-skin">
        <span class="default" @click="setSkin">
          <p>默认</p>
        </span>
        <span class="tiantai" @click="setSkin">
          <p>天台</p>
        </span>
      </div>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "../common/Dialog";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      name: "admin",
      staff: JSON.parse(window.sessionStorage.getItem("staff"))
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    }
  },
  methods: {
    // 设置皮肤
    setSkin(e) {
      document.querySelector("html").className = e.target.classList.value;
    },
    handleCommand(command) {
      if (command === "logout") {
        let objData = {
          staffUserName: JSON.parse(window.sessionStorage.getItem("staff"))
            .staffUserName,
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId
        };
        console.log("这是退出登录请求的参数", objData);
        this.$store.commit("isLoginFalse");
        localStorage.removeItem("ms_username");
        sessionStorage.removeItem("isLogin");
        this.$router.push("/login");
        this.$axios
          .post(this.GlobalVal.httpLink.logout, JSON.stringify(objData))
          .then(
            res => {
              if (res.data.code === "10000") {
                localStorage.clear();
                sessionStorage.clear();
              } else {
                console.error(res);
                this.$message({
                  type: "error",
                  message: res.data.errmsg
                });
              }
            },
            res => {
              this.$message("请求失败");
            }
          );
      } else if (command === "changeSkin") {
        this.$refs.dialog.dialogVisible = true;
      } else {
        this.$router.push("/changepassword");
      }
    }
  }
};
</script>
<style lang="stylus">
.change-skin {
  display: flex;

  >span {
    width: 200px;
    height: 160px;
    border-radius: 15px;
    box-shadow: 0 0 10px #444;
    position: relative;
    transition: all 0.3s;
    cursor: pointer;
    margin: 0 20px 40px 0;

    >p {
      position: absolute;
      bottom: -26px;
      text-align: center;
      color: #444;
      width: 100%;
    }

    &:hover {
      box-shadow: 0 0 20px #f90;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      height: 160px;
      border-radius: 15px;
    }
  }

  .tiantai::after {
    background: url('../../../static/css/theme-tiantai/left-top.gif') no-repeat;
    background-size: cover;
  }

  .default::after {
    background: url('../../../static/img/default.jpg') no-repeat;
    background-size: cover;
  }
}

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 74px;
  font-size: 22px;
  font-weight: bold;
  line-height: 74px;
  color: #061631;
  background: #ffffff;
}

.header .logo {
  float: left;
  height: 74px;
  width: 260px;
  overflow: hidden;
  text-align: center;
  background: #283142;
}

.bread {
  display: inline-block;
}

.logout {
  position: absolute;
  top: 0;
  right: 20px;
  width: auto;
  height: 74px;
  color: #0e1744;
  font-size: 14px;
  z-index: 5;
  line-height: 0px;
  display: flex;
  overflow: hidden;
}

.logout > img {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  display: inline;
  margin-top: 20px;
}

@media screen and (max-width: 768px) {
  .logo {
    display: none;
  }
}

.breadcrumb {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 24px;
  padding: 0 0 0 280px;
  z-index: 3;
  height: 75px;
}

.breadcrumb > div {
  background: #ffffff;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
}

.logout .el-icon--right {
  line-height: 120px;
}
</style>
<style scoped>
.staff-name {
  margin-top: 40px;
  font-weight: bold;
}
.staff-campus {
  line-height: 40px;
  font-size: 12px;
  color: #b8b6b6;
  font-weight: normal;
}
.staff-role {
  line-height: 2px;
  font-size: 12px;
  color: #b8b6b6;
  font-weight: normal;
}
.el-dropdown-link {
  display: flex;
}
</style>
