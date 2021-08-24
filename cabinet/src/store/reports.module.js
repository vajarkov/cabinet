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
        pastdue: {},
        requests: {},
        repeat: {},
        branches: {},
        types: {},     
    },

    actions: {
        
        Mobile({commit}, key) {
            return reportsService.Mobile(key).then(
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
            return reportsService.MobileBranch(key, branch).then(
                mobile => {
                    
                    commit('Mobile', mobile)
                    return Promise.resolve(mobile)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        ReportView({commit}, json){
            return reportsService.ReportView(json.key, json.date, json.id).then(
                data => {
                    commit('ReportView', data)
                    return Promise.resolve(data)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        RequestCount({commit}, json){
            return reportsService.RequestCount(json.end, json.start, json.key).then(
                counts => {
                    commit('RequestCount', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        RequestCountBranch({commit}, json){
            return reportsService.RequestCountBranch(json.end, json.start, json.key, json.branch).then(
                counts => {
                    commit('RequestCount', counts)
                    return Promise.resolve(counts)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        Repeat({commit}, json){
            return reportsService.Repeat(json.end, json.start, json.key).then(
                repeat => {
                    commit('Repeat', repeat)
                    return Promise.resolve(repeat)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        RepeatBranch({commit}, json){
            return reportsService.RepeatBranch(json.end, json.start, json.key, json.branch).then(
                repeat => {
                    commit('Repeat', repeat)
                    return Promise.resolve(repeat)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        Payments({commit}, key) {
            return reportsService.Payments(key).then(
                payments => {
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
                    commit('Org', org)
                    return Promise.resolve(org)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },


        OrgBranch({commit}, key) {
            return reportsService.OrgBranch(key).then(
                org => {
                    commit('Org', org)
                    return Promise.resolve(org)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        getPayments({commit}, json) {
            return reportsService.getPayments(json.id, json.start, json.end, json.key).then(
                pays => {
                    commit('getPayments', pays)
                    return Promise.resolve(pays)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
        
        pastDue({commit}, key) {
            return reportsService.pastDue(key).then(
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
            return reportsService.pastDueBranch(key).then(
                pastdue => {
                    commit('pastDue', pastdue)
                    return Promise.resolve(pastdue)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
        getRequests({commit}, json) {
            return reportsService.getRequests(json.org_id, json.status_id, json.key).then(
                requests => {
                    commit('getRequests', requests)
                    return Promise.resolve(requests)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        Branch({commit}, key){
            return reportsService.Branch(key).then(
                branch => {
                    commit('Branch', branch)
                    return Promise.resolve(branch)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        Branches({commit}, json){
            return reportsService.Branches(json.key, json.branch).then(
                branch => {
                    commit('Branch', branch)
                    return Promise.resolve(branch)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },

        Types({commit}, json){
            return reportsService.Types(json.end, json.start, json.key).then(
                types => {
                    commit('Types', types)
                    return Promise.resolve(types)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        TypesBranch({commit}, json){
            return reportsService.TypesBranch(json.end, json.start, json.key, json.branch).then(
                types => {
                    commit('Types', types)
                    return Promise.resolve(types)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

        TypesBranches({commit}, json){
            return reportsService.TypesBranches(json.end, json.start, json.key, json.branch).then(
                types => {
                    commit('Types', types)
                    return Promise.resolve(types)
                },
                error => {
                    return Promise.reject(error)
                }
            ) 
        },

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
        pastDue(state, pastdue) {
            state.pastdue = pastdue
        },
        getRequests(state, requests) {
            state.requests = requests
        },
        Repeat(state, repeat) {
            state.repeat = repeat
        },
        Branch(state, branch) {
            state.branches = branch
        },
        Types(state, types) {
            state.types = types
        },
    
    }
}