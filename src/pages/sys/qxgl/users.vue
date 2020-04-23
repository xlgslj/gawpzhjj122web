<template>
  <div
    id="wrap"
    v-loading.lock="load.body"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
   >
    <el-row :gutter="20">
        <el-col id="left" :span="24">
          <el-row>
            <el-form :inline="true" :model="formdata" class="demo-form-inline" style="margin-top:10px;">
              <el-form-item label="单位">
                <my-dwselect v-model="dw" width="100%" clear></my-dwselect>
              </el-form-item>
              <el-form-item label="账号">
                <el-input v-model="formdata.loginname" placeholder="角色名" clearable></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="formdata.name" placeholder="角色名" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onQuery"  icon="el-icon-search">查询</el-button>
                <el-button type="info"  @click="add" icon="el-icon-plus">新增</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row>
            <el-table
              id="table"
              :data="tableData"
              :max-height="tableh"
              border
              style="width: 100%">
              <el-table-column
                prop="XH"
                label="NO"
                width="50">
              </el-table-column>
              <el-table-column
                prop="ULX"
                label="用户类型"
                width="100">
              </el-table-column>
              <el-table-column
                prop="DWNAME"
                label="单位"
                width="250">
              </el-table-column>
              <el-table-column
                prop="LOGINNAME"
                label="账号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="NAME"
                label="姓名"
                width="100">
              </el-table-column>
              <el-table-column
                prop="SFZHM"
                label="身份证号码"
                width="200">
              </el-table-column>
              <el-table-column
                prop="UBH"
                label="警员(员工)编号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="TEL"
                label="联系电话"
                width="100">
              </el-table-column>
              <el-table-column
                prop="QXLX"
                label="权限类型"
                width="100">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button  type="text" size="small"  @click="edit(scope.row)" >编辑</el-button>
                  <el-button  type="text" size="small"  @click="ondel(scope.row)" >删除</el-button>
                  <el-button  type="text" size="small"  @click="onsetpwd(scope.row)" >密码</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
    </el-row>
    <el-dialog v-dialogDrag :modal-append-to-body="false" title="用户信息" width="60%" top="5vh" :visible.sync="visible.dialog" :close-on-click-modal="false" @close="onCancel" custom-class="mydialog">
      <el-row>
        <el-col :span="24">
          <el-form :model="formdata1"  label-suffix=":"  :rules="rules" status-icon ref="ruleForm"  label-width="100px" size="medium"   class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位" prop="DWNAME">
                  <my-dwselect v-model="dw1" width="100%"></my-dwselect>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户名" prop='LOGINNAME'>
                    <el-input placeholder="用户名:英文+数字" suffix-icon="el-icon-edit-outline"  v-model="uname"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户类型">
                  <el-radio-group v-model="formdata1.ULX">
                    <el-radio label="非警员">非警员</el-radio>
                    <el-radio label="警员">警员</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="警号/工号" prop="STATE">
                    <el-input  suffix-icon="el-icon-edit-outline"  readonly v-model="formdata1.UBH"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="8">
                <el-form-item label="姓名" prop="NAME">
                  <el-input placeholder="中文" suffix-icon="el-icon-edit-outline"  v-model="formdata1.NAME"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12"  :offset="4">
                <el-form-item label="身份证号" prop="SFZHM">
                    <el-input placeholder="18位" suffix-icon="el-icon-edit-outline"  v-model="formdata1.SFZHM"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>
              <el-col :span="8">
                <el-form-item label="密码有效期">
                  <el-date-picker
                    v-model="formdata1.MMYXQ"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col  :span="8"  :offset="4">
                <el-form-item label="联系电话">
                    <el-input placeholder="11位手机号" suffix-icon="el-icon-edit-outline"  v-model="formdata1.TEL"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="开启IP限制" prop="IPXZ">
                  <el-switch
                    v-model="formdata1.IPXZ"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8"  :offset="4">
                <el-form-item label="固定IP1">
                    <el-input placeholder="0.0.0.0" suffix-icon="el-icon-edit-outline"  v-model="formdata1.IP1"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="固定IP2">
                  <el-input placeholder="0.0.0.0" suffix-icon="el-icon-edit-outline"  v-model="formdata1.IP2"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8"  :offset="4">
                <el-form-item label="固定IP3">
                    <el-input placeholder="0.0.0.0" suffix-icon="el-icon-edit-outline"  v-model="formdata1.IP3"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>-->
            <el-row>
              <el-col :span="12">
                <el-form-item label="权限类型" prop="QXLX">
                  <el-radio-group v-model="formdata1.QXLX">
                    <el-radio label="角色权限">角色权限</el-radio>
                    <el-radio label="自由权限">自由权限</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="账号状态" prop="STATE">
                  <el-radio-group v-model="formdata1.STATE">
                    <el-radio label="正常">正常</el-radio>
                    <el-radio label="停用">停用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :style="{height:formdata1.QXLX === undefined?'20px':'288px'}" style="overflow: auto;">
                <el-transfer  v-if="formdata1.QXLX === '角色权限'" v-model="formdata1.QXS" :data="roles" :titles="['备选','已选']"></el-transfer>
                <el-tree  v-if="formdata1.QXLX === '自由权限'"  node-key="ID"
                  :default-checked-keys="formdata1.QXS"
                  :default-expanded-keys="['R00000000001']"
                  :data="menus"
                  :props="{children: 'children',label: 'NAME'}"
                  show-checkbox
                  ref="tree"
                  @check-change="onTreeCheck"
                  >
                </el-tree>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button v-if="formdata1.ID === 'newId'" type="primary" @click="onAdd('ruleForm')">新增</el-button>
        <el-button v-else type="primary" @click="onEdit('ruleForm')">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axiosClient from '../../../common/axiosClient'
