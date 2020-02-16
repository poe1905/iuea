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
                      class="cardrow"  
                      >

                <el-col :span="6"
                        v-for="o in typelist"
                        :key="o.id">

                  <el-card :body-style="{ padding: '0px' }"
                           class="cards">
                      <img :src="o.imageUrl"
                           class="image"
                           @click="goaddcrte(o.id)"
                           >
                    <div style="padding: 14px;">
                      <span>{{o.name}}</span>
                      <div class="bottom clearfix">
                        <i v-if="o.startTime">开始: {{ computationTtime(o.startTime)}}</i> <i v-if="o.endTime">结束: {{computationTtime(o.endTime)}}</i>
                      </div>
                      <el-button type="text"
                                 class="button">点击查看</el-button>
                    </div>
                  </el-card>

                </el-col>

              </el-row>

            </div>

          </el-row>
        </el-card>
      </el-col>

    </el-row>
    <!-- 模态框开始 -->
    <el-dialog title="新建一个本子"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
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
                 :http-request='upimgdata'
                 action="http://127.0.0.1:3000/upload"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload">
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
                   @click="upload">确 定</el-button>
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
      typelist:[],
      dialogFormVisible: false,
      form: {
        name: '', //本子名称
        completion: false, //是否完成本子
        secret: false, //是否私密本子
        imageUrl: '',//本子的封面//
        startTime: '',//本子初始化时间
        endTime: ''//本子结束时间
      },
      currentDate: new Date()// 卡片测试时间戳
    }
  },
  methods: {
    //上传按钮
    upload () {
      this.dialogFormVisible = false
      // const eq = await http.post('/login', this.ruleForm)
      // console.log(http);

    },
    // 上传文件到七牛云
    upimgdata(a,b,c){
      console.log(a,b,c ,1111111111111);
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file);
      // this.imageUrl = URL.createObjectURL(file.file);
      this.form.imageUrl = res.files.file
    },
    beforeAvatarUpload (file) {
      console.log(file.type);
      var type = ['image/jpeg', 'image/png', 'image/gif']
      const isJPG = type.indexOf(file.type) === -1
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    computationTtime (item) {
      return moment(item).format('YYYY-MM-DD HH:mm:ss')

    },
    // 根据文章id 获取文章列表
    async initlist(){
      const data = await http('http://127.0.0.1:3000/type')
      this.typelist = data
      console.log(data);
    },
    //导航跳转
    goaddcrte(id){
      this.$router.push(`/note/${id}`)

    }


  },
  computed: {
  },
  watch: {},
  created () {
    this.initlist()//初始化壮举数据
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