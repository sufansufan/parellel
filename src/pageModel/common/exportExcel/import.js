import Vue from "vue";
import Progress from "../progress.vue";

const showProgress = Vue.extend(Progress);

const importExcel = params => {
  let flag = false;
  const oDiv = document.createElement("div");
  const defaultParams = {
    httpUrl: "" // 必传
  };
  return function(params) {
    params = Object.assign({}, defaultParams, params);
    const { dataList, httpUrl, objData, title } = params;
    const progress = new showProgress({
      el: flag ? ".progress" : oDiv,
      data() {
        return {
          progress: {
            show: false,
            num: 0
          } // 下载进度
        };
      },
      mounted() {
        let loading = this.$Loading("导出中，请稍后...", 6000000000);
        this.progress.show = true;
        var source = new EventSource(
          this.GlobalVal.httpLink.exportLength +
            "?length=length_" +
            httpUrl +
            "&nowLength=nowLength_" +
            httpUrl +
            "&staffId=" +
            JSON.parse(window.sessionStorage.getItem("staff")).staffId
        );
        source.onmessage = e => {
          let dataLength = JSON.parse(e.data);
          console.log(dataLength);
          progress.num = ((dataLength.nowLength / dataLength.length) * 100) | 0;
        };
        /* this.$axios({
          method: "get",
          url: dataLink + "dateLength=" + dateLength + "&",
          responseType: "blob"
        })
          .then(res => {
            this.progress.show = false;
            this.$el.style.display = "none";
            source.close();
            loading.close();
            if (res.data.size <= 134) {
              this.$message.error("导出人数过多!请稍后在试");
              source.close();
              return;
            }
            this.Util.exportExcel(res.data, title);
          })
          .catch(error => {
            console.log(error);
            loading.close();
            source.close();
            this.$el.style.display = "none";
            this.progress.show = false;
          }); */
      }
    });
    if (!flag) {
      document.body.appendChild(progress.$el);
      flag = true;
    }
  };
};

const regImportExcel = () => {
  Vue.prototype.$importExcel = importExcel();
};

export default regImportExcel;
