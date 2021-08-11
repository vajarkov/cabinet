import axios from 'axios'
//import authHeader from "@/services/auth-header";


const API_URL = 'http://api.ksu.vashdomofon.kz/' // 'http://192.168.1.181/' // // 'http://api.ksu.vashdomofon.kz/'//  //

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
        console.log(key)
        console.log(start)
        console.log(end)
        return axios.get(API_URL + "request/counts?to=" + end + "&from=" + start + "&key=" + key)
        .then(response => {
            return response.data
        }) 
    }

    
}

export default new ReportsService()