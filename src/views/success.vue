<template>
<div>
  <a-result
    status="success"
    title="提交成功"
    sub-title="温馨提示：根据疫情防控要求，请观展人员佩戴好口罩，配合做好测温、亮码等工作，服从管理，文明有序入馆参观。"
  >
  </a-result>
  <a-button type="primary" v-on:click="submit">
    点击查询通行证
  </a-button>
</div>
</template>

<script>
    export default {
        data() {
            return {}
        },
      methods:{
          submit(){
            this.$router.push({
              path: '/search',
            })
          }
      }
    }
</script>

<style lang="less" scoped>
</style>
