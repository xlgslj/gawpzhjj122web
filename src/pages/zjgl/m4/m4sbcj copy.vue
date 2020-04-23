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
     :span="14"
     v-loading.lock="load.table"
     element-loading-text="锁定中"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0.1)"
     >
      <el-col :span="24">
        <el-form :inline="true" :model="queryTmp" class="demo-form-inline">
          <el-form-item label="号牌号码">
            <el-input v-model="queryTmp.HPHM" placeholder="-" clearable></el-input>
          </el-form-item>
          <el-form-item label="违法地点">
            <el-input v-model="queryTmp.WFDZ" placeholder="-" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery"  icon="el-icon-search">筛选</el-button>
          </el-form-item>
        </el-form>
      </el-col>
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
            width="110"
            sortable="custom"
            show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
            prop="HPNAME"
            label="号牌种类"
            width="110"
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
            width="110"
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
    </el-col>
    <el-col :span="10">
        <el-col :span="12">
            <el-image  @click="imgidx=0" :style="{'height':imgh}" class="myimg1" :src="srcList[0]" :preview-src-list="prewList"></el-image>
        </el-col>
        <el-col :span="12">
            <el-image  @click="imgidx=1" :style="{'height':imgh}" class="myimg2" :src="srcList[1]" :preview-src-list="prewList"></el-image>
        </el-col>
        <el-col :span="12">
            <el-image  @click="imgidx=2" :style="{'height':imgh}" class="myimg3" :src="srcList[2]" :preview-src-list="prewList"></el-image>
        </el-col>
        <el-col :span="12">
            <el-image  @click="imgidx=3" :style="{'height':imgh}" class="myimg4" :src="srcList[3]" :preview-src-list="prewList"></el-image>
        </el-col>
        <el-col :span="24">
          <el-card class="box-card">
            <el-form :model="formdata"  label-suffix=":"   status-icon ref="ruleForm"  label-width="80px" size="medium"   class="demo-ruleForm">
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
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item label="所有人">
                    <el-input v-model="formdata.JDCSYR"  placeholder="-"  ></el-input>
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
    </el-col>
    <my-sqshbtgcom  :visible="visible.dialog" @hide="dialoghide" @onsave="sqshbtg"></my-sqshbtgcom>
  </el-row>
</template>

<script>
import {mapState} from 'vuex'
import * as axiosClient from '../../../common/axiosClient'
import * as path from '../../../services/paths'
import sqshbtgcom from '../../../components/sqshbtg'
export default {
  name: 'default',
  components: {
    'my-sqshbtgcom': sqshbtgcom
  },
  data: () => {
    return {
      queryTmp: {},
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
    ...mapState({
    // ...
      _user: '_user'
    }),
    prewList () {
      let v = [...this.srcList]
      let v1 = v.splice(0, this.imgidx)
      let v3 = v.concat(v1)
      return v3
    },
    imgh () {
      return (window.innerHeight / 4) + 'px'
    },
    tableh () {
      return window.innerHeight - 151
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
      let scrollS = document.getElementsByClassName('el-table__body-wrapper')[0].scrollTop
      let scrollE = scrollS + this.tableh - 96
      let top = document.getElementsByClassName('el-table__row').length > 0 ? document.getElementsByClassName('el-table__row')[nval].offsetTop : 0
      document.getElementsByClassName('el-table__body-wrapper')[0].scrollTop = (top >= scrollS && top <= scrollE) ? scrollS : (scrollS + 48)
      // console.log(scrollS, scrollE, top)
    },
    tableData: {
      handler () {
        if (this.tableupdate) {
          this.tabidx = this.tableData.length > 0 ? this.next(0) : -1
          if (this.tableData.length > 0) {
            this.$refs.mytable.setCurrentRow(this.tableData[0])
          }
          document.getElementsByClassName('el-table__body-wrapper')[0].scrollTop = 0
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
  destroyed () {
    if (this.pagecacheid) {
      let param = {
        scoped: 'page',
        bk: 'm4',
        mk: 'sbcj',
        userid: this._user.ID,
        pagecacheid: this.pagecacheid
      }
      axiosClient.call('PUB_DELDATACACHE', 'get', param).then()
    }
  },
  methods: {
    onQuery () {
      this.tabidx = -1
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
      let i = this.source.findIndex(d => d.XH === this.formdata.XH)
      this.source[i].HDBJ = 'p'
      axiosClient.call('ZJGLM4SBCJSHTG', 'POST', {xh: this.formdata.XH})
        .then((res) => {
          this.source[i].HDBJ = res.hdbj
          if (res.status === 0) {
            this.$message.error(res.msg)
          }
        })
      this.tabidx = this.next(this.tabidx + 1)
    },
    onSqShbtg () {
      this.visible.dialog = true
    },
    sqshbtg (sqyy) {
      this.visible.dialog = false
      let i = this.source.findIndex(d => d.XH === this.formdata.XH)
      this.source[i].HDBJ = 'p'
      axiosClient.call('ZJGLM4SBCJSQSHBTG', 'POST', {xh: this.formdata.XH, sqyy: sqyy})
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
      axiosClient.call('ZJGLM4SBCJGETDATA', 'get', param)
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
  .myimg1,.myimg2,.myimg3,.myimg4 {
    border: 1px solid  #000;
    width: 100%;
  }
  .myimg1::after {
    position:absolute;
    top:0;
    left:90%;
    color:red;
    font-size: 30px;
    font-weight: 700;
    content:"1";
  }
  .myimg2::after {
    position:absolute;
    top:0;
    left:90%;
    color:red;
    font-size: 30px;
    font-weight: 700;
    content:"2";
  }
  .myimg3::after {
    position:absolute;
    top:0;
    left:90%;
    color:red;
    font-size: 30px;
    font-weight: 700;
    content:"3";
  }
  .myimg4::after {
    position:absolute;
    top:0;
    left:90%;
    color:red;
    font-size: 30px;
    font-weight: 700;
    content:"4";
  }
</style>
