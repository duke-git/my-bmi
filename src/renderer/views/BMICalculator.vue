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
            title="BMI小常识"
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
            <el-form-item label="身高(cm)：" prop="height">
              <el-input-number
                v-model="bimForm.height"
                :precision="2"
                :step="0.1"
                size="medium"
                :min="0"
                controls-position="right"
                placeholder="身高, 自动保留2位小数"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="体重(kg)：" prop="weight">
              <el-input-number
                v-model="bimForm.weight"
                :precision="2"
                :step="0.1"
                size="medium"
                :min="0"
                controls-position="right"
                placeholder="体重, 自动保留2位小数"
              ></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('bimForm')">计算</el-button>
              <el-button @click="resetForm('bimForm')">重置</el-button>
            </el-form-item>
          </el-form>
          <div class="line"></div>
          <div class="bmi-note">
            <p>计算公式：体质指数（BMI）= 体重（kg）÷ 身高^2（m）</p>
            <table class="bim-table">
              <thead class="bim-table-head">
                <tr>
                  <th>BMI分类</th>
                  <th>WHO标准</th>
                  <th>亚洲标准</th>
                  <th>中国参考标准</th>
                </tr>
              </thead>
              <tbody class="bim-table-body">
                <tr>
                  <td>偏瘦</td>
                  <td>{{" < 18.5"}}</td>
                  <td>{{" < 18.5"}}</td>
                  <td>{{" < 18.5"}}</td>
                </tr>
                <tr>
                  <td>正常</td>
                  <td>18.5～24.9</td>
                  <td>18.5～22.9</td>
                  <td>18.5～23.9</td>
                </tr>
                <tr>
                  <td>超重</td>
                  <td>≥25</td>
                  <td>≥23</td>
                  <td>≥24</td>
                </tr>
                <tr>
                  <td>偏胖</td>
                  <td>25.0～29.9</td>
                  <td>23～24.9</td>
                  <td>24～26.9</td>
                </tr>
                <tr>
                  <td>肥胖</td>
                  <td>30.0～34.9</td>
                  <td>25～29.9</td>
                  <td>27～29.9</td>
                </tr>
                <tr>
                  <td>重度肥胖</td>
                  <td>35.0～39.9</td>
                  <td>≥30</td>
                  <td>≥30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table-wrapper">
          <span class="form-title">我的BMI历史记录</span>
          <table class="bim-table">
            <thead class="bim-table-head">
              <colgroup>
                <col width="10%" />
                <col width="30%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
              </colgroup>
              <tr>
                <th>编号</th>
                <th>日期</th>
                <th>身高</th>
                <th>体重</th>
                <th>BMI</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody class="bim-table-body">
              <tr v-for="(item, index) in tableData" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.date}}</td>
                <td>{{item.height}}</td>
                <td>{{item.weight}}</td>
                <td>{{item.bmi}}</td>
                <td>
                  <el-button type="text" @click="handleDelete(item)" size="small">删除</el-button>
                </td>
              </tr>
            </tbody>
          </table>
          <el-pagination background layout="prev, pager, next" :page-size="1" :total="total"></el-pagination>
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
        <el-button type="primary" @click="bmiDefDigVisible = false">确定</el-button>
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
        },
        {
          id: "002",
          date: "2010-01-01",
          height: "167cm",
          weight: "54kg",
          bmi: 24.1
        }
      ],
      bmiDefDigVisible: false,
      total: 0
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.total = this.tableData.length;
    },
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

<style scoped lang="scss">
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
  position: relative;
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

.line {
  border-right: 1px solid #dddddd;
  position: absolute;
  left: 50%;
  height: 250px;
  top: 2%;
}

.bmi-note {
  position: absolute;
  top: 0;
  right: 10px;

  p {
    font-size: 16px;
    padding: 10px;
    color: #409eff;
  }
}

.table-wrapper {
  margin-top: 20px;
}

.bim-table {
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  border-top: 1px solid #ebebeb;
  font-size: 14px;
}

.bim-table-head {
  color: #909399;
  font-weight: 500;
  background-color: #f5f5f5;
}

.bim-table-body {
  text-align: center;
}

.el-pagination {
  text-align: center;
  margin-top: 15px;
}
</style>
