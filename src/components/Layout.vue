<template>
  <div class="app">
    <el-container>
      <el-header class="my-pad-0">
        <!-- 头部 -->
        <header-nav></header-nav>
      </el-header>
      <el-container>
        <!-- 左 菜单 -->
        <el-aside width="155px">
          <left-nav-menu></left-nav-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>

    <!-- <page-footer></page-footer> -->
  </div>
</template>

<script>
import HeaderNav from "./HeaderNav";
// import PageFooter from './PageFooter';
import LeftNavMenu from "./LeftNavMenu";

export default {
  name: "layout",
  components: {
    HeaderNav,
    // PageFooter,
    LeftNavMenu
  },
  mounted() { }
};
</script>
<style lang="less" scoped>
.my-pad-0 {
  padding: 0 !important;
}
</style>