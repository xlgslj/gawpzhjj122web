<template>
<el-container class='myclass'>
  <el-header style="background: #f1f1f1;padding:0;z-index:1;" :style="{'height':(1===2?'119px':'51px')}">
    <el-row  style="height: 51px;border-bottom: solid 1px #d5d5d5;box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);color:#ffffff;z-index:9999"  :style="{'background-color':pcolor}">
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <span class="logo" id="logo"><img src="../assets/logo.png"></span>
            <ul class="nav">
                <li v-for="item in menus1" :key="item.ID"><a href="#" :class="{selected:(menus1Sid === item.ID)}" :style="{'color':(menus1Sid === item.ID ?pcolor:'#ffffff')}" @click="menu1Click(item.ID)">{{item.NAME}}</a></li>
            </ul>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="display:flex; justify-content:flex-end;margin-top:20px;line-height:28px;">
            <div  style="margin-right:25px;">
              <online></online>
            </div>
            <div style="display: flex;align-items: center;color:#fff;margin-right:10px;">
                <div style="margin-right:5px;font-size:1rem;">主题</div>
                <theme-picker></theme-picker>
            </div>
            <div  class="user">
              <el-popover
                placement="top-start"
                width="50"
                trigger="hover"
              >
                <ul class="userlist">
                    <li><a href="#"><i class="el-icon-info" style="font-size:18px;margin-right:10px;"></i>用户信息</a></li>
                    <li><a href="#" @click="mmxg=true"><i class="el-icon-lock" style="font-size:18px;margin-right:10px;"></i>修改密码</a></li>
                    <li><a href="#" @click="logout"><i class="el-icon-switch-button" style="font-size:18px;margin-right:10px;"></i>退出</a></li>
                </ul>
                <span slot="reference"><a href="#" style="color:#fff"><i class="el-icon-user" style="font-size:18px;"></i>{{user.NAME}}({{user.ULX}})</a></span>
              </el-popover>
            </div>
        </el-col>
    </el-row>
    <el-row v-if="1===2">
        <el-col class="headdown">
            <ul class="menu">
                <li><a href="#"><i class="menuico iconfont">&#xe603;</i>表单</a></li>
                <li><a href="#"><i class="menuico iconfont icon1">&#xe607;</i>统计</a></li>
                <li><a href="#"><i class="menuico iconfont icon2">&#xe608;</i>控制台<i class="iconfont menudown">&#xe618;</i></a></li>
                <li><a href="#"><i class="menuico iconfont icon3">&#xe606;</i>数据查询<i class="iconfont menudown">&#xe618;</i></a></li>
            </ul>

            <ul class="menu">
                <li><a href="#"><i class="menuico iconfont">&#xe605;</i>配置</a></li>
                <li><a href="#"><i class="menuico iconfont icon4">&#xe60a;</i>排序</a></li>
                <li><a href="#"><i class="menuico iconfont icon5">&#xe60b;</i>文章编辑<i class="iconfont menudown">&#xe618;</i></a></li>
            </ul>
        </el-col>
    </el-row>
  </el-header>
  <el-container class="content">
    <el-aside class="aside" :style="{'width':isCollapse?'85px':'250px'}">
      <el-menu  default-active="0-0" class="el-menu-vertical-demo left-menu"  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
           <div style="text-align:center; position: relative;">
              <el-tooltip class="item" effect="dark" content="收缩/展开" placement="bottom-start">
                <a href="#"  style="font-size:20px;">
                  <i v-if="isCollapse" class="el-icon-s-unfold"  @click="showmenu(false)"></i>
                  <i v-else class="el-icon-s-fold"  @click="showmenu(true)"></i>
                </a>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="关闭所有打开页面" placement="bottom-start">
                <a href="#" style="position:absolute;right:1px;color:red;font-size:20px;" @click="closeall">
                  <i class="el-icon-s-release" @click="showmenu(false)"></i>
                </a>
              </el-tooltip>
          </div>
        <el-submenu :index="index+''"  v-for="(item,index) in menus2" :key="item.ID">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.NAME}}</span>
          </template>
            <el-menu-item v-for="(item1,index1) in menus3" v-if="item1.PID===item.ID"  :key="item1.ID" :index="index+'-'+index1"   @click="addTab(item1.ID, {})">
               <i class="el-icon-caret-right"></i>
              {{item1.NAME}}
            </el-menu-item>
        </el-submenu>
        <el-menu-item :index="((menus2.length+1)+'')">
          <i class="el-icon-menu"></i>
          <span slot="title">快捷导航</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main :style="{'padding':isCollapse?0:'0 0 0 15px'}">
        <el-tabs v-model="editableTabsValue"  closable @tab-remove="removeTab">
          <el-tab-pane
              v-for="(item) in editableTabs"
              :key="item.id"
              :label="item.title"
              :name="item.id"
          >
          <span slot="label"><i class="el-icon-tickets"></i> {{item.title}}</span>
          <router-view  :name="item.name" :initdata="item.initdata" style="color:red;"/>
          </el-tab-pane>
        </el-tabs>
        <my-pwd :user="user" :visible="mmxg" @hide="mmxg=false"></my-pwd>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import theme from '../components/ThemePicker'
