<template>
  <div class="background">
    <el-container style="height: 100%; border: 2px solid #eee">
  <!-- 侧边栏 -->
  <el-aside width="250px" style="background-color:#2a2d30 ;height: 100%; padding: 0;">
    <el-menu :default-openeds="[ '1','2','3']"  class="el-menu-vertical-demo"
      background-color="#2a2d30"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message" ></i>项目管理</template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="1-1" @click="changeContent(0)">项目列表</el-menu-item>
          <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu" @click="changeContent(1)"></i>文档管理</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1" @click="changeContent(1)">文档列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting" @click="changeContent(2)"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <!-- 右边部分 -->
  <el-container>
    <!-- 右侧导航栏 header -->
    <el-header style="text-align: right; font-size: 12px">
      <span class="header-left">项目管理</span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <!-- 右侧主内容 -->
    <el-main >
      <div v-if="isMainVisible">

          <!-- 按钮1 -->
          <transition name="el-zoom-in-center">
            <div v-if="activeIndex ===0">

              <span  class="inherited-styles-for-exported-element">项目列表</span>
          
            <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%" >
      <el-table-column
        label="开始时间"
        prop="date" sortable icon="el-icon-time">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="项目名称" sortable
        prop="name">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
            </el-table>

            <div class="program-bottom">
               <el-button
          size="mini"
          type="success" class="bottom-button"
          >新建项目</el-button>
          <el-button
          size="mini"
          type="success" class="bottom-button"
          >新建项目</el-button>
            </div>
           
            </div>
          </transition>

          <!-- 按钮2 -->
          <transition name="el-zoom-in-center">  
            <div v-if="activeIndex === 1">
              <span  class="inherited-styles-for-exported-element">文档列表</span>

              <el-table :data="tableData" >
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
            </el-table>
            </div>
              
          </transition>
          
      </div>
      
    </el-main>
  </el-container>
</el-container>
  </div>

</template>




<script>

export default {
  data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(2).fill(item) ,
        activeIndex: 0, // 默认选中的按钮索引为0

        //项目表
        tableData: [{
          date: '2016-05-02',
          name: '123213',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: 'sb',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: 'nmsl',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: 'nmcb',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: '' ,
        isMainVisible: true, // 控制 <el-main> 的可见性
      }
    },
  
    methods: {
      async changeContent(index) {
       this.activeIndex = -1;
          setTimeout(() => {
          this.activeIndex = index;
        },300); // 这里设置一个延迟，
       
      


    // 根据按钮索引来执行相应的操作，比如请求数据或更新页面内容
    // 示例中直接在控制台输出信息来表示切换内容
   
    console.log(`切换到按钮${index + 1}的内容`);

    
  },

  handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  },
}

</script>



<style scoped>

.bottom-button{
  margin: 10px;
}
.program-bottom{
  display: flex;
  background-color: #faf9f9;
  margin: 22px 0 0;
  padding: 0 ;
  border-radius: 5px;
  justify-content: flex-end; 
}
   .el-header {
    background-color: #212427;
    color: #e7e2e2;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .el-main{
    background-color: #212427;
    color: #e7e2e2;
  }

  .background{
    height: 1000px;
  }

  .header-left{
    float: left;
  }

  .inherited-styles-for-exported-element {
  color: #e7e2e2;
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 20px;
  font-weight: 600;
  line-height: 64px;
  tab-size: 4;
  word-break: break-word;
}
</style>