<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
    <el-row>
        <el-col :span="24">
            <el-table
                :data="drvs"
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
                prop="XM"
                label="姓名"
                width="120"
                show-overflow-tooltip
                >
                </el-table-column>            
                <el-table-column
                prop="SFZMHM"
                label="身份证号码"
                width="150"
                show-overflow-tooltip
                >
                </el-table-column>            
                <el-table-column
                prop="ZJCX"
                label="准驾车型"
                width="100"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="DJZSXXDZ"
                label="住址"
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
                  label="操作"
                  width="60">
                  <template slot-scope="scope">
                    <el-button  type="text"  @click="drvmore(scope.row)" >详情</el-button>
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
        xh: null
      }
    }
  },  
  data: () => {
    return {
      drvs: [],
      page: {
        currentPage: 1,
        size: 10
      },
      total: 0,      
      loading: false
    }
  },
  created () {
    this.getvehdrvs(this.initdata.xh)
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
    'initdata.xh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          this.page.currentPage = 1
          this.page.size = 10
          this.getvehdrvs(val)
        } 
      },
      deep:true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.currentPage = 1
      this.page.size = val
      this.getvehdrvs(this.initdata.xh)
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getvehdrvs(this.initdata.xh)
    },
    drvmore (row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000066762',
        initdata: {
          drv: row,
          source: 'jcxxpt'
        }
      })
    },
    getvehdrvs (xh) {
      this.loading = true
      this.drvs = []
      let param = Object.assign(this.page, {xh: xh}) 
      axiosClient.call('jcxxpt/veh/getdrvs', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.drvs = res.data
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
