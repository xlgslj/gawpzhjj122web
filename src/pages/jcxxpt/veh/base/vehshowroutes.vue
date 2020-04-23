<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
    <el-row>
        <el-col :span="10">
          <el-row>
            <el-table
              ref="routetable"
              :data="routes"
              :height="maph"
              border
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>                            
              <el-table-column
                prop="NAME"
                label="名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="QD"
                label="途经"
                width="350">
                <template slot-scope="scope">
                  <i class="el-icon-s-unfold"></i>
                  <span style="margin-left: 10px">{{ scope.row.QD + (scope.row.TJ1 ? (' -> ' + scope.row.TJ1) : '' ) + (scope.row.TJ2 ? (' -> ' + scope.row.TJ2) : '' ) + (scope.row.TJ3 ? (' -> ' + scope.row.TJ3) : '' ) + ' -> ' +scope.row.ZD}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-col>
        <el-col :span="14">
            <routeshow  :winh="maph" style="margin-left:5px;" :routes="routeSelection"></routeshow>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import routeshow from '../../components/routeshow'
import vehrouteadd from './vehrouteadd'
import vehrouteedit from './vehrouteedit'
export default {
  name: 'default',
  components: {
    routeshow: routeshow,
    vehrouteadd: vehrouteadd,
    vehrouteedit: vehrouteedit
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
      routeSelection: [],
      loading: false
    }
  },
  created () {
    this.getvehroutes(this.initdata.xh)
  },
  mounted () {
  },
  computed: {
    maph () {
      return (window.innerHeight - 180) + 'px'
    },
    winw () {
      return window.innerWidth
    },
    winh () {
      return window.innerHeight
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
    handleSelectionChange(val) {
      this.routeSelection = val;
    },
    getvehroutes (xh) {
      this.loading = true
      this.unit = {}
      this.$axiosClient.call('jcxxpt/veh/routesofvehs', 'get', {where: "xh='" + xh + "'"})
        .then((res) => {
          if (res.status === 1) {
            this.routes = res.data
            // 线路默认全选
            this.$refs.routetable.toggleAllSelection()            
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
