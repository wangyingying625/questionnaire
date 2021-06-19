<template>
  <div>
    <myNav></myNav>
    <div class="content">
      <!--      <a-locale-provider :locale="zh_CN">-->
      <h2 class="head">浙江省档案馆团队参观预约登记</h2>
      <a-form :form="form" class="container" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="submit">
        <a-form-item label="请输入姓名">
          <a-input v-decorator="[
            'name',
            {
              rules: [{ required: true, message: '请输入姓名' }],
            },
          ]"/>
        </a-form-item>
        <a-form-item label="请输入手机号">
          <a-input
            v-decorator="[
            'phone',
            {
              rules: [{ required: true, message: '请输入手机号' }],
            },
          ]"
          />
        </a-form-item>
        <a-form-item label="请输入身份证号码">
          <a-input v-decorator="[
            'id_number',
            {
              rules: [{ required: true, message: '请输入身份证号码' }],
            },
          ]"/>
        </a-form-item>
      </a-form>
      <a-button type="primary" v-on:click="submit">
        提交
      </a-button>
      <!--          </a-locale-provider>-->
    </div>
  </div>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  import { searchInfo } from "@/api/list";
  import myNav from '../components/nav'
  export default {
    data(){
      return{
        zh_CN,
        current: 'yuyue',
        in_library_date:'',
        list:[],
        date: '',
        in_library_time_in:'',
        form: this.$form.createForm(this, {name: 'coordinated'}),
      }
    },
    components: {
      myNav
    },
    methods: {
      async submit(e) {
        e.preventDefault()
        console.log(this.form)
        let params = {
        }
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            params = values
          }
        });
        const res = await searchInfo(params);
        if (res.data.status == "success") {
          this.$router.push({
            path: '/result',
            query: {
              info: res.data.survey
            }
          })
        } else {
          alert(res.data.reason)
        }
      },
      moment,
      onChange(value, dateString) {
        this.date = dateString
        console.log(this.date)
      },
      del(index){
        console.log("del")
        this.list.splice(index, 1);
      },
      addList(){
        let temp={
          name: "",
          id_number: "",
          phone: ""
        }
        this.list.push(temp)
      }
    }
  }
</script>

<style lang="less" scoped>
  .content{
    padding-bottom: 30px;
    margin-top: 30px;
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
        width: 100%;
      }
      .ant-calendar-picker {
        width: 100%;
      }
      .ant-btn{
        width: 100%;
      }
      .list{
        /*text-align: left;*/
        position: relative;
        border: 1px solid rgba(0, 0, 0, 0.25);
        margin-bottom: 15px;
        padding: 15px;
        padding-top: 40px;
        border-radius: 10px;
        /deep/ .ant-form-item {
          margin-bottom: 20px;
          label{
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
