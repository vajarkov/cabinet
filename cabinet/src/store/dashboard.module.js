import dashboardService from '@/services/dashboard.service'

//const user = JSON.parse(localStorage.getItem('user'))
//const initialState = user ? {yesterday : {loggedIn: true} , user }: {status : {loggedIn: false}, user: null }

export const dashboard = {
    namespaced: true,
    state: {
        yesterday: 0,
        countByStatus:{},
        countByOrg:{},
        countByStaff: {},
        mobile: {}, 
               
    },

    actions: {
        yesterday({commit}, key) {
            
            return dashboardService.yesterday(key).then(
                yesterday => {
                    //console.log(yesterday)
                    commit('yesterday', yesterday)
                    return Promise.resolve(yesterday)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        countByStatus({commit}, key) {

            return dashboardService.countByStatus(key).then(
                counts => {
                    //console.log(counts)
                    commit('countByStatus', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        countByOrg({commit}, key) {

            return dashboardService.countByOrg(key).then(
                counts => {
                    //console.log(counts)
                    commit('countByOrg', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        countByStaff({commit}, key) {
            return dashboardService.countByStaff(key).then(
                counts => {
                    //console.log(counts)
                    commit('countByStaff', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        Mobile({commit}, key) {
            return dashboardService.Mobile(key).then(
                mobile => {
                    //console.log(mobile)
                    commit('Mobile', mobile)
                    return Promise.resolve(mobile)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        }
    },

    mutations:{
        yesterday(state, yesterday){
            state.yesterday = yesterday.allCount

        },

        countByStatus(state, counts) {
            state.countByStatus = counts.count
        },

        countByOrg(state, counts) {
            state.countByOrg = counts.count
        },

        countByStaff(state, counts) {
            state.countByStaff = counts.data
        },
        Mobile(state, mobile){
            state.mobile = mobile.phones
        }
    }
}