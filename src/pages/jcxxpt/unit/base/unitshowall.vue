<template>
  <div v-watermark1:[markinfo] ="{text:'未登记',textColor:'rgba(180, 180, 180, 0.5)'}">
    <el-row>
        <el-col :span="24">
            <el-tabs tab-position="right" :style="{height: tabh}"  @tab-click="tabclick">
                <el-tab-pane label="基本信息">
                  <unitshowbase :initdata="initdata"></unitshowbase>
                </el-tab-pane>
                <el-tab-pane label="地理位置">
                  <unitshowposition v-if="showpos" :initdata="initdata"></unitshowposition>
                </el-tab-pane>
                <el-tab-pane label="车辆">
                  <unitshowvehs :initdata="initdata"></unitshowvehs>
                </el-tab-pane>
                <el-tab-pane label="驾驶员">
                  <unitshowdrvs :initdata="initdata"></unitshowdrvs>
                </el-tab-pane>
                <el-tab-pane label="线路">
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
import unitshowbase from './unitshowbase'
import unitshowvehs from './unitshowvehs'
import unitshowdrvs from './unitshowdrvs'
import unitshowroutes from './unitshowroutes'
import unitshowposition from './unitshowposition'
export default {
  name: 'default',
  components: {
    unitshowbase: unitshowbase,
    unitshowvehs: unitshowvehs,
    unitshowroutes: unitshowroutes,
    unitshowdrvs: unitshowdrvs,
    unitshowposition: unitshowposition
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
    this.$EventBus.$on('jcxxpt-unit-unitshowall', this.Ehandle)
  },
  methods: {
    tabclick (obj) {
      if (obj.label === '线路') this.showroutes = true
      if (obj.label === '地理位置') this.showpos = true
    },
    Ehandle (res) {
      switch(res.key) {
        case 'unitgetok' :
          this.markinfo = res.unit.DWMC 
          break;
        default:
          break;
      }
    }
  },
  beforeDestroy () {
    console.log('事件jcxxpt-unit-unitshowall被移出')
    this.$EventBus.$off('jcxxpt-unit-unitshowall', this.Ehandle)
  }
}
</script>
<style scoped>

</style>
