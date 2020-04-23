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
        bk: 'm4',
        mk: 'sbcj',
        hdbj: '0',//原始核对标记
        imgroot: 'IMGROOT1',//图片根目录
        imgs: 4,//总图片数
        spe: 1,  //加载特号的图片(放大*2)
        scale: 2.5, //放大倍数
        getdata: 'zjgl/m4/sbcj/getdata',
        shtg: 'zjgl/m4/sbcj/shtg',
        sqshbtg: 'zjgl/m4/sbcj/sqshbtg',
        firstimgidx:1
      }
    }
  }
}
</script>

<style scoped>

</style>
