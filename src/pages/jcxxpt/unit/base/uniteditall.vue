<template>
  <div v-watermark1:[markinfo] ="{text:'未登记',textColor:'rgba(180, 180, 180, 0.5)'}">
    <el-row>
        <el-col :span="24">
            <el-tabs tab-position="right" :style="{height: tabh}"  @tab-click="tabclick">
                <el-tab-pane label="基本信息">
                  <uniteditbase :initdata="initdata"></uniteditbase>
                </el-tab-pane>
                <el-tab-pane  label="地理位置">
                  <uniteditposition v-if="showpos" :initdata="initdata"></uniteditposition>
                </el-tab-pane>
                <el-tab-pane label="车辆">
                  <uniteditvehs :initdata="initdata"></uniteditvehs>
                </el-tab-pane>
                <el-tab-pane v-if="1>3" label="驾驶员">
                  <unitshowdrvs :initdata="initdata"></unitshowdrvs>
                </el-tab-pane>
                <el-tab-pane v-if="1>3" label="线路">
                  <unitshowroutes v-if="showroutes" :initdata="initdata"></unitshowroutes>
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
import uniteditbase from './uniteditbase'
import uniteditvehs from './uniteditvehs'
import unitshowdrvs from './unitshowdrvs'
import unitshowroutes from './unitshowroutes'
import uniteditposition from './uniteditposition'
export default {
  name: 'default',
  components: {
    uniteditbase: uniteditbase,
    uniteditvehs: uniteditvehs,
    unitshowroutes: unitshowroutes,
    unitshowdrvs: unitshowdrvs,
    uniteditposition: uniteditposition
  },
  props: {
    // 此处一定要用value,实现v-model
    initdata: {
      type: Object,
      default: () => {
        qybh: null
      }
    }
  },   
  data: () => {
    return {
      markinfo: '',      
      showroutes: false,
      showpos: false
    }
  },
  computed: {
    tabh () {
      return (window.innerHeight - 91) + 'px'
    }
  },
  mounted () {
    this.$EventBus.$on('JcxxptUnitBaseUnitEditAll', this.Ehandle)
  },
  methods: {
    tabclick (obj) {
      if (obj.label === '线路') this.showroutes = true
      if (obj.label === '地理位置') this.showpos = true
      
    },
    Ehandle (res) {
      switch(res.key) {
        case 'unitadd' :
          this.initdata.qybh = res.qybh
          break;
        case 'unitgetok' :
          this.markinfo = res.unit.DWMC 
          break;          
        default:
          break;
      }
    }
  },
  beforeDestroy () {
    console.log('事件JcxxptUnitBaseUnitEditAll被移出')
    this.$EventBus.$off('JcxxptUnitBaseUnitEditAll', this.Ehandle)
  }
}
</script>
<style scoped>

</style>
