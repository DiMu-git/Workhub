<template>
  <div class="dashboard-editor-container">
    <div class="search_container">
      <el-form :model="searchParams" :inline="true" class="searchformContent"  size="small">
        <el-row>
          <el-form-item label="startDate" prop="startDate">
            <el-date-picker type="date" value-format="yyyy-MM-dd" style="width:210px" v-model="searchParams.startDate" placeholder="Please select startDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="startDate" prop="startDate">
            <el-date-picker type="date" value-format="yyyy-MM-dd" style="width:210px" v-model="searchParams.endDate" placeholder="Please select endDate"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">search</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <github-corner class="github-corner" />

    <panel-group :statistics="statistics" @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>


    <el-row :gutter="32">
      <!-- <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col> -->
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <!-- <bar-chart /> -->
          <pie-chart :pieData="pieData1" :pieLegendData="pieLegendData1" :pieName="'Number of reservations per venue'"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <!-- <bar-chart /> -->
          <pie-chart :pieData="pieData2" :pieLegendData="pieLegendData2" :pieName="'Revenue per venue'"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

import {getStatistics} from "api/workingShop";

export default {
  name: 'Dashboard',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis,
      lineChartData:{
        venueReserveNumber:[],
        venueRevenue:[],
        xAxisData:[],
      },
      pieData1:[],
      pieLegendData1:[],

      pieData2:[],
      pieLegendData2:[],


      searchParams:{
        startDate:"",
        endDate:"",
      },
      statistics:{},
    }
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    },
    getStatistics(){
      getStatistics(this.searchParams).then(res=>{
        this.statistics = res.data

        let count = res.data.line.count;
        let pay = res.data.line.pay;

        let venueReserveNumber = [];
        let venueRevenue = [];
        let xAxisData = [];

        count.forEach(item => {
          venueReserveNumber.push(item.total)
          xAxisData.push(item.time)
        });
        pay.forEach(item => {
          venueRevenue.push(item.total)
        });

        this.lineChartData.venueReserveNumber=venueReserveNumber;
        this.lineChartData.venueRevenue=venueRevenue;
        this.lineChartData.xAxisData=xAxisData;

        let pieData1=[];
        let pieData2=[];
        let pieLegendData1 = []
        let pieLegendData2 = []

        debugger
        let pieCount = res.data.pie.count;
        let piePay = res.data.pie.pay;
        pieCount.forEach(item => {
          let obj={
            value: item.total, name: item.venueName
          }
          pieData1.push(obj)
          pieLegendData1.push(item.venueName)
        });

        piePay.forEach(item => {
          let obj={
            value: item.total, name: item.venueName
          }
          pieData2.push(obj)
          pieLegendData2.push(item.venueName)
        });

        this.pieData1=pieData1
        this.pieLegendData1=pieLegendData1
        this.pieData2=pieData2
        this.pieLegendData2=pieLegendData2
        debugger
        console.log(res.data)
      })
    },
    search(){
      this.getStatistics()
    }
  },
  created(){
    this.getStatistics()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 0px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
