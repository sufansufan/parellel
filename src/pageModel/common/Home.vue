<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <!-- <v-breadcrumb></v-breadcrumb>-->
    <div class="content" :class="{choose: $store.state.sidebarShow}" @click="navBtnContent">
      <div class="content-warp">
        <transition name="slide-fade" mode="out-in">
          <keep-alive include="ClassM">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vBreadcrumb from "./Breadcrumb.vue";
export default {
  data() {
    return {
      SSE: null
    };
  },
  components: {
    vHead,
    vSidebar,
    vBreadcrumb
  },
  created() {
    /* this.SSE = new EventSource(
      "http://192.168.1.105/pxxmanage/home/foreground/push/changeCampusTurnClassInfo?staffId=" +
        JSON.parse(window.sessionStorage.getItem("staff")).staffId
    );
    this.SSE.onmessage = event => {
      this.$notify({
        title: h("h2", { style: "color: red" }, "提示"),
        message: h("span", { style: "color: red" }, event.data),
        position: "bottom-right",
        duration: 0
      });
    }; */
  },
  mounted() {
    const self = this;
    if (sessionStorage.getItem("user")) {
      self.$store.commit("setUser", sessionStorage.getItem("user"));
      sessionStorage.removeItem("user");
    }
    window.onbeforeunload = function() {
      if (self.$store.state.user) {
        sessionStorage.setItem("user", self.$store.state.user);
      } else {
        self.$router.push("/login");
      }
    };
  },
  methods: {
    navBtn() {
      if (this.$store.state.sidebarShow) {
        //this.$store.commit("sidebarShowFalse");
      } else {
        //this.$store.commit("sidebarShowTrue");
      }
    },
    navBtnContent() {
      //this.$store.commit("sidebarShowFalse");
    }
  },
  beforeDestroy() {
    /*  this.SSE.close(); */
  }
};
</script>

<style>
.content {
  background: #efefef;
  -webkit-transition: transform 0.5s;
  -moz-transition: transform 0.5s;
  -ms-transition: transform 0.5s;
  -o-transition: transform 0.5s;
  transition: transform 0.5s;
}
.content-warp {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  background: #efefef;
}
.content.choose {
  -webkit-transform: translate(250px, 0);
  -moz-transform: translate(250px, 0);
  -ms-transform: translate(250px, 0);
  -o-transform: translate(250px, 0);
  transform: translate(250px, 0);
}
/*@media screen and (max-width: 768px) {
        .content{
            left: 0;
        }
        .nav-btn{
            display: block;
        }
    }*/
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(30px);
  opacity: 0;
}
</style>
