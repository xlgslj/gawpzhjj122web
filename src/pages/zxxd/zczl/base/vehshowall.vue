<template>
  <div>
      <vehshowall :initdata="initdata">
          <template v-slot:other1>
                <el-tab-pane label="治脏违法">
                  <vehvios :initdata="initdata"></vehvios>
                </el-tab-pane>              
          </template>
      </vehshowall>
  </div>
</template>

<script>
import vehshowall from '../../../jcxxpt/veh/base/vehshowall'
import vehvios from './vehvios'
export default {
  name: 'default',
  components: {
    vehshowall: vehshowall,
    vehvios: vehvios
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
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style scoped>

</style>
