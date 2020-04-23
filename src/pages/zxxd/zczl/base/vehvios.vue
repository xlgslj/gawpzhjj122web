<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
    <el-row>
        <el-col :span="24">
            <el-table
                :data="vios"
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
                  prop="HPZL"
                  label="号牌种类"
                  width="110"
                show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{code2cn(scope.row.HPZL, 'hpzl')}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="HPHM"
                  label="号牌号码"
                  width="110"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="DSR"
                  label="当事人"
                  width="100"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="WFXW"
                  label="违法行为"
                  width="90"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="WFSJ"
                  label="违法时间"
                  width="170"
                show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{dateformat(scope.row.WFSJ, 'yyyy-MM-dd HH:mm:ss')}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="WFDZ"
                  label="违法地点"
                  width="300"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="ZQMJ"
                  label="执勤民警"
                  width="90"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="CLJGMC"
                  label="处理机关"
                  width="300"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="DRSJ"
                  label="导入时间"
                  width="170"
                show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{dateformat(scope.row.DRSJ, 'yyyy-MM-dd HH:mm:ss')}}
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
      vios: [],
      page: {
        currentPage: 1,
        size: 10
      },
      total: 0,      
      loading: false
    }
  },
  created () {
    this.getvehvios(this.initdata)
  },
  computed: {
  },
  watch: {
    initdata:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          this.page.currentPage = 1
          this.page.size = 10
          this.getvehvios(val)
        } 
      },
      deep:true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.currentPage = 1
      this.page.size = val
      this.getvehvios(this.initdata)
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getvehvios(this.initdata)
    },
    getvehvios (params) {
      this.loading = true
      this.vios = []
      let param = Object.assign({}, this.page, params) 
      this.$axiosClient.call('ZXXDZCZLBASEVIOGETVEHVIOS', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.vios = res.data
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
