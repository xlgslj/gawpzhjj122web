<template>
    <el-row>
        <el-col :span="24">
            <div class="button"  :style="{'background-color':pcolor}" @click="onclick">
                <slot></slot>
            </div>    
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'default',
  props: ['value'],
  data: () => {
    return {
      pcolor: window.localStorage.getItem('pcolor') || '#1065A7'
    }
  },
  methods: {
    onclick () {
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
    .button {
        display: block;
        width: 100%;
        line-height: 60px;
        text-align: center;
        margin-top: 20px;
        border-radius: 3px;
        color: #ffffff;
        font-size: 25px;
        font-family: "黑体";
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 12px 40px 0 rgba(0, 0, 0, 0.3);
        text-shadow: 1px 1px 1px white, -1px -1px 1px black;
        cursor: pointer;
    }

    .button:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4), 0 24px 80px 0 rgba(0, 0, 0, 0.3);
        text-shadow: 1px 1px 1px black, -1px -1px 1px white;
    }
</style>
