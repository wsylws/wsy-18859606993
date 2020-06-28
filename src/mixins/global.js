const mixin = {
  methods: {
    go(path) {
      if (this.$route.path === path) {
        return;
      }
      this.$router.push(path);
    },
    goBack() {
      this.$router.go(-1);
    },
    laterGoBack(path) {
      setTimeout(() => {
        this.go(path);
      }, 1500);
    },
    laterGo() {
      setTimeout(() => {
        this.goBack();
      }, 1500);
    },
    $error(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'error'
      });
    },
    $warning(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      });
    },
    $success(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'success'
      });
    },
    $mloading(message) {
      this.$loading({
        lock: true,
        text: message,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    $loadingClose() {
      this.$loading().close();
    },
    async cfm(title, msg, option) {
      return this.$confirm(
        title,
        msg,
        option || {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      )
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }
  }
};
export default mixin;