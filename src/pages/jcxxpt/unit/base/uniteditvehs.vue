<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
    <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <el-table
                  :data="vehs"
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
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="page.currentPage"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="page.size"
                  layout="total, sizes, prev, pager, next, jumper,slot"
                  :total="total">
                  <el-button style="margin-left:200px;" type="text" plain size="mini" @click="addveh" :disabled="initdata.qybh === 'NewQybh'">添加车辆</el-button>                  
              </el-pagination>   
            </el-col>
          </el-row>         
        </el-col>
    </el-row>
      <el-dialog v-dialogDrag  :modal-append-to-body="false"  title="车辆信息" width="70%" :visible.sync="dialog" top="5vh" :close-on-click-modal="false" @close="ondialogCancel" custom-class="mydialog">
        <div
          v-loading.lock="dialoading"
          element-loading-text="处理中"
          element-loading-spinner="el-icon-loading">
            <el-row>
              <el-col :span="24">
                <el-form :inline="true"  label-width="8.66rem" label-suffix=":">
                  <el-row>
                      <el-col :span="8">
                          <el-form-item label="号牌种类">
                              <el-select v-model="dialogform.hpzl" placeholder="请选择" >
                                  <el-option
                                  v-for="item in codefilter('hpzl')"
                                  :key="item.CODE"
                                  :label="item.CODE+': '+ item.VAL"
                                  :value="item.CODE">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="号牌号码">
                              <el-input v-model="hphmToUp" placeholder="号牌号码" clearable></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item >
                              <el-button type="primary"  icon="el-icon-s-cooperation" @click="getveh">调取车管信息</el-button>
                              <el-button  plain  icon="el-icon-download" :disabled="adddisabled" @click="addvehsave">添加为单位车辆</el-button>       
                          </el-form-item>
                      </el-col>
                  </el-row>
                </el-form>            
              </el-col>
            </el-row>
            <el-row>
              <el-col style="color:red;">
                {{toComData.hphm ? (toComData.veh.XH ? '' : '车辆不存在') : ''}}{{toComData.hphm ? (toComData.veh.QYBH ? '&nbsp;车辆已与单位关联' : '') : ''}}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-card class="box-card">
                  <vehshowbase :initdata="toComData"></vehshowbase>
                </el-card>
              </el-col>
            </el-row>
        </div>
      </el-dialog>    
  </div>
</template>

<script>
import {mapState} from 'vuex'
import vehshowbase from '../../veh/base/vehshowbase'
import * as axiosClient from '../../../../common/axiosClient'
export default {
  name: 'default',
  components: {
    vehshowbase: vehshowbase
  },
  props: {
    // 此处一定要用value,实现v-model
    initdata: {
      type: Object,
      default: () => {
        qybh: null
      }
    }
  },  
  data: () => {
    return {
      vehs: [],
      page: {
        currentPage: 1,
        size: 10
      },
      total: 0,      
      loading: false,
      dialoading: false,      
      dialog: false,
      dialogform: {
        hphm: '川D',
        hpzl: '01'
      },
      toComData: {
        hphm: '',
        veh: {},
        vehdb: {},
        source: 'jcxxpt'
      }
    }
  },
  created () {
    if (this.initdata.qybh !== 'NewQybh') {
      this.getunitvehs(this.initdata.qybh)
    }
  },
  computed: {
    hphmToUp : {
      get: function(){
        return this.dialogform.hphm
      },
      set : function(val){
        this.dialogform.hphm = val.toUpperCase();
      }
    },
    adddisabled () {
      let t = this.toComData.hphm ? ( (this.toComData.veh.XH ? false : true)|| (this.toComData.veh.QYBH ? true : false) ) : true
      return t
    }
  },
  watch: {
    'initdata.qybh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          if (val === 'NewQybh') {
            this.vehs = []
          } else {
            this.page.currentPage = 1
            this.page.size = 10
            this.getunitvehs(val)
          }
        } 
      },
      deep:true
    },
    'dialogform':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.toComData.hphm = ''
        this.toComData.veh = {}
        this.toComData.vehdb = {}
        this.toComData.source = 'jcxxpt'
      },
      deep:true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.currentPage = 1
      this.page.size = val
      this.getunitvehs(this.initdata.qybh)
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getunitvehs(this.initdata.qybh)
    },
    getunitvehs (qybh) {
      this.loading = true
      this.vehs = []
      let param = Object.assign(this.page, {qybh: qybh}) 
      axiosClient.call('jcxxpt/unit/getunitvehs', 'get', param)
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
    },
    addveh () {
      this.dialog = true

      this.dialogform.hphm = '川D'
      this.dialogform.hpzl = '01'

      this.toComData.hphm = ''
      this.toComData.veh = {}
      this.toComData.vehdb = {}      
      this.toComData.source = 'jcxxpt'
    },
    getveh () {
      this.dialoading = true
      this.toComData.hphm = this.dialogform.hphm
      this.toComData.veh = {}
      this.toComData.vehdb = {}      
      this.toComData.source = 'jcxxpt'
      this.$axiosClient.call('jcxxpt/veh/getveh', 'get', this.dialogform)
        .then((res) => {
          if (res.status === 1) {
            this.toComData.veh = res.data || {}
            this.toComData.vehdb = res.data1 || {} 
            this.toComData.source = res.source
           } else {
            this.$message.error(res.msg)
          }
          this.dialoading = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.dialoading = false
        })    
    },
    addvehsave () {
      this.dialoading = true
      // 如果XH正常且source = 'jcxxpt',yqbh为null说明车辆已经在本地存在,只是作单位关联
      let methodname = this.toComData.source === 'jcxxpt' ? 'jcxxpt/veh/bindunit' : 'jcxxpt/veh/add'
      let params =  this.toComData.source === 'jcxxpt' ? {xh: this.toComData.veh.XH, qybh: this.initdata.qybh} : Object.assign({}, this.toComData.vehdb, {QYBH: this.initdata.qybh})
      axiosClient.call(methodname, 'POST', params)
        .then((res) => {
          if (res.status) {
            this.toComData.hphm = ''
            this.toComData.veh = {}
            this.toComData.vehdb = {}
            this.toComData.source = 'jcxxpt'
            this.$message('登记成功')
            this.dialog = false
            this.getunitvehs(this.initdata.qybh)
          }　else {
            this.$message('登记失败')              
          }
          this.dialoading = false            
        })
        .catch(err => {
          this.$message(err)
          this.dialoading = false  
        })
    },
    vehmore(row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000065602',
        initdata: {
          xh: row.XH,
          hphm: row.HPHM,
          hpzl: row.HPZL
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
    ondialogCancel () {
      this.dialog = false
    }
  }
}
</script>
<style scoped>

</style>
