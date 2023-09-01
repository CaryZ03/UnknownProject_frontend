<template>
  <el-container style="background-color: rgb(255, 255, 255);">

    <!-- 侧边 -->
  <el-aside width="300px" style="border: 1px solid #eee">
    
      <div>
              <span  class="inherited-styles-for-exported-element">文档目录</span>
              <div class="document-list" style="border: 1px solid #eee; min-height: 300px;">
              <el-tree
              :data="data"
              node-key="id"
              default-expand-all

              @node-drag-start="handleDragStart"
              @node-drag-enter="handleDragEnter"
              @node-drag-leave="handleDragLeave"
              @node-drag-over="handleDragOver"
              @node-drag-end="handleDragEnd"
              @node-drop="handleDrop"
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag">
              <span class="custom-tree-node" slot-scope="{ node, data }" style="display: flex;align-items: center;margin-left: 8px;" @click="chooseDocument(node)">
                <span v-if="data.isFolder" class="folder-icon">
                  <i class="el-icon-folder">{{ node.label }}</i>
                  <i class="el-icon-circle-plus-outline" style="background-color: aqua;margin-left: 5px;" @click="showDialog(node.data.id)"></i>
                   <!-- <el-button icon="el-icon-plus" type="primary" size="mini" circle></el-button> -->
                </span>
                <span v-else class="file-icon"><i class="el-icon-document">{{ node.label }}</i>  </span>
                <el-button
                    v-if="showDeleteButton"
                    size="mini"
                    icon="el-icon-close"
                    circle
                    @click="handleDeleteNode(node)"
                    
                  ></el-button>
              </span>
              </el-tree>
              </div>
              <!-- button -->
              <div class="program-bottom" style="border-radius: 0px; !important">
              <!-- @click="newDocumentDialogVisible = true"   -->
              <el-button
                  size="mini"
                  type="success" class="bottom-button"
                  @click="showDialog(root_id)"
                  icon="el-icon-circle-plus-outline"
                  circle>
                </el-button>

                <el-button
                  size="mini"
                  type="danger" class="bottom-button"
                  @click="handleDeleteDocument()"
                  icon="el-icon-delete"
                  circle>
                </el-button>

                <el-button
                  size="mini"
                  type="primary" class="bottom-button"
                  icon="el-icon-upload2"
                  circle>
                </el-button>
              </div>

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

                    <!-- 其他表单项 -->
                  </el-form>

                  <span slot="footer" class="dialog-footer">
                    <el-button @click="newDocumentDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addNewDocument(chosen_id)">确定</el-button>
                  </span>
              </el-dialog>
    </div>
  </el-aside>

  <!-- 右侧 -->
  <el-container >
    <el-header>
      <span  class="inherited-styles-for-exported-element">
        <!-- <img url="https://img2.baidu.com/it/u=2688895258,3553323007&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"> -->
        <el-image
      style="width: 20px; height: 20px"
      src="https://img2.baidu.com/it/u=2688895258,3553323007&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      fit="cover"></el-image>
        当前文件：
      </span>
    </el-header>


    <!-- main -->
    <el-main>
      <el-descriptions class="margin-top"  :column="1" :size="size" style="max-width: 600px;" border>
                
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    文件名
                  </template>
                  {{curDocument.name}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    上次修改时间
                  </template>
                  {{curDocument.lastChangeTime}}
                </el-descriptions-item>

              </el-descriptions>
      <div style="margin: 16px 0 0;
padding: 4px 0; max-width: 600px;">
          <span style="float:right">
          <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">查看
          </el-button>

          <el-button
                size="mini"
                type="danger"
                @click="handleEdit(scope.$index, scope.row)">删除
          </el-button>
        </span>
    </div>
    </el-main>
  </el-container>
</el-container>
  
  
  
</template>


<script>
  export default {
    data() {
      return {
        data: [{
            id: 1,
            label: '文件夹 1',
            isFolder: true,
            children: [
              {
                id: 2,
                label: '文件 1',
                isFolder: false,
          
              },
              {
                id: 3,
                label: '文件 2',
                isFolder: false,
               
              }
            ]
          }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        curUserID: '',
        curTeam: '',
        showDeleteButton:false,

        curDocument:{
            document_id: '',
            name: 'csndm',
            document_allowed_editors: '',
            size: 1, 
            lastChangeTime: '2022-10-10',
            editable: '',
            save_id: ''
        },
        newDocumentDialogVisible: false,
        newDocument: {
          name: '',
          lastChangeTime: '',
          size: ''
        },
        root_id: 1,
        chosen_id: 1,
      };
    },
    methods: {

      showDialog(id){
        event.stopPropagation(); // 阻止冒泡事件
        this.newDocumentDialogVisible = true;
        this.chosen_id = id

      },

      addNewDocument(folder_id) {

        // event.stopPropagation(); // 阻止冒泡事件
    // 验证表单数据
    this.$refs.newDocumentForm.validate(valid => {
      if (valid) {

        //后端
        const tmp = {
          "document_name": this.newDocument.name,
          "directory_id": folder_id,
        }
        console.log("input:",tmp)
        this.$api.document.post_create_document(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)
              // this.
              this.showDirectoryTree();

            }
            else{
              console.log(response.data)
            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })


        this.newDocumentDialogVisible = false;  // 关闭对话框

        this.$message.success('新文档添加成功');
      }
    });
      },

      resetNewDocument() {
    this.$refs.newDocumentForm.resetFields();  // 重置表单数据
    this.newDocumentDialogVisible = false;  // 关闭对话框
      },

      
      chooseDocument(node){
        event.stopPropagation(); // 阻止冒泡事件
        console.log("node:",node)
        if( node.data.isFolder)
          console.log('is Folder,over...')
        else{
          const tmp = {
            "document_id":node.data.id,
          }
          console.log("input:",tmp)
          this.$api.document.post_search_document(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.document_info)
              console.log(JSON.parse(response.data.document_info))

              this.curDocument = JSON.parse(response.data.document_info)
              

            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })
          
        }
        
      },

      handleDeleteNode(node){
        event.stopPropagation(); // 阻止冒泡事件
        console.log("1111111")
      },


      handleDeleteDocument(){
        this.showDeleteButton = ! this.showDeleteButton 
      },

      showDirectoryTree(){
          const tmp ={
            "project_id":this.project_id,
          };
          this.$api.document.post_show_directory_tree(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.items_info)
              this.data = response.data.items_info;
              this.root_id = response.data.root_id;
              console.log("rootid:",this.root_id)
            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })

      },

      handleDragStart(node, ev) {
        console.log('drag start', node);
        
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
        
      
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
     
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
        
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        this.draggingNode = null;
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        
      },
      allowDrop(draggingNode, dropNode, type) {
        if( dropNode == null)
          return false

        if(type == 'inner')
          return dropNode.data.isFolder ;

        return true
      },
      allowDrag(draggingNode) {
        // return !node.data.isFolder || !node.data.isDropAllowed;
        return 1;
      },
    },
    props: {
    project_id: {
      
      required: true
    }
    },

    mounted: function(){
      this.$store.state.curUserID = localStorage.getItem("curUserID");
      this.$store.state.curTeam = JSON.parse(localStorage.getItem("curTeam"));
      this.curUserID = this.$store.state.curUserID;
      this.curTeam = this.$store.state.curTeam;
      console.log("received data: ",this.project_id)
      this.showDirectoryTree();
    },
  };
