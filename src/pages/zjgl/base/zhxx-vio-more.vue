<template>
  <div style="width:100%;">
    <el-row>
        <el-col :span="24">
            <el-tabs type="border-card"  ref="imgel">
                <el-tab-pane label="基本信息" >
                  <el-row :gutter="5">
                    <el-col :span="12">
                        <el-card class="box-card" >   
                          <el-row :gutter="2">       
                            <el-col :span="12" class="myimg" imgxh="1" >
                                <el-image  style="width:100%;"
                                  :style="{height: imgh}"
                                  :src="srcList[0]" 
                                  :preview-src-list="srcList"                             
                                  >
                                </el-image>
                            </el-col>         
                            <el-col :span="12" class="myimg1" imgxh="2">
                                <el-image  style="width:100%;"
                                  :style="{height: imgh}"
                                  :src="srcList[1]" 
                                  :preview-src-list="srcList">
                                </el-image>
                            </el-col>   
                          </el-row>      
                          <el-row :gutter="2">                           
                           <el-col :span="12" class="myimg" imgxh="3" >
                              <el-image  style="width:100%;"
                                :style="{height: imgh}"
                                :src="srcList[2]" 
                                :preview-src-list="srcList">
                              </el-image>
                           </el-col>         
                           <el-col :span="12" class="myimg1" imgxh="4" >
                              <el-image  style="width:100%;"
                                :style="{height: imgh}"
                                :src="srcList[3]" 
                                :preview-src-list="srcList">
                              </el-image>
                           </el-col>
                          </el-row>
                        </el-card>          
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-card class="box-card">
                          <el-form :model="viodata"  label-suffix=":"   status-icon ref="ruleForm"  label-width="120px" size="medium"   class="demo-ruleForm">
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                <el-form-item label="号牌号码">
                                  <el-input v-model="viodata.HPHM"  placeholder="-" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                <el-form-item label="号牌种类">
                                  <el-input v-model="viodata.HPNAME"  placeholder="-"  ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                <el-form-item label="车辆品牌">
                                  <el-input v-model="viodata.CGCLPP"  placeholder="-"  ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                <el-form-item label="车身颜色">
                                  <el-input v-model="viodata.CGCSYS"  placeholder="-"  ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                <el-form-item label="违法时间">
                                  <el-input v-model="viodata.FWFSJ"  placeholder="-"  ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="违法地点">
                                  <el-input v-model="viodata.WFDZ"  placeholder="-"  ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="违法行为">
                                  <el-input v-model="viodata.WZXW"  placeholder="-" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="所有人">
                                  <el-input v-model="viodata.JDCSYR"  placeholder="-"  ></el-input>
                                </el-form-item>
                            </el-col>
                          </el-form>
                        </el-card> 
                      </el-row>
                      <el-row style="margin-top:5px;"> 
                        <el-card class="box-card"
                          v-loading.lock="loading"
                          element-loading-text="处理中"
                          element-loading-spinner="el-icon-loading"  
                          style="padding:0px;"                       
                        >    
                          <div slot="header" class="clearfix">
                            <span>操作日志</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="getlog" v-show="!log">查看</el-button>
                          </div>
                          <el-table
                              v-if="log"
                              :data="log.log"
                              border
                              :show-header="false"
                              size="mini"
                              style="width: 100%">
                              <el-table-column
                              prop="CZLX"
                              label="操作类型"
                              width="150"
                              show-overflow-tooltip
                              >   
                              </el-table-column>
                              <el-table-column
                              prop="FSJ"
                              label="操作时间"
                              show-overflow-tooltip
                              >   
                              </el-table-column>
                              <el-table-column
                              prop="NAME"
                              label="操作人"
                              width="120"
                              show-overflow-tooltip
                              >   
                              </el-table-column>
                              <el-table-column
                              prop="IP"
                              label="IP"
                              width="150"
                              show-overflow-tooltip
                              >   
                              </el-table-column>
                          </el-table>
                        </el-card>                  
                      </el-row>                     
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="其他信息">

                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
        <el-col :offset="18" :span="4">
          <el-form>
              <el-form-item>
                   <el-button type="primary" plain @click="$emit('next', -1)">上一条</el-button>
                  <el-button type="primary" plain @click="$emit('next', 1)">下一条</el-button>
              </el-form-item>
          </el-form>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import * as path from '../../../services/paths'
export default {
  name: 'default',
  props: {
    viodata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => {
    return {
      imgh: '10px;',
      loading: false,
      logs: []
    }
  },
  computed: {
    srcList () {
      let imgs = []
      imgs.push(`${this.viodata.IMGFROM === 0 ? path['IMGROOT0'] : path['IMGROOT1']}${this.viodata.IMG1}`)
      imgs.push(`${this.viodata.IMGFROM === 0 ? path['IMGROOT0'] : path['IMGROOT1']}${this.viodata.IMG2}`)
      imgs.push(`${this.viodata.IMGFROM === 0 ? path['IMGROOT0'] : path['IMGROOT1']}${this.viodata.IMG3}`)
      imgs.push(`${this.viodata.IMGFROM === 0 ? path['IMGROOT0'] : path['IMGROOT1']}${this.viodata.IMG4}`)
      return  imgs    
    },
    log () {
      let v = null
      let index = this.logs.findIndex(d => {
        return d.hphm === this.viodata.HPHM && d.hpzl === this.viodata.HPZLNO && d.fwfsj === this.viodata.FWFSJ
      })
      if (index >= 0) {
        v = this.logs[index]
      }
      return v
    }
  },
  methods: {
    getlog () {
      this.loading = true
      this.$axiosClient.call('zjgl/zhgl/zhxx/getlog', 'get', this.viodata )
          .then((res) => {
              if (res.status === 1) {
                this.logs.push(Object.assign({}, {hphm: this.viodata.HPHM, hpzl: this.viodata.HPZLNO, fwfsj: this.viodata.FWFSJ, log: res.data}))
              } else {
                  this.$message.error(res.msg)
              }
              this.loading = false
          })
          .catch(err=> {
              this.$message.error(err)
              this.loading = false
          })      
    }
  },
  mounted () {
    this.imgh = this.$refs.imgel.$el.offsetWidth /2  / 2 * 3 /4 + 'px'
  }
}
</script>
<style scoped>
  .myimg {
    background-color: #F7F7F7;
  }

  .myimg::after {
    position:absolute;
    top:0;
    left:45%;
    color:rgb(241, 63, 63);
    font-size: 1.33rem;
    font-weight: 700;
    white-space: pre;
    width: 100%;
    content:attr(imgxh);
  }  

  .myimg1 {
    background-color: #F7F7F7;
  }

  .myimg1::after {
    position:absolute;
    top:0;
    left:95%;
    color:rgb(241, 63, 63);
    font-size: 20px;
    font-weight: 700;
    white-space: pre;
    width: 100%;
    content:attr(imgxh);
  }  
</style>
