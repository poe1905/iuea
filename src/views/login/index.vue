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
            <el-col :span="10">
              <el-input v-model="code"
                        placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="10"
                    :offset="2">
              <!-- <el-button @click="handleSendCode">获取验证码</el-button> -->
              <el-button @click="handleSendCode"
                         :disabled="!!codeTimer || codeLoading">
                {{ codeTimer ? `剩余${codeSecons}秒` : '获取验证码' }}
              </el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>

import '@/vendor/gt' // gt.js 会向全局 window 暴露一个函数 initGeetest
const initCodeSeconds = 3

import { http } from '../../utils/request';
import req from '../../utils/request';
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
      code: '',
      captchaObj: null, // 通过 initGeetest 得到的极验验证码对象
      codeTimer: null, // 倒计时定时器
      codeSecons: initCodeSeconds, // 倒计时的时间
      codeLoading: false,//按钮是否可用
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
    log () {
      console.log(211111111111111111);
    },

    handleSendCode () {
      // 校验手机号是否有效
      // this.$refs['ruleForm'].validateField('mobile', errorMessage => {
      //   if (errorMessage.trim().length > 0) {
      //     return
      //   }

      // 手机号码验证通过

      // 验证是否有验证码插件对象
      if (this.captchaObj) {
        //   // 手机号码有效，初始化验证码插件
        // this.showGeetest()
        //   // 如果用户输入的手机号和之前初始化的验证码手机号不一致，就基于当前手机号码重新初始化
        //   // 否则，直接 verify 显示
        // if (this.form.mobile !== this.sendMobile) {
        //   //     // 手机号码发送改变，重新初始化验证码插件

        //   //     // 重新初始化之前，将原来的验证码插件 DOM 删除
        //   document.body.removeChild(document.querySelector('.geetest_panel'))

        //   //     // 重新初始化
        //   this.showGeetest()
        // } else {
          //     // 一致，直接 verify
          console.log('执行verify');
          this.captchaObj.verify()
        // }
      } else {
        //   // 这里是第1次的初始化验证码插件
        console.log('1次的初始化验证码插件');
        this.showGeetest()
      }
      // })
    },

    showGeetest () {
      // 函数中的 function 定义的函数中的 this 指向 window

      // 初始化验证码期间，禁用按钮的点击状态
      this.codeLoading = true

      req({
        method: 'GET',
        url: `/captchas/18801185985`
      }).then(data => {
        data = data.data.data
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏按钮式
        }, (captchaObj) => {
          this.captchaObj = captchaObj
          // 这里可以调用验证实例 captchaObj 的实例方法
          captchaObj.onReady(() => {
            // 只有 ready 了才能显示验证码
            // this.sendMobile = this.form.mobile
            captchaObj.verify()
            // 验证码初始化好了，让 “获取验证码” 按钮可点击
            this.codeLoading = false
          }).onSuccess(() => {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } =
              captchaObj.getValidate()
            console.log(challenge,
              seccode,
              validate);
            // 调用 获取短信验证码 (极验 API2）接口，发送短信
            // req({
            //   method: 'GET',
            //   url: `/sms/codes/18801185985`,
            //   params: { // 专门用来传递 query 查询字符串参数
            //     challenge,
            //     seccode,
            //     validate
            //   }
            // }).then(data => {
            //   console.log(data ,11111111111);
            //   // 发送短信之后，开始倒计时
            // })
              this.codeCountDown()
          })
        })
      })
    },


    /**
    * 倒计时
    */
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeSecons--
        if (this.codeSecons <= 0) {
          this.codeSecons = initCodeSeconds // 让倒计时时间回到初始状态
          window.clearInterval(this.codeTimer) // 清除倒计时
          this.codeTimer = null // 清除倒计时定时器的标志
        }
      }, 1000)
    },
    submitForm (formName) {
      this.$refs[formName].validate(async () => {
        const user = await http.post('/login', this.ruleForm)
        console.log(user);
        window.localStorage.setItem('user', JSON.stringify(user.data))
        if (user.code === 200) {
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
