<template>
  <div class="main">
    <div class="form p20">
      <el-form :inline="true" :model="form" ref="form" class="form-inline" size="medium">
        <div class="form-row">
          <el-form-item label="关键字" prop="channelName" class="ml20">
            <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
          </el-form-item>
          <el-form-item class="ml20">
            <el-button type="primary" :loading="loading" @click="Search()">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
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
        <el-table-column prop="goodsCoverImg" label="商品图" align="center">
          <template slot-scope="scope">
            <img
              style="width:100%;height:100%;"
              :src="'http://test11.hctwallet.com' + scope.row.goodsCoverImg"
            />
          </template>
        </el-table-column>
        <el-table-column prop="goodsId" label="商品ID" align="center"></el-table-column>
        <el-table-column prop="goodsIntro" label="商品介绍" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="sellingPrice" label="价格" align="center"></el-table-column>
      </el-table>
      <pagination
        :total="tablePage.TotalCount"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.pageSize"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination.vue";

export default {
  name: "ProductList",
  components: { Pagination },
  data() {
    return {
      form: {
        keyword: ""
      },
      loading: false,
      exportLoading: false,
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        TotalCount: 0,
        datalist: []
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    // 搜索表单
    async Search() {
      try {
        if (this.form.keyword) {

          this.loading = true;
          let pageJson = {
            pageNumber: this.tablePage.currentPage
          };
          let result = await this.$store.dispatch("getData", {
            url: "/api/v3/search",
            data: { ...pageJson, ...this.form }
          });
          this.tablePage.datalist = result.data.list;
          this.tablePage.TotalCount = result.data.totalCount;
          this.loading = false;
        } else {
          this.$error("关键字不能为空!");
        }
      } catch (e) {
        this.loading = false;
        this.$error(e.message);
      }
    },
    // 分页
    handleSizeChange(val) {
      this.tablePage.pageSize = val;
      this.Search();
    },
    // 分页
    handleCurrentChange(val) {
      this.tablePage.currentPage = val;
      this.Search();
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