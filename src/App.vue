<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style lang="less">
#app {
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.app {
  height: 100%;

  .el-container {
    height: inherit;
  }
}
// 解决表格线不对齐问题
body .el-table th.gutter {
  display: table-cell !important;
}
</style>