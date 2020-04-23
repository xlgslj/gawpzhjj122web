<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
    <el-row>
        <el-col :span="24">
            <routeshow :routes="routes" :winh="maph"></routeshow>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import * as axiosClient from '../../../../common/axiosClient'
import routeshow from '../../components/routeshow'
export default {
  name: 'default',
  components: {
    routeshow: routeshow
  },
  props: {
    // 此处一定要用value,实现v-model
    initdata: {
      type: Object,
      default: () => {
        xh: null
      }
    }
  },  
  data: () => {
    return {
      routes: [],
      loading: false
    }
  },
  created () {
    this.getvehroutes(this.initdata.xh)
  },
  computed: {
    maph () {
      return (window.innerHeight - 91) + 'px'
    }
  },
  watch: {
    'initdata.xh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          this.getvehroutes(val)
        } 
      },
      deep:true
    }
  },
  methods: {
    getvehroutes (xh) {
      this.loading = true
      this.unit = {}
      axiosClient.call('JCXXPTBASEVEHROUTESOFVEHS', 'get', {where: "xh='" + xh + "'"})
        .then((res) => {
          if (res.status === 1) {
            this.routes = res.data
          } else {
            this.$message.error(res.msg)
          }
          this.loading = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>

</style>
