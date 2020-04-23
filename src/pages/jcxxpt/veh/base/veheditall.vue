<template>
  <div v-watermark1:[markinfo] ="{text:'未登记',textColor:'rgba(180, 180, 180, 0.5)'}">
    <el-row>
        <el-col :span="24">
            <el-tabs tab-position="right" :style="{height: tabh}"  @tab-click="tabclick">
                <el-tab-pane label="基本信息">
                  <vehaddnew v-if="initdata.xh === 'NewXh'"></vehaddnew>
                  <veheditbase v-else :initdata="initdata"></veheditbase>
                </el-tab-pane>
                <el-tab-pane label="驾驶员">
                  <veheditdrvs :initdata="initdata"></veheditdrvs>
                </el-tab-pane>
                <el-tab-pane label="线路">
                  <veheditroutes v-if="showroutes" :initdata="initdata"></veheditroutes>
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
import vehaddnew from './vehaddnew'
import veheditbase from './veheditbase'
import veheditdrvs from './veheditdrvs'
import veheditroutes from './veheditroutes'
export default {
  name: 'default',
  components: {
    vehaddnew: vehaddnew,
    veheditbase: veheditbase,
    veheditdrvs: veheditdrvs,
    veheditroutes: veheditroutes
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
      veh: {},
      showroutes: false
    }
  },
  computed: {
    tabh () {
      return (window.innerHeight - 91) + 'px'
    }
  },
  mounted () {
    this.$EventBus.$on('jcxxpt-veh-veheditall', this.Ehandle)
  },
  watch: {
    veh:{//深度监听，可监听到对象、数组的变化
      handler(val, oldVal){
        this.markinfo = `${val.DWMC||''}: ${val.HPHM}` 
      },
      deep:true
    }
  },
  methods: {
    tabclick (obj) {
      if (obj.label === '线路') this.showroutes = true
    },
    Ehandle (res) {
      switch(res.key) {
        case 'vehgetok' :
          this.veh = res.veh
          break;
        case 'vehaddok' :
          this.veh = res.veh
          this.initdata.xh = res.veh.XH
          this.initdata.hphm = res.hphm
          this.initdata.hpzl = res.veh.HPZL
          break;
        default:
          break;
      }
    }
  },
  beforeDestroy () {
    console.log('事件jcxxpt-veh-veheditall被移出')
    this.$EventBus.$off('jcxxpt-veh-veheditall', this.Ehandle)
  }
}
</script>
<style scoped>

</style>
