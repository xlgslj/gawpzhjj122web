<template>
    <div id="warp" type="flex"  justify="center" :style="{'background-color':pcolor}">
        <div id="separate"></div>
      <transition
        appear
        appear-class="custom-appear-class"
        appear-to-class="custom-appear-to-class"
        appear-active-class="custom-appear-active-class"
        appear-leave-class="custom-appear-leave-class"
      >        
        <div>
            <el-row type="flex"  justify="center" >
                <el-col :xs="24" :sm="24" :md="16" :lg="8" :xl="8">
                    <div class="loginlogo"></div>
                    <div class="loginpanel" >
                        <h2>攀枝花市公安交警综合应用平台</h2>
                        <ul class="userlogin">
                            <li><i class="el-icon-user"></i><input type="text" id="name" class="loginuser" v-model.lazy="user.name" placeholder="用户名" ></li>
                            <li><i class="el-icon-unlock"></i><input type="password" id="pwd" class="loginpassword" v-model.lazy="user.pwd" placeholder="密码"></li>
                            <li><a href="#" @click="login" id="login"  :style="{'background-color':pcolor}">登录</a></li>
                            <li><span><input type="checkbox" class="logincheck" v-model="saved"></span>记住我的信息</li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </div>
      </transition>
    </div>
</template>

<script>
import { Loading } from 'element-ui'
import {mapState, mapMutations} from 'vuex'
import * as axiosClient from '../common/axiosClient'
export default {
  name: 'login',
  data: function () {
    return {
      pcolor: window.localStorage.getItem('pcolor') || '#227447',
      user: {
        name: window.localStorage.getItem('loginname') || '',
        pwd: window.localStorage.getItem('pwd') || ''
      },
      saved: window.localStorage.getItem('saveduserinfo') ? JSON.parse(window.localStorage.getItem('saveduserinfo')) : false,
      loadingInstance1: null
    }
  },
  computed: {
    ...mapState({
    // ...
      _login: '_login',
      _menus: '_menus',
      _token: '_token'
    })
  },
  methods: {
    login () {
      this.loadingInstance1 = Loading.service({
        fullscreen: false,
        spinner: 'el-icon-loading',
        target: '#login',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      if (this.user.name === null || this.user.pwd === null || this.user.name === '' || this.user.pwd === '') {
        this.$message('用户名或密码不能为空')
        this.loadingInstance1.close()
        return
      }
      axiosClient.call('LOGIN', 'get', this.user)
        .then(res => {
          return new Promise((resolve, reject) => {
            // console.log(res)
            if (res.status === 0) {
              reject(res.msg)
              return
            }
            // this.A_token(res.token)
            resolve(res.data)
          })
        })
        .then(this.getMenus)
        .catch(err => {
          this.$message(err)
          this.loadingInstance1.close()
        })
    },
    getMenus (user) {
      let qx = user.QXS
      let b = JSON.parse(qx)
      axiosClient.call('GETUSERMENUS', 'get', {qxlx: user.QXLX, qxs: '\'' + b.join('\',\'') + '\''})
        .then(res => {
          if (res.status === 1) {
            if (this.saved) {
              localStorage.setItem('loginname', this.user.name)
              localStorage.setItem('pwd', this.user.pwd)
              localStorage.setItem('saveduserinfo', this.saved)
            } else {
              localStorage.clear()
            }
            this.A_login(true)
            this.A_menus(res.data)
            this.A_user(user)
            this.$router.replace({name: 'Main'})
          } else {
            this.$message('你或许没有被授权')
          }
          this.loadingInstance1.close()
        })
    },
    ...mapMutations([
      'A_login',
      'A_menus',
      'A_token',
      'A_user',
      'A_code'
    ])
  }
}
</script>

<style scoped>
  .custom-appear-class {
    width: 100px;
  }
  .custom-appear-to-class {
    width: 200px;
  }
  .custom-appear-active-class{
    transition: width 0.1s; 
  }

</style>

<style>
    #warp {
        height:calc(100vh);
    }
    #separate {
         height:calc((100vh - 486px)/2);
    }
    .loginlogo {
         background:url('../assets/login_logo.png') no-repeat center center;
         height:58px;
         width:100%;
         margin:0 auto;
    }
    .loginpanel {
        width:547px;
         height:375px;
         background:#fff;
         margin:0 auto;
        box-shadow:5px 8px 0px rgba(0,0,0,.2);
        margin-top:53px;
    }
   .loginpanel h2 {
       font-family: '微软雅黑';
       font-size:24px;
       font-weight:normal;
       line-height:81px;
       text-align:center;
    }
    .userlogin{width:486px; height:215px; background:#f1f1f1; border-top:solid 1px #e5e5e5; border-left:solid 1px #e5e5e5; margin-left:30px; padding-top:38px; overflow:hidden;}
    .userlogin li{width:306px;padding-left:89px;margin-bottom:17px;*margin-bottom:15px;height:40px; position:relative;}
    .loginuser,.loginpassword{width:303px; height:40px; background:#fff; border-left:solid 3px #eac282; text-indent:40px; color:#676767;font-family:'微软雅黑'; line-height:40px;float:left;}
    .userlogin i{font-size:20px;}
    .userlogin li i{display:block; position:absolute; left:108px; top:13px;}
    .userlogin li a{width:306px; height:40px; line-height:40px; text-align:center; display:block; color:#fff; font-size:16px;}
    .userlogin li a:hover{color:#fff;filter:alpha(opacity=85);-moz-opacity:0.85; opacity:0.85;}
    .logincheck{width:15px; height:15px;}
    .userlogin li span{padding-left:20px; padding-right:8px; float:left;}
</style>
