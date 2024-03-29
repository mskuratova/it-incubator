import axios, {AxiosResponse} from "axios";
import {Form} from "redux-form";

const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY":'095893d6-8dc6-4e4e-ab87-705fe5494f77'
    }
})

export enum ResultCodesEnum {
    Success,
    Error,
    CaptchaIsRequired = 10

}

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
    savePhoto(photoFile:any):any {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
           headers: { 'Content-Type': 'multipart/form-data'}
        })
    }
}

type MeResponseType ={
    data: { id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType ={
    data: { userId: number}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const authAPI = {
    me () {
        return instance.get<MeResponseType>(`auth/me`)
            // .then(res=> res.data);
    },
    login (email:string, password: string, rememberMe: boolean= false) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe});
    },
    logout () {
        return instance.delete(`auth/login`);
    }
}