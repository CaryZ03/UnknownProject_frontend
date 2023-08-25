<template>
    <el-container>
        <el-aside class="el-aside">Aside</el-aside>

        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
            <el-footer>
                <i class="el-icon-upload icon-set"></i>
                <i class="el-icon-picture icon-set"></i>
                <i class="el-icon-chat-dot-round icon-set"></i>
                <div class="inputArea">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="textarea1"
                    class="inputArea-body">
                    </el-input>
                    <el-button type="success" plain class="send-button">发送</el-button>
                </div>
            </el-footer>
        </el-container>
    </el-container>
</template>
  
  <script>

  export default {
    name: 'Chat',
    components: {
    },
    data() {
        return {
            textarea1: ''
        };
    },
    methods: {
      
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
    .el-header, .el-footer {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    margin-right: 100px;
  }
  .el-footer {
    
    height: 210px !important;
    margin-bottom: -900px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    margin-bottom: -900px;
    width: 500px !important;
    margin-left: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    margin-right: 100px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .icon-set {
    font-size: 30px;
    margin-right: 10px;
  }
  .inputArea {
    margin-top: -15px !important;
  }
  .inputArea-body{
        font-size: 15px;
  }
  .send-button {
    padding: 12px 40px;
    margin: 0px 0 0px 1070px;
  }
  </style>