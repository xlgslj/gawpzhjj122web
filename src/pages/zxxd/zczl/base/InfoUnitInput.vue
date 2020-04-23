<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"
    style="height:400px;"
    >
      <el-row>
        <el-col :span="24">
          <el-form :model="unit"  label-suffix=":"   status-icon ref="ruleForm"  label-width="120px" size="medium"   class="demo-ruleForm">
            <el-row>
              <el-col :span="6">
                  <el-form-item label="单位名称">
                      <el-input v-model="unit.DWMC"  placeholder="点击图标选择单位"  :readonly="true">
                      </el-input>
                  </el-form-item>
              </el-col>                            
              <el-col :span="6">
                  <el-form-item label="组织机构代码">
                      <el-badge v-if="myvalue.sfzmmc !== 'A'" :value="myvalue.sfzmhm === unit.ZZJGDM ? '相符' : '不相符'" class="item" type="primary"  style="width:90%;">
                        <el-input v-model="unit.ZZJGDM"  placeholder="-"   :readonly="true" ></el-input>
                      </el-badge>
                      <el-input v-else v-model="unit.ZZJGDM"  placeholder="-"  :readonly="true"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="法人代表">
                      <el-input v-model="unit.FR"  placeholder="-"  :readonly="true"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="重点对象类型">
                      <el-input v-model="unit.DWMC"  placeholder="-"  :readonly="true"></el-input>
                  </el-form-item>
              </el-col>                      
            </el-row>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="单位地址">
                      <el-badge :value="code2cn(unit.XZQH,'xzqh',false)" class="item" type="primary" style="width:90%;">
                        <el-input v-model="unit.DWDD"  placeholder="-"  :readonly="true" ></el-input>
                      </el-badge>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="法人电话">
                      <el-input v-model="unit.FR"  placeholder="-"  :readonly="true"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="企业联系电话">
                      <el-input v-model="unit.DWLXDH"  placeholder="-"  :readonly="true"></el-input>
                  </el-form-item>
              </el-col>                
            </el-row>                        
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="8">
          <el-checkbox v-if="myvalue.sfzmmc === 'A'" v-model="isgk">挂靠</el-checkbox>
        </el-col>                      
        <el-col :span="12">
          <template  v-if="isgk">
            <el-select
              v-if="isgk"
              ref = "dwxz"
              v-model="qybh"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入组织机构代码或单位名的关键部分搜索"
              @click.native="enterdwxz"
              :remote-method="remoteMethod"
              :loading="selectloading"
              :disabled="!(myvalue.vehsource==='jcxxpt')"
              style="width:300px;">
              <el-option
                v-for="item in units1"
                :key="item.QYBH"
                :label="item.ZZJGDM + ': ' + item.DWMC"
                :value="item.QYBH">
              </el-option>  
            </el-select>            
            <el-button type="primary"  plain :disabled="!(qybh&&myvalue.vehsource==='jcxxpt')" @click="unitbind">关联单位</el-button>
          </template>
          <el-button v-else type="primary" plain :disabled="!(myvalue.vehsource==='jcxxpt')" @click="onqxgk">保存为个体经营</el-button>
        </el-col>
      </el-row>        
  </div>
</template>

<script>
export default {
  name: 'default',
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
      myvalue: {},
      unit: {},
      isgk: true,
      loading: false,
      units: [],
      units1: [],
      qybh: null,
      selectloading: false
    }
  },
  computed: {
  },
  watch: {
    value:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.myvalue = this.value
     },
      deep:true
    },
    'value.qybh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          if (val === 'personal') {
            this.unit = {}
          } else {
            this.qybh = val
            this.getunit(val) 
          }
        }
      },
      deep:true
    },
    myvalue:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.$emit('input', val)
      },
      deep:true
    }
  },
  created () {
    this.myvalue ={...this.value}
    this.qybh = this.myvalue.qybh
    if (this.myvalue.qybh && (this.myvalue.qybh !== 'personal')) {
      this.qybh = this.myvalue.qybh
      this.getunit(this.value.qybh) 
    }
    this.getunits()
  },
  methods: {
    getunit (qybh) {
      this.loading = true
      this.unit = {}
      this.$axiosClient.call('JCXXPTBASEUNITGETUNIT', 'get', {qybh: qybh})
        .then((res) => {
          if (res.status === 1) {
            this.unit = {...res.data, DWXZ: res.data.DWXZ ? res.data.DWXZ.split('') : []}
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
    getunits(query) {
      if (query !== '') {
        this.$axiosClient.call('JCXXPTBASEUNITGETUNITLIST', 'get', {})
          .then((res) => {
            if (res.status === 1) {
              this.units = res.data
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(err=> {
            this.$message.error(err)
          })    
      } else {
        this.units = [];
      }
    },
    enterdwxz () {
      this.units1 = this.units
    },
    remoteMethod(query) {
      if (query !== '') {
        this.selectloading = true;
        this.units1 = this.units.filter(d => {
          if (d.ZZJGDM) {
            return d.ZZJGDM.indexOf(query) > -1 || d.DWMC.indexOf(query) > -1
          } else {
            return  d.DWMC.indexOf(query) > -1
          }
        })
        this.selectloading = false;
      } else {
        this.units1 = this.units
      }
    },
    remoteMethod_bak(query) {
      if (query !== '') {
        this.selectloading = true;
        this.$axiosClient.call('JCXXPTBASEUNITGETUNITLIST', 'get', {where: "zzjgdm like '%" + query + "%' or dwmc like '%" + query + "%'"})
          .then((res) => {
            if (res.status === 1) {
              this.units = res.data
            } else {
              this.$message.error(res.msg)
            }
            this.selectloading = false
          })
          .catch(err=> {
            this.$message.error(err)
            this.selectloading = false
          })    
      } else {
        this.units = [];
      }
    },
    unitbind () {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  
        this.loading = true  
        this.$axiosClient.call('JCXXPTBASEVEHBINDUNIT', 'POST', {xh: this.myvalue.vehxh, qybh: this.qybh})
          .then((res) => {
            if (res.status) {
              this.myvalue.qybh = this.qybh
              this.$message('关联成功')
            }　else {
              this.$message('关联失败')              
            }
            this.loading = false            
          })
          .catch(err => {
            this.$message(err)
            this.loading = false  
          })
      })
    },
    onqxgk () {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true  
        this.$axiosClient.call('JCXXPTBASEVEHUNBINDUNIT', 'POST', {xh: this.value.vehxh})
          .then((res) => {
            if (res.status) {
              this.unit = {}
              this.myvalue.qybh = 'personal'
              this.$message('取消成功')
            }　else {
              this.$message('取消失败')
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
