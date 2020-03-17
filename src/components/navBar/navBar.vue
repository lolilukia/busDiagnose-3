<style>
  #nav_bar .el-menu{
    border-right: none;
  }
  #nav_bar .el-menu-item.is-active {
    color: white;
  }
  #nav_bar .el-submenu .el-menu-item{
    padding: 0 20px;
    min-width: 0;
  }
</style>
<template>
  <div class="nav_bar">
    <div id="nav_bar" class="ver_bar">
      <el-menu default-active="1" class="el-menu-vertical-demo"
               background-color="#1A232C" text-color="white">
        <el-menu-item index="1" :class="$route.path == '/common'?'active_item':'normal'">
          <router-link to="/common" class="link"><span class="white_font"><img class="bar_icon" style="width: 15px; height: 15px;" src="static/icon/scan.png">体征扫描</span></router-link>
        </el-menu-item>
        <el-menu-item index="2" :class="$route.path == '/analyze'?'active_item':'normal'">
          <router-link to="/analyze" class="link"><span class="white_font"><img class="bar_icon" style="width: 15px; height: 15px;" src="static/icon/analysis.png">症状分析</span></router-link>
        </el-menu-item>
        <el-menu-item index="3" :class="$route.path == '/evaluate'?'active_item':'normal'">
          <router-link to="/evaluate" class="link"><span class="white_font"><img class="bar_icon" style="width: 18px; height: 15px;" src="static/icon/evaluate.png">综合评价</span></router-link>
        </el-menu-item>
        <el-menu-item index="4" :class="$route.path == '/diagnose'?'active_item':'normal'">
          <router-link to="/diagnose" class="link"><span class="white_font"><img class="bar_icon" style="width: 18px; height: 18px;" src="static/icon/report.png">健康诊断</span></router-link>
        </el-menu-item>
        <el-submenu index="5">
          <template slot="title" :class="$route.path == '/newline' || $route.path == '/editline'?'active_item':'normal'">
            <span class="white_font">
              <img class="bar_icon" style="width: 20px; height: 20px;"src="static/icon/optimize.png">
              仿真优化
            </span>
          </template>
          <el-menu-item index="5-1">
            <router-link to="/newline" class="link">
              <span class="white_font">新建线路</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="5-2">
            <router-link to="/editline" class="link">
              <span class="white_font">编辑线路</span>
            </router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "navBar",
    data(){
      return{
        dopen: false,
        dispose: false,
        emulation: false,
        mapOpen: true,
        chartOpen: false,
        diagnoseOpen: false,
        dispatchOpen: false,
        historyOpen: false,
        date: ''
      };
    },
    mounted(){
      var height = window.screen.availHeight - 46;
      document.getElementById('nav_bar').style.height = height + 'px';
    },
    methods:{

    }
  }
</script>

<style scoped>
  body{
    background-color: #19232C;
  }
  el-col {
    border-radius: 4px;
  }
  .link{
    text-decoration: none;
  }
  .ver_bar{
    position: absolute;
    left: 0;
    top: 60px;
    width: 10%;
    z-index: 20;
    background-color: #1A232C;
  }
  .white_font{
    color: white;
  }
  .active_item{
    background-color: #187EAC !important;
  }
  .normal{
    background-color: #1A232C;
  }
  .bar_icon{
    margin-right: 5px;
  }
</style>
