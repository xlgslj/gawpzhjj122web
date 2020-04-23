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
                    <el-form-item label="组织机构代码">
                        <el-input v-model="queryTmp.ZZJGDM" placeholder="组织机构代码" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="单位名称">
                        <el-input v-model="queryTmp.DWMC" placeholder="单位名称" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="重点对象类型">
                        <el-select v-model="queryTmp.ZDDXLX" placeholder="请选择"  clearable>
                            <el-option
                            v-for="item in codefilter('dwlx')"
                            :key="item.CODE"
                            :label="item.CODE+': '+ item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="营运类型">
                        <el-select v-model="queryTmp.DWXZ" placeholder="请选择"  clearable>
                            <el-option
                            v-for="item in codefilter('vehyylx')"
                            :key="item.CODE"
                            :label="item.CODE+': '+ item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                  &nbsp;
                </el-col>
                <el-col :span="6">
                    <el-form-item >
                      <el-button type="primary" @click="doQuery"  icon="el-icon-search">筛选</el-button>
                      <el-button type="primary" plain @click="add"  icon="el-icon-circle-plus-outline">新增</el-button>                      
                    </el-form-item>
                </el-col>
            </el-row>
          </el-form>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-table
                :data="units"
                :show-header="true"                   
                :height="tabh"
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
                prop="DWMC"
                label="单位名称"
                width="300"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop=""
                label="重点对象类型"
                width="150"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{code2cn(scope.row.ZDDXLX, 'dwlx')}}
                  </template>                  
                </el-table-column>
                <el-table-column
                prop=""
                label="坐标"
                width="80"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span :style="{color: (scope.row.DTZB ? 'green' : 'red')}">{{scope.row.DTZB ? '已采集' : '未采集'}}</span>
                  </template>                  
                </el-table-column>
                <el-table-column
                prop="VEHCOUNT"
                label="车辆数"
                width="80"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="DRVCOUNT"
                label="驾驶人数"
                width="100"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="DWDD"
                label="单位地址"
                width="300"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop=""
                label="经营负责人"
                width="150"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{(scope.row.GLLXR || '')}}/{{(scope.row.GLSJHM || '')}}
                  </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="安全负责人"
                width="150"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{(scope.row.AQLXR || '')}}/{{(scope.row.AQSJHM || '')}}
                  </template>
                </el-table-column>
                <el-table-column
                prop="JYMS"
                label="企业概况"
                show-overflow-tooltip
                  width="300">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button  type="text" size="small"  @click="unitmore(scope.row)" >详情</el-button>
                    <el-button  type="text" size="small"  @click="unitedit(scope.row)" >编辑</el-button>
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
  data: () => {
    return {
      queryTmp: {},
      units: [],
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
      return  window.innerHeight - 91 - 146
    } 
  },
  mounted () {
    this.onQuery()
  },
  methods: {
    add () {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000066246',
        initdata: {
          qybh: 'NewQybh'
        }
      })
    },
    unitmore (row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000065318',
        initdata: {
          qybh: row.QYBH
        }
      })
    },
    unitedit (row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000066697',
        initdata: {
          qybh: row.QYBH
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
            if (k === 'ZDDXLX' || k === 'DWXZ') {
              w1.push(k + '=\'' + this.queryTmp[k] +'\'')
            } else {
              w1.push(k + ' like \'%' + this.queryTmp[k] +'%\'')               
            }
          }
      })
      let where = { where: w1.join(' and ')}
      this.loading = true
      this.units = []
      this.$axiosClient.call('jcxxpt/unit/getunitlist', 'get', Object.assign({}, this.page, where))
        .then((res) => {
          if (res.status === 1) {
            this.units = res.data
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
