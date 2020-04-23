<template>
  <div style="width:100%;">
      <el-row>
        <el-col :span="24">
          <el-badge v-for="item in wfxwlist" :key="item.wfxw" :value="item.count" class="item"  style="margin:10px 20px 10px 20px;">
            <el-button size="small" @click="wfxwfilter(item.wfxw)" :class="{buttonactive: queryTmp.WZXWNO === item.wfxw}">{{item.wfxw === '' ? '全部' : item.wfxw}}</el-button>
          </el-badge>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="queryTmp">
            <el-col :xs="12" :sm="12" :md="24" :lg="8" :xl="8">
              <el-form-item label="号牌号码">
                <el-input v-model="queryTmp.HPHM" placeholder="号牌号码" style="width:8em;" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="24" :lg="8" :xl="8">
              <el-form-item label="违法地点">
                <el-input v-model="queryTmp.WFDZ" placeholder="违法地点" style="width:10em;" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-button type="primary" @click="onQuery"  icon="el-icon-search">在({{(queryTmp.WZXWNO === '' || (!queryTmp.WZXWNO)) ? '全部' : queryTmp.WZXWNO}})中筛选</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
              id="table"
              highlight-current-row
              border
              style="width: 100%"
              ref="mytable"
              :data="tableData"
              :max-height="tableh"
              :row-class-name="tableRowClassName"
              :row-style="tableRowStyle"
              :default-sort = "{prop: 'XH1'}"
              @sort-change = "sortChange"
              @row-click="tabrowclick"
              >
              <el-table-column
              prop="XH1"
              label="NO"
              width="60"
              show-overflow-tooltip
              type="index"
              >
              <template slot-scope="scope">
                <i v-if="scope.row.HDBJ === 'p'" class="el-icon-loading" style="margin-left: 10px"></i>
                <span v-else style="margin-left: 10px">{{ scope.row.index+1 }}</span>
              </template>
              </el-table-column>
              <el-table-column
              prop="HPHM"
              label="号牌号码"
              width="120"
              sortable="custom"
              show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
              prop="HPNAME"
              label="号牌种类"
              width="120"
              sortable="custom"
              show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
              prop="WFSJ"
              label="违法时间"
              width="160"
              sortable="custom"
              show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
              prop="WZXWNO"
              label="违法行为"
              width="120"
              sortable="custom"
              show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
              prop="WFDZ"
              label="违法地点"
              width="200"
              sortable="custom"
              show-overflow-tooltip
              >
              </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="margin-top:10px">
          <el-card class="box-card">
            <el-form :model="formdata"  label-suffix=":"   status-icon ref="ruleForm"  label-width="120px" size="medium"   class="demo-ruleForm">
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item label="号牌号码">
                    <el-input v-model="formdata.HPHM"  placeholder="-" ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item label="号牌种类">
                    <el-input v-model="formdata.HPNAME"  placeholder="-"  ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item label="车辆品牌">
                    <el-input v-model="formdata.CGCLPP"  placeholder="-"  ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item label="车身颜色">
                    <el-input v-model="formdata.CGCSYS"  placeholder="-"  ></el-input>
                  </el-form-item>
              </el-col>
               <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item label="违法时间">
                    <el-input v-model="formdata.WFSJ"  placeholder="-"  ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item label="违法地点">
                    <el-input v-model="formdata.WFDZ"  placeholder="-"  ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item label="违法行为">
                    <el-input v-model="formdata.WZXW"  placeholder="-" ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item label="所有人">
                    <el-input v-model="formdata.JDCSYR"  placeholder="-"  ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <el-form-item>
                      <el-button type="primary" icon="el-icon-edit-outline" @click="onShtg()" v-if="formdata.XH">审核通过</el-button>
                  </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <el-form-item>
                      <el-button type="primary" icon="el-icon-s-release" @click="onSqShbtg()" v-if="formdata.XH">申请审核不通过</el-button>
                  </el-form-item>
              </el-col>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    <my-sqshbtgcom  :visible="visible.dialog" @hide="dialoghide" @onsave="sqshbtg"></my-sqshbtgcom>      
  </div>
