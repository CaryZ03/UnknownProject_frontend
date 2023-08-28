<template>
  <div class="container" v-if="editor">
    <div class="header">
      <!-- <t-button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" variant="text" ghost>幽灵按钮</t-button> -->
      <t-button variant="text" @click="saveHTML" ghost>saveHTML</t-button>
      <t-button variant="text" @click="saveMD" ghost>saveMD</t-button>
      <t-button variant="text" @click="saveWord" ghost>saveWord</t-button>
      <t-button variant="text" @click="saveText" ghost>saveText</t-button>
      <t-button variant="text" @click="downPDF" ghost>downPDF</t-button>
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        ghost
        >B</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        ghost
        >Italic</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        ghost
        >Strike</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        ghost
        >code</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().unsetAllMarks().run()"
        ghost
        >UnsetMK</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().clearNodes().run()"
        ghost
        >clearNode</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
        ghost
        >Para</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        ghost
        >h1</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        ghost
        >h2</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        ghost
        >h3</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        ghost
        >h4</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        ghost
        >h5</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        ghost
        >h6</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        ghost
        >Bull</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        ghost
        >Ord</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        ghost
        >CodeBlock</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().setHorizontalRule().run()"
        ghost
        >H</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().setHardBreak().run()"
        ghost
        >HdBrk</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        ghost
        >Undo</t-button
      >
      <t-button
        variant="text"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        ghost
        >Redo</t-button
      >

      <t-button @click="generateLink" variant="text" ghost>分享链接</t-button>
      <!-- <t-button variant="text" ghost>幽灵按钮</t-button> -->
    </div>

    <floating-menu
      class="floating-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
    >
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet List
      </button>
    </floating-menu>

    <editor-content id="pdfDom" class="editor__content" :editor="editor" />
  </div>
</template>
  
  <script>
import {
  CodeIcon,
  LettersDIcon,
  LettersSIcon,
  LettersEIcon,
  LettersIIcon,
  LettersNIcon,
  LettersGIcon,
  ComponentCheckboxIcon,
  ComponentInputIcon,
  ComponentSwitchIcon,
  ComponentBreadcrumbIcon,
  ComponentDropdownIcon,
  ComponentRadioIcon,
  ComponentStepsIcon,
} from "tdesign-icons-vue";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import CharacterCount from "@tiptap/extension-character-count";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent, FloatingMenu } from "@tiptap/vue-2";
import Mention from "@tiptap/extension-mention";
import * as Y from "yjs";
import MenuBar from "./MenuBar.vue";

import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";
import TurndownService from "turndown";
import suggestion from "./suggestion.js";

const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};
//获取文档ID
const getDocuID = () => {
  return utils.getCookie("editDocID");
};
//获取用户姓名
const UserName = () => {
  return utils.getCookie("UserName");
};

