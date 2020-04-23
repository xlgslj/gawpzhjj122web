<template>
  <div  style="width:100%;position:relative;">
    <div ref="map" class="map" :style="{height: winh}">
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'default',
  props: {
    name: {
      type: String,
      default: '无名'
    },
    positinos: {
      teyp: String,
      default: ''
    },
    winh: {
      type: String,
      default: (window.innerHeight - 91) + 'px'
    }
  },
  data: () => {
    return {
      _MapApp: null,
      pPolygon: null,
      Mname: null,
      loadding: false
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    if (EzMap) {
      this._MapApp = new EzMap(this.$refs.map)
      this.gocenter()
      this.drawpolygon()
    }
  },
  watch: {
    positinos () {
      this.gocenter()
      this.drawpolygon()        
    }
  },
  methods: {
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

        this.Mname = new Title(this.name, 16, 0, '宋体', '#0067a6', null, 'blue', true, 1)
        let aPoint = new Point(p[0]+0.0005, p[1]+0.0005)
        this.Mname.setPoint(aPoint) 
        this._MapApp.addOverlay(this.Mname);

      } else {
        if (this.pPolygon) this._MapApp.removeOverlay(this.pPolygon)
        if (this.Mname) this._MapApp.removeOverlay(this.Mname)
        this.pPolygon = new Title(`该单位未采集地理坐标`, 20, 0, '宋体', null, null, 'red', 1)
        let aPoint = new Point(101.71814, 26.58418)
        this.pPolygon.setPoint(aPoint) 
        this._MapApp.addOverlay(this.pPolygon)
      }
    }
  }
}
</script>

<style scoped>
</style>
