<template>
    <div
      v-loading.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"    
    >
       <el-row>
            <el-col :span="24">
                <el-tabs type="border-card" style="height: 500px;" @tab-click="tabclick">
                  <el-tab-pane :label="'车辆基本信息(' + (addinfo.vehsource === 'pzhjj' ? '已登记)' : '未登记)')">
                    <el-row>
                      <el-col :span="24">
                        <el-form :model="veh"  label-suffix=":"   status-icon ref="ruleForm"  label-width="120px" size="medium"   class="demo-ruleForm">
                          <el-row>
                            <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                                <el-form-item label="号牌号码">
                                    <el-input v-model="hphm"  :readonly="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                                <el-form-item label="号牌种类">
                                    <el-input v-model="hpzlname" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                                <el-form-item label="车辆类型">
                                    <el-input v-model="cllxname"  placeholder="-"  ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
                                <el-form-item label="使用性质">
                                    <el-input v-model="syxzname"  placeholder="-"  ></el-input>
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
                                    <el-badge :value="vehxzqh" class="item" type="primary"  style="width:90%;">
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
                            <el-button v-if="addinfo.vehsource === 'trff'"  type="primary" plain icon="el-icon-edit-outline" @click="onVehAdd()">车辆登记</el-button>
                          </el-form-item>
                        </el-col>
                      </el-form>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane :label="(veh.SFZMMC === 'A' ? '挂靠' : '') + '单位信息(' +(addinfo.unithas ? '存在' : '不存在') +',' + (addinfo.unitbind ? '已关联' : '未关联') +')'">
                    <el-row>
                      <el-col :span="24">
                        <el-form :model="veh"  label-suffix=":"   status-icon ref="ruleForm"  label-width="120px" size="medium"   class="demo-ruleForm">
                          <el-row>
                            <el-col :span="6">
                                <el-form-item label="单位名称">
                                    <el-input v-model="unit.DWMC"  placeholder="点击图标选择单位"  :readonly="true">
                                      <i slot="suffix" class="el-input__icon el-icon-date" @click="unitschose"></i>
                                    </el-input>
                                </el-form-item>
                            </el-col>                            
                            <el-col :span="6">
                                <el-form-item label="组织机构代码">
                                    <el-badge v-if="veh.SFZMMC !== 'A'" :value="veh.SFZMHM === unit.ZZJGDM ? '相符' : '不相符'" class="item" type="primary"  style="width:90%;">
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
                                    <el-badge :value="unitxzqh" class="item" type="primary" style="width:90%;">
                                      <el-input v-model="unit.DWDD"  placeholder="-"  :readonly="true" ></el-input>
                                    </el-badge>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="法人电话">
                                    <el-input v-model="unitfrlxfs"  placeholder="-"  :readonly="true"></el-input>
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
                        <el-checkbox v-if="veh.SFZMMC === 'A'" v-model="isgk">挂靠</el-checkbox>
                      </el-col>                      
                      <el-col :span="6">
                        <el-popover
                          v-if="isgk"
                          placement="left"
                          width="80%"
                          trigger="manual"
                          v-model="showunits">
                          <units lj="xlgslj" v-if="showunits" :pcom="'zxxd-zczl-vehinfo'"></units>
                          <el-button slot="reference" type="primary" plain :disabled="!(unit.DWMC && addinfo.vehsource ==='pzhjj')" @click="unitbind">关联单位</el-button>
                        </el-popover>
                        <el-button v-else type="primary" plain @click="onqxgk">保存</el-button>
                      </el-col>
                    </el-row>                                       
                  </el-tab-pane>
                  <el-tab-pane label="驾驶员信息">
                    <el-row>
                      <el-col :span="24">
                          <el-table
                            :data="drvs"
                            height="400"
                            border
                            style="width: 100%">
                            <el-table-column
                              prop="NO"
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
                        <el-form-item style="margin:0px;" v-if="formstatus.drvmode === 'normal'">
                          <el-button type="text" @click="indrvadd">新增</el-button>
                        </el-form-item>
                        <div
                         v-loading.lock="formstatus.drvmode==='pending'"
                         element-loading-text="处理中"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(0, 0, 0, 0.1)"  
                         v-if="formstatus.drvmode !== 'normal'">
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
                          <el-form-item v-if="formstatus.drvmode === 'querycompleted'">
                            <el-button type="success" icon="el-icon-top" circle size="mini" @click="adddrv"></el-button>
                          </el-form-item>
                        </div>
                      </el-form>                    
                    </el-row>                    
                  </el-tab-pane>
                  <el-tab-pane label="运输线路">
                    <el-row>
                      <el-col :span="24">
                        <el-col :span="12">
                          <el-row>
                            <el-table
                              ref="routetable"
                              :data="routes"
                              height="400"
                              border
                              @selection-change="handleSelectionChange"
                              style="width: 100%">
                              <el-table-column
                                type="selection"
                                width="55">
                              </el-table-column>                            
                              <el-table-column
                                prop="NAME"
                                label="名称"
                                width="150">
                              </el-table-column>
                              <el-table-column
                                prop="QD"
                                label="途经"
                                width="280">
                                <template slot-scope="scope">
                                  <i class="el-icon-s-unfold"></i>
                                  <span style="margin-left: 10px">{{ scope.row.QD + (scope.row.TJ1 ? (' -> ' + scope.row.TJ1) : '' ) + (scope.row.TJ2 ? (' -> ' + scope.row.TJ2) : '' ) + (scope.row.TJ3 ? (' -> ' + scope.row.TJ3) : '' ) + ' -> ' +scope.row.ZD}}</span>
                                </template>
                              </el-table-column>
                              <el-table-column
                                fixed="right"
                                width="100"
                                label="操作">
                                <template slot-scope="scope">
                                  <el-button  type="text" size="small"  @click="routeedit(scope.row)" >编辑</el-button>
                                  <el-button  type="text" size="small"  @click="routedel(scope.row)" >删除</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-row>
                          <el-row>
                            <el-col :span="24">
                              <el-popover
                                placement="right-end"
                                :width="winw*1"
                                v-model="vehrouteaddoredit"
                                trigger="manual">
                                <vehrouteadd v-if="vehrouteadd" :winh="winh*1 + 'px'" :vehxh="veh.XH" :pcom="'zxxd-zczl-vehinfo'"></vehrouteadd>
                                <vehrouteedit v-if="vehrouteedit" :routein="routein" :winh="winh*1 + 'px'" :vehxh="veh.XH" :pcom="'zxxd-zczl-vehinfo'"></vehrouteedit>
                                <el-button type="text"  slot="reference"  @click="openvehrouteadd">新增</el-button>
                              </el-popover>                                                
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col :span="12">
                          <routeshow v-if="showmap" style="margin-left:5px;" :routes="routeSelection"></routeshow>
                        </el-col>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
            </el-col>
       </el-row>
       <el-row style="margin-top:10px;">
         <el-col :span="20">
            <el-tag :type="vehistrue ? '' : 'danger'">车辆登记</el-tag>
            <el-tag :type="unitistrue ? '' : 'danger'">单位登记</el-tag>
            <el-tag :type="drvistrue ? '' : 'danger'">驾驶员登记</el-tag>
            <el-tag :type="routeistrue ? '' : 'danger'">线路登记</el-tag> 
         </el-col>
         <el-col :span="4">
           <el-form>
             <el-col :span="12">
              <el-form-item>
                 <el-button type="primary" :disabled="!(vehistrue && unitistrue && drvistrue && routeistrue)" icon="el-icon-edit-outline" @click="onsave()">采集完成</el-button>
              </el-form-item>
             </el-col>
           </el-form>
         </el-col>
       </el-row>
    </div>
