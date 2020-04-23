<template>
  <div>
    <el-row>
        <el-col :span="24">
            <el-card  shadow="always"  :style="{height:(comh -2 ) + 'px'}">
                <el-table
                    v-loading.lock="loading"
                    element-loading-text="处理中"
                    element-loading-spinner="el-icon-loading" 
                    :data="tabdata"
                    :show-header="true"                       
                    style="width: 100%">
                    <el-table-column
                    prop="SUM"
                    label="违法量"
                    width="80">
                    </el-table-column>                      
                    <el-table-column
                    prop="DWMC"
                    label="单位名称"
                    width="300"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="80">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small"  @click="unitmore(scope.row)" >详细</el-button>
                    </template>
                    </el-table-column>
                </el-table>
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
  data: () => {
    return {
      tabdata: [],
      loading: false
    }
  },
  methods: {
    getdata () {
      this.loading = true
      this.$axiosClient.call('HOMEGETTABLE1DATA', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.tabdata = res.data
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
