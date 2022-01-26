import React from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/images/loading-process-svgrepo-com.svg"
import {NavLink} from "react-router-dom";
import {userAPI} from "../../api/api";
import {toggleIsFollowingProgress, UserType} from "../../redux/users-reducer";

type PropsType = {
    totalUserCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (id: React.Key | null | undefined) => void
    unfollow: (id: React.Key | null | undefined) => void
    toggleIsFetching?: (isFetching: boolean) => void
    setCurrentPage?: (pageNumber: number) => void
    setUsers?: (items: UserType) => void
}

let User = (
    user: any,
    followingInProgress: number[],
    unfollow: (id: number) => void,
    follow: (id: number) => void
    ) => {
    return (
        <div>
        <span>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={userPhoto} className={s.userPhoto}/>
                </NavLink>
            </div>
            {/*{props.users.photos.small != null ? props.users.photos.small :""}*/}
            < div>
        {user.followed
            ? <button disabled={followingInProgress.some((id: React.Key | null | undefined) => id === user.id)}
                      onClick={() => {
                          unfollow(user.id)
                          toggleIsFollowingProgress(true, user.id)
                          userAPI.unfollow(user.id)
                              .then((response: { data: { resultCode: number; items: any; totalCount: any; }; }) => {
                                  if (response.data.resultCode == 0) {
                                      unfollow(user.id)
                                  }
                              });
                          // props.toggleFollowingProgress(false, u.id)
                      }}>
                Unfollow </button> : <button
                // disabled={followingInProgress.some((id: number) => id === user.id)}
                      onClick={() => {
                          follow(user.id)
                          toggleIsFollowingProgress(true, user.id)
                          userAPI.follow(user.id)
                              .then((response: { data: { resultCode: number; items: any; totalCount: any; }; }) => {
                                  if (response.data.resultCode == 0) {
                                      follow(user.id)
                                  }
                              });
                          // props.toggleFollowingProgress(false)
                          ;
                      }}>Follow </button>}

            </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div> {user.status} </div>
                </span>
                <span>
                    <div>{"user.location.country"} </div>
                    <div> {"user.location.city"} </div>
                </span>
            </span>
        </div>
    )
}

export default User
