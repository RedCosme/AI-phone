/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-05-09 09:56:25 
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-05-09 17:30:28
 */
<template>
  <div class="call-out">
    <div class="top">
      <el-input v-model="value" placeholder="请输入任务详情" prefix-icon="el-icon-search" clearable></el-input>
      <el-date-picker v-model="date" type="datetime" placeholder="选择日期时间"></el-date-picker>
      <el-select v-model="selected" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="addTast">新建任务</el-button>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :before-close="handleClose" class="call-dialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="任务名称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="启动方式：" prop="style">
            <el-radio-group v-model="ruleForm.style">
              <el-radio-button label="手动启动"></el-radio-button>
              <el-radio-button label="定时启动"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启动时间：" required>
            <el-col :span="13">
              <el-form-item prop="date1">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="AI话术：" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外呼号码：" prop="num">
            <el-select v-model="ruleForm.num" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务描述：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入内容" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" height="800px">
        <el-table-column prop="name" label="任务名称" align="center">
        </el-table-column>
        <el-table-column prop="progress" label="进度" align="center" width="250px">
          <template slot-scope="scope">
            <div class="call-progress">
              <el-progress :percentage="scope.row.progress/12*100" :stroke-width="10" :show-text="false"></el-progress>
              <span>进度{{scope.row.progress}}/12</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="任务类型">
        </el-table-column>
        <el-table-column prop="create" label="创建者" align="center">
        </el-table-column>
        <el-table-column prop="date" label="创建时间" sortable>
        </el-table-column>
        <el-table-column prop="statue" label="状态">
          <template slot-scope="scope">
            <!--这个控件，还可可以传背景颜色和文字颜色，不传则默认背景颜色是白色，文字颜色是黑色-->
            <my-state :state="scope.row.status" :option="[
								{value:'1',label:'已终止',background:'#fef0f0',color:'rgb(247, 141, 141)'},
								{value:'2',label:'进行中',background:'#eef3ff',color:'rgb(85, 132, 255)'},
								{value:'3',label:'已完成',background:'#f0fae6',color:'rgb(102, 204, 0)'}
              				]"></my-state>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import myState from '@/components/state'
export default {
  name: 'callOut',
  components: {
    myState
  },
  data() {
    return {
      value: '',
      date: '',
      dialogVisible: false,
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
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selected: '',
      tableData: [
        {
          name: '互联网营销',
          progress: '10',
          type: 'AI外呼',
          create: '王帅帅',
          date: '2018-04-26 11:55:55',
          status: '1'
        },
        {
          name: '互联网营销',
          progress: '7',
          type: 'AI外呼',
          create: '王帅帅',
          date: '2018-04-18 11:55:55',
          status: '2'
        },
        {
          name: '互联网营销',
          progress: '12',
          type: 'AI外呼',
          create: '王帅帅',
          date: '2018-04-16 11:55:55',
          status: '3'
        },
        {
          name: '互联网营销',
          progress: '1',
          type: 'AI外呼',
          create: '王帅帅',
          date: '2018-04-08 11:55:55',
          status: '2'
        }
      ],
      ruleForm: {
        name: '',
        style: '定时启动',
        region: '',
        date1: '',
        num: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        style: [{ required: true, message: '请选择方式', trigger: 'click' }],
        region: [
          { required: true, message: '请选择AI话术', trigger: 'change' }
        ],
        num: [{ required: true, message: '请选择外呼号码', trigger: 'change' }],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        desc: [
          { required: false, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    addTast() {
      this.dialogVisible = true
      this.dialogTitle = '新增任务'
    },
    handleClick(row) {
      this.dialogVisible = true
      this.dialogTitle = '编辑任务'
      console.log(row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleClose() {
      this.dialogVisible = false
    }
  },
  mounted() {}
}
</script>

<style scoped  rel="stylesheet/scss" lang="scss" >
.call-out {
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
  .call-dialog {
    & /deep/ .el-dialog__body {
      border-top: 1px solid #dcdfe6;
      padding: 10px;
    }
    & /deep/ .el-input {
      width: 300px !important;
    }
  }
}
</style>
