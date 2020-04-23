<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"
    style="margin-top:10px;">
    <el-row>
        <el-col :span="24">
          <el-form :inline="true"  label-width="6rem" label-suffix=":">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="号牌种类">
                        <el-select v-model="form.hpzl" placeholder="请选择" >
                            <el-option
                            v-for="item in codefilter('hpzl')"
                            :key="item.CODE"
                            :label="item.CODE+': '+ item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="号牌号码">
                        <el-input v-model="hphmToUp" placeholder="号牌号码" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item >
                        <el-button type="primary"  icon="el-icon-s-cooperation" @click="getveh">调取车管信息</el-button>
                        <el-checkbox v-show="toComData.veh.SFZMMC === 'A'&&(!vehnotok)&&(!isgl)" v-model="isgk">挂靠</el-checkbox>
                        <el-select
                          v-if="(!vehnotok)&&(!isgl)&&isgk"
                          v-model="qybh"
                          filterable
                          remote
                          clearable
                          reserve-keyword
                          placeholder="请输入组织机构代码或单位名的关键部分搜索"
                          :remote-method="remoteMethod"
                          :loading="selectloading"
                          style="width:300px;">
                          <el-option
                            v-for="item in units"
                            :key="item.QYBH"
                            :label="item.ZZJGDM + ': ' + item.DWMC"
                            :value="item.QYBH">
                          </el-option>  
                        </el-select>                                              
                        <el-button  plain  icon="el-icon-download" :disabled="adddisabled" @click="addvehsave">添加车辆</el-button>       
                    </el-form-item>
                </el-col>
            </el-row>
          </el-form>
        </el-col>
    </el-row>
    <el-row v-if="toComData.hphm">
      <el-col style="color:red;">
        {{vehnotok ? '车辆不存在' : ''}}&nbsp;&nbsp;{{isgl ? '车辆已被关联' : ''}}&nbsp;&nbsp;{{(!vehnotok)&&(!isgl)&&gknodw ? '必须选择关连单位' : ''}}
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
</template>

<script>
import vehshowbase from './vehshowbase'
export default {
  name: 'default',
  components: {
    vehshowbase: vehshowbase
  },
  data: () => {
    return {
      isgk: true,
      qybh: '',
      units: [],
      form: {
        hphm: '川D',
        hpzl: '01'
      },
      toComData: {
        hphm: '',
        veh: {},
        vehdb: {},
        source: 'jcxxpt'
      },
      loading: false,
      selectloading: false
    }
  },
  computed: {
    hphmToUp : {
      get: function(){
        return this.form.hphm
      },
      set : function(val){
        this.form.hphm = val.toUpperCase();
      }
    },
    vehnotok () {
      let vehnotok = this.toComData.veh.XH  ? false : true //车辆不存在
      return vehnotok
    },
    isgl () {
      let isgl = this.toComData.veh.QYBH ? true : false  //车辆已被关联
      return isgl
    },
    gknodw () {
      let a = this.isgk ? (this.qybh ? false : true) : false //挂靠但没选单位
      return a
    },
    adddisabled () {
      //let t = this.toComData.hphm ? ( (this.toComData.veh.XH ? false : true)|| (this.toComData.veh.QYBH ? true : false) ) : true
      return this.vehnotok || this.isgl || this.gknodw
    }
  },
  watch: {
    'form':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.isgk = true
        this.qybh = ''
        this.toComData.hphm = ''
        this.toComData.veh = {}
        this.toComData.vehdb = {}
        this.toComData.source = 'jcxxpt'
      },
      deep:true
    },
    isgk () {
      this.qybh = ''
    }
  },
  methods: {
    getveh () {
      this.loading = true
      this.isgk = true
      this.qybh = ''
      this.toComData.hphm = this.form.hphm
      this.toComData.veh = {}
      this.toComData.vehdb = {}      
      this.toComData.source = 'jcxxpt'
      this.$axiosClient.call('jcxxpt/veh/getveh', 'get', this.form)
        .then((res) => {
          if (res.status === 1) {
            this.toComData.veh = res.data || {}
            this.toComData.vehdb = res.data1 || {} 
            this.toComData.source = res.source
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
    addvehsave () {
      this.loading = true
      // 如果XH正常且source = 'jcxxpt',yqbh为null说明车辆已经在本地存在,只是作单位关联
      let methodname = this.toComData.source === 'jcxxpt' ? 'jcxxpt/veh/bindunit' : 'jcxxpt/veh/add'
      let params =  this.toComData.source === 'jcxxpt' ? {xh: this.toComData.veh.XH, qybh: this.qybh} : Object.assign({}, this.toComData.vehdb, {QYBH:  this.qybh })
      this.$axiosClient.call(methodname, 'POST', params)
        .then((res) => {
          if (res.status) {
            this.$message('登记成功')
            this.dialog = false
            this.$EventBus.$emit('jcxxpt-veh-veheditall', {
              key: 'vehaddok',
              veh: this.toComData.veh,
              hphm: this.form.hphm
            })
          }　else {
            this.$message('登记失败')              
          }
          this.loading = false            
        })
        .catch(err => {
          this.$message(err)
          this.loading = false  
        })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.selectloading = true;
        this.$axiosClient.call('jcxxpt/unit/getunitlist', 'get', {where: "zzjgdm like '%" + query + "%' or dwmc like '%" + query + "%'"})
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
    }    
  }
}
</script>
<style scoped>

</style>
