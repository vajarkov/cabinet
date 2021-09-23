import { createWebHistory, createRouter } from "vue-router";

import Login from "@/components/Pages/Login.vue";
import Register from "@/components/Pages/Register.vue";
import Dashboard from "@/components/Pages/Dashboard";
import Reports from "@/components/Pages/Reports";
import Tasks from "@/components/Pages/Tasks";
import Staff from "@/components/Pages/Staff";
import Requests from "@/components/Pages/Requests";
import Payments from "@/components/Pages/Payments";
import PastDue from "@/components/Pages/PastDue";
import RequestsStatus from "@/components/Pages/RequestsStatus";
import Repeat from "@/components/Pages/Repeat";
import RequestTypes from "@/components/Pages/RequestTypes";
import Nomenclatura from "@/components/Pages/Nomenclatura";
import Residents from "@/components/Pages/Residents";

const routes = [
  {
    path: "/",
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
    name: "dashboard",
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
  {
    path: "/reports/payments",
    name: "payments",
    component: Payments,
  },
  {
    path: "/reports/pastdue",
    name: "pastdue",
    component: PastDue,
  },
  {
    path: "/requests/:org_id/:status_id/:name/:status",
    name: "requestsStatus",
    component: RequestsStatus,
  },
  {
    path: "/reports/repeat",
    name: "Repeat",
    component: Repeat,
  },
  {
    path: "/reports/types",
    name: "RequestTypes",
    component: RequestTypes,
  },
  {
    path: "/reports/nomenclatura",
    name: "Nomenclatura",
    component: Nomenclatura,
  },
  {
    path: "/reports/residents",
    name: "Residents",
    component: Residents,
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