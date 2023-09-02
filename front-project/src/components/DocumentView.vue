<template>
  <el-container style="background-color: rgb(255, 255, 255);">

    <!-- 侧边 -->
  <el-aside width="300px" style="border: 1px solid #eee; ">
    <span  class="inherited-styles-for-exported-element">文档目录</span>
      <div  >
              
              <div class="document-list" style="border: 1.5px solid #eee; height: 400px; overflow: auto;
               ">
                <!-- 目录树 -->
              <el-tree
              ref="tree"
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
                  <i class="el-icon-circle-plus-outline" style="background-color: rgb(165, 231, 249);margin-left: 5px;border-radius: 13px;" @click="showDialog(node.data.id)"></i>
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
                  type="info" class="bottom-button"
                  @click="showDirectoryDialog()"
                  icon="el-icon-folder-add"
                  circle>
                </el-button>
              
              
              <el-button
                  size="mini"
                  type="info" class="bottom-button"
                  @click="showDialog(root_id)"
                  icon="el-icon-document-add"
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

                    <el-form-item label="模板">
                      <el-select v-model="newDocument.template" placeholder="请选择模板">
                        <el-option
                          value=""
                          label="不使用模板"
                        ></el-option>
                        <el-option
                          v-for="template in templateList"
                          :key="template.template_id"
                          :label="template.template_name"
                          :value="template.template_id"
                        ></el-option>
                      </el-select>
                    </el-form-item>

                    <!-- 其他表单项 -->
                  </el-form>

                  <span slot="footer" class="dialog-footer">
                    <el-button @click="newDocumentDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addNewDocument(chosen_id)">确定</el-button>
                  </span>
              </el-dialog>

              <!-- 新建文件夹对话框 -->
              <el-dialog
                  title="新建文件夹"
                  :visible.sync="newDirectoryDialogVisible"
                  width="30%"
                  @close="resetNewDirectory"
                >
                  <el-form ref="newDocumentForm" :model="newDirectory">
                    <el-form-item label="文件夹名" required>
                      <el-input v-model="newDirectory.name" placeholder="请输入文件夹名"></el-input>
                    </el-form-item>

                    <!-- <el-form-item label="上次修改时间" required>
                      <el-date-picker v-model="newDocument.lastChangeTime" type="datetime" placeholder="请选择上次修改时间"></el-date-picker>
                    </el-form-item> -->

                    <!-- 其他表单项 -->
                  </el-form>

                  <span slot="footer" class="dialog-footer">
                    <el-button @click="newDirectoryDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addNewDirectory()">确定</el-button>
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
    <el-main style="background-color:#fffcd7;">
      <el-descriptions class="margin-top"  :column="1"  style="max-width: 600px;
      box-shadow: 0px 0px 16px rgba(17, 17, 26, 0.1);" border>
                
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    文件名
                  </template>
                  <p>{{curDocument.name}}</p>
                  
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
padding: 4px 0; max-width: 600px;" v-if="this.isDocumentChosen">
          <span style="float:right">
          <el-button
                size="mini"
                @click="handleEdit()">查看
          </el-button>

          <el-button
                size="mini"
                @click="openDialog()">重命名
          </el-button>

          <el-button
                size="mini"
                type="danger"
                @click="handleDeleteDocument1()">删除
          </el-button>
        </span>

        <el-dialog :visible.sync="dialogVisible" title="重命名" @close="closeDialog">
      <el-input v-model="newName" placeholder="请输入新名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleChange">确定</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </el-dialog>


    </div>
    </el-main>
  </el-container>
</el-container>
  
  
  
</template>


