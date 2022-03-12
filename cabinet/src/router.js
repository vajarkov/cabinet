import { createWebHistory, createRouter } from "vue-router";

import Login from "@/components/Pages/Login.vue";
import Register from "@/components/Pages/Register.vue";
import Service from "@/components/Pages/Service";
import Montage from "@/components/Pages/Montage";
import Reports from "@/components/Pages/Reports";
import Tasks from "@/components/Pages/Tasks";
import Staff from "@/components/Pages/Staff";
import Requests from "@/components/Pages/Requests";
import Payments from "@/components/Pages/Payments";
import PastDueService from "@/components/Pages/PastDueService";
import PastDueMontage from "@/components/Pages/PastDueMontage";
import RequestsStatus from "@/components/Pages/RequestsStatus";
import MontagesStatus from "@/components/Pages/MontagesStatus";
import Repeat from "@/components/Pages/Repeat";
import RequestTypes from "@/components/Pages/RequestTypes";
import ServiceNomenclatura from "@/components/Pages/NomenclaturaService";
import MontageNomenclatura from "@/components/Pages/NomenclaturaMontage";
import Residents from "@/components/Pages/Residents";
import Phones from "@/components/Pages/Phones";
import Debtors from "@/components/Pages/Debtors";
import DebtorsList from "@/components/Pages/DebtorsList";
import Omega from "@/components/Pages/Omega";
import Alseco from "@/components/Pages/Alseco";

const routes = [
  {
    path: "/",
    component: Service,
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
    name: "service",
    component: Service,
  },
  {
    path: "/service",
    name: "service",
    component: Service,
  },
  {
    path: "/montage",
    name: "montage",
    component: Montage,
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
    path: "/reports/pastdueservice",
    name: "pastdueservice",
    component: PastDueService,
  },
  {
    path: "/reports/pastduemontage",
    name: "pastduemontage",
    component: PastDueMontage,
  },
  {
    path: "/requests/:org_id/:status_id/:name/:status",
    name: "requestsStatus",
    component: RequestsStatus,
  },
  {
    path: "/montages/:branch_id/:status_id/:name/:status",
    name: "montagesStatus",
    component: MontagesStatus,
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
    path: "/reports/nomenclaturaservice",
    name: "NomenclaturaService",
    component: ServiceNomenclatura,
  },
  {
    path: "/reports/nomenclaturamontage",
    name: "NomenclaturaMontage",
    component: MontageNomenclatura,
  },
  {
    path: "/reports/residents",
    name: "Residents",
    component: Residents,
  },
  {
    path: "/reports/phones",
    name: "Phones",
    component: Phones,
  },
  {
    path: "/reports/debtors",
    name: "Debtors",
    component: Debtors,
  },
  {
    path: "/reports/debtorslist",
    name: "DebtorsList",
    component: DebtorsList,
  },
  {
    path: "/reports/omega",
    name: "Omega",
    component: Omega,
  },
  {
    path: "/reports/alseco",
    name: "Alseco",
    component: Alseco,
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