import { createWebHistory, createRouter } from "vue-router";

import Login from "@/components/Pages/Login.vue";
import Register from "@/components/Pages/Register.vue";
import Dashboard from "@/components/Pages/Dashboard";
import Reports from "@/components/Pages/Reports";
import Tasks from "@/components/Pages/Tasks";
import Staff from "@/components/Pages/Staff";
import Requests from "@/components/Pages/Requests";



const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
 
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/home",
    name: "home",
    component: Dashboard,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/reports",
    name: "reports",
    component: Reports,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: Tasks,
  },
  {
    path: "/reports/staff",
    name: "staff",
    component: Staff,
  },
  {
    path: "/reports/requests",
    name: "requests",
    component: Requests,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router;