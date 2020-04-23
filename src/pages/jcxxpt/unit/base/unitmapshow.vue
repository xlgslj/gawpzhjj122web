<template>
  <div  style="width:100%;position:relative;">
    <div ref="map" class="map" :style="{height: winh}">
    </div>
    <div v-show="mode==='list'" class="mapcontrols" style="width:110px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr v-for="item in xzqh" :key="item.CODE">
            <td :class="{active:currentxzqh === item.CODE}">
              <i class="el-icon-location"></i>
              <el-button type="text" style="padding:0;" @click="currentxzqh=item.CODE">{{item.VAL}}(<span style="color:red;">{{item.SUM}}</span>)</el-button>
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
    pcom: {
      type: String,
      default: ''
    },
    winh: {
      type: String,
      default: '400px'
    },
    mode: {
      type: String,
      default: 'list'
    },
    units: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data: () => {
    return {
      _MapApp: null,
      currentxzqh: 'All',
      myunits: []
    }
  },
  computed: {
    ...mapState({
      _code: '_code'
    }),
    xzqh () {
      let arr = []
      let qb = {
        LX: 'xzqh',
        CODE: 'All',
        VAL: '全部',
        KEY1: '101.71814,26.58418',
        SUM: this.units.length
      }
      arr.push(qb)
      this._code.filter(d => {
        return d.LX === 'xzqh'
      }).forEach(d1 => {
        let sum = this.units.filter(d2 => {
          return d2.XZQH === d1.CODE
        }).length
        arr.push(Object.assign({}, d1, {SUM: sum}))
      })
      return arr
    }
  },
  created () {
    this.myunits = this.units
  },
  mounted () {
    if (EzMap) {
      this._MapApp = new EzMap(this.$refs.map)
      this.gocenter(101.71814, 26.58418, 15)
      this.drawunits()
    }
  },
  watch: {
    units: {
      handler (a, b) {
        this.currentxzqh = 'All'        
        this.myunits = a
      },
      deep: true
    },
    myunits: {
      handler (a, b) {
        if (this.mode === 'list') {
          this.drawunits()
        } else if (this.mode === 'one') {
          this.drawonunit()
        }
      },
      deep: true
    },
    currentxzqh (newv) {
      if (newv === 'All') {
        this.myunits = this.units
      } else {
        this.myunits = this.units.filter(d => {
          return d.XZQH === newv
        })
      }
     }
  },
  methods: {
    gocenter (jd, wd, level) {
      this._MapApp.centerAndZoom(new Point(jd, wd), level)
    },
    drawonunit () {
        this._MapApp.clearOverlays()        
        let d = this.myunits[0]
        if (d.DTZB) {
            let pIcon=new Icon()
            pIcon.image="/static/dw.png" 
            pIcon.height=50
            pIcon.width=50

            let zb = d.DTZB.split(',')
            let jd = zb[0]
            let wd = zb[1]

            this._MapApp.recenterOrPanToLatLng(new Point(jd, wd));

            let pTitle = new Title(`${d.DWMC}`, 14, 0, '宋体', null, null, 'blue', 1)
            let aPoint = new Point(jd, wd)
            pTitle.setPoint(aPoint) 
            this._MapApp.addOverlay(pTitle)

            let  marker = new Marker(new Point(jd, wd),pIcon)
            let strMsg = `<div>`
            + `<div>单位名称: ${d.DWMC}</div>`
            + `<div>地址: ${d.DWDD}</div>`
            + `<div>负责人: ${d.GLLXR || d.FR}   电话: ${d.GLSJHM || d.FRSJHM}</div>`
            + `<div>管理部门: ${d.GLBM}</div>`
            + `</div>`
            marker.addListener('click',function () {marker.openInfoWindowHtml(strMsg)})
            this._MapApp.addOverlay(marker) 
            marker.openInfoWindowHtml(strMsg); 
        } else {
            this.$message.error('未采集坐标')
            this.pPolygon = new Title(`该单位未采集地理坐标`, 20, 0, '宋体', null, null, 'red', 1)
            let aPoint = new Point(101.71814, 26.58418)
            this.pPolygon.setPoint(aPoint) 
            this._MapApp.addOverlay(this.pPolygon)            
            this.gocenter(101.71814, 26.58418, 15)            
        }
    },
    drawunits () {
        this._MapApp.clearOverlays()
        let center = this.xzqh.find(d => {
          return d.CODE === this.currentxzqh
        })
         let centerzb = center.KEY1.split(",")
        this.gocenter(centerzb[0], centerzb[1], 15)  
        this.myunits.forEach(d => {
            let pIcon=new Icon()
            pIcon.image="/static/dw.png" 
            pIcon.height=50
            pIcon.width=50
            let zb = d.DTZB.split(',')
            let jd = zb[0]
            let wd = zb[1]

            let pTitle = new Title(`${d.DWMC}`, 14, 0, '宋体', null, null, 'blue', 1)
            let aPoint = new Point(jd, wd)
            pTitle.setPoint(aPoint) 
            this._MapApp.addOverlay(pTitle)

            let  marker = new Marker(new Point(jd, wd),pIcon)
            let strMsg = `<div>`
            + `<div>单位名称: ${d.DWMC}</div>`
            + `<div>地址: ${d.DWDD}</div>`
            + `<div>负责人: ${d.GLLXR || d.FR}   电话: ${d.GLSJHM || d.FRSJHM}</div>`
            + `<div>管理部门: ${d.GLBM}</div>`
            + `</div>`
            marker.addListener('click',function () {marker.openInfoWindowHtml(strMsg)})
            this._MapApp.addOverlay(marker) 
        })
    }
  }
}
</script>

<style scoped>
   .my-mapcontrols {
    position: absolute;
    top: 20px;
    right: 5px;
    filter:alpha(Opacity=70);
    -moz-opacity:0.7;
    opacity: 0.7;
}
</style>
