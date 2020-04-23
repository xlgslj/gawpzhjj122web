<template>
  <VioDataView :AppInfo="AppInfo"></VioDataView>
</template>

<script>
import VioDataView from '../base/VioDataView-ddcs'
export default {
  name: 'default',
  components: {
    VioDataView: VioDataView
  },
  data: () => {
    return {
      AppInfo: {
        scoped: 'page',
        bk: 'm3',
        mk: 'ddsh',
        imgs: 3,
        spe: 2,
        enable: false,
        getdata: 'zjgl/m3/ddsh/getdata',
        shtg: 'zjgl/m3/ddsh/shtg',
        sqshbtg: 'zjgl/m3/ddsh/del',
      }
    }
  }
}
</script>

<style scoped>

</style>
