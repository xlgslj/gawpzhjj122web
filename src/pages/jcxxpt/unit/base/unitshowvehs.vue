<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
    <el-row>
        <el-col :span="24">
            <el-table
                :data="vehs"
                :show-header="true"                   
                border
                style="width: 100%">
                <el-table-column
                prop="ROWXH"
                label="No."
                width="60"
                show-overflow-tooltip
                >   
                </el-table-column>            
                <el-table-column
                prop="HPHM"
                label="号牌号码"
                width="120"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="HPZL"
                label="号牌种类"
                width="150"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{code2cn(scope.row.HPZL, 'hpzl')}}
                  </template>                  
                </el-table-column>
                <el-table-column
                prop="CLLX"
                label="车辆类型"
                width="150"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{code2cn(scope.row.CLLX, 'cllx')}}
                  </template>
                </el-table-column>
                <el-table-column
                prop="SYXZ"
                label="使用性质"
                width="150"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{code2cn(scope.row.SYXZ, 'syxz')}}
                  </template>
                </el-table-column>
                <el-table-column
                prop="SYR"
                label="机动车所有人"
                width="400"
                show-overflow-tooltip
                > 
                </el-table-column>
                <el-table-column
                prop="ZSXXDZ"
                label="住所详细地址"
                width="400"
                show-overflow-tooltip                        
                >   
                </el-table-column>                         
                <el-table-column
                prop="DH"
                label="电话"
                width="200"
                show-overflow-tooltip                 
                >
                  <template slot-scope="scope">
                    {{(scope.row.LXDH||'') + '/' + (scope.row.SJHM||'')}}
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="60">
                  <template slot-scope="scope">
                    <el-button  type="text" size="small"  @click="vehmore(scope.row)" >详情</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>            
        </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import * as axiosClient from '../../../../common/axiosClient'
export default {
  name: 'default',
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
      vehs: [],
      page: {
        currentPage: 1,
        size: 10
      },
      total: 0,      
      loading: false
    }
  },
  created () {
    this.getunitvehs(this.initdata.qybh)
  },
  computed: {
    ...mapState({
      _code: '_code',
    }),
    code2cn () {
      return function(code, lx) {
        let i = this._code.findIndex(d => d.LX === lx && d.CODE === code)
        if (i > -1) {
          return code + ':' + this._code[i].VAL
        } else {
          return code
        }
      }
    }
  },
  watch: {
    'initdata.qybh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          this.page.currentPage = 1
          this.page.size = 10
          this.getunitvehs(val)
        } 
      },
      deep:true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.currentPage = 1
      this.page.size = val
      this.getunitvehs(this.initdata.qybh)
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getunitvehs(this.initdata.qybh)
    },
    vehmore(row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000065602',
        initdata: {
          xh: row.XH,
          hphm: row.HPHM,
          hpzl: row.HPZL
        }
      })
    },
    getunitvehs (qybh) {
      this.loading = true
      this.vehs = []
      let param = Object.assign(this.page, {qybh: qybh}) 
      axiosClient.call('jcxxpt/unit/getunitvehs', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.vehs = res.data
            this.total = res.total
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
