<template>
    <el-dialog v-dialogDrag title="提交审核不通过原因" width="40%" :visible.sync="myvisible" :top="top" :close-on-click-modal="false" @close="onCancel" custom-class="mydialog">
      <el-row :gutter="2">
        <el-col :span="14">
          <el-col :span="24">
            <el-table
              ref="datatable"
              :data="myValue"
              height="300"
              border
              highlight-current-row
              @row-click="tabrowclick"
              style="width: 100%">
              <el-table-column
                prop="SQYY"
                label="常用短语"
                >
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24" style="margin-top:5px;">
            <el-form status-icon ref="ruleForm" size="medium"   class="demo-ruleForm">
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-if="formdata.xh && formdata.xh !== 'newxh'">
                  <el-form-item>
                    <el-button type="primary" plain icon="el-icon-edit-outline" @click="onEdit" >修改</el-button>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-if="formdata.xh && formdata.xh !== 'newxh'">
                  <el-form-item>
                    <el-button type="primary" plain icon="el-icon-delete" @click="onDel" >删除</el-button>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8"  v-if="formdata.xh !== 'newxh'">
                  <el-form-item>
                    <el-button type="primary" plain icon="el-icon-circle-plus" @click="onAdd" ></el-button>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-if="formdata.xh === 'newxh'">
                  <el-form-item>
                    <el-button type="primary" plain icon="el-icon-delete" @click="add" >新增</el-button>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" v-if="formdata.xh === 'newxh'">
                  <el-form-item>
                    <el-button type="primary" plain icon="el-icon-delete" @click="addCancel" >放弃</el-button>
                  </el-form-item>
              </el-col>
            </el-form>
          </el-col>
        </el-col>
        <el-col :span="10">
          <el-col :span="24">
            <el-input
                type="textarea"
                :rows="12"
                placeholder="请输入内容"
                v-model="formdata.sqyy"
                style="margin-bottom:10px;"
                >
            </el-input>
          </el-col>
          <el-col>
            <el-form status-icon ref="ruleForm" size="medium"   class="demo-ruleForm">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-form-item>
                    <el-button type="primary"  icon="el-icon-upload2" @click="onSubmit" >提交申请</el-button>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-form-item>
                    <el-button type="primary"  icon="el-icon-close" @click="onCancel" >取消</el-button>
                  </el-form-item>
              </el-col>
            </el-form>
          </el-col>
        </el-col>
      </el-row>
    </el-dialog>
</template>
<script>
import * as axiosClient from '../common/axiosClient'
export default {
  props: {
    // 此处一定要用value,实现v-model
    value: {
      type: Array,
      default: () => []
    },
    top: {
      type: String,
      default: '30vh'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      myValue: null,
      myvisible: false,
      formdata: {
        xh: undefined,
        sqyy: ''
      }
    }
  },
  computed: {
  },
  created () {
    this.getdata()
  },
  destroyed () {
  },
  watch: {
    visible (newVal) {
      this.myvisible = newVal
    }
  },
  methods: {
    tabrowclick (row, event, column) {
      this.formdata.xh = row.XH
      this.formdata.sqyy = row.SQYY
    },
    onSubmit () {
      if (this.formdata.sqyy) {
        this.$emit('onsave', this.formdata.sqyy)
      } else {
        this.$message.error('申请原因不能为空')
      }
    },
    onAdd () {
      this.formdata.xh = 'newxh'
      this.formdata.sqyy = ''
      this.$refs.datatable.setCurrentRow()
    },
    addCancel () {
      this.formdata.xh = ''
      this.formdata.sqyy = ''
    },
    add () {
      if (!this.formdata.sqyy) {
        this.$message.error('申请原因不能为空')
        return
      }
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        axiosClient.call('zjgl/dy/add', 'post', this.formdata)
          .then((res) => {
            if (res.status === 1) {
              res.data.SQYY = this.formdata.sqyy
              this.myValue.push(res.data)
              this.$refs.datatable.setCurrentRow(this.myValue[this.myValue.length - 1])
              this.formdata.xh = res.data.XH
              this.$message('新增成功!')
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消删除')
      })
    },
    onEdit () {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        axiosClient.call('zjgl/dy/edit', 'post', this.formdata)
          .then((res) => {
            if (res.status === 1) {
              let index = this.myValue.findIndex(d => d.XH === this.formdata.xh)
              let v = this.myValue[index]
              v.SQYY = this.formdata.sqyy
              if (index >= 0) {
                this.myValue.splice(index, 1, v)
              }
              this.$message('修改成功!')
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消删除')
      })
    },
    onDel () {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        axiosClient.call('zjgl/dy/del', 'post', this.formdata)
          .then((res) => {
            if (res.status === 1) {
              let index = this.myValue.findIndex(d => d.XH === this.formdata.xh)
              if (index >= 0) {
                this.myValue.splice(index, 1)
              }
              this.$message('删除成功!')
              this.formdata.xh = ''
              this.formdata.sqyy = ''
            } else {
              this.$message.error(res.msg)
            }
          })
      }).catch(() => {
        this.$message('已取消删除')
      })
    },
    onCancel () {
      this.$emit('hide')
    },
    getdata () {
      axiosClient.call('zjgl/dy/get', 'get', {})
        .then((res) => {
          if (res.status === 1) {
            this.myValue = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
    }
  }
}
</script>
<style scoped>
</style>
