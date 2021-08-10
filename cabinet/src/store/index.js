import { createStore } from "vuex"
import { auth } from "@/store/auth.module"
import { dashboard } from "@/store/dashboard.module"
import { reports } from "@/store/reports.module"

const store = createStore({
    modules: {
        auth,
        dashboard,
        reports
    }
})

export default store;