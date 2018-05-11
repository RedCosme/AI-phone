/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-05-11 10:02:44 
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-05-11 16:39:27
 */
<template>
  <div class="talk-setting">
    <div class="setting-left">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addProcess">新建流程</el-button>
      <ul>
        <li v-for="(item, index) in talkList" :key="index">
          <span>{{item.num}}.</span>
          <div>
            <h6>{{item.name}}</h6>
            <p>
              <i class="el-icon-edit" @click="editProcess(item, index)"></i>
              <i class="el-icon-delete" @click="deleteProcess(index)"></i>
            </p>
          </div>
        </li>
      </ul>
      <el-dialog :title="processTitle" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
          <el-form-item label="流程名称：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入任务名称"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>

    </div>
    <div class="setting-right">
      <div class="header">
        <a @click="openContent">
          <i class="el-icon-tickets"></i>
          <span>普通话术</span>
          <i class="el-icon-setting"></i>
        </a>
        <a>
          <i class="el-icon-news"></i>
          <span>跳转话术</span>
          <i class="el-icon-setting"></i>
        </a>
      </div>
      <div>
        content
      </div>
      <p class="save">
        <el-button type="primary">保存</el-button>
      </p>
    </div>
    <transition name="slide">
      <div class="common-setting" v-show="open">
        <div class="h3">
          <i class="el-icon-arrow-right" @click="closeContent"></i>
          <span>普通话术设置</span>
        </div>
        <div class="commonForm">
          <el-form :model="commonForm" :rules="commons" ref="commonForm" label-width="110px">
            <el-form-item label="流程名称：" prop="name">
              <el-input v-model="commonForm.name" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="AI话术：" prop="AI">
              <el-input v-model="commonForm.AI" placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="用户回答：" prop="checkedAnswer">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部回答分支</el-checkbox>
              <el-button type="primary" icon="el-icon-plus" size="mini" class="fr" style="margin-right:70px" @click="addBranch">添加分支</el-button>
              <el-checkbox-group v-model="commonForm.checkedAnswer" @change="handleCheckedCitiesChange" class="mycheckbox">
                <p v-for="(answer, index) in Answer" :key="index" >
                  <el-checkbox :label="answer">{{answer}}</el-checkbox>
                  <span class="edit">编辑</span>
                </p>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="其他设置：" required>
              <el-form-item prop="other">
                <el-select v-model="commonForm.other" placeholder="是否允许用户打断" >
                  <el-option label="允许" value="允许"></el-option>
                  <el-option label="不可打断" value="不可打断"></el-option>
                </el-select>
              </el-form-item>
              <div style="margin:20px 0"></div>
              <el-form-item prop="style">
                <el-select v-model="commonForm.style" placeholder="请选择沟通方式 " >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <div style="margin:20px 0"></div>
              <el-form-item prop="grade">
                <el-select v-model="commonForm.grade" placeholder="请选择客户意向等级" >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn">
          <el-button >取消</el-button>
          <el-button type="primary" @click="submit('commonForm')">确定</el-button>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="common-branch" v-show="branch">
        <div class="h3">
          <i class="el-icon-arrow-right" @click="closeBranch"></i>
          <span>新建/编辑分支</span>
        </div>
        <div class="branchForm">
          <el-form :model="branchForm" :rules="branchs" ref="branchForm" label-width="110px">
            <el-form-item label="分支名称：" prop="name">
              <el-input v-model="branchForm.name" placeholder="请输入分支名称"></el-input>
            </el-form-item>
            <el-form-item label="回答方式：" prop="style">
              <el-input v-model="branchForm.style" placeholder="请输入回答方式"  type="textarea" :rows="20"></el-input>
            </el-form-item>
            <el-form-item label="关键词：" prop="key" class="key">
              <el-input v-model="branchForm.key" placeholder="请输入关键词"></el-input>
              <p>匹配到该分支的关键词</p>
              <p>暂无关键词</p>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn">
          <el-button >取消</el-button>
          <el-button type="primary" @click="submit('branchForm')">确定</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const AnswerOption = ['默认回答', '肯定', '否定', '拒绝', '未识别']
