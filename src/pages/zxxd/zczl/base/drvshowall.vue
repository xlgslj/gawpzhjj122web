<template>
  <div>
    <el-row>
        <el-col :span="24">
            <el-tabs tab-position="right" :style="{height: tabh}">
                <el-tab-pane label="基本信息">
                  <drvshowbase :initdata="initdata"></drvshowbase>
                </el-tab-pane>
                <el-tab-pane label="治脏违法">
                  <drvvios :initdata="{sfzmhm: initdata.drv.JSZH}"></drvvios>
                </el-tab-pane>
             </el-tabs>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import drvshowbase from '../../../jcxxpt/drv/base/drvshowbase'
import drvvios from './drvvios'
export default {
  name: 'default',
  components: {
    drvshowbase: drvshowbase,
    drvvios: drvvios
  },
  props: {
    // 此处一定要用value,实现v-model
    initdata: {
      type: Object,
      default: () => {
        xh: null
      }
    }
  },   
  data: () => {
    return {
    }
  },
  computed: {
    tabh () {
      return (window.innerHeight - 91) + 'px'
    }
  },
  methods: {
  }
}
</script>
<style scoped>

</style>
