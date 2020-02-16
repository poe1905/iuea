<template>
  <div>{{$route.params.id}}</div>
</template>


<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      typelist: []
    }
  },
  methods: {
    loddata(){
          // const data = await http('http://127.0.0.1:3000/type')
    // this.typelist = data
    // console.log(data);
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loddata()
  }

}
</script>

<style lang='less' scoped>
</style>