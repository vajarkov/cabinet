import axios from 'axios'
//import authHeader from "@/services/auth-header";


const API_URL = 'https://api.ksu.vashdomofon.kz/' // 'http://192.168.1.181/' // // 'https://api.ksu.vashdomofon.kz/'//  //

class DashboardService {
    yesterday(key){
        
        return axios.get(API_URL + "request/stats/yesterday?key=" + key)
        .then(response => {
            
            return response.data
        })
    }

    yesterdayByBranch(key){
        return axios.get(API_URL + "request/stats/yesterdaybybranch?key=" + key)
        .then(response => {
            
            return response.data
        })
    }

    countByStatus(key){
        
        return axios.get(API_URL + "reports/request/count?key=" + key)
        .then(response => {
            return response.data
        })
    }

    countByStatusBranch(key){
        
        return axios.get(API_URL + "reports/request/countbybranch?key=" + key)
        .then(response => {
            return response.data
        })
    }

    countByOrg(key){
        
        return axios.get(API_URL + "reports/request/org?key="+key)
        .then(response => {
            return response.data
        })
    }

    countByOrgBranch(key){
        
        return axios.get(API_URL + "reports/request/orgbybranch?key="+key)
        .then(response => {
            return response.data
        })
    }

    countByStaff(key) {
        //let fromDate = new Date();
        //let toDate = new Date(new Date().setDate(new Date().getDate()+1))
        return axios.get(API_URL + "request/staff?key=" + key)// + '&from=' + fromDate.toISOString().slice(0, 10) + '&to=' + toDate.toISOString().slice(0, 10))
        .then(response => {
            return response.data
        })
    }

    countByStaffBranch(key, branch) {
        //let fromDate = new Date();
        //let toDate = new Date(new Date().setDate(new Date().getDate()+1))
        return axios.get(API_URL + "request/staffbybranch?key=" + key + /*'&from=' + fromDate.toISOString().slice(0, 10) + '&to=' + toDate.toISOString().slice(0, 10) +*/ '&branch=' + branch)
        .then(response => {
            
            return response.data
        })
    }

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

    
}

export default new DashboardService()