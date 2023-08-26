<template>
    <div>
    <Navbar></Navbar>
    <div class="textTitle">
      <h1>文章标题</h1>
    </div>
    <div class="textContainer">
        <div ref="editorContainer"></div>
    </div>
  </div>
</template>
  
  <script>
import Navbar from '@/components/Navbar.vue';
import { createEditor } from '@textbus/editor';
import '@textbus/editor/bundles/textbus.min.css';

  export default {
    name: 'Chat',
    components: {
    Navbar
},
    data() {
        return {
            
        };
    },
    mounted() {
        const editor = createEditor();
        editor.mount(this.$refs.editorContainer)
        editor.onChange.subscribe(() => {
        console.log(editor.getHTML());
        });
    },
    updated() {

    },
    methods: {
        
        }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .textTitle {
    margin: 0 0 0 73px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .textContainer {
    width: 80%;
    margin: 0 0 0 200px;
  }
  .textbus-toolbar-wrapper {
    width: 100%;
  }
  </style>