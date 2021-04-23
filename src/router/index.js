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

  //********Rutas de Administrador********
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
    path: "/admin/nuevo-usuario",
    name: "Agregar-Usuario",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Agregar-Usuario.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/admin/Graficos",
    name: "Graficos",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Graficos.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/admin/nuevo-admin",
    name: "Agregar-Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Agregar-Admin.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/admin/valorar-proyecto",
    name: "Valorar",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Valorar-Proyecto.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/admin/inscripcion",
    name: "Inscripcion-admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Inscripcion.vue"),
    beforeEnter: ifAuthenticated
  },
  //********Rutas de Estudiante/Aspirante********
  {
    path: "/student",
    name: "Student",
    component: () =>
      import(/* webpackChunkName: "student" */ "../views/Student.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/student/proceso-inscripcion-1",
    name: "Inscripcion-student-1",
    component: ()=> import(/* webpackChunkName: "student" */ "../views/Proceso-Inscripcion-1.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/student/proceso-inscripcion-2",
    name: "Inscripcion-student-2",
    component: ()=> import(/* webpackChunkName: "student" */ "../views/Proceso-Inscripcion-2.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/student/valorar-proyecto",
    name: "Valorar-student",
    component: () =>
      import(/* webpackChunkName: "student" */ "../views/Valorar-Proyecto.vue"),
    beforeEnter: ifAuthenticated
  },
  //********Rutas de directores********
  {
    path: "/director/detail-career",
    name: "DetailCareerDirector",
    component: () =>
      import(/* webpackChunkName: "director" */ "../views/DetailCareer.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/director",
    name: "Control-Estudiantes",
    component: () =>
      import(
        /* webpackChunkName: "director" */ "../views/Control-Estudiantes.vue"
      ),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/director/valorar-proyecto",
    name: "Valorar-director",
    component: () =>
      import(/* webpackChunkName: "director" */ "../views/Valorar-Proyecto.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/director/inscripcion",
    name: "Inscripcion-director",
    component: () =>
      import(/* webpackChunkName: "director" */ "../views/InscripcionDirector.vue"),
    beforeEnter: ifAuthenticated
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: () =>
      import(
        /* webpackChunkName: "Director/Estudiante" */ "../views/Perfil.vue"
      ),
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