<script>
  export default {
    data() {
      return {

        templateList:[{
          template_id: 1, 
          template_name: 'hihi',
           template_editable: false, 
           template_type: 'document'
        },],
        dialogVisible:false,
        newName: '',

        curNode: '',

        data: [{
            parent_id: 1 ,
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
            name: '-----',
            document_allowed_editors: '',
            size: 1, 
            lastChangeTime: '-----',
            editable: '',
            save_id: ''
        },
        newDocumentDialogVisible: false,
        newDocument: {
          name: '',
          lastChangeTime: '',
          size: '',
          template: '',
        },

        newDirectoryDialogVisible:false,
        newDirectory:{
          name: '',
          lastChangeTime: '',
          size: ''
        },

        root_id: 1,
        chosen_id: 1,
        chosenNode:null,
        beforeDrag:'',
        isDocumentChosen: false
      };
    },
    methods: {

      showTemplateList(){
        const tmp = {
          "template_type": "document",
        }
        this.$api.document.post_show_template_list(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log('template_info:',response.data.template_info)
              this.templateList = response.data.template_info;
              // this.templateList = JSON.parse(response.data.template_info);
            }
            else{
	console.log(response.data)
            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })
        
      },

      openDialog() {
      this.dialogVisible = true;
      this.newName = "";
    },
    closeDialog() {
      this.dialogVisible = false;
      this.newName = "";
    },


      handleChange(){
        const tmp ={
          "document_id": this.curDocument.document_id,
          "document_name":this.newName
        }

        this.$api.document.post_change_document(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

              this.showDirectoryTree();
              this.chooseDocument(this.curNode);

            }
            else{
	            console.log(response.data)
            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })
        
        // 关闭对话框
        this.dialogVisible = false;
        this.newName = "";
      },

      showDialog(id){
        event.stopPropagation(); // 阻止冒泡事件
        this.newDocumentDialogVisible = true;
        this.chosen_id = id

      },
      showDirectoryDialog(){
        event.stopPropagation(); // 阻止冒泡事件
        this.newDirectoryDialogVisible = true;
      },
      addNewDirectory(){
          // event.stopPropagation(); // 阻止冒泡事件
    // 验证表单数据
    this.$refs.newDocumentForm.validate(valid => {
      if (valid) {

        //后端
        const tmp = {
          "name": this.newDirectory.name,
          "project_id": this.project_id,
        }
        console.log("input:",tmp)
        this.$api.document.post_create_directory(tmp).then((response) => {
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


        this.newDirectoryDialogVisible = false;  // 关闭对话框

        this.$message.success('新文件夹添加成功');
      }
        });
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
          "template_id": this.newDocument.template,
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

      resetNewDirectory(){
        this.$refs.newDocumentForm.resetFields();  // 重置表单数据
        this.newDirectoryDialogVisible = false;  // 关闭对话框
      },
      handleEdit(){
        this.$router.push({
          name: "tiptap",
          params:{
            "teamid": this.$store.state.curTeam.team_id,
            "projectid": this.project_id,
            "docid": this.curDocument.document_id
          }
        })
      },

      
      chooseDocument(node){
        event.stopPropagation(); // 阻止冒泡事件

        this.curNode = node
        this.isDocumentChosen =true
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
        this.$confirm('确定要删除文件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            
          //后端逻辑s

          if(node.data.isFolder){  //是文件夹
            // change_directory_recycle
            //True/False 删除/移出回收站
            const tmp={
              "directory_id": node.data.id,
              "recycle": 'True',
            }
            console.log("change_directory_recycle input:",tmp)
            this.$api.document.post_change_directory_recycle(tmp).then((response) => {
              // console.log(tmp)
              // console.log(response.data)
              if (response.data.errno == 0) {
                console.log("获取成功")
                console.log(response.data.msg)
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
        }
        else{  //不是
          
            //True/False 删除/移出回收站
            const tmp={
              "document_id": node.data.id,
              "recycle": 'True',
            }
            console.log("change_document_recycle input:",tmp)
            this.$api.document.post_change_document_recycle(tmp).then((response) => {
              // console.log(tmp)
              // console.log(response.data)
              if (response.data.errno == 0) {
                console.log("获取成功")
                console.log(response.data.msg)
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
        }
          //后端逻辑e

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


      handleDeleteDocument(){
        this.showDeleteButton = ! this.showDeleteButton 
      },

      handleDeleteDocument1(){
        this.$confirm('确定要删除文件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            
          //后端逻辑s
            //True/False 删除/移出回收站
            const tmp={
              "document_id": this.curDocument.document_id,
              "recycle": 'True',
            }
            console.log("change_document_recycle input:",tmp)
            this.$api.document.post_change_document_recycle(tmp).then((response) => {
              // console.log(tmp)
              // console.log(response.data)
              if (response.data.errno == 0) {
                console.log("获取成功")
                console.log(response.data.msg)
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
        
          //后端逻辑e

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
        console.log('drag start, beforeDragNode:', node);
        // this.chosenNode = node;
        this.beforeDrag = node;
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        // console.log('tree drag enter: ', dropNode.label);
        // console.log('draggingNode: ',draggingNode)
        // console.log('dropNode: ',dropNode)
        // console.log('ev:',ev)
      
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        // console.log('tree drag leave: ', dropNode.label);
     
      },
      handleDragOver(draggingNode, dropNode, ev) {
        // console.log('tree drag over: ', dropNode.label);
        
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);

        console.log('draggingNode: ',draggingNode)
        console.log('dropNode: ',dropNode)
        this.chosenNode = draggingNode;

        // if( this.beforeDrag.parent === this.draggingNode.parent)
        //   return

        // console.log('droptype:',dropType)
        
        // //move..
        // //放入文件夹
        // if(dropType === 'inner'){

        
        

        

      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        // console.log('handleDrop:')
        // console.log('draggingNode: ',draggingNode)
        // console.log('dropNode: ',dropNode)

        // console.log('chosenNode:',this.chosenNode)
        // console.log('data:',this.data)
        
        let parentData = dropType != 'inner'? dropNode.parent.data : dropNode.data;
        console.log("parentData:",parentData)

        let directory_id = '';
        if( typeof parentData === 'Array'){ //根目录
          //...
          directory_id = this.root_id;
        }
        else{ //其他目录
          directory_id = parentData.id
        }
        const tmp ={
          "document_id": draggingNode.data.id,
          "directory_id": directory_id
        }
        console.log("move_document input: ",tmp)
        this.$api.document.post_move_document(tmp).then((response) => {
            // console.log(tmp)
            // console.log(response.data)
            if (response.data.errno == 0) {
              console.log("获取成功")
              console.log(response.data.msg)

            }
            else{
	              console.log(response.data)
            }
          }).catch(error => {
            alert("获取失败")
            console.log("error：\n");
            console.log(error)
          })

 

      },



      allowDrop(draggingNode, dropNode, type) {
        if( dropNode == null)
          return false

        if(type == 'inner')
          return dropNode.data.isFolder && !draggingNode.data.isFolder;

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
      this.showTemplateList();
    },
  };
</script>

<style scoped>


.bottom-button{
  color: #1b1913;
  background-color: #faec4e;
  border-color: #1b1913;
}

/* .bottom-button :hover{
  background-color: #FE83C6; 
  border-color: #FE83C6;
}

.bottom-button :focus{
  background-color:  #FE83C6;
  border-color:  #FE83C6;
} */


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
      /* background: #fefefe; */
      background:transparent;
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