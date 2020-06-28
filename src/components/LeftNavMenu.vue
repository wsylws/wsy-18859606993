<template>
  <div class="menu-box">
    <el-menu
      :default-active="$route.meta.module"
      class="el-menu-vertical-demo"
      :router="true"
      unique-opened
    >
      <el-menu-item index="/product/index">
        <i class="el-icon-goods"></i>
        <span slot="title">商品列表管理</span>
      </el-menu-item>
      <el-menu-item index="/address/index">
        <i class="el-icon-place"></i>
        <span slot="title">个人地址管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  components: {},

  methods: {}
}
</script>

<style lang="less" scoped>
@deep: ~">>>";
.el-menu--collapse {
  width: auto;
}
.menu-box {
  @{deep} .el-submenu__title {
    margin-right: 0;
  }
}
</style>