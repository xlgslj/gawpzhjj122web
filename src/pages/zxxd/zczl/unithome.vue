<template>
    <div style="width:99.5%;">
      <el-row style="margin-top:10px;padding-bottom:10px;" :gutter="20">
        <el-col
          :span="18">
          <unitmapshow
            v-loading.lock="loadmod.map"
            element-loading-text="处理中"
            element-loading-spinner="el-icon-loading" 
            element-loading-background="rgba(0, 0, 0, 0.5)"
            :mode="unitmode"
            :units="units"     
            :winh="maph">
           </unitmapshow>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col
              v-loading.lock="loadmod.zddx"
              element-loading-text="处理中"
              element-loading-spinner="el-icon-loading"            
             :span="24">
                <el-card  shadow="always">
                    <textpanel1 :indata="textpanel1Data" @onclick="chosezddxlx">
                        <template v-slot:title>重点管控单位概览</template>
                        <!--
                        <template v-slot:text="scope">
                        Here might{{scope.row}}
                        </template>
                        -->
                    </textpanel1>
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
                        <span>企业违法量(脏车治理)排名前5（统计始于2019-01-01）</span>
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
                      <template slot="header">
                        {{''}}
                      </template>                        
                        <template slot-scope="scope">
                          <el-tag type="danger"  @click.stop="unitmore(scope.row)">{{ scope.row.SUM }}</el-tag>
                        </template>                        
                      </el-table-column>                      
                      <el-table-column
                        prop="DWMC"
                        show-overflow-tooltip
                        label="单位名称">
                      <template slot="header">
                        {{'企业治脏违法接受处理量 TOP 5'}}
                      </template>                         
                      </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="20">
              <mybutton @click="manageunit">单位信息管理</mybutton>
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
import unitmapshow from '../../jcxxpt/unit/base/unitmapshow'
export default {
  components: {
    'textpanel1': textpanel1,
    mybutton: mybutton,
    unitmapshow: unitmapshow
  },
  name: 'default',
  data: () => {
    return {
      units: [],
      unitmode: 'list',
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
      wftopdata: [],
      chartEvents: {
        click: function (e) {
          alert(e.data.name)
          console.log(e)
        }
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
    this.getunitlist('dtzb is not null')
    this.getzddxdata()
    this.getwftopdata()
  },
  methods: {
    chosezddxlx (item) {
      let lx = item.LX
      if (lx === '1') {
        this.getunitlist('dtzb is not null')        
      } else if (lx === '0') {
        this.getunitlist('zddxlx is null and dtzb is not null')         
      } else {
        this.getunitlist('zddxlx =\'' + lx + '\' and  dtzb is not null')         
      }
    },
    tabclick1 (row) {
      this.unitmode = 'one'
      this.units = []
      this.units.push(row)
    },
    unitmore (row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000066174',
        initdata: {
          qybh: row.QYBH
        }
      })
    },
    manageunit () {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000066218'
      }) 
    },
    getunitlist (where) {
      this.loadmod.map = true
      let params = {
        where: where
      }
      axiosClient.call('ZXXDZCZLUNITHOMEGEUNITLIST', 'get', params)
        .then((res) => {
          if (res.status === 1) {
            this.unitmode = 'list'
            this.units = res.data
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
      axiosClient.call('ZXXDZCZLUNITHOMEGETYYLX', 'get', {})
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
    getzddxdata () {
      this.loadmod.zddx = true
      axiosClient.call('ZXXDZCZLUNITHOMEGETZDDX', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.textpanel1Data = res.data
          } else {
            this.$message.error(res.msg)
          }
          this.loadmod.zddx = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loadmod.zddx = false            
        })
    },
    getwftopdata () {
      this.loadmod.wftop = true
      axiosClient.call('ZXXDZCZLUNITHOMEGETWFTOP', 'get', {})
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
