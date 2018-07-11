<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  @import "../static/iconfont/iconfont.css";
  html, #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  body{
    margin: 0;
    padding: 0;
  }
</style>
