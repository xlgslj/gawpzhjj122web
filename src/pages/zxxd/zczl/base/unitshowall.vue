<template>
  <div>
      <unitshowall :initdata="initdata">
          <template v-slot:other1>
                <el-tab-pane label="治脏违法">
                  <unitvios :initdata="initdata"></unitvios>
                </el-tab-pane>              
          </template>
      </unitshowall>
  </div>
</template>

<script>
import unitshowall from '../../../jcxxpt/unit/base/unitshowall'
import unitvios from './unitvios'
export default {
  name: 'default',
  components: {
    unitshowall: unitshowall,
    unitvios: unitvios
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
