<template>
    <el-row
      v-loading.lock="load.body"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
        <el-col  :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
           <el-tree id="menu" class="menu" node-key="ID"
            :default-expanded-keys="['R00000000001']"
            :data="treedata"
             :props="defaultProps"
             :expand-on-click-node="false"
             @node-click="handleNodeClick"
              v-loading.lock="load.menu"
              element-loading-text="锁定中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.1)"
             >
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span v-show="data.ID === selectid">
                <el-button
                    type="text"
                    size="mini"
                    @click="() => up(data,node)" v-if="data.SORT !== 1">
                    上移
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click="() => down(data,node)" v-if="node.parent.data.children?(data.SORT<node.parent.data.children.length): false">
                    下移
                </el-button>
                <el-button
                    type="text"
                    size="mini"
                    @click.stop="() => append(data, node)" v-if="data.children">
                    增加
                </el-button>
                </span>
            </span>
           </el-tree>
        </el-col>
        <el-col  :xs="12" :sm="12" :md="12" :lg="18" :xl="18" style="padding:10px;">
            <el-card class="box-card">
              <el-form  label-suffix=":"  :rules="rules" status-icon ref="ruleForm"  :model="formdata" label-width="120px">
                <el-row>
                    <el-col :span="8">
                      <el-form-item label="类型">
                        <el-radio v-model="formdata.ISMENU" label="1">菜单</el-radio>
                        <el-radio v-model="formdata.ISMENU" label="0">功能</el-radio>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                      <el-form-item label="父id">
                        <el-input v-model="formdata.PID"  placeholder="请输入内容"  :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="4">
                      <el-form-item label="父名称">
                        <el-input v-model="formdata.PNAME"  placeholder="请输入内容" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                      <el-form-item label="菜单名称" prop="NAME">
                        <el-input v-model="formdata.NAME"  placeholder="请输入内容" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="4">
                      <el-form-item label="排序">
                        <el-input v-model="formdata.SORT"  placeholder="请输入内容"  :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                      <el-form-item label="视图名称" prop="VIEWNAME">
                        <el-input v-model="formdata.VIEWNAME"  placeholder="请输入内容" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="4">
                      <el-form-item label="组件名称">
                        <el-input v-model="formdata.COMPONENT"  placeholder="请输入内容" clearable></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" :offset="12">
                    <el-form-item>
                      <el-button type="primary" icon="el-icon-plus"  @click="onAdd('ruleForm')" v-if="formdata.ID&&formdata.ID === 'newid'">新增</el-button>
                      <el-button type="primary" icon="el-icon-edit-outline" @click="onEdit('ruleForm')" v-if="formdata.ID&&formdata.ID!=='newid'&&formdata.ID!=='R00000000001'">修改</el-button>
                      <el-button type="primary" icon="el-icon-delete" @click="onDel()" v-if="formdata.ID && formdata.ID !== 'newid'&&(!formdata.children||formdata.children.length==0)">删除</el-button>
                      <el-button icon="el-icon-back" @click="onCancel()" v-if="formdata.ID">取消</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
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
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'NAME'
      },
      formdata: {},
      source: {},
      currentnode: null,
      rules: {
        NAME: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        VIEWNAME: [
          { required: true, message: '视图名称不能为空', trigger: 'blur' }
        ]
      },
      load: {
        body: false,
        menu: false
      }
    }
  },
  computed: {
    selectid () {
      return this.source.ID || 0
    }
  },
  watch: {
    formdata: {
      handler (newValue, oldValue) {
        if (newValue.ID && oldValue.ID === newValue.ID && oldValue.SORT === newValue.SORT) {
          this.load.menu = true
        }
      },
      deep: true
    }
  },
  created () {
    this.load.body = true
    this.getmeuns()
  },
  methods: {
    getmeuns () {
      axiosClient.call('sys/csgl/menu/getmenus', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.treedata = buildtreedata.hasroot(res.data, 'R00000000001', '根ROOT', '000000000000', {SORT: 1})
          } else {
            this.$message(res.msg)
          }
          this.load.body = false
        })
    },
    append (data, node) {
      if (this.formdata.ID !== 'newid') {
        let t = node.parent
        let level = 0
        for (let i = 1; i <= 10; i++) {
          t = t.parent
          if (t === null) {
            level = i
            break
          }
        }
        this.formdata = {
          ID: 'newid',
          ISMENU: '1',
          PID: data.ID,
          PNAME: data.NAME,
          NAME: '新菜单',
          VIEWNAME: '',
          COMPONENT: '',
          SORT: data.children.length + 1,
          children: level < 3 ? [] : null
        }
      }
    },
    onAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        } else {
          this.load.body = true
          axiosClient.call('sys/csgl/menu/addmenu', 'post', this.formdata)
            .then((res) => {
              if (res.status === 1) {
                this.$message('新增成功')
                let children = this.currentnode.data.children || this.currentnode.data
                children.push(Object.assign({}, this.formdata, {ID: res.data}))
                this.formdata = {}
                this.source = {}
                this.$refs['ruleForm'].clearValidate()
                this.load.menu = false
              } else {
                this.$message.error(res.msg)
              }
              this.load.body = false
            })
        }
      })
    },
    onDel () {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axiosClient.call('sys/csgl/menu/delmenu', 'post', this.formdata)
          .then(res => {
            if (res.status === 1) {
              let parent = this.currentnode.parent
              let children = parent.data.children || parent.data
              let index = children.findIndex(d => d.ID === this.formdata.ID)
              children.splice(index, 1)
              for (index; index < children.length; index++) {
                let n = Object.assign({}, children[index])
                n.SORT = n.SORT - 1
                children.splice(index, 1, n)
              }
              this.formdata = {}
              this.source = {}
              this.$refs['ruleForm'].clearValidate()
              this.load.menu = false
              this.$message('删除成功!')
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消删除')
      })
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
            this.load.body = true
            axiosClient.call('sys/csgl/menu/updatemenu', 'post', this.formdata)
              .then(res => {
                if (res.status === 1) {
                  this.formdata = {}
                  this.source = {}
                  this.$refs['ruleForm'].clearValidate()
                  this.load.menu = false
                  this.$message('修改成功!')
                } else {
                  this.$message.error(res.msg)
                }
                this.load.body = false
              })
          }).catch(() => {
            this.$message('已取消删除')
          })
        }
      })
    },
    handleNodeClick (data, node) {
      this.source = Object.assign({}, data)
      this.formdata = data
      this.currentnode = node
    },
    onCancel () {
      this.$refs['ruleForm'].clearValidate()
      let parent = this.currentnode.parent
      // console.log(parent)
      let children = parent.data.children || parent.data
      let index = children.findIndex(d => d.ID === this.source.ID)
      if (index >= 0) {
        children.splice(index, 1, this.source)
      }
      this.formdata = {}
      this.source = {}
      this.load.menu = false
    },
    up (data, node) {
      let parent = node.parent
      let children = parent.data.children || parent.data
      let index = children.findIndex(d => d.ID === data.ID)
      let a = children.slice(index - 1, index + 1)
      let params = [
        {
          ID: a[0].ID,
          SORT: a[1].SORT
        },
        {
          ID: a[1].ID,
          SORT: a[0].SORT
        }
      ]
      axiosClient.call('sys/csgl/menu/movemenu', 'post', params)
        .then(res => {
          if (res.status === 1) {
            let c1 = JSON.parse(JSON.stringify(a[1]))
            let c2 = JSON.parse(JSON.stringify(a[0]))
            let s1 = c1.SORT
            c1.SORT = c2.SORT
            c2.SORT = s1
            children.splice(index - 1, 2, c1, c2)
            this.$message('修改成功')
          } else {
            this.$message(res.msg)
          }
        })
    },
    down (data, node) {
      let parent = node.parent
      let children = parent.data.children || parent.data
      let index = children.findIndex(d => d.ID === data.ID)
      let a = children.slice(index, index + 2)
      let params = [
        {
          ID: a[0].ID,
          SORT: a[1].SORT
        },
        {
          ID: a[1].ID,
          SORT: a[0].SORT
        }
      ]
      axiosClient.call('sys/csgl/menu/movemenu', 'post', params)
        .then(res => {
          if (res.status === 1) {
            let c1 = JSON.parse(JSON.stringify(a[1]))
            let c2 = JSON.parse(JSON.stringify(a[0]))
            let s1 = c1.SORT
            c1.SORT = c2.SORT
            c2.SORT = s1
            children.splice(index, 2, c1, c2)
            this.$message('修改成功')
          } else {
            this.$message(res.msg)
          }
        })
    }
  }
}
</script>

<style scoped>
  .menu {
    min-height: calc(100vh - 130px);
    border: 1px solid #d1dbe5;
    width: 95%;
  }
</style>
