<template>
  <div>
    <div ref="map" class="map">
    </div>
    <div id="r-result" class="ui-draggable">
        <table width="100%" cellpadding="0" cellspacing="0" class="mytable">
            <tbody>
                <tr>
                    <td>
                        <img onmouseover="this.style.cursor='hand'" width="61" alt="放大" height="32" onclick="_MapApp.zoomIn();" hspace="9" src="image/fd.png">
                    </td>
                    <td>
                        <img onmouseover="this.style.cursor='hand'" width="61" alt="缩小" height="32" onclick="_MapApp.zoomOut();" hspace="9" src="image/sx.png">
                    </td>
                </tr>
                <tr>
                    <td>
                        <img onmouseover="this.style.cursor='hand'" width="61" height="30" alt="移动" onclick="_MapApp.pan();" hspace="9" src="image/py.png" style="cursor: pointer;">
                    </td>
                    <td>
                        <img onmouseover="this.style.cursor='hand'" width="61" alt="清除" height="32" onclick="_MapApp.clear();" hspace="9" src="image/qc.png">
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <el-button type="primary" icon="el-icon-share"  size="mini" @click="addLine">画线</el-button>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center" colspan="2">
                        <a class="button" onclick="closewindow();">关 闭</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import constorls from '../components/map/controls'
export default {
  name: 'default',
  components: {
    'map-contorls': constorls
  },
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
      // 鹰眼
      let pOverview = new OverView()
      pOverview.width = 200
      pOverview.height = 200
      pOverview.minLevel = 8
      pOverview.maxLevel = 10
      this._MapApp.addOverView(pOverview)
      this._MapApp.showOverView()
      //  标尺
      this._MapApp.showMapControl()
      // 展现一条线

    // mark
    /* var pIcon=new Icon()
    pIcon.image='../../static/n1.jpg'
    pIcon.height=16; 
    pIcon.width=16; 
    var strMsg="msg"+iIndex
    var marker = new Marker(this._MapApp.getCenterLatLng(),pIcon)
    marker.addListener("click",function(){marker.openInfoWindowHtml(strMsg);})
    this._MapApp.addOverlay(marker); */
      // 展现一条线
    /*var pLine=new Polyline("101.70767,26.58135,101.71072,26.58543,101.71609,26.58783,101.71679,26.58768,101.71915,26.58464,101.72252,26.58105,101.72557,26.58275","#ff0000", 3,1); 
    var strMsg="del"; 
    pLine.addListener("click",function(){pLine.openInfoWindowHtml(strMsg);}); 
    this._MapApp.addOverlay(pLine);*/
    }
  },
  methods: {
    addLine () {
      this._MapApp.changeDragMode('drawPolyline', null, null, this.LineCallback)
    },
    LineCallback (strPoint) {
      console.log(strPoint)
      let pTitle = new Title(strPoint, 14, 4, '宋体', null, null, 'blue', 1)
      let aPoint = new Point(strPoint.split(',')[0], strPoint.split(',')[1])
      pTitle.addListener("click",() =>{this.$message('新增成功!')}); 
      pTitle.setPoint(aPoint)
      this._MapApp.addOverlay(pTitle)
    }
  }
}
</script>
<style scoped>
.map {
  height:calc(100vh - 91px);
}
#r-result {
    border: solid 1px #56B5ED;
    width: 200px;
    position: absolute;
    top: 20px;
    right: 5px;
    margin: 5px;
    background-color: white;
    filter:alpha(Opacity=70);
    -moz-opacity:0.7;
    opacity: 0.7;
}
.mytable {
    width: 100%;
    padding: 2px 0 0 0;
    font-size: 13px;
    text-decoration: none;
    border-collapse: collapse;
    text-align: center;
}
table {
    white-space: normal;
    line-height: normal;
    font-weight: normal;
    font-size: medium;
    font-style: normal;
    color: -internal-quirk-inherit;
    text-align: start;
    font-variant: normal;
}
tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}
.mytable tr {
    height: 30px;
}
.mytable td {
    border: 1px solid #3689C1;
    padding: 5px;
}
</style>
