<template>
  <div>
    <el-row>
        <el-col :span="24">
            <el-card  shadow="always"  :style="{height:(comh -2 ) + 'px'}">
                <div slot="header" class="clearfix">
                    <span style="font-weight: 700;">重点管控单位概览（总数: {{count}}）</span>
                </div>
                <textpanel1
                  v-loading.lock="loading"
                  element-loading-text="处理中"
                  element-loading-spinner="el-icon-loading"                 
                 :indata="textpanel1Data"   :height="(comh - 54) + 'px'">
                </textpanel1>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import textpanel1 from '../../../components/ui/textpanel1'
export default {
  name: 'default',
  props: {
    comh: {
      type: Number,
      default: 400
    }
  },
  components: {
    textpanel1: textpanel1
  },
  data: () => {
    return {
      textpanel1Data: [
          {
            TEXT: '采集企业总数',
            VAL: 5189
          }
      ],
      count: 0,
      loading: false
    }
  },
  created () {
    this.getzddxdata()
  },
  methods: {
    getzddxdata () {
      this.loading = true
      this.$axiosClient.call('zxxd/zczl/unithome/getzddx', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            let i = res.data.findIndex(d => d.TEXT === '采集企业总数')
            this.count = res.data[i].VAL
            res.data.splice(i, 1)
            this.textpanel1Data = res.data
          } else {
            this.$message.error(res.msg)
          }
          this.loading = false
        })
        .catch(err=> {
          this.$message.error(err)
          this.loading = false            
        })
    }
  }
}
</script>
<style scoped>

</style>
