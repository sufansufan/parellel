<template>
    <div class="otherCharge-box">
        <Order-Pay isqueryCharge="isqueryCharge"></Order-Pay>
    </div>
</template>
<script>
import OrderPay from "../setting/OrderPay";
export default {
  components:{
    OrderPay
  },
  data() {
    return{
    }
  },
  computed:{
  },
  methods:{
    //获取数据
  }
}
</script>
