/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-05-09 10:00:21 
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-05-09 19:37:04
 */
<template>
  <div class="callDetail">
    <div class="top">
      <el-input v-model="value" placeholder="请输入搜索的关键词" prefix-icon="el-icon-search" clearable></el-input>
      <el-date-picker v-model="date" type="datetime" placeholder="选择日期时间"></el-date-picker>
      <el-select v-model="selected" placeholder="请选择任务状态">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary">确定</el-button>
      <el-button>重置</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" height="800px">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="callID" label="通话记录ID" sortable>
        </el-table-column>
        <el-table-column prop="name" label="客户名称" sortable>
        </el-table-column>
        <el-table-column prop="Tel" label="联系方式" sortable>
        </el-table-column>
        <el-table-column prop="callDate" label="通话时间" sortable>
        </el-table-column>
        <el-table-column prop="callTime" label="通话时长" sortable>
        </el-table-column>
        <el-table-column prop="callState" label="通话状态" sortable>
        </el-table-column>
        <el-table-column prop="taskName" label="任务名称" sortable>
        </el-table-column>
        <el-table-column prop="lookState" label="查看状态" sortable>
          <template slot-scope="scope">
            <span @click="openContent(scope.row)">{{scope.row.lookState}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
    <transition name="slide">
      <div class="call-content" v-show="open">
        <div class="h3">
          <i class="el-icon-arrow-right" @click="closeContent"></i>
          <span>通话内容</span>
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
  name: 'callDetail',
  data() {
    return {
      care: '',
      textarea: '',
      radio7: '',
      value: '',
      date: '',
      open: true,
      currentPage: 4,
      dialogTitle: '新增任务',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      selected: '',
      tableData: [
        {
          callID: '565659',
          name: '许总',
          Tel: '15670520667',
          callTime: '01分01秒',
          callDate: '2018-04-26 11:55:55',
          callState: '已接听',
          taskName: '燕大房产项目',
          lookState: '已读'
        },
        {
          callID: '565645',
          name: '许总',
          Tel: '15670520667',
          callTime: '01分01秒',
          callDate: '2018-04-22 11:55:55',
          callState: '已接听',
          taskName: '燕大房产项目',
          lookState: '已读'
        },
        {
          callID: '565359',
          name: '许总',
          Tel: '15670520667',
          callTime: '01分01秒',
          callDate: '2018-04-29 11:55:55',
          callState: '已接听',
          taskName: '燕大房产项目',
          lookState: '已读'
        },
        {
          callID: '548659',
          name: '许总',
          Tel: '15670520667',
          callTime: '01分01秒',
          callDate: '2018-04-16 11:55:55',
          callState: '已接听',
          taskName: '燕大房产项目',
          lookState: '已读'
        }
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    closeContent() {
      this.open = false
    },
    openContent(row) {
      console.log(row)
      this.open = true
    }
  },
  mounted() {}
}
</script>

<style scoped  rel="stylesheet/scss" lang="scss" >
.callDetail {
  padding: 10px;
  .top {
    margin-bottom: 20px;
    &>>>.el-input {
      width: 200px;
    }
  }
  .table {
    border: 1px solid #ebeef5;
    border-bottom: none;
  }
  .page {
    text-align: center;
    margin-top: 20px;
  }
  .call-progress {
    .el-progress {
      width: 120px;
      float: left;
      margin-top: 5px;
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
        line-height: 40px;
        margin-left: 20px;
        font-size: 16px;
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

