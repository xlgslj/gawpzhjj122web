<template>
    <el-row
      v-loading.lock="load.body"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
      <el-col  :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
        <el-tree id="menu" class="menu" node-key="ID"
        :default-expanded-keys="['000000000001']"
        :data="treedata"
        :props="defaultProps"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        v-loading.lock="load.tree"
        element-loading-text="锁定中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        >
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-show="data.ID === selectid">
            <el-button
                v-if="data.children"
                type="text"
                size="mini"
                @click.stop="() => add(data, node)">
                增加
            </el-button>
            </span>
        </span>
        </el-tree>
      </el-col>
      <el-col  :xs="12" :sm="12" :md="12" :lg="18" :xl="18">
        <el-card class="box-card">
          <el-form :model="formdata"  label-suffix=":"  :rules="rules" status-icon ref="ruleForm"  label-width="120px" size="medium"   class="demo-ruleForm">
             <el-row>
                <el-col :span="8">
                  <el-form-item label="上级单位id">
                    <el-input v-model="formdata.PID"  placeholder="请输入内容"  :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="4">
                  <el-form-item label="上级单位名称">
                    <el-input v-model="formdata.PNAME"  placeholder="请输入内容" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                <el-col :span="8">
                  <el-form-item label="单位编码" prop="BMNO">
                    <el-input v-model="formdata.BMNO"  placeholder="请输入内容" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="4">
                  <el-form-item label="单位名称" prop="NAME">
                    <el-input v-model="formdata.NAME"  placeholder="请输入内容" clearable></el-input>
                  </el-form-item>
                </el-col>
             </el-row>
             <el-row>
                <el-col :span="8">
                  <el-form-item label="联系人">
                    <el-input v-model="formdata.LXR"  placeholder="请输入内容" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="4">
                  <el-form-item label="联系电话">
                    <el-input v-model="formdata.LXDH"  placeholder="请输入内容" clearable></el-input>
                  </el-form-item>
                </el-col>
             </el-row>
             <el-row>
               <el-col :span="12" :offset="12">
                  <el-form-item>
                      <el-button type="primary" icon="el-icon-plus"  @click="onAdd('ruleForm')" v-if="formdata.ID&&formdata.ID === 'newid'">新增</el-button>
                      <el-button type="primary" icon="el-icon-edit-outline" @click="onEdit('ruleForm')" v-if="formdata.ID&&formdata.ID!=='newid'">修改</el-button>
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
      currentnode: null,
      defaultProps: {
        children: 'children',
        label: 'NAME'
      },
      formdata: {},
      source: {},
      rules: {
        NAME: [
          { required: true, message: '单位名称不能为空', trigger: 'blur' }
        ],
        BMNO: [
          { required: true, message: '单位编码不能为空', trigger: 'blur' },
          { min: 12, max: 12, message: '12 个字符', trigger: 'blur' }
        ]
      },
      load: {
        body: false,
        tree: false
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
        if (newValue.ID && oldValue.ID === newValue.ID) {
          this.load.tree = true
        }
      },
      deep: true
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    add (data, node) {
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
          PID: data.ID,
          PNAME: data.NAME,
          LXR: '',
          LXDH: '',
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
          axiosClient.call('sys/qxgl/bm/addbm', 'post', this.formdata)
            .then((res) => {
              if (res.status === 1) {
                this.$message('新增成功')
                let children = this.currentnode.data.children || this.currentnode.data
                children.push(Object.assign({}, this.formdata, {ID: res.data}))
                this.formdata = {}
                this.source = {}
                this.$refs['ruleForm'].clearValidate()
                this.load.tree = false
              } else {
                this.$message.error(res.msg)
              }
              this.load.body = false
            })
        }
      })
    },
    onDel (formName) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.load.body = true
        axiosClient.call('sys/qxgl/bm/delbm', 'post', this.formdata)
          .then(res => {
            if (res.status === 1) {
              let parent = this.currentnode.parent
              let children = parent.data.children || parent.data
              let index = children.findIndex(d => d.ID === this.formdata.ID)
              children.splice(index, 1)
              this.formdata = {}
              this.source = {}
              this.$refs['ruleForm'].clearValidate()
              this.load.tree = false
              this.$message('删除成功!')
            } else {
              this.$message.error(res.msg)
            }
            this.load.body = false
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
            axiosClient.call('sys/qxgl/bm/updatebm', 'post', this.formdata)
              .then(res => {
                if (res.status === 1) {
                  this.formdata = {}
                  this.source = {}
                  this.$refs['ruleForm'].clearValidate()
                  this.load.tree = false
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
    onCancel () {
      this.$refs['ruleForm'].clearValidate()
      let parent = this.currentnode.parent
      let children = parent.data.children || parent.data
      let index = children.findIndex(d => d.ID === this.source.ID)
      if (index >= 0) {
        children.splice(index, 1, this.source)
      }
      this.formdata = {}
      this.source = {}
      this.load.tree = false
    },
    handleNodeClick (data, node) {
      this.source = Object.assign({}, data)
      this.formdata = data
      this.currentnode = node
    },
    getdata () {
      axiosClient.call('sys/qxgl/bm/getallbms', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            let index = res.data.findIndex(d => d.ID === '000000000001')
            this.treedata = this.treedata.concat(buildtreedata.hasroot(res.data, '000000000001', '攀枝花市公安局交通警察支队', '000000000000', '', res.data[index]))
            console.log(this.treedata)
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
