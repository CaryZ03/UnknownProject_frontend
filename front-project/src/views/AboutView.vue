<template>
  <div ref="editorContainer" class="editorContainer"></div>
</template>
<script>
import { createEditor } from '@textbus/editor';
import '@textbus/editor/bundles/textbus.min.css';

export default {
  mounted() {
    const editor = createEditor();
    editor.mount(this.$refs.editorContainer)
    editor.onChange.subscribe(() => {
      console.log(editor.getHTML());
    });
  }
}
</script>

<style scoped>
  .editorContainer {
    width: 500px;
    height: 500px;
    
  }
</style>