<style>
  #scan_panel .el-menu--collapse{
    width: 150px;
  }
  #scan_panel .el-table{
    border: none;
    background-color: #0d3e53;
  }
  #scan_panel .el-table td, .el-table th.is-leaf {
    border: none;
  }
  #scan_panel .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: transparent;
  }
  #scan_panel .el-table__row td{
    background-color: #0c485d !important;
    font-size: 6px;
    color: #fff;
    border: none;
    padding: 2px 5px;
    text-align: left;
  }
  #scan_panel .el-table__row--striped td{
    background-color: #0d3e53 !important;
  }
  #scan_panel .el-table .cell {
    white-space: nowrap;
  }
  #scan_panel .el-pagination{
    background-color: #094B65;
    text-align: left;
  }
  #scan_panel .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color: #08465C;
    width: 15px;
    color: #072f41;
  }
  #scan_panel .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #05465A;
    color: #fff;
  }
  #scan_panel .header th{
    background: #0d3e53 !important;
    font-size: 8px;
    border: none;
    color: #fff;
    font-weight: 400;
    padding: 5px;
  }
  #scan_panel .subheader th{
    background-color: #0e5f7c !important;
    font-size: 8px;
    border: none;
    color: #fff;
    font-weight: 400;
    padding: 0 5px;
  }
  #scan_panel .el-pager li{
    background-color: #0A455A;
  }
  #scan_panel .el-pager li.active{
    color: #fff;
  }
  #scan_panel .el-pagination button:disabled {
    background-color: #0A455A;
    cursor: not-allowed;
  }
  #scan_panel .el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li.btn-quicknext, .el-pagination--small .el-pager li.btn-quickprev, .el-pagination--small .el-pager li:last-child {
    background-color: #0A455A;
  }
  #scan_panel .el-tag {
    padding: 0 2px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
    border-radius: 0;
  }
  #scan_panel .el-tag--info {
    background-color: #082b3e;
    border-color: #082b3e;
  }
  #scan_panel .el-tag--success {
    background-color: #027BAB;
    border-color: #027BAB;
  }
  #scan_panel .el-tag--danger {
    background-color: #BA2510;
    border-color: #BA2510;
  }
  #scan_panel .el-input__inner{
    height: 20px;
    width: 100%;
    margin-top: 8px;
    background-color: #152534 !important;
    border: 0;
    border-radius: 0 !important;
    color: #fff;
    font-size: 60%;
  }
  #scan_panel .amap-container {
    cursor: default !important;
  }
  #scan_panel .amap-labels{
    cursor: default !important;
  }
  #scan_panel .el-message{
    top: 70px;
  }
  #scan_panel #line_search .el-input__inner{
    background-color: rgba(30, 69, 82, 0.5) !important;
    border: solid transparent 1px;
    border-radius: 10px !important;
    color: #fff;
    text-align: center;
    padding: 0;
    height: 40px;
  }
