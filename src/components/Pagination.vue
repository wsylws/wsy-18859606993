<template>
  <div :class="`block my-pagination ${position}-text`">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="->, total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    pageSizes: {
      type: Array,
      default() {
        return [10, 30, 60];
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    position: {
      type: String,
      default: 'center'
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val);
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val);
    }
  }
};
</script>

<style scoped>
/* .center-text {
  text-align: right;
} */
</style>