import DwSelect from '../../../components/DwSelect'
import * as buildtreedata from '../../../common/buildtreedata'
export default {
  name: 'default',
  components: {
    'my-dwselect': DwSelect
  },
  data: () => {
    return {
      tableData: [],
      page: {
        currentPage: 1,
        size: 10
      },
      total: 0,
      roles: [],
      menus: [],
      formdata: {
        loginname: '',
        name: '',
        dwno: ''
      },
      source: {},
      formdata1: {},
      dw: {
        id: '',
        name: ''
      },
      dw1: {
        id: '',
        name: ''
      },
      rules: {
        DWNAME: [
          { required: true, message: '请选择单位', trigger: 'blur' }
        ],
        LOGINNAME: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        NAME: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        SFZHM1: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          { min: 18, max: 18, message: '18 个字符', trigger: 'blur' }
        ],
        IPXZ: [
          { required: true, message: 'IPXZ必须选择', trigger: 'change' }
        ],
        STATE: [
          { required: true, message: '状态必须选择', trigger: 'change' }
        ],
        QXLX: [
          { required: true, message: '权限类型必须选择', trigger: 'change' }
        ],
        customerTel: [
          {
            type: 'number',
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: '手机号格式不对',
            trigger: 'blur'
          }
        ],
        SFZHM: [
          { required: true, message: '请填写证件号码', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }
        ],
      },
      visible: {
        dialog: false
      },
      load: {
        body: false
      },
      test: 'aa'
    }
  },
  computed: {
    tableh () {
      return window.innerHeight - 183
    },
    uname: {
      get: function(){
        return this.formdata1.LOGINNAME;
      },
      set : function(val){
        this.formdata1.LOGINNAME = val.toUpperCase();
      }
    }
  },
  created () {
    // console.log(this.tableh)
    this.getData()
    this.getRolesAndMenus()
  },
  watch: {
    dw1: {
      handler (newval, oldval) {
        this.formdata1.DWNO = newval.id
        this.formdata1.DWNAME = newval.name
      },
      deep: true
    },
    'formdata1.QXLX': {// 深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        if (oldVal && val && (val !== oldVal)) {
          if (val === this.source.QXLX) {
            this.formdata1.QXS = [].concat(this.source.QXS)
          } else {
            this.formdata1.QXS = []
          }
        }
      },
      deep: true
    },
    'formdata1.LOGINNAME': {// 深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        this.formdata1.UBH = val
      },
      deep: true
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.currentPage = 1
      this.page.size = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getData()
    },
    add () {
      this.source = {
        QXS: []
      }
      this.formdata1 = {
        ID: 'newId',
        QXS: [],
        DWNO: '',
        DWNAME: null,
        IPXZ: false,
        STATE: '正常',
        QXLX: '角色权限',
        ULX: '非警员',
        LOGINNAME: null
      }
      this.dw1.id = ''
      this.dw1.name = ''
      this.visible.dialog = true
    },
    onAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {
          this.load.body = true
          axiosClient.call('sys/qxgl/user/adduser', 'post', this.formdata1)
            .then((res) => {
              if (res.status === 1) {
                this.$message('新增成功')
                this.$refs['ruleForm'].clearValidate()
                this.visible.dialog = false
                this.tableData.push(Object.assign({}, this.formdata1, {ID: res.data, XH: this.tableData[this.tableData.length - 1].XH + 1}))
              } else {
                this.$message.error(res.msg)
              }
              this.load.body = false
            })
        }
      })
    },
    ondel (row) {
      this.$confirm('是否继续删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axiosClient.call('sys/qxgl/user/deluser', 'post', row)
          .then((res) => {
            if (res.status === 1) {
              this.$message('删除成功')
              let index = this.tableData.findIndex(d => d.ID === row.ID)
              if (index >= 0) {
                this.tableData.splice(index, 1) // 对于数组元素直接用 formdata1=source 将不能触发视图刷新
              }
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消')
      })
    },
    edit (row) {
      console.log(row)
      this.formdata1 = row // JSON.parse(JSON.stringify(row)),不能用这种方式,因为相当于初始化,改变了对象的引用,会触发watch
      this.dw1.id = row.DWNO
      this.dw1.name = row.DWNAME
      this.source = Object.assign({}, row)
      this.visible.dialog = true
    },
    onEdit (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {
          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axiosClient.call('sys/qxgl/user/updateuser', 'post', this.formdata1)
              .then((res) => {
                if (res.status === 1) {
                  this.$message('修改成功')
                  if (this.$refs.tree) {
                    this.$refs.tree.setCheckedKeys([])
                  }
                  this.formdata1 = {}
                  this.source = {}
                  this.$refs['ruleForm'].clearValidate()
                  this.visible.dialog = false
                } else {
                  this.$message.error(res.msg)
                }
              })
          }).catch(() => {
            this.$message('已取消')
          })
        }
      })
    },
    onsetpwd (row) {
      this.$confirm('修改密码,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axiosClient.call('SETPWD', 'post', {ID: row.ID})
          .then((res) => {
            if (res.status === 1) {
              this.$message('修改成功')
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消')
      })
    },
    onQuery () {
      Object.assign(this.formdata, {dwno: this.dw.id})
      console.log(this.formdata)
      this.page.currentPage = 1
      this.getData()
    },
    onCancel () {
      this.$refs['ruleForm'].clearValidate()
      let index = this.tableData.findIndex(d => d.ID === this.formdata1.ID)
      if (index >= 0) {
        this.tableData.splice(index, 1, this.source)
      }
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys([])
      }
      this.visible.dialog = false
    },
    onTreeCheck (data, ck) {
      this.formdata1.QXS = this.$refs.tree.getCheckedKeys()
    },
    getData () {
      this.load.body = true
      let param = Object.assign(this.page, this.formdata)
      axiosClient.call('sys/qxgl/user/getusers', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            res.data.forEach(item => {
              Object.assign(item, {QXS: JSON.parse(item.QXS)})
            })
            this.tableData = res.data
            this.total = res.count
          } else {
            this.$message.error(res.msg)
          }
          this.load.body = false
        })
    },
    getRolesAndMenus () {
      let task1 = axiosClient.call('sys/csgl/menu/getmenus', 'get', {})
      let task2 = axiosClient.call('sys/qxgl/role/getroles', 'get', {currentPage: 1, size: 10000, name: ''})
      Promise.all([task1, task2])
        .then(res => {
          if (res[0].status === 1) {
            this.menus = buildtreedata.hasroot(res[0].data, 'R00000000001', '根ROOT', '000000000000', {SORT: 1})
          }
          if (res[1].status === 1) {
            res[1].data.map(item => {
              this.roles.push({
                key: item.ID,
                label: item.NAME,
                disabled: false
              })
            })
          }
        })
    }
  }
}
</script>
<style scoped>
  .el-form-item {
      margin-bottom: 10px;
  }
</style>
