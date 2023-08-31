import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


const Text = () => import('../views/TextView.vue')
const Community = () => import('../views/CommunityView.vue')
const Design = () => import('../views/DesignView.vue')
const WorkSpace = () => import('../views/WorkSpaceView.vue')
const Chat = () => import('../views/ChatView.vue')
// const Author = () =>import('../views/')
const Login = () => import('../views/LoginView.vue')
const TiptapView = () => import('../views/Tiptap.vue') 

const Invite = () => import('../views/InviteView.vue')

const joinTeam = () => import('../views/JoinTeam.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    children: [
      {
        path: "/invite/:id",
      }
    ]

  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/Invite/:key',
  //   name: 'Invite',
  //   component: Invite
  // },
  {
    path: '/Text',
    name: 'Text',
    component: Text
  },
  {
    path: '/Tiptap/:appID/:room',
    name: 'Tiptap',
    component: TiptapView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Community',
    name: 'community',
    component: Community,
    children: [
      {
        path: 'author/:authorID',
        name: 'author'
      },


    ]

  },
  {
    path: '/Design',
    name: 'design',
    component: Design,

  },
  {
    path: '/WorkSpace',
    name: 'workSpace',
    component: WorkSpace,

    children: [
      {
        path: 'Star',
        name: 'star',
      },
      {
        path: 'Default',
        name: 'default',
      },
      {
        path: 'Recent',
        name: 'recent',

      },
      {
        path: 'OnlineDoc',
        name: 'onlineDoc',
      }
    ]

  },
  {
    path: '/Chat',
    name: 'chat',
    component: Chat,

    children: [
      {
        path: 'Coop',
        name: 'coop'
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if (to.path === from.path && to.path !== '/') {  // 判断目标路径是否相同
    return next(false)  // 阻止路由跳转
  }
  next()  // 允许路由跳转
})
const routerRePush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return routerRePush.call(this, location).catch(error => error)
}


export default router
