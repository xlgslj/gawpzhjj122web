<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;  position: relative;">
    <el-row>
        <el-col :span="24">
            <routeshow :routes="routes" :winh="maph"></routeshow>
        </el-col>
    </el-row>
    <el-tooltip class="item" effect="dark" content="刷新" placement="left" style="position: absolute; top: 50%; right:0px;">
      <el-button type="primary" icon="el-icon-refresh" circle  @click="refresh"></el-button>
    </el-tooltip>
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
        qybh: null
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
    this.getunitroutes(this.initdata.qybh)
  },
  computed: {
    maph () {
      return (window.innerHeight - 91) + 'px'
    }
  },
  watch: {
    'initdata.qybh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          this.getunitroutes(val)
        } 
      },
      deep:true
    }
  },
  methods: {
    refresh () {
      this.getunitroutes(this.initdata.qybh)
    },
    getunitroutes (qybh) {
      this.loading = true
      this.unit = {}
      axiosClient.call('jcxxpt/unit/getunitroutes', 'get', {qybh: qybh})
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
input {
  position: relative;
  position: absolute
}
</style>
