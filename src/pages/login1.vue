<template>
    <div class="body">
        <el-row type="flex"  justify="end" style="height:6rem;">
            <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <el-col :span="2">
                <img src="../assets/logo1.png" style="margin-top:0.33rem;">
                </el-col>
            <el-col :span="22"><img src="../assets/top1.png" style="width:20rem;margin-top:1.5rem;margin-left:4rem;"></el-col>
            </el-col>
            <el-col :span="12">
                <div class="lognav">
                    <ul>
                        <li class="lognavdq"><a href="#" title="本站">本站</a></li>
                        <em>|</em>
                        <li><a href="#" title="支队主页">支队主页</a></li>
                        <em>|</em>
                        <li><a href="#" title="公安交通管理综合应用平台">公安交通管理综合应用平台</a></li>
                        <em>|</em>
                        <li><a href="#" title="集成指挥平台">集成指挥平台</a></li>
                    </ul>
                </div>
                <div class="top_dh">
                    <p><img src="../assets/dhtb.png">0812-3332288</p>
                </div>
            </el-col>
        </el-row>
        <el-row style="height:29.67rem;" v-if="1===1">
            <el-col :span="24">
                <el-carousel height="29.67rem" :interval="5000">
                    <el-carousel-item v-for="item in 3" :key="item">
                        <img v-show="item ===1 " src="../assets/nanb1.jpg" style="width:100%;">
                        <img v-show="item ===2 " src="../assets/nanb2.jpg" style="width:100%;">
                        <img v-show="item ===3 " src="../assets/nanb3.jpg" style="width:100%;">
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
        <div class="ryl">
            <div>
                <img src="../assets//ry2.jpg" width="40" height="40">四川省“人民满意的公务员集体”
            </div>
            <div>
                <img src="../assets//ry3.jpg" width="40" height="40">四川省优秀公安基层单位
            </div>
            <div>
                <img src="../assets//ry4.jpg" width="40" height="40">四川省第二批省级学法用法师范机关单位
            </div>
            <div>
                <img src="../assets//ry5.jpg" width="40" height="40">全省公安机关新中国成立70周年大庆维稳工作集体二等功
            </div>
            <div>
                <img src="../assets//ry6.jpg" width="40" height="40">全国一等车管所
            </div>
        </div>
        <el-row type="flex"  justify="end">
            <el-col :span="12">
                <div class="i_about">
                    <h2><img src="../assets/zt1.png"></h2>
                    <p>攀枝花市交警支队组建于1987年，负责组织、指挥全市道路交通安全管理工作，依法处置道路交通违法行为和交通事故，维护交通秩序和公路治安秩序；承担机动车辆安全检测、驾驶员考试考核及其牌证发放工作；负责安全教育和宣传工作。<br/><br/>现任支队长:王富春。</p>
                    <a href="#">查看详情</a>
                </div>
            </el-col>
            <el-col  :xs="12" :sm="12" :md="12" :lg="6" :xl="6" style="position:relative;">
                <transition
                    name="logbtn"
                    appear
                    appear-class="init-in"
                    appear-to-class="init-out" 
                    appear-active-class="initing"
                >                
                    <a v-if="loadmod.login" href="#" class="logbtn"  style="position:absolute;left:50%;top:50%;" @click="loadmod.login = !loadmod.login">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
                </transition>
                <transition
                    name="logbtn"
                    appear
                    appear-class="init-in"
                    appear-to-class="init-out" 
                    appear-active-class="initing"
                >                
                    <loginform :pageuuid="pageuuid" v-if="!loadmod.login" style="position:absolute;right:10%;bottom:0rem;" @oncancel="loadmod.login = !loadmod.login"></loginform>
                </transition>                
            </el-col>
        </el-row>
    </div>
</template>

