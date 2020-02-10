<template>
  <el-container>
    <el-aside :width="widths">
      <Menu :isCollapse='isCollapse' />
    </el-aside>
    <el-container width='100%'>
      <el-header class="header">

        <el-row type="flex"
                justify="space-between">
          <el-col :span="8"> <i :class="classcheng"
               @click="chenge"></i>
            <span class="headline">心心念念已久的笔记记录平台</span> </el-col>
          <el-col :span="3"  class="user">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" ></el-avatar>
            <el-dropdown>
              <span class="el-dropdown-link">
                用户名<i class="el-icon-arrow-down el-icon--right"></i>
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
      <el-main>
        <!-- 二级路由容器 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import Menu from '@/components/menu.vue';
export default {
  name: '',
  components: {
    Menu
  },
  props: {},
  data () {
    return {
      isCollapse: false,
      widths: '201px',

    }
  },
  methods: {
    chenge () {
      this.isCollapse = !this.isCollapse
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
  created () { }

}
</script>

<style lang='less' scoped>
.header {
    line-height: 60px;
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
.user {
}
 
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
} 
</style>