</template>

<script>
import * as axiosClient from '../../../common/axiosClient'
import {mapState} from 'vuex'
import routeshow from '../../jcxxpt/components/routeshow'
import vehrouteadd from '../../jcxxpt/veh/base/vehrouteadd'
import vehrouteedit from '../../jcxxpt/veh/base/vehrouteedit'
import units from '../../jcxxpt/unit/base/unitselect'
import { EventBus } from '../../../common/event-bus.js'
export default {
  components: {
    'routeshow': routeshow,
    'vehrouteadd': vehrouteadd,
    'vehrouteedit': vehrouteedit,       
    'units': units
  },
  props: {
    // 此处一定要用value,实现v-model
    value: {
      type: Array,
      default: () => []
    },
    wfbh: {
      type: String,
      default: '30vh'
    },
    hphm: {
      type: String,
      default: undefined
    },
    hpzl: {
      type: String,
      default: undefined
    }
  },
  data: () => {
    return {
      formdata: {
        xh: 1
      },
      isgk: true, // 挂靠
      veh: {},
      vehdb : {},
      unit: {},
      drvs: [],
      routes: [],
      routeSelection: [],
      addinfo: {},
      showmap: false,
      vehrouteadd: false,
      vehrouteedit: false,
      routein: {},
      loading: true,
      showunits: false,
      drvaddform: {
        SFZMHM: ''
      },
      drvqueryall: {},
      formstatus: {
        drvmode: 'normal'
      }   
    }
  },
  watch: {
    isgk () {
      this.addinfo.unitbind = 0
      if (!this.unit.DWMC) {
        this.addinfo.unithas = 0
      }
    },
    'drvaddform.SFZMHM':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val !== oldVal) {
          this.formstatus.drvmode = 'waitinput'
          this.drvaddform.XM = ''
          this.drvaddform.ZJCX = ''
          this.drvaddform.SJHM = ''
        } 
      },
      deep:true
    }
  },
  computed: {
    ...mapState({
      _code: '_code',
    }),
    hpzlname () {
      if (this.veh.HPZL) {
        let i = this._code.findIndex(d => d.LX === 'hpzl' && d.CODE === this.veh.HPZL)
        if (i > -1) {
          return this.veh.HPZL + ':' + this._code[i].VAL
        } else {
          return this.veh.HPZL
        }
      }
    },
    cllxname () {
      if (this.veh.CLLX) {
        let i = this._code.findIndex(d => d.LX === 'cllx' && d.CODE === this.veh.CLLX)
        if (i > -1) {
          return this.veh.CLLX + ':' + this._code[i].VAL
        } else {
          return this.veh.CLLX
        }
      }
    },
    syxzname () {
      if (this.veh.SYXZ) {
        let i = this._code.findIndex(d => d.LX === 'syxz' && d.CODE === this.veh.SYXZ)
        if (i > -1) {
          return this.veh.SYXZ + ':' + this._code[i].VAL
        } else {
          return this.veh.SYXZ
        }
      }
    },
    vehxzqh () {
      if (this.veh.ZSXZQH) {
        let i = this._code.findIndex(d => d.LX === 'xzqh' && d.CODE === this.veh.ZSXZQH)
        if (i > -1) {
          return this._code[i].VAL
        } else {
          return this.veh.ZSXZQH
        }
      }
    },
    unitxzqh () {
      if (this.unit.XZQH) {
        let i = this._code.findIndex(d => d.LX === 'xzqh' && d.CODE === this.unit.XZQH)
        if (i > -1) {
          return this._code[i].VAL
        } else {
          return this.unit.XZQH
        }
      }
    },
    unitfrlxfs () {
      if (this.addinfo.unithas)  return this.unit.FRSJHM + ' / ' + this.unit.FRLXDH
    },
    vehrouteaddoredit: {
      get () {
       return this.vehrouteadd || this.vehrouteedit
      },
      set (v) {
        return
      }
    },
    vehistrue () {
      return this.addinfo.vehsource === 'pzhjj'
    },
    unitistrue () {
      return this.addinfo.unithas&&this.addinfo.unitbind
    },
    drvistrue () {
      return this.drvs.length > 0
    },
    routeistrue () {
      return this.routes.length > 0
    },
    winw () {
      return window.innerWidth
    },
    winh () {
      return window.innerHeight
    }
  },
  methods: {
    tabclick (obj) {
      if (obj.label === '运输线路') this.showmap = true
    },
    handleSelectionChange(val) {
      this.routeSelection = val;
    },
    onVehAdd () {
      this.loading = true
      axiosClient.call('JCXXPTBASEVEHADD', 'POST', this.vehdb)
        .then((res) => {
          if (res.status) {
            this.addinfo.vehsource = 'pzhjj'
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
    },
    unitbind () {
      this.loading = true  
      axiosClient.call('JCXXPTBASEVEHBINDUNIT', 'POST', {xh: this.veh.XH, qybh: this.unit.QYBH})
        .then((res) => {
          if (res.status) {
            this.addinfo.unithas = 1
            this.addinfo.unitbind = 1
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
    },
    unitschose () {
      if (this.isgk) {
        this.loading = true
        this.showunits = true
      } else {
        this.$message('非挂靠单位')         
      }

    },
    onqxgk () {
      this.loading = true  
      axiosClient.call('JCXXPTBASEVEHUNBINDUNIT', 'POST', {xh: this.veh.XH})
        .then((res) => {
          if (res.status) {
            this.addinfo.unithas = 1
            this.addinfo.unitbind = 1
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
    },
    indrvadd () {
      this.formstatus.drvmode='waitinput'
      this.drvaddform = {}
    },
    drvquery () {
      let i = this.drvs.findIndex(d => d.SFZMHM === this.drvaddform.SFZMHM)
      if (i > -1) {
        this.$message('该驾驶员已存在')       
      } else {
        this.formstatus.drvmode = 'pending'
        if (this.drvaddform.SFZMHM) {
          axiosClient.call('JCXXPTBASEDRVGETDRVFROMJCXXPTORTRFF', 'get', {sfzmhm: this.drvaddform.SFZMHM})
            .then((res) => {
              if (res.status) {
                this.drvqueryall = res.data
                this.drvaddform = res.data.drv
                this.formstatus.drvmode = 'querycompleted'              
              } else {
                this.$message('没有该驾驶员')
                this.formstatus.drvmode = 'waitinput'              
              }
            })        
            .catch(err => {
              this.$message(err)
              this.formstatus.drvmode = 'waitinput' 
          })        
        }
      }
    },
    adddrv () {
      let tasks = []
      tasks.push(axiosClient.call('JCXXPTBASEVEHBINDDRV', 'post', {sfzmhm: this.drvaddform.SFZMHM, xh: this.veh.XH}))
      if (this.drvqueryall.addinfo.drvsource === 'trff') tasks.push(axiosClient.call('JCXXPTBASEDRVADD', 'post', this.drvqueryall.drvdb))
      this.formstatus.drvmode = 'pending'
      Promise.all(tasks)
        .then((res) => {
          if (res[0].status || (tasks.length ===2 && res[0].status && res[1].status)) {
            this.drvs.push(Object.assign(this.drvaddform, {NO: (this.drvs.length + 1)}))
            this.formstatus.drvmode = 'normal' 
          } else {
            this.formstatus.drvmode = 'waitinput'           
          }
        })        
        .catch(err => {
          this.$message(err)
          this.formstatus.drvmode = 'waitinput' 
      })
    },
    drvdell (row) {
      this.loading = true
      axiosClient.call('JCXXPTBASEVEHUNBINDDRV', 'POST', {sfzmhm: row.SFZMHM, xh: this.veh.XH})
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
    },
    openvehrouteadd () {
      this.loading = true
      this.vehrouteadd = true
    },
    routeedit (row) {
      this.loading = true
      this.vehrouteedit = true
      this.routein = row
    },
    routedel (row) {
      this.$confirm('是否继续删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axiosClient.call('JCXXPTBASEVEHROUTEDEL', 'post', row)
          .then((res) => {
            if (res.status === 1) {
              this.$message('删除成功')
              let index = this.routes.findIndex(d => d.XH === row.XH)
              if (index >= 0) {
                this.routes.splice(index, 1) // 对于数组元素直接用 formdata1=source 将不能触发视图刷新
              }
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消')
      })
    },
    onsave () {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axiosClient.call('ZXXDZCZLZDCLXXCJCJWC', 'post', {wfbh: this.wfbh, qybh: this.isgk ? this.unit.QYBH : null, xh: this.veh.XH})
          .then((res) => {
            if (res.status === 1) {
              this.$message('采集成功')
              EventBus.$emit('zxxd-zczl-zdclxxcj', {
                key: 'vehinok',
                wfbh: this.wfbh
              })
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消')
      })
    },
    getdata () {
      let param = {
        hphm: this.hphm,
        hpzl: this.hpzl
      }
      axiosClient.call('ZXXDZCZLZDCLXXCJGETINFO', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.veh = res.data.veh
            this.vehdb = res.data.vehdb
            this.unit = res.data.unit
            this.drvs = res.data.drvs
            this.addinfo = res.data.addinfo
            this.routes = res.data.routes
            this.$emit('pubevents', {
              key: 'complete',
              k1: this.addinfo.vehsource === 'trff' ? '车辆信息(来源于公安同步库)' : '车辆信息(来源于本地库)'
            })
            this.$nextTick(() => {
              // 线路默认全选
              this.$refs.routetable.toggleAllSelection()
            })
          } else {
            this.$message.error(res.msg)
            this.$emit('pubevents', {
              key: 'complete',
              k1: '车辆信息(没有车辆信息)'}
            )
          }
          this.loading = false
        })
        .catch(err => {
          this.$message(err)
          this.loading = false  
        }) 
    },
    Ehandle (res) {
      switch(res.key) {
        case 'vehrouteaddclose' :
          this.vehrouteadd = false
          this.loading = false
          break;
        case 'vehrouteeditclose' :
          this.vehrouteedit = false
          this.loading = false
          break;
        case 'routeadd' :
          this.vehrouteadd = false
          this.loading = false
          this.routes.push(res.route)
          this.$refs.routetable.toggleRowSelection(res.route)
          break;
        case 'routeedit' :
          this.vehrouteedit = false
          this.loading = false
          let i = this.routes.findIndex(d => d.XH === res.route.XH)
          this.routes.splice(i, 1, res.route)
          this.$refs.routetable.toggleRowSelection(res.route)
          break;
        case 'unitchosed' :
          this.showunits = false
          this.loading = false
          this.unit = res.unit
          break;
        case 'unitclose' :
          this.showunits = false
          this.loading = false
          break;
        case 'addunit' :
          this.showunits = false
          this.loading = false
          break;
        case 'unitedit' :
          this.showunits = false
          this.loading = false
          break;          
        default:
          return;
      }
    }
  },
  created () {
    this.getdata()
  },
  mounted () {
    EventBus.$on('zxxd-zczl-vehinfo', this.Ehandle)
  },
  beforeDestroy () {
    EventBus.$off('zxxd-zczl-vehinfo', this.Ehandle)
  }
}
</script>
