import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY":'095893d6-8dc6-4e4e-ab87-705fe5494f77'
    }
})

export const userAPI = {
    getUser(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
        )
            .then(response => response.data);
    },
    follow(userId: React.Key | null | undefined) {
        return instance.post(`follow/${userId}`)
    } ,
    unfollow(userId: React.Key | null | undefined) {
        return instance.delete(`follow/${userId}`)},
    getProfile(userId: number) {
        return instance.get(`profile/`+userId)

    }
}
export const authAPI = {

    me () {
        return instance.get(`auth/me`)
    }
}