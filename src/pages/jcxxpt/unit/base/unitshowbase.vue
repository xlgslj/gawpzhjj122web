<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
    <el-row>
        <el-col :span="24">
            <el-form :model="unit"  label-suffix=":"   status-icon ref="ruleForm"  label-width="140px" size="medium"   class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="组织机构代码">
                            <el-input v-model="unit.ZZJGDM"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单位名称">
                            <el-input v-model="unit.DWMC"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="单位简称">
                            <el-input v-model="unit.DWJC"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="重点对象类型">
                            <el-input :value="code2cn(unit.ZDDXLX, 'dwlx')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="行政区划">
                            <el-input :value="code2cn(unit.XZQH, 'xzqh')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="运输许可证号">
                            <el-input v-model="unit.YSXKZH"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发证日期">
                            <el-input v-model="unit.FZRQ"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业地址">
                            <el-input v-model="unit.DWDD"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="单位联系电话">
                            <el-input v-model="unit.DWLXDH"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="企业电子邮箱">
                            <el-input v-model="unit.DWDZYX"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="法人代表">
                            <el-input v-model="unit.FR"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证明号码">
                            <el-input v-model="unit.FRSFZMHM"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                            <el-row>
                                <el-col :span="11">
                                    <el-input v-model="unit.FRLXDH"  :readonly="true"></el-input>
                                </el-col>
                                <el-col :span="1">
                                    /
                                </el-col>
                                <el-col :span="12">
                                    <el-input v-model="unit.FRSJHM"  :readonly="true"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="主要负责人">
                            <el-input v-model="unit.GLLXR"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证明号码">
                            <el-input v-model="unit.GLSFZMHM"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                            <el-row>
                                <el-col :span="11">
                                    <el-input v-model="unit.GLLXDH"  :readonly="true"></el-input>
                                </el-col>
                                <el-col :span="1">
                                    /
                                </el-col>
                                <el-col :span="12">
                                    <el-input v-model="unit.GLSJHM"  :readonly="true"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="部门责任人">
                            <el-input v-model="unit.BMFZR"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证明号码">
                            <el-input v-model="unit.BMSFZMHM"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                            <el-row>
                                <el-col :span="11">
                                    <el-input v-model="unit.BMYDDH"  :readonly="true"></el-input>
                                </el-col>
                                <el-col :span="1">
                                    /
                                </el-col>
                                <el-col :span="12">
                                    <el-input v-model="unit.BMGDDH"  :readonly="true"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="安全管理人">
                            <el-input v-model="unit.AQFZR"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证明号码">
                            <el-input v-model="unit.AQFZRSFZMHM"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                            <el-row>
                                <el-col :span="11">
                                    <el-input v-model="unit.AQFZRYDDH"  :readonly="true"></el-input>
                                </el-col>
                                <el-col :span="1">
                                    /
                                </el-col>
                                <el-col :span="12">
                                    <el-input v-model="unit.AQFZRGDDH"  :readonly="true"></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="所属部门">
                            <el-input :value="code2cn(unit.GLBM, 'cjjg')"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="6">
                        <el-form-item label="责任民警 ">
                            <el-input v-model="unit.JYXM"  :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备 注">
                            <el-input :value="unit.BZ"  :readonly="true"></el-input>
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
        qybh: null
      }
    }
  },  
  data: () => {
    return {
      unit: {},
      loading: false
    }
  },
  created () {
    this.getunit(this.initdata.qybh)
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
    }
  },
  watch: {
    'initdata.qybh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          this.getunit(val)
        } 
      },
      deep:true
    }
  },
  methods: {
    getunit (qybh) {
      this.loading = true
      this.unit = {}
      axiosClient.call('jcxxpt/unit/getunit', 'get', {qybh: qybh})
        .then((res) => {
          if (res.status === 1) {
            this.unit = res.data
            this.$EventBus.$emit('jcxxpt-unit-unitshowall', {
                key: 'unitgetok',
                unit: res.data
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
