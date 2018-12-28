<template>
    <div id="app">
        <router-view></router-view>
        <input type="radio" id="focusFix" />
    </div>
</template>
<style>
@import '../static/css/main.css';
@import '../static/css/color-dark.css'; /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
/*引入字体图标库，这个库是自己的*/
@import '../static/font/iconfont.css';
#focusFix {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
}
</style>
<style lang="stylus">
@import '../static/css/theme-tiantai/theme.styl'; // 天台主题
@import '../static/css/theme-boli/theme.styl'; // 玻璃主题
</style>