</template>

<script>
import * as path from '../../../services/paths'
import sqshbtgcom from '../../../components/sqshbtg'
export default {
  name: 'default',
  components: {
    'my-sqshbtgcom': sqshbtgcom
  },
  data: () => {
    return {
      queryTmp: {
        WZXWNO: ''
      },
      query: {},
      source: [],
      pagecacheid: null,
      queyFun: () => {
        return () => {
          return true
        }
      },
      sortFun: () => {
        return null
      },
      taborder: null,
      tabidx: -1,
      tableupdate: true,
      imgidx: 0,
      srcList: [],
      formdata1: {},
      visible: {
        dialog: false
      },
      load: {
        body: false,
        table: false
      }
    }
  },
  computed: {
    tableh () {
      return window.innerHeight - 530
    },
    tableData () {
      let v = this.source.filter(this.queyFun())
      if (this.sortFun()) v.sort(this.sortFun())
      return v
    },
    formdata () {
      let i = this.tabidx
      let v = i === -1 ? {} : Object.assign(
        {},
        this.tableData[i],
        {
          HPNAME: (this.tableData[i].HPZLNO + ':' + this.tableData[i].HPNAME),
          WFSJ: (this.tableData[i].WFSJ.substr(0, 10) + ' ' + this.tableData[i].WFSJ.substr(11, 8))
        }
      )
      return v
    },
    wfxwlist () {
      let a = []
      this.source.forEach(item => {
        a.push(item.WZXWNO)
      })
      let b = Array.from(new Set([...a]))
      let c = []
      c.push({
        wfxw: '',
        count: this.source.length
      })
      b.forEach(wfxw => {
        let d = this.source.filter(item => {
          return item.WZXWNO === wfxw
        }).length
        c.push({
          wfxw: wfxw,
          count: d
        })
      })
      return c
    }
  },
  watch: {
    tabidx (nval) {
      if (nval === -1) return
      this.srcList = []
      this.srcList.push(path['IMGROOT1'] + this.tableData[nval].IMG1)
      this.srcList.push(path['IMGROOT1'] + this.tableData[nval].IMG2)
      this.srcList.push(path['IMGROOT1'] + this.tableData[nval].IMG3)
      this.srcList.push(path['IMGROOT1'] + this.tableData[nval].IMG4)

      this.$refs.mytable.setCurrentRow(this.tableData[nval])
      let scrollS = document.getElementsByClassName('el-table__body-wrapper is-scrolling-none')[0].scrollTop
      let scrollE = scrollS + this.tableh - 96
      let top = document.getElementsByClassName('el-table__row').length > 0 ? document.getElementsByClassName('el-table__row')[nval].offsetTop : 0
      document.getElementsByClassName('el-table__body-wrapper is-scrolling-none')[0].scrollTop = (top >= scrollS && top <= scrollE) ? scrollS : (scrollS + 48)
      // console.log(scrollS, scrollE, top)
    },
    tableData: {
      handler () {
        if (this.tableupdate) {
          this.tabidx = this.tableData.length > 0 ? this.next(0) : -1
          if (this.tableData.length > 0) {
            this.$refs.mytable.setCurrentRow(this.tableData[0])
          }
          document.getElementsByClassName('el-table__body-wrapper is-scrolling-none')[0].scrollTop = 0
          this.tableupdate = false
        }
      },
      deep: true
    },
    query (nval) {
      this.tableupdate = true
      this.queyFun = () => {
        let v = []
        let q = {...nval}
        Object.keys(q).forEach(function (key) {
          if (q[key]) {
            v.push({
              key: key,
              val: q[key]
            })
          }
        })
        let f = function (item) {
          let b = true
          if (item) {
            v.forEach((it) => {
              b = b && (item[it.key].indexOf(it.val) >= 0)
            })
          }
          return b
        }
        return f
      }
    },
    taborder (nval) {
      this.tableupdate = true
      this.sortFun = () => {
        let f = (v1, v2) => {
          if (v1[nval.prop] > v2[nval.prop]) {
            return nval.order === 'ascending' ? 1 : -1
          } else if (v1[nval.prop] < v2[nval.prop]) {
            return nval.order === 'ascending' ? -1 : 1
          } else {
            return 0
          }
        }
        return nval.order ? f : null
      }
    }
  },
  created () {
    this.getData()
  },
  mounted () {
  },
  destroyed () {
    if (this.pagecacheid) {
      let param = {
        scoped: 'page',
        bk: 'm4',
        mk: 'sbcj',
        userid: this._user.ID,
        pagecacheid: this.pagecacheid
      }
      this.$axiosClient.call('PUB_DELDATACACHE', 'get', param).then()
    }
  },
  methods: {
    onQuery () {
      this.tabidx = -1
      this.query = {...this.queryTmp}
    },
    wfxwfilter (wfxw) {
      this.tabidx = -1
      this.queryTmp.HPHM = ''
      this.queryTmp.WFDZ = ''
      this.queryTmp.WZXWNO = wfxw
      this.query = {...this.queryTmp}
    },
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex
    },
    tableRowStyle ({row, rowIndex}) {
      if (rowIndex === this.tabidx) {
        return 'color:#0361EF'
      }
      if (row.HDBJ === '2') {
        return 'color:green'
      } else if (row.HDBJ === '5') {
        return 'color:#A0522D'
      } else if (row.HDBJ === 'E') {
        return 'color:red'
      }
    },
    sortChange ({ column, prop, order }) {
      this.tabidx = -1
      this.taborder = {
        prop: prop,
        order: order
      }
    },
    tabrowclick (row, event, column) {
      this.tabidx = this.next(row.index)
    },
    onShtg () {
      this.$confirm('是否审核通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let i = this.source.findIndex(d => d.XH === this.formdata.XH)
        this.source[i].HDBJ = 'p'
        this.$axiosClient.call('ZJGLM4SBCJSHTG', 'POST', {xh: this.formdata.XH, bklb: '4', firstimgidx: 1})
          .then((res) => {
            this.source[i].HDBJ = res.hdbj
            if (res.status === 0) {
              this.$message.error(res.msg)
            }
          })
        this.tabidx = this.next(this.tabidx + 1)
      }).catch(() => {
        this.$message('已取消')
      })
    },
    onSqShbtg () {
      this.visible.dialog = true
    },
    sqshbtg (sqyy) {
      this.visible.dialog = false
      let i = this.source.findIndex(d => d.XH === this.formdata.XH)
      this.source[i].HDBJ = 'p'
      this.$axiosClient.call('ZJGLM4SBCJSQSHBTG', 'POST', {xh: this.formdata.XH, sqyy: sqyy, bklb: '4', firstimgidx: 1})
        .then((res) => {
          this.source[i].HDBJ = res.hdbj
          if (res.status === 0) {
            this.$message.error(res.msg)
          }
        })
      this.tabidx = this.next(this.tabidx + 1)
    },
    getData () {
      this.load.body = true
      let param = {}
      this.$axiosClient.call('ZJGLM4SBCJGETDATA', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.pagecacheid = res.pagecacheid
            this.source = res.data
            if (this.source.length > 0) {
              this.tabidx = this.next(0)
            }
          } else {
            this.datatag = null
            this.$message.error(res.msg)
          }
          this.load.body = false
        })
    },
    next (start) {
      if (start < this.tableData.length) {
        if (this.tableData[start].HDBJ === '0') {
          return start
        } else {
          return this.next(start + 1)
        }
      } else {
        return -1
      }
    },
    dialoghide (v) {
      // alert(v)
      this.visible.dialog = false
    }
  }
}
</script>

<style scoped>
  .buttonactive {
    border-color: #b7d1e5;
    background-color: #e7f0f6;
  }
</style>
