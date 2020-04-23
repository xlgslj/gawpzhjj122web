<template>
  <div style="width:60%;">
    <el-row>
        <el-col :span="24">
          <el-card
            v-loading.lock="loading"
            element-loading-text="处理中"
            element-loading-spinner="el-icon-loading"            
           class="box-card" >
            <el-form :model="user" status-icon  ref="ruleForm" label-width="50px" class="demo-ruleForm">
              <el-form-item label="账号" prop="pass">
                <el-input prefix-icon="el-icon-user-solid" type="text" v-model="user.name" autocomplete="off" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="checkPass">
                <el-input  prefix-icon="el-icon-lock" type="password" v-model="user.pwd" autocomplete="off" clearable show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="24">
                    <el-checkbox v-model="saved">保存登录信息</el-checkbox> 
                  </el-col> 
                  <el-col :span="24">             
                    <el-button v-if="pageuuid" type="primary" @click="login">登录</el-button>
                    <el-button  @click="oncancel">取消</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import * as axiosClient from '../../common/axiosClient'
export default {
  name: 'default',
  props: {
    pageuuid: {
      type: String,
      default: null
    }
  },
  data: () => {
    return {
      user: {
        name: window.localStorage.getItem('loginname') || '',
        pwd: window.localStorage.getItem('pwd') || ''
      },
      saved: window.localStorage.getItem('saveduserinfo') ? JSON.parse(window.localStorage.getItem('saveduserinfo')) : false,
      loading: false
    }
  },
  methods: {
    oncancel () {
      this.$emit('oncancel')
    },
    login () {
      this.loading = true
      if (this.user.name === null || this.user.pwd === null || this.user.name === '' || this.user.pwd === '') {
        this.$message('用户名或密码不能为空')
        this.loading = false
        return
      }
      axiosClient.call('login/login', 'get', Object.assign(this.user, {UUID: this.pageuuid}))
        .then(res => {
          return new Promise((resolve, reject) => {
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
          this.loading = false
        })
    },
    getMenus (user) {
      let qx = user.QXS
      console.log(1, qx)
      let b = JSON.parse(qx)
      console.log(2)
      axiosClient.call('login/getusermenus', 'get', {qxlx: user.QXLX, qxs: '\'' + b.join('\',\'') + '\''})
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
          this.loading = false
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
.el-card__body {
  padding: 0.8rem;
}
.el-form-item {
  margin-bottom: 0.5rem;
}
.el-input__inner {
  height: 2rem;
  line-height: 2rem;
}
</style>
