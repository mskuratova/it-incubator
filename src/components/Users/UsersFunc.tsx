import React from "react";
import User from "./User";
import {UserType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";

type PropsType ={
    totalItemsCount:number
    pageSize:number
    currentPage:number
    onPageChanged:(pageNumber: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    users: Array<any>
    followingInProgress: Array<number>
    follow: (id: number)=> void
    unfollow: (id: number)=> void
    toggleIsFetching?: (isFetching: boolean) => void
    setCurrentPage?: (pageNumber: number) => void
    setUsers?: (items: UserType) => void
}

export let UsersFunc = (props: PropsType) => {

    return <div>

        <Paginator currentPage={props.currentPage}
                   onPageChaged={props.onPageChanged}
                   totalItemsCount={props.totalItemsCount} pageSize={props.pageSize}/>
        {props.users.map((u) => {

            return <User user={u}
                      followingInProgress={props.followingInProgress}
                      follow={props.follow}
                      unfollow={props.unfollow}
                      key={u.id}/>
        })}
    </div>
};



//     id: number
//     photos: string | undefined;
//     followed: any;
//     name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; status: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; location: { country: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; city: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; };
