<template>
  <VioDataView :AppInfo="AppInfo"></VioDataView>
</template>

<script>
import VioDataView from '../base/VioDataView'
export default {
  name: 'default',
  components: {
    VioDataView: VioDataView
  },
  data: () => {
    return {
      AppInfo: {
        scoped: 'page',
        bk: 'm2',
        mk: 'zdsh',
        hdbj: '1', //原始核对标记
        imgroot: 'IMGROOT0', //图片根目录
        imgs: 2, //总图片数
        spe: 2,  //加载特号的图片(放大*2)
        scale: 4, //放大倍数
        getdata: 'zjgl/m2/zdsh/getdata',
        shtg: 'zjgl/m2/zdsh/shtg',
        sqshbtg: 'zjgl/m2/zdsh/sqshbtg',
        firstimgidx:0
      }
    }
  }
}
</script>

<style scoped>

</style>
