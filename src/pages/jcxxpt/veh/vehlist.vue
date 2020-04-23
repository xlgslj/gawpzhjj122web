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
                    <el-form-item label="号牌种类">
                        <el-select v-model="queryTmp.HPZL" placeholder="请选择"  clearable>
                            <el-option
                            v-for="item in codefilter('hpzl')"
                            :key="item.CODE"
                            :label="item.CODE+': '+ item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="号牌号码">
                        <el-input v-model="queryTmp.HPHM" placeholder="号牌号码" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车辆类型">
                        <el-select v-model="queryTmp.ZDDXLX" placeholder="请选择"  clearable>
                            <el-option
                            v-for="item in codefilter('cllx')"
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
                            v-for="item in codefilter('syxz')"
                            :key="item.CODE"
                            :label="item.CODE+': '+ item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="单位名称">
                        <el-input v-model="queryTmp.DWMC" placeholder="单位名称" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
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
                :data="vehs"
                :show-header="true"                   
                :height="tabh"
                border
                style="width: 100%">
                <el-table-column
                prop="ROWXH"
                label="NO"
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
                prop="DWMC"
                label="关联单位"
                width="300"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-button type="text" @click="unitmore(scope.row)">{{scope.row.DWMC}}</el-button>
                  </template> 
                </el-table-column>
                <el-table-column
                prop="SYR"
                label="机动车所有人"
                width="300"
                show-overflow-tooltip
                > 
                </el-table-column>
                <el-table-column
                prop="ZSXXDZ"
                label="住所详细地址"
                width="300"
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
                  width="120">
                  <template slot-scope="scope">
                    <el-button  type="text" size="small"  @click="vehmore(scope.row)" >详情</el-button>
                    <el-button  type="text" size="small"  @click="vehedit(scope.row)" >修改</el-button>
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
      queryTmp: {
        HPHM: '川D'
      },
      vehs: [],
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
        viewid: '000000066890',
        initdata: {
          xh: 'NewXh'
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
    vehmore (row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000065602',
          initdata: {
            xh: row.XH,
            hphm: row.HPHM,
            hpzl: row.HPZL,
            veh: row,
            source: 'jcxxpt'
          }
        })
    },
    vehedit(row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000066719',
        initdata: {
          xh: row.XH,
          hphm: row.HPHM,
          hpzl: row.HPZL
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
      this.vehs = []
      this.$axiosClient.call('jcxxpt/veh/getvehlist', 'get', Object.assign({}, this.page, where))
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
