import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/LoginPage.vue")
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
          component: () => import("./components/TutorialsList")
        },
        {
          path: "/tutorials/:id",
          name: "tutorial-details",
          component: () => import("./components/Tutorial")
        },
        {
          path: "/add",
          name: "add",
          component: () => import("./components/AddTutorial")
        }  
      ]
    } 
  ]
})