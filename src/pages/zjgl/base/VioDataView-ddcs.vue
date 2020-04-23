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
     :span="12"
     v-loading.lock="load.table"
     element-loading-text="锁定中"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0.1)"
     >
        <el-card class="box-card" style="padding-bottom:110px;">
          <el-col :span="12">
            <pic-zoom
              :url="srcList[0]"
              :scale="AppInfo.spe == 0 ? 2.5 : 5"
              :oheight="imgh"
              class="myimg1"
            >
              <template v-slot:header v-if="AppInfo.spe == 0" >
                <span style="color:#ffffff;font-size: 30px;font-weight: 700;background-color: darkblue;position:absolute;bottom:100%;">{{formdata.HPHM}}</span>
              </template>
            </pic-zoom>
          </el-col>
          <el-col :span="12">
            <pic-zoom
              :url="srcList[1]"
              :scale="AppInfo.spe == 1 ? 2.5 : 5"
              :oheight="imgh"
              class="myimg2"
            >
              <template v-slot:header v-if="AppInfo.spe == 1" >
                <span style="color:#ffffff;font-size: 30px;font-weight: 700;background-color: darkblue;position:absolute;bottom:100%;">{{formdata.HPHM}}</span>
              </template>
            </pic-zoom>
          </el-col>
          <el-col :span="12">
            <pic-zoom
              :url="srcList[2]"
              :scale="AppInfo.spe == 2 ? 2.5 : 5"
              :oheight="imgh"
              class="myimg3"
            >
              <template v-slot:header v-if="AppInfo.spe == 2" >
                <span style="color:#ffffff;font-size: 30px;font-weight: 700;background-color: darkblue;position:absolute;bottom:100%;">{{formdata.HPHM}}</span>
              </template>
            </pic-zoom>
          </el-col>
          <el-col :span="12">
            <pic-zoom
              :url="srcList[3]"
              :scale="AppInfo.spe == 3 ? 2.5 : 5"
              :oheight="imgh"
              :class="AppInfo.imgs==4 ? 'myimg4' : 'myimgno'"
              :sd="(formdata.FLAG || !AppInfo.enable)?'限速:' + formdata.BZZ + '      时速:' + formdata.SCZ:''"
              :csbl="(formdata.FLAG)?'超速比例:' + formdata.CSBL + '%':''"
              :cllx="(formdata.FLAG || !AppInfo.enable)?'车辆类型:' + formdata.CLLX2:''"
              :csys="(formdata.FLAG || !AppInfo.enable)?'品牌:'+formdata.CGCLPP + '   颜色:' + formdata.CGCSYS:''"
              :syr="(formdata.FLAG || !AppInfo.enable)?'所有人:'+formdata.JDCSYR:''"
              :syxz="(formdata.FLAG || !AppInfo.enable)?'使用性质:' + formdata.SYXZ2:''"
              :wfxw="(formdata.FLAG || !AppInfo.enable)?formdata.WZXW:''"
            >
              <template v-slot:header v-if="AppInfo.spe == 3" >
                <span style="color:#ffffff;font-size: 30px;font-weight: 700;background-color: darkblue;position:absolute;bottom:100%; ">{{formdata.HPHM}}</span>
              </template>
            </pic-zoom>
          </el-col>
        </el-card>
    </el-col>
    <el-col :span="12">
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
        <el-col :span="24" style="margin-top:10px">
          <el-card class="box-card">
            <el-form :model="formdata"  label-suffix=":"   status-icon ref="ruleForm"  label-width="120px" size="medium"   class="demo-ruleForm">
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item label="号牌号码">
                    <el-input v-model="RHPHM"  placeholder="-" :readonly="!AppInfo.enable" ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-form-item label="号牌种类">
                      <el-select v-model="RHPZLNO" placeholder="请选择" :disabled="!AppInfo.enable" >
                          <el-option
                          v-for="item in codefilter('hpzl')"
                          :key="item.CODE"
                          :label="item.CODE+': '+ item.VAL"
                          :value="item.CODE">
                          </el-option>
                      </el-select>
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
                      <el-col :span="20">
                        <el-input v-model="formdata.WZXW"  placeholder="-" ></el-input>
                      </el-col>
                      <el-col :span="4" v-show="AppInfo.enable">
                        <el-button type="primary" icon="el-icon-download" circle @click="getvehANDwfxw"  v-if="formdata.XH"></el-button>
                      </el-col>
                  </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item label="所有人">
                    <el-input v-model="formdata.JDCSYR"  placeholder="-"  ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <el-form-item>
                      <template v-if="AppInfo.enable">
                        <el-button  type="primary" icon="el-icon-edit-outline" @click="onShtg()" v-if="formdata.XH"  :disabled="!formdata.FLAG">审核通过</el-button>
                      </template>
                      <template v-else>
                        <el-button type="primary" icon="el-icon-edit-outline" @click="onShtg()" v-if="formdata.XH">审核通过</el-button>
                      </template>
                  </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                  <el-form-item>
                      <el-button type="primary" icon="el-icon-s-release" @click="onShbtg()" v-if="formdata.XH">删除</el-button>
                  </el-form-item>
              </el-col>
            </el-form>
          </el-card>
        </el-col>
    </el-col>
  </el-row>
