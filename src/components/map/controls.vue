<template>
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
                        <img onmouseover="this.style.cursor='hand'" width="61" alt="画多边形" height="32" onclick="addPolygon()" hspace="9" src="image/bz.png">
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center" colspan="2">
                        <a class="button" onclick="closewindow();">关 闭</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <input type="hidden" id="mapjd" maxlength="17" name="mapjd">
        <input type="hidden" id="mapwd" maxlength="17" name="mapwd">
        <input type="hidden" id="polygonzbvalue" name="polygonzbvalue">
    </div>
</template>

<script>
export default {
  name: 'default',
  props: {
    // 此处一定要用value,实现v-model
    map: Object
  },  
  data: () => {
    return {
    }
  },
  mounted () {}
}
</script>
<style scoped>
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
}    
</style>
