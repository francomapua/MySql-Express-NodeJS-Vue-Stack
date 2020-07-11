import http from "../http-common"
const path = `users`
class UserDataService {
  getAll() {
    return http.get(`/${path}`)
  }

  get(id) {
    return http.get(`/${path}/${id}`)
  }

  login(data){
    return http.post(`/${path}/login`, data)
  }

  logout(data){
    return http.post(`/${path}/logout`, data)
  }

  create(data) {
    return http.post(`/${path}`, data)
  }

  update(id, data) {
    return http.put(`/${path}/${id}`, data)
  }

  delete(id) {
    return http.delete(`/${path}/${id}`)
  }

  deleteAll() {
    return http.delete(`/${path}`)
  }
}

export default new UserDataService()