</style>
<template>
  <div id="scan_panel" class="scan_panel">
    <banner></banner>
    <nav-bar></nav-bar>
    <div class="slide_button" @click="changeCollapse"><i class="el-icon-menu"></i></div>
    <div id="slide_bar" class="slide_bar" v-show="!isCollapse">
      <el-menu default-active="1" class="el-menu-vertical-demo"
               background-color="#16191B" text-color="white">
        <el-menu-item index="1" v-on:click="chooseItem(0)">
          <span slot="title" :class="{'white_font' : !net, 'blue_font' : net}">加载路网图层</span>
          <img class="bar_icon" :src="net ? bar_net_sel : bar_net">
        </el-menu-item>
        <el-menu-item index="2" v-on:click="chooseItem(1)">
          <span slot="title" :class="{'white_font' : !line, 'blue_font' : line}">加载线路图层</span>
          <img class="bar_icon" :src="line ? bar_map_sel : bar_map">
        </el-menu-item>
        <el-menu-item index="3" v-on:click="chooseItem(2)">
          <span slot="title" :class="{'white_font' : !station, 'blue_font' : station}">加载站点图层</span>
          <img class="bar_icon" :src="station ? bar_station_sel : bar_station">
        </el-menu-item>
        <el-menu-item index="4" v-on:click="chooseItem(3)">
          <span slot="title" :class="{'white_font' : !state, 'blue_font' : state}">加载路况图层</span>
          <img class="bar_icon" :src="state ? bar_state_sel : bar_state">
        </el-menu-item>
        <el-menu-item index="5" v-on:click="chooseItem(4)">
          <span slot="title" :class="{'white_font' : !bus, 'blue_font' : bus}">加载车辆图层</span>
          <img class="bar_icon" :src="bus ? bar_bus_sel : bar_bus">
        </el-menu-item>
        <el-menu-item index="10" v-on:click="chooseItem(9)">
          <span slot="title" :class="{'white_font' : !flow_layer_v, 'blue_font' : flow_layer_v}">加载客流图层</span>
          <img class="bar_icon" :src="flow_layer_v ? flow_layer_sel : flow_layer">
        </el-menu-item>
        <el-menu-item index="6" v-on:click="chooseItem(5)">
          <span slot="title" :class="{'white_font' : !clock, 'blue_font' : clock}">线路准点率</span>
          <img class="bar_icon" :src="clock ? bar_clock_sel : bar_clock">
        </el-menu-item>
        <el-menu-item index="7" v-on:click="chooseItem(6)">
          <span slot="title" :class="{'white_font' : !flow, 'blue_font' : flow}">站点客流负荷</span>
          <img class="bar_icon" :src="flow ? bar_flow_sel : bar_flow">
        </el-menu-item>
        <el-menu-item index="8" v-on:click="chooseItem(7)">
          <span slot="title" :class="{'white_font' : !dash, 'blue_font' : dash}">车辆速度监控</span>
          <img class="bar_icon" :src="dash ? bar_dash_sel : bar_dash">
        </el-menu-item>
        <el-menu-item index="9" v-on:click="chooseItem(8)">
          <span slot="title" :class="{'white_font' : !abstract, 'blue_font' : abstract}">线路抽象图</span>
          <img class="bar_icon" :src="abstract ? bar_abstract_sel : bar_abstract">
        </el-menu-item>
      </el-menu>
    </div>
    <div id="container">
      <div id="line_search" v-show="line" class="line_search" @mousedown="move('line_search')" @command="submitSearch">
        <el-select v-model="road_name" clearable filterable placeholder="线路选择">
          <el-option
            v-for="item in lines"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-button class="search_line_btn" @click="searchBusLine">搜索</el-button>
      </div>
      <div id="flow_layer" v-show="flow_layer_v"></div>
      <div id="theme" class="theme_contain" @mousedown="move('theme')">
        <div class="theme_group">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="theme_btn" @click="selectTheme(0)">
                <img src="../../assets/black.png"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="theme_btn" @click="selectTheme(1)">
                <img src="../../assets/blue.png"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="theme_btn" @click="selectTheme(2)">
                <img src="../../assets/white.png"/>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div id="line" class="road_table" v-show="clock" @mousedown="move('line')">
        <div class="data_filter">
          <el-popover
            placement="bottom"
            width="30"
            trigger="click">
            <p class="filter_title">线路名称</p>
            <input @keyup.enter="searchBusLine" v-model="road_name" class="filter_input">
            <span class="confirm" v-on:click="searchBusLine">确定</span>
            <span class="clear" v-on:click="clearLineInput">重置</span>
            <el-button slot="reference" class="filter_button">aaa</el-button>
          </el-popover>
        </div>
        <el-table
          :data="roadData"
          stripe
          style="width: 260px; height: 172px"
          :header-row-class-name="getHeader"
          @header-click="searchLine"
          @sort-change="sortRoadChange"
          empty-text="数据读取中">
          <el-table-column
            prop="name"
            label="线路名称"
            width="80">
          </el-table-column>
          <el-table-column
            prop="direction"
            label="方向"
            width="70">
          </el-table-column>
          <el-table-column
            prop="on_time"
            label="准点率"
            sortable="custom">
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="roadCurrentChange"
          :current-page="road_start_index"
          :page-size="5"
          layout="prev, pager, next"
          :total="roadDataRefer.length">
        </el-pagination>
      </div>
      <div id="bus" class="vehicle_table" v-show="dash" @mousedown="move('bus')">
        <div class="data_filter">
          <el-popover
            placement="bottom"
            width="30"
            trigger="click">
            <p class="filter_title">车牌号</p>
            <input @keyup.enter="searchVehicle" v-model="vehicle_num" class="filter_input">
            <span class="confirm" v-on:click="searchVehicle">确定</span>
            <span class="clear" v-on:click="clearVehicleInput">重置</span>
            <el-button slot="reference" class="filter_button">aaa</el-button>
          </el-popover>
        </div>
        <el-table
          :data="vehicleData"
          stripe
          style="width: 414px; height: 174px"
          :header-row-class-name="getHeader"
          @sort-change="sortVehicleChange"
          empty-text="数据读取中">
          <el-table-column
            prop="license_num"
            label="车牌号"
            width="70"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="line_name"
            label="所在线路"
            width="80">
          </el-table-column>
          <el-table-column
            prop="speed_range"
            label="合理速度区间"
            width="102">
          </el-table-column>
          <el-table-column
            prop="current_speed"
            label="当前速度"
            width="102"
            sortable="custom">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="60">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status == '正常' ? 'info' : scope.row.status == '异常低速' ? 'success' : 'danger'"
                disable-transitions>{{scope.row.status == '正常' ? scope.row.status : scope.row.status.substring(2, 4)}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="vehicleCurrentChange"
          :current-page="vehicle_start_index"
          :page-size="5"
          layout="prev, pager, next"
          :total="84">
        </el-pagination>
      </div>
      <div id="flow" class="result_table" v-show="flow" @mousedown="move('flow')">
        <div class="data_filter">
          <el-popover
            placement="bottom"
            width="30"
            trigger="click">
            <p class="filter_title">站点名称</p>
            <input @keyup.enter="searchResult" v-model="station_name" class="filter_input">
            <span class="confirm" v-on:click="searchResult">确定</span>
            <span class="clear" v-on:click="clearStationInput">重置</span>
            <el-button slot="reference" class="filter_button">aaa</el-button>
          </el-popover>
        </div>
        <el-table
          :data="resultData"
          stripe
          style="width: 260px; height: 168px"
          :header-row-class-name="getHeader"
          empty-text="数据读取中">
          <el-table-column
            prop="station_name"
            label="站点名称"
            width="160"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="flow"
            label="客流负荷"
            width="100">
          </el-table-column>
        </el-table>
        <el-pagination
          small
          @current-change="resultCurrentChange"
          :current-page="result_start_index"
          :page-size="10"
          layout="prev, pager, next"
          :total="resultDataRefer.length">
        </el-pagination>
      </div>
      <div class="stops" id="stops" v-show="abstract" @mousedown="move('stops')">
        <div v-bind:class="{'direction up dir_active': upClick, 'direction up dir_inactive': !upClick}" v-on:click="clickUp">上行</div>
        <div v-bind:class="{'direction down dir_active': !upClick, 'direction down dir_inactive': upClick}" v-on:click="clickDown">下行</div>
        <div class="stations start" id="start_station"></div>
        <div class="stations end" id="end_station"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import banner from '../../components/banner/banner.vue';
  import navBar from '../../components/navBar/navBar.vue';
  import options from '../options';
  import utils from '../utils';
  export default {
    name: "common",
    components: {
      navBar: navBar,
      banner: banner
    },
    data() {
      return {
        isCollapse: true,
        map: null,
        button_index: 0,
        pre_index: 0,
        net: false,
        line: true,
        station: true,
        state: false,
        bus: false,
        clock: true,
        flow: false,
        dash: true,
        abstract: false,
        flow_layer_v: false,
        bar_net: 'static/icon/bar_roadnet.png',
        bar_map: 'static/icon/bar_map.png',
        bar_station: 'static/icon/bar_station.png',
        bar_state: 'static/icon/bar_state.png',
        bar_bus: 'static/icon/bar_bus.png',
        bar_clock: 'static/icon/bar_clock.png',
        bar_flow: 'static/icon/bar_flow.png',
        bar_dash: 'static/icon/bar_dash.png',
        bar_abstract: 'static/icon/bar_abstract.png',
        bar_net_sel: 'static/icon/bar_net_sel.png',
        bar_map_sel: 'static/icon/bar_map_sel.png',
        bar_station_sel: 'static/icon/bar_station_sel.png',
        bar_state_sel: 'static/icon/bar_state_sel.png',
        bar_bus_sel: 'static/icon/bar_bus_sel.png',
        bar_clock_sel: 'static/icon/bar_clock_sel.png',
        bar_flow_sel: 'static/icon/bar_flow_sel.png',
        bar_dash_sel: 'static/icon/bar_dash_sel.png',
        bar_abstract_sel: 'static/icon/bar_abstract_sel.png',
        flow_layer: 'static/icon/flow_layer.png',
        flow_layer_sel: 'static/icon/flow_layer_sel.png',
        trafficLayer: null,
        lineArray: [],
        markArray: [],
        stationArray: [],
        vehicleArray: [],
        datetime: '2017/5/21',
        roadDataRefer: [],
        roadData: [],
        vehicleDataRefer: [],
        vehicleData: [],
        resultDataRefer: [],
        resultData: [],
        road_start_index: 0,
        vehicle_start_index: 0,
        result_start_index: 0,
        upClick: true,
        via_stops: [],
        current_line: 0,
        line_colors: ['#CCCCFF','#FFFF00','#FF99FF','#3399FF','#33FF00','#663399','#663300','#FF3366',
          '#990033','#6699CC','#FF6600','#003333','#999900','#999999','#FFCCCC'],
        station_cluster: null,
        vehicle_cluster: null,
        filter: false,
        road_name: '',
        station_name: '',
        vehicle_license: '',
        pre_line: null,
        line_option: [],
        vehicle_num: '',
        message : ['547路浙B33152当前速度68km/h，异常高速', '37路浙B53338当前速度64km/h，异常高速', '857路浙B53689当前速度8km/h，异常低速',
          '801路浙B30039当前速度5km/h，异常低速', '541路浙B30815当前速度2km/h，异常低速', '341路浙B52928当前速度4km/h，异常低速',
          '82路浙B53369大间隔预警，计划运行5分，实际运行25分', '857路浙B53689发生串车'],
        type : [0, 0, 0, 0, 0, 0, 1, 2],
        isDestroyed: false,
        messageInterval: null,
        intervals: [],
        mapTimer: null,
        dateTime: null,
        road_net: null,
        operation: [],
        tLeft: [0, 0, 0, 0],
        tTop: [0, 0, 0, 0],
        dragging: [false, false, false, false],
        ids: ['line', 'bus', 'flow', 'stops'],
        passenger_options: options.passenger_flow_options,
        fChart: null,
        locations: utils.total_stations.slice(0, 100),
        names: utils.total_names.slice(0, 100),
        lines: utils.total_lines.slice(0, 100)
      };
    },
    beforeDestroy(){
      this.isDestroyed = true;
      clearInterval(this.mapTimer);
      clearInterval(this.messageInterval);
      for(let each in this.intervals){
        clearTimeout(each);
      }
    },
    mounted(){
      let that = this;
      //this.messageInterval = setInterval(this.showMessage, 30000);
      let height = window.screen.availHeight - 46;
      that.map = new AMap.Map('container',{
        center: [120.62, 31.32],
        zoom: 13
      });
      /*that.map.on('click', function(ev) {
        let lnglat = ev.lnglat;
        // 触发事件的像素坐标，AMap.Pixel 类型
        console.log(lnglat);
      });*/
      that.map.setMapStyle('amap://styles/dark');
      document.getElementById("container").style.height = height + 'px';
      let height_c = window.getComputedStyle(document.getElementById("container")).getPropertyValue('height');
      document.getElementById("nav_bar").style.height = height_c;
      document.getElementById("slide_bar").style.height = height_c;
      document.getElementById("flow_layer").style.height = height_c;
      that.dateTime = 1452046547;
      that.lineMapData();
      if(that.line){
          that.lineSearch();
      }
      if(that.station){
          that.stationSearch();
      }
      /*that.mapTimer = setInterval(function(){
        that.dateTime += 60;
        that.clearAll();
        that.lineMapData();
        for(let i = 0; i < that.operation.length; i++){
          that.judgeItem(that.operation[i]);
        }
      }, 60000);*/
    },
    methods: {
      submitSearch(command) {
        let that = this;
        that.road_name = command;
        that.searchBusLine();
      },
      selectTheme(index){
        if(index == 0){
            this.map.setMapStyle('amap://styles/dark');
        }
        else if(index == 1){
            this.map.setMapStyle('amap://styles/blue');
        }
        else if(index == 2){
            this.map.setMapStyle('amap://styles/light');
        }
      },
      lineMapData(){
        let that = this;
        that.$http.get('http://118.25.99.80:9001/api/buslines/info?date_time=' + that.dateTime).then(function(ret){
          that.roadDataRefer = ret.data;
          that.roadData = ret.data.slice(0, 5);
          that.showStations(that.roadData[0].name, 0);
        });
        that.$http.get('http://118.25.99.80:9001/api/stations/info?date_time=' + that.dateTime).then(function(ret){
          that.resultDataRefer = ret.data;
          that.resultData = ret.data.slice(0, 5);
        });
        that.$http.get('http://118.25.99.80:9001/api/vehicles/info?date_time=' + that.dateTime).then(function(ret){
          that.vehicleDataRefer = ret.data;
          that.vehicleData = ret.data.slice(0, 5);
        });
      },
      judgeItem(index){
        switch(index){
          case 0: {
            if(this.net){
              this.showNet();
            }
            break;
          }
          case 1: {
            if(this.line){
              this.lineSearch();
              if(this.abstract){
                this.showStations(this.roadData[0].name, 0);
              }
            }
            break;
          }
          case 2: {
            if(this.station || this.flow_layer_v){
              this.stationSearch();
            }
            break;
          }
          case 3: {
            if(this.state){
              this.roadStatus();
            }
            break;
          }
          case 4: {
            if(this.bus){
              this.vehicleSearch();
            }
            break;
          }
          default: break;
        }
      },
      chooseItem(index){
        switch(index){
          case 0: {
            this.net = !this.net;
            if(this.net){
              this.showNet();
              this.operation.push(0);
            }else{
              this.road_net.hide();
              let i = this.operation.indexOf(0);
              this.operation.splice(i,1);
            }
            break;
          }
          case 1: {
            this.line = !this.line;
            if(this.line){
              this.lineSearch();
              this.operation.push(1);
              if(this.abstract){
                this.showStations(this.roadData[0].name, 0);
              }
            }else{
              this.removeLine();
              let i = this.operation.indexOf(1);
              this.operation.splice(i,1);
            }
            break;
          }
          case 2: {
            this.station = !this.station;
            if(this.station){
              this.stationSearch();
              this.operation.push(2);
            }else{
              this.removeStation();
              let i = this.operation.indexOf(2);
              this.operation.splice(i,1);
            }
            break;
          }
          case 3: {
            this.state = !this.state;
            if(this.state){
              this.roadStatus();
              this.operation.push(3);
            }else{
              this.removeTraffic();
              let i = this.operation.indexOf(3);
              this.operation.splice(i,1);
            }
            break;
          }
          case 4: {
            this.bus = !this.bus;
            if(this.bus){
              this.vehicleSearch();
              this.operation.push(4);
            }else{
              this.removeVehicle();
              let i = this.operation.indexOf(4);
              this.operation.splice(i,1);
            }
            break;
          }
          case 5: {
            this.clock = !this.clock;
            break;
          }
          case 6: {
            this.flow = !this.flow;
            break;
          }
          case 7: {
            this.dash = !this.dash;
            break;
          }
          case 8: {
            this.abstract = !this.abstract;
            break;
          }
          case 9: {
            this.flow_layer_v = !this.flow_layer_v;
            this.showFlowLayer();
            break;
          }
          default: break;
        }
      },
      showNet(){
        let that = this;
        if(that.road_net == null){
          that.road_net = new AMap.TileLayer.RoadNet();
          that.road_net.setMap(that.map);
        }
        else{
          that.road_net.show();
        }
      },
      changeCollapse(){
        let that = this;
        let element = document.getElementById('slide_bar');
        if(that.isCollapse){
          element.setAttribute("class", "slide_bar animated fadeInRight");
          that.isCollapse = !that.isCollapse;
        }
        else{
          element.setAttribute("class", "slide_bar animated fadeOutRight");
          setTimeout(function(){
            that.isCollapse = !that.isCollapse;
          },2000);
        }
      },
      move(id){
        let that = this;
        let odiv = event.target;
        let goal = document.getElementById(id);
        if(goal.contains(odiv)){
          let index = that.ids.indexOf(id);
          that.dragging[index] = true;
          that.tLeft[index] = event.clientX - goal.offsetLeft;
          that.tTop[index] = event.clientY - goal.offsetTop;
          document.onmousemove = (event)=> {
            let left = event.clientX - that.tLeft[index];
            let top = event.clientY - that.tTop[index];
            goal.style.left = left + 'px';
            goal.style.top = top + 'px';
          };
          document.onmouseup = (event) => {
            that.dragging[index] = false;
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }
      },
      showMessage(){
        let that = this;
        let f = function(i){
          let inter = setTimeout(function(){
            if (that.type[i] == 0) {
              that.showNormal(that.message[i]);
            }
            else if (that.type[i] == 1) {
              that.showWarning(that.message[i]);
            }
            else{
              that.showError(that.message[i]);
            }
          }, 5000*i);
          that.intervals.push(inter);
        };
        if(this.isDestroyed != true){
          for (let i = 0; i < that.message.length; i++) {
            f(i);
          }
        }
        Message.closeAll();
      },
      showNormal(mes){
        Message({message: mes, duration: 3000});
      },
      showWarning(mes){
        Message({
          message: mes,
          type: 'warning'
        });
      },
      showError(mes){
        Message.error(mes);
      },
      getHeader({ row, rowIndex }) {
        if (rowIndex == 0) {
          return 'header'
        }
        else {
          return 'subheader'
        }
      },
      sortRoadChange: function(column, prop, order){
        let that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.roadDataRefer.sort(up);
          that.roadData = that.roadDataRefer.slice(0, 5);
        }
        else{
          that.roadDataRefer.sort(down);
          that.roadData = that.roadDataRefer.slice(0, 5);
        }
      },
      sortVehicleChange: function(column, prop, order){
        let that = this;
        function down(x, y){
          return (x[column.prop] < y[column.prop]) ? 1 : -1;
        }
        function up(x, y){
          return (x[column.prop] > y[column.prop]) ? 1 : -1;
        }
        if(column.order == 'ascending'){
          that.vehicleDataRefer.sort(up);
          that.vehicleData = that.vehicleDataRefer.slice(0, 5);
        }
        else{
          that.vehicleDataRefer.sort(down);
          that.vehicleData = that.vehicleDataRefer.slice(0, 5);
        }
      },
      searchLine(column, event){
        if(column.label == '线路名称'){
          this.filter = true;
        }
      },
      searchVehicle(){
        let that = this;
        that.filter = false;
        that.clearAll();
        if(that.vehicle_num == ''){
            that.lineMapData();
            if(that.line){
                that.lineSearch();
            }
            if(that.station){
                that.stationSearch();
            }
            if(that.bus){
                that.vehicleSearch();
            }
        }
        else{
          this.$http.get('http://118.25.99.80:9001/api/vehicle/buslines?license_num='+ that.vehicle_num + '&date_time=' + that.dateTime).then(function(ret){
              that.roadDataRefer = ret.data;
              that.roadData = ret.data.slice(0, 5);
              if(that.line){
                  that.lineSearch();
              }
              that.showStations(that.roadDataRefer[0].name, that.upClick ? 0:1);
          });
          that.$http.get('http://118.25.99.80:9001/api/vehicle/stations?license_num='+ that.vehicle_num + '&date_time=' + that.dateTime).then(function(ret){
              that.resultDataRefer = ret.data;
              that.resultData = ret.data.slice(0, 5);
              if(that.station){
                  that.stationSearch();
              }
          });
          if(that.state){
              that.roadStatus();
          }
          that.$http.get('http://118.25.99.80:9001/api/vehicle/vehicles?license_num='+ that.vehicle_num + '&date_time=' + that.dateTime).then(function(ret){
              that.vehicleDataRefer = ret.data;
              that.vehicleData = ret.data.slice(0, 5);
              if(that.bus){
                  that.vehicleSearch();
              }
          });
        }
      },
      searchBusLine(){
        let that = this;
        that.filter = false;
        that.clearAll();
        if(that.road_name == ''){
          that.lineMapData();
          if(that.line){
              that.lineSearch();
          }
          if(that.station){
              that.stationSearch();
          }
          if(that.bus){
              that.vehicleSearch();
          }
        }
        else{
          this.$http.get('http://118.25.99.80:9001/api/busline/punctuality_info?line_name='+ that.road_name + '&date_time=' + that.dateTime).then(function(ret){
              that.roadDataRefer = ret.data;
              that.roadData = ret.data.slice(0, 5);
              if(that.line){
                  that.lineSearch();
              }
              that.showStations(that.roadDataRefer[0].name, that.upClick ? 0:1);
          });
          that.$http.get('http://118.25.99.80:9001/api/busline/via_station?line_name='+ that.road_name + '&date_time=' + that.dateTime).then(function(ret){
              that.resultDataRefer = ret.data;
              that.resultData = ret.data.slice(0, 5);
              if(that.station){
                  that.stationSearch();
              }
          });
          if(that.state){
              that.roadStatus();
          }
          that.$http.get('http://118.25.99.80:9001/api/busline/vehicle?line_name='+ that.road_name + '&date_time=' + that.dateTime).then(function(ret){
              that.vehicleDataRefer = ret.data;
              that.vehicleData = ret.data.slice(0, 5);
              if(that.bus){
                  that.vehicleSearch();
              }
          });
        }
      },
      searchResult(){
        let that = this;
        that.filter = false;
        that.clearAll();
        if(that.station_name == ''){
          that.lineMapData();
          if(that.line){
              that.lineSearch();
          }
          if(that.station){
              that.stationSearch();
          }
          if(that.bus){
              that.vehicleSearch();
          }
        }
        else{
          this.$http.get('http://118.25.99.80:9001/api/station/lines?station_name='+ that.station_name + '&date_time=' + that.dateTime).then(function(ret){
              that.roadDataRefer = ret.data;
              that.roadData = ret.data.slice(0, 5);
              if(that.line){
                  that.lineSearch();
              }
              that.showStations(that.roadDataRefer[0].name, that.upClick ? 0:1);
          });
          that.$http.get('http://118.25.99.80:9001/api/station/stations?station_name='+ that.station_name + '&date_time=' + that.dateTime).then(function(ret){
              that.resultDataRefer = ret.data;
              that.resultData = ret.data.slice(0, 5);
              if(that.station){
                  that.stationSearch();
              }
          });
          if(that.state){
              that.roadStatus();
          }
          that.$http.get('http://118.25.99.80:9001/api/station/vehicle?station_name='+ that.station_name + '&date_time=' + that.dateTime).then(function(ret){
              that.vehicleDataRefer = ret.data;
              that.vehicleData = ret.data.slice(0, 5);
              if(that.bus){
                  that.vehicleSearch();
              }
          });
        }
      },
      clearLineInput(){
        let that = this;
        this.road_name = '';
        this.filter = false;
        this.clearAll();
        if(this.road_name == '' && this.station_name == '' && this.vehicle_num == ''){
          this.$http.get('http://118.25.99.80:9001/api/buslines/info?date_time=' + that.dateTime).then(function(ret){
            that.roadDataRefer = ret.data;
            that.roadData = ret.data.slice(0, 5);
            if(that.line){
              that.lineSearch();
            }
            that.showStations(that.roadData[0].name, 0);
          });
          this.$http.get('http://118.25.99.80:9001/api/stations/info?date_time=' + that.dateTime).then(function(ret){
            that.resultDataRefer = ret.data;
            that.resultData = ret.data.slice(0, 5);
            if(that.station){
              that.stationSearch();
            }
          });
          this.$http.get('http://118.25.99.80:9001/api/vehicles/info?date_time=' + that.dateTime).then(function(ret){
            that.vehicleDataRefer = ret.data;
            that.vehicleData = ret.data.slice(0, 5);
            if(that.bus){
              that.vehicleSearch();
            }
          });
          if(that.state){
            this.roadStatus();
          }
        }
        if(this.road_name != ''){
          this.searchBusLine();
        }
        if(this.station_name != ''){
          this.searchResult();
        }
        if(this.vehicle_num != ''){
          this.searchVehicle();
        }
      },
      clearStationInput(){
        let that = this;
        this.station_name = '';
        this.filter = false;
        this.clearAll();
        if(this.road_name == '' && this.station_name == '' && this.vehicle_num == ''){
          this.$http.get('http://118.25.99.80:9001/api/buslines/info?date_time=' + that.dateTime).then(function(ret){
            that.roadDataRefer = ret.data;
            that.roadData = ret.data.slice(0, 5);
            if(that.line){
              that.lineSearch();
            }
            that.showStations(that.roadData[0].name, 0);
          });
          this.$http.get('http://118.25.99.80:9001/api/stations/info?date_time=' + that.dateTime).then(function(ret){
            that.resultDataRefer = ret.data;
            that.resultData = ret.data.slice(0, 5);
            if(that.station){
              that.stationSearch();
            }
          });
          this.$http.get('http://118.25.99.80:9001/api/vehicles/info?date_time=' + that.dateTime).then(function(ret){
            that.vehicleDataRefer = ret.data;
            that.vehicleData = ret.data.slice(0, 5);
            if(that.bus){
              that.vehicleSearch();
            }
          });
          if(that.state){
            this.roadStatus();
          }
        }
        if(this.road_name != ''){
          this.searchBusLine();
        }
        if(this.station_name != ''){
          this.searchResult();
        }
        if(this.vehicle_num != ''){
          this.searchVehicle();
        }
      },
      clearVehicleInput(){
        let that = this;
        this.vehicle_num = '';
        this.filter = false;
        this.clearAll();
        if(this.road_name == '' && this.station_name == '' && this.vehicle_num == ''){
          this.$http.get('http://118.25.99.80:9001/api/buslines/info?date_time=' + that.dateTime).then(function(ret){
            that.roadDataRefer = ret.data;
            that.roadData = ret.data.slice(0, 5);
            if(that.line){
              that.lineSearch();
            }
            that.showStations(that.roadData[0].name, 0);
          });
          this.$http.get('http://118.25.99.80:9001/api/stations/info?date_time=' + that.dateTime).then(function(ret){
            that.resultDataRefer = ret.data;
            that.resultData = ret.data.slice(0, 5);
            if(that.station){
              that.stationSearch();
            }
          });
          this.$http.get('http://118.25.99.80:9001/api/vehicles/info?date_time=' + that.dateTime).then(function(ret){
            that.vehicleDataRefer = ret.data;
            that.vehicleData = ret.data.slice(0, 5);
            if(that.bus){
              that.vehicleSearch();
            }
          });
          if(that.state){
            this.roadStatus();
          }
        }
        if(this.road_name != ''){
          this.searchBusLine();
        }
        if(this.station_name != ''){
          this.searchResult();
        }
        if(this.vehicle_num != ''){
          this.searchVehicle();
        }
      },
      roadCurrentChange:function(val){
        this.road_start_index = val;
        this.roadData = this.roadDataRefer.slice((this.road_start_index-1)*5, this.road_start_index*5);
      },
      vehicleCurrentChange:function(val){
        this.vehicle_start_index = val;
        this.vehicleData = this.vehicleDataRefer.slice((this.vehicle_start_index-1)*5, this.vehicle_start_index*5);
      },
      resultCurrentChange:function(val){
        this.result_start_index = val;
        this.resultData = this.resultDataRefer.slice((this.result_start_index-1)*5, this.result_start_index*5);
      },
      clickUp(){
        this.upClick = true;
        if(this.road_name != ''){
          this.showStations(this.roadDataRefer[0].name, 0);
        }
        else{
          this.showStations(this.road_name, 0);
        }
      },
      clickDown(){
        this.upClick = false;
        if(this.road_name != ''){
          this.showStations(this.roadDataRefer[0].name, 1);
        }
        else{
          this.showStations(this.road_name, 1);
        }
      },
      showStations(name, dir){
        let that = this;
        this.$http.get('http://118.25.99.80:9001/api/busline/station?line_name='+ name + '&date_time=' + that.dateTime).then(function(ret){
          let stops_name = ret.data[dir].via_stations;
          let num = stops_name.length;
          let speeds = [];
          for(let i = 0; i < num; i++){
              let temp = parseInt(Math.random() * 4,10);
              speeds.push(temp);
          }
          let stop_width = 16;
          let stop_contain = document.getElementById("stops");
          let start = document.getElementById("start_station");
          let end = document.getElementById("end_station");
          while(stop_contain.children != null && stop_contain.children.length > 4){
            stop_contain.removeChild(stop_contain.children[4]);
          }
          start.innerHTML = "";
          end.innerHTML = "";
          for(let i = 0; i < num; i++){
            let line = document.createElement("div");
            let space = document.body.clientWidth  * 0.05;
            let gap = document.body.clientWidth - space * 2 - 320;
            let width = (gap - stop_width * num)/num;
            line.style.width = width + 'px';
            line.style.position = 'absolute';
            line.style.height = '5px';
            line.style.top = '55px';
            line.style.left = 214 + i * stop_width + i * width + 'px';
            if(speeds[i] == 0) line.style.backgroundColor = '#307EC6';
            else if(speeds[i] == 1) line.style.backgroundColor = '#8B0000';
            else line.style.backgroundColor = '#008B00';
            /*
            if(Math.abs(line_status[i]) != 1){
              let tag = document.createElement("div");
              tag.style.width = width * 5 + 'px';
              tag.style.position = 'absolute';
              tag.style.height = '20px';
              tag.style.top = '20px';
              tag.style.left = 214 + i * stop_width + i * width + 'px';
              tag.style.backgroundColor = '#AF2811';
              tag.style.color = '#ffffff';
              tag.style.fontSize = '60%';
              tag.style.lineHeight = '20px';
              if(i%2 == 1){
                tag.innerHTML = '高速';
              }
              else{
                tag.innerHTML = '大间隔';
              }
              stop_contain.appendChild(tag);
            }*/
            if(i != num - 1){
              let point = document.createElement("div");
              point.style.width = stop_width - 4 + 'px';
              point.style.zIndex = '15';
              point.style.position = 'absolute';
              point.style.height = stop_width - 4 + 'px';
              point.style.top = '48px';
              point.style.left = 214 + i * stop_width + (i + 1) * width + 'px';
              point.style.backgroundColor = 'transparent';
              point.style.borderRadius = '100px';
              point.style.border = '2px solid #2D80C6';
              point.style.color = '#ffffff';
              point.style.fontSize = '60%';
              point.style.lineHeight = stop_width - 4 + 'px';
              stop_contain.appendChild(point);
              let station_name = document.createElement("div");
              station_name.style.width = stop_width - 4 + 'px';
              station_name.style.height = 70 + 'px';
              station_name.style.overflow = 'hidden';
              station_name.style.position = 'absolute';
              station_name.style.top = '75px';
              station_name.style.left = 216 + i * stop_width + (i + 1) * width + 'px';
              station_name.style.color = '#ffffff';
              station_name.style.fontSize = '50%';
              station_name.innerHTML = stops_name[i + 1];
              stop_contain.appendChild(station_name);
            }
            stop_contain.appendChild(line);
          }
          start.innerHTML = stops_name[0].length > 4 ? stops_name[0].substring(0,4) + '<br>' + name:stops_name[0] + '<br>' + name;
          end.innerHTML = stops_name[num - 1].length > 4 ? stops_name[num - 1].substring(0,4) + '<br>' + name:stops_name[num - 1] + '<br>' + name;
        });
      },
      clearAll(){
        this.removeLine();
        this.removeStation();
        this.removeVehicle();
      },
      removeLine(){
        for(let i = 0; i < this.lineArray.length; i++){
          this.map.remove(this.lineArray[i]);
        }
        for(let i = 0; i < this.markArray.length; i++){
            this.map.remove(this.markArray[i]);
        }
        this.lineArray = [];
        this.markArray = [];
      },
      removeStation(){
        for(let i = 0; i < this.stationArray.length; i++){
          this.map.remove(this.stationArray[i]);
        }
        this.stationArray = [];
        if(this.station_cluster){
          this.station_cluster.setMap(null);
          this.station_cluster = null;
        }
      },
      removeTraffic(){
        if(this.trafficLayer){
          this.trafficLayer.hide();
        }
      },
      removeVehicle(){
        for(let i = 0; i < this.vehicleArray.length; i++){
          this.map.remove(this.vehicleArray[i]);
        }
        this.vehicleArray = [];
        if(this.vehicle_cluster){
          this.vehicle_cluster.setMap(null);
          this.vehicle_cluster = null;
        }
      },
      removeFlows(){
        for(let i = 0; i < this.flows.length; i++){
          this.map.remove(this.flows[i]);
        }
        this.flows = [];
      },
      lineSearch_Callback(data, name, all) {
          let that = this;
          let lineArr = data.lineInfo;
          let lineNum = data.lineInfo.length;
          if (lineNum == 0) {
          }
          else {
            if(lineArr[0]){
              let pathArr = lineArr[0].path;
              let stops = lineArr[0].via_stops;
              let startPot = stops[0].location;
              let endPot = stops[stops.length - 1].location;
              that.drawbusLine(startPot, endPot, pathArr, name, all);
            }
          }
      },
      drawbusLine(startPot, endPot, BusArr, name, all) {
        //绘制起点，终点
        let that = this;
        //绘制乘车的路线
        if(!all){
            let markStart = new AMap.Marker({
                map: that.map,
                position: startPot, //基点位置
                icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
                zIndex: 10
            });
            let markEnd = new AMap.Marker({
                map: that.map,
                position: endPot, //基点位置
                icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
                zIndex: 10
            });
            that.markArray.push(markStart);
            that.markArray.push(markEnd);
        }
        let busPolyline = new AMap.Polyline({
            map: that.map,
            path: BusArr,
            strokeColor: "#09f",//线颜色
            strokeOpacity: 0.8,//线透明度
            isOutline:true,
            outlineColor:'white',
            strokeWeight: 3//线宽
        });
        busPolyline.name = name;
        that.map.setFitView();
        busPolyline.on("click", function(){
          that.showStations(this.name, 0);
          that.upClick = 0;
          that.road_name = this.name;
          that.searchBusLine();
        });
        that.lineArray.push(busPolyline);
      },
      lineSearch() {
        let that = this;
        let spec_lines = that.lines;
        AMap.plugin(["AMap.LineSearch"], function() {
            //实例化公交线路查询类
            let linesearch = new AMap.LineSearch({
                pageIndex: 1, //页码，默认值为1
                pageSize: 20, //单页显示结果条数，默认值为20，最大值为50
                city: "苏州", //限定查询城市，可以是城市名（中文/中文全拼）、城市编码，默认值为『全国』
                extensions: "all" //是否返回公交线路详细信息，默认值为『base』
            });
            if(that.road_name == '' && that.station_name == '' && that.vehicle_num == ''){
                //执行公交路线关键字查询
                for(let i = 0; i < spec_lines.length; i++){
                    let name = spec_lines[i];
                    linesearch.search(name, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            that.lineSearch_Callback(result, name, true);
                        }
                    });
                }
            }
            else if(that.road_name != ''){
                linesearch.search(that.road_name, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        that.lineSearch_Callback(result, that.road_name, false);
                    }
                });
            }
            else if(that.station_name != ''){
                for(let i = 0; i < that.roadDataRefer.length; i++){
                    let name = that.roadDataRefer[i].name;
                    linesearch.search(name, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            that.lineSearch_Callback(result, name, false);
                        }
                    });
                }
            }
            else{
                for(let i = 0; i < that.roadDataRefer.length; i++){
                    let name = that.roadDataRefer[i].name;
                    linesearch.search(name, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            that.lineSearch_Callback(result, name, false);
                        }
                    });
                }
            }
        });
        // that.line_option = [];
        // if(that.road_name == '' && that.station_name == '' && that.vehicle_license == ''){
        //   for(let i = 0; i < that.roadDataRefer.length; i++){
        //     let pos = [];
        //     for(let j = 0; j < that.roadDataRefer[i].lats.length; j++){
        //       pos.push([that.roadDataRefer[i].longs[j], that.roadDataRefer[i].lats[j]]);
        //     }
        //     let busOption = {
        //       path: pos,
        //       strokeColor: that.line_colors[i],
        //       strokeOpacity: 1,
        //       strokeWeight: 2
        //     };
        //     let busPath = new AMap.Polyline(busOption);
        //     busPath.name = that.roadDataRefer[i].name;
        //     busPath.direction = that.roadDataRefer[i].direction;
        //     busPath.order = i;
        //     that.line_option.push(busOption);
        //     busPath.on("mouseover", function(){
        //       that.line_option[this.order].strokeWeight = 4;
        //       this.setOptions(that.line_option[this.order]);
        //       if(that.pre_line != null){
        //         let pre_Option = that.pre_line.getOptions();
        //         pre_Option.strokeWeight = 2;
        //         that.pre_line.setOptions(pre_Option);
        //       }
        //       that.pre_line = this;
        //     });
        //     busPath.on("click", function(){
        //       that.current_line = this.order;
        //       console.log(this.name+","+this.direction);
        //       that.showStations(this.name, this.direction == '上行' ? 0:1);
        //       that.upClick = this.direction == '上行' ? 0:1;
        //       that.road_name = this.name;
        //       that.searchBusLine();
        //     });
        //     that.lineArray.push(busPath);
        //     that.map.add(busPath);
        //   }
        // }
        // else{
        //   let latlng = that.roadDataRefer;
        //   for(let i = 0; i < latlng.length; i++){
        //     let pos = [];
        //     for(let j = 0; j < latlng[i].via_stop_lat.length; j++){
        //       pos.push([latlng[i].via_stop_lng[j], latlng[i].via_stop_lat[j]]);
        //     }
        //     let busOption = {
        //       path: pos,
        //       strokeColor: that.line_colors[i],
        //       strokeOpacity: 1,
        //       strokeWeight: 2
        //     };
        //     let f_busPath = new AMap.Polyline(busOption);
        //     f_busPath.name = latlng[i].name;
        //     f_busPath.direction = latlng[i].direction;
        //     f_busPath.order = i;
        //     that.line_option.push(busOption);
        //     f_busPath.on("mouseover", function(){
        //       that.line_option[this.order].strokeWeight = 4;
        //       this.setOptions(that.line_option[this.order]);
        //       if(that.pre_line != null){
        //         let pre_Option = that.pre_line.getOptions();
        //         pre_Option.strokeWeight = 2;
        //         that.pre_line.setOptions(pre_Option);
        //       }
        //       that.pre_line = this;
        //     });
        //     f_busPath.on("click", function(){
        //       that.current_line = this.order;
        //       that.showStations(this.name, this.direction == '上行' ? 0:1);
        //       that.upClick = this.direction == '上行' ? 0:1;
        //       that.road_name = this.name;
        //       that.searchBusLine();
        //     });
        //     that.lineArray.push(f_busPath);
        //     that.map.add(f_busPath);
        //   }
        // }
      },
      // stationCallBack(data, name){
      //     let that = this;
      //     let lineArr = data.lineInfo;
      //     let lineNum = data.lineInfo.length;
      //     if (lineNum > 0){
      //         let stops = lineArr[0].via_stops;
      //         let tmpName = [];
      //         let tmpLocation = [];
      //         for(let k = 0; k < stops.length; k++){
      //             tmpName.push(stops[k].name);
      //             tmpLocation.push([parseFloat(stops[k].location.lng), parseFloat(stops[k].location.lat)]);
      //             let marker = new AMap.Marker({
      //                 position: [parseFloat(stops[k].location.lng), parseFloat(stops[k].location.lat)],
      //                 icon: new AMap.Icon({
      //                     size: new AMap.Size(30, 30),
      //                     image: 'static/icon/station_icon.png'
      //                 })
      //             });
      //             marker.name = name;
      //             marker.on("click", function(){
      //               that.station_name = this.name;
      //               that.searchResult();
      //               that.road_name = that.roadDataRefer[0].name;
      //               that.showStations(that.road_name, that.upClick ? 0:1);
      //             });
      //             that.stationArray.push(marker);
      //         }
      //         that.names.push(tmpName);
      //         that.locations.push(tmpLocation);
      //         console.log(JSON.stringify(that.names));
      //         console.log(JSON.stringify(that.locations));
      //     }
      // },
      stationSearch(){
        let that = this;
        let stops = that.locations;
        if(that.road_name == '' && that.station_name == '' && that.vehicle_num == ''){
          for(let k = 0; k < stops.length; k++){
              for(let s = 0; s < stops[k].length; s++){
                  let marker = new AMap.Marker({
                      position: [parseFloat(stops[k][s][0]), parseFloat(stops[k][s][1])],
                      icon: new AMap.Icon({
                          size: new AMap.Size(30, 30),
                          image: 'static/icon/station_icon.png'
                      })
                  });
                  marker.name = that.names[k][s];
                  marker.on("click", function(){
                      that.station_name = this.name;
                      that.searchResult();
                      that.road_name = that.lines[k];
                      that.showStations(that.road_name, that.upClick ? 0:1);
                  });
                  that.stationArray.push(marker);
              }
          }
        }
        else if(that.road_name != ''){
            let index = that.lines.indexOf(that.road_name);
            if(index != -1){
                for(let s = 0; s < stops[index].length; s++){
                    let marker = new AMap.Marker({
                        position: [parseFloat(stops[index][s][0]), parseFloat(stops[index][s][1])],
                        icon: new AMap.Icon({
                            size: new AMap.Size(30, 30),
                            image: 'static/icon/station_icon.png'
                        })
                    });
                    marker.name = that.names[index][s];
                    marker.on("click", function(){
                        that.station_name = this.name;
                        that.searchResult();
                        that.road_name = that.lines[index];
                        that.showStations(that.road_name, that.upClick ? 0:1);
                    });
                    that.stationArray.push(marker);
                }
            }
        }
        else if(that.station_name != ''){
            let tag = 0;
            for(let k = 0; k < stops.length; k++){
                for(let s = 0; s < stops[k].length; s++){
                    if(that.station_name == that.names[k][s]){
                        let marker = new AMap.Marker({
                            position: [parseFloat(stops[k][s][0]), parseFloat(stops[k][s][1])],
                            icon: new AMap.Icon({
                                size: new AMap.Size(30, 30),
                                image: 'static/icon/station_icon.png'
                            })
                        });
                        marker.name = that.names[k][s];
                        marker.on("click", function(){
                            that.station_name = this.name;
                            that.searchResult();
                            that.road_name = that.lines[k];
                            that.showStations(that.road_name, that.upClick ? 0:1);
                        });
                        that.stationArray.push(marker);
                        tag = 1;
                        break;
                    }
                }
                if(tag == 1) break;
            }
        }
        else{
            let tmpName = that.vehicleDataRefer[0].line_name;
            let index = that.lines.indexOf(tmpName);
            if(index != -1){
                for(let s = 0; s < stops[index].length; s++){
                    let marker = new AMap.Marker({
                        position: [parseFloat(stops[index][s][0]), parseFloat(stops[index][s][1])],
                        icon: new AMap.Icon({
                            size: new AMap.Size(30, 30),
                            image: 'static/icon/station_icon.png'
                        })
                    });
                    marker.name = that.names[index][s];
                    marker.on("click", function(){
                        that.station_name = this.name;
                        that.searchResult();
                        that.road_name = that.lines[index];
                        that.showStations(that.road_name, that.upClick ? 0:1);
                    });
                    that.stationArray.push(marker);
                }
            }
        }
        that.station_cluster = new AMap.MarkerClusterer(
            that.map,
            that.stationArray
        );

        // let that = this;
        // let spec_lines = ['38', '83', '119', '415', '快线2号', '快线3号', '快线6号', '游1', '游3', '游4'];
        // AMap.plugin(["AMap.LineSearch"], function(){
        //     //实例化公交线路查询类
        //     let linesearch = new AMap.LineSearch({
        //         pageIndex: 1, //页码，默认值为1
        //         pageSize: 20, //单页显示结果条数，默认值为20，最大值为50
        //         city: "苏州", //限定查询城市，可以是城市名（中文/中文全拼）、城市编码，默认值为『全国』
        //         extensions: "all" //是否返回公交线路详细信息，默认值为『base』
        //     });
        //
        //     //执行公交路线关键字查询
        //     for(let i = 0; i < 10; i++){
        //         let name = spec_lines[i];
        //         linesearch.search(name, function(status, result) {
        //             if (status === 'complete' && result.info === 'OK') {
        //               that.stationCallBack(result, name);
        //             }
        //         });
        //     }
        // });


        // for(let i = 0; i < that.resultDataRefer.length; i++){
        //   let marker = new AMap.Marker({
        //     position: that.resultDataRefer[i].latlng,
        //     icon: new AMap.Icon({
        //       size: new AMap.Size(30, 30),
        //       image: 'static/icon/station_icon.png'
        //     })
        //   });
        //   marker.name = that.resultDataRefer[i].station_name;
        //   marker.on("click", function(){
        //     that.station_name = this.name;
        //     that.searchResult();
        //     that.road_name = that.roadDataRefer[0].name;
        //     that.showStations(that.road_name, that.upClick ? 0:1);
        //   });
        //   that.stationArray.push(marker);
        // }
        // that.station_cluster = new AMap.MarkerClusterer(
        //   that.map,
        //   that.stationArray
        // );

      },
      roadStatus(){
        if(this.trafficLayer == null){
          this.trafficLayer = new AMap.TileLayer.Traffic({zIndex:10});
          this.trafficLayer.setMap(this.map);
        }
        else{
          this.trafficLayer.show();
        }
      },
      vehicleSearch(){
        let that = this;
        for(let i = 0; i < that.vehicleDataRefer.length; i++){
          let pos = that.vehicleDataRefer[i].latlng;
          let marker = new AMap.Marker({
            position: pos,
            icon: new AMap.Icon({
              size: new AMap.Size(30, 30),
              image: 'static/icon/vehicle_icon.png'
            })
          });
          marker.num = that.vehicleDataRefer[i].license_num;
          marker.on("click", function(){
            that.vehicle_num = this.num;
            that.searchVehicle();
            that.road_name = that.roadDataRefer[0].name;
            that.showStations(that.road_name, that.upClick ? 0:1);
          });
          that.vehicleArray.push(marker);
        }
        let sts = [{
            url: "https://a.amap.com/jsapi_demos/static/images/blue.png", //聚合量在1-10
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/green.png", //聚合量在11-100
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/orange.png", //聚合量在101-1000
            size: new AMap.Size(36, 36),
            offset: new AMap.Pixel(-18, -18)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/red.png", //聚合量在1001-10000
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/darkRed.png", //聚合量在10001-100000
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
        }];
        that.vehicle_cluster = new AMap.MarkerClusterer(
          that.map,
          that.vehicleArray,
          {
              styles: sts,
              gridSize: 80
          }
        );
      },
      showFlowLayer(){
        let that = this;
        if(that.flow_layer_v){
          if(!this.station){
            this.stationSearch();
            this.operation.push(2);
          }
          let stations = [
            new AMap.LngLat(120.7262268, 31.35169029),
            new AMap.LngLat(120.3097, 31.27321625),
            new AMap.LngLat(120.631134, 31.49956512),
            new AMap.LngLat(120.5537491, 31.29355621),
            new AMap.LngLat(120.4554901, 31.44120979),
            new AMap.LngLat(120.6641769, 31.32314491),
            new AMap.LngLat(120.6650238, 31.32509041),
            new AMap.LngLat(120.6280365, 31.3886795),
            new AMap.LngLat(120.5972519, 31.33258057),
            new AMap.LngLat(120.6441116, 31.17532158),
          ];
          that.flows = [];
          let indexes = [
            [0, 2],
            [1, 2],
            [1, 3],
            [2, 4],
            [1, 5],
            [2, 6],
            [3, 6],
            [4, 7],
            [2, 8],
            [1, 9],
            [0, 5],
            [3, 4],
            [5, 6],
            [7, 9],
            [8, 9],
            [4, 5],
            [4, 8],
            [6, 9],
            [6, 7],
            [7, 8]
          ];
          for(let i = 0; i < 20; i++){
            let path = [
              stations[indexes[i][0]],
              stations[indexes[i][1]],
            ];
            let polyline = new AMap.Polyline({
              path: path,
              borderWeight: 1, // 线条宽度，默认为 1
              strokeColor: 'red', // 线条颜色
              lineJoin: 'round' // 折线拐点连接处样式
            });
            that.flows.push(polyline);
            that.map.add(that.flows[i]);
          }
          /*
          if(that.fChart == null){
            let dom = document.getElementById("flow_layer");
            that.fChart = this.$echarts.init(dom);
            that.fChart.setOption(that.passenger_flow_options);
          }
          else{
            that.fChart.setOption(that.passenger_flow_options);
          }*/
        }
        else{
          if(!this.station){
            this.removeStation();
            let i = this.operation.indexOf(2);
            this.operation.splice(i,1);
          }
          //that.fChart.setOption(null);
          that.map.remove(that.flows);
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/animate.css';
  .scan_panel{
    position: relative;
  }
  #container{
    position: relative;
    width: 90%;
    float: right;
  }
  .slide_bar{
    position: absolute;
    right: 0;
    top: 60px;
    width: 150px;
    z-index: 20;
    background-color: #16191B;
  }
  .slide_button{
    height: 60px;
    line-height: 60px;
    color: white;
    font-size: 1.5em;
    position: absolute;
    top: 0;
    right: 0;
  }
  .bar_icon{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .el-icon-menu{
    float: right;
    margin: 16px 10px 0 0;
  }
  .theme_contain{
    z-index: 15;
    position: absolute;
    bottom: 15%;
    right: 2%;
    opacity: 0.8;
  }
  .theme_group{
    width: 120px;
    height: 30px;
    background-color: white;
    border-radius: 20px;
    padding: 4px;
  }
  .theme_btn{
    width: 30px;
    height: 30px;
    border-radius: 1000px;
    overflow: hidden;
  }
  .theme_img{
    width: 100%;
  }
  .road_table{
    z-index: 15;
    position: absolute;
    top: 10px;
    left: 10px;
    opacity: 0.8;
  }
  .vehicle_table{
    width: 414px;
    z-index: 15;
    position: absolute;
    top: 10px;
    right: 10px;
    opacity: 0.8;
  }
  .search_bar{
    width: 460px;
    height: 36px;
    position: absolute;
    top: 30px;
    right: 10px;
    z-index: 100;
    background:rgba(18,113,139,0.7);
  }
  .label{
    color: #fff;
    font-size: 80%;
    line-height: 36px;
  }
  .search{
    background: #205f9d;
    height: 20px;
    padding: 0 8px;
    color: #fff;
    line-height: 36px;
  }
  .result_table{
    z-index: 15;
    position: absolute;
    top: 225px;
    left: 10px;
    opacity: 0.8;
  }
  .stops{
    z-index: 15;
    width: 98%;
    height: 160px;
    position: absolute;
    left: 1%;
    bottom: 80px;
    background-color: rgba(20, 108, 151, 0.5);
  }
  .direction{
    width: 70px;
    height: 25px;
    line-height: 25px;
    color: #fff;
    font-size: 60%;
    text-align: center;
    cursor: pointer;
  }
  .dir_active{
    background-color: rgba(18,113,139,0.7);
  }
  .dir_inactive{
    background-color: transparent;
    border: 1px solid rgba(18,113,139,0.7);
    border-radius: 2px;
  }
  .up{
    position: absolute;
    top: 40px;
    left: 30px;
  }
  .down{
    position: absolute;
    top: 75px;
    left: 30px;
  }
  .stations{
    width: 80px;
    height: 90px;
    background-color: #082B3D;
    border: 1px solid #135193;
    border-radius: 2px;
    color: #fff;
    font-size: 80%;
    line-height: 30px;
  }
  .start{
    position: absolute;
    left: 130px;
    top: 35px;
  }
  .end{
    position: absolute;
    right: 10px;
    top: 35px;
  }
  .line_arrow{
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: #2D80C6;
    position: absolute;
    top: -5px;
    right: 0;
  }
  .filter_title{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
  }
  .filter_input{
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 2px;
    width: 100%;
    margin-bottom: 5px;
    outline: none;
  }
  .data_filter{
    position: absolute;
    top: 0;
    left: 10px;
    width: 25px;
    height: 50px;
    z-index: 20;
  }
  .filter_button{
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  .confirm{
    margin: 10px 15px 0 0;
    color: #2198D4;
    cursor: pointer;
  }
  .clear{
    margin-top: 10px;
    color: #000;
    cursor: pointer;
  }
  .el-menu-vertical-demo li{
    text-align: left;
  }
  .white_font{
    color: white;
  }
  .blue_font{
    color: #0095FE;
  }
  #flow_layer{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .line_search{
    position: absolute;
    top: 20px;
    left: 30%;
    z-index: 20;
  }
  .search_line_btn{
    color: #fff;
    background-color: rgb(30, 69, 82);
    border: solid transparent 1px;
    border-radius: 10px;
    font-size: 80%;
  }
</style>
