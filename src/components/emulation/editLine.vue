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
              <div title="绘制线路" v-bind:class="{'op_bgc': op_type != 0 || !modify_op, 'op_bgc_selected': op_type == 0 && modify_op}" v-on:click="drawLine()">
                <div title="绘制线路" v-bind:class="{'op_icon line_active': op_type == 0 && modify_op, 'op_icon line_disable': !modify_op, 'op_icon line': op_type != 0 && modify_op}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div title="编辑站点" v-bind:class="{'op_bgc': op_type != 1 || !modify_op, 'op_bgc_selected': op_type == 1 && modify_op}" v-on:click="drawCircle()">
                <div title="编辑站点" v-bind:class="{'op_icon circle_active': op_type == 1 && modify_op, 'op_icon circle_disable': !modify_op, 'op_icon circle': op_type != 1 && modify_op}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div title="预览线路" v-bind:class="{'op_bgc': op_type != 2 || !modify_op, 'op_bgc_selected': op_type == 2 && modify_op}" v-on:click="viewMap()">
                <div title="预览线路" v-bind:class="{'op_icon move_active': op_type == 2 && modify_op, 'op_icon move_disable': !modify_op, 'op_icon move': op_type != 2 && modify_op}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div title="编辑线路" v-bind:class="{'op_bgc': op_type != 3, 'op_bgc_selected': op_type == 3}" v-on:click="editMap()">
                <div title="编辑线路" v-bind:class="{'op_icon edit_active': op_type == 3 && !modify_op, 'op_icon edit_disable': (modify_op || (op_type != 3 && op_type != 2 && !modify_op)), 'op_icon edit': op_type != 3 && (op_type == 2)}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div title="缩小地图" v-bind:class="{'op_bgc': op_type != 4 || !modify_op, 'op_bgc_selected':  op_type == 4 && (modify_op || op_type == 3)}" v-on:click="zoomOut()">
                <div title="缩小地图" v-bind:class="{'op_icon shrink_active': op_type == 4 && (modify_op || op_type == 3), 'op_icon shrink': op_type != 4 }"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div title="放大地图" v-bind:class="{'op_bgc': op_type != 5 || !modify_op, 'op_bgc_selected': op_type == 5 && (modify_op || op_type == 3)}" v-on:click="zoomIn()">
                <div title="放大地图" v-bind:class="{'op_icon magnify_active': op_type == 5 && (modify_op || op_type == 3), 'op_icon magnify': op_type != 5 }"></div>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding: 0 5px; margin-top: 5px;">
            <el-col :span="4">
              <div title="截断线路" v-bind:class="{'op_bgc': op_type != 6 || (!modify_op), 'op_bgc_selected': op_type == 6 && modify_op}" v-on:click="cutLine()">
                <div title="截断线路" v-bind:class="{'op_icon cut_active': op_type == 6 && modify_op, 'op_icon cut_disable': !modify_op, 'op_icon cut': op_type != 6 && modify_op}"></div>
              </div>
            </el-col>
            <el-col :span="4">
              <div title="移动站点" v-bind:class="{'op_bgc': op_type != 7 || (!modify_op), 'op_bgc_selected': op_type == 7 && modify_op}" v-on:click="dragCircle()">
                <div title="移动站点" v-bind:class="{'op_icon drag_active': op_type == 7 && modify_op, 'op_icon drag_disable': !modify_op, 'op_icon drag': op_type != 7 && modify_op}"></div>
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
          <span v-bind:class="{'op_button station_remove op_button_inactive': (station_name == '' || station_type == ''), 'op_button station_remove op_button_active': (station_name != '' && station_type != '') }" v-on:click="removeStation">删除</span>
          <span v-bind:class="{'op_button station_confirm op_button_inactive': (station_name == '' || station_type == '' || current_station == null), 'op_button station_confirm op_button_active': (station_name != '' && station_type != '') && (current_station != null)}" v-on:click="addNewStation">确认</span>
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
        <span class="insert_label">插入至</span>
        <el-select v-model="station_order" class="select_order" clearable placeholder="仅新增时使用">
          <el-option
            v-for="item in station_orders"
            :key="item.order"
            :label="item.name"
            :value="item.order">
          </el-option>
        </el-select>
        <span class="insert_label_app">后</span>
      </div>
      <div class="white effect_panel">
        <div class="effect_title"><span class="white op_title">成本测算</span>
          <span v-bind:class="{'op_button add op_button_inactive op_button_disable': !modify_op, 'op_button add op_button_active': modify_op}" v-on:click="saveLine()">计算</span>
        </div>
        <div class="form">
          <div class="odd">
            <div class="left">
              <span class="label">车辆成本测算</span>
            </div>
            <div class="middle">
              <span class="label">车辆数</span>
            </div>
            <div class="right">
              <span class="label">车辆成本（万元/每车每年）</span>
            </div>
          </div>
          <div class="even">
            <div class="left">
              <span class="label"></span>
            </div>
            <div class="middle" style="position: relative;">
              <span style="position: absolute; top:0; right: 30px; z-index: 100;" id="vc">{{vehicle_change}}</span>
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
              <span class="label">平均成本（万元/每人每年）</span>
            </div>
          </div>
          <div class="even">
            <div class="left">
              <span class="label"></span>
            </div>
            <div class="middle" style="position: relative;">
              <span style="position: absolute; top:0; right: 30px; z-index: 100;" id="sc">{{staff_change}}</span>
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
            <div class="middle" style="position: relative;">
              <span class="label">{{station_type_num[index]}}</span>
              <span style="position: absolute; top:0; right: 30px; z-index: 100;" :id="'stnc' + index">{{station_type_num_change[index]}}</span>
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
              <span id="scc">{{station_cost_change}}</span>
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
              <span id="tcc">{{total_cost_change}}</span>
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
            <div class="left" style="width: 35%">
              <span class="label">有效覆盖范围(平方千米)</span>
            </div>
            <div class="middle">
            </div>
            <div class="right" style="width: 20%">
              <span class="label">{{valid_range}}</span>
              <span id="vrc">{{valid_range_change}}</span>
            </div>
          </div>
          <div class="even">
            <div class="left" style="width: 35%">
              <span class="label">人口数量(万人)</span>
            </div>
            <div class="middle">
            </div>
            <div class="right" style="width: 20%">
              <span class="label">{{population}}</span>
              <span id="pc">{{population_change}}</span>
            </div>
          </div>
          <div class="odd">
            <div class="left">
              <span class="label">POI数量</span>
            </div>
            <div class="middle" style="width: 55%"></div>
            <div class="right" style="width: 15%">
              <span class="label">{{poi_num}}</span>
              <span id="pnc">{{poi_num_change}}</span>
            </div>
          </div>
          <div class="even">
            <div class="left" style="width: 0%"></div>
            <div class="middle" style="width: 100%">
              <el-row>
                <el-col :span="6">
                  <div v-bind:class="{'poi_icon public_selected': poi_select[0], 'poi_icon public_normal': !poi_select[0]}" v-on:click="poiSelect(0)"></div>
                  <span>{{poi_list[0].num}}</span>
                  <span id="plc0">{{poi_list_change[0].num}}</span>
                </el-col>
                <el-col :span="6">
                  <div v-bind:class="{'poi_icon school_selected': poi_select[1], 'poi_icon school_normal': !poi_select[1]}" v-on:click="poiSelect(1)"></div>
                  <span>{{poi_list[1].num}}</span>
                  <span id="plc1">{{poi_list_change[1].num}}</span>
                </el-col>
                <el-col :span="6">
                  <div v-bind:class="{'poi_icon hospital_selected': poi_select[2], 'poi_icon hospital_normal': !poi_select[2]}" v-on:click="poiSelect(2)"></div>
                  <span>{{poi_list[2].num}}</span>
                  <span id="plc2">{{poi_list_change[2].num}}</span>
                </el-col>
                <el-col :span="6">
                  <div v-bind:class="{'poi_icon house_selected': poi_select[3], 'poi_icon house_normal': !poi_select[3]}" v-on:click="poiSelect(3)"></div>
                  <span>{{poi_list[3].num}}</span>
                  <span id="plc3">{{poi_list_change[3].num}}</span>
                </el-col>
              </el-row>
            </div>
            <div class="right" style="width: 0%"></div>
          </div>
        </div>
      </div>
      <div class="white flow_panel" v-show="cutFlow">
        <div class="flow_title">
          <span class="white op_title">客流变化</span>
        </div>
        <div class="form" style="width: 240px;">
          <div class="odd">
            <div class="left" style="width: 55%">
              <span class="label">原线路客流（人/每日）</span>
            </div>
            <div class="right" style="width: 40%">
              <span class="label">{{flow_prev}}</span>
            </div>
          </div>
          <div class="even">
            <div class="left" style="width: 55%">
              <span class="label">截断后客流（人/每日）</span>
            </div>
            <div class="right" style="width: 40%">
              <span class="label">{{flow_current}}</span>
            </div>
          </div>
          <div class="odd">
            <div class="left" style="width: 55%">
              <span class="label">客流下降（人/每日）</span>
            </div>
            <div class="right" style="width: 40%">
              <span class="label">{{flow_decrease}}</span>
            </div>
          </div>
          <div class="even">
            <div class="left" style="width: 55%">
              <span class="label">对换乘线路客流影响</span>
            </div>
            <div class="right" style="width: 40%">
              <span class="label">{{flow_impact}}</span>
            </div>
          </div>
          <div class="odd">
            <div class="left" style="width: 55%">
              <span class="label">原始线路客流影响比例</span>
            </div>
            <div class="right" style="width: 40%">
              <span class="label">{{flow_rate}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="white flow_panel" v-show="editFlow">
        <div class="flow_title">
          <span class="white op_title">客流变化</span>
        </div>
        <div class="form" style="width: 240px;">
          <div class="odd">
            <div class="left" style="width: 55%">
              <span class="label">原线路客流（人/每日）</span>
            </div>
            <div class="right" style="width: 40%">
              <span class="label">{{flow_prev}}</span>
            </div>
          </div>
          <div class="even">
            <div class="left" style="width: 55%">
              <span class="label">调整后客流（人/每日）</span>
            </div>
            <div class="right" style="width: 40%">
              <span class="label">{{flow_current}}</span>
            </div>
          </div>
          <div class="odd">
            <div class="left" style="width: 55%">
              <span class="label">客流下降（人/每日）</span>
            </div>
            <div class="right" style="width: 40%">
              <span class="label">{{flow_decrease}}</span>
            </div>
          </div>
          <div class="even">
            <div class="left" style="width: 55%">
              <span class="label">原始线路客流影响比例</span>
            </div>
            <div class="right" style="width: 40%">
              <span class="label">{{flow_rate}}</span>
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
    import grids from '../small_grids.json'
    import structure from '../structure.json'
    export default {
        name: "editLine",
        components: {
            navBar: navBar,
            banner: banner
        },
        data(){
            return{
                map: null, //地图
                line_name: '38', //线路名称
                line_direction: '上行', //线路方向
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
                vehicle_extra_cost: 12, //额外车辆成本
                staff_num: 0, //人员数量
                staff_mean_cost: 10, //人员平均成本
                station_type_num: [0, 0], //站点类型数量
                station_type_cost: [20, 40], //站点类型成本
                valid_range: 0,  //有效覆盖范围
                population: 0, //人口数量
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
                cut_flow_transfer: 0,
                station_index: -1,
                move_status: 0, // 0 为选择要移动的站点，1 为选择移动后的站点，-1 为选择要移动的站点有误
                new_station: null,
                station_order: '',
                station_orders: [],
                potential_lines: [null, null, null],
                cuts: [],
                vehicle_change: '',
                staff_change: '',
                station_type_num_change: ['', ''],
                station_cost_change: '',
                total_cost_change: '',
                valid_range_change: '',
                population_change: '',
                poi_list_change: [
                    {
                        type: "公共设施",
                        num: '',
                        detail: []
                    },
                    {
                        type: "学校",
                        num: '',
                        detail: []
                    },
                    {
                        type: "医院",
                        num: '',
                        detail: []
                    },
                    {
                        type: "小区",
                        num: '',
                        detail: []
                    }
                ],
                poi_num_change: '',
                vehicle_last: 0,
                staff_last: 0,
                station_type_num_last: [0, 0],
                station_cost_last: 0,
                total_cost_last: 0,
                valid_range_last: 0,
                population_last: 0,
                poi_list_last: [
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
                poi_num_last: 0,
                each_station_cost: [],
                cutFlow: false,
                editFlow: false,
                flow_prev: 0,
                flow_current: 0,
                flow_decrease: 0,
                flow_impact: 0,
                flow_rate: 0
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
                center: [120.60, 31.27],
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
            recordData(){
                let that = this;
                that.vehicle_last = that.vehicle_num;
                that.staff_last = that.staff_num;
                that.station_type_num_last = that.station_type_num;
                that.station_cost_last = that.station_cost;
                that.total_cost_last = that.total_cost;
                that.valid_range_last = that.valid_range;
                that.population_last = that.population;
            },
            processAttr(num){
                let res = '', color = '';
                if(num == 0){
                    res = ' -';
                    color = '#ffffff';
                }
                else if(num > 0){
                    res = ' +' + num;
                    color = '#ff0000';
                }
                else{
                    res = ' ' + num;
                    color = '#00ff00';
                }
                return {str: res, color: color};
            },
            calDiff(){
                let that = this;
                that.vehicle_change = that.vehicle_num - that.vehicle_last;
                let vehicle_p = that.processAttr(that.vehicle_change);
                that.vehicle_change = vehicle_p.str;
                document.getElementById('vc').style.color = vehicle_p.color;
                that.staff_change = that.staff_num - that.staff_last;
                let staff_p = that.processAttr(that.staff_change);
                that.staff_change = staff_p.str;
                document.getElementById('sc').style.color = staff_p.color;
                for(let i = 0; i < 2; i++){
                    that.station_type_num_change[i] = that.station_type_num[i] - that.station_type_num_last[i];
                    let station_type_p = that.processAttr(that.station_type_num_change[i]);
                    that.station_type_num_change[i] = station_type_p.str;
                    document.getElementById('stnc' + i).style.color = station_type_p.color;
                }
                that.station_cost_change = that.station_cost - that.station_cost_last;
                let station_cost_p = that.processAttr(that.station_cost_change);
                that.station_cost_change = station_cost_p.str;
                document.getElementById('scc').style.color = station_cost_p.color;
                that.total_cost_change = that.total_cost - that.total_cost_last;
                let total_cost_p = that.processAttr(that.total_cost_change);
                that.total_cost_change = total_cost_p.str;
                document.getElementById('tcc').style.color = total_cost_p.color;
                that.valid_range_change = (that.valid_range - that.valid_range_last).toFixed(2);
                let valid_range_p = that.processAttr(that.valid_range_change);
                that.valid_range_change = valid_range_p.str;
                document.getElementById('vrc').style.color = valid_range_p.color;
                that.population_change = (that.population - that.population_last).toFixed(2);
                let population_p = that.processAttr(that.population_change);
                that.population_change = population_p.str;
                document.getElementById('pc').style.color = population_p.color;
            },
            removeCallBack(result, i, colors, via_points, index, prev, next){
                let that = this;
                via_points[i] = [];
                let arr = [];
                let info = result.routes[0].steps;
                for(let j = 0; j < info.length; j++){
                    let center = that.nearestCenter(info[j].start_location);
                    via_points[i].push(center);
                    arr.push(new AMap.LngLat(center.center[0], center.center[1]));
                    if(j == info.length - 1){
                        let end = that.nearestCenter(info[j].end_location);
                        via_points[i].push(end);
                        arr.push(new AMap.LngLat(end.center[0], end.center[1]));
                    }
                }
                that.potential_lines[i] = new AMap.Polyline({
                    map: that.map,
                    path: arr,
                    strokeColor: colors[i],//线颜色
                    strokeOpacity: 0.8,//线透明度
                    isOutline: true,
                    outlineColor:'white',
                    strokeWeight: 5, //线宽
                    zIndex: 120
                });
                that.potential_lines[i].on("click", function(){
                    for(let j = 0; j < 3; j++){
                        if(that.potential_lines[j] != null) that.potential_lines[j].hide();
                        that.potential_lines[j] = null;
                    }
                    that.points.splice(prev + 1, next - prev - 1);
                    that.lines.splice(prev, next - prev);
                    that.paths.splice(prev + 1, next - prev);
                    let start_index = prev;
                    for(let j = 0; j < via_points[i].length - 1; j++){
                        that.lines.splice(start_index, 0,
                            {'line': [via_points[i][j].center[0] + "," + via_points[i][j].center[1], via_points[i][j + 1].center[0] + "," + via_points[i][j + 1].center[1]]});
                        if(j > 0){
                            that.points.splice(start_index + 1, 0, via_points[i][j]);
                            that.paths.splice(start_index + 1, 0, via_points[i][j].center);
                        }
                        start_index += 1;
                    }
                    let add_points = via_points[i].length - 2;
                    for(let i = index + 1; i < that.station_map.length; i++){
                        that.station_map[i][1] += add_points - (next - prev - 1);
                        that.station_map[i][2] += add_points - (next - prev - 1);
                    }
                    // 从站点数组和信息数组中删去该站点
                    that.stations.splice(index, 1);
                    that.stations_info.splice(index, 1);
                    that.station_map.splice(index, 1);
                    that.renderLayer();
                });
            },
            // 删除站点
            removeStation(){
              let that = this;
              if(that.station_index == -1) return;
              // 如果是第一个点，points 和 paths 都从第二个点开始
              if(that.station_index == 0){
                  let point_index = that.station_map[that.station_index + 1][2];
                  that.points.splice(0, point_index);
                  that.lines.splice(0, point_index);
                  that.paths.splice(0, point_index);
                  for(let i = 1; i < that.station_map.length; i++){
                      that.station_map[i][1] -= point_index;
                      that.station_map[i][2] -= point_index;
                  }
                  that.stations.splice(that.station_index, 1);
                  that.stations_info.splice(that.station_index, 1);
                  that.station_map.splice(that.station_index, 1);
                  that.renderLayer();
              }
              // 如果是最后一个点，points 和 paths 都在前一个点结束
              else if(that.station_index == that.station_map.length - 1){
                  let point_index = that.station_map[that.station_index - 1][2];
                  let cur_index = that.station_map[that.station_index][2];
                  that.points.splice(point_index + 1, cur_index - point_index);
                  that.lines.splice(point_index, cur_index - point_index);
                  that.paths.splice(point_index + 1, cur_index - point_index);
                  // 从站点数组和信息数组中删去该站点
                  that.stations.splice(that.station_index, 1);
                  that.stations_info.splice(that.station_index, 1);
                  that.station_map.splice(that.station_index, 1);
                  that.renderLayer();
              }
              // 中间的点，让用户选择一条线路，最快捷(绿)，最经济则(紫)或最短距离(黄)
              else{
                  that.$message({
                      showClose: true,
                      message: '请点击以选择最佳路线',
                      type: 'warning'
                  });
                  let prev = that.station_map[that.station_index - 1][2];
                  let next = that.station_map[that.station_index + 1][2];
                  let prev_pos = that.stations[that.station_index - 1].center;
                  let next_pos = that.stations[that.station_index + 1].center;
                  let policies = [AMap.DrivingPolicy.LEAST_TIME, AMap.DrivingPolicy.LEAST_FEE, AMap.DrivingPolicy.LEAST_DISTANCE];
                  let colors = ["#00FF00", "#D28EFF", "#FFAA33"];
                  let via_points = [[], [], []];
                  for(let i = 0; i < 3; i++){
                      let driving = new AMap.Driving({
                          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                          policy: policies[i]
                      });

                      let startLngLat = prev_pos;
                      let endLngLat = next_pos;
                      let index = that.station_index;
                      driving.search(startLngLat, endLngLat, function (status, result) {
                          if (status === 'complete' && result.info === 'OK') {
                              that.removeCallBack(result, i, colors, via_points, index, prev, next);
                          }
                      });
                  }
              }
            },
            renderLayer(){
                let that = this;
                // 重新渲染站点图层
                that.layer_station.setData(that.stations, {
                    type: 'json',
                    lnglat: 'center'
                });
                that.layer_station.render();
                //重新渲染途径点和线的图层
                that.layer_point.setData(that.points, {
                    type: 'json',
                    lnglat: 'center'
                });
                that.layer_point.render();
                that.layer_line.setData(that.lines, {
                    lnglat: 'line'
                });
                that.layer_line.render();
                that.current_station = null;
                that.station_name = '';
                that.station_type = '';
            },
            // 截断线路
            cutLine(){
              let that = this;
              that.op_type = 6;
              that.add_station = false;
            },
            processCut(index){
                let that = this;
                that.cuts = [];
                that.cuts.push(that.cut_pos);
                // 绘制截断点
                that.layer_cut.setData(that.cuts, {
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
                let that = this;
                that.op_type = 7;
                that.show_station = false;
                that.$message({
                    showClose: true,
                    message: '选择要移动的站点',
                    type: 'warning'
                });
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
            insertStation(){
                let that = this;
                if(that.station_order == '') return;
                let cur_station = that.stations.pop();
                that.stations_info.splice(that.station_order + 1, 0,
                    {"center": cur_station.center, "name": that.station_name, "type": that.station_type});
                that.stations.splice(that.station_order + 1, 0, cur_station);
                let add_points = 0;
                let policies = [AMap.DrivingPolicy.LEAST_TIME, AMap.DrivingPolicy.LEAST_FEE, AMap.DrivingPolicy.LEAST_DISTANCE];
                let colors = ["#00FF00", "#D28EFF", "#FFAA33"];
                let via_points = [[], [], []];
                let prev = null, next = null;
                let startLngLat = null, endLngLat = null, via = {waypoints: []};
                // 成为第一个站点
                if(that.station_order == -1){
                    next = that.station_map[0][2];
                    startLngLat = cur_station.center;
                    endLngLat = that.stations[1].center;
                }
                // 最后一个站点
                else if(that.station_order == that.station_map.length - 1){
                    prev = that.station_map[that.station_map.length - 1][2];
                    startLngLat = that.stations[that.station_map.length - 1].center;
                    endLngLat = cur_station.center;
                }
                else{
                    prev = that.station_map[that.station_order][2];
                    next = that.station_map[that.station_order + 1][2];
                    startLngLat = that.stations[that.station_order].center;
                    endLngLat = that.stations[that.station_order + 2].center;
                    via.waypoints.push(cur_station.center);
                }
                for(let i = 0; i < 3; i++){
                    let driving = new AMap.Driving({
                        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                        policy: policies[i]
                    });

                    driving.search(startLngLat, endLngLat, via, function (status, result) {
                        via_points[i] = [];
                        let arr = [];
                        let info = result.routes[0].steps;
                        for(let j = 0; j < info.length; j++){
                            let center = that.nearestCenter(info[j].start_location);
                            via_points[i].push(center);
                            arr.push(new AMap.LngLat(center.center[0], center.center[1]));
                            if(j == info.length - 1){
                                let end = that.nearestCenter(info[j].end_location);
                                via_points[i].push(end);
                                arr.push(new AMap.LngLat(end.center[0], end.center[1]));
                            }
                        }
                        that.potential_lines[i] = new AMap.Polyline({
                            map: that.map,
                            path: arr,
                            strokeColor: colors[i],//线颜色
                            strokeOpacity: 0.8,//线透明度
                            isOutline: true,
                            outlineColor:'white',
                            strokeWeight: 5, //线宽
                            zIndex: 120
                        });
                        that.potential_lines[i].on("click", function(){
                            for(let j = 0; j < 3; j++){
                                if(that.potential_lines[j] != null) that.potential_lines[j].hide();
                                that.potential_lines[j] = null;
                            }
                            if(prev != null && next != null){
                                that.points.splice(prev + 1, next - prev - 1);
                                that.lines.splice(prev, next - prev);
                                that.paths.splice(prev + 1, next - prev - 1);
                            }
                            if(prev != null){
                                let start_index = prev;
                                let tag = 0;
                                for(let j = 0; j < via_points[i].length - 1; j++){
                                    if(tag == 0 && that.isNear(via_points[i][j].center, that.stations[that.station_order + 1].center)){
                                        that.station_map.splice(that.station_order + 1, 0, [that.station_order + 1, -1, prev + j]);
                                        tag = 1;
                                    }
                                    that.lines.splice(start_index, 0,
                                        {'line': [via_points[i][j].center[0] + "," + via_points[i][j].center[1], via_points[i][j + 1].center[0] + "," + via_points[i][j + 1].center[1]]});
                                    if(j > 0){
                                        that.points.splice(start_index + 1, 0, via_points[i][j]);
                                        that.paths.splice(start_index + 1, 0, via_points[i][j].center);
                                    }
                                    start_index += 1;
                                }
                                add_points = via_points[i].length - 2;
                                for(let i = that.station_order + 2; i < that.station_map.length; i++){
                                    that.station_map[i][0] += 1;
                                    that.station_map[i][2] += add_points - (next - prev - 1);
                                }
                            }
                            else{
                                that.points.splice(0, 0, cur_station);
                                that.paths.splice(0, 0, cur_station.center);
                                that.station_map.splice(0, 0, [0, -1, 0]);
                                let start_index = 0;
                                for(let j = 0; j < via_points[i].length - 1; j++){
                                    that.lines.splice(start_index, 0,
                                        {'line': [via_points[i][j].center[0] + "," + via_points[i][j].center[1], via_points[i][j + 1].center[0] + "," + via_points[i][j + 1].center[1]]});
                                    if(j > 0){
                                        that.points.splice(start_index + 1, 0, via_points[i][j]);
                                        that.paths.splice(start_index + 1, 0, via_points[i][j].center);
                                    }
                                    start_index += 1;
                                }
                                add_points = via_points[i].length - 1;
                                for(let i = that.station_order + 2; i < that.station_map.length; i++){
                                    that.station_map[i][0] += 1;
                                    that.station_map[i][2] += add_points;
                                }
                            }
                            that.renderLayer();
                        });
                    })
                }
            },
            //添加新站点
            addNewStation(){
                let that = this;
                that.add_station = false;
                if(that.station_name == '' || that.station_type == '') return;
                //先从已有站点里搜索
                let index = -1;
                for(let i = 0; i < that.stations_info.length; i++){
                    if(that.isNear(that.stations_info[i].center, that.current_station)){
                        index = i;
                        break;
                    }
                }
                //若该站点不存在
                if(index == -1){
                    let point_index = that.isOnLine({"center": that.current_station});
                    if(point_index == -1){
                        that.insertStation();
                        for(let i = that.station_order + 2; i < that.station_orders.length; i++){
                            that.station_orders[i].order += 1;
                        }
                        that.station_orders.splice(that.station_order + 2, 0, {'order': that.station_order + 1, 'name': that.station_name});
                    }
                    // 若在线路上
                    else{
                        let prev_station = -1;
                        for(let i = 0; i < that.station_map.length; i++){
                            if(that.station_map[i][2] > point_index){
                                prev_station = i - 1;
                                break;
                            }
                        }
                        let station = that.stations.pop();
                        that.stations.splice(prev_station + 1, 0, station);
                        that.station_map.splice(prev_station + 1, 0, [prev_station + 1, -1, point_index]);
                        that.stations_info.splice(prev_station, 0, {"center": that.current_station, "name": that.station_name, "type": that.station_type});
                        for(let i = prev_station + 2; i < that.station_map.length; i++){
                            that.station_map[i][0] += 1;
                        }
                        for(let i = prev_station + 2; i < that.station_orders.length; i++){
                            that.station_orders[i].order += 1;
                        }
                        that.station_orders.splice(prev_station + 2, 0, {'order': prev_station + 1, 'name': that.station_name});
                    }
                }
                //否则读取该站点信息
                else{
                    that.stations_info[index].name = that.station_name;
                }
                //站点信息清空
                that.current_station = null;
                that.station_order = '';
            },
            //根据非按钮进行的地图缩放调整六边形网格
            justifyHex(e){
                let that = this;
                let zoomLevel = that.map.getZoom();
                if(zoomLevel > 12){
                    if(that.modify_op){
                        if(that.layer_base == null) that.drawHexagon();
                        else{
                            that.layer_base.addTo(that.amap);
                            that.layer_base.render();
                        }
                    }
                }
                else{
                    if(that.modify_op){
                        if(that.show_station){
                            that.show_station = false;
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
                that.vehicle_extra_cost = 12;
                that.staff_num = 0;
                that.staff_mean_cost = 10;
                that.station_type_num = [0, 0];
                that.station_type_cost = [20, 40];
                that.valid_range = 0;
                that.population = 0;
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
                that.cut_pos = null;
                that.cuts = [];
                that.cut_flow_current = 0;
                that.cut_flow_transfer = 0;
                for(let i = 0; i < 3; i++){
                    if(that.potential_lines[i] != null) that.potential_lines[i].hide();
                    that.potential_lines[i] = null;
                }
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
                if(that.amap != null) that.amap = null;
                that.vehicle_change = '';
                that.staff_change = '';
                that.station_type_num_change = ['', ''];
                that.station_cost_change = '';
                that.total_cost_change = '';
                that.valid_range_change = '';
                that.population_change = '';
                that.poi_list_change = [
                {
                    type: "公共设施",
                    num: '',
                    detail: []
                },
                {
                    type: "学校",
                    num: '',
                    detail: []
                },
                {
                    type: "医院",
                    num: '',
                    detail: []
                },
                {
                    type: "小区",
                    num: '',
                    detail: []
                }];
                that.poi_num_change = '';
                that.vehicle_last = 0;
                that.staff_last = 0;
                that.station_type_num_last = [0, 0];
                that.station_cost_last = 0;
                that.total_cost_last = 0;
                that.valid_range_last = 0;
                that.population_last = 0;
                that.poi_list_last = [
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
                    }];
                that.poi_num_last = 0;
                that.cutFlow = false;
                that.editFlow = false;
                that.$forceUpdate();
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
                        let interval = 3;
                        //let radius = 100;
                        // 找到距离途径点最近的六边形中心，为优化显示效果，间隔为3，更新站点途径点映射
                        for(let i = 0; i < pathArr.length; i++){
                            let current = that.nearestCenter(pathArr[i]);
                            if(station_index < stops.length && i == that.station_map[station_index][1]){
                                that.points.push(current);
                                that.paths.push(current.center);
                                that.station_map[station_index].push(that.points.length - 1);
                                station_index += 1;
                                last = i;
                            }
                            else if(i == last + interval){
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
                            let just = that.points[that.station_map[i][2]];
                            that.stations.push(just);
                            that.stations_info.push({"center": just.center, "name": stops[i].name, "type": 1});
                        }
                        // 绘制站点图层
                        that.layer_station.setData(that.stations, {
                            type: 'json',
                            lnglat: 'center'
                        });
                        that.layer_station.render();
                        that.station_orders = [];
                        that.station_orders.push({'order': -1, 'name': '-'});
                        for(let i = 0; i < that.stations_info.length; i++){
                            that.station_orders.push({'order': i, 'name': that.stations_info[i].name});
                        }
                        that.saveLine(false);
                    }
                }
            },
            //编辑线路
            editLine(){
                let that = this;
                that.add_station = false;
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
                    if(that.line_name == '38' || that.line_name == '38路'){
                        that.points = JSON.parse(JSON.stringify(structure[0].points));
                        that.paths = JSON.parse(JSON.stringify(structure[0].paths));
                        that.lines = JSON.parse(JSON.stringify(structure[0].lines));
                        that.station_map = JSON.parse(JSON.stringify(structure[0].station_map));
                        that.stations = JSON.parse(JSON.stringify(structure[0].stations));
                        that.stations_info = JSON.parse(JSON.stringify(structure[0].stations_info));
                        that.station_orders =  JSON.parse(JSON.stringify(structure[0].station_orders));
                        that.renderLayer();
                        that.saveLine(false);
                    }
                    else{
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
                    }
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
                return rec.distance(cur) <= 30;
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
            isOnLine(pos){
                let that = this;
                //从线路点中查找该站点
                let index = -1;
                for(let i = 0; i < that.points.length; i++){
                    if(that.isNear(that.points[i].center, pos.center)){
                        index = i;
                        break;
                    }
                }
                return index
            },
            //绘制六边形
            drawHexagon(){
                // 每放大一级，距离缩短一倍
                //console.log(new AMap.LngLat(120.569961,31.354602).distance(new AMap.LngLat(120.572664,31.353283)));
                let that = this;
                // let init = [120.23, 31.40, 120.82, 31.15];
                // let left_top = new AMap.LngLat(init[0], init[1]);
                // let right_top =  new AMap.LngLat(init[2], init[1]);
                // let left_bottom = new AMap.LngLat(init[0], init[3]);
                // let right_bottom =  new AMap.LngLat(init[2], init[3]);
                // let radius = 0.1;
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
                //设置截断点样式
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
                    if(that.op_type != 7){
                        that.move_status = 0;
                    }
                    //若为新建线路途径点
                    if(that.op_type == 0){
                        that.show_station = false;
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
                        that.station_index = -1;
                        if(that.map.lngLatToContainer(rawData.center).y > 50 && that.map.lngLatToContainer(rawData.center).x > 100){
                            //如果前面有未保存的站点
                            if(that.current_station != null && that.stations.length > that.stations_info.length){
                                that.current_station = rawData.center;
                                //判断该点是否已建
                                that.station_index =  that.fillInput();
                                //删去上一个未保存的站点
                                that.stations.pop();
                                //如果该点未建，插入到合适位置中
                                if(that.station_index == -1){
                                    that.stations.push(rawData);
                                }
                            }
                            //如果前面没有未保存的站点
                            else{
                                that.current_station = rawData.center;
                                that.station_index =  that.fillInput();
                                //该点未建，加入到站点中
                                if(that.station_index == -1) that.stations.push(rawData);
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
                            that.show_station = true;
                            document.getElementById("station_panel").style.top = (pixel.y - 180) + 'px';
                            document.getElementById("station_panel").style.left = (pixel.x - 160) + 'px';
                        }
                    }
                    //若为截断线路
                    if(that.op_type == 6){
                        that.cut_pos = null;
                        that.show_station = false;
                        let index = that.isOnLine(rawData);
                        if(index != -1) that.cut_pos = that.points[index];
                        if(that.cut_pos != null){
                            that.processCut(index);
                        }
                    }
                    //若为移动站点
                    if(that.op_type == 7){
                        that.show_station = false;
                        let pixel = that.map.lngLatToContainer(new AMap.LngLat(rawData.center[0], rawData.center[1]));
                        if(pixel.x <= 160) return;
                        if(that.move_status == 0){
                            that.station_index = -1;
                            that.current_station = rawData.center;
                            that.station_index = that.fillInput();
                            if(that.station_index == -1){
                                that.$message({
                                    showClose: true,
                                    message: '请选择已有站点',
                                    type: 'error'
                                });
                            }
                            else{
                                that.move_status = 1;
                                that.$message({
                                    showClose: true,
                                    message: '请选择移动后的位置',
                                    type: 'warning'
                                });
                            }
                        }
                        else if(that.move_status == 1){
                            if(that.new_station == null){
                                that.new_station = rawData.center;
                                that.current_station = rawData.center;
                                let if_index = that.fillInput();
                                if(if_index != -1){
                                    that.$message({
                                        showClose: true,
                                        message: '请选择非站点位置',
                                        type: 'error'
                                    });
                                }
                                else{
                                    that.stations[that.station_index] = rawData;
                                    that.stations_info[that.station_index].center = rawData.center;
                                    // 重新渲染站点图层
                                    that.layer_station.setData(that.stations, {
                                        type: 'json',
                                        lnglat: 'center'
                                    });
                                    that.layer_station.render();
                                    let add_points = 0;
                                    let policies = [AMap.DrivingPolicy.LEAST_TIME, AMap.DrivingPolicy.LEAST_FEE, AMap.DrivingPolicy.LEAST_DISTANCE];
                                    let colors = ["#00FF00", "#D28EFF", "#FFAA33"];
                                    let via_points = [[], [], []];
                                    let prev = null, next = null;
                                    let startLngLat = null, endLngLat = null;
                                    let via = [];
                                    if(that.station_index > 0) {
                                        prev = that.station_map[that.station_index - 1][2];
                                        startLngLat = that.stations[that.station_index - 1].center;
                                    }
                                    if(that.station_index < that.station_map.length - 1){
                                        next = that.station_map[that.station_index + 1][2];
                                        endLngLat = that.stations[that.station_index + 1].center;
                                    }
                                    if(that.station_index == 0){
                                        startLngLat = that.stations[that.station_index].center;
                                    }
                                    else if(that.station_index == that.station_map.length - 1){
                                        endLngLat = that.stations[that.station_index].center;
                                    }
                                    else{
                                        via.push(that.stations[that.station_index].center);
                                    }
                                    for(let i = 0; i < 3; i++){
                                        let driving = new AMap.Driving({
                                            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                                            policy: policies[i]
                                        });

                                        driving.search(startLngLat, endLngLat, {waypoints: via}, function (status, result) {
                                            via_points[i] = [];
                                            let arr = [];
                                            let info = result.routes[0].steps;
                                            for(let j = 0; j < info.length; j++){
                                                let center = that.nearestCenter(info[j].start_location);
                                                via_points[i].push(center);
                                                arr.push(new AMap.LngLat(center.center[0], center.center[1]));
                                                if(j == info.length - 1){
                                                    let end = that.nearestCenter(info[j].end_location);
                                                    via_points[i].push(end);
                                                    arr.push(new AMap.LngLat(end.center[0], end.center[1]));
                                                }
                                            }
                                            that.potential_lines[i] = new AMap.Polyline({
                                                map: that.map,
                                                path: arr,
                                                strokeColor: colors[i],//线颜色
                                                strokeOpacity: 0.8,//线透明度
                                                isOutline: true,
                                                outlineColor:'white',
                                                strokeWeight: 5, //线宽
                                                zIndex: 120
                                            });
                                            that.potential_lines[i].on("click", function(){
                                                for(let j = 0; j < 3; j++){
                                                    if(that.potential_lines[j] != null) that.potential_lines[j].hide();
                                                    that.potential_lines[j] = null;
                                                }
                                                if(prev != null && next != null){
                                                    that.points.splice(prev + 1, next - prev - 1);
                                                    that.lines.splice(prev, next - prev);
                                                    that.paths.splice(prev + 1, next - prev - 1);
                                                }
                                                else if(prev == null){
                                                    that.points[0] = that.stations[0];
                                                    that.paths[0] = that.stations[0].center;
                                                    that.points.splice(1, next - 1);
                                                    that.lines.splice(0, next);
                                                }
                                                else{
                                                    that.points[that.points.length - 1] = that.stations[that.stations.length - 1];
                                                    that.paths[that.paths.length - 1] = that.stations[that.stations.length - 1].center;
                                                    that.points.splice(prev, that.points.length - prev - 1);
                                                    that.lines.splice(prev, that.points.length - prev);
                                                }
                                                if(prev != null){
                                                    let start_index = prev;
                                                    let tag = 0;
                                                    for(let j = 0; j < via_points[i].length - 1; j++){
                                                        if(tag == 0 && that.isNear(via_points[i][j].center, that.stations[that.station_index].center)){
                                                            that.station_map[that.station_index][2] = prev + j;
                                                            tag = 1;
                                                        }
                                                        that.lines.splice(start_index, 0,
                                                            {'line': [via_points[i][j].center[0] + "," + via_points[i][j].center[1], via_points[i][j + 1].center[0] + "," + via_points[i][j + 1].center[1]]});
                                                        if(j > 0){
                                                            that.points.splice(start_index + 1, 0, via_points[i][j]);
                                                            that.paths.splice(start_index + 1, 0, via_points[i][j].center);
                                                        }
                                                        start_index += 1;
                                                    }
                                                    add_points = via_points[i].length - 2;
                                                    for(let i = that.station_index + 1; i < that.station_map.length; i++){
                                                        that.station_map[i][2] += add_points - (next - prev - 1);
                                                    }
                                                }
                                                else{
                                                    let start_index = 0;
                                                    for(let j = 0; j < via_points[i].length - 1; j++){
                                                        that.lines.splice(start_index, 0,
                                                            {'line': [via_points[i][j].center[0] + "," + via_points[i][j].center[1], via_points[i][j + 1].center[0] + "," + via_points[i][j + 1].center[1]]});
                                                        if(j > 0){
                                                            that.points.splice(start_index + 1, 0, via_points[i][j]);
                                                            that.paths.splice(start_index + 1, 0, via_points[i][j].center);
                                                        }
                                                        start_index += 1;
                                                    }
                                                    add_points = via_points[i].length - 2;
                                                    for(let i = that.station_index + 1; i < that.station_map.length; i++){
                                                        that.station_map[i][2] += add_points;
                                                    }
                                                }
                                                that.renderLayer();
                                                that.new_station = null;
                                                that.move_status = 0;
                                            });
                                        })
                                    }
                                }
                            }
                        }
                    }
                });
                that.layer_base.render();
            },
            //点击新建线路按钮
            drawLine(){
                let that = this;
                //如果为新建或编辑模式则生效
                if(that.modify_op){
                    that.show_station = false;
                    that.op_type = 0;
                }
            },
            //点击新建站点按钮
            drawCircle(){
                let that = this;
                //如果为新建或编辑模式则生效
                if(that.modify_op){
                    that.show_station = false;
                    that.op_type = 1;
                }
            },
            saveLine(diff=true){
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
                that.each_station_cost = [];
                //统计每个站点类型的站点数
                that.station_type_num = [0, 0];
                for(let i = 0; i < that.stations_info.length; i++){
                    that.station_type_num[that.stations_info[i].type - 1] += 1;
                }
                //统计每个类型站点的站点成本
                for(let i = 0; i < that.station_types.length; i++){
                    that.each_station_cost.push({"type": that.station_types[i].type, "cost": that.station_type_cost[i], "num": that.station_type_num[i]})
                }
                if(that.vehicle_num == 0){
                    that.vehicle_num = that.stations.length - 1;
                }
                if(that.staff_num == 0){
                    that.staff_num = 2 * (that.stations.length - 1);
                }
                that.poiSearch(diff);
                that.op_type = -1;
            },
            //进入预览模式
            viewMap(){
                let that = this;
                if(that.edit_op || that.modify_op){
                    that.edit_op = false;
                    that.modify_op = false;
                    that.show_station = false;
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
            poiCallBack(result, j){
                let that = this;
                let res = result.poiList.pois;
                for(let k = 0; k < res.length; k++){
                    that.poi_num += 1;
                    that.poi_list[j].num += 1;
                    that.poi_list[j].detail.push({"name": res[k].name, "location": [res[k].location.lng, res[k].location.lat]});
                }
            },
            //poi搜索
            poiSearch(diff){
                let that = this;
                let i = 0;
                that.poi_num = 0;
                that.poi_select = [false, false, false, false];
                that.poi_group = [null, null, null, null];
                that.poi_list = [{type: "公共设施", num: 0, detail: []}, {type: "学校", num: 0, detail: []},
                    {type: "医院", num: 0, detail: []}, {type: "小区", num: 0, detail: []}];
                //poi search
                for(i = 0; i < that.stations_info.length; i++){
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
                        placeSearch.searchNearBy(that.keywords[j], cpoint, 100, function(status, result) {
                            if(status == "complete"){
                                that.poiCallBack(result, j);
                            }
                        });
                    }
                }
                setTimeout(function(){
                    if(diff){
                        that.poi_num_change = that.poi_num - that.poi_num_last;
                        let poi_num_p = that.processAttr(that.poi_num_change);
                        that.poi_num_change = poi_num_p.str;
                        document.getElementById('pnc').style.color = poi_num_p.color;
                        for(let i = 0; i < 4; i++){
                            that.poi_list_change[i].num = that.poi_list[i].num - that.poi_list_last[i].num;
                            let poi_list_p = that.processAttr(that.poi_list_change[i].num);
                            that.poi_list_change[i].num = poi_list_p.str;
                            document.getElementById('plc' + i).style.color = poi_list_p.color;
                        }
                    }
                    that.poi_num_last = that.poi_num;
                    that.poi_list_last = that.poi_list;
                    if(that.cut_pos != null){
                        that.$http.get('http://118.25.99.80:9001/emulation/modify/truncation',
                            {
                                params: {
                                    line_name: that.line_name,
                                    direction: that.line_direction,
                                    cutoff_point: JSON.stringify(that.cut_pos.center),
                                    vehicle_num: that.vehicle_num,
                                    vehicle_extra_cost: that.vehicle_extra_cost,
                                    staff_num: that.staff_num,
                                    staff_mean_cost: that.staff_mean_cost,
                                    each_station_cost: JSON.stringify(that.each_station_cost),
                                    stations: JSON.stringify(that.stations_info),
                                    paths: JSON.stringify(that.paths),
                                    POI: JSON.stringify(that.poi_list)
                                }
                            }).then(function (res){
                            that.station_cost = res.data.station_cost;
                            that.total_cost = res.data.total_cost;
                            that.valid_range = (res.data.coverage / 1000000).toFixed(2);
                            that.population = (res.data.population / 10000).toFixed(2);
                            that.flow_prev = Math.floor(res.data.flow_prev);
                            that.flow_current = Math.floor(res.data.flow_current);
                            that.flow_decrease = Math.floor(res.data.flow_decrease);
                            that.flow_impact = Math.floor(res.data.flow_impact);
                            that.flow_rate = res.data.flow_rate;
                            //that.flow_rate = res.data.flow_rate.toFixed(2);
                            if(that.editFlow) that.editFlow = false;
                            that.cutFlow = true;
                            if(diff) that.calDiff();
                            that.recordData();
                        }, function(){
                            console.log('请求发送失败');
                        });
                    }
                    //save line name, line direction and latitude of line

                    else{
                        that.$http.get('http://118.25.99.80:9001/emulation/modify/station',
                            {
                                params: {
                                    line_name: that.line_name,
                                    direction: that.line_direction,
                                    vehicle_num: that.vehicle_num,
                                    vehicle_extra_cost: that.vehicle_extra_cost,
                                    staff_num: that.staff_num,
                                    staff_mean_cost: that.staff_mean_cost,
                                    each_station_cost: JSON.stringify(that.each_station_cost),
                                    stations: JSON.stringify(that.stations_info),
                                    paths: JSON.stringify(that.paths),
                                    POI: JSON.stringify(that.poi_list)
                                }
                            }).then(function (res){
                            that.station_cost = res.data.station_cost;
                            that.total_cost = res.data.total_cost;
                            that.valid_range = (res.data.coverage / 1000000).toFixed(2);
                            that.population = (res.data.population / 10000).toFixed(2);
                            that.flow_prev = Math.floor(res.data.flow_prev);
                            that.flow_current = Math.floor(res.data.flow_current);
                            that.flow_decrease = Math.floor(res.data.flow_decrease);
                            that.flow_rate = res.data.flow_rate;
                            //that.flow_rate = res.data.flow_rate.toFixed(2);
                            if(that.cutFlow) that.cutFlow = false;
                            that.editFlow = true;
                            if(diff) that.calDiff();
                            that.recordData();
                        }, function(){
                            console.log('请求发送失败');
                        });
                        that.show_station = false;
                    }
                }, 3000);
            },
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
    width: 230px;
    height: 130px;
    position: absolute;
    top: 10px;
    left: 40px;
    background-color: rgba(21, 59, 78, 0.7);
    z-index: 300;
  }
  .edit_title{
    width: 210px;
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
    width: 30px;
  }
  .station_remove{
    position: absolute;
    top: 3px;
    right: 70px;
    width: 30px;
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
    right: 35px;
    top: 40px;
    width: 140px;
  }
  .type_label{
    font-size: 60%;
    color: #fff;
    position: absolute;
    left: 10px;
    top: 70px;
  }
  .insert_label{
    font-size: 60%;
    color: #fff;
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
  .insert_label_app{
    font-size: 60%;
    color: #fff;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .select_type{
    position: absolute;
    right: 35px;
    top: 70px;
    width: 140px;
    background-color: #152534;
  }
  .select_order{
    position: absolute;
    right: 35px;
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
    width: 40%;
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
  .flow_title{
    width: 260px;
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
  .flow_panel{
    position: absolute;
    top: 50px;
    left: 50px;
    width: 260px;
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
