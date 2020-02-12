<template>
  <div class="hello">
    <el-row>
      <el-card shadow="hover"
               class="card">
        <h1>登陆</h1>
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="用户名"
                        prop="username">
            <el-input type="text"
                      v-model="ruleForm.username"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input type="password"
                      v-model="ruleForm.password"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')"
                       >提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>

import {http } from '../../utils/request';
export default {
  name: 'HelloWorld',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户名'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ]

      }
    };
  },
  props: {
    msg: String
  },
  methods: {
    log(){
      console.log(211111111111111111);
    },
    submitForm (formName) {
      this.$refs[formName].validate( async() => {
       const eq= await http.post('/login',this.ruleForm)
       console.log(eq);

       if (eq.code === 200) {
         this.$router.push('home')
          this.$message({
            message: `登陆成功`,
            type: 'success'
          });
       } else {
          this.$message({
          message: `密码错误重新登录`,
          type: 'warning'
        });
       }
      });
    },
    //测试-跳转倒计时
    // gopage () {
    //   let countdown = 3
    //   var dataout = setInterval(() => {
    //     this.$message({
    //       message: `测试登陆登陆还有${countdown}秒`,
    //       type: 'warning'
    //     });
    //     countdown--
    //     if (countdown <= 0) {
    //       clearInterval(dataout)
    //       this.$message({
    //         message: `登陆成功`,
    //         type: 'success'
    //       });

    //       this.$router.push('home') //编程式导航
    //     }
    //   }, 1000);
    // },

    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.hello {
  width: 100%;
  height: 100%;
  background: url("../../../public/img/bg.jpg") no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  color: #40514e;
}
.card {
  width: 500px;
  height: 300px;
  margin: 0 auto;
  display: inline-block;
  text-align: center;
  background-color: rgba(53, 134, 156, 0.5);
  border: 0;
}
</style>
