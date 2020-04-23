<template>
    <div>
        <el-row>
          <el-col :span="24" class="title">
            <slot name="title"></slot>
          </el-col>
        </el-row>
        <el-row  @click.native="onclick(item)" type="flex" class="row-bg" :class="{actived: item.TEXT === currenttxt}" justify="space-between" v-for="(item,index) in indata" :key="item.TEXT">
            <el-col :span="20">
                <el-col :span="4">
                    <transition
                      appear
                      appear-class="init-in"
                      appear-to-class="init-out" 
                      appear-active-class="initing"
                    >   
                      <div style="width:2rem;height:1.33rem;border-radius: 0.33rem;margin:1rem 0 1rem 0;" :style="{'background-color':(color[index%color.length])}">
                      </div>
                    </transition>
                </el-col>
                <el-col :span="20">
                    <transition
                      appear
                      appear-class="init-in"
                      appear-to-class="init-out" 
                      appear-active-class="initing"
                    >   
                      <div class="row-bg rtext">
                        <slot name="text" :row="item">{{item.TEXT}}</slot>
                      </div>
                    </transition>
                </el-col>
            </el-col>
            <el-col :span="4">
                <transition
                  appear
                  appear-class="init-in"
                  appear-to-class="init-out" 
                  appear-active-class="initing"
                >  
                  <div  class="row-bg">
                    <el-button type="text" style="font-size: 1rem;font-family: '黑体';font-weight: 700;color: #909399;">{{item.VAL}}</el-button>
                  </div>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: 'default',
  props: {
    indata: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: () => {
    return {
      color: [
        '#19d4ae',
        '#5ab1ef',
        '#fa6e86',
        '#ffb980',
        '#0067a6',
        '#c4b4e4',
        '#d87a80',
        '#9cbbff',
        '#d9d0c7',
        '#d87a80'
      ],
      currenttxt: ''
    }
  },
  computed: {
    randcolor () {
      // const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
      let i = Math.floor(Math.random() * ((this.indata.length -1) - 0 + 1)) + 0
      return this.color[i]
    }
  },
  created () {
    if (this.indata.length) {
      this.currenttxt = this.indata[0].TEXT
    }
  },
  methods: {
    onclick (item) {
      if (item.TEXT !== this.currenttxt) {
        this.currenttxt = item.TEXT
        this.$emit('onclick', item)
      }
    }
  }
}
</script>
<style scoped>
    .init-in {
      transform: translateY(33.33rem);
    }
    .init-out {
       transform: translateY(-1.33rem);
    }
    .initing {
        transition: all 0.2s;    
    }
    .row-bg {
        line-height:3.33rem;
    }
   .row-bg:hover{
        background:#F2F6FC;
        cursor:pointer;    
    }
    .actived {
        background:#F8E9E2;    
    }
    .title {
      text-align:center;
      font-size: 1.33rem;      
      font-family: "Open Sans";
      font-weight: 600;
      color: #303133;
    }
    .rtext {
      font-size: 1.2rem;      
      font-family: "Open Sans";
      font-weight: 600;
      color: #606266;
    }
    .rtext1 {
      font-size: 1rem;
      font-family: "Open Sans";
      font-weight: 600;

      color: #909399;
    }
</style>