<template>
    <div>
        <el-col :span="24">
          <el-table
            id="table"
            :data="tableData"
            :max-height="tableh"
            border
            style="width: 100%;margin-top:5px;">
            <el-table-column
              prop="XH"
              label="NO"
              width="50">
            </el-table-column>
            <el-table-column
              prop="ZRDWMC"
              label="责任单位"
              width="250">
            </el-table-column>
            <el-table-column
              prop="HPHM"
              label="号牌号码"
              width="110">
            </el-table-column>
            <el-table-column
              prop="HPZL"
              label="号牌种类"
              width="100">
            </el-table-column>
            <el-table-column
              prop="WFXW"
              label="违法行为"
              width="100">
            </el-table-column>
            <el-table-column
              prop="WFSJ"
              label="违法时间"
              width="190">
            </el-table-column>
            <el-table-column
              prop="WFDZ"
              label="违法地点"
              width="300">
            </el-table-column>
            <el-table-column
              prop="ZQMJ"
              label="执勤民警"
              width="90">
            </el-table-column>
            <el-table-column
              prop="CLJGMC"
              label="处理机关"
              width="300">
            </el-table-column>
             <el-table-column
              prop="DRSJ"
              label="导入时间"
              width="190">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="90">
              <template slot-scope="scope">
                <el-button  type="text" size="small"  @click="xxcj(scope.row)" >采集信息</el-button>
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
        <el-dialog v-dialogDrag  :modal-append-to-body="false" title="车辆信息" width="70%" :visible.sync="visible.veh" top="5vh" :close-on-click-modal="false" @close="onCancel" custom-class="mydialog">
          <InfoInput v-if="visible.veh" :initdata="veh"></InfoInput>
        </el-dialog>
    </div>
</template>

<script>
import * as axiosClient from '../../../common/axiosClient'
import InfoInput from './base/InfoInput'
import { EventBus } from '../../../common/event-bus.js'
export default {
  name: 'default',
  components: {
    InfoInput: InfoInput
  },
  props: ['test'],
  data: () => {
    return {
      tableData: [],
      page: {
        currentPage: 1,
        size: 10
      },
      total: 0,
      veh: {
        wfbh: null,
        hphm: null,
        hpzl: null
      },
      visible: {
        title: '车辆信息',
        veh: false
      }
    }
  },
  computed: {
    tableh () {
      return window.innerHeight - 128
    }
  },
  created () {
    this.getData()
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
    xxcj (row) {
      this.visible.veh = true
      this.veh.wfbh = row.WFBH
      this.veh.hphm = row.HPHM
      this.veh.hpzl = row.HPZL
    },
    onCancel () {
      this.visible.veh = false
    },
    getData () {
      let param = this.page
      axiosClient.call('ZXXDZCZLZDCLXXCJGETDATA', 'get', param)
        .then((res) => {
          if (res.status === 1) {
            this.tableData = res.data
            this.total = res.count
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    Ehandle (res) {
      switch(res.key) {
        case 'vehinok' :
          this.visible.veh = false
          let i = this.tableData.findIndex(d => d.WFBH === res.wfbh)
          this.tableData.splice(i, 1)
          break;
        default:
          return;
      }      
    }
  },
  mounted () {
    EventBus.$on('zxxd-zczl-zdclxxcj', this.Ehandle)
  },
  beforeDestroy () {
    EventBus.$off('zxxd-zczl-zdclxxcj', this.Ehandle)
  }
}
</script>