<script>
import loginform from './sys/loginform'
export default {
  name: 'login',
  components: {
    loginform: loginform
  },
  data: function () {
    return {
      pageuuid: null,
      imgs: [],
      loadmod: {
        login: true
      }
    }
  },
  mounted () {
    this.updatefontsize()    
     // 当调整窗口大小时重绘canvas
    window.onresize = () => {
      this.updatefontsize()
    }
    this.pageuuid = this.generateUUID()
    this.$ws.creatClient(this.pageuuid)
  },
  methods: {
    updatefontsize () {
      let dwidth = document.documentElement.clientWidth
      if (dwidth <1024) 
        document.documentElement.style.fontSize = '10px'
      else if (dwidth < 1500) 
        document.documentElement.style.fontSize = '12px'
      else 
        document.documentElement.style.fontSize = '15px' 
    },
    generateUUID () {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
  },
  destroyed () {
    window.onresize = null
  }
}
</script>
<style>
    .el-button {
        padding: 0.5rem 0.6rem;
    }
    .el-input__inner, .el-input--medium .el-input__inner {
        height: 2.4rem;
        line-height: 2.4rem;
    }
    .el-button {
        font-size: 0.8rem;
    }
</style>
<style scoped>
    /**** */
    .body {
        font-size: 1rem;
    }
    img {
        border: 0;
        vertical-align: middle;
    }
    em {
        font-style:normal
    }
    .lognav {
        height:6rem;
        float:left;
    }
    .lognav ul li {
        float:left;
        list-style-type:none;
        height:5.8rem;
        line-height:5.8rem;
    }
    .lognav ul li:hover {
        border-bottom:0.2rem #3fbe72 solid;
    }
    .lognav ul em {
        float:left;
        display:block;
        height:5.8rem;
        line-height:5.8rem;
        font-weight:100;
        color:#D9D9D9;
    }
    .lognav ul li a {
        text-decoration:none;
        color:#5e5e5e;
        height:5.8rem;
        padding:0px 1.2rem;
        display:block;
        font-family:"微软雅黑";
        float:left;
        line-height:5.8rem;
        font-size: 1rem;
    }
    .lognavdq {
        border-bottom:0.2rem #3fbe72 solid;
    }
    .top_dh {
        width: 15rem;
        height: 6rem;
        float: left;
        /*line-height: 6rem;*/
        /*text-align: right;*/
    }
    .top_dh p img {
        margin-top: -0.2rem;
    }
    .top_dh p {
        margin: 0px;
        color: #3fbe72;
        font-size: 1.4rem;
        font-weight: 100;
        font-family: "HelveNueThin";
        padding-right: 0.67rem;
    }
    .ryl{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:center;
        height:4.93rem;
        width:100%;
        border-bottom: 0.067rem #e0ebef solid;
    }
    .ryl>div {
        float: left;
        line-height: 5rem;
        font-size: 1rem;
        color: #919191;
        font-family: "Arial";
        margin-left: 4rem;
    }
    .i_about h2 {
        width: 100%;
        height: 5rem;
        line-height: 2.93rem;
        text-align: center;
        font-size: 1.9rem;
        color: #3fbe72;
        font-weight: 100;
        font-family: "jdxyj";
        padding-top: 3rem;
        margin-bottom: 1.33rem;
    }
    .i_about p {
        width: 100%;
        height: 1.47rem;
        text-align: left;
        font-size: 1rem;
        color: #6b6a6a;
        font-weight: 100;
        font-family: "微软雅黑";
        letter-spacing: 0.67rem;
        margin: 0;
        padding: 0;
    }
    .i_about a {
        width: 14.67rem;
        height: 2.67rem;
        border: 0.067rem #e0ebef solid;
        -moz-border-radius-topleft: 1.33rem;
        -moz-border-radius-topright: 1.33rem;
        -moz-border-radius-bottomleft: 1.33rem;
        -moz-border-radius-bottomright: 1.33rem;
        -webkit-border-top-left-radius: 1.33rem;
        -webkit-border-top-right-radius: 1.33rem;
        -webkit-border-bottom-left-radius: 1.33rem;
        -webkit-border-bottom-right-radius: 1.33rem;
        border-top-left-radius: 1.33rem;
        border-top-right-radius: 1.33rem;
        border-bottom-right-radius: 1.33rem;
        border-bottom-left-radius: 1.33rem;
        border-radius: 1.33rem 1.33rem 1.33rem 1.33rem;
        display: block;
        margin: 0 auto;
        text-align: center;
        line-height: 2.67rem;
        color: #3fbe72;
        margin-top: 5rem;
        text-decoration: none;
        font-size: 1rem;
        font-family: "微软雅黑";
    }
    .logbtn{
        width: 11.33rem;
        height: 2.67rem;
        border: 0.067rem #e0ebef solid;
        -moz-border-radius-topleft: 1.33rem;
        -moz-border-radius-topright: 1.33rem;
        -moz-border-radius-bottomleft: 1.33rem;
        -moz-border-radius-bottomright: 1.33rem;
        -webkit-border-top-left-radius: 1.33rem;
        -webkit-border-top-right-radius: 1.33rem;
        -webkit-border-bottom-left-radius: 1.33rem;
        -webkit-border-bottom-right-radius: 1.33rem;
        border-top-left-radius: 1.33rem;
        border-top-right-radius: 1.33rem;
        border-bottom-right-radius: 1.33rem;
        border-bottom-left-radius: 1.33rem;
        border-radius: 1.33rem 1.33rem 1.33rem 1.33rem;
        display: block;
        margin: 0 auto;
        text-align: center;
        line-height: 2.67rem;
        color: rgb(90, 177, 239);
        text-decoration: none;
        font-size: 1rem;
        font-family: "微软雅黑";
    }
    .logbtn:hover {
        border: 0.067rem #e0ebef solid;        
        background-color:  rgb(90, 177, 239);
        color: #ffffff;
    }
    .init-in {
      transform: translateX(-33.33rem);
      opacity: 0;
    }
    .init-out {
       transform: translateX(1.33rem);
    }
    .initing {
        transition: all 0.5s;    
    }
    .logbtn-enter-active {
        transition: all 0.5s;
     }
    .logbtn-enter {
        transform: translateY(-33.33rem);  
        opacity: 0;   
    }
    .logbtn-enter-to {
        transform: translateY(1.33rem);    
    }    
    .logbtn-leave-active {
        transition: all 0.5s;    
    }
    .logbtn-leave {
        transform: translateX(1.33rem);    
    }
    .logbtn-leave-to {
        transform: translateX(-33.33rem); 
        opacity: 0;   
    }

</style>
