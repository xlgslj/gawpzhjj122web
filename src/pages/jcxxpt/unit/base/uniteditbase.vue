<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;">
    <el-row>
        <el-col :span="24">
            <el-form :model="unit"  label-suffix=":" :rules="rules" ref="ruleForm"  status-icon  label-width="140px" size="medium"   class="demo-ruleForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="组织机构代码" prop="ZZJGDM">
                            <el-input v-model="unit.ZZJGDM"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单位名称" prop="DWMC">
                            <el-input v-model="unit.DWMC"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="单位简称">
                            <el-input v-model="unit.DWJC"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="重点对象类型" prop="ZDDXLX">
                            <el-select v-model="unit.ZDDXLX" placeholder="请选择"  clearable>
                                <el-option
                                v-for="item in codefilter('dwlx')"
                                :key="item.CODE"
                                :label="item.CODE+': '+ item.VAL"
                                :value="item.CODE">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="营运类型" prop="DWXZ">
                            <el-select v-model="unit.DWXZ" multiple placeholder="请选择"  clearable>
                                <el-option
                                v-for="item in codefilter('vehyylx')"
                                :key="item.CODE"
                                :label="item.CODE+': '+ item.VAL"
                                :value="item.CODE">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="运输许可证号">
                            <el-input v-model="unit.YSXKZH"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发证日期">
                            <el-input v-model="unit.FZRQ"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业地址"  prop="DWDD">
                            <el-input v-model="unit.DWDD"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="行政区划" prop="XZQH">
                            <el-select v-model="unit.XZQH" placeholder="请选择"  clearable>
                                <el-option
                                v-for="item in codefilter('xzqh')"
                                :key="item.CODE"
                                :label="item.CODE+': '+ item.VAL"
                                :value="item.CODE">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="单位联系电话"  prop="DWLXDH">
                            <el-input v-model="unit.DWLXDH"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="企业电子邮箱">
                            <el-input v-model="unit.DWDZYX"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="法人代表" prop="FR">
                            <el-input v-model="unit.FR"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证明号码">
                            <el-input v-model="unit.FRSFZMHM"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话"  prop="FRSJHM">
                            <el-row>
                                <el-col :span="11">
                                    <el-input v-model="unit.FRSJHM"  placeholder="手机" ></el-input>
                                </el-col>
                                <el-col :span="1">
                                    /
                                </el-col>
                                <el-col :span="12">
                                    <el-input v-model="unit.FRLXDH"  placeholder="固定电话" ></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="主要负责人" prop="GLLXR">
                            <el-input v-model="unit.GLLXR"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证明号码">
                            <el-input v-model="unit.GLSFZMHM"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话" prop="GLSJHM">
                            <el-row>
                                <el-col :span="11">
                                    <el-input v-model="unit.GLSJHM"  placeholder="手机" ></el-input>
                                </el-col>
                                <el-col :span="1">
                                    /
                                </el-col>
                                <el-col :span="12">
                                    <el-input v-model="unit.GLLXDH"  placeholder="固定电话" ></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="部门责任人" prop="BMFZR">
                            <el-autocomplete v-model="unit.BMFZR"
                            class="inline-input"
                            :fetch-suggestions="querySearch"
                            placeholder="部门责任人"
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证明号码">
                            <el-input v-model="unit.BMSFZMHM"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话"  prop="BMGDDH">
                            <el-row>
                                <el-col :span="12">
                                  <el-autocomplete v-model="unit.BMGDDH"
                                  class="inline-input"
                                  :fetch-suggestions="querySearch"
                                  placeholder="手机"
                                  ></el-autocomplete>
                                </el-col>
                                <el-col :span="1">
                                    /
                                </el-col>
                                <el-col :span="11">
                                    <el-input v-model="unit.BMYDDH"  placeholder="固定电话" ></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="安全管理人" prop="AQFZR">
                            <el-autocomplete v-model="unit.AQFZR"
                            class="inline-input"
                            :fetch-suggestions="querySearch"
                            placeholder="安全管理人"
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="身份证明号码">
                            <el-input v-model="unit.AQFZRSFZMHM"  ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话" prop="AQFZRGDDH">
                            <el-row>
                                <el-col :span="12">
                                  <el-autocomplete v-model="unit.AQFZRGDDH"
                                  class="inline-input"
                                  :fetch-suggestions="querySearch"
                                  placeholder="手机"
                                  ></el-autocomplete>
                                </el-col>
                                <el-col :span="1">
                                    /
                                </el-col>
                                <el-col :span="11">                                 
                                    <el-input v-model="unit.AQFZRYDDH"  placeholder="固定电话" ></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="所属部门" prop="GLBM">
                            <el-select v-model="unit.GLBM" placeholder="请选择"  clearable>
                                <el-option
                                v-for="item in codefilter('cjjg')"
                                :key="item.CODE"
                                :label="item.CODE+': '+ item.VAL"
                                :value="item.CODE">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="6">
                        <el-form-item label="责任民警" prop="JYXM">
                            <el-select v-model="unit.JYXM" filterable placeholder="请选择">
                                <el-option
                                v-for="item in bmpolice"
                                :key="item.XH"
                                :label="item.XM"
                                :value="item.XM">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备 注">
                            <el-input :value="unit.BZ"  ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        &nbsp;
                    </el-col>
                    <el-col :span="6">
                        <el-form-item >
                            <el-button type="primary"  icon="el-icon-successh" @click="save('ruleForm')">{{unit.QYBH ? '修改' : '新增'}}</el-button>
                            <el-button v-if="1>3" plain  icon="el-icon-back" @click="closepage">关闭</el-button>       
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
  </div>
