<template>
  <div>
    <myNav></myNav>
  <div class="content">
<!--      <a-locale-provider :locale="zh_CN">-->
    <h2 class="head">浙江省档案馆团队参观预约登记</h2>
  <a-form :form="form" class="container" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="submit">
    <a-form-item label="入馆日期">
      <a-date-picker :disabled-date="disabledDate" v-decorator="[
            'in_library_date',
            {
              rules: [{ required: true, message: '请输入入馆日期' }],
            },
          ]" format="YYYY-MM-DD" @change="onChange1"/>
    </a-form-item>
    <a-form-item label="入馆时段">
      <a-time-picker v-decorator="[
            'in_library_time_in',
            {
              rules: [{ required: true, message: '请输入入馆时段' }],
            },
          ]" format="HH:mm" @change="onChange"/>
    </a-form-item>
    <div class="list" v-for="(item,index) in list" :key="index">
      <p style="position: absolute;left: 15px;top: 10px">成员{{index+1}}</p>
      <p style="position: absolute;right: 15px;top: 10px;cursor: pointer" @click="del(index)"><a-icon type="close-circle" /></p>
      <a-form-item label="姓名">
        <a-input  v-model=item.name />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input  v-model=item.phone />
      </a-form-item>
      <a-form-item label="身份证号">
        <a-input v-model=item.id_number />
      </a-form-item>
    </div>
    <a-button type="primary" @click="addList"> <a-icon type="plus" /> 添加一个成员 </a-button>
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
  import { submitInfo } from "@/api/list";
  import myNav from '../components/nav'
  export default {
    data(){
      return{
        zh_CN,
        current: 'yuyue',
        in_library_date:'',
        list:[],
        date: '',
        time:'',
        in_library_time_in:'',
        form: this.$form.createForm(this, {name: 'coordinated'}),
      }
    },
    components: {
      myNav
    },
    methods: {
      disabledDate(current) {
        let dataDis= current > moment().add(3, 'days').endOf('day') || current < moment().subtract(1, 'days').endOf('day')
        return dataDis
      },
      async submit(e) {
        e.preventDefault()
        console.log(this.form)
        let params = {
          members:this.list
        }
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            params = values
          }
        });
        let in_library_date = this.time + ' '+this.date
        console.log(in_library_date)
        params.in_library_date = in_library_date
        params.members=this.list
        const res = await submitInfo(params);
        if (res.data.status == "success") {
          this.$router.push({
            path: '/success',
          })
        } else {
          alert(res.data.reason)
        }
      },
      moment,
      onChange(value, dateString) {
        this.date = dateString
        // console.log(this.date)
      },
      onChange1(value, dateString) {
        this.time = dateString
        // console.log(this.time)
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
