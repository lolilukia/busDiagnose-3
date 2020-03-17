<style>
  #diagnose_panel .el-input__inner{
    height: 20px;
    width: 125px;
    background-color: #102530 !important;
    border: 0;
    border-radius: 0 !important;
    color: #fff;
    font-size: 60%;
  }
  #diagnose_panel .el-range-input{
    height: 20px;
    width: 120px;
    background-color: #102530 !important;
    border: 0;
    border-radius: 0 !important;
    color: #fff;
    font-size: 60%;
  }
  #diagnose_panel .el-range-editor.el-input__inner{
    margin-top: 6px;
    padding: 0;
  }
  #diagnose_panel .el-range-editor .el-range-input {
    line-height: 30px;
    font-size: 60%;
  }
  #diagnose_panel .el-date-editor .el-range__icon {
    font-size: 14px;
    margin-left: 5px;
    color: #c0c4cc;
    float: left;
    line-height: 20px;
  }
  #diagnose_panel .el-date-editor .el-range-separator {
    padding: 0 5px;
    line-height: 20px;
    font-size: 60%;
    width: 5%;
    color: #eee;
  }
  #diagnose_panel .el-input__icon {
    line-height: 20px;
  }
  #diagnose_panel .el-table{
    border: none;
    background-color: #0d3e53;
  }
  #diagnose_panel .el-table td, .el-table th.is-leaf {
    border: none;
  }
  #diagnose_panel .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: transparent;
  }
  #diagnose_panel .header th{
    background: #0d3e53 !important;
    font-size: 10px;
    border: none;
    color: #fff;
    font-weight: 400;
    padding: 5px;
  }
  #diagnose_panel .subheader th{
    background-color: #0e5f7c !important;
    font-size: 8px;
    border: none;
    color: #fff;
    font-weight: 400;
    padding: 0 5px;
  }
  #diagnose_panel .el-table__row td{
    background-color: #0c485d !important;
    font-size: 8px;
    color: #fff;
    border: none;
    padding: 2px 5px;
    text-align: left;
  }
  #diagnose_panel .el-table__row--striped td{
    background-color: #0d3e53 !important;
  }
  #diagnose_panel .el-table .cell {
    white-space: nowrap;
  }
  #diagnose_panel .el-pagination{
    background-color: #094B65;
    text-align: left;
  }
  #diagnose_panel .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #08465C;
    width: 15px;
    color: #072f41;
  }
  #diagnose_panel .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #05465A;
    color: #fff;
  }
