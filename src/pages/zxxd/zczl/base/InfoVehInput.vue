<template>
  <div
    v-watermark:[showmark] ="{text:'未登记',textColor:'rgba(255,0,0,0.2)'}"
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"
    style="height:400px;"
    >
    <el-row>
        <el-col :span="24">
          <el-form :model="veh"  label-suffix=":"   status-icon ref="ruleForm"  label-width="120px" size="medium"   class="demo-ruleForm">
              <el-row>
              <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                  <el-form-item label="号牌号码">
                      <el-input v-model="veh.HPHM"  :readonly="true"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                  <el-form-item label="号牌种类">
                      <el-input :value="code2cn(veh.HPZL, 'hpzl')" ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                  <el-form-item label="车辆类型">
                      <el-input :value="code2cn(veh.CLLX, 'cllx')"  placeholder="-"  ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                  <el-form-item label="使用性质">
                      <el-input :value="code2cn(veh.SYXZ, 'syxz')"  placeholder="-"  ></el-input>
                  </el-form-item>
              </el-col>
              </el-row>
              <el-row>
              <el-col :span="12">
                  <el-form-item label="机动车所有人">
                      <el-input v-model="veh.SYR"  placeholder="-"  :readonly="true"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="登记住所">
                      <el-badge :value="code2cn(veh.ZSXZQH, 'xzqh', false)" class="item" type="primary"  style="width:90%;">
                          <el-input v-model="veh.ZSXXDZ"  placeholder="-"  :readonly="true" ></el-input>
                      </el-badge>
                  </el-form-item>
              </el-col>
              </el-row>
              <el-row>
              <el-col :span="6">
                  <el-form-item :label="veh.SFZMMC === 'A' ? '身份证明号码' : '组织机构代码'">
                      <el-badge :value="veh.SFZMMC === 'A' ? '个体' : '企业'" class="item" :type="veh.SFZMMC === 'A' ? 'primary' : 'warning'">
                      <el-input v-model="veh.SFZMHM"  placeholder="-"  :readonly="true" ></el-input>
                      </el-badge>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="联系方式1">
                      <el-input v-model="veh.LXDH"  placeholder="-"  :readonly="true"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-form-item label="联系方式2">
                      <el-input v-model="veh.SJHM"  placeholder="-"  :readonly="true"></el-input>
                  </el-form-item>
              </el-col>
              </el-row>
          </el-form>                    
        </el-col>
    </el-row>
    <el-row type="flex" justify="center">
        <el-form>
            <el-col :span="6">
                <el-form-item>
                <el-button v-if="source !== 'jcxxpt'" type="primary" plain icon="el-icon-edit-outline" @click="onVehAdd">车辆登记</el-button>
                </el-form-item>
            </el-col>
        </el-form>
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
      veh: {},
      vehdb: {},
      source: '',
      loading: false
    }
  },
  computed: {
    showmark () {
      return this.source !== 'jcxxpt'
    }
  },
  watch: {
    value:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.myvalue = this.value
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
    this.myvalue = this.value
    this.getveh(this.value)
  },
  methods: {
    getveh (params) {
      this.loading = true
      this.veh = {}
      this.$axiosClient.call('JCXXPTBASEVEHGETVEH', 'get', params)
        .then((res) => {
          if (res.status === 1) {
            this.veh = res.data || {}
            this.veh.HPHM = this.value.hphm
            this.vehdb = res.data1 || {}
            this.source = res.source
            this.myvalue.vehsource = this.source
            this.myvalue.vehxh = this.veh.XH
            this.myvalue.qybh = this.veh.QYBH || ''
            this.myvalue.sfzmmc = this.veh.SFZMMC
            this.myvalue.sfzmhm = this.veh.SFZMHM
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
    onVehAdd () {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {        
      this.loading = true
        this.$axiosClient.call('JCXXPTBASEVEHADD', 'POST', this.vehdb)
            .then((res) => {
            if (res.status) {
                this.myvalue.vehsource = 'jcxxpt'
                this.source = 'jcxxpt'
                this.$message('登记成功')
            }　else {
                this.$message('登记失败')              
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
