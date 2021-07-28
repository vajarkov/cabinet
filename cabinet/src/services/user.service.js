import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = "http://192.168.1.181/web/" //http://api.ksu.vashdomofon.kz/"

class userService {
    getPublicContent() {
        return axios.get(API_URL + "all")
    }

    getUserBoard(){
        return axios.get(API_URL + 'user', { headers: authHeader() })
    }

    getModeratorBoard() {
        return axios.get(API_URL + "mod", {headers: authHeader() })
    }

    getAdminBoard() {
        return axios.get(API_URL + "admin", { headers: authHeader() })
    }
}

export default new userService()