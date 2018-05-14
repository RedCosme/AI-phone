/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-05-14 14:31:32 
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-05-14 16:00:32
 */
<template>
  <div class="client-manager">
    <div class="top">
      <el-input placeholder="请输入内容" v-model="input" prefix-icon="el-icon-search">
        <el-button slot="append" type="primary">搜索</el-button>
      </el-input>
      <span class="fr">
        <i class="el-icon-upload2"></i>导出</span>
      <span class="fr" >
        <i class="el-icon-download"></i>导入</span>
    </div>
    <div class="table">
      <p class="btn">
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">新建客户</el-button>
        <el-button type="primary" @click="choose = true">添加到AI外呼任务</el-button>

        <el-dialog title="新建客户" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="people">
              <el-input v-model="ruleForm.people"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary"  @click="submitForm('ruleForm')">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="AI外呼" :visible.sync="choose" width="500px" :before-close="handleClose">
          <el-form :model="ruleForm" :rules="rules" ref="ruleFormChoose" label-width="100px">
            <el-form-item label="选择任务" prop="select">
              <el-select v-model="ruleForm.select" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="choose = false">取 消</el-button>
            <el-button type="primary"  @click="submitForm('ruleFormChoose')">确 定</el-button>
          </span>
        </el-dialog>
        
      </p>
      <el-table :data="tableData" style="width: 100%" class="mytable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="客户名称">
        </el-table-column>
        <el-table-column prop="Tel" label="联系方式">
        </el-table-column>
        <el-table-column prop="people" label="负责人">
        </el-table-column>
        <el-table-column prop="clientGrade" label="客户意向等级">
        </el-table-column>
        <el-table-column prop="callDate" label="最后更进时间">
        </el-table-column>
        <el-table-column prop="callState" label="通话状态">
        </el-table-column>
        <el-table-column prop="stage" label="跟进状态">
        </el-table-column>
        <el-table-column prop="notes" label="跟进备注">
        </el-table-column>
        <el-table-column prop="task" label="最近AI外出任务">
        </el-table-column>
        <el-table-column prop="peopleFrom" label="客户来源">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" class-name="do" align="center">
          <template slot-scope="scope">
            <i class="el-icon-phone-outline"></i>
            <i class="el-icon-message"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'clientManager',
  data() {
    return {
      input: '',
      currentPage: 4,
      dialogVisible: false,
      choose: false,
      ruleForm: {
        name: '',
        people: '',
        tel: '',
        select: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        people: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        select: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      tableData: [
        {
          name: '许总',
          Tel: '15670520667',
          people: '565659',
          clientGrade: 'A级（较强)',
          callDate: '2018-04-26',
          callState: '已接通',
          stage: '线索',
          notes: '----',
          task: '房产',
          peopleFrom: '郭嘉',
          createDate: '2017-05-02'
        },
        {
          name: '许总',
          Tel: '15670520667',
          people: '565659',
          clientGrade: 'A级（较强)',
          callDate: '2018-04-26',
          callState: '已接通',
          stage: '线索',
          notes: '----',
          task: '房产',
          peopleFrom: '郭嘉',
          createDate: '2017-05-02'
        },
        {
          name: '许总',
          Tel: '15670520667',
          people: '565659',
          clientGrade: 'A级（较强)',
          callDate: '2018-04-26',
          callState: '已接通',
          stage: '线索',
          notes: '----',
          task: '房产',
          peopleFrom: '郭嘉',
          createDate: '2017-05-02'
        },
        {
          name: '许总',
          Tel: '15670520667',
          people: '565659',
          clientGrade: 'A级（较强)',
          callDate: '2018-04-26',
          callState: '已接通',
          stage: '线索',
          notes: '----',
          task: '房产',
          peopleFrom: '郭嘉',
          createDate: '2017-05-02'
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
    handleClose() {
      this.dialogVisible = false
      this.choose = false
      console.log('1212')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.choose = false
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {}
}
</script>

<style  rel='stylesheet/scss' lang='scss' scoped >
.client-manager {
  padding: 10px;
  .top {
    & /deep/ .el-input {
      width: 500px;
    }
    span {
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
  .table {
    margin-top: 20px;
    .mytable {
      border: 1px solid #e6e6e6;
      border-bottom: none;
    }
    .btn {
      margin-bottom: 20px;
      & /deep/ .el-input{
        width: 300px;
      }
    }
    .do {
      i {
        font-size: 20px;
        cursor: pointer;
        &:last-child {
          margin-left: 5px;
        }
      }
    }
    .page {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
