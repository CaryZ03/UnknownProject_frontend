<template>
    <div id="app">
      <input type="file" ref="fileInput" @change="handleFileChange">
      <button @click="uploadFile">Upload</button>
      <button @click="downloadFile">Download</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      async uploadFile() {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        try {
          await axios.post('/document/upload_file', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          console.log('File uploaded successfully.');
        } catch (error) {
          console.error('File upload failed.');
        }
      },
      async downloadFile() {
        try {
          const response = await axios.post('/download/', {
            file_id: 1, // Replace with the actual file ID
          }, {
            responseType: 'blob', // Important to specify response type as blob
          });
  
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.txt'); // Replace with the actual file name
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error('File download failed.');
        }
      },
    },
  };
  </script>