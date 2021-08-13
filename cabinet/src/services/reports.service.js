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

    
}

export default new ReportsService()