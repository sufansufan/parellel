export default{
    install(Vue){
        Vue.prototype.ErrorCode = {
            requestOverCode :function (code) {
                if(code ==="20001" || code ==="20002" || code ==="20003") {
                    this.$message({
                        type: 'warn',
                        message: 'Session已超时,请重新登录!'
                    });
                    this.$router.push({
                        path: "/"
                    });
                }
            },
        }
    }
}