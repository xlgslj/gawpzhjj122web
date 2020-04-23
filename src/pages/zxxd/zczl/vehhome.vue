<template>
    <div style="width:99.5%;">
      <el-row style="margin-top:10px;padding-bottom:10px;" :gutter="20">
        <el-col
          :span="18">
          <routeshow
            v-loading.lock="loadmod.map"
            element-loading-text="处理中"
            element-loading-spinner="el-icon-loading" 
            element-loading-background="rgba(0, 0, 0, 0.5)"
            :routes="routes"
            :winh="maph">
           </routeshow>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col
              v-loading.lock="loadmod.yylx"
              element-loading-text="处理中"
              element-loading-spinner="el-icon-loading"            
             :span="24">
                <el-card  shadow="always" :style="{height:cardh}">
                    <div slot="header" class="clearfix">
                      <span>重点管控车辆营运类型概览</span>
                      <el-button style="float: right; padding: 3px 0" type="text" @click="getroutes()">查看全部路线</el-button>                        
                    </div>
                    <ve-pie :data="chartData" :settings="chartSettings" :style="{height:charth}" :events="chartEvents"></ve-pie>
                </el-card>
            </el-col>
          </el-row>
          <el-row  style="margin-top:10px;" >
            <el-col
              v-loading.lock="loadmod.wftop"
              element-loading-text="处理中"
              element-loading-spinner="el-icon-loading"            
             :span="24">
                <el-card  shadow="always">
                    <div slot="header" class="clearfix">
                        <span>车辆违法(脏车治理)排名 Top 5</span>
                    </div>                  
                    <el-table
                      :data="wftopdata"
                      :show-header="false"                   
                      @row-click="tabclick1"
                      style="width: 100%">
                      <el-table-column
                        prop="SUM"
                        label="违法量"
                        width="80">
                       <template slot-scope="scope">
                          <el-tag type="danger"  @click.stop="vehmore(scope.row)">{{ scope.row.SUM }}</el-tag>
                        </template>                        
                      </el-table-column>                      
                      <el-table-column
                        prop="HPHM"
                        label="号牌号码"
                        width="80"
                        show-overflow-tooltip
                        >
                      </el-table-column>
                      <el-table-column
                        prop="DSR"
                        label="当事人"
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
                    </el-table>
                </el-card>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="20">
              <mybutton @click="manageveh">机动车信息管理</mybutton>
            </el-col>
          </el-row>
        </el-col>
      </el-row>        
    </div>
</template>

<script>
import * as axiosClient from '../../../common/axiosClient'
import {mapState} from 'vuex'
import textpanel1 from '../../../components/ui/textpanel1'
import mybutton from '../../../components/ui/button1'
import routeshow from '../../jcxxpt/components/routeshow'
export default {
  components: {
    'textpanel1': textpanel1,
    mybutton: mybutton,
    routeshow: routeshow
  },
  name: 'default',
  data: function () {
      var self = this
      this.chartEvents = {
        click: function (e) {
          let code = self.chartData.rows[e.dataIndex].CODE
          if (code) {
            self.getroutes("yylx='" + code + "'")
          } else {
            self.getroutes("yylx is null")
          }
        }
      }    
     return {
      routes: [],
      loadmod: {
        yylx: false,
        zddx: false,
        wftop: false,
        map: false
      },
      chartData: {
        /*
        columns: ['类型', '数量'],
        rows: [
            { '类型': '公路客运', '数量': 1393 },
        ] */
        columns: ['NAME', 'SUM'],
        rows: []
      },
      chartSettings: {
        radius: 100,
        // offsetY: 100
      },
      textpanel1Data: [
          {
            TEXT: '采集企业总数',
            VAL: 5189
          }
      ],
      wftopdata: []      
    }
  },
  computed: {
    maph () {
      return (window.innerHeight -110) + 'px'
    },
    cardh () {
      return (window.innerHeight * 0.35 + 54) + 'px'
    },
    charth () {
      return window.innerHeight * 0.35 + 'px'
    }
  },
  mounted () {
    this.getyylxdata()
    this.getroutes()
    this.getwftopdata()
    console.log(this)
  },
  methods: {
    manageveh () {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000066884'
      }) 
    },
    tabclick1 (row) {
      this.getroutes('hphm=\'' + row.HPHM + '\' and hpzl=\'' + row.HPZL + '\'')
    },
    vehmore (row) {
      this.$EventBus.$emit('main', {
      key: 'opennew',
      viewid: '000000065856',
        initdata: {
          xh: row.XH,
          hphm: row.HPHM,
          hpzl: row.HPZL
        }
      })
    },
    getroutes (where) {
      this.loadmod.map = true
      let params = {
        where: where
      }
      axiosClient.call('JCXXPTBASEVEHROUTESOFVEHS', 'get', params)
        .then((res) => {
          if (res.status === 1) {
            if (res.data.length) {
              this.routes = res.data
            } else {
              this.routes = []
              this.$message('未登记路线')
            }
          } else {
            this.$message.error(res.msg)
          }
          this.loadmod.map = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loadmod.map = false
        })
    },
    getyylxdata () {
      this.loadmod.yylx = true
      axiosClient.call('ZXXDZCZLVEHHOMEGETYYLX', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.chartData.rows = res.data
          } else {
            this.$message.error(res.msg)
          }
          this.loadmod.yylx = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loadmod.yylx = false            
        })
    },
    getwftopdata () {
      this.loadmod.wftop = true
      axiosClient.call('ZXXDZCZLVEHHOMEGETWFTOP', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.wftopdata = res.data
          } else {
            this.$message.error(res.msg)
          }
          this.loadmod.wftop = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loadmod.wftop = false            
        })
    }
  }
}
</script>

<style scoped>
.init-in {
    width: 10%;
}
.init-out {
    width: 100%;
}
.initing {
    transition: width 5s;    
}
.mychart {
    height: 150px;
}
.el-tag:hover {
  cursor: pointer;
}
</style>
