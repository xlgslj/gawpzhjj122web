<template>
  <div style="width:99.5%;">
    <el-row style="margin-top:10px;padding-bottom:10px;">
        <el-col :span="24">
          <el-form :inline="true" label-suffix=":" :model="queryform">
            <el-form-item label="类型">
                <template>
                    <el-radio v-model="queryform.lx" label="黑名单">黑名单</el-radio>
                    <el-radio v-model="queryform.lx" label="灰名单">灰名单</el-radio>
                </template>
            </el-form-item>    
            <el-form-item>
              <el-divider direction="vertical" style="heigth:40px;"></el-divider>  
            </el-form-item>                    
            <el-form-item label="开始时间">
                <el-date-picker
                v-model="queryform.kssj"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">                
            </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-divider direction="vertical" style="heigth:40px;"></el-divider>  
            </el-form-item>                      
            <el-form-item label="阀值">
                <el-input-number v-model="queryform.num" :min="1" :max="20" label="描述文字">
                </el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getdata">统计</el-button>
            </el-form-item>                     
          </el-form>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-table
                v-loading.lock="loading"
                element-loading-text="处理中"
                element-loading-spinner="el-icon-loading"             
                :data="tabdata"
                :show-header="true"                   
                :height="tabh"
                border
                style="width: 100%">
                <el-table-column
                prop="ROWNUM"
                label="排名"
                width="80"
                show-overflow-tooltip
                >   
                </el-table-column> 
                <el-table-column
                  prop="SUM"
                  label="违法量"
                  width="80">
                  <template slot-scope="scope">
                    <el-tag type="danger">{{ scope.row.SUM }}</el-tag>
                  </template>                        
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
                    <el-button  type="text" size="small"  @click="unitmore(scope.row)" >详细信息</el-button>
                  </template>
                </el-table-column>
            </el-table>        
        </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import * as axiosClient from '../../../common/axiosClient'
import { EventBus } from '../../../common/event-bus'
export default {
  name: 'default',
  props: ['initdata'],
  data: () => {
    return {
      tabdata: [],
      queryform: {
        lx: '黑名单',
        kssj: '2019-10-01',
        num: 20
      },
      loading: false
    }
  },
  watch: {
    'queryform.lx':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.queryform.num = val === '黑名单' ? 20 : 10
      },
      deep:true
    }    
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
    },   
    tabh () {
      return  window.innerHeight - 165
    }    
  },
  methods: {
    getdata (params) {
      this.loading = true
      this.tabdata = []
      axiosClient.call('ZXXDZCZLHMDGETUNITDATA', 'get', this.queryform)
        .then((res) => {
          if (res.status === 1) {
            this.tabdata = res.data
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
    unitmore (row) {
      EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000066174',
        initdata: {
          qybh: row.QYBH
        }
      })
    }
  }
}
</script>
