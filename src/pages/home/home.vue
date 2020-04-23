<template>
  <div style="margin-top:5px;padding-bottom:5px;">
    <el-row :gutter="10">
      <el-col :span="18">
          <vio :comh="comh"></vio>
      </el-col>
      <el-col :span="6">
        <unit :comh="comh"></unit>
      </el-col>
    </el-row>
    <el-row  style="margin-top:5px;">
      <el-col :span="24">
        <vio1 :comh="comh"></vio1>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vio from './base/vio'
import vio1 from './base/vio1'
import unit from './base/unit'
export default {
  name: 'default',
  components: {
    vio: vio,
    vio1: vio1,
    unit: unit
  },
  data: () => {
    return {
      data: ''
    }
  },
  computed: {
    comh () {
      return (window.innerHeight -110 )/2
    }
  },
  methods: {
  }
}
</script>
<style scoped>

</style>
