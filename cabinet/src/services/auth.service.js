import axios from 'axios'
import * as sha256 from 'sha256'

const API_URL = 'https://api.ksu.vashdomofon.kz/web/'// //'https://api.ksu.vashdomofon.kz/web/' //'http://192.168.1.181/web/' //  //

class AuthService {
    login(user){
        //pass = ssh
        return axios.post(API_URL + "login", {
            mail: user.username,
            password: sha256.default(user.password)
        })
        .then(response => {
            if(response.data.session.client.key) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data
        })
    }

    logout(){
        localStorage.removeItem('user')
    }

    register(user){
        return axios.post(API_URL + 'register', {
            username: user.username,
            email: user.email,
            password: user.password
        })
    }
}

export default new AuthService()