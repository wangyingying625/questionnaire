<template>
  <div>
    <myNav></myNav>

  <div style="display: flex;justify-content: center;padding-top: 40px">

  <a-card title="预约通行证" style="width: 300px">
    <p>id： {{pass.id}}</p>
    <p>姓名： {{pass.name}}</p>
    <p>手机号： {{pass.phone}}</p>
    <p>预约时间： {{pass.time}}</p>
  </a-card>
  </div>
  </div>
</template>

<script>
  import myNav from '../components/nav'
    export default {
        data() {
            return {
              pass:''
            }
        },
      components: {
        myNav
      },
      mounted() {
          this.pass=this.$route.query.pass
        let msg=JSON.parse(this.pass)
        this.pass=msg
      }
    }
</script>

<style lang="less" scoped>
</style>
