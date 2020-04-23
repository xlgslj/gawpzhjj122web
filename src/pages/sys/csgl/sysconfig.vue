<template>
  <el-row
    :gutter="20"
    style="margin-top:10px;"
    v-loading.lock="load.body"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <el-col
      id="left"
      :span="14"
      v-loading.lock="load.table"
      element-loading-text="锁定中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
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
          prop="KEYWORD"
          label="关键字"
          width="160">
        </el-table-column>
        <el-table-column
          prop="NAME"
          label="参数名"
          width="350">
        </el-table-column>
        <el-table-column
          prop="VALUE"
          label="参数值"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button  type="text" size="small"  @click="edit(scope.row)" >编辑</el-button>
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
    <el-col :span="10"  v-show="formdata.ID">
      <el-card class="box-card" style="margin:0 10px 0 10px;">
        <el-form :model="formdata"  label-suffix=":"  :rules="rules" status-icon ref="ruleForm"  label-width="150px" size="medium"   class="demo-ruleForm">
          <el-form-item label="关键字">
            <el-input v-model="formdata.KEYWORD"  placeholder="请输入内容"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="配置说明">
            <el-input v-model="formdata.NAME"  placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item v-for="(item,index) in params" :key="index"  :label="item.name" :prop="item.prop">
            <el-input v-if="index === 0" v-model="formdata.V1" :type="item.lx" placeholder="请输入内容"></el-input>
            <el-input v-else-if="index === 1" v-model="formdata.V2" :type="item.lx"  placeholder="请输入内容"></el-input>
            <el-input v-else-if="index === 2" v-model="formdata.V3" :type="item.lx" placeholder="请输入内容"></el-input>
            <el-input v-else-if="index === 3" v-model="formdata.V4" :type="item.lx" placeholder="请输入内容"></el-input>
            <el-input v-else v-model="formdata.V5" :type="item.lx" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-edit-outline" @click="onEdit('ruleForm')" v-if="formdata.ID">修改</el-button>
            <el-button type="primary" icon="el-icon-delete" @click="onDel()" v-if="formdata.ID">删除</el-button>
            <el-button icon="el-icon-back" @click="onCancel()" v-if="formdata.ID">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import * as axiosClient from '../../../common/axiosClient'
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
      formdata: {},
      source: {},
      rules: {
        V1: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        V2: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        V3: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        V4: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        V5: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      load: {
        body: false,
        table: false
      }
    }
  },
  created () {
    this.getData()
  },
  computed: {
    params: {
      get () {
        let v = []
        let d = this.formdata
        if (d.ID) {
          d.K1 && d.LX1 ? v.push(Object.assign({}, {name: d.K1, lx: d.LX1, value: d.V1, prop: 'V1'})) : (() => {})()
          d.K2 && d.LX2 ? v.push(Object.assign({}, {name: d.K2, lx: d.LX2, value: d.V2, prop: 'V2'})) : (() => {})()
          d.K3 && d.LX3 ? v.push(Object.assign({}, {name: d.K3, lx: d.LX3, value: d.V3, prop: 'V3'})) : (() => {})()
          d.K4 && d.LX4 ? v.push(Object.assign({}, {name: d.K4, lx: d.LX4, value: d.V4, prop: 'V4'})) : (() => {})()
          d.K5 && d.LX5 ? v.push(Object.assign({}, {name: d.K5, lx: d.LX5, value: d.V5, prop: 'V5'})) : (() => {})()
        }
        return v
      },
      set (val) {
        console.log(val)
      }
    },
    tableh () {
      return window.innerHeight - 133
    }
  },
  watch: {
    formdata: {
      handler (newValue, oldValue) {
        if (newValue.ID === oldValue.ID) {
          this.load.table = true
        }
        let v = ((newValue.V1 ? newValue.V1 : '') && newValue.V1) +
          ((newValue.V2 ? newValue.V2 : '') && ('|' + newValue.V2)) +
          ((newValue.V3 ? newValue.V3 : '') && ('|' + newValue.V3)) +
          ((newValue.V4 ? newValue.V4 : '') && ('|' + newValue.V4)) +
          ((newValue.V5 ? newValue.V5 : '') && ('|' + newValue.V5))
        newValue.VALUE = v
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
    onDel () {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.load.body = true
        axiosClient.call('sys/csgl/sysconfig/delsysconfig', 'post', this.formdata)
          .then(res => {
            if (res.status === 1) {
              let index = this.tableData.findIndex(d => d.ID === this.formdata.ID)
              this.tableData.splice(index, 1)
              this.formdata = {}
              this.source = {}
              this.$refs['ruleForm'].clearValidate()
              this.load.table = false
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
    edit (row) {
      this.formdata = row
      this.source = Object.assign({}, row)
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
            this.load.table = true
            axiosClient.call('sys/csgl/sysconfig/updatesysconfig', 'post', this.formdata)
              .then(res => {
                if (res.status === 1) {
                  this.formdata = {}
                  this.source = {}
                  this.$refs['ruleForm'].clearValidate()
                  this.load.table = false
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
      let index = this.tableData.findIndex(d => d.ID === this.source.ID)
      if (index >= 0) {
        this.tableData.splice(index, 1, this.source)
      }
      this.$refs['ruleForm'].clearValidate()
      this.formdata = {}
      this.source = {}
      this.load.table = false
    },
    getData () {
      this.load.body = true
      let param = this.page
      axiosClient.call('sys/csgl/sysconfig/getsysconfigs', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            res.data.forEach(item => {
              let v = ((item.V1 ? item.V1 : '') && item.V1) +
               ((item.V2 ? item.V2 : '') && ('|' + item.V2)) +
               ((item.V3 ? item.V3 : '') && ('|' + item.V3)) +
               ((item.V4 ? item.V4 : '') && ('|' + item.V4)) +
               ((item.V5 ? item.V5 : '') && ('|' + item.V5))
              Object.assign(item, {VALUE: v})
            })
            this.tableData = res.data
            this.total = res.count
          } else {
            this.$message.error(res.msg)
          }
          this.load.body = false
        })
    }
  }
}
</script>
