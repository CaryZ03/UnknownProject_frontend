import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import request from '@/utils/request'
import api from '@/api'
import MentionList from './MentionList.vue'
import Vue from 'vue'
import router from '@/router'
import store from '@/store'


export default {
  items: ({ query }) => {
    return new Promise((resolve, reject) => {

      console.log("@@@@@@@"+store.state.curTeamID + "xx" + store.state.curUserID);
      const data = JSON.stringify({
        team_id: store.state.curTeam.team_id,
        tm_user_id: store.state.curUserID
      })
      console.log(data)
      const nickNames = [];
      api.chat.post_get_team_members_and_permissions(data).then((res) => {
        res.data.members.forEach(element => {
          const nickName = element.tm_user_nickname+' @'+element.tm_user_id;
          nickNames.push(nickName)
        });
        const filteredItems = nickNames.filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10);
        resolve(filteredItems);
      }).catch(error => {
        console.log(error)
      })
    });
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new VueRenderer(MentionList, {
          // using vue 2:
          parent: this,
          propsData: props,
          // using vue 3:
          // props,
          // editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}