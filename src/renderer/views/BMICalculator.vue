<template>
  <div id="wrapper">
    <el-container>
      <el-header>BMI计算器</el-header>
      <el-main>
        <div class="note-wrapper">
          <img class="ico" width="25" height="25" src="@/assets/note_icon.png" />
          <p class="p1">通过身高体重计算你的BMI值，从而得出你的身体状况评估，高于24你就是超重啦。</p>
          <p class="p2">（*本工具仅适合正常非孕期健康成年人）</p>
        </div>

        <div class="bim-qa">
          <el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover"
            content="身体质量指数（BMI，Body Mass Index）是国际上常用的衡量人体肥胖程度和是否健康的重要标准，主要用于统计分析。
            肥胖程度的判断不能采用体重的绝对值，它天然与身高有关。因此，BMI 通过人体体重和身高两个数值获得相对客观的参数，并用这个参数所处范围衡量身体质量。"
          >
            <span slot="reference">什么是BMI？</span>
          </el-popover>
        </div>
        <div class="form-wrapper">
          <span class="form-title">请输入个人信息</span>
          <el-checkbox v-model="isSaveBMI">自动保存 BMI 历史记录</el-checkbox>
          <el-form :model="bimForm" :rules="rules" ref="bimForm" label-width="100px" class="bimorm">
            <el-form-item label="我的身高：" prop="height">
              <el-input v-model="bimForm.height" size="medium" placeholder="请输入身高"></el-input>
            </el-form-item>
            <el-form-item label="我的体重：" prop="weight">
              <el-input v-model="bimForm.weight" size="medium" placeholder="请输入体重"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('bimForm')">计算</el-button>
              <el-button @click="resetForm('bimForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-wrapper">
          <span class="form-title">我的 BMI 历史记录</span>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="height" label="身高"></el-table-column>
            <el-table-column prop="weight" label="体重"></el-table-column>
            <el-table-column prop="bmi" label="BMI"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="BIM定义" :visible.sync="bmiDefDigVisible" width="60%">
      <div>
        <p>
          身体质量指数（BMI，Body Mass Index）是国际上常用的衡量人体肥胖程度和是否健康的重要标准，主要用于统计分析。肥胖程度的判断不能采用体重的绝对值，它天然与身高有关。
          因此，BMI 通过人体体重和身高两个数值获得相对客观的参数，并用这个参数所处范围衡量身体质量。
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bmiDefDigVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BMICalculator",
  components: {},
  data() {
    return {
      isSaveBMI: true,
      bimForm: {
        height: "",
        weight: ""
      },
      rules: {
        height: [{ required: true, message: "请输入身高", trigger: "blur" }],
        weight: [{ required: true, message: "请输入体重", trigger: "blur" }]
      },
      tableData: [
        {
          id: "001",
          date: "2010-01-01",
          height: "167cm",
          weight: "54kg",
          bmi: 24.1
        }
      ],
      bmiDefDigVisible: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addBMI() {},
    handleDelete() {},
    showBmiDefDig() {}
  }
};
</script>

<style scoped>
#wrapper {
  display: block;
}
.el-header {
  height: 60px;
  text-align: center;
  font-size: 24px;
  line-height: 60px;
  color: white;
  background: #5f87d8;
}
.note-wrapper {
  background: #fff;
  background-size: 25px auto;
  padding: 10px 15px 5px 15px;
  position: relative;
}
.p1 {
  display: inline-block;
  vertical-align: text-bottom;
  color: #409eff;
  text-indent: 0.5em;
}
.p2 {
  color: #f74444;
  font-size: 14px;
  margin: 5px 0 0 0;
  display: inline;
  vertical-align: text-bottom;
}
.bim-qa {
  float: right;
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
}
.form-wrapper {
  margin-top: 30px;
  padding: 10px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #ededed;
}
form {
  margin-top: 20px;
}
.form-title {
  font-size: 16px;
  display: inline-block;
  margin-right: 20px;
  margin-left: 10px;
  color: #409eff;
}
.el-form-item {
  width: 340px;
}
.table-wrapper {
  margin-top: 20px;
}
</style>
