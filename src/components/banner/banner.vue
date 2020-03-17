<template>
  <div class="banner">
    <div class="left_panel">
      <img src="../../../static/bg/xd.png" class="logo"/>
      <img src="../../../static/bg/its.png" class="logo"/>
    </div>
    <span class="banner_title">苏州市公交智能分析与诊断优化系统</span>
  </div>
</template>

<script>
  export default {
    name: "banner"
  }
</script>

<style scoped>
.banner{
  background-color: #1A232C;
  height: 60px;
  width: 100%;
  float: left;
}
.left_panel{
  display: inline-block;
  float: left;
  margin: 10px;
}
.logo{
  height: 40px;
  vertical-align: middle;
}
.banner_title{
  color: white;
  font-size: 1.3em;
  float: left;
  margin-top: 15px;
}
</style>
