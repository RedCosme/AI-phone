/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-05-10 17:25:40 
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-05-11 16:43:05
 */
<template>
  <div class="talk">
    <p class="header">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addTalk">新建AI话术</el-button>
      <span class="fr">
        <i class="el-icon-upload2"></i>导出</span>
      <span class="fr" @click="unexport = true">
        <i class="el-icon-download"></i>导入</span>
      <el-dialog :title="talkTitle" :visible.sync="dialogVisible" width="500px" :before-close="handleClose" class="call-dialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
          <el-form-item label="AI话术名称：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入任务名称"></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="num">
            <el-input v-model="ruleForm.num" type="textarea" :rows="5" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </p>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="talkName" label="话术名称" sortable>
        </el-table-column>
        <el-table-column prop="detail" label="描述" sortable width="400" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" sortable>
        </el-table-column>
        <el-table-column prop="lookState" label="状态" sortable>
          <template slot-scope="scope">
            <!--这个控件，还可可以传背景颜色和文字颜色，不传则默认背景颜色是白色，文字颜色是黑色-->
            <my-state :state="scope.row.lookState" :option="[
								{value:'1',label:'已终止',background:'#fef0f0',color:'rgb(247, 141, 141)'},
								{value:'2',label:'进行中',background:'#eef3ff',color:'rgb(85, 132, 255)'},
								{value:'3',label:'已发布',background:'#f0fae6',color:'rgb(102, 204, 0)'}
              	]"></my-state>
          </template>
        </el-table-column>
        <el-table-column prop="callTime" label="操作" sortable class-name="do-some" width="220px">
          <template slot-scope="scope">
            <span @click="editTalk(scope.row)">编辑</span>
            <span @click="settingTalk(scope.row)">设置话术</span>
            <span>知识库</span>
            <el-dropdown placement="bottom" trigger="click">
              <span class="el-icon-more">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>发布话术</el-dropdown-item>
                <el-dropdown-item>变更日志</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import myState from '@/components/state'
export default {
  name: 'talkConfig',
  components: {
    myState
  },
  data() {
    return {
      unexport: false,
      dialogVisible: false,
      currentPage: 4,
      value: '',
      talkTitle: '',
      ruleForm: {
        name: '',
        num: ''
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
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        num: [{ required: true, message: '请输入描述信息', trigger: 'blur' }]
      },
      tableData: [
        {
          detail:
            'AI外呼是什么我觉得Audio.js这个音乐播放器很简约，使用很简单...',
          createDate: '2018-04-26 11:55:55',
          callState: '已接听',
          talkName: '燕大房产项目',
          lookState: '1'
        },
        {
          detail:
            'AI外呼是什么我觉得Audio.js这个音乐播放器很简约，使用很简单...',
          createDate: '2018-04-26 11:55:55',
          callState: '已接听',
          talkName: '燕大房产项目',
          lookState: '2'
        },
        {
          detail: '15670520667',
          createDate: '2018-04-26 11:55:55',
          callState: '已接听',
          talkName: '燕大房产项目',
          lookState: '3'
        },
        {
          detail: '15670520667',
          createDate: '2018-04-26 11:55:55',
          callState: '已接听',
          talkName: '燕大房产项目',
          lookState: '1'
        }
      ]
    }
  },
  methods: {
    addTalk() {
      this.dialogVisible = true
      this.talkTitle = '新增AI话术'
    },
    editTalk(row) {
      console.log(row)
      this.dialogVisible = true
      this.talkTitle = '编辑AI话术'
    },
    settingTalk(row) {
      console.log(row)
      this.$router.push('/AiConfig/setting')
    },
    handleClose() {
      this.dialogVisible = false
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
}
</style>