</template>

<script>
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
  data: function () {
    let self = this
    let validateZzjgdm = (rule, value, callback) => {
      if (!value) callback(new Error('不能为空'))
      axiosClient.call('jcxxpt/unit/isexit', 'get', {where: 'zzjgdm=\'' + value + '\''})
        .then((res) => {
          if (res.status === 1) {
            if (res.data) {
              if (res.data.QYBH === self.unit.QYBH) callback() 
              else callback(new Error('单位已存在'))
            } else {
              callback()             
            }
          } else {
            callback(new Error(res.msg))
          }
        })
        .catch(err=> {
          callback(new Error(err))
        })
    }
    let validateSelect =  (rule, value, callback) => {
      if (!value) callback(new Error('不能为空'))
    }    
    return {
      unit: {},
      polices: [],
      rules: {
        ZZJGDM: [
          { validator: validateZzjgdm, trigger: 'blur' }
        ],
        DWMC: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        ZDDXLX: [
          {required: true, message: '请选择重点对象类型', trigger: 'change' }
        ],
        DWXZ: [
          {type: 'array', required: true, message: '请选择至少一个营运类型', trigger: 'change' }
        ],
        DWDD: [
          { required: true, message: '请输入企业地址', trigger: 'blur' }
        ],
        XZQH: [
          {required: true, message: '请选择行政区划', trigger: 'change' }
        ],
        DWLXDH: [
          { required: true, message: '请输入单位联系电话', trigger: 'blur' }
        ],
        FR: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        FRSJHM: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        GLLXR: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        GLSJHM: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        BMFZR: [
          { required: true, message: '请输入姓名', trigger: ['blur','change'] }
        ],
        BMGDDH: [
          { required: true, message: '请输入联系电话', trigger: ['blur','change'] }
        ],
        AQFZR: [
          { required: true, message: '请输入姓名', trigger: ['blur','change'] }
        ],
        AQFZRGDDH: [
          { required: true, message: '请输入联系电话', trigger: ['blur','change']}
        ],
        GLBM: [
          {required: true, message: '请选择管理部门', trigger: 'change' }
        ],
        JYXM: [
          {required: true, message: '请选择责任民警', trigger: 'change' }
        ]

      },
      loading: false
    }
  },
  created () {
    this.getpolice()
    if (this.initdata.qybh !== 'NewQybh') {
      this.getunit(this.initdata.qybh)
    }
  },
  computed: {
    bmpolice () {
      return this.polices.filter(d => d.BMDM.substr(0,6) === (this.unit.GLBM || 'xxxxxxxxxx').substr(0,6))
    }
  },
  watch: {
    'initdata.qybh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val === 'NewQybh') {
          this.unit = {}
        } else {
          if (this.unit.QYBH !== val) {
            this.getunit(val)
          }
        }
      },
      deep:true
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var results = [{
        value: '无'
      }]
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    closepage () {
      this.$EventBus.$emit('main', {
        key: 'closepage',
        viewid: '000000066246',
        initdata: {}
      })
    },
    getpolice () {
      this.$axiosClient.call('pub/trff/getpolice', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.polices = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err=> {
          this.$message.error(err)
        })
    },
    getunit (qybh) {
      this.loading = true
      this.unit = {}
      axiosClient.call('jcxxpt/unit/getunit', 'get', {qybh: qybh})
        .then((res) => {
          if (res.status === 1) {
            this.unit = {...res.data, DWXZ: res.data.DWXZ ? res.data.DWXZ.split('') : []}
            this.$EventBus.$emit('JcxxptUnitBaseUnitEditAll', {
              key: 'unitgetok',
              unit: this.unit
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
    },
    save (formName) {
      if (this.unit.QYBH) this.update(formName)
      else this.add(formName)
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {

          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.loading = true
              let u = {unit: {...this.unit ,DWXZ: this.unit.DWXZ.join('')}, where: 'qybh =\'' + this.unit.QYBH + "\'"}
              this.$axiosClient.call('jcxxpt/unit/unitupdate', 'post', u)
                .then((res) => {
                if (res.status === 1) {
                  this.$message('修改成功')
                  this.$EventBus.$emit('JcxxptUnitBaseUnitEditAll', {
                    key: 'unitgetok',
                    unit: this.unit
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
          })
        }
      }) 
    },
    add (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {

          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.loading = true
              let u = Object.assign({}, this.unit, {DWXZ: this.unit.DWXZ.join('')})
              this.$axiosClient.call('jcxxpt/unit/unitadd', 'post', u)
                .then((res) => {
                if (res.status === 1) {
                  this.$message('新增成功')
                  this.unit.QYBH = res.data
                  this.$EventBus.$emit('JcxxptUnitBaseUnitEditAll', {
                    key: 'unitadd',
                    qybh: res.data
                  })
                  this.$EventBus.$emit('JcxxptUnitBaseUnitEditAll', {
                    key: 'unitgetok',
                    unit: this.unit
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
          })
        }
      })        
    }
  }
}
</script>
<style scoped>
.el-form-item {
    margin-bottom: 0.5rem;
}
</style>
