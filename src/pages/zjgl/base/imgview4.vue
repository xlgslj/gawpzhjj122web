<template>
  <div style="width:100%;">
      <el-row :gutter="20">
          <el-col :span="12">
            <pic-zoom
              :url="srcList[0]"
              :scale="2.5"
              :oheight="imgh"
              class="myimg1"
            >
              <template v-slot:header >
                <span style="color:#ffffff;font-size: 30px;font-weight: 700;background-color: darkblue;">{{viodata.HPHM}}</span>
              </template>
            </pic-zoom>
          </el-col>
          <el-col :span="12">
            <pic-zoom
              :url="srcList[1]"
              :scale="5"
              :oheight="imgh"
              class="myimg2"
            >
            </pic-zoom>
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="12">
            <pic-zoom
              :url="srcList[2]"
              :scale="5"
              :oheight="imgh"
              class="myimg3"
            >
            </pic-zoom>
          </el-col>
          <el-col :span="12">
            <pic-zoom
              :url="srcList[3]"
              :scale="5"
              :oheight="imgh"
              class="myimg4"
            >
            </pic-zoom>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import vuePhotoZoomPro from '../../../components/vue-photo-zoom-pro'
export default {
  name: 'default',
  components: {
    'pic-zoom': vuePhotoZoomPro
  },
  props: {
    srcList: {
      type: Array,
      default: () => {
        return []
      }
    },
    viodata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => {
    return {
      imgwidth: 100
    }
  },
  computed: {
    imgh () {
      return this.imgwidth * 3 / 4 + 'px'
    }
  },
  methods: {
  },
  mounted () {
    this.imgwidth = document.querySelector('.myimg1').clientWidth
    window.onresize = () => { // 定义窗口大小变更通知事件
      this.imgwidth = document.querySelector('.myimg1').clientWidth
    }
  }
}
</script>
<style scoped>
  .myimg1,.myimg2,.myimg3,.myimg4 {
    border: 1px solid  #000;
    width: 100%;
    margin-top: 10px;
  }
  .myimg1::after {
    position:absolute;
    top:0;
    left:90%;
    color:red;
    font-size: 30px;
    font-weight: 700;
    content:"1";
  }
  .myimg2::after {
    position:absolute;
    top:0;
    left:90%;
    color:red;
    font-size: 30px;
    font-weight: 700;
    content:"2";
  }
  .myimg3::after {
    position:absolute;
    top:0;
    left:90%;
    color:red;
    font-size: 30px;
    font-weight: 700;
    content:"3";
  }
  .myimg4::after {
    position:absolute;
    top:0;
    left:90%;
    color:red;
    font-size: 30px;
    font-weight: 700;
    content:"4";
  }
</style>
