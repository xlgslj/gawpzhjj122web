<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;  position: relative;">
    <el-row>
        <el-col :span="24">
            <postitionshow :positinos="unit.DTZB" :name="unit.DWMC" :winh="maph"></postitionshow>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import postitionshow from '../../components/positionshow'
export default {
  name: 'default',
  components: {
    postitionshow: postitionshow
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
      unit: {},
      loading: false
    }
  },
  created () {
    this.getunit(this.initdata.qybh)
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
          this.getunit(val)
        } 
      },
      deep:true
    }
  },
  methods: {
    getunit (qybh) {
      this.loading = true
      this.unit = {}
      this.$axiosClient.call('jcxxpt/unit/getunit', 'get', {qybh: qybh})
        .then((res) => {
          if (res.status === 1) {
            this.unit = res.data
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
