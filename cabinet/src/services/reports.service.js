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
        console.log(date)
        console.log(id)
        return axios.get(API_URL +"mobile/report/" + date + "/" + id + "?key=" + key)
        .then(response => {
            return response.data
        })
    }

    
}

export default new ReportsService()