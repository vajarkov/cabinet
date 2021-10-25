import axios from 'axios'
//import authHeader from "@/services/auth-header";


const API_URL = 'https://api.ksu.vashdomofon.kz/' // 'http://192.168.1.181/' // // 'https://api.ksu.vashdomofon.kz/'//  //

class ReportsService {
   
    Mobile(key) {
        return axios.get(API_URL + "mobile?key=" + key )
        .then(response => {
            return response.data
        })
    }

    MobileBranch(key, branch) {
        
        return axios.get(API_URL + "mobile/branch?key=" + key + '&branch=' + branch )
        .then(response => {
            return response.data
        })
    }

    ReportView(key, date, id){
        return axios.get(API_URL +"mobile/report/" + date + "/" + id + "?key=" + key)
        .then(response => {
            return response.data
        })
    }

    RequestCount(end, start, key) {
        return axios.get(API_URL + "request/counts?to=" + end + "&from=" + start + "&key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    RequestCountBranch(end, start, key, branch) {
        return axios.get(API_URL + "request/countsbranch?to=" + end + "&from=" + start + "&key=" + key + "&branch=" + branch)
        .then(response => {
            return response.data
        }) 
    }

    Repeat(end, start, key) {
        return axios.get(API_URL + "request/repeats?to=" + end + "&from=" + start + "&key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    RepeatBranch(end, start, key, branch) {
        return axios.get(API_URL + "request/repeatsbranch?to=" + end + "&from=" + start + "&key=" + key + "&branch=" + branch)
        .then(response => {
            return response.data
        }) 
    }

    Payments(key) {
        
        return axios.get(API_URL + "reports/kontragent/monthpays?key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    Org(key) {
        return axios.get(API_URL + "org?key=" + key)
        .then(response => {
            return response.data
        })
    }

    OrgBranch(key) {
        return axios.get(API_URL + "org/branch?key=" + key)
        .then(response => {
            return response.data
        })
    }

    getPayments(id, start, end, key) {
        return axios.get(API_URL + "reports/kontragent/org/" + id + "/" + start + "/" + end + "?key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    pastDue(key) {
        return axios.get(API_URL + "reports/request/pastdue?key=" + key)
        .then(response => {
            return response.data
        })
    }

    pastDueBranch(key) {
        return axios.get(API_URL + "reports/request/pastduebranch?key=" + key)
        .then(response => {
            return response.data
        })
    }

    getRequests(org, status, key) {
        return axios.get(API_URL + "reports/request/orgstatus/" + org + "/" + status +  "?key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    Branch(key){
        return axios.get(API_URL + "branch?key=" + key)
        .then(response => {
            return response.data
        })
    }

    Branches(key, branch){
        return axios.get(API_URL + "branch/cities?branch="+ branch +"&key=" + key)
        .then(response => {
            return response.data
        })
    }

    Types(end, start, key) {
        return axios.get(API_URL + "request/types?to=" + end + "&from=" + start + "&key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    TypesBranch(end, start, key, branch) {
        return axios.get(API_URL + "request/typesbranch?to=" + end + "&from=" + start + "&key=" + key + "&branch=" + branch)
        .then(response => {
            return response.data
        }) 
    }

    TypesBranches(end, start, key, branch) {
        return axios.get(API_URL + "request/typesbranches?to=" + end + "&from=" + start + "&key=" + key + "&branch=" + branch)
        .then(response => {
            return response.data
        }) 
    }

    Staff(key) {
        return axios.get(API_URL + "staff?key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    StaffBranch(key, branch) {
        return axios.get(API_URL + "staff/branch?key=" + key + "&branch=" + branch)
        .then(response => {
            return response.data
        }) 
    }

    WriteOff(end, start, key) {
        return axios.get(API_URL + "requestnomenclatura/writeoff?to=" + end + "&from=" + start + "&key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    WriteOffStaff(end, start, key, staff) {
        return axios.get(API_URL + "requestnomenclatura/writeoffstaff?to=" + end + "&from=" + start + "&key=" + key + "&staff=" + staff)
        .then(response => {
            return response.data
        }) 
    }

    WriteOffBranch(end, start, key, branch) {
        return axios.get(API_URL + "requestnomenclatura/writeoffbranch?to=" + end + "&from=" + start + "&key=" + key + "&branch=" + branch)
        .then(response => {
            return response.data
        }) 
    }

    Residents(key) {
        return axios.get(API_URL + "mcporch/residents?key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    ResidentsBranch(key, branch) {
        return axios.get(API_URL + "mcporch/residentsbranch?key=" + key + "&branch=" + branch)
        .then(response => {
            return response.data
        }) 
    }

    Phones(key) {
        return axios.get(API_URL + "report/phones?key=" + key )
        .then(response => {
            return response.data
        })
    }

    Debtors(key, branch, amount) {
        return axios.get(API_URL + "report/debtors?key=" + key + "&branch=" + branch + "&amount=" + amount)
        .then(response => {
            return response.data
        })
    }

}

export default new ReportsService()