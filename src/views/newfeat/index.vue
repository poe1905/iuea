<template>
  <div class="newfeat">
    <el-form :model="Form"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="壮举的名称"
                    prop="name">
        <el-input v-model="Form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类"
                    prop="region">
        <el-select v-model="Form.region"
                   placeholder="请选择壮举分类">
          <el-option label="区域一"
                     value="shanghai"></el-option>
          <el-option label="区域二"
                     value="beijing"></el-option>
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
        <!-- <tinymce-editor :init="init"
                        v-model="Form.content"></tinymce-editor> -->
                        <Tinymce></Tinymce>

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
        name: '',//文章名称
        region: '', //文章分类 
        secret: false,//是否为私密状态
        resource: '',
        desc: '',
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入壮举名称', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择壮举类型', trigger: 'change' }
        ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ], 
      },
      init: { 
        // language_url: '@/static/zh_CN.js',
        // language: 'zh_CN',//注意大小写
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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
  }

}
</script>

<style lang='less' scoped>
</style>