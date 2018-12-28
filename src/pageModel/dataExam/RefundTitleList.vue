<template>
  <div class="refund-title-list">
    <div class="handle-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.handle-box > ul {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
.handle-box > ul > li {
  padding-left: 25px;
  margin-right: 10px;
  margin-bottom: 10px;
  flex: 1;
  min-width: 110px;
  height: 80px;
  background: #ffffff;
  display: flex;
  position: relative;
}
.handle-box > ul > li::before {
  position: absolute;
  top: 0;
  right: -10px;
  content: "";
  border-top: 40px solid transparent;
  border-left: 10px solid #fff;
  border-bottom: 40px solid transparent;
}
.handle-box > ul > li::after {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  border-top: 40px solid transparent;
  border-left: 10px solid #efefef;
  border-bottom: 40px solid transparent;
}
.handle-box > ul > li:first-child::after {
  border: 0;
}
.handle-box > ul > li:last-child::before {
  border: 0;
}
.handle-box > ul > li p {
  font-size: 16px;
  font-weight: 500;
}
.handle-box > ul > li span {
  text-align: center;
  line-height: 13px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e8f2fb no-repeat;
  background-size: 100% 100%;
  display: block;
  margin-top: 20px;
  color: #227ed3;
}
.handle-box > ul > li p:nth-of-type(1) {
  margin-left: 10px;
  margin-top: 15px;
  color: #999999;
  margin-bottom: 5px;
}
.handle-box > ul > li p:nth-of-type(2) {
  font-size: 16px;
  font-weight: 700;
  margin-left: -14px;
}
</style>
