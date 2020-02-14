<template>

  <div class="menu">
    <div class="loggo"><img src="../assets/img/loggo.png"
           alt=""></div>
    <!-- default-active="1-2"  选中列表项 -->
    <el-menu :default-active="defaultActive"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             :collapse-transition="true"
             router>
      <!-- <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <span slot="title">选项4</span>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu> -->
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title"
              route=''>首页</span>
      </el-menu-item>
      <el-menu-item index="/note">
        <i class="el-icon-s-grid"></i>
        <span slot="title">本子</span>
      </el-menu-item>
      <el-menu-item index="/newfeat">
        <i class="el-icon-edit"></i>
        <span slot="title">新建壮举</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

 
<script>
export default {
  name: '',
  components: {},
  props: ['isCollapse'],
  data () {
    return {
      // isCollapse: true
      defaultActive: '/home'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
       setCurrentRoute () {
         
      this.defaultActive = this.$route.path //关键   通过他就可以监听到当前路由状态并激活当前菜单
    }

  },
  computed: {},
  watch: {
    isCollapse (a) {
      console.log(a);

    }
  },
  created () { 
      this.setCurrentRoute()
  }

}
</script>

<style lang='less' scoped>
.loggo {
  text-align: center;
  // border-right: 1px solid #e6e6e6;
  img {
    margin: 10px 0;
  }
}
.el-menu {
  height: 100%;
}
.menu {
  overflow: hidden;
  height: 100vh;
  // border-right: 1px solid #e6e6e6; 边框
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
</style>