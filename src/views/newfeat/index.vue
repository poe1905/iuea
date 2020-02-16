<template>
  <div class="newfeat">
    <el-form :model="Form"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="壮举的名称"
                    prop="name">
        <el-input v-model="Form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类"
                    prop="region">
        <el-select v-model="Form.type"
                   placeholder="请选择壮举分类">
          <el-option v-for=" o in typelist"
                     :key="o.id"
                     :label="o.name"
                     :value="o.id"></el-option>
          <!-- <el-option label="my_code"
                     value="1"></el-option> -->
        </el-select>
      </el-form-item>

      <el-form-item label="是否为私密"
                    prop="secret">
        <el-switch v-model="Form.secret"></el-switch>
      </el-form-item>

      <!-- <el-form-item label="特殊资源"
                    prop="resource">
        <el-radio-group v-model="Form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- <el-form-item label="活动形式"
                    prop="desc">
        <el-input type="textarea"
                  v-model="Form.desc"></el-input>
      </el-form-item> -->
      <el-form-item label="内容">
        <Tinymce :init="init"
                 v-model="Form.content"></Tinymce>

      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">立即发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
// import tinymce from 'tinymce/tinymce'
// import Editor from "@tinymce/tinymce-vue"

import { http } from '../../utils/request.js';
import Tinymce from '../../components/Tinymce';
export default {
  name: 'newfeat',
  components: {
    // "tinymce-editor": Editor
    Tinymce
  },
  props: {},
  data () {
    return {
      Form: {
        title: '',//文章名称
        type: '', //文章分类
        secret: false,//是否为私密状态
        content: '' //文章内容
      },
      typelist: [],
      rules: {
        title: [
          { required: true, message: '请输入壮举名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择壮举类型', trigger: 'change' }
        ]
      },
      init: {
        language: 'zh_CN',
        language_url: 'https://lab.uxfeel.com/node_modules/tinymce/langs/zh_CN.js',
        height: 330,
        width: 1000,
        plugins: `link lists image code table colorpicker textcolor wordcount contextmenu`,
        toolbar: `bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat`,
        branding: false,

        images_upload_handler: function (blobInfo, success, failure) {
          var file = blobInfo.blob();
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function () {
            if (file.size > 1048576) {
              failure('图片请不要大于 1MB');
            } else {
              success(reader.result);
            }
          }
        }
      },
    }
  },
  methods: {

    //获取所有列表数据
    async initlist () {
      const {data} = await http('http://127.0.0.1:3000/type')
      this.typelist = data
      console.log(data);
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          const date = await http.post('/addlist', { data: this.Form })
          console.log(date);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }  },
  computed: {},
  watch: {},
  created () {
    // console.log('调用', tinymce);
    this.initlist()
  }

}
</script>

<style lang='less' scoped>
</style>