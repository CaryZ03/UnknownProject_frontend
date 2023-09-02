<template>
    <div>
      <!-- 显示团队信息等内容 -->
      <h1>Welcome to join the team {{ teamName }}!</h1>
      <!-- 其他交互组件和表单 -->
  
      <!-- 提交按钮 -->
      <button @click="joinTeam">Join Team</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'JoinTeam',
    data() {
      return {
        teamId: null,
        day: null,
        teamName: '',
        // 其他需要的数据
        key:'',
      };
    },
    mounted() {
      // 解析链接中的参数
      this.parseLink();
      // 获取团队信息等操作
      this.getTeamInfo();
    },
    methods: {
      parseLink() {
        // 解析链接参数，从路由或 URL 查询字符串中获取团队 ID 和天数等信息
        // 示例：假设使用 Vue Router 进行路由传参
        this.key = this.$route.params.key; // 获取 key 参数值
        console.log("this.key=",this.key)
      },
      getTeamInfo() {
        // 根据团队 ID 获取团队信息，并将团队名称赋值给 teamName 变量
        // 示例：假设使用 API 获取团队信息
        // this.$api.team.getTeamInfo(this.teamId).then((response) => {
        //   if (response.data.errno === 0) {
        //     this.teamName = response.data.teamName;
        //   } else {
        //     console.log(response.data);
        //   }
        // }).catch(error => {
        //   console.log('Error:', error);
        // });
      },
      joinTeam() {
        // 执行加入团队的逻辑，例如发送 API 请求进行加入团队操作
        // 示例：假设使用 API 加入团队
        // const requestData = {
        //   teamId: this.teamId,
        //   // 其他需要的数据
        // };
        // this.$api.team.joinTeam(requestData).then((response) => {
        //   if (response.data.errno === 0) {
        //     // 加入成功后的逻辑
        //     // 示例：跳转到成功页面，或显示提示信息等
        //     this.$router.push('/join/success');
        //   } else {
        //     console.log(response.data);
        //   }
        // }).catch(error => {
        //   console.log('Error:', error);
        // });
      },
    },
  };
  </script>