import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY":'095893d6-8dc6-4e4e-ab87-705fe5494f77'
    }
})

export const userAPI = {
    getUser(currentPage: number = 2, pageSize: number = 10) {
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
        return profileAPI.getProfile(userId)

    }
}

export const profileAPI = {
    getProfile(userId: number): Promise<AxiosResponse<any>> {
        return instance.get(`profile/`+userId);
    },
    getStatus(userId:number): Promise<AxiosResponse<any>> {
        return instance.put(`profile/status/`+userId);
    },
    updateStatus(status: string): Promise<AxiosResponse<any>> {
        return instance.put(`profile/status/`, {status});
    },
}
export const authAPI = {
    me () {
        return instance.get(`auth/me`)
    }
}