export default {
  components: {
    EditorContent,
    MenuBar,
    FloatingMenu,
  },

  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem("currentUser")) || {
        name: this.$store.state.curUserName,
        color: this.getRandomColor(),
      },
      provider: null,
      editor: null,
      status: "connecting",
      room: "room1",
    };
  },

  mounted() {
    const ydoc = new Y.Doc();
    this.provider = new TiptapCollabProvider({
      appId: "7j9y6m10",
      name: this.room,
      document: ydoc,
    });

    this.provider.on("status", (event) => {
      this.status = event.status;
    });

    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Mention.configure({
          HTMLAttributes: {
            class: "mention",
          },
          suggestion,
        }),

        Highlight,
        TaskList,
        TaskItem,
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: this.currentUser,
        }),
        CharacterCount.configure({
          limit: 10000,
        }),
      ],
    });

    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
  },

  methods: {
    setName() {
      const name = (window.prompt("Name") || "").trim().substring(0, 32);

      if (name) {
        return this.updateCurrentUser({
          name,
        });
      }
    },

    updateCurrentUser(attributes) {
      this.currentUser = { ...this.currentUser, ...attributes };
      this.editor.chain().focus().updateUser(this.currentUser).run();

      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    },

    getRandomColor() {
      return getRandomElement([
        "#958DF1",
        "#F98181",
        "#FBBC88",
        "#FAF594",
        "#70CFF8",
        "#94FADB",
        "#B9F18D",
      ]);
    },

    getRandomName() {
      return getRandomElement(["Pencil", "Pencil2", "Xeon", "WEI", "CR", "W"]);
    },
    // -------------------------------关于导出----------------------------------
    toHTML() {
      console.log(this.editor.getHTML());
    },

    toJSON() {
      console.log(this.editor.getJSON());
    },

    toMD() {
      const turndown = new TurndownService({
        emDelimiter: "_",
        linkStyle: "inlined",
        headingStyle: "atx",
      });

      const markdown = turndown.turndown(this.editor.getHTML());
      console.log(markdown);
    },

    toText() {
      console.log(this.editor.getText());
    },

    downPDF() {
      let iframe = document.getElementById("pdfDom");

      const el = document.getElementById("pdfDom");
      iframe = document.createElement("IFRAME");
      iframe.setAttribute("id", "print-iframe");
      iframe.setAttribute(
        "style",
        "position:absolute;width:0px;height:0px;left:-999em;top:-500px;"
      );
      document.body.appendChild(iframe);
      let doc = iframe.contentWindow.document;
      doc.write('<LINK rel="stylesheet" type="text/css" href="css/print.css">');
      doc.write("<div>" + el.innerHTML + "</div>");
      doc.close();
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      if (navigator.userAgent.indexOf("MSIE") > 0) {
        document.body.removeChild(iframe);
      }
    },

    saveWord() {
      let htmlStr = document.querySelector("#pdfDom").innerHTML;
      let page = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${htmlStr}
        </body></html>`;

      saveAs(
        htmlDocx.asBlob(page, {
          orientation: "landscape", //跨域设置
        }),
        this.title + ".doc"
      );
    },

    saveMD() {
      const turndown = new TurndownService({
        emDelimiter: "_",
        linkStyle: "inlined",
        headingStyle: "atx",
      });

      const markdown = turndown.turndown(this.editor.getHTML());

      var file = new File([markdown], this.title + ".md", {
        type: "text/plain;charset=utf-8",
      });
      saveAs(file);
    },

    saveHTML() {
      var file = new File([this.editor.getHTML()], this.title + ".html", {
        type: "text/plain;charset=utf-8",
      });
      saveAs(file);
    },

    saveJSON() {
      var file = new File([this.editor.getJSON()], this.title + ".json", {
        type: "text/plain;charset=utf-8",
      });
      saveAs(file);
    },

    saveText() {
      var file = new File([this.editor.getText()], this.title + ".txt", {
        type: "text/plain;charset=utf-8",
      });
      saveAs(file);
    },


    generateLink() {
    const link = "http://localhost:8080/Tiptap/w9n1xdmo/1"; //link=..
    const el = document.createElement("textarea");
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.$message.success("链接已复制到剪贴板");

    this.$alert("链接已生成:" + link, "提示", {
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true,
      callback: (action) => {
        // this.$message({
        //   type: 'info',
        //   message: `action: ${ action }`
        // });
      },
    });
  },

    // -----------------------关于导出----------------------------------------
    // upload_saved_document(){
    //   const data = {
    //   }
    //   this.$api.doc.post_upload_saved_document()
    // },
    // create_document(){
    // },
    // download_saved_document(){
    // }
  },


  beforeUnmount() {
    this.editor.destroy();
    this.provider.destroy();
  },
};
</script>
<style lang="scss">
.container {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #dad5d5;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  /* background: red; */
  background-color: #1e1e1e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
}
.mention {
  border: 1px solid #000;
  border-radius: 0.4rem;
  padding: 0.1rem 0.3rem;
  box-decoration-break: clone;
}
.editor {
  background-color: #fff;
  border: 3px solid #0d0d0d;
  border-radius: 0.75rem;
  color: #0d0d0d;
  display: flex;
  flex-direction: column;
  max-height: 26rem;

  &__header {
    align-items: center;
    background: #0d0d0d;
    border-bottom: 3px solid #0d0d0d;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }

  &__content {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1.25rem 1rem;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    align-items: center;
    border-top: 3px solid #0d0d0d;
    color: #0d0d0d;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    font-size: 12px;
    font-weight: 600;
    justify-content: space-between;
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
  }

  /* Some information about the status */
  &__status {
    align-items: center;
    border-radius: 5px;
    display: flex;

    &::before {
      background: rgba(#0d0d0d, 0.5);
      border-radius: 50%;
      content: " ";
      display: inline-block;
      flex: 0 0 auto;
      height: 0.5rem;
      margin-right: 0.5rem;
      width: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #b9f18d;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      border-radius: 0.4rem;
      color: #0d0d0d;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 0.25rem 0.5rem;

      &:hover {
        background-color: #0d0d0d;
        color: #fff;
      }
    }
  }
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  margin-left: -1px;
  margin-right: -1px;
  pointer-events: none;
  position: relative;
  word-break: normal;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  border-radius: 3px 3px 3px 0;
  color: #0d0d0d;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  left: -1px;
  line-height: normal;
  padding: 0.1rem 0.3rem;
  position: absolute;
  top: -1.4em;
  user-select: none;
  white-space: nowrap;
}

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    border-radius: 0.5rem;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0d0d0d, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
