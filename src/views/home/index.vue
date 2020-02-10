<template>
  <el-container>
    <el-aside :width="widths">
      <Menu :isCollapse='isCollapse' />
    </el-aside>
    <el-container width='100%'>
      <el-header class="header">
 
        <i :class="classcheng"
           @click="chenge"></i>
           <span>心心念念已久的笔记记录平台</span>
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
    classcheng:function () {
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
.header{
  .iconn {
    font-size: 25px;
  }
  span {
    font-size: 20px;
  }
  line-height: 60px;
}
</style>