<template>
  <div
    v-watermark1:[markinfo] ="{text:'未登记',textColor:'rgba(180, 180, 180, 0.5)'}"
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"    
    style="margin-top:10px;"
    :style="{height:winh}"
    >
    <el-row :gutter="10">
      <el-col :span="16">
        <el-form :model="drv"  label-suffix=":"   status-icon ref="ruleForm"  label-width="8.66rem" size="medium"   class="demo-ruleForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="姓 名">
                        <el-badge :value="drv.XB ? ((drv.XB === '1' ? '男  ' : '女  ') + dateformat(drv.CSRQ, 'yyyy-MM-dd')) : ''" class="item">
                            <el-input v-model="drv.XM"  :readonly="true"></el-input>
                        </el-badge>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身份证明号码">
                        <el-input v-model="drv.SFZMHM"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="档案编号">
                        <el-input v-model="drv.DABH"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="驾证期限">
                        <el-input v-model="drv.JZQX"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有效期始">
                        <el-input :value="dateformat(drv.YXQS, 'yyyy-MM-dd')"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="有效期止">
                        <el-input :value="dateformat(drv.YXQZ, 'yyyy-MM-dd')"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="证芯编号">
                        <el-input v-model="drv.ZXBH"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="初次领证日期">
                        <el-input :value="dateformat(drv.CCLZRQ, 'yyyy-MM-dd')"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="下次体检日期">
                        <el-input :value="dateformat(drv.SYRQ, 'yyyy-MM-dd')"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="累积记分">
                        <el-input v-model="drv.LJJF"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="清分日期">
                        <el-input :value="dateformat(drv.QFRQ, 'yyyy-MM-dd')"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="当前状态">
                        <el-input :value="drv.ZT"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="住所地址">
                        <el-input v-model="drv.DJZSXXDZ"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话">
                        <el-input :value="drv.LXDH"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手机号码">
                        <el-input :value="drv.SJHM"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="驾校名称">
                        <el-input v-model="drv.JXMC"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="发证机关">
                        <el-input :value="drv.FZJG"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="准驾车型">
                        <el-input :value="drv.ZJCX"  :readonly="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <el-table
              :data="tabdata"
              :show-header="true"                   
              border
              style="width: 100%">
              <el-table-column
              prop=""
              label="关联车辆"
              width="150"
              show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="vehmore(scope.row)">
                    {{scope.row.HPHM + ":" + code2cn(scope.row.HPZL, 'hpzl')}}
                  </el-button>
                </template>              
              </el-table-column>
              <el-table-column
              prop=""
              label="车辆所属单位"
              show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-button type="text"  @click="unitmore(scope.row)">
                    {{scope.row.DWMC}}
                  </el-button>
                </template>              
              </el-table-column>
          </el-table>          
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'default',
  props: {
    // 此处一定要用value,实现v-model
    initdata: {
      type: Object,
      default: () => {
        sfzmhm: null
      }
    }
  },  
  data: () => {
    return {
      drv: {},
      tabdata: [],
      source: '',
      markinfo: '',
      loading: false
    }
  },
  created () {
    if (this.initdata.drv) {
      this.drv = this.initdata.drv
      this.source = this.initdata.source
      this.getdrv2veh2unit({ sfzmhm: this.initdata.drv.SFZMHM})  
      this.markinfo = `${this.initdata.drv.XM}: ${this.initdata.drv.SFZMHM}`     
    } else {
      this.getdrv(this.initdata)
      this.getdrv2veh2unit(this.initdata)
    }
  },
  computed: {
    showmark () {
      return this.source !== 'jcxxpt'
    },         
    code2cn () {
      return function(code, lx) {
        let i = this._code.findIndex(d => d.LX === lx && d.CODE === code)
        if (i > -1) {
          return this._code[i].VAL
        } else {
          return code
        }
      }
    },
    winh () {
      return (window.innerHeight - 110) + 'px'
    }
  },
  watch: {
    initdata:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          if (val.drv) {
            this.drv = val.drv
            this.source = val.source
            this.getdrv2veh2unit({ sfzmhm: val.drv.SFZMHM})              
          } else {
             this.getdrv(val)
             this.getdrv2veh2unit(val)
          }
        } 
      },
      deep:true
    }
  },
  methods: {
    getdrv (params) {
      this.loading = true
      this.drv = {}
      this.$axiosClient.call('jcxxpt/drv/getdrv', 'get', params)
        .then((res) => {
          if (res.status === 1) {
            this.drv = res.data || {}
            this.source = res.source
            this.markinfo = `${this.drv.XM}: ${this.drv.SFZMHM}`              
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
    getdrv2veh2unit (params) {
      this.loading = true
      this.$axiosClient.call('jcxxpt/drv/getdrv2veh2unit', 'get', params)
        .then((res) => {
          if (res.status === 1) {
            this.tabdata = res.data
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
    unitmore (row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000065318',
        initdata: {
          qybh: row.QYBH
        }
      })
    },
    vehmore (row) {
      this.$EventBus.$emit('main', {
        key: 'opennew',
        viewid: '000000065602',
          initdata: {
            xh: row.VEHXH,
            hphm: row.HPHM,
            hpzl: row.HPZL,
            source: 'jcxxpt'
          }
        })
    }
  }
}
</script>
<style scoped>
</style>
