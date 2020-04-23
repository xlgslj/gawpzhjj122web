<template>
    <div style="width:99.5%;">
        <el-row style="margin-top:10px;padding-bottom:10px;">
            <el-col
              v-loading.lock="loadmod.chart"
              element-loading-text="处理中"
              element-loading-spinner="el-icon-loading"            
             :span="24">
                <el-card  shadow="always" :style="{height:cardh}">
                    <div slot="header" class="clearfix">
                      <span>{{year}}年违法（脏车治理）处理情况</span>
                    </div>
                    <ve-histogram :data="chartData" :extend="extend"  :height="charth"></ve-histogram>                    
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="padding-bottom:10px;">
            <el-col
              v-loading.lock="loadmod.unit"
              element-loading-text="处理中"
              element-loading-spinner="el-icon-loading"            
             :span="14">
                <el-card  shadow="always">
                    <div slot="header" class="clearfix">
                        <span>企业违法量(脏车治理)排名前5（统计始于2019-01-01）</span>
                        <el-button style="float: right; padding: 3px 0"  type="primary" plain @click="showunithmd">企业黑（灰）名单</el-button>                        
                    </div>                   
                    <el-table
                      :data="unitvios"
                      :show-header="true"                       
                      @row-click="tabclick1"
                      style="width: 100%">
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
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="ZDDXLX"
                        label="重点对象类型"
                        width="150"
                        show-overflow-tooltip>   
                        <template slot-scope="scope">
                          {{zddxlx(scope.row.ZDDXLX)}}
                        </template>                                              
                      </el-table-column>
                      <el-table-column
                        prop="GLLXR"
                        label="主要负责人"
                        width="150"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                          {{ scope.row.GLLXR || scope.row.FR  }}
                        </template>                          
                      </el-table-column>
                      <el-table-column
                        prop="GLSJHM"
                        label="负责人电话"
                        width="150"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                          {{ scope.row.GLSJHM || scope.row.FRSJHM  }}
                        </template>                               
                      </el-table-column> 
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="80">
                        <template slot-scope="scope">
                          <el-button  type="text" size="small"  @click="unitmore(scope.row)" >详细</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col
              v-loading.lock="loadmod.veh"
              element-loading-text="处理中"
              element-loading-spinner="el-icon-loading"            
             :span="10">
                <el-card  shadow="always">
                    <div slot="header" class="clearfix">
                        <span>车辆违法(脏车治理)排名 Top 5</span>
                        <el-button style="float: right; padding: 3px 0"  type="primary" plain @click="showvehhmd">车辆黑（灰）名单</el-button>                          
                    </div>                  
                    <el-table
                      :data="vehvios"
                      :show-header="true"                   
                      @row-click="tabclick1"
                      style="width: 100%">
                      <el-table-column
                        prop="SUM"
                        label="违法量"
                        width="80">
                       <template slot-scope="scope">
                          <el-tag type="danger">{{ scope.row.SUM }}</el-tag>
                        </template>                        
                      </el-table-column>                      
                      <el-table-column
                        prop="HPHM"
                        label="号牌号码"
                        width="100"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="DSR"
                        label="当事人"
                        width="150"
                        show-overflow-tooltip> 
                      </el-table-column>
                      <el-table-column
                        prop="JDCSYR"
                        label="所有人"
                        width="180"
                        show-overflow-tooltip                        
                       >   
                      </el-table-column>                         
                      <el-table-column
                        prop="DH"
                        label="电话"
                        width="100"
                        show-overflow-tooltip
                        >
                      </el-table-column> 
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="80">
                        <template slot-scope="scope">
                          <el-button  type="text" size="small"  @click="vehmore(scope.row)" >详细</el-button>
                        </template>
                      </el-table-column>                                         
                    </el-table>
                </el-card>
            </el-col>
         </el-row>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import * as axiosClient from '../../../common/axiosClient'
import { EventBus } from '../../../common/event-bus.js'
export default {
  name: 'default',
  data: function () {
    this.extend = {
      series: {
        type: 'bar',
        label: { show: true, position: "top" }
      }
    }      
    return {
      year: '2019',
      chartData: {
        columns: [], // ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          // { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      unitvios: [],
      vehvios: [],
      loadmod: {
        chart: false,
        unit: false,
        veh: false,
      }
    }
  },
  computed: {
    ...mapState({
      _code: '_code',
    }),      
    zddxlx () {
      return function(code) {
        let i = this._code.findIndex(d => d.LX === 'dwlx' && d.CODE === code)
        if (i > -1) {
          return code + ':' + this._code[i].VAL
        } else {
          return code
        }
      }
    },     
   cardh () {
      return (window.innerHeight * 0.35 + 54) + 'px'
    },
    charth () {
      return  window.innerHeight * 0.35 + 'px'
    }
  },
  mounted () {
    this.getchartdata(this.year)
    this.getunitvios()
    this.getvehvios()
  },
  methods: {
    tabclick1 () {

    },
    showvehhmd () {
      EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000065156'
      })
    },
    showunithmd () {
      EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000065215'
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
    },
    vehmore (row) {
      EventBus.$emit('main', {
      key: 'opennew',
      viewid: '000000065856',
        initdata: {
          xh: row.XH,
          hphm: row.HPHM,
          hpzl: row.HPZL
        }
      })
    },
    getchartdata (year) {
      this.loadmod.chart = true
      axiosClient.call('ZXXDZCZLVIOHOMEGEMONTHVIOGROUP', 'get', {year: year})
        .then((res) => {
          if (res.status === 1) {
            this.chartData.columns = res.data.cols
            this.chartData.rows = res.data.rows
          } else {
            this.$message.error(res.msg)
          }
          this.loadmod.chart = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loadmod.chart = false            
        })        
    },
    getunitvios () {
      this.loadmod.unit = true
      axiosClient.call('ZXXDZCZLUNITHOMEGETWFTOP', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.unitvios = res.data
          } else {
            this.$message.error(res.msg)
          }
          this.loadmod.unit = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loadmod.unit = false            
        })
    },
    getvehvios () {
      this.loadmod.veh = true
      axiosClient.call('ZXXDZCZLVEHHOMEGETWFTOP', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.vehvios = res.data
          } else {
            this.$message.error(res.msg)
          }
          this.loadmod.veh = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loadmod.veh = false            
        })
    }
  }
}
</script>
