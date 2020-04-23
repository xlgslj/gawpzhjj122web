<template>
    <div class="wrap" :style="{'width':width}" tabindex="99">
       <el-input v-model="myValue.name"
         v-on:click.native.stop="inputclick"
         placeholder="请选择单位"
         readonly
         style="width:100%;"
         suffix-icon="el-icon-caret-bottom"
        >
        </el-input>
       <div  class="ljtree"  style="display:none;" ref="tree">
            <el-tree node-key="ID"
            :default-expanded-keys="defaultexpanded"
            :data="treedata"
            :props="defaultProps"
            :expand-on-click-node="false"
            @node-click="treeclidk"
            >
            </el-tree>
       </div>
    </div>
</template>
<script>
import * as axiosClient from '../common/axiosClient'
import * as buildtreedata from '../common/buildtreedata'
export default {
  props: {
    // 此处一定要用value,实现v-model
    value: {
      type: Object,
      default: () => {
        return {
          id: '',
          name: ''
        }
      }
    },
    width: {
      type: String,
      default: '200px'
    },
    clear: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      myValue: null,
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'NAME'
      },
      test: 'xlgslj',
      myfun: () => {
        let tree = document.getElementsByClassName('ljtree')
        for (let i = 0; i < tree.length; i++) {
          tree[i].style.display = 'none'
        }
      }
    }
  },
  computed: {
    defaultexpanded () {
      return this.myValue.id ? [this.myValue.id] : ['000000000001']
    }
  },
  created () {
    this.myValue = this.value
    let body = document.body
    body.addEventListener('click', this.myfun, false)
    if (this.clear) {
      this.treedata = [
        {
          ID: '',
          NAME: '',
          PID: '',
          children: []
        }
      ]
    }
    this.getdata()
  },
  destroyed () {
    let body = document.body
    body.removeEventListener('click', this.myfun, false)
  },
  watch: {
    // 监听prop传的value，如果父级有变化了，将子组件的myValue也跟着变，达到父变子变的效果
    value: {
      handler (newVal) {
        this.myValue = newVal
      },
      deep: true
    },
    // 监听myValue，如果子组件中的内容变化了，通知父级组件，将新的值告诉父级组件，我更新了，父级组件接受到值后页就跟着变了
    myValue: {
      handler (newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  methods: {
    treeclidk (data) {
      this.myValue.name = data.NAME
      this.myValue.id = data.BMNO
      console.log(this.myValue)
      this.myfun()
    },
    inputclick () {
      let v = this.$refs.tree.style.display
      if (v) {
        this.$refs.tree.style.display = ''
      } else {
        this.$refs.tree.style.display = 'none'
      }
    },
    getdata () {
      axiosClient.call('sys/qxgl/bm/getallbms', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.treedata = this.treedata.concat(buildtreedata.hasroot(res.data, '000000000001', '攀枝花市公安局交通警察支队', '000000000000', '510400000000', {SORT: 1}))
          } else {
            this.$message(res.msg)
          }
        })
    }
  }
}
</script>
<style scoped>
  .wrap {
    position:relative;display: inline-block;
  }
  .ljtree {
    position:absolute;top:42px;width:100%;z-index:9999;
    border: 1px solid #DCDFE6;
    max-height: 40vh;
    overflow: auto;
    border-radius: 4px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