</style>
<template>
  <div id="diagnose_panel" class="diagnose_panel">
    <banner></banner>
    <navBar></navBar>
    <div id="container" class="container">
      <div class="panel">
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="search">
              <el-row>
                <el-col :span="3">
                  <div>
                    <span class="label">线路名称</span>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div>
                    <el-input @keyup.enter.native="Search" v-model="road_name" clearable></el-input>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div>
                    <span class="label">起终日期</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-date-picker
                      v-model="basis_date[0]"
                      type="date"
                      placeholder="开始日期"
                      :picker-options="pickerOptions0">
                    </el-date-picker>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div style="overflow: hidden;">
                    <el-date-picker
                      v-model="basis_date[1]"
                      type="date"
                      placeholder="结束日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="search">
              <el-col :span="4">
                <div v-on:click="Search" class="search_btn">搜索</div>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="search">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="content block">
              <el-row :gutter="10">
                <el-col :xs="13" :sm="13" :md="13" :lg="13" :xl="13">
                  <div class="subpanel">
                    <div class="form">
                      <div class="odd"><div class="left"><span class="label">速度</span></div><div class="right"><span class="label">{{line_speed}}</span></div></div>
                      <div class="even"><div class="left"><span class="label">准点率</span></div><div class="right"><span class="label">{{line_ontime}}</span></div></div>
                      <div class="odd"><div class="left"><span class="label">实际车公里</span></div><div class="right"><span class="label">{{line_distance}}</span></div></div>
                      <div class="even"><div class="left"><span class="label">百公里人次</span></div><div class="right"><span class="label">{{line_flow}}</span></div></div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                  <div id="line_rate" class="subpanel"></div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div id="man_time" class="content block"></div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div id="stop" class="content block">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div id="jam_index" class="content block">
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div id="speed" class="content block"></div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div id="distribution" class="content block">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="content block">
              <el-table
                :data="roadData"
                stripe
                style="width: 100%; height: 282px"
                :header-row-class-name="getHeader"
                @sort-change="sortIndexChange"
                empty-text="数据读取中">
                <el-table-column label="线路指标">
                  <el-table-column
                    prop="line"
                    label="线路"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="speed_diverge"
                    label="车速偏离比"
                    sortable="custom"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="speed_variation"
                    label="速度变异系数"
                    sortable="custom"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="robustness"
                    label="鲁棒性指标"
                    sortable="custom"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="ratio"
                    label="专用道比率"
                    width="150"
                    sortable="custom">
                  </el-table-column>
                  <el-table-column
                    prop="incontinuity"
                    label="专用道不连续指数"
                    width="160"
                    sortable="custom">
                  </el-table-column>
                  <el-table-column
                    prop="on_time"
                    label="准点率"
                    sortable="custom"
                    width="140">
                  </el-table-column>
                  <el-table-column
                    prop="man_time"
                    label="百公里人次"
                    sortable="custom">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                @current-change="roadIndexCurrentChange"
                :current-page="rIndex_start_index"
                :page-size="8"
                layout="prev, pager, next"
                :total="roadIndexDataRefer.length">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import options from '../options';
  import banner from '../../components/banner/banner.vue';
  import navBar from '../../components/navBar/navBar.vue';
  export default {
    name: "diagnose",
    components: {
      navBar: navBar,
      banner: banner
    },
    data(){
      let that = this;
      return{
        road_name: '27路',
        basis_date: [new Date(2017, 0, 1), new Date(2017, 10, 11)],
        line_speed: 15 + 'km/h',
        line_ontime: 95 + '%',
        line_execution: 94 + '%',
        line_distance: 377,
        line_flow: 2863,
        roadData: [],
        rChart: null,
        line_resilience_options: options.line_resilience_options,
        mChart: null,
        flow_options: options.flow_options,
        spChart: null,
        road_speed_options: options.road_speed_options,
        lChart: null,
        line_health_options: options.line_health_options,
        rIndex_start_index: 0,
        roadIndexDataRefer: [],
        tdChart: null,
        time_distribution_options: options.time_distribution_options,
        jChart: null,
        jam_index_options: options.jam_index_options,
        pickerOptions0: {
          disabledDate(time){
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        pickerOptions: {
          disabledDate(time){
            return ((time.getTime() > Date.now() - 8.64e7) || (time.getTime() < new Date(that.basis_date[0]).getTime()));
          }
        },
      };
    },
    mounted(){
      var height = window.getComputedStyle(document.getElementById("container")).getPropertyValue('height');
      document.getElementById("nav_bar").style.height = height;
      this.drawChart();
      this.Search();
    },
    methods:{
      getHeader({ row, rowIndex }) {
        if (rowIndex == 0) {
          return 'header'
        }
        else {
          return 'subheader'
        }
      },
      sortIndexChange: function(column, prop, order){
        var that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.roadIndexDataRefer.sort(up);
          that.roadData = that.roadIndexDataRefer.slice(0, 8);
        }
        else{
          that.roadIndexDataRefer.sort(down);
          that.roadData = that.roadIndexDataRefer.slice(0, 8);
        }
      },
      roadIndexCurrentChange:function(val){
        this.rIndex_start_index = val;
        this.roadData = this.roadIndexDataRefer.slice((this.rIndex_start_index-1)*8, this.rIndex_start_index*8);
      },
      Search(){
        var that = this;
        if(this.road_name.indexOf('路') == -1){
          this.road_name += '路';
        }
        var start_date = that.basis_date[0].getFullYear() + '-' +
          (that.basis_date[0].getMonth() + 1) + '-' + that.basis_date[0].getDate();
        var end_date = that.basis_date[1].getFullYear() + '-' +
          (that.basis_date[1].getMonth() + 1) + '-' + that.basis_date[1].getDate();
        this.$http.get('http://118.25.99.80:9001/diagnose/buslines?start_date=' + start_date + '&end_date=' + end_date).then(function(ret){
          that.roadIndexDataRefer = ret.data;
          that.roadData = that.roadIndexDataRefer.slice(0, 8);
          for(var i = 0; i < that.roadIndexDataRefer.length; i++){
            if(that.road_name == that.roadIndexDataRefer[i].line){
              that.line_speed = that.roadIndexDataRefer[i].speed.substring(0, 5) + 'km/h';
              that.line_ontime = parseFloat(that.roadIndexDataRefer[i].on_time) + '%';
              that.line_execution = parseFloat(that.roadIndexDataRefer[i].execution) + '%';
              that.line_distance = that.roadIndexDataRefer[i].actual_miles;
              that.line_flow = that.roadIndexDataRefer[i].man_time;
              that.line_health_options.series[0].data[0].value = parseFloat((that.roadIndexDataRefer[i].health_index + '').substring(0, 5));
              that.lChart.setOption(that.line_health_options);
            }
          }
        });
        this.$http.get('http://118.25.99.80:9001/diagnose/info?busLine=' + that.road_name + '&start_date=' + start_date + '&end_date=' + end_date).then(function(ret){
          that.line_resilience_options.xAxis[0].data = ret.data[0].resilience.interval;
          that.line_resilience_options.series[0].data = ret.data[0].resilience.value;
          that.rChart.setOption(that.line_resilience_options);
          that.flow_options.xAxis[0].data = ret.data[0].stops;
          that.flow_options.series[0].data = ret.data[0].in_flow;
          var out_flow = ret.data[0].out_flow;
          for(var j = 0; j < out_flow.length; j++){
            out_flow[j] = (-1) * out_flow[j];
          }
          that.flow_options.series[1].data = out_flow;
          that.mChart.setOption(that.flow_options);
          var data0 = [];
          var data2 = [];
          for (var i = 1; i < 6400; i++) {
            data0.push(Math.round((Math.random() - 0.5) * 200 + Math.random() * 40 + 60));
            data2.push(-1 * Math.round((Math.random() - 0.5) * 200 + Math.random() * 40 + 60))
          }
          that.time_distribution_options.series[0].data = data0;
          that.time_distribution_options.series[1].data = data2;
          that.tdChart.setOption(that.time_distribution_options);
          that.road_speed_options.series[0].data = ret.data[0].speed.slice(6, 22);
          that.spChart.setOption(that.road_speed_options);
          that.jam_index_options.xAxis[0].data = ret.data[0].jam_index.gap;
          that.jam_index_options.series[0].data = ret.data[0].jam_index.today;
          that.jam_index_options.series[1].data = ret.data[0].jam_index.last_week;
          that.jChart.setOption(that.jam_index_options);
        });
      },
      drawChart(){
        let stopChart = document.getElementById('stop');
        this.rChart = this.$echarts.init(stopChart);
        this.rChart.setOption(this.line_resilience_options);
        let manChart = document.getElementById('man_time');
        this.mChart = this.$echarts.init(manChart);
        this.mChart.setOption(this.flow_options);
        let jamChart = document.getElementById('jam_index');
        this.jChart = this.$echarts.init(jamChart);
        this.jChart.setOption(this.jam_index_options);
        let speedChart = document.getElementById('speed');
        this.spChart = this.$echarts.init(speedChart);
        this.spChart.setOption(this.road_speed_options);
        let lineChart = document.getElementById('line_rate');
        this.lChart = this.$echarts.init(lineChart);
        this.lChart.setOption(this.line_health_options);
        let timeChart = document.getElementById('distribution');
        this.tdChart = this.$echarts.init(timeChart);
        var date = [];
        var data0 = [];
        var data2 = [];
        for (var i = 1; i < 6400; i++) {
          date.push((parseInt(i/400) + 6) + ':00');
          data0.push(Math.round((Math.random() - 0.5) * 200 + Math.random() * 40 + 60));
          data2.push(-1 * Math.round((Math.random() - 0.5) * 200 + Math.random() * 40 + 60))
        }
        this.time_distribution_options.xAxis.data = date;
        this.time_distribution_options.series[0].data = data0;
        this.time_distribution_options.series[1].data = data2;
        this.time_distribution_options.series[0].areaStyle.normal.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#FABC1E'
        }, {
          offset: 1,
          color: '#FA4400'
        }]);
        this.time_distribution_options.series[1].areaStyle.normal.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#FA4400'
        }, {
          offset: 1,
          color: '#E96C1D'
        }]);
        this.tdChart.setOption(this.time_distribution_options);
      }
    }
  }
