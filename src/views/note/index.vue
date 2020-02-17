<template>
  <div class="note">
    <el-row :gutter="12">
      <el-col :span="23">
        <el-card shadow="always">
          <el-row :gutter="30">
            <div class="control">
              <el-button type="primary"
                         icon="el-icon-edit"
                         @click="dialogFormVisible = true">新建本子</el-button>
            </div>

            <!--
                  "name": "王大大",
                  "completion": "false",
                  "imageUrl": "http://baidu.com",
                  "secret": "false",
                  "startTime": 1581686632725,
                  "endTime": "",
                  "id": "33qgtbs5jwo0"
             -->
            <!-- <el-col :span="6"
                    v-for="(item,index) in typelist"
                    :key="index">
              <el-card shadow="hover"
                       class="card">
                <span>{{item.name}}</span>
                <a href="JavaScript:;"><img src="../../../src/assets/img/loggo.png" alt=""></a>
                <p ><i v-if="item.startTime">开始:{{item.startTime}}</i> <i v-if="item.endTime">结束:{{item.endTime}}</i></p>
              </el-card>
            </el-col> -->
            <div class="control">

              <el-row type="flex"
                      class="cardrow">

                <el-col :span="6"
                        v-for="o in typelist"
                        :key="o.id">

                  <el-card :body-style="{ padding: '0px' }"
                           class="cards">
                    <img :src="o.imageUrl"
                         class="image"
                         @click="goaddcrte(o.id)">
                    <div style="padding: 14px;">
                      <span>{{o.name}}</span>
                      <div class="bottom clearfix">
                        <i v-if="o.startTime">开始: {{ computationTtime(o.startTime)}}</i> <i v-if="o.endTime">结束: {{computationTtime(o.endTime)}}</i>
                      </div>
                      <el-button type="text"
                                 class="button"
                                 @click="lookBook(o.id)">点击查看</el-button>
                      <el-button type="text"
                                 class="button"
                                 @click="deleteBook(o.id)">点击删除</el-button>
                    </div>
                  </el-card>

                </el-col>

              </el-row>

            </div>

          </el-row>
        </el-card>
      </el-col>

    </el-row>
    <!-- 模态框开始新建一个本子 -->
    <el-dialog title="新建一个本子"
               :visible.sync="dialogFormVisible">
      <el-form :model="form" ref='form'>
        <el-form-item label="本子的名称">
          <el-input v-model="form.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否为私密"
                      prop="secret">
          <el-switch v-model="form.secret"></el-switch>
        </el-form-item>
      </el-form>
      <!-- action="http://127.0.0.1:3000/upload" -->
      <el-upload class="avatar-uploader"
                 :show-file-list="false"
                 :action="upload_qiniu_url"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload"
                 :data="qiniuData">
        <img v-if="form.imageUrl"
             :src="form.imageUrl"
             class="avatar">
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="upload('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模态框结束 -->
    <!-- 模态框开始本子详情模态框 -->
    <el-dialog :title="bookDetails.name"
               :visible.sync="bookDetailsVisible">

      <!-- name: '', //本子名称
        completion: false, //是否完成本子
        secret: false, //是否私密本子
        imageUrl: '',//本子的封面//
        startTime: '',//本子初始化时间
        endTime: ''//本子结束时间 -->
      <el-form :model="bookDetails">
        <el-form-item label="本子名称"
                      label-width="120px">
          <el-input v-model="bookDetails.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否完成本子"
                      label-width="120px">
          <el-switch v-model="bookDetails.completion"
                     active-color="#13ce66"
                     inactive-color="#cfc7c7">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否私密本子"
                      label-width="120px">
          <el-switch v-model="bookDetails.secret"
                     active-color="#13ce66"
                     inactive-color="#cfc7c7">
          </el-switch>
        </el-form-item>
        <el-form-item label="本子的封面"
                      label-width="120px">
          <img :src="bookDetails.imageUrl"
               alt="这个是一个封面">
        </el-form-item>
        <el-form-item v-if="bookDetails.startTime"
                      label="本子初始化时间"
                      label-width="120px">
          <code> {{computationTtime(bookDetails.startTime)}}</code>
        </el-form-item>
        <el-form-item v-if="bookDetails.endTime"
                      label="本子结束时间"
                      label-width="120px">
          <code> {{computationTtime(bookDetails.endTime)}}</code>

        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="bookDetailsVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="amend(bookDetails.id)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模态框结束 -->
  </div>
