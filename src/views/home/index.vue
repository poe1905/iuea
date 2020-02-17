<template>
  <el-container>
    <el-aside :width="widths" class="menu">
      <Menu :isCollapse='isCollapse' />
    </el-aside>
    <!--  -->
    <el-container  :style="isCollapse  ? 'margin-left: 65px;' : 'margin-left: 201px;'" >
      <el-header >

        <el-row type="flex"
                justify="space-between"
                 class="header"
                 >
          <el-col :span="8"> <i :class="classcheng"
               @click="chenge"></i>
            <span class="headline">心心念念已久的笔记记录平台</span> </el-col>
          <el-col :span="3"  class="user">
              <el-avatar :src="user.headUrl" ></el-avatar>
            <el-dropdown>
              <span class="el-dropdown-link">
                {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>修改资料</el-dropdown-item>
                <el-dropdown-item divided>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main  >
        <!-- 二级路由容器 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import Menu from '@/components/menu.vue';
export default {
  name: 'home',
  components: {
    Menu
  },
  props: {},
  data () {
    return {
      isCollapse: false,
      widths: '201px',
      user:{}
    }
  },
  methods: {
    chenge () {
      this.isCollapse = !this.isCollapse
    },
    lodeuser(){
      const user = JSON.parse(window.localStorage.getItem("user")) ? JSON.parse(window.localStorage.getItem("user")) : ''
      this.user = user
    }
  },
  computed: {
    classcheng: function () {
      return {
        'el-icon-s-unfold': this.isCollapse,
        'el-icon-s-fold': !this.isCollapse,
        'iconn': true
      }
    }
  },
  watch: {
    isCollapse (a) {

      a ? this.widths = '65px' : this.widths = '201px'
    }
  },
  created () { 
    this.lodeuser() // 从本地获取用户信息
  }

}
</script>

<style lang='less' scoped>
.header {
    line-height: 60px;
    // margin-left: 65px;
  .iconn {
    font-size: 25px;
    
  }
  span {
    font-size: 20px;
  }
  .headline{
    margin-left: 10px
  }
}
.headers{
  margin-left: 201px
}

 
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
} 

//固定左侧导航栏
.menu{
  position: fixed;
  left: 0;
}
</style>