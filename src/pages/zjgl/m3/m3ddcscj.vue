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
        mk: 'mjrl',
        imgs: 3,
        spe: 2,
        enable: true,
        getdata: 'zjgl/m3/mjlr/getdata',
        shtg: 'zjgl/m3/mjlr/shtg',
        sqshbtg: 'zjgl/m3/mjlr/del',
      }
    }
  }
}
</script>

<style scoped>

</style>
