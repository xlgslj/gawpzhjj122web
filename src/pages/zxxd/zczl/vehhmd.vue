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
                prop="HPHM1"
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
                width="300"
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
                    <el-button  type="text" size="small"  @click="vehmore(scope.row)" >详细信息</el-button>
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
  data: () => {
    return {
      tabdata: [],
      queryform: {
        lx: '黑名单',
        kssj: '2019-10-01',
        num: 10
      },
      loading: false
    }
  },
  watch: {
    'queryform.lx':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.queryform.num = val === '黑名单' ? 10 : 3
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
      axiosClient.call('ZXXDZCZLHMDGETVEHDATA', 'get', this.queryform)
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
    vehmore (row) {
      EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000065856',
          initdata: {
            xh: row.XH,
            hphm: row.HPHM1,
            hpzl: row.HPZL
          }
        })
    }
  }
}
</script>
