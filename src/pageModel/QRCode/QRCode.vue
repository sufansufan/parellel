<template>
    <vue-q-art :options="config" class="qrcode"></vue-q-art>
</template>
<style scope>
.qrcode {
  position: fixed;
}
</style>
<script>
import VueQArt from "qrcanvas-vue";
export default {
  props: ["qrValue"],
  data() {
    return {
      config: {
        data: this.qrValue,
        size: 50
      }
    };
  },
  mounted() {
    setTimeout(() => {
      let canvas = document.querySelector("canvas");
      let qrImg = this.convertCanvasToImage(canvas);
      canvas.parentNode.replaceChild(qrImg, canvas);
    }, 500);
  },
  methods: {
    convertCanvasToImage: function(canvas) {
      //新Image对象，可以理解为DOM
      var image = new Image();
      // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
      // 指定格式 PNG
      image.src = canvas.toDataURL("image/png");
      image.className = "qr-code-img";
      return image;
    }
  },
  components: { VueQArt }
};
</script>
