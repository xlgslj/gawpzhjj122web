<template>
  <div
    v-loading.lock="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading" 
    style="width:100%;position:relative;">
    <div ref="map" class="map" :style="{height: winh}">
    </div>
    <div class="mapcontrols" style="width:300px;">
        <table width="100%" cellpadding="0" cellspacing="0">
        <tbody>
            <tr v-show="mode === 'pan' || mode === 'Polygoning'">
                <td >
                    <i class="el-icon-delete"></i>
                    <el-button type="text" style="padding:0;" @click="del" :disabled="initdata.qybh === 'NewQybh'">删除</el-button>
                </td>
                <td :class="{active:mode === 'pan'}">
                    <i class="el-icon-s-open"></i>
                    <el-button type="text" style="padding:0;" @click="clearall" :disabled="initdata.qybh === 'NewQybh'">清除/平移</el-button>
                </td>
                <td  :class="{active:mode === 'Polygoning'}">
                    <i class="el-icon-position"></i>
                    <el-button type="text" style="padding:0;" @click="draw" :disabled="initdata.qybh === 'NewQybh'">施划</el-button>
                </td>                
            </tr>
            <tr v-show="mode === 'Polygoned' || mode === 'saving'">
                <td >
                    <i class="el-icon-back"></i>
                    <el-button type="text" style="padding:0;" @click="cancel">取消</el-button>
                </td>
                <td :class="{active:mode === 'saving'}" colspan="2">
                    <i class="el-icon-s-claim"></i>
                    <el-button type="text" style="padding:0;" @click="save">保存</el-button>
                </td>                
            </tr>
        </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'default',
  props: {
    initdata: {
      type: Object,
      default: () => {
        qybh: null
      }
    },
    winh: {
      type: String,
      default: (window.innerHeight - 91) + 'px'
    }
  },
  data: () => {
    return {
      unit: {},
      positinos: '',
      tmp_positinos: '',
      _MapApp: null,
      mode: 'pan',
      pPolygon: null,
      loading: false
    }
  },
  computed: {
  },
  created () {
    if (this.initdata.qybh !== 'NewQybh') {
      this.getunit(this.initdata.qybh)
    }
  },
  mounted () {
    if (EzMap) {
      this._MapApp = new EzMap(this.$refs.map)
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
            
      this.gocenter()
      this.drawpolygon()
    }
  },
  watch: {
    positinos (val) {
      this.gocenter()
      this.drawpolygon()        
    },
    'initdata.qybh':{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        if (val) {
          if (val === 'NewQybh') {
            this.unit = {}
            this.positinos = ''
          } else {
            this.getunit(val)
          }
        } 
      },
      deep:true
    }
  },
  methods: {
    draw () {
      this.tmp_positinos = ''        
      this._MapApp.clearOverlays()
      // 进入设置画多边形 
      this._MapApp.changeDragMode('drawPolygon', null, null, this.DrawLineCallback)
      this.mode = 'Polygoning'
    },
    DrawLineCallback (strPoint) {
      this.mode = 'Polygoned'
      this.tmp_positinos = strPoint
    },
    clearall () {
      this.tmp_positinos = ''
      this._MapApp.clearOverlays()
      // 进入平移模式
      this._MapApp.changeDragMode('pan')
      this.mode = 'pan'

      this.gocenter()
      this.drawpolygon() 
    },
    cancel () {
      this.tmp_positinos = ''
      this.clearall()
      this.mode = 'pan'
      this.gocenter()
      this.drawpolygon()       
    },
    gocenter (level = 18) {
      if (this.positinos) {
        let p = this.positinos.split(",")
        this._MapApp.centerAndZoom(new Point(p[0], p[1]), level)
      } else {
        this._MapApp.centerAndZoom(new Point(101.71814, 26.58418), 16)
      }
    },
    drawpolygon () {
      if (this.positinos) {
        let p = this.positinos.split(",")
        
        if (this.pPolygon) this._MapApp.removeOverlay(this.pPolygon)
        if (this.Mname) this._MapApp.removeOverlay(this.Mname)
        this.pPolygon=new Polygon(this.positinos,"#ff00FF", 3,0.5,"blue")
        this._MapApp.addOverlay(this.pPolygon);

      } else {
        if (this.pPolygon) this._MapApp.removeOverlay(this.pPolygon)
        if (this.Mname) this._MapApp.removeOverlay(this.Mname)
        this.pPolygon = new Title(`该单位未采集地理坐标`, 20, 0, '宋体', null, null, 'red', 1)
        let aPoint = new Point(101.71814, 26.58418)
        this.pPolygon.setPoint(aPoint) 
        this._MapApp.addOverlay(this.pPolygon)
      }
    },
    del () {
        this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            this.loading = true
            this.$axiosClient.call('jcxxpt/unit/unitunbindgis', 'post', {qybh: this.initdata.qybh})
                .then((res) => {
                if (res.status === 1) {
                    this.positinos = ''
                    this.mode = 'pan'
                    this.clearall()
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
    },
    save () {
      this.loading = true
      this.$axiosClient.call('jcxxpt/unit/unitbindgis', 'post', {qybh: this.initdata.qybh, dtzb: this.tmp_positinos})
        .then((res) => {
          if (res.status === 1) {
            this.positinos = this.tmp_positinos
            this.mode = 'pan'
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
    getunit (qybh) {
      this.loading = true
      this.unit = {}
      this.$axiosClient.call('jcxxpt/unit/getunit', 'get', {qybh: qybh})
        .then((res) => {
          if (res.status === 1) {
            this.unit = res.data
            this.positinos = res.data.DTZB
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
