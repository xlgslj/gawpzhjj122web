<template>
  <div
    v-watermark:[showmark] ="{text:'未登记',textColor:'rgba(255,0,0,0.2)'}"
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;"
    >
    <el-row>
        <el-col :span="24">
            <el-form :model="veh"  label-suffix=":"   status-icon ref="ruleForm"  label-width="8.66rem" size="medium"   class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="号牌种类">
                            <el-input :value="code2cn(veh.HPZL, 'hpzl')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="号牌号码">
                            <el-input v-model="initdata.hphm"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证明号码">
                            <el-input v-model="veh.SFZMHM"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="中文品牌">
                            <el-input v-model="veh.CLPP1"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车辆型号">
                            <el-input v-model="veh.CLXH" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车辆类型">
                            <el-input :value="code2cn(veh.CLLX, 'cllx')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="车辆识别代号">
                            <el-input v-model="veh.CLSBDH"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发动机号">
                            <el-input v-model="veh.FDJH"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="车身颜色">
                            <el-input v-model="veh.CSYS"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="使用性质">
                            <el-input :value="code2cn(veh.SYXZ, 'syxz')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="初次登记日期">
                            <el-input :value="dataformat(veh.CCDJRQ, 'T')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="强制报废期止">
                            <el-input :value="dataformat(veh.QZBFQZ, 'T')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="核定载质量">
                            <el-input v-model="veh.HDZZL"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="核定载客">
                            <el-input :value="veh.HDZK||0"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="驾驶室载客">
                            <el-input :value="(veh.QPZK||0) + '(前)' + (veh.HPZK||0) + '(后)'"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="总 质 量">
                            <el-input v-model="veh.ZZL"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="机动车状态">
                            <el-input :value="veh.ZT"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="检验有效期止">
                            <el-input :value="dataformat(veh.YXQZ, 'T')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="保险终止日期">
                            <el-input :value="dataformat(veh.BXZZRQ, 'T')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="机动车所有人">
                            <el-input v-model="veh.SYR"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所有人登记住所">
                            <el-input v-model="veh.ZSXXDZ"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import * as axiosClient from '../../../../common/axiosClient'
export default {
  name: 'default',
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
      veh: {},
      source: '',
      loading: false
    }
  },
  created () {
    if (this.initdata.veh) {
      this.veh = this.initdata.veh
      this.source = this.initdata.source
    } else {
      this.getveh(this.initdata)
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
    dataformat () {
      return function (v, sp) {
        try {
          let d = v.split(sp)
          if (d.length > 0) return d[0]
          else return v
        } catch (e) {
          return v
        }
      }
    },
    showmark () {
      return this.source !== 'jcxxpt'
    },
    tabh () {
      return (window.innerHeight - 110) + 'px'
    }
  },
  watch: {
    initdata:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          if (val.veh) {
            this.veh = val.veh
            this.source = val.source
          } else {
             this.getveh(val)
          }
        } 
      },
      deep:true
    }
  },
  methods: {
    getveh (params) {
      this.loading = true
      this.veh = {}
      axiosClient.call('jcxxpt/veh/getveh', 'get', params)
        .then((res) => {
          if (res.status === 1) {
            this.veh = res.data || {}
            this.source = res.source
            this.$EventBus.$emit('jcxxpt-veh-vehshowall', {
              key: 'vehgetok',
              veh: this.veh
            })
          } else {
            this.$message.error(res.msg)
          }
          this.loading = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>

</style>
