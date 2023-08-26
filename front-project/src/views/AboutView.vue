<!-- <template>
  <div>
    <div id="user-info" ref="header"></div>
    <div id="editor" ref="editor"></div>
  </div>
</template>

<style>
.chat-container {
  width: 100%;
  height: 300px;
  overflow-y: auto;
}

.chat-bubble {
  display: inline-block;
  max-width: 80%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 20px;
}

.sent {
  background-color: #3498db;
  color: #fff;
  align-self: flex-end;
  position: relative;
}

.received {
  background-color: #e5e5ea;
  color: #000;
  align-self: flex-start;
  position: relative;
}
.sent::before {
 content: "";
 position: absolute;
 right: -10px;
 top: 50%;
 transform: translateY(-50%);
 border-width: 10px;
 border-style: solid;
 border-color: transparent transparent transparent #3498db;
}

.received {
 background-color: #e5e5ea;
 color: #000;
 align-self: flex-start;
 position: relative;
}

.received::before {
 content: "";
 border-right: 10px solid #448844;
 border-bottom: 10px solid transparent;
 border-top: 10px solid transparent;
 /* position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 10px;
  border-style: solid;
  border-color: transparent #e5e5ea transparent transparent; */
}

</style>

<script>
import { createEditor, TableComponentSelectionAwarenessDelegate } from '@textbus/editor';
import { Collaborate, collaborateModule } from '@textbus/collaborate';
import {
  CollaborateSelectionAwarenessDelegate,
  RemoteSelection,
  CollaborateCursor
} from '@textbus/platform-browser'
import { Selection } from '@textbus/core'
import { WebrtcProvider } from 'y-webrtc'

export default {
  mounted() {
    const header = this.$refs.header
    const editor = this.$refs.editor

    const users = [
      {
        color: '#f00',
        name: '张三'
      },
      {
        color: '#448299',
        name: '李国'
      },
      {
        color: '#fe91dd',
        name: '赵功'
      },
      {
        color: '#1f2baf',
        name: '载膛'
      },
      {
        color: '#2aad30',
        name: '魂牵梦萦'
      },
      {
        color: '#c4ee6e',
        name: '杰国'
      },
      {
        color: '#00a6ff',
        name: '膛世界杯'
      }
    ]

    const editorInstance = createEditor({
      theme: 'light',
      placeholder: '请输入内容……',
      imports: [
        collaborateModule // 添加协作模块
      ],
      providers: [
        {
          provide: CollaborateSelectionAwarenessDelegate, // 提供表格框选协作选区特效支持
          useClass: TableComponentSelectionAwarenessDelegate
        }
      ],
      setup(starter) {
        const selection = starter.get(Selection)
        const collaborate = starter.get(Collaborate)
        const collaborateCursor = starter.get(CollaborateCursor)

        const provide = new WebrtcProvider('textbus', collaborate.yDoc)

        const user = users[Math.floor(Math.random() * users.length)]
        provide.awareness.setLocalStateField('user', user)

        const subscription = selection.onChange.subscribe(() => {
          const paths = selection.getPaths()
          const localSelection = {
            username: user.name,
            color: user.color,
            paths
          }
          provide.awareness.setLocalStateField('selection', localSelection)
        })

        provide.awareness.on('update', () => {
          const remoteSelections = []
          provide.awareness.getStates().forEach(state => {
            if (state.user) {
              users.push(state.user)
            }
            if (state.selection) {
              remoteSelections.push(state.selection)
            }
          })
          const selections = remoteSelections.filter(i => i.username !== user.name)
          collaborateCursor.draw(selections)

          header.innerHTML = users.map(i => {
            return `<span style="color: ${i.color}">${i.name}</span>`
          }).join('')
        })

        return () => {
          provide.disconnect()
          subscription.unsubscribe()
        }
      },
    })

    editorInstance.mount(editor)
  }
}
</script> -->
