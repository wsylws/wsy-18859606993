<template>
  <div class="main">
    <el-button class="backSubmit" @click="handleBack">返回</el-button>
    <div class="form p20">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        class="form-inline"
        size="medium"
        label-width="120px"
      >
        <el-form-item label="城市" prop="cityName" class="ml20">
          <el-input v-model="form.cityName" :disabled="readState == 2" placeholder="请输入城市名称"></el-input>
        </el-form-item>
        <el-form-item label="具体地址" prop="detailAddress" class="ml20">
          <el-input v-model="form.detailAddress" :disabled="readState== 2" placeholder="请输入具体地址"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="provinceName" class="ml20">
          <el-input v-model="form.provinceName" :disabled="readState==2" placeholder="请输入省份"></el-input>
        </el-form-item>
        <el-form-item label="区" prop="regionName" class="ml20">
          <el-input v-model="form.regionName" :disabled="readState==2" placeholder="请输入区"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName" class="ml20">
          <el-input v-model="form.userName" :disabled="readState==2" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号" prop="userPhone" class="ml20">
          <el-input v-model="form.userPhone" :disabled="readState==2" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item class="ml20">
          <el-button type="primary" :loading="loading" @click="saveData('form')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddAddress",
  components: {},
  data() {
    return {
      form: {
        cityName: "",
        detailAddress: "",
        provinceName: "",
        regionName: "",
        userName: "",
        userPhone: "",
        defaultFlag: 0
      },
      rules: {
        cityName: [
          { required: true, message: "请输入城市名称", trigger: "change" }
        ],
        detailAddress: [
          { required: true, message: "请输入具体地址", trigger: "change" }
        ],
        provinceName: [
          { required: true, message: "请输入省份", trigger: "change" }
        ],
        regionName: [
          { required: true, message: "请输入区", trigger: "change" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "change" }
        ]
      },
      loading: false,
      readState: 1 // 1-添加 2-查看 3-编辑
    };
  },
  computed: {
    // ...mapState(["enterForm"])
  },
  watch: {},
  mounted() {
    if (this.$route.params.type === "add") {
      this.$route.meta.title = "新增地址";
      this.readState = 1;
    } else if (this.$route.params.type === "check") {
      this.$route.meta.title = "地址详情";
      this.readState = 2;
      this.getAddressDetail();
    } else if (this.$route.params.type === "edit") {
      this.$route.meta.title = "编辑地址";
      this.readState = 3;
      this.getAddressDetail();
    }
  },
  methods: {
    // 保存数据
    async saveData(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let form = {
              ...this.form
            };
            let result = await this.$store.dispatch(this.readState === 1 ? "postData" : "putData", {
              url: "/api/v3/address",
              data: {
                ...form
              }
            });
            console.log(result);
            this.$success(this.readState === 1 ? "新增成功" : "修改");
            this.goBack();
            this.loading = false;
          } catch (e) {
            this.loading = false;
            this.$error(e.message);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 禁用账号
    handleDefault() { },
    // 返回
    async handleBack() {
      if (await this.cfm("确认要返回吗？", "提示")) {
        this.goBack();
      }
    },
    async getAddressDetail() {
      try {
        this.loading = true;

        let result = await this.$store.dispatch("getData", {
          url: `/api/v3/address/${this.$route.query.id}`
        });
        this.form = result.data;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.$error(e.message);
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
.form-inline {
  .el-input {
    width: 300px;
  }
}
.t-p20 {
  padding: 0 20px 20px;
}
</style>