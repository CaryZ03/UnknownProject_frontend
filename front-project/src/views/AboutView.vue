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

      this.$api.document.post_upload_file(formData)
          .then(function (response) {
            console.log('File uploaded successfully.');
          })
          .catch(function (error) {
            console.error('File upload failed.');
          });
    },
    async downloadFile() {
      const dataObject1 = {
        file_id: 3,
      };
      const jsonString1 = JSON.stringify(dataObject1);
      this.$api.document.post_download_file(jsonString1)
          .then(function (response) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', '823.xlsx'); // Replace with the actual file name
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

          })
          .catch(function (error) {
            console.error('File download failed.');
          });
    },
  },
};
</script>