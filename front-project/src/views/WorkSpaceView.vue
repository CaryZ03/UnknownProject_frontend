<template>
  <div class="background">
    <el-container style="height: 100%; border: 2px solid #eee">
  <!-- 侧边栏 -->
  
  <el-aside width="250px" style="background-color:#2a2d30 ;height: 100%; padding: 0;">
    
    <!-- aside top -->
    <div class="aside-top">
      <i class="el-icon-user"></i>
      <span style="padding-left: 8px;
padding-right: 7px;">{{ this.currentTeam.team_creator }}的团队</span>
      
      <el-popover
  placement="right"
  width="400"
  trigger="click" >
        <!--内容  -->
        <div class=" inherited-styles-for-exported-element2">
          
          <!-- 用户姓名栏 -->
          <div class="flex-shrink-0 p-2 text-ellipsis h-9 text-grey3">
            {{ this.personInform.nickname }}
          </div>
          
          <!-- 团队空间列表 -->
          <div class="overflow-y-auto pb-1 select-none">
            <div>

              <!-- <el-col v-for="document in documentTable" :key="document.id" :span="6"></el-col> -->
              <div style="opacity: 1;" v-for="team in teamList" :key="team.team_id" :span="6" @click="changeCurTeam(team)" >
                <div data-test-id="aside-space-item" class="flex relative items-center justify-between cursor-pointer px-2 rounded text-black animate-hover h-[58px]">
                  <div class="flex items-center w-10/12">
                    <span class="mr-2 flex items-center">
                      <div class="flex items-center">      
                        <div class="relative">
                            <!-- 图标 -->
                            <span class="text-h4 flex flex-shrink-0 select-none 
                            items-center justify-center rounded uppercase 
                            leading-none text-black2 w-[34px] h-[34px]" 
                            style="font-size: 20px; 
                            background-color: rgb(62, 193, 250);">
                            {{getInitials(team.team_creator)}}
                            </span>
                        </div>
                      </div>
                    </span>
                    <div class="w-full text-ellipsis">
                      <div data-no-cancel-selected="true" class="text-ellipsis w-full block">{{team.team_creator}}的团队空间</div>
                      <div class="text-ellipsis text-grey3 text-t4 mt-px w-full">{{team.team_name}}</div>
                    </div>

                    <i class="el-icon-check" v-if="team.team_id === currentTeam.team_id"></i>
                  </div>
                </div>
              </div>



            </div>
          </div>

        </div>


        <el-button  size="mini" icon="el-icon-sort" slot="reference" circle></el-button>
      </el-popover>

        
          
      
    </div>

    <div class="aside-top-below" v-if="this.isProgramChosen === true">
      <span style="padding-left: 8px;
