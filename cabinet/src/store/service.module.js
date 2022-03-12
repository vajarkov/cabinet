import Service from '@/services/service.service'

//const user = JSON.parse(localStorage.getItem('user'))
//const initialState = user ? {yesterday : {loggedIn: true} , user }: {status : {loggedIn: false}, user: null }

export const service = {
    namespaced: true,
    state: {
        yesterday: 0,
        countByStatus:{},
        countByOrg:{},
        countByStaff: {},
        mobile: {},
        pastdue: {}, 
              
    },

    actions: {
        yesterday({commit}, key) {
            
            return Service.yesterday(key).then(
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
            
            return Service.yesterdayByBranch(key).then(
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

            return Service.countByStatus(key).then(
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

            return Service.countByStatusBranch(key).then(
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

            return Service.countByOrg(key).then(
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

            return Service.countByOrgBranch(key).then(
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
            return Service.countByStaff(key).then(
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
            return Service.countByStaffBranch(key, branch).then(
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
            return Service.Mobile(key).then(
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
            return Service.MobileBranch(key, branch).then(
                mobile => {
                    
                    commit('Mobile', mobile)
                    return Promise.resolve(mobile)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
        pastDue({commit}, key) {
            return Service.pastDue(key).then(
                pastdue => {
                    commit('pastDue', pastdue)
                    return Promise.resolve(pastdue)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
    
    
        pastDueBranch({commit}, key) {
            return Service.pastDueBranch(key).then(
                pastdue => {
                    commit('pastDue', pastdue)
                    return Promise.resolve(pastdue)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
    
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
        },
        pastDue(state, pastdue) {
            state.pastdue = pastdue
        },
    }
}