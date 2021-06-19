<template>
  <a-table :columns="columns" :data-source="data" rowKey="id" >
    <a slot="action" slot-scope="text" @click="showConfirm(text)">删除</a>
    <a slot="view" slot-scope="text" @click="see(text)">查看</a>
  </a-table>
</template>

<script>
  import { delInfo,searchInfo,passInfo } from "@/api/list";
  const columns = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
    { title: '操作', dataIndex: '', key: 'y', scopedSlots: { customRender: 'view' } },
  ];

  var data = [
  ];
  export default {
    data() {
      return {
        data,
        columns,
        info:''
      };
    },
    mounted() {
      this.info=this.$route.query.info
      var msg=[]
      msg.push({
        id:this.info.surveys[0].id,
        id_number: this.info.id_number,
        name: this.info.name,
        phone: this.info.phone,
        time: this.info.surveys[0].in_library_date
      })
      if(this.info.surveys.length>1){
        for(let i=1;i<this.info.surveys.length;i++){
          msg.push({
            id:this.info.surveys[i].id,
            id_number: this.info.id_number,
            name: this.info.name,
            phone: this.info.phone,
            time: this.info.surveys[i].in_library_date
          })
        }
      }
      this.data=msg
    },
    methods:{
      async del(index,th){
        let params=index
        const res = await delInfo(params);
       if (res.data.status == "success"){
         th.$message.info('删除成功');
       }

        let params1={
          id_number: th.info.id_number,
          name: th.info.name,
          phone: th.info.phone,
        }
        const res1 = await searchInfo(params1);
        if(res1.data.status == "success"){
          var msg1=[]
          msg1.push({
            id:res1.data.survey.surveys[0].id,
            id_number: res1.data.survey.id_number,
            name: res1.data.survey.name,
            phone: res1.data.survey.phone,
            time: res1.data.survey.surveys[0].in_library_date
          })
          if(res1.data.survey.surveys.length>1){
            for(let i=1;i<res1.data.survey.surveys.length;i++){
              msg1.push({
                id:res1.data.survey.surveys[i].id,
                id_number: res1.data.survey.id_number,
                name: res1.data.survey.name,
                phone: res1.data.survey.phone,
                time: res1.data.survey.surveys[i].in_library_date
              })
            }
          }
          th.data=msg1
        }
        else {
          console.log('else')
          th.data=[]
        }
      },
      showConfirm(index) {
        var that=this
        this.$confirm({
          title: '确认删除预约信息吗?',
          content: '预约信息删除后不可恢复',
          onOk() {
            that.del(index,that)
          },
          onCancel() {},
        });
      },
      async see(index){
        let par=index
        const res = await passInfo(par)
        if(res.data.status == "success"){
          this.$router.push({
            path: '/view',
            query: {
              pass : res.data.credentials
            }
          })
        }
        else {
          alert(res.data.reason)
        }
      }
    }
  };
</script>

<style lang="less" scoped>
</style>