padding-right: 7px;"><i class="el-icon-collection-tag"></i>当前项目：{{ this.currentProgram.name }}</span>
    </div>

    <!-- 返回工作栏按钮 -->
    <div  v-if="this.isProgramChosen === true">
      <el-button  @click="backToWorkspace()" style="margin: 16px 0 0 41px;" size="mini">返回工作台</el-button>
    </div>

    <!-- 左侧导航栏 -->
    <el-menu :default-openeds="[ '1','2',]"  class="el-menu-vertical-demo"
      background-color="#2a2d30"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-collection" ></i>项目管理</template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="1-1" @click="changeContent(3)" v-if="this.isProgramChosen === true"><i class="el-icon-s-order"></i>项目详情</el-menu-item>
          <el-menu-item index="1-2" @click="changeContent(0)" v-if="this.isProgramChosen === false"><i class="el-icon-s-order"></i>项目列表</el-menu-item>
          <el-menu-item index="1-2" @click="changeContent(0)" v-if="this.isProgramChosen"><i class="el-icon-sort"></i>切换项目</el-menu-item>
          <el-menu-item index="1-3" @click="changeContent(0.1)" v-if="this.isProgramChosen === false"><i class="el-icon-delete"></i>回收站</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

      <el-submenu index="2" v-if="this.isProgramChosen === true">
        <template slot="title"><i class="el-icon-document" @click="changeContent(1)"></i>文档管理</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1" @click="changeContent(1)"><i class="el-icon-s-order"></i>文档列表</el-menu-item>
          <el-menu-item index="2-2" @click="changeContent(1.1)"><i class="el-icon-delete"></i>回收站</el-menu-item>
        </el-menu-item-group>

       

        
      </el-submenu>

      <!-- 3 -->
      <el-submenu index="3" v-if="this.isProgramChosen === true">
        <template slot="title"><i class="el-icon-document" @click="changeContent(1)"></i>原型管理</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1" @click="changeContent(4)"><i class="el-icon-s-order"></i>原型列表</el-menu-item>
          <el-menu-item index="3-2" @click="changeContent(4.1)"><i class="el-icon-delete"></i>回收站</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 4 -->
      <el-submenu index="4" v-if="this.isProgramChosen === true">
        <template slot="title"><i class="el-icon-document" @click="changeContent(1)"></i>需求管理</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="4-1" @click="changeContent(5)"><i class="el-icon-s-order"></i>需求列表</el-menu-item>
          <!-- <el-menu-item index="4-2" @click="changeContent(5.1)"><i class="el-icon-delete"></i>回收站</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>




      <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting" @click="changeContent(2)"></i>团队管理</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="5-1" @click="changeContent(2)"><i class="el-icon-user"></i>人员管理</el-menu-item>
          <el-menu-item index="5-2" @click="changeRouter()"><i class="el-icon-chat-line-round"></i>团队群聊</el-menu-item>
          <el-menu-item index="5-3" @click="changeContent(2.2)"><i class="el-icon-info"></i>团队信息</el-menu-item>
        </el-menu-item-group>
        
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <!-- 右边部分 -->
  <el-container>
    <!-- 右侧导航栏 header -->
    <el-header style="color: #eee; font-size: 12px; display: flex">
     
        <el-breadcrumb separator="/" style="margin: 28px 0 0;color:#eee ; ">
          <el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
          <el-breadcrumb-item >工作台</el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.isProgramChosen">{{this.currentProgram.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      
      <span style="margin: 28px 0 0;margin-left: auto; " >
        {{this.personInform.nickname}}

        <router-link to="/Chat" class="menu-bell-router">
          <div class="menu-bell">
            <el-badge class="item" :value="this.$store.state.notificationRedNum" :max="99">
                <i class="el-icon-message-solid" size="large"></i>
            </el-badge>
          </div>
        </router-link>

      <el-dropdown >
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>  
     
    </el-header>
    
    <!-- 右侧主内容 -->
    <el-main >
      <div v-if="isMainVisible">

          <!-- 按钮1 -->
          <transition name="el-fade-in-linear">
            <div v-if="activeIndex ===0">
              
              <span  class="inherited-styles-for-exported-element"><i class="el-icon-s-order"></i>项目列表</span>
             
            <!-- 项目列表（未选中项目时） -->
            <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%" v-if="this.isProgramChosen === false">

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
        <template slot-scope="scope">
    <template v-if="scope.row.editable">
      <div style="display: flex;">
            <el-input v-model="scope.row.name" size="mini" @blur="saveEdit(scope.row)" ref="nameInput"></el-input>
            <el-button type="text" icon="el-icon-check" @click="saveEdit(scope.row)"></el-button>
      </div>
    </template>
    <template v-else>
        <span @click="startEdit(scope.row)">{{ scope.row.name }}</span>
        <el-button type="text" icon="el-icon-edit" @click="startEdit(scope.row)" style="float: right;"></el-button>
    </template>
  </template>
      </el-table-column>

      <el-table-column
        label="负责人" sortable
        prop="person">
      </el-table-column>

      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope" >
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope" >
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
        </template>
      </el-table-column>

            </el-table>

            <!-- 项目列表（选中项目时） -->
            <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%" v-if="this.isProgramChosen ">

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
        <template slot-scope="scope">
    <template v-if="scope.row.editable">
      <div style="display: flex;">
            <el-input v-model="scope.row.name" size="mini" @blur="saveEdit(scope.row)" ref="nameInput"></el-input>
            <el-button type="text" icon="el-icon-check" @click="saveEdit(scope.row)"></el-button>
      </div>
    </template>
    <template v-else>
        <span @click="startEdit(scope.row)">{{ scope.row.name }}</span>
        <el-button type="text" icon="el-icon-edit" @click="startEdit(scope.row)" style="float: right;"></el-button>
    </template>
  </template>
      </el-table-column>

      <el-table-column
        label="负责人" sortable
        prop="person">
      </el-table-column>

      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope" >
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope" >
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">切换</el-button>
   
        </template>
      </el-table-column>

            </el-table>

            <div class="program-bottom" v-if="this.isProgramChosen === false">
               <!--按钮  -->
              <el-button
                  size="mini"
                  type="success" class="bottom-button"
                  @click="newProjectDialogVisible = true"
                  icon="el-icon-circle-plus-outline"
                  >新建项目
              </el-button>

              <el-button
                  size="mini"
                   class="bottom-button"
                  @click="changeContent(0.1)"
                  >回收站
              </el-button>

              <!-- 对话框 -->
              <el-dialog
                  title="新建项目"
                  :visible.sync="newProjectDialogVisible"
                  width="30%"
                  @close="resetNewProject"
                >
                  <el-form ref="newProjectForm" :model="newProject">
                    <el-form-item label="开始时间" required>
                      <el-date-picker v-model="newProject.date" type="date" placeholder="请选择开始日期" format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="项目名称" required>
                      <el-input v-model="newProject.name" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="负责人" required>
                      <el-input v-model="newProject.person" placeholder="请输入负责人"></el-input>
                    </el-form-item> -->
                  </el-form>

                  <span slot="footer" class="dialog-footer">
                    <el-button @click="newProjectDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addNewProject">确定</el-button>
                  </span>
              </el-dialog>
          
          </div>

           
            </div>
          </transition>

          <!-- 按钮1.1 -->
          <transition name="el-fade-in-linear">
            <div v-if="activeIndex ===0.1">
              
              <span  class="inherited-styles-for-exported-element"><i class="el-icon-delete"></i>项目回收站</span>
             
            <el-table
            :data="ProgRecycleTable.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 100%" >
      <!-- column 1 -->
      <el-table-column
        label="开始时间"
        prop="date" sortable icon="el-icon-time">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <!-- column 2 -->
      <el-table-column
        label="项目名称" sortable
        prop="name">
        <!-- <template slot-scope="scope">
    <template v-if="scope.row.editable">
      <div style="display: flex;">
            <el-input v-model="scope.row.name" size="mini" @blur="saveEdit(scope.row)" ref="nameInput"></el-input>
            <el-button type="text" icon="el-icon-check" @click="saveEdit(scope.row)"></el-button>
      </div>
    </template>
    <template v-else>
        <span @click="startEdit(scope.row)">{{ scope.row.name }}</span>
        <el-button type="text" icon="el-icon-edit" @click="startEdit(scope.row)" style="float: right;"></el-button>
    </template>
  </template> -->
      </el-table-column>

      <!-- column 3 -->
      <el-table-column
        label="负责人" sortable
        prop="person">
      </el-table-column>

      <!-- column 4 -->
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
            type="success"
            @click="handleRecycle(scope.$index, scope.row)">Recycle</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete2(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>

            </el-table>

          
           
            </div>
          </transition>

          <!-- 按钮2 -->
          <transition name="el-fade-in-linear">  
            <div v-if="activeIndex === 1">

              <span  class="inherited-styles-for-exported-element">文档列表</span>
              <div>
                <el-dropdown >
                  <span class="el-dropdown-link" >
                   <el-button icon="el-icon-s-grid" size="mini">
                   </el-button>
                   <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="changeDisplay('list')">列表模式</el-dropdown-item>
                    <el-dropdown-item @click.native="changeDisplay('thumbnail')">略缩图模式</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <!-- docuList-top -->
              <div class="program-bottom" style="border-radius: 0px; !important">

                

                <el-button
                  size="mini"
                  type="success" class="bottom-button"
                  @click="newDocumentDialogVisible = true"
                  icon="el-icon-circle-plus-outline"
                  >新建文档
              </el-button>

              <el-button
                  size="mini"
                  type="primary" class="bottom-button"
                  icon="el-icon-upload2"
                  >上传
              </el-button>

              <!-- 新建文档对话框 -->
              <el-dialog
                  title="新建文档"
                  :visible.sync="newDocumentDialogVisible"
                  width="30%"
                  @close="resetNewDocument"
                >
                  <el-form ref="newDocumentForm" :model="newDocument">
                    <el-form-item label="文件名" required>
                      <el-input v-model="newDocument.name" placeholder="请输入文件名"></el-input>
                    </el-form-item>

                    <!-- <el-form-item label="上次修改时间" required>
                      <el-date-picker v-model="newDocument.lastChangeTime" type="datetime" placeholder="请选择上次修改时间"></el-date-picker>
                    </el-form-item> -->

                    <el-form-item label="文件大小" required>
                      <el-input v-model="newDocument.size" placeholder="请输入文件大小"></el-input>
                    </el-form-item>

                    <!-- 其他表单项 -->
                  </el-form>

                  <span slot="footer" class="dialog-footer">
                    <el-button @click="newDocumentDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addNewDocument">确定</el-button>
                  </span>
              </el-dialog>

              </div>
              
              <!-- 列表展示 -->
              <div v-if="displayMode === 'list'">
                 <el-table
             :data="documentTable.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
             :default-sort = "{prop: 'date', order: 'descending'}"
             style="width: 100%" >
                <!-- column 1 -->
                <el-table-column
                  label="文件名" sortable
                  prop="name">
                  <template slot-scope="scope">
              <template v-if="scope.row.editable">
                <div style="display: flex;">
                      <el-input v-model="scope.row.name" size="mini" @blur="saveEditDoc(scope.row)" ref="nameInput"></el-input>
                      <el-button type="text" icon="el-icon-check" @click="saveEditDoc(scope.row)"></el-button>
                </div>
              </template>
              <template v-else>
                  <span @click="startEdit(scope.row)">{{ scope.row.name }}</span>
                  <el-button type="text" icon="el-icon-edit" @click="startEdit(scope.row)" style="float: right;"></el-button>
              </template>
            </template>
                </el-table-column>
          
                <!-- column 2 -->
                <el-table-column
                  label="上次修改时间" sortable
                  prop="lastChangeTime">
                </el-table-column>

                <!-- column 3 -->
                <el-table-column
                  label="文件大小" sortable
                  prop="size">
                </el-table-column>
          
                <!-- column 4 -->
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
                      @click="handleEditDoc(scope.$index, scope.row)">Edit</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDeleteDoc(scope.$index, scope.row)">Delete</el-button>
                  </template>
                </el-table-column>
          
                 </el-table>
              </div>

              <!-- 略缩图展示 -->
              <div v-if="displayMode === 'thumbnail'">
                  <!-- 略缩图模式布局 -->
                  <div class="pic-background">
                    <!-- <el-row>
                    <el-col v-for="document in documentTable" :key="document.id" :span="6">
                      <el-card>
                        <img src="https://cdn.flowus.cn/assets/byte-icon/light/grey/doc-search-two.svg" alt="文档略缩图" style="width: 100%">
                        <div>{{ document.name }}</div>
                      </el-card>
                    </el-col>
                  </el-row> -->

                  <el-row style="display:flex; flex-wrap:wrap">
                     
                        <el-card :body-style="{ padding: '0px' }" v-for="(document,index) in documentTable" :key="index"   shadow="hover" style="margin: 0 0 0 30px; width: 30%; ">
                          <img src="https://cdn.flowus.cn/assets/byte-icon/light/grey/doc-search-two.svg" class="image" style="height: 100px;">
                          <div style="padding: 14px;">
                            <span>{{document.name}}</span>
                            <div class="bottom clearfix">
                              <time class="time">{{ document.lastChangeTime }}</time>
                              <el-button type="danger"  size="mini" style="float:right;" @click="handleDeleteFlex(document,index)">delete</el-button>
                            </div>
                          </div>
                        </el-card>
                      
                  </el-row>
                  </div>
                  
                </div>
                                    
            </div>
              
          </transition>

          <!-- 按钮2.1 -->
          <transition name="el-fade-in-linear">  
            <div v-if="activeIndex === 1.1">

              <span  class="inherited-styles-for-exported-element">回收站</span>


             <el-table
             :data="documentRecycleTable.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
             :default-sort = "{prop: 'date', order: 'descending'}"
             style="width: 100%" >

 
       <!-- column 1 -->
       <el-table-column
         label="文件名" sortable
         prop="name">
         <template slot-scope="scope">
     <template v-if="scope.row.editable">
       <div style="display: flex;">
             <el-input v-model="scope.row.name" size="mini" @blur="saveEditDoc(scope.row)" ref="nameInput"></el-input>
             <el-button type="text" icon="el-icon-check" @click="saveEditDoc(scope.row)"></el-button>
       </div>
     </template>
     <template v-else>
         <span @click="startEdit(scope.row)">{{ scope.row.name }}</span>
         <el-button type="text" icon="el-icon-edit" @click="startEdit(scope.row)" style="float: right;"></el-button>
     </template>
   </template>
       </el-table-column>
 
       <!-- column 2 -->
       <el-table-column
         label="上次修改时间" sortable
         prop="lastChangeTime">
       </el-table-column>

       <!-- column 3 -->
       <el-table-column
         label="文件大小" sortable
         prop="size">
       </el-table-column>
 
       <!-- column 4 -->
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
             type="success"
             @click="handleRecycleDoc(scope.$index, scope.row)">Recycle</el-button>
           <el-button
             size="mini"
             type="danger"
             @click="handleDeleteDoc2(scope.$index, scope.row)">Delete</el-button>
         </template>
       </el-table-column>
 
             </el-table>
            </div>
              
          </transition>

          <!-- 按钮3 -->
          <transition name="el-fade-in-linear">  
            <div v-if="activeIndex === 2">

              <span  class="inherited-styles-for-exported-element">个人信息</span>
              
              <el-card shadow="hover" style="width: 500px;">
                <div style="display: flex; align-items: center;">
                  <el-avatar :size="80" :round="true">{{ getInitials(personInform.nickname) }}</el-avatar>
                  <div style="margin-left: 20px;">
                    <h3>{{ personInform.nickname }}</h3>
                    <p>Realname: {{ personInform.realname }}</p>
                    <p>Email: {{ personInform.address }}</p>
                    <p>Identity: {{ personInform.identity }}</p>
                  </div>
                </div>
              </el-card>

              <span  class="inherited-styles-for-exported-element">团队成员信息</span>

              <el-table
             :data="TeamPersonInform.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
             :default-sort = "{prop: 'date', order: 'descending'}"
             style="width: 100%" >

          
                <!-- column 1 -->
                <el-table-column
                  label="昵称" sortable
                  prop="nickname">
                </el-table-column>

                <!-- column 2 -->
                <el-table-column
                  label="真实姓名" sortable
                  prop="realname">
                </el-table-column>

                 <!-- column 3 -->
                 <el-table-column
                  label="邮箱" sortable
                  prop="address">
                </el-table-column>

                 <!-- column 4 -->
                 <el-table-column
                  label="身份" sortable
                  prop="permission" >

                  <template slot-scope="{ row }">
                      <el-tag :type="getTagType(row.permission)">{{ row.permission }}</el-tag>
                    </template>
                    <!-- <template slot="header" slot-scope="scope">身份
                      <el-select v-model="selectedIdentity" placeholder="请选择身份">
                        <el-option
                          v-for="identity in uniqueIdentities"
                          :key="identity"
                          :label="identity"
                          :value="identity"
                        ></el-option>
                      </el-select>
                    </template> -->
                </el-table-column>

                 <!-- column 5 -->
                 <el-table-column
                  label="加入时间" sortable
                  prop="join_time">
                </el-table-column>
          
                <!-- column 6 -->
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
                      type="success"
                      @click="setIdentity(scope.$index , scope.row)" v-if="personInform.identity === '管理员'">设为管理员</el-button>

                      <el-button
                      size="mini"
                      type="success"
                      @click="showEditIdentityDialog(scope.$index, scope.row)" v-if="personInform.identity === '团队创建者'"
                      >编辑身份</el-button>

                    <el-button
                      size="mini"
                      type="danger"
                      @click="removePerson(scope.$index, scope.row)" v-if="personInform.identity === '团队创建者' || 
                      personInform.identity === '管理员'
                      ">移出团队</el-button>
                  </template>
                </el-table-column>
                

             </el-table>

                 <!-- 生成邀请链接按钮 -->
              <div class="program-bottom" v-if="this.personInform.identity !== '普通成员'">
                <!--按钮  -->
                <el-button
                    size="mini"
                    type="success" class="bottom-button"
                    @click="generateLink()"
                    icon="el-icon-circle-plus-outline"
                    >生成邀请链接
                </el-button>

              </div>

              <!-- changeIdentity -->
              <el-dialog :visible.sync="editIdentityDialogVisible" title="编辑身份" @close="closeEditIdentityDialog">
                      <el-form ref="editIdentityForm" :model="editIdentityForm" label-width="80px">
                        <el-form-item label="姓名">
                          <span>{{ editIdentityForm.realname }}</span>
                        </el-form-item>
                        <el-form-item label="当前身份">
                          <span>{{ editIdentityForm.identity }}</span>
                        </el-form-item>
                        <el-form-item label="选择身份">
                          <el-select v-model="editIdentityForm.newIdentity" placeholder="请选择身份">
                            <el-option label="管理员" value="管理员"></el-option>
                            <el-option label="普通成员" value="普通成员"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="closeEditIdentityDialog">取消</el-button>
                        <el-button type="primary" @click="updateIdentity">确认</el-button>
                      </div>
                </el-dialog>


            </div>
              
          </transition>

          <!-- 按钮3.2 -->
          <transition name="el-fade-in-linear">  
            <div v-if="activeIndex === 2.2">

              <span  class="inherited-styles-for-exported-element">团队信息</span>

              <el-card shadow="hover" style="width: 800px; background-color:#eee ;">
                <el-form :model="currentTeam" label-width="100px">
                <el-form-item label="团队名称" class="item">
                  <template v-if="!isTeamInfoEditing"><el-tag type="info" :disable-transitions="true">{{ currentTeam.team_name }}</el-tag></template>
                  <template v-else>
                    <el-input v-model="currentTeam.team_name"></el-input>
            
                  </template>
                </el-form-item>
                <el-form-item label="团队描述" class="item">
                  <template v-if="!isTeamInfoEditing"><el-tag type="info" :disable-transitions="true">{{ currentTeam.team_description }}</el-tag></template>
                  <template v-else>
                    <el-input v-model="currentTeam.team_description"></el-input>
                  </template>
                </el-form-item>
                <el-form-item label="团队电话" class="item">
                  <template v-if="!isTeamInfoEditing"><el-tag type="info" :disable-transitions="true">{{ currentTeam.team_tel }}</el-tag></template>
                  <template v-else>
                    <el-input v-model="currentTeam.team_tel"></el-input>
                  </template>
                </el-form-item>
                <el-form-item label="团队创建时间" class="item">
                  <template ><el-tag type="info" :disable-transitions="true">{{ currentTeam.team_create_time }}</el-tag></template>
                  
                </el-form-item>
                <el-form-item label="团队创建人" class="item">
                  <template ><el-tag type="info" :disable-transitions="true">{{ currentTeam.team_creator }}</el-tag></template>
                  
                </el-form-item>
              </el-form>

              <el-button v-if="!isTeamInfoEditing" type="primary" icon="el-icon-edit" @click="startEditing" size="mini" style="float:right"></el-button>
              <el-button v-else type="success" icon="el-icon-check" @click="saveChanges" size="mini" style="float:right"></el-button>
              </el-card>
              

             
            </div>
              
          </transition>




          <!-- 按钮4 -->
          <transition name="el-fade-in-linear">  
            <div v-if="activeIndex === 3">

              <span  class="inherited-styles-for-exported-element">项目信息</span>
              
              <el-descriptions class="margin-top"  :column="1" :size="size" v-if="!isProgInfoEditting" border>
                
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    开始日期
                  </template>
                  {{currentProgram.date}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    项目名称
                  </template>
                  {{currentProgram.name}}
                </el-descriptions-item>


                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    负责人
                  </template>
                  {{currentProgram.person}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    描述
                  </template>
                  {{currentProgram.project_description}}
                </el-descriptions-item>

              
                

              </el-descriptions>
              
              

              
              <el-form :model="currentProgram" label-width="100px" v-if="isProgInfoEditting">
                <el-form-item label="日期">
                  <el-input v-model="currentProgram.date" ></el-input>
                </el-form-item>
                <el-form-item label="名称">
                  <el-input v-model="currentProgram.name" ></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input v-model="currentProgram.person" ></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="currentProgram.project_description" ></el-input>
                </el-form-item>
              </el-form>
              
              <span  class="inherited-styles-for-exported-element">
                <el-button type="primary" size="mini" @click="isProgInfoEditting =true" icon="el-icon-edit" v-if="!isProgInfoEditting"  round></el-button>
                <el-button type="success" size="mini" @click="saveProInfo()" icon="el-icon-success" v-if="isProgInfoEditting"  round></el-button>
              </span>
              

            </div>
              
          </transition>


          <!-- 按钮5 -->
          <transition name="el-fade-in-linear">  
            <div v-if="activeIndex === 4">

              <span  class="inherited-styles-for-exported-element">原型列表</span>
              <div>
                <el-dropdown >
                  <span class="el-dropdown-link" >
                   <el-button icon="el-icon-s-grid" size="mini">
                   </el-button>
                   <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="changeDisplay('list')">列表模式</el-dropdown-item>
                    <el-dropdown-item @click.native="changeDisplay('thumbnail')">略缩图模式</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <!-- docuList-top -->
              <div class="program-bottom" style="border-radius: 0px; !important">

                

                <el-button
                  size="mini"
                  type="success" class="bottom-button"
                  @click="newProtoDialogVisible = true"
                  icon="el-icon-circle-plus-outline"
                  >新建原型
              </el-button>

              <el-button
                  size="mini"
                  type="primary" class="bottom-button"
                  icon="el-icon-upload2"
                  >上传
              </el-button>

              <!-- 新建文档对话框 -->
              <el-dialog
                  title="新建原型"
                  :visible.sync="newProtoDialogVisible"
                  width="30%"
                  @close="resetNewProto"
                >
                  <el-form ref="newProtoForm" :model="newProto">
                    <el-form-item label="原型名" required>
                      <el-input v-model="newProto.name" placeholder="请输入原型名"></el-input>
                    </el-form-item>

                    <!-- <el-form-item label="上次修改时间" required>
                      <el-date-picker v-model="newDocument.lastChangeTime" type="datetime" placeholder="请选择上次修改时间"></el-date-picker>
                    </el-form-item> -->

                    <el-form-item label="大小" required>
                      <el-input v-model="newProto.size" placeholder="请输入大小"></el-input>
                    </el-form-item>

                    <!-- 其他表单项 -->
                  </el-form>

                  <span slot="footer" class="dialog-footer">
                    <el-button @click="newProtoDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addNewProto">确定</el-button>
                  </span>
              </el-dialog>

              </div>
              
              <!-- 列表展示 -->
              <div v-if="displayMode === 'list'">
                 <el-table
             :data="protoTable.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
             :default-sort = "{prop: 'date', order: 'descending'}"
             style="width: 100%" >
                <!-- column 1 -->
                <el-table-column
                  label="原型名" sortable
                  prop="name">
                  <template slot-scope="scope">
              <template v-if="scope.row.editable">
                <div style="display: flex;">
                      <el-input v-model="scope.row.name" size="mini" @blur="saveEdit(scope.row)" ref="nameInput"></el-input>
                      <el-button type="text" icon="el-icon-check" @click="saveEdit(scope.row)"></el-button>
                </div>
              </template>
              <template v-else>
                  <span @click="startEdit(scope.row)">{{ scope.row.name }}</span>
                  <el-button type="text" icon="el-icon-edit" @click="startEdit(scope.row)" style="float: right;"></el-button>
              </template>
            </template>
                </el-table-column>
          
                <!-- column 2 -->
                <el-table-column
                  label="上次修改时间" sortable
                  prop="lastChangeTime">
                </el-table-column>

                <!-- column 3 -->
                <el-table-column
                  label="大小" sortable
                  prop="size">
                </el-table-column>
          
                <!-- column 4 -->
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
                      @click="handleEditProto(scope.$index, scope.row)">Edit</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDeleteProto(scope.$index, scope.row)">Delete</el-button>
                  </template>
                </el-table-column>
          
                 </el-table>
              </div>

              <!-- 略缩图展示 -->
              <div v-if="displayMode === 'thumbnail'">
                  <!-- 略缩图模式布局 -->
                  <div class="pic-background">
                    <!-- <el-row>
                    <el-col v-for="document in documentTable" :key="document.id" :span="6">
                      <el-card>
                        <img src="https://cdn.flowus.cn/assets/byte-icon/light/grey/doc-search-two.svg" alt="文档略缩图" style="width: 100%">
                        <div>{{ document.name }}</div>
                      </el-card>
                    </el-col>
                  </el-row> -->

                  <el-row style="display:flex; flex-wrap:wrap">
                     
                        <el-card :body-style="{ padding: '0px' }" v-for="(proto,index) in protoTable" :key="index"   shadow="hover" style="margin: 0 0 0 30px; width: 30%; ">
                          <img src="https://cdn.flowus.cn/assets/byte-icon/light/grey/doc-search-two.svg" class="image" style="height: 100px;">
                          <div style="padding: 14px;">
                            <span>{{proto.name}}</span>
                            <div class="bottom clearfix">
                              <time class="time">{{ proto.lastChangeTime }}</time>
                              <el-button type="danger"  size="mini" style="float:right;" @click="handleDeleteFlexProto(proto,index)">delete</el-button>
                            </div>
                          </div>
                        </el-card>
                      
                  </el-row>
                  </div>
                  
                </div>
                                    
            </div>
              
          </transition>

          <!-- 按钮5.1 -->
          <transition name="el-fade-in-linear">  
            <div v-if="activeIndex === 4.1">

              <span  class="inherited-styles-for-exported-element">回收站</span>


             <el-table
             :data="protoRecycleTable.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
             :default-sort = "{prop: 'date', order: 'descending'}"
             style="width: 100%" >

 
       <!-- column 1 -->
       <el-table-column
         label="原型名" sortable
         prop="name">
         <template slot-scope="scope">
     <template v-if="scope.row.editable">
       <div style="display: flex;">
             <el-input v-model="scope.row.name" size="mini" @blur="saveEdit(scope.row)" ref="nameInput"></el-input>
             <el-button type="text" icon="el-icon-check" @click="saveEdit(scope.row)"></el-button>
       </div>
     </template>
     <template v-else>
         <span @click="startEdit(scope.row)">{{ scope.row.name }}</span>
         <el-button type="text" icon="el-icon-edit" @click="startEdit(scope.row)" style="float: right;"></el-button>
     </template>
   </template>
       </el-table-column>
 
       <!-- column 2 -->
       <el-table-column
         label="上次修改时间" sortable
         prop="lastChangeTime">
       </el-table-column>

       <!-- column 3 -->
       <el-table-column
         label="大小" sortable
         prop="size">
       </el-table-column>
 
       <!-- column 4 -->
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
             type="success"
             @click="handleRecycleProto(scope.$index, scope.row)">Recycle</el-button>
           <el-button
             size="mini"
             type="danger"
             @click="handleDeleteProto2(scope.$index, scope.row)">Delete</el-button>
         </template>
       </el-table-column>
 
             </el-table>
            </div>
              
          </transition>

          <!-- 按钮6 -->
          <transition name="el-fade-in-linear">  
            <div v-if="activeIndex === 5">

              <span  class="inherited-styles-for-exported-element">需求列表</span>
              
              <!-- docuList-top -->
              <div class="program-bottom" style="border-radius: 0px; !important">

                

                <el-button
                  size="mini"
                  type="success" class="bottom-button"
                  @click="newDemandDialogVisible = true"
                  icon="el-icon-circle-plus-outline"
                  >新建需求
              </el-button>

              <el-button
                  size="mini"
                  type="primary" class="bottom-button"
                  icon="el-icon-upload2"
                  >上传
              </el-button>

              <!-- 新建需求对话框 -->
              <el-dialog
                  title="创建新需求"
                  :visible.sync="newDemandDialogVisible"
                  :before-close="handleCloseDialog">
                  <!-- 在这里放置需要用户输入数据的表单 -->
                  <el-form ref="createForm" :model="createForm" label-width="100px">
                    <el-form-item label="需求内容">
                      <el-input v-model="createForm.name" placeholder="请输入需求内容"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                      <el-date-picker v-model="createForm.startTime" type="date" placeholder="请选择开始时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计完成时间">
                      <el-date-picker v-model="createForm.endTime" type="date" placeholder="请选择预计完成时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="负责人">
                      <el-input v-model="createForm.person" placeholder="请输入负责人"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="完成状况">
                      <el-input v-model="createForm.status" placeholder="请输入完成状况"></el-input>
                    </el-form-item> -->
                  </el-form>
                  
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="newDemandDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="createDemand">创建</el-button>
                  </span>
                </el-dialog>

              </div>
              
              <!-- 列表展示 -->

              <!-- editable list -->
              <div>
                  <el-table :data="demandTable.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
                    <!-- 需求内容 -->
                    <el-table-column label="需求内容" prop="name" sortable>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.name" @blur="saveData(scope.row)"></el-input>
                      </template>
                    </el-table-column>

                    <!-- 开始时间 -->
                    <el-table-column label="开始时间" prop="startTime" sortable>
                      <template slot-scope="scope">
                        <el-date-picker
                          v-model="scope.row.startTime"
                          type="date"
                          format="yyyy-MM-dd"
                          
                          @change="saveData(scope.row)">
                        </el-date-picker>
                      </template>
                    </el-table-column>

                    <!-- 预计完成时间 -->
                    <el-table-column label="预计完成时间" prop="endTime" sortable>
                      <template slot-scope="scope">
                        <el-date-picker
                          v-model="scope.row.endTime"
                          type="date"
                          format="yyyy-MM-dd"
                          
                          @change="saveData(scope.row)">
                        </el-date-picker>
                      </template>
                    </el-table-column>

                    <!-- 负责人 -->
                    <el-table-column label="负责人" prop="person" sortable>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.person" @blur="saveData(scope.row)"></el-input>
                      </template>
                    </el-table-column>

                    <!-- 完成状态 -->
                    

                    <el-table-column label="完成状况" prop="status" sortable>
                      <template slot="header" slot-scope="scope">
                        <span>完成状况</span>
                      </template>
                      <template slot-scope="scope">
                        <el-tag :type="[scope.row.status === '已完成' ? 'success' : 'info']">{{ scope.row.status }}</el-tag>
                        <el-dropdown @command="handleStatusChange(scope.row)" trigger="click">
                          <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="已完成" v-if="scope.row.status !== '已完成'">已完成</el-dropdown-item>
                            <el-dropdown-item command="未完成" v-if="scope.row.status !== '未完成'">未完成</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </template>
                    </el-table-column>


                    <!-- 操作列 -->
                    <el-table-column align="right" >
                      <template slot="header" slot-scope="scope">
                    <el-input
                      v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索"/>
                  </template>
                      <template slot-scope="scope">
                        <!-- <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button> -->
                        <el-button size="mini" type="danger" @click="handleDeleteDemand(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                                    
            </div>
              
          </transition>

          <!-- 按钮6.1 -->
          <transition name="el-fade-in-linear">  
            <div v-if="activeIndex === 5.1">

              <span  class="inherited-styles-for-exported-element">回收站</span>
              <!-- 列表展示 -->
              <div>
                  <el-table :data="demandRecycleTable.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
                    <!-- 需求内容 -->
                    <el-table-column label="需求内容" prop="name" sortable>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.name" @blur="saveData(scope.row)"></el-input>
                      </template>
                    </el-table-column>

                    <!-- 开始时间 -->
                    <el-table-column label="开始时间" prop="startTime" sortable>
                      <template slot-scope="scope">
                        <el-date-picker
                          v-model="scope.row.startTime"
                          type="date"
                          format="yyyy-MM-dd"
                          
                          @change="saveData(scope.row)">
                        </el-date-picker>
                      </template>
                    </el-table-column>

                    <!-- 预计完成时间 -->
                    <el-table-column label="预计完成时间" prop="endTime" sortable>
                      <template slot-scope="scope">
                        <el-date-picker
                          v-model="scope.row.endTime"
                          type="date"
                          format="yyyy-MM-dd"
                          
                          @change="saveData(scope.row)">
                        </el-date-picker>
                      </template>
                    </el-table-column>

                    <!-- 负责人 -->
                    <el-table-column label="负责人" prop="person" sortable>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.person" @blur="saveData(scope.row)"></el-input>
                      </template>
                    </el-table-column>

                    <!-- 完成状态 -->
                    

                    <el-table-column label="完成状况" prop="status" sortable>
                      <template slot="header" slot-scope="scope">
                        <span>完成状况</span>
                      </template>
                      <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.status === '已完成'">{{ scope.row.status }}</el-tag>
                        <el-tag type='info' v-else>{{ scope.row.status }}</el-tag>
                        <el-dropdown @command="handleStatusChange(scope.row)" trigger="click">
                          <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="已完成" v-if="scope.row.status !== '已完成'">已完成</el-dropdown-item>
                            <el-dropdown-item command="未完成" v-if="scope.row.status !== '未完成'">未完成</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </template>
                    </el-table-column>


                    <!-- 操作列 -->
                    <el-table-column align="right" >
                      <template slot="header" slot-scope="scope">
                    <el-input
                      v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索"/>
                  </template>
                      <template slot-scope="scope">
                        <el-button size="mini" @click="handleRecycleDemand(scope.$index,scope.row)">回收</el-button>
                        <el-button size="mini" type="danger" @click="handleDeleteDemand2(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
              </div>

           
                                    
            </div>
              
          </transition>
          
      </div>
      
    </el-main>
  </el-container>
</el-container>
  </div>

</template>




<script>
import moment from 'moment';

export default {
  data() {
      
      return {
        isTeamInfoEditing :false,

        isProgInfoEditting : false,
        

        isProgramChosen: false, //是否进入项目详情页
        currentProgram: {
          date: '2016-05-02',
          name: '123213',
          person: 'sddsaw',
          editable: false , // 添加 editable 属性，默认为 false
          // tempName: '' , // 添加 tempName 属性，默认为空字符串

          documentList: [],
          protoList: [],
          demandList: [],
        }, //当前项目

        activeIndex: 0, // 默认选中的按钮索引为0

        //项目表
        tableData: [{
          date: '2016-05-02',
          name: '123213',
          person: 'sddsaw',
          address: '上海市普陀区金沙江路 1518 弄',
          editable: false , // 添加 editable 属性，默认为 false
          // tempName: '' , // 添加 tempName 属性，默认为空字符串

          documentList: [],
          protoList: [],
          demandList: [{
            name:'chaonima',
            startTime: '2021-03-21',
            endTime: '2021-04-25',
            person:'牛魔',
            status: '已完成',
       
          },{
            name:'按队伍啊低洼处',
            startTime: '2022-03-21',
            endTime: '2023-04-25',
            person:'牛魔cb',
            status: '未完成',

          }],


        }, {
          date: '2016-05-04',
          name: 'sb',
          person: 'sddsaw',
          address: '上海市普陀区金沙江路 1517 弄',
          editable: false  ,// 添加 editable 属性，默认为 false
          // tempName: '' , // 添加 tempName 属性，默认为空字符串

          documentList: [],
          protoList: [],
          demandList: [],
        }, {
          date: '2016-05-01',
          name: 'nmsl',
          person: 'sddsaw',
          address: '上海市普陀区金沙江路 1519 弄',
          editable: false , // 添加 editable 属性，默认为 false
          // tempName: ''  ,// 添加 tempName 属性，默认为空字符串

          documentList: [],
          protoList: [],
          demandList: [],
        }, {
          date: '2016-05-03',
          name: 'nmcb',
          person: 'sddsaw',
          address: '上海市普陀区金沙江路 1516 弄',
          editable: false , // 添加 editable 属性，默认为 false
          // tempName: ''  ,// 添加 tempName 属性，默认为空字符串

          documentList: [],
          protoList: [],
          demandList: [],
        }],
        //项目回收站表
        ProgRecycleTable: [{
          date: '2016-02-06',
          name: 'rddfrdg',
          person: 'yyyt',
          address: '上海市普陀区金沙江路 1518 弄',
          editable: false , // 添加 editable 属性，默认为 false
          // tempName: '' , // 添加 tempName 属性，默认为空字符串

          documentList: [],
          protoList: [],
          demandList: [],
        },{
          date: '2016-04-09',
          name: 'awxd',
          person: 'nt',
          address: '上海市普陀区金沙江路 1517 弄',
          editable: false  ,// 添加 editable 属性，默认为 false
          // tempName: ''  // 添加 tempName 属性，默认为空字符串

          documentList: [],
          protoList: [],
          demandList: [],
        }
        ],
        //文档表
        documentTable: [{
          name: 'ajwdw.doc',
          lastChangeTime: '2016-03-21 11:39',
          size: '1.1MB',
          editable: false,
        },{
          name: 'pp.doc',
          lastChangeTime: '2016-06-25 12:21',
          size: '11KB',
          editable: false,
        }],

        documentRecycleTable: [{
          name: 'wdafefrrfr.doc',
          lastChangeTime: '2016-07-21 09:39',
          size: '1.7MB',
          editable: false,
        },{
          name: 'bbc.doc',
          lastChangeTime: '2008-03-21 07:39',
          size: '5.1MB',
          editable: false,
        },
        ],


        //原型表
        protoTable:[{
          name:'dawad',
          lastChangeTime:'2022-12-22 12:11',
          size:'123kb'
        },

        ],

        protoRecycleTable: [],


        //需求表
        demandTable: [],

        demandRecycleTable: [],



        search: '' ,
        isMainVisible: true, // 控制 <el-main> 的可见性

        

        //new project
        newProjectDialogVisible: false,
        newProject: {
          date: '',
          name: '',
          person: ''
        },

        //new document
        newDocumentDialogVisible: false,
        newDocument: {
          name: '',
          lastChangeTime: '',
          size: ''
        },

        //new proto
        newProtoDialogVisible: false,
        newProto: {
          name: '',
          lastChangeTime: '',
          size: ''
        },

        //new demand
        newDemandDialogVisible: false,
        createForm: {
        name: '',
        startTime: null,
        endTime: null,
        person: '',
        status: ''
      },


        displayMode: 'list', // 初始展示模式为列表模式

        

        TeamPersonInform:[{
          nickname: "pencil",
          realname: "铅笔",
          address: "323412132@qq.com",
          permission: "管理员",
          join_time: "2023-08-27T21:01:05.607"
        },{
          nickname: "niumo",
          realname: "煞笔",
          address: "326853442@qq.com",
          permission: "普通成员",
          join_time: "2023-08-27T21:01:05.607"
        },{
          nickname: "dick",
          realname: "迪肯",
          address: "326123092@qq.com",
          permission: "团队创建者",
          join_time: "2023-08-27T21:01:05.607"
        },{
          nickname: "morty",
          realname: "刘兆丰",
          address: "326855092@qq.com",
          permission: "团队创建者",
          join_time: "2023-08-27T21:01:05.607"
        }],

        //changeIdentity
        editIdentityDialogVisible: false,
        editIdentityForm: {
          realname: "",
          identity: "",
          newIdentity: "",
          index: "",
        },
        
        //identity-tag
        selectedIdentity: '', // 当前选中的身份
        uniqueIdentities: [], // 不重复的身份列表


        
        //mounted

        //teamlist
        teamList:[{
          team_id: 10,
          team_name: '牛魔成本',
          team_description: 'nmsl',
          team_tel: '1111112323',
          team_creator: 'ddadadad'
        }],
        // "{\"team_id\": 10, \"team_name\": \"name\",
        //  \"team_description\": null, 
        //  \"team_tel\": null, \"team_create_time\": \"2023-08-25 12:38:41\",
        //   \"team_creator\": \"Vioriey\"}"

        //用show_team接口实现
        currentTeam:{
          team_id: 1,
          team_name: 'niumo',
          team_creator: 'pencil',

        },

        //aside-top
        // teamCreater: 'pencil',

        personInform: {
          nickname: "morty",
          realname: "刘兆丰",
          address: "326855092@qq.com",
          identity: "团队创建者",
        },

      }
    },
  
    methods: {

    changeRouter(){
       this.$router.push({
              path: `/Chat`,
        });
    },

    saveData(row){
      console.log("row:",row)
      let tmpstatus = '';
      if( row.status === '已完成')
       tmpstatus = 'finished'
      else 
       tmpstatus = 'not_started'

      const tmp = {
    "project_id": this.currentProgram.project_id,
    "requirement_id": row.requirement_id,
    "name": row.name,
    "status": tmpstatus,
    "estimated_start_time": row.startTime,
    "estimated_end_time": row.endTime
    }
    console.log("tmp:",tmp)
    this.$api.project.post_change_profile_requirement(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)
              this.getRequirementList()
            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })


    },
    //-- 基本项目列表
   
    getTeamProList(){
      
      const tmp2 = {
            "team_id": this.currentTeam.team_id,
            "recycle": "False",
          }
          console.log("获取项目列表输入：",tmp2)
          this.$api.project.post_check_project_list_team(tmp2).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取团队项目列表成功")
              console.log(response.data.p_info)

              if(response.data.p_info.length === 0){
                    this.tableData = []
                  }
              else{
                  const tmInfoArray = response.data.p_info.map((item) => JSON.parse(item.replace(/\\/g, '')));
                  console.log(tmInfoArray);
                    //赋值
                  this.tableData = tmInfoArray;
                  this.tableData.forEach(program=>{
                    program.editable = false;
                  })
                  // tmInfoArray.forEach(program =>{

                  // });
                }
              
            }
          }).catch(error => {
            alert("获取团队项目列表失败")
            console.log("团队项目列表error：\n");
            console.log(error)
          })
    },

     //- 项目回收站列表
    getTeamProRecycList(){
      const tmp3 = {
            "team_id": this.currentTeam.team_id,
            "recycle": "True"
          }
          console.log("获取项目回收站列表输入：",tmp3)
          this.$api.project.post_check_project_list_team(tmp3).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取团队项目回收站列表成功")
              console.log(response.data.p_info)

              if(response.data.p_info.length === 0){
                    this.ProgRecycleTable = []
                  }
              else{
                  const tmInfoArray = response.data.p_info.map((item) => JSON.parse(item.replace(/\\/g, '')));
                  console.log(tmInfoArray);
                    //赋值
                  // this.tableData = tmInfoArray;
                  this.ProgRecycleTable = tmInfoArray;
                  this.ProgRecycleTable.forEach(program=>{
                    program.editable = false;
                  })
                }
              
            }
          }).catch(error => {
            alert("获取团队项目回收站列表失败")
            console.log("团队项目回收站列表error：\n");
            console.log(error)
          })
    },

    loadInfo(){
          //获取当前团队信息
          this.currentTeam = this.$store.state.curTeam;



          //获取用户的基本信息
          this.$api.user.post_check_profile_self().then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取用户信息成功")
              console.log(response.data.user_info)
              const tmObj = JSON.parse(response.data.user_info);
              console.log(tmObj);

              //赋值
              this.personInform.nickname = tmObj.user_name;
              this.personInform.realname = tmObj.user_real_name;
              this.personInform.address = tmObj.user_email;
              // this.personInform.identity = tmObj;
              
            }
          }).catch(error => {
            alert("获取用户信息失败")
            console.log("用户基本信息error：\n");
            console.log(error);
          })

          //获取用户identity : 输入 id ，teamid
          const data1 = {
            "team_id": this.currentTeam.team_id,
            "user_id": this.$store.state.curUserID,
          }
          // console.log("identity input:",data1)
          // console.log(data1)

          this.$api.team.post_member_role(data1).then((response) => {
            // console.log(tmp)

            if (response.data.errno == 0) {
              console.log("获取用户identity信息成功")
              console.log(response.data.msg)
            
              //赋值
              if(response.data.role === 'creator')
                this.personInform.identity = "团队创建者";
              else if( response.data.role === 'member')
                this.personInform.identity = "普通成员";
              else if(response.data.role === 'manager')
                this.personInform.identity ="管理员";
            }
            else{
              console.log("获取用户identity失败")
              console.log(response.data)
            }
          }).catch(error => {
            alert("获取用户identity失败")
            console.log("获取用户identity error：\n");
            console.log(error);
          })




          //获取用户加入的 团队列表
          const tmp = {
            "choose": "all",
          }
          this.$api.user.post_check_team_list(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取团队列表成功")
              console.log(response.data.tm_info)

              if(response.data.tm_info.length === 0){
                    this.teamList = []
                  }
              else{
                  const tmInfoArray = response.data.tm_info.map((item) => JSON.parse(item.replace(/\\/g, '')));
                  console.log(tmInfoArray);
                    //赋值
                  this.teamList = tmInfoArray;
                }
              
            }
          }).catch(error => {
            alert("获取团队列表失败")
            console.log("团队列表error：\n");
            console.log(error)
          })

          //获取团队的人员列表
          const tmp1 = {
            "team_id": this.currentTeam.team_id,
            "type": "all",
          }
          this.$api.team.post_show_member(tmp1).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取团队人员列表成功",response.data.data.members)
              this.TeamPersonInform = response.data.data.members;
              
              this.TeamPersonInform.forEach(person => {
                // 修改每个成员的permission属性
                if(person.permission === 'creator')
                  person.permission = "团队创建者";
                else if(person.permission === 'manager')
                  person.permission = "管理员";
                else if(person.permission === 'member')
                  person.permission = "普通成员";

              });
              console.log(this.TeamPersonInform)


              
              // const tmInfoArray = response.data.data.members.map((item) => JSON.parse(item.replace(/\\/g, '')));
              // console.log(tmInfoArray);
              //   //赋值
              // this.TeamPersonInform = tmInfoArray;

              
            }
            else{
              console.log("获取团队人员列表失败")
              console.log(response.data)
            }
          }).catch(error => {
            alert("获取团队人员列表失败")
            console.log("团队人员列表error：\n");
            console.log(error)
          })


          //获取团队的项目列表
          //check_project_list_team
          this.getTeamProList();
          // const tmp2 = {
          //   "team_id": this.currentTeam.team_id,
          //   "recycle": "False",
          // }
          // console.log("获取项目列表输入：",tmp2)
          // this.$api.project.post_check_project_list_team(tmp2).then((response) => {
          //   // console.log(tmp)
          //   // console.log(response.data)
          //   if (response.data.errno == 0) {
          //     console.log("获取团队项目列表成功")
          //     console.log(response.data.p_info)

          //     if(response.data.p_info.length === 0){
          //           this.tableData = []
          //         }
          //     else{
          //         const tmInfoArray = response.data.p_info.map((item) => JSON.parse(item.replace(/\\/g, '')));
          //         console.log(tmInfoArray);
          //           //赋值
          //         this.tableData = tmInfoArray;
          //         this.tableData.forEach(program=>{
          //           program.editable = false;
          //         })
          //         // tmInfoArray.forEach(program =>{

          //         // });
          //       }
              
          //   }
          // }).catch(error => {
          //   alert("获取团队项目列表失败")
          //   console.log("团队项目列表error：\n");
          //   console.log(error)
          // })


          //获取团队的项目回收站列表
          this.getTeamProRecycList()
          
         

    },


    changeCurTeam(team){
        this.$store.state.curTeam = team;
        this.loadInfo();
    },

    saveProInfo(){
      //303 change_profile 接口
      //.....
      const tmp = {
        "team_id": this.currentTeam.team_id,
        "project_id": this.currentProgram.project_id,
        "name": this.currentProgram.name,
        "description": this.currentProgram.project_description,
        "estimated_start_time":this.currentProgram.estimated_start_time,
        "estimated_end_time": this.currentProgram.estimated_end_time,
        "editable": "False",
        "status": "doing",
        "recycle": "False"
      }
      this.$api.project.post_change_profile(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })

      this.isProgInfoEditting = false;
    },

    startEditing() {
      this.isTeamInfoEditing = true;
    },
    saveChanges() {
      // 保存团队信息的逻辑
      // 根据需要进行相应的操作，比如发送请求保存数据，切换为非编辑状态等
      // this.$api.team.post_change_team_profile(tmp)

      console.log("saving ....")
      const tmp={
        "team_id": this.currentTeam.team_id,
        "name": this.currentTeam.team_name,
        "description": this.currentTeam.team_description,
        "tel": this.currentTeam.team_tel
      }
      console.log(tmp)
      console.log(this.$store.state.curUserID)
      this.$api.team.post_change_team_profile(tmp).then((response) => {
      // console.log(tmp)
      // console.log(response.data)
      if (response.data.errno == 0) {
        console.log("修改团队信息成功")
        console.log(response.data.msg)

      }
      else{
        console.log(response.data)
      }
    }).catch(error => {
      alert("修改团队信息失败")
      console.log("修改团队信息error：\n");
      console.log(error);
    })
      

      this.isTeamInfoEditing = false;
    },



      editItem(field) {
    // 在这里处理编辑逻辑，可以根据field参数来确定要编辑的表单项
    // 例如，可以将相应的输入框设置为可编辑状态
    this.$refs[field].readonly = false;
  },

      generateLink(){
        const link='wnacudamdawdacdna';
        //link=..
        const el = document.createElement("textarea");
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        this.$message.success("链接已复制到剪贴板");

        this.$alert('链接已生成:'+link, '提示', {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        }); 
       
      },

      handleStatusChange(row) {
      row.status = row.status === '已完成' ? '未完成' : '已完成';
      this.saveData(row);
    },



      backToWorkspace(){
        console.log(1);
        this.isProgramChosen = false;
        this.currentProgram = {};
        this.changeContent(0)
      },

      async changeContent(index) {
       this.activeIndex = -1;
          setTimeout(() => {
          this.activeIndex = index;
        },300); // 这里设置一个延迟，
       
      


    // 根据按钮索引来执行相应的操作，比如请求数据或更新页面内容
    // 示例中直接在控制台输出信息来表示切换内容
   
    console.log(`切换到按钮${index + 1}的内容`);

    
      },

      getRequirementList(){
          //check_requirement_list
        const tmp ={
          "project_id": this.currentProgram.project_id,
        }

        this.$api.project.post_check_requirement_list(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

              const rInfoArray = response.data.r_info.map((item) => JSON.parse(item.replace(/\\/g, '')));
              console.log(rInfoArray);
              this.demandTable = rInfoArray;
              this.demandTable.forEach(demand=>{
                if(demand.status === 'not_started')
                  demand.status = '未完成'
                else if(demand.status === 'finished')
                  demand.status = '已完成'
              })

            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })
      },


      //选中特定project
      handleEdit(index, row) { 

        console.log(index, row);
        this.isProgramChosen = true;
        this.currentProgram = row;
        
        //  前端
        //拷贝 documentTable
        this.documentTable = row.documentList;
        //获取protoTable
        this.protoTable = row.protoList;
        this.demandTable =  row.demandList;


        //后端
        this.getRequirementList();


        this.changeContent(3);//切换到项目信息页面
      },

      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确定要删除项目吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          // const index = this.tableData.indexOf(row);
          // if (index !== -1) {
          //   this.tableData.splice(index, 1);
          //   this.ProgRecycleTable.push(row);
          // }
          const tmp ={
            "team_id": this.currentTeam.team_id,
            "project_id": row.project_id,
            "status": "True"
          }
          this.$api.project.post_change_recycle_status(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

              this.getTeamProList();
              this.getTeamProRecycList();

            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })

          

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      handleDeleteDoc(index, row) {
        console.log(index, row);
        this.$confirm('确定要删除该文件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          const index = this.documentTable.indexOf(row);
          if (index !== -1) {
            this.documentTable.splice(index, 1);
            this.documentRecycleTable.push(row);
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      handleDeleteDoc2(index, row) {
        console.log(index, row);
        this.$confirm('此次删除后将无法恢复，确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          this.documentRecycleTable.splice(index, 1);
       
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      handleDelete2(index, row) {
        console.log(index, row);
        this.$confirm('此次删除后将无法恢复，确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.ProgRecycleTable.splice(index,1);
          const tmp = {
            "team_id": this.currentTeam.team_id,
            "project_id": row.project_id,
          }
          console.log("tmp: ",tmp)
          this.$api.project.post_delete_project(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

              this.getTeamProRecycList();
              
            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      //proto
      handleDeleteProto(index, row) {
        console.log(index, row);
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          const index = this.protoTable.indexOf(row);
          if (index !== -1) {
            this.protoTable.splice(index, 1);
            this.protoRecycleTable.push(row);
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      handleDeleteProto2(index, row) {
        console.log(index, row);
        this.$confirm('此次删除后将无法恢复，确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          this.protoRecycleTable.splice(index, 1);
       
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      //demand
      handleDeleteDemand(index, row) {
        console.log(index, row);
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑

          this.demandTable.splice(index, 1);
          this.demandRecycleTable.push(row);



          //post_delete_requirement
          const tmp={
            "project_id": this.currentProgram.project_id,
            "requirement_id":  row.requirement_id
          }
          this.$api.project.post_delete_requirement(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })

          
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      handleDeleteDemand2(index, row) {
        console.log(index, row);
        this.$confirm('此次删除后将无法恢复，确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          this.demandRecycleTable.splice(index, 1);
       
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },




      startEdit(row) {
    row.editable = true;
    // row.tempName = row.name;  // 将当前名称保存到 tempName 中
    this.$nextTick(() => {  // 等待下一次 DOM 更新后自动聚焦输入框
      this.$refs.nameInput[0].focus();
    });
      },


      saveEdit(row) {
    row.editable = false;
    // row.name = row.tempName;  // 将编辑后的值保存回 name 属性

    // 将编辑后的值保存回 tableData 数组中对应项目的 name 属性
    const targetItem = this.tableData.find(item => item.date === row.date);
    targetItem.name = row.name;
    console.log(this.tableData.find(item => item.date === row.date));
    console.log(this.tableData)
    //上传后端
    // ...
    console.log("row:",row)
    const tmp = {
        "team_id": this.currentTeam.team_id,
        "project_id": row.project_id,
        "name": row.name,
        "description": row.description,
        "estimated_start_time":row.estimated_start_time,
        "estimated_end_time": row.estimated_end_time,
        "editable": "False",
        "status": "doing",
        "recycle": "False"
      }
      this.$api.project.post_change_profile(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })

    

    this.$message({
      type: 'success',
      message: '保存成功'
    });
      },

      saveEditDoc(row) {
    row.editable = false;
    // row.name = row.tempName;  // 将编辑后的值保存回 name 属性

    // 将编辑后的值保存回 tableData 数组中对应项目的 name 属性
    row.name = row.name + '.doc'

    //上传后端
    // ...
    

    this.$message({
      type: 'success',
      message: '保存成功'
    });
      },


      addNewProject() {
        // 验证表单数据
        this.$refs.newProjectForm.validate(valid => {
          if (valid) {
            // 将新项目添加到 tableData 数组中
            // this.tableData.push({
            //   date: moment(this.newProject.date).format('YYYY-MM-DD'),
            //   name: this.newProject.name,
            //   person: this.newProject.person,
            //   address: '' , // 根据需求添加其他属性
            //   editable: false,
              
            //   documentList: [],
            // protoList: [],
            // demandList: [],

            // });

            //create_project
            const tmp = {
              "team_id": this.currentTeam.team_id,
              "name": this.newProject.name,
          }
          console.log("新建项目input：",tmp)
          this.$api.project.post_create_project(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })

            this.newProjectDialogVisible = false;  // 关闭对话框

            this.$message.success('新项目添加成功');
            console.log(this.tableData)
          }
        });
        },
      resetNewProject() {

          this.loadInfo();
          this.$refs.newProjectForm.resetFields();  // 重置表单数据
          this.newProjectDialogVisible = false;  // 关闭对话框
        },
      
      handleRecycle(index, row) {
        // // 将要移动到回收站的项目从 tableData 数组中删除
        // this.ProgRecycleTable.splice(index, 1);

        // // 在回收站表中添加被移动的项目
        // this.tableData.push(row);

        const tmp ={
            "team_id": this.currentTeam.team_id,
            "project_id": row.project_id,
            "status": "False"
          }
        console.log("handleRecycle input: ",tmp)
        this.$api.project.post_change_recycle_status(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

              this.getTeamProList();
              this.getTeamProRecycList();

            }
            else{
              console.log(response.data)
            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })

        
        console.log("after recycling...")
        this.$message({
            type: 'success',
            message: '项目已成功回收'
        });
      },

      handleRecycleDoc(index, row) {

        this.documentRecycleTable.splice(index, 1);
        this.documentTable.push(row);

        this.$message({
            type: 'success',
            message: '文档已成功回收'
        });
      },

      handleRecycleProto(index, row) {

        this.protoRecycleTable.splice(index, 1);
        this.protoTable.push(row);

        this.$message({
            type: 'success',
            message: '已成功回收'
        });
      },

      handleRecycleDemand(index, row) {

        this.demandRecycleTable.splice(index, 1);
        this.demandTable.push(row);

        this.$message({
            type: 'success',
            message: '已成功回收'
        });
      },


      //document

      addNewDocument() {
    // 验证表单数据
    this.$refs.newDocumentForm.validate(valid => {
      if (valid) {

        const currentDate = moment().format('YYYY-MM-DD HH:mm'); // 获取当前时间并格式化
        // 将新文档添加到 documentTable 数组中
        this.documentTable.push({
          name: this.newDocument.name+'.doc',
          lastChangeTime: currentDate,
          size: this.newDocument.size,
          editable: false,
        });

        this.newDocumentDialogVisible = false;  // 关闭对话框

        this.$message.success('新文档添加成功');
      }
    });
      },
      resetNewDocument() {
    this.$refs.newDocumentForm.resetFields();  // 重置表单数据
    this.newDocumentDialogVisible = false;  // 关闭对话框
      },

      //proto
      addNewProto() {
    // 验证表单数据
    this.$refs.newProtoForm.validate(valid => {
      if (valid) {

        const currentDate = moment().format('YYYY-MM-DD HH:mm'); // 获取当前时间并格式化
        // 将新文档添加到 documentTable 数组中
        this.protoTable.push({
          name: this.newProto.name,
          lastChangeTime: currentDate,
          size: this.newProto.size,
          editable: false
        });

        this.newProtoDialogVisible = false;  // 关闭对话框

        this.$message.success('新原型添加成功');
      }
    });
      },

      resetNewProto() {
    this.$refs.newProtoForm.resetFields();  // 重置表单数据
    this.newProtoDialogVisible = false;  // 关闭对话框
      },


      //demand

    handleCloseDialog(done) {
      // 清空表单数据
      this.$refs.createForm.resetFields();
      done();
    },
    createDemand() {
      // 在这里处理创建新需求的逻辑，将数据提交到后端保存
      // 验证表单数据
    this.$refs.createForm.validate(valid => {
      if (valid) {

        const currentDate = moment().format('YYYY-MM-DD HH:mm'); // 获取当前时间并格式化
        // 将新文档添加到 documentTable 数组中
        this.demandTable.push({
          name: this.createForm.name,
          startTime: moment(this.createForm.startTime).format('YYYY-MM-DD'),
          endTime: moment(this.createForm.endTime).format('YYYY-MM-DD'),
          person: this.createForm.person,
          status: '未完成',
          editable: false
        });

        const tmp = {
          "project_id": this.currentProgram.project_id,
          "name": this.createForm.name,
          "estimated_start_time":  moment(this.createForm.startTime).format('YYYY-MM-DD HH:mm:ss'),
          "estimated_end_time":moment(this.createForm.endTime).format('YYYY-MM-DD HH:mm:ss')
        }
        console.log("创建需求输入：",tmp)
        this.$api.project.post_create_requirement(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)
              //刷新需求列表
              this.getRequirementList();
            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })



        console.log(this.createForm);

        

        // 提示用户创建成功或失败
        this.$message.success('创建成功');
        this.newDemandDialogVisible = false;
      }
    });

     
    },
    
 


      changeDisplay(a){
        this.displayMode = a;
        console.log(this.displayMode)
      },

      //document
      handleDeleteFlex(document,index){
        this.$confirm('确定要删除该文件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          this.documentTable.splice(index, 1);
          this.documentRecycleTable.push(document);
       
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
          
      },


      //proto
      handleDeleteFlexProto(proto,index){
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          this.protoTable.splice(index, 1);
          this.protoRecycleTable.push(proto);
       
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
          
      },

      getInitials(name) {
      const splitName = name.split(" ");
      const initials = splitName.map((part) => part[0]).join("");
      return initials.toUpperCase();
    },

    setIdentity(index , row){
      if( row.permission === '普通成员'){
        row.permission = '管理员';

        // this.$api.team.post_add_manager(tmp).then(response)=>
        const tmp ={
          "user_id": row.user_id,
          "team_id": this.currentTeam.team_id
        }
        this.$api.team.post_add_manager(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取团队人员列表成功",response.data.msg)
            
            }
            else{
              console.log("add manager失败")
              console.log(response.data)
            }
          }).catch(error => {
            alert("失败")
            console.log("error：\n");
            console.log(error)
          })
    

        
        this.$message({
            type: 'success',
            message: '设置管理员成功'
        });
      }
      else{
        this.$alert('您的权限不够，只能将普通成员设为管理员', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
      }
      
    },

    removePerson(index,row){
      if(this.personInform.identity === '管理员' && row.permission !== '普通成员'){
        this.$alert('您的权限不够，只能移除普通成员', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
      }
      else if(this.personInform.identity === '团队创建者' && row.address === this.personInform.address){
        this.$alert('不能移除自己', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
      }
      else{
        this.$confirm('确定要移出该成员吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 在这里执行具体的删除逻辑
          this.TeamPersonInform.splice(index,1);

          this.$message({
            type: 'success',
            message: '移除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
        }   
      },

    showEditIdentityDialog(index, row) {
      if(row.permission === '团队创建者'){
        this.$alert('不能修改团队创建者身份', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
      }
      else{
        this.editIdentityForm.realname = row.realname;
      this.editIdentityForm.identity = row.permission;
      this.editIdentityDialogVisible = true;
      this.editIdentityForm.index = index;
      }
    },
    closeEditIdentityDialog() {
      this.$refs.editIdentityForm.resetFields();
      this.editIdentityDialogVisible = false;
    },
    updateIdentity() {
      // 在这里处理更新身份的逻辑，可以通过调用后端接口来实现更新
      // const { realname, newIdentity } = this.editIdentityForm;
      // 更新身份的代码...
      this.TeamPersonInform[this.editIdentityForm.index].identity = this.editIdentityForm.newIdentity;

      // 关闭对话框
      this.closeEditIdentityDialog();
    },

    getTagType(identity) {
    // 根据不同的身份类型返回标签的类型
    // 这里可以根据具体的业务逻辑设置不同的颜色或样式
    if (identity === '普通用户') {
      return 'info';
    } else if (identity === '管理员') {
      return 'success';
    } else if (identity === '团队创建者') {
      return 'warning';
    } else {
      return 'primary';
    }

  },

    
  },

  created(){
    this.uniqueIdentities = Array.from(new Set(this.TeamPersonInform.map(item => item.permission)));
  },

  mounted: function (){
      this.loadInfo();
  }
    
}

</script>
<style >
  /* .item ::v-deep .el-form-item__label {
  font-size: 15px;
  text-align: left;
  color: #7BB5C6;
} */
</style>

<style scoped>
/* 上方展开栏的专属样式*/
body {
  background: #eee;
  /* This is just a helper in case the element has a transparent background or white colors. */
}

/* * {
  outline: 0;
  transition: background-color .1s ease-out;
}

*, ::after, ::before {
  border-style: solid;
  border-width: 0;
  box-sizing: border-box;
} */

.inherited-styles-for-exported-element2 {
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif,
   -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, 
   "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  tab-size: 4;
  width: 100%;
}

svg {
  vertical-align: middle;
}

*, ::after, ::before {
  -webkit-font-smoothing: subpixel-antialiased;
  border-color: #e5e5e5;
}

::selection {
  background: rgba(24, 160, 251, .12);
}

:disabled {
  cursor: default;
}

.text-t2, .text-t4 {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.text-t4 {
  font-size: 12px;
  line-height: 18px;
}

.text-h4 {
  font-size: 18px;
  font-weight: 600;
}

.text-ellipsis {
  overflow: hidden;
  text-wrap: nowrap;
  white-space-collapse: collapse;
}

.animate-hover {
  transition-duration: .1s;
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  user-select: none;
}

.next-modal {
  background-clip: padding-box;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, .03) 0 0 0 1px, rgba(0, 0, 0, .1) 0 3px 6px, rgba(0, 0, 0, .1) 0 12px 20px;
  color: #000;
}

.relative {
  position: relative;
}

.mx-2 {
  margin-left: .5rem;
  margin-right: .5rem;
}

.mr-1 {
  margin-right: .25rem;
}

.mr-2 {
  margin-right: .5rem;
}

.mt-px {
  margin-top: 1px;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
}

.h-full {
  height: 100%;
}

.h-9 {
  height: 2.25rem;
}

.h-5 {
  height: 1.25rem;
}

.h-10 {
  height: 2.5rem;
}

.h-\[34px\] {
  height: 34px;
}

.h-\[58px\] {
  height: 58px;
}

.h-\[1em\] {
  height: 1em;
}

.max-h-\[70vh\] {
  max-height: 70vh;
}

.w-full {
  width: 100%;
}

.w-5 {
  width: 1.25rem;
}

.w-10\/12 {
  width: 83.3333%;
}

.w-64 {
  width: 16rem;
}

.w-\[34px\] {
  width: 34px;
}

.w-\[1em\] {
  width: 1em;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-\[grab\] {
  cursor: grab;
}

.select-none {
  user-select: none;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.overflow-y-auto {
  overflow-y: auto;
}

.text-ellipsis {
  text-overflow: ellipsis;
}

.rounded {
  border-radius: .25rem;
}

.border-t {
  border-top-width: 1px;
}

.border-grey6 {
  border-color: #e5e5e5;
}

.fill-current {
  fill: currentcolor;
}

.p-2 {
  padding: .5rem;
}

.px-2 {
  padding-left: .5rem;
  padding-right: .5rem;
}

.pb-1 {
  padding-bottom: .25rem;
}

.uppercase {
  text-transform: uppercase;
}

.leading-none {
  line-height: 1;
}

.text-grey4 {
  color: #bdbdbd;
}

.text-grey3 {
  color: #828282;
}

.text-black, .text-black2 {
  color: #000;
}

::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.animate-hover:hover {
  background-color: rgba(0, 0, 0, .06);
}

.overflow-y-auto:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, .2);
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, .3) !important;
}

html {
  font-size: 16px;
  /* This is IMPORTANT since some copied values use "REM" units */
}
</style>

<style scoped>


.item .el-form-item__label {
  font-size: 15px;
  text-align: left;
  color: #7BB5C6;
}

.aside-top-below{
  font-size: 15px;
font-weight: 600;
color: #76b5db;
padding-left: 25px;
}
.el-form-item__label {
  font-weight: bold;
}
.el-input.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #dcdfe6;
  color: #c0c4cc;
}

/* el-breadcrumb */
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
        color: #f4f3f1 !important;
        font-weight:400 !important;
}
/* 被选中时的颜色 */
.el-breadcrumb__item:last-child ::v-deep .el-breadcrumb__inner {
        color: #76b5db !important;
        font-weight:800 !important;
}


.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

/* new ^^^^*/


.pic-background{
  background-color: #faf9f9;
  /* border-radius: 5px; */
  padding: 22px 0 22px 31px;
}
.aside-top{
  color: #e7e2e2;
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 20px;
  font-weight: 600;
  line-height: 64px;
  tab-size: 4;
  word-break: break-word;
  margin: 0 0 0 20px;
}

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
    /* line-height: 60px; */
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
  font-size: 15px;
  font-weight: 600;
  line-height: 64px;
  tab-size: 4;
  word-break: break-word;
}
.menu-bell {
  margin: 0 0 0 -49px;
  font-size: 20px;
  position: absolute !important;
  top: 28px;
}
.menu-bell-router {
  color: inherit;
}
</style>