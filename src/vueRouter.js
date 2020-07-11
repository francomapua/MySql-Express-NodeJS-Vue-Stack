import Vue from "vue"
import Router from "vue-router"
import store from "./store"

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  console.log(store.getters)
  if (!store.getters[`user/isAuthenticated`]) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters[`user/isAuthenticated`]) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/LoginPage.vue"),
      beforeEnter: ifNotAuthenticated
    },
    
    {
      path: "/",
      name: "home",
      component: () => import('./pages/TutorialPage.vue'),
      children: [
        {
          path: "/",
          alias: "/tutorials",
          name: "tutorials",
          component: () => import("./components/TutorialsList"),
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/tutorials/:id",
          name: "tutorial-details",
          component: () => import("./components/Tutorial"),
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/add",
          name: "add",
          component: () => import("./components/AddTutorial"),
          beforeEnter: ifAuthenticated,
        }  
      ]
    } 
  ]
})