/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-05-10 17:25:40 
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-05-14 16:32:41
 */
<template>
  <div class="talk">
    <p class="header">
      <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入搜索关键词"></el-input>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addQuestion">添加</el-button>
      <span class="fr">
        <i class="el-icon-upload2"></i>导出</span>
      <span class="fr" @click="unexport = true">
        <i class="el-icon-download"></i>导入</span>
    </p>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="标题" align="center" >
        </el-table-column>
        <el-table-column prop="detail" label="描述"  width="500" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" sortable>
        </el-table-column>
        <el-table-column prop="callTime" label="操作"  class-name="do-some" width="220px">
          <template slot-scope="scope">
            <span @click="lookDetail(scope.row)">查看详情</span>
            <span @click="editDetail(scope.row)">编辑</span>
            <span>删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
    <transition name="slide">
      <div class="add-question" v-show="addQueation">
        <div class="h3">
          <i class="el-icon-arrow-right" @click="closeQuestion"></i>
          <span>添加问题</span>
        </div>
        <div class="questionForm">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
            <el-form-item prop="questionType" label="问题类型：" >
                <el-select v-model="ruleForm.questionType" placeholder="概括问题场景 " >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="问题标题：" prop="title">
              <el-input v-model="ruleForm.title" placeholder="输入问题多种问法，并回车"></el-input>
            </el-form-item>
            <el-form-item label="问题问法：" prop="textarea">
              <el-input v-model="ruleForm.textarea" type="textarea" :rows="5" placeholder="请输入问题问法"></el-input>
            </el-form-item>
            <el-form-item label="关键词：" prop="key">
              <el-input v-model="ruleForm.key" placeholder="请输入关键词，回车"></el-input>
            </el-form-item>
            <el-form-item label="回答方式：" prop="answerType">
              <el-radio-group v-model="ruleForm.answerType" size="mini">
                <el-radio-button label="单人问答"></el-radio-button>
                <el-radio-button label="进入多人会话"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="标准答案：" prop="result">
              <div class="answerList">
                <p class="btn"><el-button type="primary" size="mini">添加回答</el-button></p>
                <ul>
                  <li>抱歉，暂时没听清您的问题。您刚刚说什么来着? <i></i></li>
                  <li>抱歉，暂时没听清您的问题。您刚刚说什么来着?<i></i></li>
                  <li>..........<i></i></li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="其他设置：" required>
              <el-form-item prop="exchangeType">
                <el-select v-model="ruleForm.exchangeType" placeholder="请选择沟通方式" >
                  <el-option label="允许" value="允许"></el-option>
                  <el-option label="不可打断" value="不可打断"></el-option>
                </el-select>
              </el-form-item>
              <div style="margin:20px 0"></div>
              <el-form-item prop="grade">
                <el-select v-model="ruleForm.grade" placeholder="请选择客户意向等级" >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn">
          <el-button >取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="qusetion-detail" v-show="questionDetail">
        <div class="h3">
          <i class="el-icon-arrow-right" @click="closeQuestionDetail"></i>
          <span>问题详情</span>
          <em>更新时间：2018-05-04   12:12:23</em>
        </div>
        <div class="detail-left">
          <div>
            <span>问题类型：</span>
            <p>
              <a class="active">问候</a>
              <a >常规</a>
              <a>特殊</a>
            </p>
          </div>
          <div>
            <span>问题标题：</span>
            <p>
              什么
            </p>
          </div>
          <div>
            <span>问题问法：</span>
            <p>
              AI外呼是什么我觉得Audio.js这个音乐播放器很简约，使用很简单...
            </p>
          </div>
          <div>
            <span>关键词：</span>
            <p>
              <!-- <a class="active">问候</a>
              <a >常规</a>
              <a >特殊</a> -->
            </p>
          </div>
          <p>
            <el-button size="mini">取消</el-button>
            <el-button type="primary" size="mini">编辑问题</el-button>
          </p>
          <p><i class="el-icon-d-arrow-right" @click="showSlideDown"></i></p>
        </div>
        <div class="detail-right">
          <h5>问题答案：</h5>
          <ul>
            <li>
              <span class="fl">
                <svg-icon icon-class="Ai"></svg-icon>
              </span>
              <p class="fl">好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              <div class="question-audio">
                <audio controls>
                  <source src="../../assets/audio.mp3" type="audio/mpeg">
                  您的浏览器不支持该音频格式。
                </audio>
              </div>
            </li>
            <li>
              <span class="fl">
                <svg-icon icon-class="Ai"></svg-icon>
              </span>
              <p class="fl">好奇宝宝也可以自行下载和安装Axure体验好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              <div class="question-audio">
                <audio controls>
                  <source src="../../assets/audio.mp3" type="audio/mpeg">
                  您的浏览器不支持该音频格式。
                </audio>
              </div>
            </li>
            <li>
              <span class="fl">
                <svg-icon icon-class="Ai"></svg-icon>
              </span>
              <p class="fl">好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              <div class="question-audio">
                <audio controls>
                  <source src="../../assets/audio.mp3" type="audio/mpeg">
                  您的浏览器不支持该音频格式。
                </audio>
              </div>
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
              <div class="question-audio">
                <audio controls>
                  <source src="../../assets/audio.mp3" type="audio/mpeg">
                  您的浏览器不支持该音频格式。
                </audio>
              </div>
            </li>
            <li>
              <span class="fl">
                <svg-icon icon-class="Ai"></svg-icon>
              </span>
              <p class="fl">简单来说就是可以让产品狗快速设计出原型界面的小工具，特别是原滋原味的layui风格。好奇宝宝也可以自行下载和安装Axure体验。<i></i></p>
              <div class="question-audio">
                <audio controls>
                  <source src="../../assets/audio.mp3" type="audio/mpeg">
                  您的浏览器不支持该音频格式。
                </audio>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="slideDown">
      <div class="slideDown" v-show="questionDetailDown">
        <ul>
          <li>
            <span>回答方式：</span>
            <div>
              <el-radio-group v-model="radio">
                <el-radio-button label="上海"></el-radio-button>
                <el-radio-button label="北京"></el-radio-button>
              </el-radio-group>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'repository',
  data() {
    return {
      input: '',
      unexport: false,
      addQueation: true,
      questionDetail: true,
      questionDetailDown: true,
      radio: '',
      currentPage: 4,
      value: '',
      talkTitle: '',
      ruleForm: {
        title: '',
        questionType: '',
        textarea: '',
        key: '',
        answerType: '进入多人会话',
        exchangeType: '',
        grade: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      rules: {
        title: [
          { required: true, message: '请输入问题标题', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        questionType: [
          { required: true, message: '请选择问题类型', trigger: 'change' }
        ],
        textarea: [
          { required: true, message: '请输入问题文法', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ],
        answerType: [
          { required: true, message: '请选择回答方式', trigger: 'change' }
        ],
        exchangeType: [
          { required: true, message: '请选择交流方式', trigger: 'change' }
        ],
        grade: [
          { required: true, message: '请选择客户意向等级', trigger: 'change' }
        ],
        result: [
          { required: true, message: ' ' }
        ]

      },
      tableData: [
        {
          detail:
            'AI外呼是什么我觉得Audio.js这个音乐播放器很简约，这个音乐播放器很简约这个音乐播放器很简约',
          createDate: '2018-04-26 11:55:55',
          title: '燕大房产项目'
        },
        {
          detail:
            'AI外呼是什么我觉得Audio.js这个音乐播放器很简约，使用很简单...',
          createDate: '2018-04-26 11:55:55',
          title: '燕大房产项目'
        },
        {
          detail: '15670520667',
          createDate: '2018-04-26 11:55:55',
          title: '燕大房产项目'
        },
        {
          detail: '15670520667',
          createDate: '2018-04-26 11:55:55',
          title: '燕大房产项目'
        }
      ]
    }
  },
  methods: {
    addQuestion() {
      this.addQueation = true
    },
    editDetail(row) {
      console.log(row)
      this.dialogVisible = true
    },
    lookDetail(row) {
      console.log(row)
      this.questionDetail = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    closeQuestion() {
      this.addQueation = false
    },
    closeQuestionDetail() {
      this.questionDetail = false
      this.questionDetailDown = false
    },
    showSlideDown() {
      this.questionDetailDown = !this.questionDetailDown
    }
  },
  mounted() {}
}
</script>

<style  rel='stylesheet/scss' lang='scss' scoped >
.talk {
  padding: 15px;
  .header {
    span {
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
    }
    & /deep/ .el-input{
      width: 200px;
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
    .upload {
      & > i {
        margin-right: 10px;
      }
      margin-top: 20px;
      .tip {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .table {
    border: 1px solid #e6e6e6;
    border-bottom: none;
    margin-top: 10px;
    .do-some {
      span {
        font-size: 14px;
        color: #217cfa;
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
  .page {
    text-align: center;
    margin-top: 20px;
  }
  .add-question{
    position: fixed;
    top: 0;
    right: 0;
    width: 500px;
    height: 100%;
    z-index: 2;
    background-color: #fff;
    & /deep/ .el-input{
      width: 300px;
    }
    .h3{
      height: 40px;
      width: 100%;
      border-bottom: 1px solid #eee;
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
    .questionForm{
      padding: 10px;
      & /deep/ .el-textarea{
        width: 300px;
      }
      .answerList{
        position: relative;
        .btn{
          position: absolute;
          top: -40px;
          right: 70px;
        }
        li{
          padding: 20px;
          background-color: #f2f2f2;
          border-radius: 5px;
          width: 300px;
          margin-top: 10px;
          line-height: 20px;
          font-size: 12px;
          position: relative;
          i{
            position: absolute;
            width: 10px;
            height: 10px;
            top: 10px;
            left: -5px;
            background-color: #f2f2f2;
            -webkit-transform: skew(45deg);
            transform: skew(45deg);
          }
        }
      }
    }
    .btn{
      position: absolute;
      bottom: 40px;
      right: 40px;
    }
  }
  .qusetion-detail{
    position: fixed;
    top: 0;
    right: 0;
    width: 800px;
    height: 50%;
    z-index: 4;
    background-color: #fafafa;
    padding-top: 50px;
    border-bottom: 3px solid #ccc;
    & /deep/ .el-input{
      width: 300px;
    }
    .h3{
      height: 40px;
      width: 100%;
      border-bottom: 1px solid #eee;
      background-color: #fff;
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
    .detail-left{
      height: 100%;
      width: 260px;
      float: left;
      &>div{
        padding: 20px 10px;
        border-bottom: 1px dashed #ccc;
        height: 90px;
        font-size: 14px;
        &:last-of-type{
          border-bottom: none;
        }
        span{
          float: left;
          width: 80px;
          height: 100%;
          color: #666;
        }
        p{
          font-size: 12px;
          color: #666;
          a{
            width: 60px;
            height: 25px;
            text-align: center;
            line-height: 25px;
            display: inline-block;
            background-color: #fff;
            border-radius: 3px;
            border: 1px solid #8cc5fe;
            color: #999;
            margin-right: 5px;
            margin-bottom: 5px;
            font-size: 12px;
            &.active{
              color: #fff;
              background-color: #409EFF;
            }
          }
        }
      }
      &>p{
        padding:10px; 
        text-align: center;
        &:first-of-type{
          margin-top: 20px;
        }
        i{
          transform: rotate(90deg);
          font-size: 18px;
          margin-top: -10px;
          color: #999;
          cursor: pointer;
        }
      }
    }
    .detail-right{
      height: 100%;
      width: 540px;
      float: left;
      background-color: #fff;
      padding: 10px;
      overflow-y: auto;
      h5{
        color: #666;
        font-weight: normal;
        margin-bottom: 20px;
      }
      li{
        overflow: hidden;
        margin-bottom: 30px;
        span{
          background-color: #8cc5fe;
          border-radius: 40px;
          padding: 8px;
          width: 40px;
          height: 40px;
          text-align: center;
          svg{
            color: #fff;
            font-size: 25px;
          }
        }
        p{
          background-color: #f2f2f2;
          font-size: 12px;
          padding: 10px 5px;
          max-width: 260px;
          margin: 0 20px;
          color: #666;
          border-radius: 5px;
          position: relative;
          z-index: 3;
          min-height: 38px;
          margin-bottom: 3px;
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
      .question-audio{
        width: 380px;
        padding: 0 60px ;
        audio{
         width: 100%;
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
  }
  .slideDown{
    width: 800px;
    height: 50%;
    position: fixed;
    bottom: 0%;
    right: 0;
    z-index: 3;
    background-color: #fff;
    padding: 10px;
  }
}
.slide-enter-active, .slide-leave-active {
  transition: transform .5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(800px)
}
.slideDown-enter-active, .slideDown-leave-active {
  transition: transform .5s;
}
.slideDown-enter, .slideDown-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-800px)
}
// 这个方式兼容所有版本的谷歌浏览器
audio::-webkit-media-controls {
    overflow: hidden !important
}
audio::-webkit-media-controls-enclosure {
    width: calc(100% + 32px);
    margin-left: auto;
}
</style>
