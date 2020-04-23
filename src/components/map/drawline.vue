<template>
  <div style="width:100%;">
    <div ref="map" class="map">
    </div>
  </div>
</template>

<script>
export default {
  name: 'default',
  data: () => {
    return {
      _MapApp: null
    }
  },
  created () {
  },
  mounted () {
    if (EzMap) {
      this._MapApp = new EzMap(this.$refs.map)
      this._MapApp.centerAndZoom(new Point(101.71814, 26.58418), 16)
      // 展现一条线
      let pLine = new Polyline("101.70767,26.58135,101.71072,26.58543,101.71609,26.58783,101.71679,26.58768,101.71915,26.58464,101.72252,26.58105,101.72557,26.58275", "#ff0000", 3, 1); 
      let strMsg = "del"
      pLine.addListener("click",function(){pLine.openInfoWindowHtml(strMsg);})
      this._MapApp.addOverlay(pLine)

    }
  },
  updated () {

  },
  methods: {
  }
}
</script>
<style scoped>
.map {
  height:500px;
}
</style>
