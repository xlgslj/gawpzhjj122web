<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"
    style="height:450px;"
    >
      <el-row>
        <el-col :span="24">
            <el-table
              :data="drvs"
              height="400"
              border
              style="width: 100%">
              <el-table-column
                prop="ROWXH"
                label="序号"
                width="80">
              </el-table-column>
              <el-table-column
                prop="XM"
                label="姓名"
                width="150">
              </el-table-column>
              <el-table-column
                prop="SFZMHM"
                label="证件号码"
                width="280">
              </el-table-column>
              <el-table-column
                prop="ZJCX"
                label="准驾车型"
                width="100">
              </el-table-column>
              <el-table-column
                prop="SJHM"
                label="联系电话"
                width="180">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button  type="text" size="small"  @click="drvdell(scope.row)" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
          <el-form-item style="margin:0px;" v-if="drvmode === 'normal'">
            <el-button type="text" @click="indrvadd" :disabled="!(myvalue.vehsource==='jcxxpt')">新增</el-button>
          </el-form-item>
          <div
            v-loading.lock="drvmode==='pending'"
            element-loading-text="处理中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)"  
            v-if="drvmode !== 'normal'">
            <el-form-item label="身份证号码">
              <el-input v-model="drvaddform.SFZMHM" placeholder="输入身份证回车"  @keyup.native.enter="drvquery"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="drvaddform.XM"  :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="准驾车型">
              <el-input v-model="drvaddform.ZJCX"  :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="drvaddform.SJHM"  :readonly="true"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  v-if="drvmode !== 'normal'"  icon="el-icon-back" circle size="mini" @click="drvmode = 'normal'"></el-button>
              <el-button  v-if="drvmode === 'querycompleted'" type="success" icon="el-icon-top" circle size="mini" @click="adddrv"></el-button>              
            </el-form-item>
          </div>
        </el-form>                    
      </el-row>   
  </div>
</template>

<script>

export default {
  name: 'default',
  components: {
  },
  props: {
    // 此处一定要用value,实现v-model
    value: {
      type: Object,
      default: () => {}
    },
    initdata: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      drvs: [],   
      drvmode: 'normal',
      drvaddform: {
        SFZMHM: ''
      },
      drv: {},
      drvdb: {},
      drvsource: '',
      loading: false
    }
  },
  computed: {
    winw () {
      return window.innerWidth
    },
    winh () {
      return window.innerHeight
    }
  },
  watch: {
    value:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.myvalue = this.value
      },
      deep:true
    },
    'value.vehxh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          this.getvehdrvs(val) 
        }
      },
      deep:true
    },
    myvalue:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.$emit('input', val)
      },
      deep:true
    },
    drvs:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.myvalue.drvs = val.length
      },
      deep:true
    },
    'drvaddform.SFZMHM':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val !== oldVal) {
          this.drvmode = 'waitinput'
          this.drvaddform.XM = ''
          this.drvaddform.ZJCX = ''
          this.drvaddform.SJHM = ''
          this.drv = {}
          this.drvdb = {}
          this.drvsource = ''
        } 
      },
      deep:true
    }
  },
  created () {
    this.myvalue = this.value
    if (this.myvalue.vehxh) {
      this.getvehdrvs(this.myvalue.vehxh) 
    }
  },
  methods: {
    getvehdrvs (xh) {
      this.loading = true
      this.drvs = []
      let param = {xh: xh}
      this.$axiosClient.call('JCXXPTBASEVEHGETDRVS', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.drvs = res.data
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
    indrvadd () {
      this.drvmode='waitinput'
      this.drvaddform = {}
    },
    drvquery () {
      let i = this.drvs.findIndex(d => d.SFZMHM === this.drvaddform.SFZMHM)
      if (i > -1) {
        this.$message('该驾驶员已存在')       
      } else {
        this.drvmode = 'pending'
        if (this.drvaddform.SFZMHM) {
          this.$axiosClient.call('JCXXPTBASEDRVGETDRV', 'get', {sfzmhm: this.drvaddform.SFZMHM})
            .then((res) => {
              if (res.status) {
                this.drv = res.data || {}
                this.drvaddform = res.data || {}
                this.drvdb = res.data1 || {}
                this.drvsource = res.source || ''
                this.drvmode = 'querycompleted'              
              } else {
                this.$message('没有该驾驶员')
                this.drvmode = 'waitinput'              
              }
            })        
            .catch(err => {
              this.$message(err)
              this.drvmode = 'waitinput' 
          })        
        }
      }
    },
    adddrv () {
      let tasks = []
      tasks.push(this.$axiosClient.call('JCXXPTBASEVEHBINDDRV', 'post', {sfzmhm: this.drvaddform.SFZMHM, xh: this.myvalue.vehxh}))
      if (this.drvsource === 'webservice') tasks.push(this.$axiosClient.call('JCXXPTBASEDRVADD', 'post', this.drvdb))
      this.drvmode = 'pending'
      Promise.all(tasks)
        .then((res) => {
          if (res[0].status || (tasks.length ===2 && res[0].status && res[1].status)) {
            this.drvs.push(Object.assign(this.drvaddform, {ROWXH: (this.drvs.length + 1)}))
            this.drvmode = 'normal' 
            this.myvalue.drvs = this.drvs.length
          } else {
            this.drvmode = 'waitinput'           
          }
        })        
        .catch(err => {
          this.$message(err)
          this.drvmode = 'waitinput' 
      })
    },
    drvdell (row) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {        
      this.loading = true
        this.$axiosClient.call('JCXXPTBASEVEHUNBINDDRV', 'POST', {sfzmhm: row.SFZMHM, xh: this.myvalue.vehxh})
          .then((res) => {
            if (res.status) {
              let i = this.drvs.findIndex(d => d.XH === row.XH)
              this.drvs.splice(i, 1)
             this.myvalue.drvs = this.drvs.length
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
      })
    }    
 }
}
</script>
<style scoped>

</style>
