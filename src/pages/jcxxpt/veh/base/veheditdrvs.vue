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
                >
                <el-table-column
                prop="ROWXH"
                label="No."
                width="60"
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
                prop="SFZMHM"
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
                prop="DJZSXXDZ"
                label="住址"
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
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button  type="text"  @click="drvmore(scope.row)" >详情</el-button>
                    <el-button  type="text"  @click="deldrv(scope.row)" >删除</el-button>                    
                  </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper, slot"
                :total="total">
                <el-button style="margin-left:200px;" type="text" plain size="mini" @click="adddrv" :disabled="initdata.xh === 'NewXh'">添加驾驶人</el-button>                
            </el-pagination>            
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
                            <el-button  plain  icon="el-icon-download" :disabled="adddisabled" @click="adddrvsave">添加为本车驾驶员</el-button>       
                        </el-form-item>
                    </el-col>
                </el-row>
              </el-form>            
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="box-card">
                <drvshowbase_simple :initdata="toComData"></drvshowbase_simple>
              </el-card>
            </el-col>
          </el-row>
      </div>
    </el-dialog>     
  </div>
</template>

<script>
import drvshowbase_simple from '../../drv/base/drvshowbase_simple'
export default {
  name: 'default',
  components: {
    drvshowbase_simple: drvshowbase_simple
  },
  props: {
    // 此处一定要用value,实现v-model
    initdata: {
      type: Object,
      default: () => {
        xh: null
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
    this.getvehdrvs(this.initdata.xh)
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
      let i = this.drvs.findIndex(d => d.SFZMHM === this.dialogform.sfzmhm )
      return !this.toComData.drv.XH || i > -1
    }
  },
  watch: {
    'initdata.xh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          this.page.currentPage = 1
          this.page.size = 10
          this.getvehdrvs(val)
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
      this.getvehdrvs(this.initdata.xh)
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getvehdrvs(this.initdata.xh)
    },
    adddrv () {
      this.dialog = true
      this.dialogform.sfzmhm = ''
      this.toComData.drv = {}
      this.toComData.drvdb = {}      
      this.toComData.source = 'noexit'  
    },
    deldrv (row) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
          this.loading = true
          this.$axiosClient.call('jcxxpt/veh/unbinddrv', 'POST', {sfzmhm: row.SFZMHM, xh: this.initdata.xh})
            .then((res) => {
              if (res.status) {
                let i = this.drvs.findIndex(d => d.XH === row.XH)
                this.drvs.splice(i, 1)
                this.$message('删除成功')
              }　else {
                this.$message('删除失败')              
              }
              this.loading = false            
            })
            .catch(err => {
              this.$message(err)
              this.loading = false  
            })
        }
      ) 
    },
    adddrvsave () {
      this.dialoading = true
      let tasks = []
      tasks.push(this.$axiosClient.call('jcxxpt/veh/binddrv', 'post', {sfzmhm: this.dialogform.sfzmhm, xh: this.initdata.xh}))
      if (this.toComData.source === 'webservice') tasks.push(this.$axiosClient.call('jcxxpt/drv/add', 'post', this.toComData.drvdb))
      Promise.all(tasks)
        .then((res) => {
          if (res[0].status || (tasks.length ===2 && res[0].status && res[1].status)) {
            this.$message('添加成功')
            this.getvehdrvs(this.initdata.xh)
          } else {
            this.$message.error(res.msg)
          }
          this.dialoading = false
          this.dialog = false
        })        
        .catch(err => {
          this.$message(err)
          this.dialoading = false
      })
    },
    getdrv () {
      this.dialoading = true
      this.toComData.drv = {}
      this.toComData.drvdb = {}      
      this.toComData.source = 'noexit'
      this.$axiosClient.call('jcxxpt/drv/getdrv', 'get', this.dialogform)
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
    getvehdrvs (xh) {
      this.loading = true
      this.drvs = []
      let param = Object.assign(this.page, {xh: xh}) 
      this.$axiosClient.call('jcxxpt/veh/getdrvs', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.drvs = res.data
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
    drvmore (row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000066762',
        initdata: {
          drv: row,
          source: 'jcxxpt'
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