import online from './sys/online'
import * as token from '../common/token'
import pwd from '../components/pwdEdit'
import * as axiosClient from '../common/axiosClient'
export default {
  components: {
    'theme-picker': theme,
    'my-pwd': pwd,
    'online': online
  },
  data: function () {
    return {
      isCollapse: false,
      menus1Sid: null,
      editableTabsValue: '0000000000',
      editableTabs: [{
        id: '0000000000',
        title: '首页',
        name: 'home',
        initdata: {
        }
      }],
      mytimer: null,
      mmxg: false
    }
  },
  watch: {
    pcolor: (nv, ov) => {
      window.localStorage.setItem('pcolor', nv)
    }
  },
  beforeMount () {
    this.menus1Sid = this.menus1.length > 0 ? this.menus1[0].ID : ''
    this.$ws.clients.push(this.onmessage)
  },
  mounted () {
    if (this.menus1.length > 0) {
      this.$router.replace({name: 'leve1'})
    } else {
      this.$router.replace({name: 'Login'})
    }
    this.mytimer = setInterval(() => {
      let exp = token.checkToken(this._token)
      if (!exp) {
        this.$router.replace({name: 'Login'})
      }
    }, 10000)
    this.$EventBus.$on('main', this.Ehandle)
  },
  computed: {
    ...mapState({
    // ...
      _login: '_login',
      menus: '_menus',
      _predefineColors: '_predefineColors',
      user: '_user',
      pcolor: '_pcolor',
      _token: '_token'
    }),
    menus1 () {
      let m = this.menus.filter(item => {
        let hasl1 = item.PID === 'R00000000001'
        // 判断是否有'实'菜单
        let hasl3 = false
        if (hasl1) {
          let m2 = this.menus.filter(it2 => {
            return it2.PID === item.ID
          })
          m2.forEach(it2 => {
            let m3 =  this.menus.filter(it3 => {
              return it3.PID === it2.ID
            })
            hasl3 = hasl3 || m3.filter(it3 => it3.ISMENU === '1').length > 0
          })
        }
        return hasl1 && hasl3
      })
      return m
    },
    menus2 () {
      let m = this.menus.filter(item => {
        let hasl2 = item.PID === this.menus1Sid
        // 判断是否有'实'菜单
        let hasl3 = false
        if (hasl2) {
          let m3 =  this.menus.filter(it3 => {
            return it3.PID === item.ID
          })
          hasl3 = m3.filter(it3 => it3.ISMENU === '1').length > 0     
        }
        return hasl2 && hasl3
      })
      return m
    },
    menus3 () {
      let m = this.menus.filter(item => {
        let pid = item.PID
        let f = this.menus2.find(item2 => {
          let id = item2.ID
          return pid === id && item.ISMENU === '1'
        })
        return f !== undefined
      })
      return m
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapMutations([
      'A_code'
    ]),
    showmenu (f) {
      this.isCollapse = f
    },
    menu1Click (id) {
      this.menus1Sid = id
      // this.isCollapse = false
    },
    handleOpen (key, keyPath) {

    },
    handleClose (key, keyPath) {

    },
    addTab (id, initdata) {
      let t = this.editableTabs.find(item => {
        let tid = item.id
        return tid === id
      })
      if (t) {
        t.initdata = initdata
        this.editableTabsValue = t.id
        return
      }
      let o = this.menus.find(item => {
        let mid = item.ID
        return mid === id
      })
      if (o) {
        this.editableTabs.push({
          id: o.ID,
          title: o.NAME,
          name: o.VIEWNAME,
          initdata: initdata
        })
        this.editableTabsValue = o.ID
      } else {
        this.$message('不能打开页面,你或许没有权限,请与管理员联系')        
      }
    },
    removeTab (targetName) {
      if (targetName === '0000000000') {
        this.$message('本页不能删除')
        return
      }
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.id === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.id
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.id !== targetName)
    },
    closeall () {
      this.editableTabsValue = '0000000000'
      this.editableTabs.splice(1)
    },
    init () {
      axiosClient.call('sys/getinitdata', 'get', {})
        .then(res => {
          if (res.status === 1) {
            this.A_code(res.data)
          } else {
            this.$message(res.msg)
          }
        })
    },
    logout () {
      this.$router.replace({name: 'Login'})
    },
    onmessage (data) {
      if (data.event === 'logon') {
        this.$notify.info({
          title: '提示',
          message: data.name + '上线',
          duration: 3000,
          position: 'bottom-right',
          type: 'success'
        })
      }
    },
    Ehandle (res) {
      switch(res.key) {
        case 'opennew' :
          this.addTab(res.viewid, res.initdata || {})
          break;
        case 'closepage' :
          this.removeTab(this.editableTabs[this.editableTabs.findIndex(d => d.id === res.viewid)].name)
          break;
        default:
          break;
      }
    }
  },
  beforeDestroy () {
    console.log('事件被移出')
    this.$EventBus.$off('main', this.Ehandle)
  },
  destroyed () {
    console.log('定时器关闭')
    clearInterval(this.mytimer)
  }
}
</script>
<style scoped>
  .userlist>li {
    margin-top: 0.67rem;
  }
  .myclass>>>.el-tabs__item,.myclass>>>.el-submenu__title,.myclass>>>.el-menu-item {
    font-size: 1rem;
  }
