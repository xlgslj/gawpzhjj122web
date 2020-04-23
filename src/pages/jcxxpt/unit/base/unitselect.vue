<template>
    <div>
        <el-row>
          <el-form :inline="true" :model="queryTmp" >
            <el-col :span="10">
              <el-form-item label="机构代码">
                <el-input v-model="queryTmp.ZZJGDM" placeholder="组织机构代码" clearable size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="单位名称">
                <el-input v-model="queryTmp.DWMC" placeholder="单位名称" clearable size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" @click="onQuery"  icon="el-icon-search"  size="mini">筛选</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row
          v-loading.lock="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)"         
        >
            <el-table
            :data="units"
            height="400"
            border
            @sort-change = "sortChange"            
            >
                <el-table-column
                    prop="ZZJGDM"
                    sortable="custom"
                    label="组织机构代码"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="DWMC"
                    sortable="custom"
                    label="单位名称"
                    width="400">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button  type="text" size="small"  @click="chose(scope.row)" >选择</el-button>
                    <el-button  type="text" size="small"  @click="edit(scope.row)" >修改</el-button>                    
                  </template>
                </el-table-column>                
            </el-table>            
        </el-row>
        <el-row  type="flex" justify="end" style="margin-top:5px;">
          <el-col :span="12">
            <el-button type="text" @click="addunit">单位不存在,去新增</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="onclose"  icon="el-icon-switch-button"  size="mini">关闭</el-button>
          </el-col>
        </el-row>
    </div>
</template>
<script>
import * as axiosClient from '../../../../common/axiosClient'
import { EventBus } from '../../../../common/event-bus.js'
export default {
  props: {
    pcom: {
      type: String,
      default:''
    }
  },
  data: () => {
    return {
      queryTmp: {
      },
      query: {},
      taborder: null,
      source: [],
      pagecacheid: null,
      queyFun: () => {
        return () => {
          return true
        }
      },
      sortFun: () => {
        return null
      },
      loading: true   
    }
  },
  mounted () {
    if (!(this.pcom)) this.$message.error('未指定足够prop') 
    this.$nextTick(() => {
      this.getdata()
    })

  },
  computed: {
    units () {
      let v = this.source.filter(this.queyFun())
      if (this.sortFun()) v.sort(this.sortFun())
      return v
    },
  },
  watch: {
    query (nval) {
      this.queyFun = () => {
        let v = []
        let q = {...nval}
        Object.keys(q).forEach(function (key) {
          if (q[key]) {
            v.push({
              key: key,
              val: q[key]
            })
          }
        })
        let f = function (item) {
          let b = true
          if (item) {
            v.forEach((it) => {
              if (item[it.key]) b = b && (item[it.key].indexOf(it.val) >= 0)
            })
          }
          return b
        }
        return f
      }
    },
    taborder (nval) {
      this.tableupdate = true
      this.sortFun = () => {
        let f = (v1, v2) => {
          if (v1[nval.prop] > v2[nval.prop]) {
            return nval.order === 'ascending' ? 1 : -1
          } else if (v1[nval.prop] < v2[nval.prop]) {
            return nval.order === 'ascending' ? -1 : 1
          } else {
            return 0
          }
        }
        return nval.order ? f : null
      }
    }
  },
  methods: {
    onQuery () {
      this.query = {...this.queryTmp}
    },
    sortChange ({ column, prop, order }) {
      this.taborder = {
        prop: prop,
        order: order
      }
    },    
    chose (row) {
      EventBus.$emit(this.pcom, {
        key: 'unitchosed',
        unit: row}
      )      
    },    
    edit (row) {
      EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000003086'
      })
      EventBus.$emit(this.pcom, {
        key: 'unitedit'}
      )
    },
    addunit () {
      EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000003086'
      })      
      EventBus.$emit(this.pcom, {
        key: 'addunit'}
      )
    },
    onclose () {
      EventBus.$emit(this.pcom, {
        key: 'unitclose'
        }
      ) 
    }, 
    getdata () {
      let param = {}
      axiosClient.call('jcxxpt/unit/query', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.source = res.data
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