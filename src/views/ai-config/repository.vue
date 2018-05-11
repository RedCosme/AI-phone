/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-05-10 17:25:40 
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-05-11 18:49:38
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
}
.slide-enter-active, .slide-leave-active {
  transition: transform .5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(800px)
}
</style>
