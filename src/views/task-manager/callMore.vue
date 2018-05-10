/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-05-09 10:04:32 
 * @Last Modified by:   kaker.xutianxing 
 * @Last Modified time: 2018-05-09 10:04:32 
 */
<template>
  <div class="callMore">
    <p class="header">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClient">添加联系人</el-button>
      <el-button type="danger" size="small" @click="offServer">暂停服务</el-button>
      <el-button type="success" size="small" @click="startServer">开始服务</el-button>
      <span class="fr">
        <i class="el-icon-upload2" ></i>导出</span>
      <span class="fr"  @click="unexport = true">
        <i class="el-icon-download"></i>导入</span>
      <el-dialog title="添加联系人" :visible.sync="dialogVisible" width="500px" :before-close="handleClose" class="call-dialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="任务名称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="任务名称：" prop="num">
            <el-input v-model="ruleForm.num"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="提示" :visible.sync="unexport" width="500px" :before-close="exportClose" class="call-dialog">
        <p>
          第一步：下载导入模板文件
          <el-button plain size="mini">下载模板</el-button>
        </p>
        <p class="upload">
          <i class="fl">第二步：上传文件</i>
          <el-upload
            class="upload-demo fl"
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="handlePreview"
            :on-success="mySuccess"
            :limit="1"
            :show-file-list="false"
            >
            <el-button size="mini" plain>点击上传</el-button>
          </el-upload>
          <span class="tip">文件格式必须是.xls或.xlsx扩展名</span>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="unexport = false">取 消</el-button>
          <el-button type="primary" @click="unexport = false">确 定</el-button>
        </span>
      </el-dialog>
    </p>
    <div class="top">
      <h3>互联网客户联系任务
        <span>已完成</span>
      </h3>
      <el-row :gutter="0">
        <el-col :span="8" class="list">
          <div>
            <p>王帅帅 &nbsp;&nbsp;</p>
            <p>创建于2018-04-09 15:23:21</p>
          </div>
          <div>
            <p>呼叫进度：</p>
            <p class="progress">
              <el-progress :percentage="70" :stroke-width="10" :show-text="false"></el-progress>
              <span>进度10/12</span>
            </p>
          </div>
          <div>
            <p>接通率：</p>
            <p style="color:#f00">89%</p>
          </div>
        </el-col>
        <el-col :span="8" class="list">
          <div>
            <p>任务类型：</p>
            <p>AI外呼</p>
          </div>
          <div>
            <p>AI话术：</p>
            <p>电话营销—电话营销201802021603版</p>
          </div>
          <div>
            <p>启动方式：</p>
            <p>定时启动</p>
          </div>
        </el-col>
        <el-col :span="8" class="list">
          <div>
            <p>启动时间：</p>
            <p>2018-03-06 09:00-18:00</p>
          </div>
          <div>
            <p>主叫号码：</p>
            <p>电话机1（057112345678）</p>
          </div>
          <div>
            <p></p>
            <p>电话机1（057112345678）</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="center">
      <el-row class="header">
        <el-col :span="8">接听统计</el-col>
        <el-col :span="4">客户意向等级</el-col>
        <el-col :span="4">关注点</el-col>
        <el-col :span="4">通话时长</el-col>
        <el-col :span="4">对话轮次</el-col>
      </el-row>
      <el-row class="content">
        <el-col :span="8">
          <ul>
            <li>
              <p class="blue">89次</p>
              <p>已接通</p>
            </li>
            <li>
              <p>89次</p>
              <p>拒接</p>
            </li>
            <li>
              <p>89次</p>
              <p>空号</p>
            </li>
            <li>
              <p>89次</p>
              <p>关机</p>
            </li>
            <li>
              <p>89次</p>
              <p>占线</p>
            </li>

            <li>
              <p class="blue">89次</p>
              <p>停机</p>
            </li>
            <li>
              <p>89次</p>
              <p>未接</p>
            </li>
            <li>
              <p>89次</p>
              <p>主叫欠号</p>
            </li>
            <li>
              <p>89次</p>
              <p>无法接通</p>
            </li>
            <li>
              <p>89次</p>
              <p>呼叫失败</p>
            </li>
          </ul>
        </el-col>
        <el-col :span="4">
          <p>
            <span>A级（较强）</span>
            <span>67%</span>
          </p>
          <p>
            <span>B级（一般）</span>
            <span>67%</span>
          </p>
          <p>
            <span>C级（较少）</span>
            <span>67%</span>
          </p>
        </el-col>
        <el-col :span="4">
          <p>
            <span>地理位置</span>
            <span>67%</span>
          </p>
          <p>
            <span>价格</span>
            <span>67%</span>
          </p>
          <p>
            <span>优惠政策</span>
            <span>67%</span>
          </p>
          <p>
            <span>周边设施</span>
            <span>67%</span>
          </p>
        </el-col>
        <el-col :span="4">
          <p>
            <span>&lt;10s</span>
            <span>67%</span>
          </p>
          <p>
            <span>10s-1min</span>
            <span>67%</span>
          </p>
          <p>
            <span>1min-2min</span>
            <span>67%</span>
          </p>
          <p>
            <span>>2min</span>
            <span>67%</span>
          </p>
        </el-col>
        <el-col :span="4">
          <p>
            <span>0-9次</span>
            <span>67%</span>
          </p>
          <p>
            <span>10-19次</span>
            <span>67%</span>
          </p>
          <p>
            <span>20-29次</span>
            <span>67%</span>
          </p>
          <p>
            <span>40次以上</span>
            <span>67%</span>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="down">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="进行中" name="first">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="客户名称" sortable>
            </el-table-column>
            <el-table-column prop="Tel" label="客户号码" sortable>
            </el-table-column>
            <el-table-column prop="callState" label="通话状态" sortable>
            </el-table-column>
            <el-table-column prop="callDate" label="通话时间" sortable>
            </el-table-column>
            <el-table-column prop="callTime" label="通话时长" sortable>
            </el-table-column>
            <el-table-column prop="callID" label="主叫号码" sortable>
            </el-table-column>
            <el-table-column prop="taskName" label="对话轮次" sortable>
            </el-table-column>
            <el-table-column prop="lookState" label="客户意向等级" sortable>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="second">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="客户名称" sortable>
            </el-table-column>
            <el-table-column prop="Tel" label="客户号码" sortable>
            </el-table-column>
            <el-table-column prop="callState" label="通话状态" sortable>
            </el-table-column>
            <el-table-column prop="callDate" label="通话时间" sortable>
            </el-table-column>
            <el-table-column prop="callTime" label="通话时长" sortable>
            </el-table-column>
            <el-table-column prop="callID" label="主叫号码" sortable>
            </el-table-column>
            <el-table-column prop="taskName" label="对话轮次" sortable>
            </el-table-column>
            <el-table-column prop="lookState" label="客户意向等级" sortable>
              <template slot-scope="scope">
                <span @click="openContent">{{scope.row.lookState}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <transition name="slide">
      <div class="call-content" v-show="open">
        <div class="h3">
          <i class="el-icon-arrow-right" @click="closeContent"></i>
          <span>通话内容</span>
          <em>通话记录ID：6514888645</em>
        </div>
        <div class="slide-left">
          <ul>
            <li>
              <h5>通话结果</h5>
              <p><span>任务名称：</span><i>互联网营销</i> </p>
              <p><span>接待：</span><i>互联网营销—互联网营销201803021654版</i> </p>
              <p><span>拨出时间：</span><i>2018-04-04 18:20:12</i></p>
              <p><span>通话状态：</span><i>已接通</i></p>
              <p>
                <a>
                  <span>20<sub>s</sub></span>
                  <i>通话时长</i>
                </a>
                <a>
                  <span>4<sub style="font-size:45%;">次</sub></span>
                  <i>对话轮次</i>
                </a>
              </p>
            </li>
            <li>
              <h5>客户意向等级</h5>
              <p class="slide-left-grade">
                <el-radio-group v-model="radio7" >
                  <el-radio-button label="A级（较强）"></el-radio-button>
                  <el-radio-button label="B级（一般）"></el-radio-button>
                  <el-radio-button label="C级（很少）"></el-radio-button>
                </el-radio-group>
                  
              </p>
            </li>
            <li>
              <h5>客户关注点</h5>
              <p class="slide-left-care">
                <span :class="{active: care == '询问价格'}" @click="care = '询问价格'">询问价格</span>
                <span :class="{active: care == '优惠活动'}" @click="care = '优惠活动'">优惠活动</span>
                <span :class="{active: care == '地理位置'}" @click="care = '地理位置'">地理位置</span>
                <span :class="{active: care == '你能来接我吗'}" @click="care = '你能来接我吗'">你能来接我吗</span>
              </p>
            </li>
            <li>
              <h5>客户详情</h5>
              <p><span>客户名称：</span><i>许可</i> </p>
              <p><span>客户电话：</span><i>189 2542 1254</i> </p>
            </li>
            <li>
              <h5>问题反馈</h5>
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
              <p class="slide-left-btn">
                <el-button size="small">取消</el-button>
                <el-button size="small" type="primary">确定</el-button>
              </p>
            </li>
          </ul>
        </div>
        <div class="slide-right">
          <div>
            <ul>
              <li>
                <span class="fl">
                  <svg-icon icon-class="Ai"></svg-icon>
                </span>
                <p class="fl">好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              </li>
              <li class="slider-right-kefu">
                <span class="fr">
                  <svg-icon icon-class="kefu"></svg-icon>
                </span>
                <p class="fr">
                  <svg-icon icon-class="yuyin"></svg-icon>
                  <i></i>
                  你跟我介绍下
                </p>
              </li>
              <li>
                <span class="fl">
                  <svg-icon icon-class="Ai"></svg-icon>
                </span>
                <p class="fl">简单来说就是可以让产品狗快速设计出原型界面的小工具，特别是原滋原味的layui风格。好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              </li>
              <li class="slider-right-kefu">
                <span class="fr">
                  <svg-icon icon-class="kefu"></svg-icon>
                </span>
                <p class="fr">
                  <svg-icon icon-class="yuyin"></svg-icon>
                  <i></i>
                  你跟我介绍下
                </p>
              </li>
              <li>
                <span class="fl">
                  <svg-icon icon-class="Ai"></svg-icon>
                </span>
                <p class="fl">简单来说就是可以让产品狗快速设计出原型界面的小工具，特别是原滋原味的layui风格。好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              </li>
              <li class="slider-right-kefu">
                <span class="fr">
                  <svg-icon icon-class="kefu"></svg-icon>
                </span>
                <p class="fr">
                  <svg-icon icon-class="yuyin"></svg-icon>
                  <i></i>
                  你跟我介绍下
                </p>
              </li>
              <li>
                <span class="fl">
                  <svg-icon icon-class="Ai"></svg-icon>
                </span>
                <p class="fl">简单来说就是可以让产品狗快速设计出原型界面的小工具，特别是原滋原味的layui风格。好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              </li>
              <li class="slider-right-kefu">
                <span class="fr">
                  <svg-icon icon-class="kefu"></svg-icon>
                </span>
                <p class="fr">
                  <svg-icon icon-class="yuyin"></svg-icon>
                  <i></i>
                  你跟我介绍下
                </p>
              </li>
              <li>
                <span class="fl">
                  <svg-icon icon-class="Ai"></svg-icon>
                </span>
                <p class="fl">好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              </li>
              <li class="slider-right-kefu">
                <span class="fr">
                  <svg-icon icon-class="kefu"></svg-icon>
                </span>
                <p class="fr">
                  <svg-icon icon-class="yuyin"></svg-icon>
                  <i></i>
                  你跟我介绍下
                </p>
              </li>
              <li>
                <span class="fl">
                  <svg-icon icon-class="Ai"></svg-icon>
                </span>
                <p class="fl">简单来说就是可以让产品狗快速设计出原型界面的小工具，特别是原滋原味的layui风格。好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              </li>
              <li class="slider-right-kefu">
                <span class="fr">
                  <svg-icon icon-class="kefu"></svg-icon>
                </span>
                <p class="fr">
                  <svg-icon icon-class="yuyin"></svg-icon>
                  <i></i>
                  你跟我介绍下
                </p>
              </li>
            </ul>
          </div>
          <p class="slide-right-audio">
            <audio controls>
              <source src="../../assets/audio.mp3" type="audio/mpeg">
              <source src="../../assets/audio.ogg" type="audio/ogg">
              您的浏览器不支持该音频格式。
            </audio>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'callMore',
  data() {
    return {
      activeName: 'first',
      currentPage: 4,
      dialogVisible: false,
      unexport: false,
      open: true,
      radio7: '',
      care: '',
      textarea: '',
      ruleForm: {
        name: '',
        num: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        num: [{ required: true, message: '请选择外呼号码', trigger: 'blur' }]
      },
      tableData: [
        {
          callID: '565659',
          name: '许总',
          Tel: '15670520667',
          callTime: '01分01秒',
          callDate: '2018-04-26 11:55:55',
          callState: '已接听',
          taskName: '1次',
          lookState: 'B级（一般）'
        },
        {
          callID: '565645',
          name: '许总',
          Tel: '15670520667',
          callTime: '01分01秒',
          callDate: '2018-04-22 11:55:55',
          callState: '已接听',
          taskName: '1次',
          lookState: 'A级（较强）'
        },
        {
          callID: '565359',
          name: '许总',
          Tel: '15670520667',
          callTime: '01分01秒',
          callDate: '2018-04-29 11:55:55',
          callState: '已接听',
          taskName: '1次',
          lookState: 'C级（较少）'
        },
        {
          callID: '548659',
          name: '许总',
          Tel: '15670520667',
          callTime: '01分01秒',
          callDate: '2018-04-16 11:55:55',
          callState: '已接听',
          taskName: '1次',
          lookState: 'C级（较少）'
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    addClient() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    exportClose() {
      this.unexport = false
    },
    handlePreview(file) {
      console.log(file)
    },
    mySuccess(res, file) {
      console.log(res, file)
    },
    closeContent() {
      this.open = false
    },
    openContent(row) {
      console.log(row)
      this.open = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    offServer() {
      this.$confirm('您确定要暂停此项任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '暂停成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消暂停'
          })
        })
    },
    startServer() {
      this.$confirm('您确定要开始此项任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '开始成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  },
  mounted() {}
}
</script>

<style scoped rel="stylesheet/scss" lang="scss" >
.callMore {
  padding: 15px;
  .header {
    span {
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .call-dialog {
    & /deep/ .el-dialog__body {
      padding: 10px;
      .el-input {
        width: 300px;
      }
    }
    & /deep/ .el-dialog__header {
      border-bottom: 1px solid #e6e6e6;
    }
    .upload{
      &>i{
        margin-right: 10px;
      }
      margin-top: 20px;
      .tip{
        color: #999;
        font-size: 12px;
      }
    }
  }
  .top {
    border: solid 1px #e6e6e6;
    padding: 10px;
    margin-top: 10px;
    h3 {
      line-height: 30px;
      span {
        margin-left: 10px;
        color: #67c23a;
        background: #f0f9eb;
        border: 1px solid #c2e7b0;
        border-radius: 3px;
        font-size: 12px;
        padding: 5px 10px;
      }
    }
    .list {
      div {
        & > p {
          float: left;
          height: 30px;
          line-height: 30px;
          color: #999;
          font-size: 13px;
          &:first-child {
            width: 80px;
            text-align: right;
            margin-right: 10px;
          }
          &:last-child {
            width: 300px;
          }
          &.progress {
            .el-progress {
              width: 150px;
              float: left;
              margin-top: 10px;
              margin-right: 10px;
            }
            span {
              color: #409eff;
            }
          }
        }
      }
    }
  }
  .center {
    margin-top: 10px;
    border: solid 1px #e6e6e6;
    .header {
      height: 48px;
      line-height: 48px;
      text-align: center;
      background-color: #f2f2f2;
      font-weight: bold;
      font-size: 14px;
      color: #999;
    }
    .content {
      color: #999;
      li {
        float: left;
        width: 20%;
        height: 75px;
        text-align: center;
        border-top: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        padding: 20px 0;
        font-size: 13px;
        p {
          &:first-child {
            color: #f56c6c;
          }
          &.blue {
            color: #409eff;
          }
          &:last-child {
            margin-top: 10px;
          }
        }
      }
      .el-col {
        height: 150px;
        border-left: 1px solid #e6e6e6;
        padding: 20px;
        border-top: 1px solid #e6e6e6;
        p {
          height: 32px;
          span {
            &:first-child {
              font-weight: bold;
            }
            &:last-child {
              float: right;
            }
          }
        }
        &:first-child {
          border-left: none;
          border-top: none;
          padding: 0;
          p {
            height: auto;
          }
        }
        &:nth-of-type(2) {
          border-left: none;
          p {
            height: 45px;
          }
        }
      }
    }
  }
  .down {
    margin-top: 10px;
    & /deep/ .el-tabs__item {
      font-weight: normal;
    }
    .page {
      text-align: center;
      margin-top: 15px;
    }
  }
  .call-content{
    position: fixed;
    top: 0;
    right: 0;
    width: 800px;
    height: 100%;
    background-color: #fafafa;
    z-index: 9;
    .h3{
      height: 40px;
      width: 100%;
      border-bottom: 1px solid #eee;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      i{
        font-weight: bold;
        float: left;
        height: 100%;
        line-height: 40px;
        width: 40px;
        text-align: center;
        background-color: #409EFF;
        color: #fff;
        cursor: pointer;
      }
      span{
        float: left;
        line-height: 30px;
        padding-right: 20px;
        margin: 5px 20px ;
        font-size: 16px;
        font-weight: bold;
        border-right: 2px solid #e6e6e6;
        color: #666;
      }
      em{
        line-height: 40px;
        color: #999;
        font-size: 14px;
        font-weight: bold;
      }
    }
    .slide-left{
      width: 260px;
      height: 100%;
      padding-top: 50px ;
      float: left;
      overflow: auto;
      li{
        &:last-child{
          border-bottom: none;
        }
        padding: 10px 15px;
        border-bottom:1px dashed #999;
        h5{
          height: 30px;
          font-size: 14px;
        }
        .slide-left-btn{
          text-align: right;
          margin-top: 15px;
        }
        .slide-left-grade{
          & /deep/ .el-radio-button__inner{
            font-size: 12px;
            padding: 10px 3px;
            border-color: #8cc5fe;
            font-weight: normal;
          }
        }
        .slide-left-care{
          span{
            width: auto;
            height: 32px;
            line-height: 32px;
            padding: 0 10px;
            border: 1px solid #8cc5fe;
            border-radius: 3px;
            margin-right: 10px;
            margin-bottom: 10px;
            font-size: 12px;
            cursor: pointer;
            background-color: #fff;
            &.active{
              background-color: #409EFF;
              color: #fff;
            }
          }
        }
        p{
          color: #666;
          overflow: hidden;
          margin-bottom: 15px;
          font-size: 14px;
          &>span{
            float: left;
            height: 100%;
            width: 90px;
            text-align: right;
          }
          &>i{
            float: right;
            width: 130px;
          }
          a{
            width: 80px;
            float: left;
            height: 70px;
            padding: 10px 0;
            border: 1px solid #ccc;
            border-radius: 3px;
            background-color: #fff;
            margin-left: 25px;
            span{
              display: block;
              text-align: center;
              font-size: 20px;
              color: #409EFF;
              sub{
                bottom: 0.1em;
              }
            }
            i{
              display: block;
              text-align: center;
              margin-top: 5px;
            }
          }
        }
      }
    }
    .slide-right{
      width: 540px;
      padding-top: 50px;
      height: 100%;
      float: right;
      position: relative;
      padding-bottom: 50px;
      background-color: #fafafa;
      & > div{
        height: 100%;
        width: 100%;
        background-color: #fff;
        overflow: auto;
        padding: 20px 10px;
        li{
          overflow: hidden;
          margin-bottom: 30px;
          span{
            background-color: #8cc5fe;
            border-radius: 50px;
            padding: 10px;
            width: 48px;
            height: 48px;
            text-align: center;
            svg{
              color: #fff;
              font-size: 30px;
            }
          }
          p{
            background-color: #f2f2f2;
            font-size: 12px;
            padding: 10px 5px;
            max-width: 280px;
            margin: 0 20px;
            color: #666;
            border-radius: 5px;
            position: relative;
            z-index: 3;
            min-height: 38px;
            i{
              position: absolute;
              width: 10px;
              height: 10px;
              top: 10px;
              left: -5px;
              background-color:#f2f2f2;
              transform: skew(45deg);
              z-index: -1;
            }
          }
        }
        .slider-right-kefu{
          cursor: pointer;
          span{
            background-color: #e0e0e0;
            svg{
              font-size: 25px;
              color: #fff;
            }
          }
          p{
            svg{
              font-size: 18px;
              color: #8cc5fe;
            }
            i{
              left: auto;
              right: -5px;
              transform: skew(-45deg)
            }
          }
        }
      }
      .slide-right-audio{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        audio{
          width: 100%;
          margin-top: 5px;
        }
      }
    }
  }
}
.slide-enter-active, .slide-leave-active {
  transition: transform .5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(800px)
}
</style>
