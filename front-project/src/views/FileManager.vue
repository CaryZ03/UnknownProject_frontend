<template>
    <div class="file-folder-manager">
      <h2>文件夹管理器</h2>
      <div class="folders">
        <draggable v-model="folders" :options="dragOptions" class="folder-list">
          <div
            v-for="(folder, index) in folders"
            :key="folder.id"
            class="folder"
          >
            <div class="folder-header">
              <span class="folder-name">{{ folder.name }}</span>
              <button @click="removeFolder(index)">删除</button>
            </div>
          </div>
        </draggable>
      </div>
      <div class="add-folder">
        <input v-model="newFolderName" placeholder="输入文件夹名称" />
        <button @click="addFolder">添加文件夹</button>
      </div>
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  
  export default {
    components: {
      draggable,
    },
    data() {
      return {
        folders: [
          { id: 1, name: '文件夹1' },
          { id: 2, name: '文件夹2' },
          { id: 3, name: '文件夹3' },
        ],
        newFolderName: '',
        dragOptions: {
          animation: 150,
        },
      };
    },
    methods: {
      addFolder() {
        if (this.newFolderName.trim() !== '') {
          const newFolder = {
            id: Date.now(),
            name: this.newFolderName,
          };
          this.folders.push(newFolder);
          this.newFolderName = '';
        }
      },
      removeFolder(index) {
        this.folders.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .file-folder-manager {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .folder-list {
    list-style: none;
    padding: 0;
  }
  
  .folder {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    padding: 10px;
  }
  
  .folder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .folder-name {
    font-weight: bold;
  }
  
  .add-folder {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  
  .add-folder input {
    padding: 5px;
    margin-right: 10px;
  }
  
  .add-folder button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .add-folder button:hover {
    background-color: #0056b3;
  }
  </style>
  