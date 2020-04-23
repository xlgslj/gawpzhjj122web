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
                width="280">
                <template slot-scope="scope">
                  <i class="el-icon-s-unfold"></i>
                  <span style="margin-left: 10px">{{ scope.row.QD + (scope.row.TJ1 ? (' -> ' + scope.row.TJ1) : '' ) + (scope.row.TJ2 ? (' -> ' + scope.row.TJ2) : '' ) + (scope.row.TJ3 ? (' -> ' + scope.row.TJ3) : '' ) + ' -> ' +scope.row.ZD}}</span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                width="120"
                label="操作">
                <template slot-scope="scope">
                  <el-button  type="text" size="small"  @click="routeedit(scope.row)" >编辑</el-button>
                  <el-button  type="text" size="small"  @click="routedel(scope.row)" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-popover
                placement="right-end"
                :width="winw*1"
                v-model="vehrouteaddoredit"
                trigger="manual">
                <vehrouteadd v-if="vehrouteadd" :winh="winh*1 + 'px'" :vehxh="initdata.xh" :pcom="'jcxxpt-veh-veheditroutes'"></vehrouteadd>
                <vehrouteedit v-if="vehrouteedit" :routein="routein" :winh="winh*1 + 'px'" :vehxh="initdata.xh" :pcom="'jcxxpt-veh-veheditroutes'"></vehrouteedit>
                <el-button type="text"  slot="reference"  @click="openvehrouteadd" :disabled="initdata.xh === 'NewXh'">新增</el-button>
              </el-popover>                                                
            </el-col>
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
      vehrouteadd: false,
      vehrouteedit: false,
      loading: false
    }
  },
  created () {
    this.getvehroutes(this.initdata.xh)
  },
  mounted () {
    this.$EventBus.$on('jcxxpt-veh-veheditroutes', this.Ehandle)
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
    },
    vehrouteaddoredit: {
      get () {
       return this.vehrouteadd || this.vehrouteedit
      },
      set (v) {
        return
      }
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
    openvehrouteadd () {
      this.loading = true
      this.vehrouteadd = true
    },
    routeedit (row) {
     this.loading = true
     this.vehrouteedit = true
     this.routein = row
    },
    routedel (row) {
      this.$confirm('是否继续删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axiosClient.call('jcxxpt/veh/routedel', 'post', row)
          .then((res) => {
            if (res.status === 1) {
              this.$message('删除成功')
              let index = this.routes.findIndex(d => d.XH === row.XH)
              if (index >= 0) {
                this.routes.splice(index, 1) // 对于数组元素直接用 formdata1=source 将不能触发视图刷新
              }
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消')
      })
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
    },
    Ehandle (res) {
      switch(res.key) {
        case 'vehrouteaddclose' :
          this.vehrouteadd = false
          this.loading = false
          break;
        case 'routeadd' :
          this.vehrouteadd = false
          this.loading = false
          this.routes.push(res.route)
          this.$refs.routetable.toggleRowSelection(res.route)
          break;
        case 'routeedit' :
          this.vehrouteedit = false
          this.loading = false
          let i = this.routes.findIndex(d => d.XH === res.route.XH)
          this.routes.splice(i, 1, res.route)
          this.$refs.routetable.toggleRowSelection(res.route)
          break;
        case 'vehrouteeditclose' :
          this.vehrouteedit = false
          this.loading = false
          break;
        default:
          break;
      }
    }
  },
  beforeDestroy () {
    console.log('事件jcxxpt-veh-veheditroutes被移出')
    this.$EventBus.$off('jcxxpt-veh-veheditroutes', this.Ehandle)
  }
}
</script>
<style scoped>

</style>
