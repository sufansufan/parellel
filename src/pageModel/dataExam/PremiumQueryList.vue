<template>
    <div>

    </div>
</template>

<script>
export default {
  methods: {
    getData() {
      let objData = {
          source: this.GlobalVal.constants.source,
          staffId: JSON.parse(window.sessionStorage.getItem("staff")).staffId,
      }
      this.$axios
        .post(
          this.GlobalVal.httpLink.queryStudentBusiness,
          JSON.stringify(objData)
        )
        .then(
          res => {
            if (res.data.code === "10000") {
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
    }
  }
};
</script>

<style scoped>

</style>