</script>

<style scoped>
  body{
    background-color: #19232C;
  }
  .el-row {
    margin-bottom: 10px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .diagnose_panel{
    position: relative;
  }
  .container{
    width: 90%;
    float: right;
  }
  .panel{
    background: #133B50;
    padding: 20px;
  }
  .content {
    min-height: 226px;
  }
  .block{
    background-color: #0f2a37;
    padding: 15px 20px;
  }
  .search{
    min-height: 26px;
    width: 100%;
    line-height: 30px;
  }
  .label{
    color: #fff;
    font-size: 80%;
  }
  .subpanel{
    min-height: 160px;
    margin-top: 30px;
  }
  .el-dropdown{
    float: left;
    border: 1px solid #203B66;
    background-color: #152534;
    padding: 3px;
    width: 60%;
  }
  .el-dropdown-link{
    float: left;
    width: 100%;
  }
  .icon{
    float: right;
    margin: 2px;
    color: #7199c4;
  }
  .form{
    width: 160px;
    height: 120px;
  }
  .odd, .even{
    width: 100%;
    padding: 3px;
  }
  .odd{
    background-color: #083f52;
  }
  .even{
    background-color: #0c3649;
  }
  .left{
    display: inline-block;
    width: 50%;
    text-align: left;
  }
  .right{
    display: inline-block;
    width: 30%;
    text-align: right;
  }
  .search_btn{
    margin-top: 5px;
    height: 26px;
    background-color: #102530;
    line-height: 26px;
    color: #fff;
    font-size: 60%;
    cursor: pointer;
  }
</style>
