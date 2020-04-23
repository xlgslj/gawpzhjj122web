<template>
  <div>
    <el-row>
        <el-col :span="24">
            <el-card  shadow="always" :style="{height:(comh -2 ) + 'px'}">
                <div slot="header" class="clearfix">
                    <span style="font-weight: 700;">{{_user.DWNAME + ' '}}<span style="color:red;">{{year}}年</span> 非现场违法证据采集情况</span>
                    <i class="el-icon-refresh" style="float: right; padding: 3px 0;font-size:20px;" @click="refresh"></i>                   
                </div>
                <ve-histogram
                  v-loading.lock="loading"
                  element-loading-text="处理中"
                  element-loading-spinner="el-icon-loading"  
                 :data="chartData" :extend="extend"  :height="(comh - 54) + 'px'"></ve-histogram>                
            </el-card>            
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'default',
  props: {
    comh: {
      type: Number,
      default: 400
    }
  },
  data: function () {
    this.extend = {
      series: {
        type: 'bar',
        label: { show: true, position: "top" }
      }
    }  
    return {
      chartData: {
        columns: [], // ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          // { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      loading: false
    }
  },
  computed: {
    year () {
      return  (new Date()).getFullYear()
    }
  },
  created () {
    this.getchartdata(this.year)
  },
  methods: {
    refresh () {
      this.getchartdata(this.year, true)
    },
    getchartdata (year, isref) {
      this.loading = true
      this.$axiosClient.call('home/getndfxccfqk', 'get', {year: year, dwno: this._user.DWNO, refresh: isref})
        .then((res) => {
          if (res.status === 1) {
            this.chartData.columns = res.data.cols
            this.chartData.rows = res.data.rows
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
i {
  cursor: pointer;
}
</style>
