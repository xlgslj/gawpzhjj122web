<template>
  <div>
    <el-row>
      <el-col :span="8">
        <ve-line :data="chartData"></ve-line>
      </el-col>
      <el-col :span="8">
        <ve-line :data="chartData"></ve-line>
      </el-col>
      <el-col :span="8">
        <ve-map :data="chartData1"></ve-map>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'default',
  data: () => {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810 },
          { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4398 },
          { '日期': '2018-05-24', '访问用户': 92381, '下单用户': 52910 }
        ]
      },
      chartData1: {
        columns: ['位置', '税收', '人口', '面积'],
        rows: [
          { '位置': '吉林', '税收': 123, '人口': 123, '面积': 92134 },
          { '位置': '北京', '税收': 1223, '人口': 2123, '面积': 29234 },
          { '位置': '上海', '税收': 2123, '人口': 1243, '面积': 94234 },
          { '位置': '浙江', '税收': 4123, '人口': 5123, '面积': 29234 }
        ]
      },
      test: 'nowebsocket'
    }
  },
  beforeMount () {
    this.$ws.clients.push(this)
  },
  methods: {
    onmessage (data) {
      this.test = data.event
    }
  }
}
</script>
