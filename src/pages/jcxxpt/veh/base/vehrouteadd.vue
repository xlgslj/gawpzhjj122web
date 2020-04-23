<template>
  <div  style="width:100%;">
    <el-row>
      <el-col :span="20" style="position:relative;">
        <div ref="map" class="map" :style="{height: winh}">
        </div>
        <div class="mapcontrols" style="width:160px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <td :class="{active:mode === 'pan'}">
                  <i class="el-icon-delete"></i>
                  <el-button type="text" style="padding:0;" @click="clearall">清除/平移</el-button>
                </td>
                <td  :class="{active:mode === 'line'}">
                  <i class="el-icon-position"></i>
                  <el-button type="text" style="padding:0;" @click="draw">施划</el-button>
                </td>                
              </tr>
            </tbody>
          </table>
        </div>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card" style="margin-left:5px;">
          <div slot="header" class="clearfix">
            <span>添加路线</span>
          </div>
          <el-row>
            <el-form :model="route"  label-suffix=":"  :rules="rules" status-icon ref="ruleForm"   class="demo-ruleForm" label-width="60px">      
              <el-form-item label="区域" prop="XZQY">
                <el-select v-model="route.XZQY" multiple placeholder="请选择,可多选">
                  <el-option
                    v-for="item in xzqh"
                    :key="item.CODE"
                    :label="item.VAL"
                    :value="item.CODE">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名称"  prop="NAME">
                <el-input v-model="route.NAME"></el-input>
              </el-form-item>
              <el-form-item label="起点"  prop="QD">
                <el-input v-model="route.QD"></el-input>
              </el-form-item>     
              <el-form-item label="途经1">
                <el-input v-model="route.TJ1"></el-input>
              </el-form-item>     
              <el-form-item label="途经2">
                <el-input v-model="route.TJ2"></el-input>
              </el-form-item>     
              <el-form-item label="途经3">
                <el-input v-model="route.TJ3"></el-input>
              </el-form-item>     
              <el-form-item label="终点"  prop="ZD">
                <el-input v-model="route.ZD"></el-input>
              </el-form-item>     
              <el-form-item label="坐标">
                <el-input v-model="gis" :readonly="true"></el-input>
              </el-form-item>     
              <el-form-item>
                <el-button type="primary" @click="addroute('ruleForm')">添加</el-button>
                <el-button @click="close">关闭</el-button>
              </el-form-item>                                                                              
            </el-form>
          </el-row>
        </el-card>      
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as axiosClient from '../../../../common/axiosClient'
import {mapState} from 'vuex'
import { EventBus } from '../../../../common/event-bus.js'
export default {
  name: 'default',
  props: {
    pcom: {
      type: String,
      default:''
    },
    vehxh: {
      type: String,
      default: ''
    },
    winh: {
      type: String,
      default: '500px'
    }
  },
  data: () => {
    return {
      _MapApp: null,
      route: {
        VEHXH: '',
        XH: ''
      },
      gis: '',
      mode: 'pan',
      rules: {
        NAME: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        QD: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        ZD: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        XZQY: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]              
      }, 
      loadding: false
    }
  },
  computed: {
    ...mapState({
      _code: '_code'
    }),
    xzqh () {
      return this._code.filter(d => {
        return d.LX === 'xzqh'
      })
    }
  },
  created () {
    this.route.VEHXH = this.vehxh
  },
  mounted () {
    if (!(this.pcom && this.vehxh)) this.$message.error('未指定足够prop') 
    if (EzMap) {
      this._MapApp = new EzMap(this.$refs.map)
      this._MapApp.centerAndZoom(new Point(101.71814, 26.58418), 16)
      //  标尺
      this._MapApp.showMapControl()
      // 鹰眼
      let pOverview = new OverView()
      pOverview.width = 200
      pOverview.height = 200
      pOverview.minLevel = 10
      pOverview.maxLevel = 12
      this._MapApp.addOverView(pOverview)
      this._MapApp.showOverView()
    }
  },
  watch: {
    gis (newv) {
      if (newv) {
        let v = newv.split(',')
        let sort = 1 
        let r = []
        for (let i = 0; i < v.length; i = i + 2) {
          let r1 = {
            XH: '',
            SORT: sort,
            JD: v[i],
            WD: v[i + 1],
            LX: 'Polyline'
          }
          r.push(r1)
          sort++
        }
        this.route.GIS = r
      }
    }
  },
  methods: {
    draw () {
      this.gis = ''
      this._MapApp.clearOverlays()
      // 进入划线模式
      this._MapApp.changeDragMode('drawPolyline', null, null, this.DrawLineCallback)
      this.mode = 'line'
    },
    clearall () {
      this.gis = ''
      this._MapApp.clearOverlays()
      // 进入平移模式
      this._MapApp.changeDragMode('pan')
      this.mode = 'pan'
    },
    addroute (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {
          if (!this.gis) {
            this.$message.error('请指定线路')
          } else {
            axiosClient.call('jcxxpt/veh/routeadd', 'post', Object.assign(this.route, {XZQY: this.route.XZQY.join(",")}))
              .then((res) => {
                if (res.status === 1) {
                  this.$message('新增成功')
                  this.$refs[formName].clearValidate()
                  EventBus.$emit(this.pcom, {
                    key: 'routeadd',
                    route: res.data
                  })
                  this.route = {
                    VEHXH: this.route.VEHXH,
                    XH: ''
                  }               
                } else {
                  this.$message.error(res.msg)
                }
              })
              .catch(err => {
                this.$message.error(err)                
              })
          }
        }
      })
    },
    DrawLineCallback (strPoint) {
      this.gis = strPoint
      this.mode = 'pan'
    },
    close () {
      EventBus.$emit(this.pcom, {
        key: 'vehrouteaddclose'
      })     
    }
  }
}
</script>

<style scoped>
  
</style>
