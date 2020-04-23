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
        bk: 'm1',
        mk: 'zdsh',
        hdbj: '1', //原始核对标记
        imgroot: 'IMGROOT0', //图片根目录
        imgs: 3, //总图片数
        spe: 1,  //加载特号的图片(放大*2)
        scale: 2, //放大倍数
        getdata: 'zjgl/m1/zdsh/getdata',
        shtg: 'zjgl/m1/zdsh/shtg',
        sqshbtg: 'zjgl/m1/zdsh/sqshbtg',
        firstimgidx:0
      }
    }
  }
}
</script>

<style scoped>

</style>
