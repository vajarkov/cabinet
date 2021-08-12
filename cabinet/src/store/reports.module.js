import reportsService from '@/services/reports.service'

//const user = JSON.parse(localStorage.getItem('user'))
//const initialState = user ? {yesterday : {loggedIn: true} , user }: {status : {loggedIn: false}, user: null }

export const reports = {
    namespaced: true,
    state: {
       
        phones: {},
        data: {},
        counts: {},
        payments: {},
        org: {}, 
        pays: {},      
    },

    actions: {
        
        Mobile({commit}, key) {
            return reportsService.Mobile(key).then(
                mobile => {
                    console.log(mobile)
                    commit('Mobile', mobile)
                    return Promise.resolve(mobile)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        ReportView({commit}, json){
            console.log(json.key)
            console.log(json.date);
            console.log(json.id);
            return reportsService.ReportView(json.key, json.date, json.id).then(
                data => {
                    console.log(data)
                    commit('ReportView', data)
                    return Promise.resolve(data)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        RequestCount({commit}, json){
            console.log(json.start)
            console.log(json.end);
            console.log(json.key);
            return reportsService.RequestCount(json.end, json.start, json.key).then(
                counts => {
                    console.log(counts)
                    commit('RequestCount', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        Payments({commit}, key) {
            return reportsService.Payments(key).then(
                payments => {
                    console.log(payments)
                    commit('Payments', payments)
                    return Promise.resolve(payments)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        Org({commit}, key) {
            return reportsService.Org(key).then(
                org => {
                    console.log(org)
                    commit('Org', org)
                    return Promise.resolve(org)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        getPayments({commit}, json) {
            console.log(json.id)
            console.log(json.start)
            console.log(json.end);
            console.log(json.key);
            return reportsService.getPayments(json.id, json.start, json.end, json.key).then(
                pays => {
                    console.log(pays)
                    commit('getPayments', pays)
                    return Promise.resolve(pays)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        } 
    },

    mutations:{
        
        Mobile(state, mobile){
            state.mobile = mobile.phones
        },
        ReportView(state, data) {
            state.data = data
            
        },
        RequestCount(state, counts){
            state.counts = counts
        },
        Payments(state, payments){
            state.payments = payments
        },
        Org(state, org) {
            state.org = org
        },
        getPayments(state, pays) {
            state.pays = pays
        },
        
    
    }
}