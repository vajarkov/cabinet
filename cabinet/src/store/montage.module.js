import montageService from '@/services/montage.service'

//const user = JSON.parse(localStorage.getItem('user'))
//const initialState = user ? {yesterday : {loggedIn: true} , user }: {status : {loggedIn: false}, user: null }

export const montage = {
    namespaced: true,
    state: {
        yesterday: 0,
        countByStatus:{},
        countByOrg:{},
        countByBranch:{},
        countByStaff: {},
        mobile: {},
        pastdue: {},
        nomenclatura: {}, 
               
    },

    actions: {
        yesterday({commit}, key) {
            
            return montageService.yesterday(key).then(
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
            
            return montageService.yesterdayByBranch(key).then(
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

            return montageService.countByStatus(key).then(
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

            return montageService.countByStatusBranch(key).then(
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
            return montageService.countByOrg(key).then(
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
            return montageService.countByOrgBranch(key).then(
                counts => {
                    commit('countByOrg', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        countByBranch({commit}, key) {
            return montageService.countByBranch(key).then(
                counts => {
                    commit('countByBranch', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        countByBranchBranch({commit}, key) {
            return montageService.countByBranchBranch(key).then(
                counts => {
                    commit('countByBranch', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        countByStaff({commit}, key) {
            return montageService.countByStaff(key).then(
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
            return montageService.countByStaffBranch(key, branch).then(
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
            return montageService.Mobile(key).then(
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
            return montageService.MobileBranch(key, branch).then(
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
            return montageService.pastDue(key).then(
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
            return montageService.pastDueBranch(key).then(
                pastdue => {
                    commit('pastDue', pastdue)
                    return Promise.resolve(pastdue)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
        WriteOff({commit}, json){
            return montageService.WriteOff(json.end, json.start, json.key).then(
                nomenclatura => {
                    commit('Nomenclatura', nomenclatura)
                    return Promise.resolve(nomenclatura)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        WriteOffStaff({commit}, json){
            return montageService.WriteOffStaff(json.end, json.start, json.key, json.staff).then(
                nomenclatura => {
                    commit('Nomenclatura', nomenclatura)
                    return Promise.resolve(nomenclatura)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },
    
    },

    WriteOffBranch({commit}, json){
        return montageService.WriteOffBranch(json.end, json.start, json.key, json.branch).then(
            nomenclatura => {
                commit('Nomenclatura', nomenclatura)
                return Promise.resolve(nomenclatura)
            },
            error => {
                return Promise.reject(error)
            }
        ) 
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

        countByBranch(state, counts) {
            state.countByBranch = counts.items
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
        Nomenclatura(state, nomenclatura){
            state.nomenclatura = nomenclatura
        },
    }
}