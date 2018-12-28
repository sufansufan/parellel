<template>
  <div class="wrap">
    <div class="logo">
      <img src="../../../static/img/404.png" alt="" />
      <p><span @click="()=>{$router.go(-1)}">返回</span></p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
body {
  font-family: "Helvetica Neue", Helvetica, "microsoft yahei", "arial",
    "STHeiTi", "sans-serif";
}
.wrap {
  width: 1000px;
  margin: 0 auto;
}
.logo {
  width: 430px;
  position: absolute;
  top: 25%;
  left: 35%;
}
p span {
  cursor: pointer;
  display: inline-block;
  color: #eee;
  font-size: 13px;
  margin-left: 30px;
  padding: 5px 10px;
  background: #409eff;
  text-decoration: none;
  -webkit-border-radius: 0.3em;
  -moz-border-radius: 0.3em;
  border-radius: 0.3em;
}
p span:hover {
  color: #fff;
}
</style>
