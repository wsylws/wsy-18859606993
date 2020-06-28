<template>
  <div class="main">
    <div class="form t-p20 flex-end">
      <el-button @click="addAddress" class="mt20">新增地址</el-button>
    </div>
    <div class="default-table">
      <el-table
        :data="tablePage.datalist"
        header-row-class-name="main-header-row-class"
        border
        empty-text="没找到查询结果，请重新尝试"
        v-loading="loading"
      >
        <el-table-column label="全选" type="selection" width="55"></el-table-column>
        <el-table-column prop="addressId" label="ID" align="center"></el-table-column>
        <el-table-column prop="cityName" label="城市" align="center"></el-table-column>
        <el-table-column prop="detailAddress" label="具体地址" align="center"></el-table-column>
        <el-table-column prop="provinceName" label="省份" align="center"></el-table-column>
        <el-table-column prop="regionName" label="区" align="center"></el-table-column>
        <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="userPhone" label="用户手机号" align="center"></el-table-column>
        <el-table-column prop="prop" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>

export default {
  components: {},
  data() {
    return {
      loading: false,
      exportLoading: false,
      tablePage: {
        datalist: []
      },
      list: [
        {
          realName: "123",
          id: 1
        }
      ]
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.Search();
  },
  methods: {
    // 搜索表单
    async Search() {
      try {
        this.loading = true;
        let result = await this.$store.dispatch("getData", {
          url: "/api/v3/address"
        });
        console.log(result);
        this.tablePage.datalist = result.data;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.$error(e.message);
      }
    },
    // 重置
    onReset(formName) {
      this.$refs[formName].resetFields();
      this.Search();
    },
    // 新增地址
    addAddress() {
      this.go("/address/add/add");
    },
    // 查看
    handleClick(row) {
      this.$router.push({
        path: "/address/add/check",
        query: { id: row.addressId }
      });
    },
    // 编辑
    async handleEdit(row) {
      this.$router.push({
        path: "/address/add/edit",
        query: { id: row.addressId }
      });
    },
    // 删除
    async handleDelete(row) {
      if (await this.cfm("确定要删除吗？", "提示")) {
        // /channel/channel/del
        try {
          let result = await this.$store.dispatch("deleteData", {
            url: `/api/v3/address/${row.addressId}`
          });
          this.$success("删除成功");
          this.Search();
          console.log(result);
        } catch (e) {
          this.$error(e.message);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.form-box {
  background: #fff;
  overflow: auto;
  padding-top: 30px;
  margin-bottom: 15px;
}
.w-50 {
  width: 120px;
}
.t-p20 {
  padding: 0 20px 20px;
}
</style>