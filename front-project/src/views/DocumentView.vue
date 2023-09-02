<template>
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
  <span class="custom-tree-node" slot-scope="{ node, data }">
      <span v-if="data.isFolder" class="folder-icon"><i class="el-icon-folder">{{ node.label }}</i></span>
      <span v-else class="file-icon"><i class="el-icon-document">{{ node.label }}</i></span>
      
  </span>
</el-tree>
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

      };
    },
    methods: {
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

    },
  };
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    
  }
</style>