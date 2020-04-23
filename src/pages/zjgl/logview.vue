<template>
    <div
        v-loading.lock="loading"
        element-loading-text="处理中"
        element-loading-spinner="el-icon-loading"  
    >
        <el-row ref="form1">
            <el-col>
                <el-form :inline="true" :model="formdata" class="demo-form-inline" style="margin-top:10px;"  size="small" label-suffix=":">
                    <el-form-item label="采集机关">
                        <el-select v-model="formdata.cjjgno" placeholder="请选择"  clearable>
                            <el-option
                            v-for="item in codefilter('cjjg')"
                            :key="item.CODE"
                            :label="item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="采集民警">
                        <el-select v-model="formdata.cjmj" placeholder="请选择" clearable filterable>
                            <el-option
                            v-for="(item, index) in codefilter('cjmj')"
                            :key="index+'-'+item.CODE"
                            :label="item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="号牌号码">
                        <el-input v-model="formdata.hphm" placeholder="号牌号码" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="号牌种类">
                        <el-select v-model="formdata.hpzlno" placeholder="请选择" clearable>
                            <el-option
                            v-for="item in codefilter('hpzl')"
                            :key="item.CODE"
                            :label="item.CODE+': '+ item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="违法地点">
                        <el-select v-model="formdata.wfddno" placeholder="请选择" clearable filterable>
                            <el-option
                            v-for="(item, index) in codefilter('wfdd')"
                            :key="index+'-'+item.CODE"
                            :label="item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="违法行为">
                        <el-select v-model="formdata.wzxwno" placeholder="请选择" clearable filterable>
                            <el-option
                            v-for="(item, index) in codefilter('wfxw')"
                            :key="index+'-'+item.CODE"
                            :label="item.CODE+': '+ item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="违法时间">
                        <el-date-picker
                        v-model="formdata.sjfw"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        format= "yyyy-MM-dd"
                        value-format= "yyyy-MM-dd"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="formdata.hdbj" placeholder="请选择" clearable filterable>
                            <el-option
                            v-for="item in [{CODE: '0', VAL: '民警录入'}, {CODE: '1', VAL: '大队审核'}, {CODE: '2', VAL: '支队审核'}, {CODE: '4', VAL: '审核不通过'}, {CODE: 'D', VAL: '设备采集'}]"
                            :key="item.CODE"
                            :label="item.VAL"
                            :value="item.CODE">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-edit-outline" @click="getdatas">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table v-if="loaded"
                    :data="vios"
                    :show-header="true"                   
                    :height="tabh"                    
                    :row-class-name="tableRowClassName"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="ROWXH"
                    label="No."
                    width="60"
                    show-overflow-tooltip
                    >   
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="审核状态"
                    width="150"
                    show-overflow-tooltip
                    >
                    <template slot-scope="scope">
                        {{hdbj2cn(scope.row.HDBJ)}}
                    </template>                  
                    </el-table-column>           
                    <el-table-column
                    prop="HPHM"
                    label="号牌号码"
                    width="100"
                    show-overflow-tooltip
                    >
                    </el-table-column>           
                    <el-table-column
                    prop="HPNAME"
                    label="号牌种类"
                    width="150"
                    show-overflow-tooltip
                    >
                    </el-table-column>           
                    <el-table-column
                    prop="FWFSJ"
                    label="违法时间"
                    width="200"
                    show-overflow-tooltip
                    >
                    </el-table-column>           
                    <el-table-column
                    prop="WFDZ"
                    label="违法地址"
                    width="300"
                    show-overflow-tooltip
                    >
                    </el-table-column>           
                    <el-table-column
                    prop="WZXW"
                    label="违法行为"
                    width="300"
                    show-overflow-tooltip
                    >
                    </el-table-column>           
                    <el-table-column
                    prop="JDCSYR"
                    label="所有人"
                    width="200"
                    show-overflow-tooltip
                    >
                    </el-table-column>           
                    <el-table-column
                    prop="CJJGNAME"
                    label="采集机关"
                    width="200"
                    show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="60">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small"  @click="viomore(scope.row)" >详情</el-button>
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
        </el-row>
        <el-dialog v-dialogDrag  :modal-append-to-body="false" title="详细信息" width="70%" :visible.sync="moreloaded" top="5vh" :close-on-click-modal="false" @close="onCancel" custom-class="mydialog">
            <moreinfo  :viodata="currentrow" @next="next($event)"></moreinfo>
        </el-dialog>        
    </div>
</template>
<script>
import moreinfo from './base/zhxx-vio-more'
export default {
    name: 'default',
    components: {
        moreinfo: moreinfo
    },
    data: () => {
        return {
            formdata: {
              hdbj: '0'
            },
            vios: [],
            total: 0,
            formH: 0,
            tabidx: 0,
            currentrow: {},
            page: {
                currentPage: 1,
                size: 100
            },
            loaded: false,
            moreloaded: false,
            loading: false
        }
    },
    computed: {
        tabh () {
            return  window.innerHeight - 91 - this.formH - 32
        },
        hdbj2cn () {
          return function(hdbj) {
              let txt = ''
              switch (hdbj) {
                case '0' : 
                    txt = '民警录入';
                    break;
                case '1' : 
                    txt = '大队审核';
                    break;
                case '2' : 
                    txt = '支队审核';
                    break;
                case '4' : 
                    txt = '审核不通过';
                    break;
                default: 
                    break;

              }
              return txt
          }
        }
    },
    mounted () {
        this.formH = this.$refs.form1.$el.offsetHeight
        this.loaded = true
    },
    methods: {
        viomore(row) {
            this.tabidx = row.index
            this.currentrow = row
            this.moreloaded = true
        },
        tableRowClassName ({row, rowIndex}) {
            row.index = rowIndex
        },
        handleSizeChange (val) {
            this.page.currentPage = 1
            this.page.size = val
            this.getdatas()
        },
        handleCurrentChange (val) {
            this.page.currentPage = val
            this.getdatas()
        },
        query () {
            this.page.currentPage = 1
            this.getdatas()
        },
        getdatas () {
            this.loading = true
            if (this.formdata.sjfw && this.formdata.sjfw.length){
                Object.assign(this.formdata, {kssj: this.formdata.sjfw[0], jssj: this.formdata.sjfw[1]})
            }
            this.$axiosClient.call('zjgl/zhgl/zhxx/getvio', 'get', Object.assign(this.formdata, {...this.page}) )
                .then((res) => {
                    if (res.status === 1) {
                        this.vios = res.data
                        this.total = res.total
                    } else {
                        this.$message.error(res.msg)
                    }
                    this.loading = false
                })
                .catch(err=> {
                    this.$message.error(err)
                    this.loading = false
                })
        },
        next (step) {
            if (step === 1) {
                if ((this.tabidx + 1) < this.vios.length) {
                    this.tabidx = this.tabidx + 1
                    this.currentrow = this.vios[this.tabidx]
                } else {
                    this.$message.error('已是最后一行')
                }
            } else if (step === -1) {
                if ((this.tabidx - 1) >= 0) {
                    this.tabidx = this.tabidx - 1
                    this.currentrow = this.vios[this.tabidx]
                } else {
                    this.$message.error('已是第一行')
                }                
            }
        },
        onCancel () {
            this.moreloaded = false
        }
    }
}
</script>