</template>


<script>
import { http } from '../../utils/request';
var moment = require('moment');
export default {
  name: 'note',
  components: {},
  props: {},
  data () {
    return {
      typelist: [],
      dialogFormVisible: false,
      bookDetailsVisible: false,
      form: {
        name: '', //本子名称
        completion: false, //是否完成本子
        secret: false, //是否私密本子
        imageUrl: '',//本子的封面//
        startTime: '',//本子初始化时间
        endTime: ''//本子结束时间
      },
      bookDetails: {}, //预览本子的数据
      qiniuData: { //七牛上传数据
        key: "",
        token: ""
      },
      // 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
      upload_qiniu_url: "http://upload-z1.qiniup.com",
      // 七牛云返回储存图片的子域名
      upload_qiniu_addr: "http://q5qurdtw0.bkt.clouddn.com/",
      Global: {
        dataUrl: 'http://yoursite.com'
      },
      listObj: {},
    }
  },
  methods: {
    //添加文章类型按钮
    async upload (name) {
      const eq = await http.post('/settype', this.form)
      console.log(eq);
        this.$refs[name].resetFields();
      this.dialogFormVisible = false
      this.initlist()
    },

    //文件上传成功函数
    handleAvatarSuccess (res, file) {
      var imageUrl = this.upload_qiniu_addr + res.key;

      console.log('上传成功的会返回key文件名');
      console.log(res, file, imageUrl);

      // this.imageUrl = URL.createObjectURL(file.file);
      this.form.imageUrl = imageUrl
    },
    //文件上传之前函数
    beforeAvatarUpload (file) {
      // console.log(file.type);
      // var type = ['image/jpeg', 'image/png', 'image/gif']
      // const isJPG = type.indexOf(file.type) === -1
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;

      //获取 token  保存到 七牛云对象
      this.qiniuData.token = window.localStorage.getItem('token')
      this.qiniuData.key = file.name
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      console.log(file);
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
    computationTtime (item) {
      //不能使用计算属性 计算属性会报错 哈哈哈哈
      //将获取到的时间戳转置为时间格式字符串
      return moment(+item).format('YYYY-MM-DD HH:mm:ss')

    },
    // 根据文章 获取文章列表
    async initlist () {
      const { data } = await http('http://127.0.0.1:3000/type')
      this.typelist = data
    },
    //导航跳转
    //点击图片进行路由跳转
    goaddcrte (id) {
      this.$router.push(`/note/${id}`)
    },
    //根据id 查询文章类型
    async lookBook (id) {
      this.bookDetailsVisible = true
      const { data } = await http(`http://127.0.0.1:3000/type/?${id}`)
      this.bookDetails = data[0]
      console.log(data);
    },
    //根据id 删除文章
    async deleteBook (id) {
        this.$confirm('此操作将永久删除该本子, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          await http(`http://127.0.0.1:3000/deletetype/?${id}`)
          this.initlist()

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '差一点点就把我删除了'
          });   
          
          
        });
      console.log(id);
    },
    async amend (id) {
      const { data } = await http.post(`http://127.0.0.1:3000/altertype/?${id}`,this.bookDetails)
      console.log(data);
    }
  },
  computed: {},
  watch: {},
  created () {
    this.initlist()//初始化 壮举  数据
  }

}
</script>

<style lang='less' scoped>
//上传框样式
.avatar-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
//

//卡片样式
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
//
.control {
  margin: 0 20px;
}
.card {
  height: 300px;
  margin-bottom: 20px;
  display: flex;
  p {
    display: flex;
    justify-content: space-around;
  }
}
i {
  font-style: normal;
  font-size: 12px;
  color: #ccc;
}

.cardrow {
  display: flex;
  // flex-direction: column
  line-height: 1em;
  // justify-content: space-around;
  flex-wrap: wrap;
  .clearfix {
    display: flex;
    flex-direction: column;
  }
  .cards {
    width: 300px;
    margin: 30px 0;

    span {
      line-height: 1em;
    }
  }
}
.el-button--text {
  margin: 10px 0;
}
</style>