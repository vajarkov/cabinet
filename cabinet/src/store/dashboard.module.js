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
                    
                    commit('yesterday', yesterday)
                    return Promise.resolve(yesterday)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },


        yesterdayByBranch({commit}, key) {
            
            return dashboardService.yesterdayByBranch(key).then(
                yesterday => {
                    
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
                    
                    commit('countByStatus', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },


        countByStatusBranch({commit}, key) {

            return dashboardService.countByStatusBranch(key).then(
                counts => {
                    
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
                   
                    commit('countByOrg', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        countByOrgBranch({commit}, key) {

            return dashboardService.countByOrgBranch(key).then(
                counts => {
                    
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
                    
                    commit('countByStaff', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        countByStaffBranch({commit}, json) {
            var branch = json['branch']
            var key = json['key']
            return dashboardService.countByStaffBranch(key, branch).then(
                counts => {
                    
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
                    
                    commit('Mobile', mobile)
                    return Promise.resolve(mobile)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        MobileBranch({commit}, json) {
            var key = json['key']
            var branch = json['branch']
            return dashboardService.MobileBranch(key, branch).then(
                mobile => {
                    
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
            state.countByOrg = counts.items
        },

        countByStaff(state, counts) {
            state.countByStaff = counts.data
        },
        Mobile(state, mobile){
            state.mobile = mobile.phones
        }
    }
}