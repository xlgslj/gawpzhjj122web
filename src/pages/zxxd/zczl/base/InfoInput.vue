<template>
  <div>
    <el-row>
        <el-col :span="24">
            <el-tabs type="border-card" style="height: 500px;"  @tab-click="tabclick">
                <el-tab-pane label="车辆基本信息">
                    <InfoVehInput v-model="comdata"></InfoVehInput>
                </el-tab-pane>
                <el-tab-pane label="关联单位信息">
                    <InfoUnitInput v-model="comdata"></InfoUnitInput>
                </el-tab-pane>
                <el-tab-pane label="驾驶员信息">
                    <InfoDrvsInput v-model="comdata"></InfoDrvsInput>
                </el-tab-pane>
                <el-tab-pane label="运输线路">
                    <InfoRoutesInput v-model="comdata" :showmap="showmap"></InfoRoutesInput>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
        <el-col :span="20">
            <el-tag :type="comdata.vehsource === 'jcxxpt' ? '' : 'danger'">车辆登记</el-tag>
            <el-tag :type="comdata.qybh ? '' : 'danger'">单位登记</el-tag>
            <el-tag :type="comdata.drvs>0 ? '' : 'danger'">驾驶员登记</el-tag>
            <el-tag :type="comdata.routes>0 ? '' : 'danger'">线路登记</el-tag> 
        </el-col>
        <el-col :span="4">
        <el-form>
            <el-col :span="12">
            <el-form-item>
                <el-button type="primary" :disabled="disabled"  @click="onsave()">采集完成</el-button>
            </el-form-item>
            </el-col>
        </el-form>
        </el-col>
    </el-row>
   </div>
</template>

<script>
import InfoVehInput from './InfoVehInput'
import InfoUnitInput from './InfoUnitInput'
import InfoRoutesInput from './InfoRoutesInput'
import InfoDrvsInput from './InfoDrvsInput'
export default {
  name: 'default',
  components: {
    InfoVehInput: InfoVehInput,
    InfoUnitInput: InfoUnitInput,
    InfoRoutesInput: InfoRoutesInput,
    InfoDrvsInput: InfoDrvsInput
  },
  props: {
    // 此处一定要用value,实现v-model
    initdata: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      comdata: {
        vehxh: null,
        qybh: null,
        vehsource: null,
        sfzmmc:  null,
        sfzmhm:  null,
        routes: 0,
        drvs: 0
        //veh: {}
      },
      showmap: false
    }
  },
  computed: {
    disabled () {
      return !(this.comdata.vehsource === 'jcxxpt' && this.comdata.qybh && this.comdata.drvs > 0 && this.comdata.routes > 0)
    }
  },
  created () {
    this.comdata = {...this.comdata, ...this.initdata}
  },
  methods: {
    tabclick (obj) {
      if (obj.label === '运输线路') this.showmap = true
    },
    onsave () {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axiosClient.call('ZXXDZCZLZDCLXXCJCJWC', 'post', {wfbh: this.initdata.wfbh, qybh: this.comdata.qybh, xh: this.comdata.vehxh})
          .then((res) => {
            if (res.status === 1) {
              this.$message('采集成功')
              this.$EventBus.$emit('zxxd-zczl-zdclxxcj', {
                key: 'vehinok',
                wfbh: this.initdata.wfbh
              })
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消')
      })
    }
  }
}
</script>
<style scoped>

</style>
