<template>
    <el-row
      :gutter="20"
      v-loading.lock="load.body"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
     >
        <el-col
          id="left"
          :span="10"
          v-loading.lock="load.table"
          element-loading-text="锁定中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)"
          >
          <el-form :inline="true" :model="formdata" class="demo-form-inline" style="margin-top:10px;">
            <el-form-item label="角色名">
              <el-input v-model="formdata.name" placeholder="角色名" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onQuery"  icon="el-icon-search">查询</el-button>
              <el-button type="info"  @click="add" icon="el-icon-plus">新增</el-button>
            </el-form-item>
          </el-form>
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
              prop="ID"
              label="ID"
              width="140">
            </el-table-column>
            <el-table-column
              prop="NAME"
              label="角色名"
              width="300">
            </el-table-column>
            <el-table-column
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button  type="text" size="small"  @click="edit(scope.row)" >编辑</el-button>
                <el-button  type="text" size="small"  @click="ondel(scope.row)" >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
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
        <el-col class="right" :span="14" v-show="formdata1.ID">
          <el-col :span="24">
            <el-card class="box-card" style="margin:10px;">
              <el-form :inline="true" :model="formdata1"  :rules="rules" ref="ruleForm" class="demo-form-inline" style="margin-top:10px;">
                <el-form-item label="角色名" prop="NAME">
                  <el-input v-model="formdata1.NAME" :disabled="!formdata1.ID" placeholder="角色名" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onEdit('ruleForm')"  icon="el-icon-edit-outline" v-if="formdata1.ID && formdata1.ID !== 'newid'">修改</el-button>
                  <el-button type="warning" @click="onAdd('ruleForm')"  icon="el-icon-edit-outline" v-if="formdata1.ID === 'newid'">新增保存</el-button>
                  <el-button icon="el-icon-back" @click="onCancel()" v-if="formdata1.ID">取消</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
           <el-tree  class="menu" node-key="ID" :default-expanded-keys="['R00000000001']" :data="treedata" :props="defaultProps"
              show-checkbox
              ref="tree"
              @check-change="onTreeCheck"
              >
           </el-tree>
        </el-col>
    </el-row>
</template>

<script>
import * as axiosClient from '../../../common/axiosClient'
import * as buildtreedata from '../../../common/buildtreedata'
export default {
  name: 'default',
  data: () => {
    return {
      tableData: [],
      page: {
        currentPage: 1,
        size: 10
      },
      total: 0,
      formdata: {
        name: ''
      },
      menus: [],
      treedata: [],
      CheckedNodes: [],
      formdata1: {
      },
      source: {

      },
      defaultProps: {
        children: 'children',
        label: 'NAME'
      },
      rules: {
        NAME: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      },
      load: {
        body: false,
        table: false
      }
    }
  },
  computed: {
    tableh () {
      return window.innerHeight - 183
    }
  },
  created () {
    this.init()
  },
  watch: {
    formdata1: {
      handler (newValue, oldValue) {
        // console.log(oldValue.ID, newValue.ID)
        if (newValue.ID && oldValue && (oldValue.ID === newValue.ID)) {
          // newValue.ID === undefined ,防止没有任何选择，oldValue.ID === newValue.ID，防止在不同菜单项切换时出现遮罩
          this.load.table = true
        }
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
    onTreeCheck (data, ck) {
      // console.log(JSON.stringify(this.$refs.tree.getCheckedKeys()))
      if (this.formdata1.ID && this.formdata1.IDS !== JSON.stringify(this.$refs.tree.getCheckedKeys())) {
        this.formdata1.IDS = JSON.stringify(this.$refs.tree.getCheckedKeys()) // 不能用cks,会多个0000000000的虚节点
      }
    },
    add () {
      this.formdata1 = {}
      this.source = {}
      this.formdata1.ID = 'newid'
      this.formdata1.IDS = '[]'
      this.$refs.tree.setCheckedKeys([])
      this.load.table = true
    },
    onAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {
          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axiosClient.call('sys/qxgl/role/addrole', 'post', this.formdata1)
              .then((res) => {
                if (res.status === 1) {
                  this.$message('新增成功')
                  this.formdata1.ID = res.data
                  this.tableData.push(this.formdata1)
                  this.$refs.tree.setCheckedKeys([])
                  this.formdata1 = {}
                  this.source = {}
                  this.load.table = false
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
    ondel (row) {
      this.$confirm('是否继续删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axiosClient.call('sys/qxgl/role/delrole', 'post', row)
          .then((res) => {
            if (res.status === 1) {
              this.$message('删除成功')
              let index = this.tableData.findIndex(d => d.ID === row.ID)
              if (index >= 0) {
                this.tableData.splice(index, 1) // 对于数组元素直接用 formdata1=source 将不能触发视图刷新
              }
              this.$refs.tree.setCheckedKeys([])
              this.formdata1 = {}
              this.source = {}
              this.load.table = false
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消')
      })
    },
    edit (row) {
      this.formdata1 = row // JSON.parse(JSON.stringify(row)),不能用这种方式,因为相当于初始化,改变了对象的引用,会触发watch
      this.source = JSON.parse(JSON.stringify(row))
      this.$refs.tree.setCheckedKeys(JSON.parse(this.source.IDS))
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
            axiosClient.call('sys/qxgl/role/updaterole', 'post', this.formdata1)
              .then((res) => {
                if (res.status === 1) {
                  this.$message('修改成功')
                  this.$refs.tree.setCheckedKeys([])
                  this.formdata1 = {}
                  this.source = {}
                  this.load.table = false
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
    onQuery () {
      this.page.currentPage = 1
      this.getData()
    },
    getData () {
      this.load.body = true
      let param = Object.assign(this.page, this.formdata)
      axiosClient.call('sys/qxgl/role/getroles', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.tableData = res.data
            this.total = res.count
          } else {
            this.$message.error(res.msg)
          }
          this.load.body = false
        })
    },
    init () {
      this.load.body = true
      let param = Object.assign(this.page, this.formdata)
      let roles = axiosClient.call('sys/qxgl/role/getroles', 'get', param)
      let menus = axiosClient.call('sys/csgl/menu/getmenus', 'get', {})
      Promise.all([roles, menus])
        .then(res => {
          if (res[0].status === 1) {
            this.tableData = res[0].data
            this.total = res[0].count
          } else {
            this.$message.error(res[0].msg)
          }
          if (res[1].status === 1) {
            this.treedata = buildtreedata.hasroot(res[1].data, 'R00000000001', '根ROOT', '000000000000', {SORT: 1})
          } else {
            this.$message.error(res[1].msg)
          }
          this.load.body = false
        })
    },
    onCancel () {
      this.$refs.tree.setCheckedKeys([])
      this.formdata1 = {}
      let index = this.tableData.findIndex(d => d.ID === this.source.ID)
      if (index > 0) {
        this.tableData.splice(index, 1, this.source) // 对于数组元素直接用 formdata1=source 将不能触发视图刷新
      }
      this.source = {}
      this.$refs['ruleForm'].resetFields()
      this.load.table = false
    }
  }
}
</script>
<style scoped>
  .el-form-item {
      margin-bottom: 10px;
  }
  .menu {
    border-right: none;
    width: 95%;
  }
  .right {
     min-height: calc(100vh - 100px);
    border-left: 1px solid #d1dbe5;
  }
</style>
