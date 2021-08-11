import reportsService from '@/services/reports.service'

//const user = JSON.parse(localStorage.getItem('user'))
//const initialState = user ? {yesterday : {loggedIn: true} , user }: {status : {loggedIn: false}, user: null }

export const reports = {
    namespaced: true,
    state: {
       
        phones: {},
        data: {},
        counts: {},       
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
    }
}