</script>

<style scoped>
.document-list{
  /* width: 300px; */
  margin-left: 5px;
  margin-right: 5px;
}

.inherited-styles-for-exported-element {
  padding: 0 0 0 16px;
  color: #414040;
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 15px;
  font-weight: 600;
  line-height: 64px;
  tab-size: 4;
  word-break: break-word;
  /* background-color: #faf9f9; */
}
.program-bottom{
  display: flex;
  background-color: #faf9f9;
  /* margin: 22px 0 0; */
  padding: 15px 12px 13px 0;
 
  border-radius: 5px;
  justify-content: flex-end; 
}
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    /* padding: 18px 8px 14px 0; */
    height: 20px;
    
  }
</style>

<style scoped>

    
    /* el-tree 背景 */
    .el-tree {
      background: #fefefe;
    }
    .el-tree-node__content {
      height: 50px;
    }
    
    /* 节点字体 */
    .custom-tree-node{
      height: 40px;
      font-size: 14px;
      font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
      font-weight: 400;
      color: #1b1a1a;
      line-height: 18px;
    }

  /* .tree {
    width: 440px;
    height: 849px;
    border: 1px solid;
    border-image: linear-gradient(132deg, rgba(126, 187, 253, 0), rgba(107, 161, 253, 1), rgba(88, 135, 254, 0), rgba(54, 89, 254, 1)) 1 1;
    background: #02163C;
  } */

</style>