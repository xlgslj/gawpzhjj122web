<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
    <el-row style="margin-top:5px;">
        <el-col :span="24">
          <el-form :inline="true" :model="queryTmp" label-width="8.66rem" label-suffix=":">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="身份证号码">
                        <el-input v-model="queryTmp.SFZMHM" placeholder="身份证号码" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input v-model="queryTmp.XM" placeholder="姓名" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item >
                      <el-button type="primary" @click="doQuery"  icon="el-icon-search">筛选</el-button>                    
                    </el-form-item>
                </el-col>
            </el-row>
          </el-form>
        </el-col>
    </el-row>
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
                prop="DABH"
                label="档案编号"
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
                </el-table-column>>             
                <el-table-column
                prop="CCLZRQ"
                label="初次领证日期"
                width="150"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{dateformat(scope.row.CCLZRQ, 'yyyy-MM-dd')}}
                  </template>
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
                layout="total, sizes, prev, pager, next, jumper, slot"
                :total="total">
            </el-pagination>         
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'default',
  data: () => {
    return {
      queryTmp: {},
      drvs: [],
      total: 0,
      page: {
        currentPage: 1,
        size: 10
      },
      loading: false
    }
  },
  computed: {
    tabh () {
      return  window.innerHeight - 91 - 60 -32
    } 
  },
  mounted () {
    this.onQuery()
  },
  methods: {
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
    handleSizeChange (val) {
      this.page.currentPage = 1
      this.page.size = val
      this.onQuery()
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.onQuery()
    },
    doQuery () {
      this.page.currentPage = 1
      this.page.size = 10 
      this.onQuery()
    },
    onQuery () {   
      let w1 = []
      Object.keys(this.queryTmp).forEach(k => {
          if (this.queryTmp[k]) {
            w1.push(k + ' like \'%' + this.queryTmp[k] +'%\'') 
          }
      })
      let where = { where: w1.join(' and ')}
      this.loading = true
      this.units = []
      this.$axiosClient.call('jcxxpt/drv/getdrvlist', 'get', {...this.page, ...where})
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
