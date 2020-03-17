<style>
  #edit_line_panel .amap-container {
    cursor: default !important;
  }
  #edit_line_panel .amap-labels{
    cursor: default !important;
  }
  #edit_line_panel .el-input__inner{
    height: 20px;
    width: 100%;
    background-color: #152534 !important;
    border: 0;
    border-radius: 0 !important;
    color: #fff;
    font-size: 60%;
  }
  #edit_line_panel #station_panel .el-input__icon {
    line-height: 25px;
  }
  #edit_line_panel .detail_panel .el-input__icon {
    line-height: 25px;
  }
</style>
<template>
  <div id="edit_line_panel" class="edit_line_panel">
    <banner></banner>
    <navBar></navBar>
    <div id="container">
      <div class="op_panel">
        <div class="op_bar"><span class="white op_title">编辑线路</span>
          <span v-bind:class="{'op_button create op_button_inactive': modify_op, 'op_button create op_button_active': !modify_op}" v-on:click="editLine()">编辑</span>
          <span v-bind:class="{'op_button add op_button_inactive op_button_disable': !modify_op, 'op_button add op_button_active': modify_op}" v-on:click="saveLine()">保存</span>
        </div>
        <div class="op_content">
          <el-row :gutter="10">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><span class="white">线路</span></el-col>
            <el-col :xs="4" :sm="8" :md="8" :lg="8" :xl="8"><el-input v-model="line_name"></el-input></el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><span class="white">方向</span></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><el-input v-model="line_direction"></el-input></el-col>
          </el-row>
          <el-row style="padding: 0 5px; margin-top:13px;">
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 0 || !modify_op, 'op_bgc_selected': op_type == 0 && modify_op}" v-on:click="drawLine()">
                <div v-bind:class="{'op_icon line_active': op_type == 0 && modify_op, 'op_icon line_disable': !modify_op, 'op_icon line': op_type != 0 && modify_op}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 1 || !modify_op, 'op_bgc_selected': op_type == 1 && modify_op}" v-on:click="drawCircle()">
                <div v-bind:class="{'op_icon circle_active': op_type == 1 && modify_op, 'op_icon circle_disable': !modify_op, 'op_icon circle': op_type != 1 && modify_op}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 2 || !modify_op, 'op_bgc_selected': op_type == 2 && modify_op}" v-on:click="viewMap()">
                <div v-bind:class="{'op_icon move_active': op_type == 2 && modify_op, 'op_icon move_disable': !modify_op, 'op_icon move': op_type != 2 && modify_op}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 3 || !modify_op, 'op_bgc_selected': op_type == 3 && !modify_op}" v-on:click="editMap()">
                <div v-bind:class="{'op_icon edit_active': op_type == 3 && !modify_op, 'op_icon edit_disable': (modify_op || (op_type != 3 && !modify_op)), 'op_icon edit': op_type != 3 && (op_type == 2)}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 4 || !modify_op, 'op_bgc_selected':  op_type == 4 && (modify_op || op_type == 3)}" v-on:click="zoomOut()">
                <div v-bind:class="{'op_icon shrink_active': op_type == 4 && (modify_op || op_type == 3), 'op_icon shrink': op_type != 4 }"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 5 || !modify_op, 'op_bgc_selected': op_type == 5 && (modify_op || op_type == 3)}" v-on:click="zoomIn()">
                <div v-bind:class="{'op_icon magnify_active': op_type == 5 && (modify_op || op_type == 3), 'op_icon magnify': op_type != 5 }"></div>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding: 0 5px; margin-top: 5px;">
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 6 || (!modify_op), 'op_bgc_selected': op_type == 6 && modify_op}" v-on:click="cutLine()">
                <div v-bind:class="{'op_icon cut_active': op_type == 6 && modify_op, 'op_icon cut_disable': !modify_op, 'op_icon cut': op_type != 6 && modify_op}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div v-bind:class="{'op_bgc': op_type != 7 || (!modify_op), 'op_bgc_selected': op_type == 7 && modify_op}" v-on:click="dragCircle()">
                <div v-bind:class="{'op_icon drag_active': op_type == 7 && modify_op, 'op_icon drag_disable': !modify_op, 'op_icon drag': op_type != 7 && modify_op}"></div>
              </div>
            </el-col>
            <el-col :span="4">

            </el-col>
            <el-col :span="4">

            </el-col>
            <el-col :span="4">

            </el-col>
            <el-col :span="4">

            </el-col>
          </el-row>
        </div>
      </div>
      <div id="station_panel" class="op_station" v-show="show_station">
        <div class="white edit_title">
          <span class="title_name">站点属性</span>
          <span v-bind:class="{'op_button station_confirm op_button_inactive': (station_name == '' || station_type == ''), 'op_button station_confirm op_button_active': (station_name != '' && station_type != '') }" v-on:click="addNewStation">确认</span>
        </div>
        <span class="name_label">名称</span>
        <el-input class="station_input" v-model="station_name"></el-input>
        <span class="type_label">类型</span>
        <el-select v-model="station_type" class="select_type" clearable placeholder="请选择类型">
          <el-option
            v-for="item in station_types"
            :key="item.type"
            :label="item.name"
            :value="item.type">
          </el-option>
        </el-select>
      </div>
      <div class="white effect_panel">
        <div class="effect_title"><span class="white op_title">成本测算</span></div>
        <div class="form">
          <div class="odd">
            <div class="left">
              <span class="label">车辆成本测算</span>
            </div>
            <div class="middle">
              <span class="label">车辆数</span>
            </div>
            <div class="right">
              <span class="label">增加成本（万元/每车）</span>
            </div>
          </div>
          <div class="even">
            <div class="left">
              <span class="label"></span>
            </div>
            <div class="middle">
              <el-input v-model="vehicle_num"></el-input>
            </div>
            <div class="right">
              <el-input v-model="vehicle_extra_cost"></el-input>
            </div>
          </div>
          <div class="odd">
            <div class="left">
              <span class="label">人员成本测算</span>
            </div>
            <div class="middle">
              <span class="label">人员数</span>
            </div>
            <div class="right">
              <span class="label">平均成本（万元/每人）</span>
            </div>
          </div>
          <div class="even">
            <div class="left">
              <span class="label"></span>
            </div>
            <div class="middle">
              <el-input v-model="staff_num"></el-input>
            </div>
            <div class="right">
              <el-input v-model="staff_mean_cost"></el-input>
            </div>
          </div>
          <div class="odd">
            <div class="left">
              <span class="label">站点成本测算</span>
            </div>
            <div class="middle">
              <span class="label">站点数量</span>
            </div>
            <div class="right">
              <span class="label">成本（万元/每站）</span>
            </div>
          </div>
          <div v-for="(item, index) in station_types" class="even">
            <div class="left">
              <span class="label">{{item.name}}</span>
            </div>
            <div class="middle">
              <span class="label">{{station_type_num[index]}}</span>
            </div>
            <div class="right">
              <el-input v-model="station_type_cost[index]"></el-input>
            </div>
          </div>
          <div class="even">
            <div class="left">
            </div>
            <div class="middle">
              <span class="label">站点总计成本</span>
            </div>
            <div class="right">
              <span class="label">{{station_cost}}</span>
            </div>
          </div>
          <div class="odd">
            <div class="left">
              <span class="label">总成本</span>
            </div>
            <div class="middle">
            </div>
            <div class="right">
              <span class="label">{{total_cost}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="white detail_panel">
        <div class="effect_title">
          <span class="white op_title">线路详情</span>
        </div>
        <div class="form">
          <div class="odd">
            <div class="left">
              <span class="label">有效覆盖范围</span>
            </div>
            <div class="middle">
            </div>
            <div class="right">
              <span class="label">{{valid_range}}</span>
            </div>
          </div>
          <div class="even">
            <div class="left">
              <span class="label">人口数量</span>
            </div>
            <div class="middle">
            </div>
            <div class="right">
              <span class="label">{{population}}</span>
            </div>
          </div>
          <div class="odd">
            <div class="left">
              <span class="label">POI数量</span>
            </div>
            <div class="middle" style="width: 55%">
              <el-row>
                <el-col :span="6">
                  <div v-bind:class="{'poi_icon public_selected': poi_select[0], 'poi_icon public_normal': !poi_select[0]}" v-on:click="poiSelect(0)"></div>
                  <span>{{poi_list[0].num}}</span>
                </el-col>
                <el-col :span="6">
                  <div v-bind:class="{'poi_icon school_selected': poi_select[1], 'poi_icon school_normal': !poi_select[1]}" v-on:click="poiSelect(1)"></div>
                  <span>{{poi_list[1].num}}</span>
                </el-col>
                <el-col :span="6">
                  <div v-bind:class="{'poi_icon hospital_selected': poi_select[2], 'poi_icon hospital_normal': !poi_select[2]}" v-on:click="poiSelect(2)"></div>
                  <span>{{poi_list[2].num}}</span>
                </el-col>
                <el-col :span="6">
                  <div v-bind:class="{'poi_icon house_selected': poi_select[3], 'poi_icon house_normal': !poi_select[3]}" v-on:click="poiSelect(3)"></div>
                  <span>{{poi_list[3].num}}</span>
                </el-col>
              </el-row>
            </div>
            <div class="right" style="width: 15%">
              <span class="label">{{poi_num}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import navBar from '../../components/navBar/navBar.vue';
    import banner from '../../components/banner/banner.vue';
    import grids from '../grids.json'
    export default {
        name: "editLine",
        components: {
            navBar: navBar,
            banner: banner
        },
        data(){
            return{
                map: null, //地图
                line_name: '', //线路名称
                line_direction: '', //线路方向
                layer_base: null, //底图图层
                layer_station: null, //圆圈图层
                layer_point: null, //线路图层
                layer_line: null, //线路图层
                centers: grids, //所有六边形的中心
                points: [], //所有选中的站点
                stations: [], //所有选中的圆圈
                lines: [], //线路线段
                op_type: -1, //0为直线，1为圆圈，2为移动，3为编辑
                paths: [], //所有线路所经点
                stations_info: [], //所有站点信息
                station_name: '', //当前站名
                modify_op: false, //编辑模式
                view_op: true, //预览模式
                show_station: false, //显示站点输入框
                station_types: [{"name": "普通型", "type": 1}, {"name": "港湾式", "type": 2}], //站点类型
                station_type: '', //当前站点类型
                current_station: null, //当前站点坐标
                station_cost: 0, //站点总成本
                total_cost: 0, //总计总成本
                vehicle_num: 0, //车辆数量
                vehicle_extra_cost: 0, //额外车辆数量
                staff_num: 0, //人员数量
                staff_mean_cost: 0, //人员平均成本
                station_type_num: [0, 0], //站点类型数量
                station_type_cost: [0, 0], //站点类型成本
                valid_range: '',  //有效覆盖范围
                population: '', //人口数量
                poi_num: 0, //POI总计数量
                poi_list: [ //POI详情
                    {
                        type: "公共设施",
                        num: 0,
                        detail: []
                    },
                    {
                        type: "学校",
                        num: 0,
                        detail: []
                    },
                    {
                        type: "医院",
                        num: 0,
                        detail: []
                    },
                    {
                        type: "小区",
                        num: 0,
                        detail: []
                    }
                ],
                types : ["公共设施", "科教文化服务", "医疗保健服务", "商务住宅"], //用于高德查询的POI类型
                keywords : ["公共设施", "学校", "医院", "小区"], //用于查询的关键词
                poi_select: [false, false, false, false], //POI按钮的选择情况
                poi_group: [null, null, null, null], //POI图层
                poi_icon_src: [  //POI点标记的图标图片路径
                    '../../../static/icon/poi/public.png',
                    '../../../static/icon/poi/book.png',
                    '../../../static/icon/poi/hospital.png',
                    '../../../static/icon/poi/house.png'
                ],
                amap: null,
                station_map: [],
                //center_visit: [],
                layer_cut: null,
                cut_pos: null,
                layer_point_another: null,
                layer_line_another: null,
                layer_station_another: null,
                cut_flow_current: 0,
                cut_flow_transfer: 0
            }
        },
        mounted(){
            let that = this;
            //调整地图和边栏高度
            let height = window.screen.availHeight - 46;
            document.getElementById("container").style.height = window.screen.availHeight + 'px';
            let height_c = window.getComputedStyle(document.getElementById("container")).getPropertyValue('height');
            document.getElementById("nav_bar").style.height = height_c;
            //创建地图，缩放等级为13，主题为暗黑
            that.map = new AMap.Map('container',{
                center: [120.62, 31.32],
                zoom: 13
            });
            that.map.setMapStyle('amap://styles/dark');
            //为缩放操作设置绘制六边形的监听
            that.map.on('zoomend', that.justifyHex);
            // 六边形中心访问标记
            // for(let i = 0; i < that.centers.length; i++){
            //     that.center_visit.push(false);
            // }
        },
        methods:{
            // 截断线路
            cutLine(){
              let that = this;
              that.op_type = 6;
            },
            processCut(index){
                let that = this;
                // 绘制截断点
                that.layer_cut.setData([that.cut_pos], {
                    type: 'json',
                    lnglat: 'center'
                });
                that.layer_cut.render();
                // 找到与截断点最近的两侧的站点和途径点的索引
                let station_index = null;
                let an_station_index = null;
                let point_index = null;
                let an_point_index = null;
                for(let j = 0; j < that.station_map.length; j++){
                    if(that.station_map[j][2] > index){
                        station_index = j - 1;
                        point_index = that.station_map[j - 1][2];
                        an_station_index = j;
                        an_point_index = that.station_map[j][2];
                        break;
                    }
                }
                // 绘制两条新线路的途径点
                let points_set = that.points.slice(0, point_index + 1);
                let an_points_set = that.points.slice(an_point_index, that.points.length);
                that.layer_point.setData(points_set, {
                    type: 'json',
                    lnglat: 'center'
                });
                that.layer_point.render();
                if(that.layer_point_another == null){
                    that.layer_point_another = Loca.visualLayer({
                        eventSupport: true,
                        container: that.amap,
                        type: 'point',
                        shape: 'circle',
                        zIndex: '110'
                    });
                    that.layer_point_another.setOptions({
                        unit: 'meter',
                        style: {
                            radius: '40',
                            fill: '#00BFFF',
                            lineWidth: 1,
                            fillOpacity: 1
                        },
                    });
                }
                that.layer_point_another.setData(an_points_set, {
                    type: 'json',
                    lnglat: 'center'
                });
                that.layer_point_another.render();
                // 绘制两条线路
                let lines_set = [];
                if(points_set.length > 1){
                    for(let i = 0; i < points_set.length - 1; i++){
                        lines_set.push({'line': [points_set[i].center[0] + "," + points_set[i].center[1], points_set[i + 1].center[0] + "," + points_set[i + 1].center[1]]});
                    }
                    that.layer_line.setData(lines_set, {
                        lnglat: 'line'
                    });
                    that.layer_line.render();
                }
                let an_lines_set = [];
                if(an_points_set.length > 1){
                    for(let i = 0; i < an_points_set.length - 1; i++){
                        an_lines_set.push({'line': [an_points_set[i].center[0] + "," + an_points_set[i].center[1], an_points_set[i + 1].center[0] + "," + an_points_set[i + 1].center[1]]});
                    }
                    if(that.layer_line_another == null){
                        that.layer_line_another = Loca.visualLayer({
                            eventSupport: true,
                            container: that.amap,
                            blendMode: 'lighter',
                            type: 'line',
                            shape: 'line',
                            zIndex: '105'
                        });
                        that.layer_line_another.setOptions({
                            style: {
                                opacity: 1,
                                lineWidth: 3,
                                stroke: '#00BFFF'
                            }
                        });
                    }
                    that.layer_line_another.setData(an_lines_set, {
                        lnglat: 'line'
                    });
                    that.layer_line_another.render();
                }
                // 绘制两条新线路的站点
                let stations_set = that.stations.slice(0, station_index + 1);
                let an_stations_set = that.stations.slice(an_station_index, that.stations.length);
                that.layer_station.setData(stations_set, {
                    type: 'json',
                    lnglat: 'center'
                });
                that.layer_station.render();
                if(that.layer_station_another == null){
                    that.layer_station_another = Loca.visualLayer({
                        eventSupport: true,
                        container: that.amap,
                        type: 'point',
                        shape: 'circle',
                        zIndex: '105'
                    });
                    that.layer_station_another.setOptions({
                        unit: 'meter',
                        style: {
                            radius: '100',
                            fill: '#00BFFF',
                            lineWidth: 1,
                            fillOpacity: 0.8
                        },
                    });
                }
                that.layer_station_another.setData(an_stations_set, {
                    type: 'json',
                    lnglat: 'center'
                });
                that.layer_station_another.render();
            },
            // 移动站点
            dragCircle(){

            },
            //缩小地图
            zoomOut(){
                let that = this;
                that.map.setZoom(that.map.getZoom() - 1);
                let zoomLevel = that.map.getZoom();
                //如果缩小到了12，则从Loca容器中移除六边形图层
                if(zoomLevel == 12){
                    if(that.edit_op || that.modify_op){
                        if(that.layer_base){
                            that.layer_base.remove();
                        }
                    }
                }
            },
            //放大地图
            zoomIn(){
                let that = this;
                that.map.setZoom(that.map.getZoom() + 1);
                let zoomLevel = that.map.getZoom();
                //如果增大到了13，则显示六边形图层
                if(zoomLevel == 13){
                    if(that.edit_op || that.modify_op){
                        if(that.layer_base == null) that.drawHexagon();
                        else{
                            that.layer_base.addTo(that.amap);
                            that.layer_base.render();
                        }
                    }
                }
            },
            //添加新站点
            addNewStation(){
                let that = this;
                //先从已有站点里搜索
                let index = -1;
                for(let i = 0; i < that.stations_info.length; i++){
                    if(that.isNear(that.stations_info[i].center, that.current_station)){
                        index = i;
                        break;
                    }
                }
                //若该站点不存在，则添加到已有站点里
                if(index == -1){
                    that.stations_info.push({"center": that.current_station, "name": that.station_name, "type": that.station_type});
                }
                //否则读取该站点信息
                else{
                    that.stations_info[index].name = that.station_name;
                }
                //站点信息清空
                that.current_station = null;
                that.station_name = '';
                that.station_type = '';
            },
            //根据非按钮进行的地图缩放调整六边形网格
            justifyHex(e){
                let that = this;
                let zoomLevel = that.map.getZoom();
                if(zoomLevel > 12){
                    if(that.edit_op || that.modify_op){
                        if(that.layer_base == null) that.drawHexagon();
                        else{
                            that.layer_base.addTo(that.amap);
                            that.layer_base.render();
                        }
                    }
                }
                else{
                    if(that.edit_op || that.modify_op){
                        if(that.show_station){
                            that.hideStationInput();
                        }
                        that.layer_base.remove();
                    }
                }
            },
            //设置表格表头样式
            getHeader({ row, rowIndex }) {
                if (rowIndex == 0) {
                    return 'header'
                }
                else {
                    return 'subheader'
                }
            },
            //回到新建线路之前的状态
            clearData(){
                let that = this;
                that.station_cost = 0;
                that.total_cost = 0;
                that.vehicle_num = 0;
                that.vehicle_extra_cost = 0;
                that.staff_num = 0;
                that.staff_mean_cost = 0;
                that.station_type_num = [0, 0];
                that.station_type_cost = [0, 0];
                that.valid_range = '';
                that.population = '';
                that.poi_num = 0;
                that.poi_list = [{type: "公共设施", num: 0, detail: []}, {type: "学校", num: 0, detail: []},
                    {type: "医院", num: 0, detail: []}, {type: "小区", num: 0, detail: []}];
                that.poi_select = [false, false, false, false];
                that.poi_group = [null, null, null, null];
                that.points = [];
                that.stations = [];
                that.lines = [];
                that.paths = [];
                that.stations_info = [];
                that.station_name = '';
                that.show_station = false;
                that.station_type = '';
                that.current_station = null;
                that.station_map = [];
                //that.center_visit = [];
                that.layer_cut = null;
                that.cut_pos = null;
                that.cut_flow_current = 0;
                that.cut_flow_transfer = 0;
                if(that.amap != null) that.amap = null;
                if(that.layer_base != null){
                    that.layer_base.destroy();
                    that.layer_base = null;
                }
                if(that.layer_station != null){
                    that.layer_station.destroy();
                    that.layer_station = null;
                }
                if(that.layer_point != null){
                    that.layer_point.destroy();
                    that.layer_point = null;
                }
                if(that.layer_line != null){
                    that.layer_line.destroy();
                    that.layer_line = null;
                }
                if(that.layer_cut != null){
                    that.layer_cut.destroy();
                    that.layer_cut = null;
                }
                if(that.layer_point_another != null){
                    that.layer_point_another.destroy();
                    that.layer_point_another = null;
                }
                if(that.layer_line_another != null){
                    that.layer_line_another.destroy();
                    that.layer_line_another = null;
                }
                if(that.layer_station_another != null){
                    that.layer_station_another.destroy();
                    that.layer_station_another = null;
                }
            },
            nearestCenter(pos){
              let that = this;
              let stop = null;
              let init = 9999999;
              for(let i = 0; i < that.centers.length; i++){
                  let cur = new AMap.LngLat(pos.lng, pos.lat);
                  let center = new AMap.LngLat(that.centers[i].center[0], that.centers[i].center[1]);
                  let dis = cur.distance(center);
                  // && !that.center_visit[i]
                  if(dis < init){
                      init = dis;
                      stop = {'center': [center.lng, center.lat], 'index': i};
                  }
              }
              //that.center_visit[stop.index] = true;
              return stop;
            },
            getDis(pos1, pos2){
                return new AMap.LngLat(pos1[0], pos1[1]).distance(new AMap.LngLat(pos2[0], pos2[1]));
            },
            lineSearch_Callback(data){
                let that = this;
                let lineArr = data.lineInfo;
                let lineNum = data.lineInfo.length;
                if (lineNum == 0) {
                }
                else {
                    let line = null;
                    // 上行返回搜索第一条结果
                    if(that.line_direction == '上行'){
                        line = lineArr[0];
                    }
                    // 反之返回第二条
                    else{
                        line = lineArr[1];
                    }
                    if(line){
                        let pathArr = line.path;
                        let stops = line.via_stops;
                        // 统计站点在途径点的索引
                        let j = 0;
                        for(let i = 0; i < stops.length; i++){
                            while(j < pathArr.length){
                                if(stops[i].location.lat == pathArr[j].lat &&
                                    stops[i].location.lng == pathArr[j].lng){
                                    that.station_map.push([i, j]);
                                    j += 1;
                                    break;
                                }
                                j += 1;
                            }
                        }
                        let last = 0;
                        let station_index = 0;
                        let interval = 8;
                        //let radius = 500;
                        // 找到距离途径点最近的六边形中心，为优化显示效果，间隔为8，更新站点途径点映射
                        for(let i = 0; i < pathArr.length; i++){
                            if(i == that.station_map[station_index][1]){
                                let current = that.nearestCenter(pathArr[i]);
                                that.points.push(current);
                                that.paths.push(current.center);
                                that.station_map[station_index].push(that.points.length - 1);
                                station_index += 1;
                                last = i;
                            }
                            else if(i == last + interval){
                                let current = that.nearestCenter(pathArr[i]);
                                that.points.push(current);
                                that.paths.push(current.center);
                                last = i;
                            }
                        }
                        // 绘制途径点图层
                        that.layer_point.setData(that.points, {
                            type: 'json',
                            lnglat: 'center'
                        });
                        that.layer_point.render();
                        // 按途径点生成线路图层
                        for(let i = 0; i < that.points.length - 1; i++){
                            that.lines.push({'line': [that.points[i].center[0] + "," + that.points[i].center[1], that.points[i + 1].center[0] + "," +that.points[i + 1].center[1]]});
                        }
                        that.layer_line.setData(that.lines, {
                            lnglat: 'line'
                        });
                        that.layer_line.render();
                        // for(let i = 0; i < that.centers.length; i++){
                        //     that.center_visit[i] = false;
                        // }
                        // 找到距离站点最近的六边形中心
                        for(let i = 0; i < stops.length; i++){
                            let just = that.points[that.station_map[i][2]]
                            that.stations.push(just);
                            that.stations_info.push({"center": just.center, "name": stops[i].name, "type": 1});
                        }
                        // 绘制站点图层
                        that.layer_station.setData(that.stations, {
                            type: 'json',
                            lnglat: 'center'
                        });
                        that.layer_station.render();
                    }
                }
            },
            //编辑线路
            editLine(){
                let that = this;
                if(that.line_name == '' || that.line_direction == ''){
                    that.$message({
                        showClose: true,
                        message: '请填写线路名称和方向',
                        type: 'error'
                    });
                }
                else{
                    // 清空数据，判断缩放等级
                    that.clearData();
                    that.modify_op = true;
                    that.op_type = 0;
                    if(that.map.getZoom() > 12){
                        that.drawHexagon();
                    }
                    else{
                        that.$message({
                            showClose: true,
                            message: '放大地图以进行操作',
                            type: 'warning'
                        });
                    }
                    // 借用 API 搜索已有线路
                    AMap.plugin(["AMap.LineSearch"], function(){
                        let linesearch = new AMap.LineSearch({
                            pageIndex: 1, //页码，默认值为1
                            pageSize: 10, //单页显示结果条数，默认值为20，最大值为50
                            city: "苏州", //限定查询城市，可以是城市名（中文/中文全拼）、城市编码，默认值为『全国』
                            extensions: "all" //是否返回公交线路详细信息，默认值为『base』
                        });
                        linesearch.search(that.line_name, function(status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                that.lineSearch_Callback(result);
                            }
                        });
                    });
                    /*
                    that.$http.get('http://118.25.99.80:9001/edit_line/load',
                        {
                            params: {
                                line_name: that.line_name,
                                direction: that.line_direction
                            }
                        }).then(function (res){
                        if(res.data.is_exist){
                            that.modify_op = true;
                            that.op_type = 0;
                            that.clearData();
                            // let points = res.data.paths;
                            // for(let i = 0; i < points.length - 1; i++){
                            //     that.lines.push({'line': [points[i][0] + "," + points[i][1], points[i + 1][0] + "," + points[i + 1][1]]});
                            // }
                            // let stations = res.data.stations;
                            // that.stations_info = stations;
                            // for(let i = 0; i < stations.length; i++){
                            //     that.stations.push({'center': stations[i].center});
                            // }
                            that.vehicle_num = res.data.vehicle_num;
                            that.vehicle_extra_cost = res.data.vehicle_extra_cost;
                            that.staff_num = res.data.staff_num;
                            that.staff_mean_cost = res.data.staff_mean_cost;
                            that.station_cost = res.data.station_cost;
                            that.total_cost = res.data.total_cost;
                            that.valid_range = res.data.coverage;
                            that.poi_list = res.data.POI;
                            if(that.map.getZoom() > 12){
                                that.drawHexagon();
                            }
                            //缩放等级不足13
                            else {
                                that.$message({
                                    showClose: true,
                                    message: '放大地图以进行操作',
                                    type: 'warning'
                                });
                            }

                        }
                        //线路不存在
                        else{
                            that.$message({
                                showClose: true,
                                message: '该线路不存在',
                                type: 'error'
                            });
                        }
                    }, function(){
                        console.log('请求发送失败');
                    });*/
                }
            },
            //是否在不同数据源可以看作同一个点
            isNear(center, pos){
                let rec = new AMap.LngLat(center[0], center[1]);
                let cur = new AMap.LngLat(pos[0], pos[1]);
                return rec.distance(cur) <= 50;
            },
            //填充已建站点信息
            fillInput(){
                let that = this;
                //从站点信息中查找该站点，如果存在，则填充输入框
                let index = -1;
                for(let i = 0; i < that.stations_info.length; i++){
                    if(that.isNear(that.stations_info[i].center, that.current_station)){
                        index = i;
                        that.station_name = that.stations_info[i].name;
                        for(let j = 0; j < that.station_types.length; j++){
                            if(that.stations_info[i].type == that.station_types[j].type){
                                that.station_type = that.station_types[j].name;
                            }
                        }
                        break;
                    }
                }
                //如果未找到，清空填写的站点信息
                if(index == -1){
                    that.station_name = '';
                    that.station_type = '';
                }
                return index
            },
            //绘制六边形
            drawHexagon(){
                // 每放大一级，距离缩短一倍
                //console.log(new AMap.LngLat(120.569961,31.354602).distance(new AMap.LngLat(120.572664,31.353283)));
                let that = this;
                // let init = [120.1, 31.1, 121.1, 30.8];
                // let left_top = new AMap.LngLat(init[0], init[1]);
                // let right_top =  new AMap.LngLat(init[2], init[1]);
                // let left_bottom = new AMap.LngLat(init[0], init[3]);
                // let right_bottom =  new AMap.LngLat(init[2], init[3]);
                // let radius = 0.5;
                // let times = radius / 0.3;
                // let dy = radius * 3;
                // let dx = radius * Math.sin(Math.PI / 3);
                // that.centers = [];
                // let xnum = Math.floor(Math.round(left_top.distance(right_top)/1000) / dx) * times + 1;
                // let ynum = Math.floor(Math.round(left_top.distance(left_bottom)/1000) / dy) * times + 1;
                // for(let i = 0; i < xnum; i++) {
                //   for (let j = 0; j < ynum; j++) {
                //     let point = [];
                //     if (i % 2 == 0) {
                //       point[0] = init[0] + (360 / (Math.sin(Math.PI / 3) * 2 * Math.PI * 6357 * times)) * i * dx;
                //       point[1] = init[1] - (180 / (Math.PI * 6357 * times)) * j * dy;
                //     }
                //     else {
                //       point[0] = init[0] + (360 / (Math.sin(Math.PI / 3) * 2 * Math.PI * 6357 * times)) * i * dx;
                //       point[1] = init[1] - (180 / (Math.PI * 6357 * times)) * (j + 0.5) * dy;
                //     }
                //     that.centers.push({'center': point});
                //   }
                // }
                // console.log(JSON.stringify(that.centers));
                that.amap = Loca.create(that.map);
                //六边形地图层
                that.layer_base = Loca.visualLayer({
                    eventSupport: true,
                    container: that.amap,
                    type: 'point',
                    shape: 'hexagon',
                    zIndex: '100'
                });
                //站点层
                that.layer_station = Loca.visualLayer({
                    eventSupport: true,
                    container: that.amap,
                    type: 'point',
                    shape: 'circle',
                    zIndex: '105'
                });
                //线路途径点层
                that.layer_point = Loca.visualLayer({
                    eventSupport: true,
                    container: that.amap,
                    type: 'point',
                    shape: 'circle',
                    zIndex: '110'
                });
                //线路层
                that.layer_line = Loca.visualLayer({
                    eventSupport: true,
                    container: that.amap,
                    blendMode: 'lighter',
                    type: 'line',
                    shape: 'line',
                    zIndex: '105'
                });
                //截断点层
                that.layer_cut = Loca.visualLayer({
                    eventSupport: true,
                    container: that.amap,
                    type: 'point',
                    shape: 'circle',
                    zIndex: '115'
                });
                //设置六边形底图数据
                that.layer_base.setData(that.centers, {
                    type: 'json',
                    lnglat: 'center'
                });
                //设置六边形底图图层样式
                that.layer_base.setOptions({
                    unit: 'meter',
                    style: {
                        radius: '300',
                        fill: '#1D2A45',
                        stroke: '#285166',
                        lineWidth: 1,
                        fillOpacity: 0.5
                    },
                    selectStyle: {
                        fill: '#296992'
                    }
                });
                //设置途径点图层样式
                that.layer_point.setOptions({
                    unit: 'meter',
                    style: {
                        radius: '40',
                        fill: '#FEF867',
                        lineWidth: 1,
                        fillOpacity: 1
                    },
                });
                //设置站点图层样式
                that.layer_station.setOptions({
                    unit: 'meter',
                    style: {
                        radius: '100',
                        fill: '#FEF867',
                        lineWidth: 1,
                        fillOpacity: 0.8
                    },
                });
                //设置线路图层样式
                that.layer_line.setOptions({
                    style: {
                        opacity: 1,
                        lineWidth: 3,
                        stroke: '#FEF867'
                    }
                });
                //设置截断点图层样式
                that.layer_cut.setOptions({
                    unit: 'meter',
                    style: {
                        radius: '150',
                        fill: '#FF0000',
                        lineWidth: 1,
                        fillOpacity: 0.9
                    },
                });
                //底图点击事件
                that.layer_base.on('click', function (ev) {
                    let rawData = ev.rawData;
                    //若为新建线路途径点
                    if(that.op_type == 0){
                        if(that.map.lngLatToContainer(rawData.center).y > 50 && that.map.lngLatToContainer(rawData.center).x > 100){
                            that.points.push(rawData);
                            that.paths.push(rawData.center);
                        }
                        //重新渲染途径点和线的图层
                        that.layer_point.setData(that.points, {
                            type: 'json',
                            lnglat: 'center'
                        });
                        that.layer_point.render();
                        if(that.points.length > 1){
                            that.lines = [];
                            for(let i = 0; i < that.points.length - 1; i++){
                                that.lines.push({'line': [that.points[i].center[0] + "," + that.points[i].center[1], that.points[i + 1].center[0] + "," +that.points[i + 1].center[1]]});
                            }
                            that.layer_line.setData(that.lines, {
                                lnglat: 'line'
                            });
                            that.layer_line.render();
                        }
                    }
                    //若为新建站点
                    if(that.op_type == 1){
                        that.show_station = true;
                        if(that.map.lngLatToContainer(rawData.center).y > 50 && that.map.lngLatToContainer(rawData.center).x > 100){
                            //如果前面有未保存的站点
                            if(that.current_station != null && that.stations.length > that.stations_info.length){
                                that.current_station = rawData.center;
                                //判断该点是否已建
                                let index =  that.fillInput();
                                //删去上一个未保存的站点
                                that.stations.pop();
                                //如果该点未建，加入到站点中
                                if(index == -1){
                                    that.stations.push(rawData);
                                }
                            }
                            //如果前面没有未保存的站点
                            else{
                                that.current_station = rawData.center;
                                let index =  that.fillInput();
                                //该点未建，加入到站点中
                                if(index == -1) that.stations.push(rawData);
                            }
                        }
                        //重新渲染站点图层
                        that.layer_station.setData(that.stations, {
                            type: 'json',
                            lnglat: 'center'
                        });
                        that.layer_station.render();
                        //调整站点信息输入框的位置
                        let pixel = that.map.lngLatToContainer(new AMap.LngLat(rawData.center[0], rawData.center[1]));
                        if(pixel.x > 160){
                            document.getElementById("station_panel").style.display = 'block';
                            document.getElementById("station_panel").style.top = (pixel.y - 140) + 'px';
                            document.getElementById("station_panel").style.left = (pixel.x - 160) + 'px';
                        }
                    }
                    //若为截断线路
                    if(that.op_type == 6){
                        that.cut_pos = null;
                        let index = null;
                        // 找到截断点在线路途径点中的索引
                        for(let i = 0; i < that.points.length; i++){
                            if(that.isNear(that.points[i].center, rawData.center)){
                                that.cut_pos = that.points[i];
                                index = i;
                            }
                            if(index != null){
                                break;
                            }
                        }
                        if(that.cut_pos != null){
                            that.processCut(index);
                        }
                    }
                });
                that.layer_base.render();
            },
            //隐藏站点信息输入框
            hideStationInput(){
                let that = this;
                that.show_station = false;
            },
            //点击新建线路按钮
            drawLine(){
                let that = this;
                //如果为新建或编辑模式则生效
                if(that.edit_op || that.modify_op){
                    that.hideStationInput();
                    that.op_type = 0;
                }
            },
            //点击新建站点按钮
            drawCircle(){
                let that = this;
                //如果为新建或编辑模式则生效
                if(that.edit_op || that.modify_op){
                    that.hideStationInput();
                    that.op_type = 1;
                }
            },
            saveLine(){
                let that = this;
                // 如果最后一个站点未填信息点击了保存，将该站点删去
                if(that.current_station != null && that.stations.length > that.stations_info.length){
                    that.stations.pop();
                    that.layer_station.setData(that.stations, {
                        type: 'json',
                        lnglat: 'center'
                    });
                    that.layer_station.render();
                }
                let each_station_cost = [];
                //统计每个站点类型的站点数
                for(let i = 0; i < that.stations_info.length; i++){
                    that.station_type_num[that.stations_info[i].type - 1] += 1;
                }
                //统计每个类型站点的站点成本
                for(let i = 0; i < that.station_types.length; i++){
                    each_station_cost.push({"type": that.station_types[i].type, "cost": that.station_type_cost[i], "num": that.station_type_num[i]})
                }

                that.poi_select = [false, false, false, false];
                that.poi_group = [null, null, null, null];

                //poi search
                AMap.plugin(["AMap.PlaceSearch"], function() {
                    //构造地点查询类，查询每个站点每一类的POI数
                    for(let i = 0; i < that.stations_info.length; i++){
                        for(let j = 0; j < that.types.length; j++){
                            let placeSearch = new AMap.PlaceSearch({
                                type: that.types[j], // 兴趣点类别
                                pageSize: 50, // 单页显示结果条数
                                pageIndex: 1, // 页码
                                city: "苏州", // 兴趣点城市
                                citylimit: true,  //是否强制限制在设置的城市内搜索
                                //map: that.map, // 展现结果的地图实例
                                autoFitView: false, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                                showCover: false
                            });
                            let cpoint = that.stations_info[i].center; //中心点坐标
                            placeSearch.searchNearBy(that.keywords[j], cpoint, 500, function(status, result) {
                                if(status == "complete"){
                                    let res = result.poiList.pois;
                                    for(let k = 0; k < res.length; k++){
                                        that.poi_num += 1;
                                        that.poi_list[j].num += 1;
                                        that.poi_list[j].detail.push({"name": res[k].name, "location": [res[k].location.lng, res[k].location.lat]});
                                    }
                                }
                            });

                        }
                    }
                });
                if(that.cut_pos != null){
                    that.$http.get('http://118.25.99.80:9001/modify/truncation',
                        {
                            params: {
                                line_name: that.line_name,
                                direction: that.line_direction,
                                cutoff_point: that.cut_pos.center,
                                vehicle_num: that.vehicle_num,
                                vehicle_extra_cost: that.vehicle_extra_cost,
                                staff_num: that.staff_num,
                                staff_mean_cost: that.staff_mean_cost,
                                each_station_cost: each_station_cost,
                                stations: that.stations_info,
                                paths: that.paths
                            }
                        }).then(function (res){
                        that.station_cost = res.data.station_cost;
                        that.total_cost = res.data.total_cost;
                        that.valid_range = res.data.coverage;
                        that.population = res.data.population;
                        that.cut_flow_current = res.data.flow_current;
                        that.cut_flow_transfer = res.data.flow_transfer;
                    }, function(){
                        console.log('请求发送失败');
                    });
                }
                /*
                //save line name, line direction and latitude of line

                if(that.modify_op){
                  that.$http.get('http://118.25.99.80:9001/edit_line/create',
                      {
                          params: {
                              line_name: that.line_name,
                              direction: that.line_direction,
                              vehicle_num: that.vehicle_num,
                              vehicle_extra_cost: that.vehicle_extra_cost,
                              staff_num: that.staff_num,
                              staff_mean_cost: that.staff_mean_cost,
                              each_station_cost: each_station_cost,
                              stations: that.stations_info,
                              paths: that.paths
                          }
                      }).then(function (res){
                     that.station_cost = res.data.station_cost;
                     that.total_cost = res.data.total_cost;
                     that.valid_range = res.data.coverage;
                     that.population = res.data.population;
                  }, function(){
                     console.log('请求发送失败');
                  });
                  that.line_name = '';
                  that.line_direction = '';
                  that.edit_op = false;
                  that.hideStationInput();
                  that.layer_base.destroy();

                }
                that.op_type = -1;

                 */
            },
            //进入预览模式
            viewMap(){
                let that = this;
                if(that.edit_op || that.modify_op){
                    that.edit_op = false;
                    that.modify_op = false;
                    that.hideStationInput();
                }
                if(that.layer_base) that.layer_base.remove();
                that.op_type = 2;
                that.view_op = true;
            },
            //进入编辑模式
            editMap(){
                let that = this;
                //如果目前是预览模式
                if(that.view_op){
                    //显示底图
                    if(that.layer_base){
                        that.layer_base.addTo(that.amap);
                        that.layer_base.render();
                    }
                    else{
                        that.drawHexagon();
                    }
                    that.modify_op = true;
                    that.op_type = 3;
                }
            },
            //poi搜索
            poiSelect(num){
                let that = this;
                //改变按钮状态
                that.poi_select[num] = !that.poi_select[num];
                //选中
                if(that.poi_select[num]){
                    //如果该类别poi覆盖物组不存在，则创建
                    if(that.poi_group[num] == null){
                        let markers = [];
                        for(let i = 0; i < that.poi_list[num].detail.length; i++){
                            let ele = that.poi_list[num].detail[i];
                            let pos = ele.location;
                            let marker = new AMap.Marker({
                                position: new AMap.LngLat(pos[0], pos[1]),
                                icon: new AMap.Icon({
                                    image: that.poi_icon_src[num],
                                    imageSize: new AMap.Size(20, 20),
                                    size: new AMap.Size(20, 20)
                                }),
                                extData: {
                                    name: ele.name
                                }
                            });
                            //鼠标移过会显示标签
                            marker.setTitle(ele.name);
                            markers.push(marker);
                        }
                        that.poi_group[num] = new AMap.OverlayGroup(markers);
                        that.map.add(that.poi_group[num]);
                    }
                    //存在，则显示覆盖物组
                    else{
                        that.map.add(that.poi_group[num]);
                    }
                }
                //取消选中，地图移除相关poi覆盖物
                else{
                    that.map.remove(that.poi_group[num]);
                }
                //强制更新
                that.$forceUpdate();
            }
        }
    }
</script>

<style scoped>
  .edit_line_panel{
    position: relative;
  }
  #container{
    width: 90%;
    float: right;
  }
  .white{
    color: #fff;
  }
  .op_panel{
    width: 420px;
    height: 160px;
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 100;
  }
  .op_bar{
    width: 400px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1B7189;
    line-height: 40px;
    font-size: 80%;
    padding: 0 10px;
  }
  .op_title{
    float: left;
    margin-left: 10px;
  }
  .op_button{
    height: 20px;
    width: 50px;
    padding: 1px 10px;
    line-height: 20px;
    background-color: #17627C;
    border-radius: 2px;
  }
  .op_button_disable{
    cursor: not-allowed;
  }
  .op_button_inactive{
    color: #1E2C43;
    border: 1px #1E2C43 solid;
  }
  .op_button_active{
    color: #21CEFA;
    border: 1px #21CEFA solid;
    cursor: pointer;
  }
  .create{
    position: absolute;
    top: 6px;
    right: 90px;
  }
  .new{
    position: absolute;
    top: 6px;
    right: 170px;
  }
  .add{
    position: absolute;
    top: 6px;
    right: 10px;
  }
  .op_content{
    width: 400px;
    height: 155px;
    position: absolute;
    top: 40px;
    left: 0;
    background-color: rgba(21, 59, 78, 0.7);
    padding: 10px;
    font-size: 80%;
  }
  .op_bgc{
    width: 46px;
    height: 46px;
    padding: 5px;
    background-color: rgba(20, 71, 94, 0.5);
    cursor: pointer;
    border: 1px #1E2C43 solid;
    border-radius: 4px;
  }
  .op_bgc_selected{
    width: 46px;
    height: 46px;
    padding: 5px;
    background-color: rgba(37, 114, 158, 0.5);
    border: 1px #21CEFA solid;
    border-radius: 4px;
  }
  .op_icon{
    width: 46px;
    height: 46px;
  }
  .op_station{
    display: none;
    width: 200px;
    height: 105px;
    position: absolute;
    top: 10px;
    left: 40px;
    background-color: rgba(21, 59, 78, 0.7);
    z-index: 300;
  }
  .edit_title{
    width: 180px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1B7189;
    line-height: 30px;
    font-size: 60%;
    padding: 0 10px;
  }
  .title_name{
    float: left;
  }
  .station_confirm{
    position: absolute;
    top: 3px;
    right: 10px;
  }
  .name_label{
    font-size: 60%;
    color: #fff;
    position: absolute;
    left: 10px;
    top: 40px;
  }
  .station_input{
    position: absolute;
    right: 10px;
    top: 40px;
    width: 140px;
  }
  .type_label{
    font-size: 60%;
    color: #fff;
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
  .select_type{
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 140px;
    background-color: #152534;
  }
  .effect_panel{
    position: absolute;
    top: 285px;
    right: 50px;
    width: 420px;
    height: 200px;
    z-index: 100;
  }
  .form{
    position: absolute;
    top: 36px;
    left: 0;
    width: 380px;
    font-size: 80%;
  }
  .odd, .even{
    width: 100%;
    padding: 5px 20px;
  }
  .odd{
    background-color: rgba(8, 63, 82, 0.7);
  }
  .even{
    background-color: rgba(12, 54, 73, 0.7);
  }
  .left{
    display: inline-block;
    width: 20%;
    text-align: left;
  }
  .middle{
    display: inline-block;
    width: 35%;
    text-align: center;
  }
  .right{
    display: inline-block;
    width: 35%;
    text-align: right;
  }
  .label{
    color: #fff;
    font-size: 80%;
  }
  .effect_title{
    width: 400px;
    padding: 0 10px;
    height: 36px;
    position: absolute;
    top: 0;
    left: 0;
    float: left;
    line-height: 36px;
    background-color: #1B7189;
    font-size: 80%;
  }
  .detail_panel{
    position: absolute;
    top: 600px;
    right: 50px;
    width: 420px;
    height: 200px;
    z-index: 100;
  }
  .line{
    background: url('../../../static/icon/line.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .line_active{
    background: url('../../../static/icon/line_active.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .line_disable{
    background: url('../../../static/icon/line_disable.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: not-allowed;
  }
  .circle{
    background: url('../../../static/icon/circle.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .circle_active{
    background: url('../../../static/icon/circle_active.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .circle_disable{
    background: url('../../../static/icon/circle_disable.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: not-allowed;
  }
  .move{
    background: url('../../../static/icon/move.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .move_active{
    background: url('../../../static/icon/move_active.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .move_disable{
    background: url('../../../static/icon/move_disable.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: not-allowed;
  }
  .edit{
    background: url('../../../static/icon/edit.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .edit_active{
    background: url('../../../static/icon/edit_active.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .edit_disable{
    background: url('../../../static/icon/edit_disable.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: not-allowed;
  }
  .shrink{
    background: url('../../../static/icon/shrink.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .shrink_active{
    background: url('../../../static/icon/shrink_active.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .shrink_disable{
    background: url('../../../static/icon/shrink_disable.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: not-allowed;
  }
  .magnify{
    background: url('../../../static/icon/magnify.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .magnify_active{
    background: url('../../../static/icon/magnify_active.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .magnify_disable{
    background: url('../../../static/icon/magnify_disable.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: not-allowed;
  }
  .cut{
    background: url('../../../static/icon/cut.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .cut_active{
    background: url('../../../static/icon/cut_active.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .cut_disable{
    background: url('../../../static/icon/cut_disable.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: not-allowed;
  }
  .drag{
    background: url('../../../static/icon/drag.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .drag_active{
    background: url('../../../static/icon/drag_active.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .drag_disable{
    background: url('../../../static/icon/drag_disable.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: not-allowed;
  }
  .poi_icon{
    width: 20px;
    height: 20px;
    display: inline-block;
  }
  .public_selected{
    background: url('../../../static/icon/poi/public.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
  .public_normal{
    background: url('../../../static/icon/poi/public_white.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
  .school_selected{
    background: url('../../../static/icon/poi/book.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
  .school_normal{
    background: url('../../../static/icon/poi/book_white.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
  .hospital_selected{
    background: url('../../../static/icon/poi/hospital.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
  .hospital_normal{
    background: url('../../../static/icon/poi/hospital_white.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
  .house_selected{
    background: url('../../../static/icon/poi/house.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
  .house_normal{
    background: url('../../../static/icon/poi/house_white.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
</style>
