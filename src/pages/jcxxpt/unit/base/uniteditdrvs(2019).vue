<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
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
                width="50"
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
                prop="SFZMHM1"
                label="身份证号码"
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
                </el-table-column>
                <el-table-column
                prop=""
                label="关联车辆"
                width="120"
                show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{scope.row.VEHHPZL + ': ' + scope.row.VEHHPHM}}
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
                >
                  <template slot-scope="scope">
                    {{(scope.row.LXDH||'') + '/' + (scope.row.SJHM||'')}}
                  </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
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
      <el-col :span="4">
        <el-button type="primary" plain size="mini" @click="adddrv" :disabled="initdata.qybh === 'NewQybh'">添加</el-button>
      </el-col>
    </el-row>  
      <el-dialog v-dialogDrag  :modal-append-to-body="false"  title="驾驶人信息" width="70%" :visible.sync="dialog" top="5vh" :close-on-click-modal="false" @close="ondialogCancel" custom-class="mydialog">
        <div
          v-loading.lock="dialoading"
          element-loading-text="处理中"
          element-loading-spinner="el-icon-loading">
            <el-row>
              <el-col :span="24">
                <el-form :inline="true"  label-width="8.66rem" label-suffix=":"  @submit.native.prevent>
                  <el-row>
                      <el-col :span="8">
                          <el-form-item label="身份证号码">
                              <el-input v-model="sfzmhmToUp" placeholder="身份证号码" clearable  @keyup.native.enter="getdrv"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item >
                              <el-button type="primary"  icon="el-icon-s-cooperation" @click="getdrv">调取驾驶人信息</el-button>
                              <el-button  plain  icon="el-icon-download" :disabled="adddisabled" >添加为单位车辆</el-button>       
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
                  <drvshowbase :initdata="toComData"></drvshowbase>
                </el-card>
              </el-col>
            </el-row>
        </div>
      </el-dialog>           
  </div>
</template>

<script>
import drvshowbase from '../../drv/base/drvshowbase'
export default {
  name: 'default',
  components: {
    drvshowbase: drvshowbase
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
      drvs: [],
      page: {
        currentPage: 1,
        size: 10
      },
      total: 0,      
      loading: false,
      dialoading: false,      
      dialog: false,
      dialogform: {
        sfzmhm: ''
      },
      toComData: {
        drv: {},
        drvdb: {},
        source: 'noexit'
      }
    }
  },
  created () {
    if (this.initdata.qybh !== 'NewQybh') {    
      this.getunitdrvs(this.initdata.qybh)
    }
  },
  computed: {
    sfzmhmToUp : {
      get: function(){
        return this.dialogform.sfzmhm
      },
      set : function(val){
        this.dialogform.sfzmhm = val.toUpperCase();
      }
    },
    adddisabled () {
      return false
    }
  },
  watch: {
    'initdata.qybh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          if (val === 'NewQybh') {
            this.drvs = []
          } else {
            this.page.currentPage = 1
            this.page.size = 10
            this.getunitdrvs(val)
          }
        } 
      },
      deep:true
    },
    'dialogform':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.toComData.drv = {}
        this.toComData.drvdb = {}
        this.toComData.source = 'noexit'
      },
      deep:true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.currentPage = 1
      this.page.size = val
      this.getunitdrvs(this.initdata.qybh)
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getunitdrvs(this.initdata.qybh)
    },
    getunitdrvs (qybh) {
      this.loading = true
      this.drvs = []
      let param = Object.assign(this.page, {qybh: qybh}) 
      this.$axiosClient.call('JCXXPTBASEUNITGETUNITDRVS', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.drvs = res.data.drvs
            this.total = res.data.total
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
    getdrv () {
      this.dialoading = true
      this.toComData.drv = {}
      this.toComData.drvdb = {}      
      this.toComData.source = 'noexit'
      this.$axiosClient.call('JCXXPTBASEDRVGETDRV', 'get', this.dialogform)
        .then((res) => {
          if (res.status === 1) {
            this.toComData.drv = res.data || {}
            this.toComData.drvdb = res.data1 || {} 
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
    adddrv () {
      this.dialog = true
      this.dialogform.sfzmhm = ''
      this.toComData.drv = {}
      this.toComData.drvdb = {}      
      this.toComData.source = 'noexit'      
    },
    ondialogCancel () {
      this.dialog = false
    }
  }
}
</script>
<style scoped>

</style>
