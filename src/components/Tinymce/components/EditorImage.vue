<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}"
               icon="el-icon-upload"
               size="mini"
               type="primary"
               @click=" dialogVisible=true">
      上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload"
                 :multiple="true"
                 :show-file-list="false"
                 :file-list="fileList"
                 :on-remove="handleRemove"
                 :on-success="handleSuccess"
                 :before-upload="beforeUpload"
                 :action='upload_qiniu_url'
                 list-type="picture-card"
                 :data="qiniuData">
        <el-button size="small"
                   type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary"
                 @click="handleSubmit">
        确认
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { http } from '../../../utils/request.js';
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      qiniuData: {
        key: "",
        token: ""
      },
      // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
      upload_qiniu_url: "http://upload-z1.qiniup.com",
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: "http://q5qurdtw0.bkt.clouddn.com/",
      imageUrl: "",
      Global: {
        dataUrl: 'http://yoursite.com'
      }
    }
  },
  methods: {
    checkAllSuccess () {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },

    //点击确定判断图片是否转置bs64完成 完成 送文件到父级 , 清空列表和对象
    handleSubmit () {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功。如果有网络问题，请刷新页面并重新上传!')
        return
      }
      //获取到的文件传到父级组件
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },

    //图片上传成功钩子
    handleSuccess (response, file) {
      this.imageUrl = this.upload_qiniu_addr + response.key;

      console.log('上传成功的会返回key文件名');
      console.log(response, file, this.imageUrl);
      this.fileList.push({name:response.key,url:this.imageUrl})
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = this.imageUrl
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    //文件列表移除文件时的钩子
    handleRemove (file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },

    //上传文件之前的钩子
    beforeUpload (file) {
      this.qiniuData.key = file.name;
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function () {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    //获取文件上传toke
    async getToke () {
      const {token} = await http('http://127.0.0.1:3000/getToken')
      console.log(token);
      this.qiniuData.token = token;
      
      window.localStorage.setItem('token', token)
    }
  },
  created () {
    this.getToke()
  }
}
</script>

<style lang="less" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