</style>
<style>
  p, li, input, select, textarea, a,.el-form-item__label,.el-table,span {
      font-size:1rem;
  }
  td,table .el-button--mini,table .el-button--small,table .el-button,.el-button  {
    font-size: 1rem;
  }
   .el-tabs__item,.el-submenu__title,.el-menu-item,.el-radio__label,.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
    font-size: 1rem;
  }
  .el-input {
    font-size: 0.93rem
  }
  .el-input--suffix .el-input__inner {
    padding-right: 2rem;
  }
  .el-input__inner, .el-input--medium .el-input__inner, .el-input--small .el-input__inner {
    height: 2.4rem;
    line-height: 2.4rem;
  }
  .el-table thead {
    color: #42464e;
    font-weight: 500;
  }
  .el-table td,.el-table th {
    padding: 0.4rem 0;
  }
  .el-button {
    padding: 0.5rem 0.6rem;
  }
  .el-form-item,.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0.2rem;
  }
  .el-badge__content {
    border-radius: 0.67rem;
    font-size: 0.8rem;
    height: 1.2rem;
    line-height: 1.2rem;
    padding: 0 0.4rem;
  }
  .el-color-picker--small .el-color-picker__trigger {
    height: 1.8rem;
    width: 1.8rem;
  }
  /*.el-card {
    height: 26rem
  }*/
  /****** */
  .headdown{padding-left:12px; height:68px;border-bottom:solid 1px #d5d5d5;}
  .logo{display:block; margin-left:27px; padding-top:10px; float:left; cursor:pointer;}
  .nav{float:left; margin-top:25px;margin-left:10px;}
  .nav li{float:left; margin-right:3px;}
  .nav li a{display:block;color:#fff; height:26px;padding:0 15px; line-height:23px;}
  .nav li a:hover{background: url(../assets/navbg.png);}
  .nav li a.selected{background:#f1f1f1;}
  .nav li a.selected:hover{background:#f1f1f1;}
  .menu{margin-top:4px; border-right:solid 1px #d2d2d2;float:left; padding:0 5px;}
  .menu li{float:left;}
  .menu li a{color:#2e2e2e; display:block; padding:0 10px; height:56px; padding-top:4px;}
  .menu li a:hover{background:#c4c4c4;}
  .menu li i{display:block; clear:both; text-align:center;}

   .user{margin-right: 10px;}
  .userlist li a{display:block; color:#000; height:25px; line-height:25px; background:none;margin-top:0;padding-right:15px;}
  .userlist li a:hover{background:#CCC;color:#000;}

  .content,.aside,.left-menu {
      height:calc(100vh - 51px);
  }
  .el-tabs__header {
    margin: 0;
  }
  iframe {
    border-width: 0px;
    width:100%;
    height:calc(100vh - 95px);
  }

  /*  dialog */
  .el-dialog.mydialog{
    -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    border-radius: 6px;
  }
  .el-dialog.mydialog .el-dialog__title{
    font-size: 14px;
  }
  .el-dialog.mydialog .el-dialog__header {
    padding: 0 80px 0 20px;
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
    color: #333;
    overflow: hidden;
    background-color: #8080801c;
    border-radius: 2px 2px 0 0;
    font-family: '微软雅黑';
  }
  .el-dialog.mydialog .el-dialog__body {
    padding: 10px 5px 5px 5px
  }
  .el-dialog .el-form-item{
    margin-bottom: 10px;

  }
  .el-dialog__headerbtn{
    top: 15px;
    font-size: 20px;
    font-weight: 700;
  }
  .el-dialog__wrapper,.v-modal {
    top: 91px;
  }
  /******* 地图控制层 */
   .mapcontrols {
    border: solid 1px #56B5ED;
    width: 200px;
    position: absolute;
    top: 20px;
    right: 5px;
    margin: 5px;
    background-color: white;
    filter:alpha(Opacity=70);
    -moz-opacity:0.7;
    opacity: 0.7;
}
.mapcontrols table {
    width: 100%;
    padding: 2px 0 0 0;
    font-size: 13px;
    text-decoration: none;
    border-collapse: collapse;
    text-align: center;
    white-space: normal;
    line-height: normal;
    font-weight: normal;
    font-size: medium;
    font-style: normal;
    color: -internal-quirk-inherit;
    text-align: start;
    font-variant: normal;    
}

.mapcontrols tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
.mapcontrols tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
    height: 30px;
}

.mapcontrols td {
    border: 1px solid #3689C1;
    padding: 5px;
}
.mapcontrols .active {
    background-color: #00ced1;  
}
</style>
