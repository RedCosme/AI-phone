/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-05-18 14:03:10 
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-05-18 17:59:47
 */
<template>
  <div class="count">
    <div class="header">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker v-model="date" type="date" placeholder="起始日期"></el-date-picker>
      <el-date-picker v-model="date2" type="date" placeholder="结束日期"></el-date-picker>
    </div>
    <div class="radio">
      <a :class="{active:radio=='1'}" @click="radioTab('1')">通话数量</a>
      <a :class="{active:radio=='2'}" @click="radioTab('2')">通话比例</a>
      <a :class="{active:radio=='3'}" @click="radioTab('3')">通话总时长</a>
    </div>
    <div id="myChart"></div>
    <div class="header">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker v-model="date" type="date" placeholder="起始日期"></el-date-picker>
      <el-date-picker v-model="date2" type="date" placeholder="结束日期"></el-date-picker>
    </div>
    <div class="count-table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" align="center">
        </el-table-column>
        <el-table-column prop="callOut" label="外呼量">
        </el-table-column>
        <el-table-column prop="callIn" label="接听量">
        </el-table-column>
        <el-table-column prop="callPercent" label="接通率">
        </el-table-column>
        <el-table-column prop="callTime" label="外呼通话总时长">
        </el-table-column>
        <el-table-column prop="callAverage" label="外呼通话平均时长">
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
import echarts from 'echarts'
export default {
  name: 'count',
  data() {
    return {
      value: '',
      date: '',
      date2: '',
      radio: '1',
      chart: null,
      currentPage: 4,
      show: {
        x: [
          '11', '12', '13', '14', '15', '16', '17', '11', '12', '13', '14', '15', '16', '17'
        ],
        y: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
      },
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
          label: '北京烤鸭'
        }
      ],
      tableData: [
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        },
        {
          date: '2016-05-03',
          callOut: '2mins',
          callIn: '2mins',
          callPercent: '2mins',
          callTime: '2mins',
          callAverage: '2mins'
        }
      ]
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('myChart'))
      this.chart.clear()
      // 绘制图表
      this.chart.setOption({
        legend: {
          data: ['外呼量', '接听量']
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '13%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.show.x,
          splitNumber: 20,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '外呼量',
            type: 'line',
            stack: '总量',
            data: this.show.y,
            lineStyle: {
              normal: {
                width: 3,
                color: '#409EFF'
              }
            }
          },
          {
            name: '接听量',
            type: 'line',
            stack: '总量',
            data: [
              220,
              182,
              191,
              234,
              290,
              330,
              310,
              120,
              132,
              101,
              134,
              90,
              230,
              210
            ],
            lineStyle: {
              normal: {
                width: 3,
                color: '#64d9d6'
              }
            }
          }
        ]
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    radioTab(val) {
      this.radio = val
      this.drawLine()
    }
  },
  mounted() {
    this.drawLine()
  }
}
</script>

<style  rel='stylesheet/scss' lang='scss' scoped >
.count {
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  .header {
    margin-bottom: 15px;
    &:last-of-type {
      margin-top: 20px;
    }
  }
  .radio {
    border-bottom: 1px solid #ddd;
    a {
      display: inline-block;
      width: 120px;
      height: 32px;
      line-height: 34px;
      text-align: center;
      font-size: 13px;
      background-color: #e4e4e4;
      color: #868686;
      border-right: 1px solid #fff;
      margin-right: -5px;
    }
    .active {
      background-color: #409eff;
      color: #fff;
    }
  }
  #myChart {
    width: 100%;
    height: 360px;
    margin-top: 20px;
  }
  .count-table {
    border-radius: 5px 5px 0 0;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    & /deep/ .el-table__header {
      border-radius: 5px 5px 0 0;
      overflow: hidden;
    }
    & /deep/ .el-table th,
    .el-table tr {
      background-color: #d7d7d7;
    }
  }
  .page {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
