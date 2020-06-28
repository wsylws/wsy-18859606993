<template>
  <div class="wrapper bg-white">
    <header>
      <!-- LOGO -->
      <a href="javascript:;" class="logo-box" @click="go('/home/index')">
        <span>管理后台</span>
      </a>
      <p class="my-header-right">
        <span class="border-list">
          <span class="bl1" @click="logout">退出登录</span>
        </span>
      </p>
    </header>
  </div>
</template>

<script>
import { removeToken } from "@/libs/auth";
export default {
  data() {
    return {
    };
  },
  computed: {},
  methods: {
    async logout() {
      sessionStorage.removeItem('vuex');
      try {
        await this.$store.dispatch("postData", {
          url: "/api/v3/user/logout"
        });
        removeToken("token");
        this.$store.commit("LOGOUT");
        this.go("/login");
      } catch (e) {
        this.loading = false;
        this.$error(e.message);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.border-list {
  font-size: 15px;
  vertical-align: middle;
  text-align: center;
  padding: 0 20px 0;
  margin-top: 16px;

  & + & {
    border-left: 1px solid #e6e6e6;
    // margin-left: 10px;
    padding-right: 10px;
    cursor: pointer;
  }
}

.el-dropdown-link {
  font-size: 15px;
  display: inline-block;
  vertical-align: middle;
}

.gradient-btn.el-button--mini.is-round {
  padding: 6px 8px;
  background: linear-gradient(
    135deg,
    rgba(81, 176, 249, 1) 0%,
    rgba(40, 120, 240, 1) 100%
  );
}

.my-header-search {
  .grey {
    color: #999;
  }
}
</style>