</template>

<script>
import * as path from '../../../services/paths'
import vuePhotoZoomPro from '../../../components/vue-photo-zoom-pro'
import sqshbtgcom from '../../../components/sqshbtg'
export default {
  name: 'default',
  components: {
    'my-sqshbtgcom': sqshbtgcom,
    'pic-zoom': vuePhotoZoomPro
  },
  props: {
    AppInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
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
      imgwidth: 100,
      srcList: [],
      load: {
        body: false,
        table: false
      }
    }
  },
  computed: {
    imgh () {
      return this.imgwidth * 3 / 4 + 'px'
    },
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
          this.tableData[i]
        )
        return v
    },
    RHPHM: {
      get: function() {
        return this.formdata.HPHM
      },
      set: function(v) {
        if (this.tabidx === -1) return
        this.tableData[this.tabidx].HPHM = v.toUpperCase()
      }
    },
    RHPZLNO: {
      get: function() {
        return this.formdata.HPZLNO
      },
      set: function(v) {
        if (this.tabidx === -1) return
         this.tableData[this.tabidx].HPZLNO = v
      }
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
      let scrollS= document.querySelector('.el-table__body-wrapper').scrollTop
      let scrollE = scrollS + this.tableh - 64
      let top = document.getElementsByClassName('el-table__row').length > 0 ? document.getElementsByClassName('el-table__row')[nval].offsetTop : 0
      document.querySelector('.el-table__body-wrapper').scrollTop =(top >= scrollS && top <= scrollE) ? scrollS : (scrollS + 32)
    },
    tableData: {
      handler () {
        if (this.tableupdate) {
          this.tableupdate = false
          this.tabidx = this.tableData.length > 0 ? this.next(0) : -1
          if (this.tableData.length > 0) {
            this.$refs.mytable.setCurrentRow(this.tableData[0])
          }
          document.querySelector('.el-table__body-wrapper').scrollTop = 0
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
    },
    RHPHM (nv, ov) {
      if (nv !== ov) {
        if (this.AppInfo.enable) {
          this.tableData[this.tabidx].FLAG = false
          this.tableData[this.tabidx].WZXW = ''
          this.tableData[this.tabidx].CSBL = 0
        }
      }
    },
    RHPZLNO (nv, ov) {
      if (nv !== ov) {
        if (this.AppInfo.enable) {
          this.tableData[this.tabidx].FLAG = false
          this.tableData[this.tabidx].HPNAME = this.code2cn(nv, 'hpzl')
          this.tableData[this.tabidx].WZXW = ''
          this.tableData[this.tabidx].CSBL = 0
        }
      } 
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    let doms = document.querySelectorAll('.myimg1')
    this.imgwidth = doms[doms.length-1].clientWidth
    window.onresize = () => { // 定义窗口大小变更通知事件
      this.imgwidth = doms[doms.length-1].clientWidth
    }
  },
  destroyed () {
    if (this.pagecacheid) {
      let param = {
        scoped: this.AppInfo.scoped,
        bk: this.AppInfo.bk,
        mk: this.AppInfo.mk,
        userid: this._user.ID,
        pagecacheid: this.pagecacheid
      }
      this.$axiosClient.call('pub/datacache/del', 'get', param).then()
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
        let params = {
          xh: this.formdata.XH,
          hphm: this.formdata.HPHM,
          hpzlno: this.formdata.HPZLNO,
          hpname: this.formdata.HPNAME,
          bklb: '3',
          jdcsyr: this.formdata.JDCSYR,
          xxdz : this.formdata.XXDZ,
          dh : this.formdata.DH,
          cgclpp : this.formdata.CGCLPP,
          cgcsys : this.formdata.CGCSYS,
          syxz : this.formdata.SYXZ,
          syxz2 : this.formdata.SYXZ2,
          cllx: this.formdata.CLLX,
          cllx2: this.formdata.CLLX2,
          wzxwno: this.formdata.WZXWNO,
          wzxw: this.formdata.WZXW,
          csbl: this.formdata.CSBL         
        }
        this.$axiosClient.call(this.AppInfo.shtg, 'POST', params)
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
    onShbtg () {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let i = this.source.findIndex(d => d.XH === this.formdata.XH)
        this.source[i].HDBJ = 'p'
        this.$axiosClient.call(this.AppInfo.sqshbtg, 'POST', {xh: this.formdata.XH})
          .then((res) => {
            this.source[i].HDBJ = res.hdbj
            if (res.status === 0) {
              this.$message.error(res.msg.msg || res.msg)
            }
          })
        this.tabidx = this.next(this.tabidx + 1)
      })
    },
    getData () {
      this.load.body = true
      let param = {}
      this.$axiosClient.call(this.AppInfo.getdata, 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.pagecacheid = res.pagecacheid
            this.source = res.data
            if (this.source.length > 0) {
              this.source.forEach(item => {
                Object.assign(item, {FLAG: false})
              })
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
        if (this.tableData[start].HDBJ === 'S' || this.tableData[start].HDBJ === 'Y') {
          return start
        } else {
          return this.next(start + 1)
        }
      } else {
        return -1
      }
    },
    getvehANDwfxw () {
      this.load.body = true
      let param = {
        hphm: this.RHPHM,
        hpzl: this.RHPZLNO,
        from: 'webservice'
      }
      this.$axiosClient.call('jcxxpt/veh/getveh', 'get', param)
        .then(this.speedwfxw)
        .catch((err)=>{
          this.$message.error(err)
          this.load.body = false          
        })
    },
    speedwfxw (data) {
      return new Promise((resolve, reject) => {
          if (data.status === 1) {
            if (data.data) {
              let v = this.tableData[this.tabidx]
              v.JDCSYR = data.data.SYR
              v.XXDZ = data.data.ZSXXDZ,
              v.DH = data.data.SJHM,
              v.CGCLPP = data.data.CLPP1
              v.CGCSYS = this.code2cn1(data.data.CSYS, 'YS')
              v.SYXZ = data.data.SYXZ
              v.SYXZ2 = this.code2cn(data.data.SYXZ, 'syxz')
              v.CLLX = data.data.CLLX
              v.CLLX2 = this.code2cn(data.data.CLLX, 'cllx')
              let param = {
                bzz: v.BZZ,
                scz: v.SCZ,
                syxz: v.SYXZ,
                cllx: v.CLLX
              }
              this.$axiosClient.call('zjgl/getSpeedWfxw', 'get', param)
                .then(res => {
                  if (res.status === 1) {
                    this.tableData[this.tabidx].FLAG = true
                    this.tableData[this.tabidx].WZXWNO = res.data.WZXWNO
                    this.tableData[this.tabidx].WZXW = `${res.data.WZXWNO}:${res.data.WZXW}`
                    this.tableData[this.tabidx].CSBL = res.data.CSBL
                  } else {
                    this.$message.error(data.msg)
                  }
                  this.load.body = false 
                  resolve()
                })
                .catch(() => {
                  reject()
                })
            } else {
              this.$message.error('车辆信息不正确')
              this.load.body = false 
            }
          } else {
            this.$message.error(data.msg)
            this.load.body = false
            resolve()
          }

      })
    },
    dialoghide (v) {
      // alert(v)
      this.visible.dialog = false
    }
  }
}
</script>

<style scoped>
  .myimg1,.myimg2,.myimg3,.myimg4,.myimgno {
    border: 1px solid  #000;
    width: 100%;
    margin-top: 10px;
  }
  .myimgno {
    background-color: #F7F7F7;
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
  .myimgno::after {
    position:absolute;
    top:0;
    left:0;
    color:rgb(241, 63, 63);
    font-size: 1.33rem;
    font-weight: 700;
    white-space: pre;
    width: 100%;
    content:attr(sd) '\a' attr(cllx) '\a' attr(syxz) '\a' attr(syr) '\a' attr(csys) '\a\a' attr(csbl) '\a' attr(wfxw);
  }
  .buttonactive {
    border-color: #b7d1e5;
    background-color: #e7f0f6;
  }
</style>
