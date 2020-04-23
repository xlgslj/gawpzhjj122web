<template>
  <div v-watermark1:[markinfo] ="{text:'未登记',textColor:'rgba(180, 180, 180, 0.5)'}">
    <el-row>
        <el-col :span="24">
            <el-tabs tab-position="right" :style="{height: tabh}"  @tab-click="tabclick">
                <el-tab-pane label="基本信息">
                  <vehshowbase :initdata="initdata"></vehshowbase>
                </el-tab-pane>
                <el-tab-pane label="驾驶员">
                  <vehshowdrvs :initdata="initdata"></vehshowdrvs>
                </el-tab-pane>
                <el-tab-pane label="线路">
                  <vehshowroutes v-if="showroutes" :initdata="initdata"></vehshowroutes>
                </el-tab-pane>
                <slot name="other1"></slot>
                <slot name="other2"></slot>
                <slot name="other3"></slot>
                <slot name="other4"></slot>
                <slot name="other5"></slot>
             </el-tabs>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import vehshowbase from './vehshowbase'
import vehshowdrvs from './vehshowdrvs'
import vehshowroutes from './vehshowroutes'
export default {
  name: 'default',
  components: {
    vehshowbase: vehshowbase,
    vehshowdrvs: vehshowdrvs,
    vehshowroutes: vehshowroutes
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
      markinfo: '',
      showroutes: false
    }
  },
  computed: {
    tabh () {
      return (window.innerHeight - 91) + 'px'
    }
  },
  mounted () {
    if (this.initdata.veh) {
      this.markinfo = `${this.initdata.veh.DWMC||''}: ${this.initdata.veh.HPHM}` 
    }
    this.$EventBus.$on('jcxxpt-veh-vehshowall', this.Ehandle)
  },
  methods: {
    tabclick (obj) {
      if (obj.label === '线路') this.showroutes = true
    },
    Ehandle (res) {
      switch(res.key) {
        case 'vehgetok' :
          this.markinfo = `${res.veh.DWMC||''}: ${res.veh.HPHM}` 
          break;
        default:
          break;
      }
    }
  },
  beforeDestroy () {
    console.log('事件jcxxpt-veh-vehshowall被移出')
    this.$EventBus.$off('jcxxpt-veh-vehshowall', this.Ehandle)
  }
}
</script>
<style scoped>

</style>
