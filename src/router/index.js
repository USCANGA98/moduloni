import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "../store/index";

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  if (Vuex.state.user != "") {
    next();
  } else {
    next("/");
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/registro",
    name: "Registro",
    component: () =>
      import(/* webpackChunkName: "registro" */ "../views/Registro.vue")
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/admin/detail-career",
    name: "DetailCareer",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/DetailCareer.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/student",
    name: "Student",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Student.vue"),
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;

