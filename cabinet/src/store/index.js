import { createStore } from "vuex"
import { auth } from "@/store/auth.module"
import { service } from "@/store/service.module"
import { montage } from "@/store/montage.module"
import { reports } from "@/store/reports.module"

const store = createStore({
    modules: {
        auth,
        service,
        montage,
        reports
    }
})

export default store;