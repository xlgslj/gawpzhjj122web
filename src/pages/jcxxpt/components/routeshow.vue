<template>
  <div  style="width:100%;position:relative;">
    <div ref="map" class="map" :style="{height: winh}">
    </div>
    <div  class="mapcontrols" style="width:110px;">
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
    routes: {
      teyp: Array,
      default: function () {
        return []
      }
    },
    winh: {
      type: String,
      default: '400px'
    }
  },
  data: () => {
    return {
      _MapApp: null,
      myroutes: [],
      Overlays: [],
      currentxzqh: 'All',
      myroutes: [],
      mycodes: this._code,
      color: [
        '#227447',
        '#c12c20',
        '#3b3f4e',
        '#2a5699',
        '#1065a7',
        '#0092a8',
        '#008B8B',
        '#d04626',
        '#435a69',
        '#A0522D',
        '#9932CC'
      ],
      loadding: false
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
        SUM: this.routes.length
      }
      arr.push(qb)
      this._code.filter(d => {
        return d.LX === 'xzqh'
      }).forEach(d1 => {
        let sum = this.routes.filter(d2 => {
          return d2.XZQY.indexOf(d1.CODE) >= 0
        }).length
        arr.push(Object.assign({}, d1, {SUM: sum}))
      })
      return arr
    }
  },
  created () {
    this.myroutes = this.routes
  },
  mounted () {
    if (EzMap) {
      this._MapApp = new EzMap(this.$refs.map)
      this.gocenter()
    }
    for (let i = 0; i < this.myroutes.length; i++) {
      this.addroute(this.myroutes[i])
    }
  },
  watch: {
    routes: {
      handler (a, b) {
        this.currentxzqh = 'All'        
        this.myroutes = a
      },
      deep: true
    },
    myroutes: {
      handler (a, b) {
        this.delallroute()
        this.gocenter()
        a.forEach(a1 => {
          this.addroute(a1)
        })
      },
      deep: true
    },
    currentxzqh (newv) {
      if (newv === 'All') {
        this.myroutes = this.routes
      } else {
        this.myroutes = this.routes.filter(d => {
          let xzqys = d.XZQY.split(",")
          let isin = xzqys.findIndex(d => d === newv)
          return isin > -1
        })
      }
    }
  },
  methods: {
    gocenter () {
      if (this.myroutes.length) {
        // 取数组中间那条线中心点
        let c = parseInt(this.myroutes.length/2)
        let c1 = parseInt(this.myroutes[c].GIS.length/2)
        this._MapApp.centerAndZoom(new Point(this.myroutes[c].GIS[c1].JD, this.myroutes[c].GIS[c1].WD), 14)
      } else {
        this._MapApp.centerAndZoom(new Point(101.71814, 26.58418), 15)
      }
    },
    addroute (r) {
      let c = this.color[this.Overlays.length % this.color.length]
      let o = {
        XH: r.XH
      }
      let pLine = new Polyline(this.gistostr(r.GIS), c, 3, 1)
      this._MapApp.addOverlay(pLine)
      o.line = pLine

      let pTitle = new Title(`起点:${r.QD}`, 14, 0, '宋体', null, c, c, 1)
      let aPoint = new Point(r.GIS[0].JD, r.GIS[0].WD)
      pTitle.setPoint(aPoint)
      this._MapApp.addOverlay(pTitle)
      o.qd = pTitle

      pTitle = new Title(`终点:${r.ZD}`, 14, 0, '宋体', null, c, c, 1)
      aPoint = new Point(r.GIS[r.GIS.length - 1].JD, r.GIS[r.GIS.length - 1].WD)
      pTitle.setPoint(aPoint)
      this._MapApp.addOverlay(pTitle)
      o.zd = pTitle

      /* let tjd = []

      for ( let i =1; i < r.GIS.length -1; i++ ) {
        pTitle = new Title(`线路:${r.NAME}`, 14, 0, '宋体', null, c, c, 1)
        aPoint = new Point(r.GIS[i].JD, r.GIS[i].WD)
        pTitle.setPoint(aPoint)
        this._MapApp.addOverlay(pTitle)
        tjd.push(pTitle)
      }
      o.tjd = tjd */
      this.Overlays.push(o)
    },
    delallroute () {
      this.Overlays.forEach(obj => {
        this._MapApp.removeOverlay(obj.line)
        this._MapApp.removeOverlay(obj.qd)
        this._MapApp.removeOverlay(obj.zd)
      })
      this.Overlays = []
    },
    delroute1 (r) {
      let i = this.Overlays.findIndex(d => d.XH === r.XH)
      // console.log('n', r.XH, this.Overlays[i].XH)
      this._MapApp.removeOverlay(this.Overlays[i].line)
      this._MapApp.removeOverlay(this.Overlays[i].qd)
      this._MapApp.removeOverlay(this.Overlays[i].zd)
      /* this.Overlays[i].tjd.forEach(d => {
        this._MapApp.removeOverlay(d)
      }) */
      this.Overlays.splice(i, 1)
    },
    gistostr (gis) {
      let s = []
      gis.forEach(d => {
        s.push(d.JD)
        s.push(d.WD)
      })
      return s.join(',')
    }
  }
}
</script>

<style scoped>
</style>