export default {
  name: 'talkSetting',
  data() {
    return {
      isEdit: true,
      editId: null,
      dialogVisible: false,
      processTitle: '',
      open: true,
      checkAll: false,
      Answer: AnswerOption,
      isIndeterminate: true,
      branch: true,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      ruleForm: {
        name: ''
      },
      commons: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        AI: [
          { required: true, message: '请输入AI话术', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        checkedAnswer: [
          { required: true, message: '请输入AI话术', trigger: 'click' }
        ],
        other: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        style: [
          { required: true, message: '请选择沟通方式', trigger: 'change' }
        ],
        grade: [
          { required: true, message: '请选择客户意向等级', trigger: 'change' }
        ]
      },
      commonForm: {
        name: '',
        AI: '',
        checkedAnswer: [],
        other: '',
        style: '',
        grade: ''
      },
      branchs: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '请输入关键词', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        style: [
          { required: true, message: '请填写回答方式', trigger: 'blur' }
        ]
      },
      branchForm: {
        name: '',
        style: '',
        key: ''
      },
      talkList: [
        {
          name: '开场白',
          num: 1
        },
        {
          name: '产品介绍',
          num: 2
        },
        {
          name: '套餐介绍',
          num: 3
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    addProcess() {
      this.isEdit = false
      this.dialogVisible = true
      this.processTitle = '新建流程'
      this.ruleForm.name = ''
    },
    editProcess(item, index) {
      this.editId = index
      this.isEdit = true
      this.dialogVisible = true
      this.processTitle = '编辑流程'
      this.ruleForm.name = item.name
      console.log(item)
    },
    sure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const name = this.ruleForm.name
          if (this.isEdit) {
            const id = this.editId
            this.talkList[id].name = name
          } else {
            const num = this.talkList[this.talkList.length - 1].num + 1
            this.talkList.push({
              name: name,
              num: num
            })
          }
          alert('submit!')
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deleteProcess(index) {
      this.$confirm('是否删除流程', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.talkList.splice(index, 1)
      }).catch(() => {})
    },
    openContent() {
      this.open = true
    },
    closeContent() {
      this.open = false
    },
    handleCheckAllChange(val) {
      this.commonForm.checkedAnswer = val ? AnswerOption : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.Answer.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.Answer.length
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addBranch() {
      this.branch = true
    },
    closeBranch() {
      this.branch = false
    }
  },
  mounted() {}
}
</script>

<style  rel='stylesheet/scss' lang='scss' scoped >
.talk-setting {
  position: relative;
  height: 93vh;
  width: 100%;
  box-sizing: border-box;
  .setting-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 170px;
    height: 100%;
    border-right: 1px solid #e6e6e6;
    background: #fff;
    padding-top: 10px;
    & /deep/ .el-input{
      width: 300px;
    }
    & > button {
      display: block;
      margin: 0 auto;
      margin-bottom: 10px;
    }
    ul {
      overflow: hidden;
    }
    li {
      float: left;
      width: 100%;
      height: 60px;
      padding: 0 20px 0 5px;
      cursor: pointer;
      margin-bottom: 10px;
      span {
        float: left;
        line-height: 60px;
        color: #666;
      }
      div {
        width: 120px;
        height: 60px;
        border: 1px solid #e6e6e6;
        float: right;
        padding: 10px;
        border-radius: 3px;
        color: #666;

        h6 {
          font-weight: normal;
        }
        p {
          margin-top: 10px;
          text-align: right;
        }
      }
    }
  }
  .setting-right {
    width: 100%;
    height: 100%;
    padding-left: 170px;
    background-color: #f7f7f7;
    .header {
      background-color: #fff;
      height: 45px;
      padding: 5px 10px;
      border-bottom: 1px solid #e6e6e6;
      a {
        padding: 5px;
        border: 1px solid #aaa;
        border-radius: 3px;
        float: left;
        font-size: 12px;
        color: #666;
        margin-right: 10px;
        span {
          float: left;
          line-height: 20px;
          margin: 0 5px;
        }
        i {
          font-size: 18px;
          float: left;
          &:last-child {
            color: #8cc5fe;
          }
        }
      }
    }
    .save {
      position: absolute;
      bottom: 40px;
      right: 60px;
    }
  }
  .common-setting{
    position: fixed;
    top: 0;
    right: 0;
    width: 500px;
    height: 100%;
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
    .commonForm{
      padding: 10px;
      .mycheckbox{
        border: 1px solid #e6e6e6;
        border-bottom: none;
        border-radius: 3px;
        width: 300px;
        p{
          border-bottom:1px solid #e6e6e6; 
          padding-left: 10px;
          .edit{
            float: right;
            font-size: 14px;
            color: #409EFF;
            margin-right: 50px;
            cursor: pointer;
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
  .common-branch{
    position: fixed;
    top: 0;
    right: 0;
    width: 370px;
    height: 100%;
    background-color: #fff;
    & /deep/ .el-input{
      width: 230px;
    }
    & /deep/ .el-textarea{
      width: 230px;
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
    .branchForm{
      padding: 10px;
      .key{
        p{
          color: #999;
          line-height: 25px;
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
