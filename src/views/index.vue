<template>
  <a-locale-provider :locale="zh_CN">
  <div class="content">
    <h2 class="head">浙江省档案馆团队参观预约登记</h2>
  <a-form  class="container" :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="1.单位名称">
      <a-input v-model="name_entity"/>
    </a-form-item>
    <a-form-item label="2.参观人数">
      <a-input  v-model="attendance"/>
    </a-form-item>
    <a-form-item label="3.领队姓名">
      <a-input v-model="leader_name"/>
    </a-form-item>
    <a-form-item label="4.领队手机号码">
      <a-input v-model="manager_mobile_phone_number"/>
    </a-form-item>
    <a-form-item label="5.入馆日期">
      <a-date-picker  :in_library_date="moment( 'YYYY-MM-DD')"/>
    </a-form-item>
    <a-form-item label="6.入馆时段">
      <a-time-picker  :in_library_time_in="moment('00:00', 'HH:mm')" format="HH:mm"/>
      <a-time-picker  :in_library_time_out="moment('00:00', 'HH:mm')" format="HH:mm"/>
    </a-form-item>
  </a-form>
  <a-button type="primary" v-on:click="submit">
    提交
  </a-button>
 </div>
  </a-locale-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  import { submitInfo } from "@/api/list";
  export default {
    data(){
      return{
        zh_CN,
        in_library_date:'',
        attendance:'',
        manager_mobile_phone_number:'',
        leader_name:'',
        name_entity:'',
        in_library_time_in:'',
        in_library_time_out:''
      }
    },
    methods:{
      async submit(){
        console.log('submit')
        let parms={
          in_library_date:this.in_library_date,
          attendance:this.attendance,
          manager_mobile_phone_number:this.manager_mobile_phone_number,
          leader_name:this.leader_name,
          name_entity:this.name_entity,
          in_library_time_in:this.in_library_time_in,
          in_library_time_out:this.in_library_time_out
        }
        console.log(parms)
        const res = await submitInfo(parms);
        console.log(res)
        this.$router.push({
          path: '/success',
        })
      },
      moment,
    }
  }
</script>

<style lang="less" scoped>
  .content{
    padding-bottom: 30px;
    .head {
      margin-bottom: 80px;
      padding-bottom: 30px;
      border-bottom: 3px solid #53a4f4;
    }
    .container {
      padding: 0 30px;
      padding-bottom: 20px;
    /deep/ .ant-form-item {
      margin-bottom: 50px;
      label{
        font-size: 20px;
      }
    }
      .ant-time-picker{
        margin-right: 20px;
      }
    .ant-calendar-picker {
      width: 100%;
    }
  }
  }
</style>
