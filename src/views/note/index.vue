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
            <el-col :span="6"
                    v-for="(item,index) in typelist"
                    :key="index">
              <el-card shadow="hover"
                       class="card">
                <span>{{item.name}}</span>
                <p v-if="item.startTime"><i>开始:{{item.startTime}}</i> <i>结束:{{item.endTime}}</i></p>
              </el-card>
            </el-col>
            <!-- <el-col :span="4">
              <el-card shadow="hover">

              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="hover">

              </el-card>
            </el-col> -->
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
      <el-upload class="avatar-uploader"
                 action="http://127.0.0.1:3000/upload"
                 :show-file-list="false"
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
export default {
  name: 'note',
  components: {},
  props: {},
  data () {
    return {
      typelist:
        [
          {
            "id": 0,
            "name": "青春不在",
            "completion": false,
            "startTime": '2133214',
            "endTime": '2312421312'
          },
          {
            "id": 2,
            "name": "青春不在1",
            "Completion": true
          },
         
        ],
      dialogFormVisible: false,
      form: {
        name: '',
        delivery: false,
        imageUrl: '',

      },
    }
  },
  methods: {
    //上传按钮
    upload () {
      this.dialogFormVisible = false
      // const eq = await http.post('/login', this.ruleForm)
      console.log(http);

    },
    handleAvatarSuccess (res, file) {
      console.log(res, file);
      // this.imageUrl = URL.createObjectURL(file.file);
      this.form.imageUrl = res.files.file
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  computed: {},
  watch: {},
  created () { }

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
.control {
  margin: 20px;
}
.card {
  height: 300px;
  margin-bottom: 20px;
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
</style>