import React from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/images/loading-process-svgrepo-com.svg"
import {NavLink} from "react-router-dom";

export let UsersFunc = (props: any) => {

    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div> 1 2 3 4 5 6</div>
        <div>
            {pages.map(p => {
                return <span className={true && s.SelectedPage}
                             onClick={(e) => (props.onPageChanged(p))}>
            {p}</span>
            })}
        </div>
        <button onClick={props.getUsers}>Get Users</button>
        {props.users.map((u: {
            id: React.Key | null | undefined;
            photos: string | undefined;
            followed: any;
            name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; status: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; location: { country: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; city: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; };
        }) => <div key={u.id}>
        <span>
            <div>
                <NavLink to={'/profile/' + u.id}>
                    <img src={userPhoto} className={s.userPhoto}/>
                </NavLink>
            {/*</div>*/}
            {/*/!*{props.users.photos.small != null ? props.users.photos.small :""}*!/*/}
            {/*< div>*/}
        {u.followed
            ? <button disabled={props.followingInProgress.some((id: React.Key | null | undefined) => id === u.id)}
                      onClick={() => {props.unfollow(u.id)
                // toggleFollowingProgress(true, u.id)
                // userAPI.unfollow(u.id)
                //     .then((response: { data: { resultCode: number; items: any; totalCount: any; }; }) => {
                //         if (response.data.resultCode == 0) {
                //             props.unfollow(u.id)
                //         }
                //     });
                // props.toggleFollowingProgress(false, u.id)
            }}>
                Unfollow </button>
            : <button disabled={props.followingInProgress.some((id: React.Key | null | undefined) => id === u.id)} onClick={() => {
                props.follow(u.id)
                // toggleFollowingProgress(true, u.id)
                // userAPI.follow(u.id)
                //     .then((response: { data: { resultCode: number; items: any; totalCount: any; }; }) => {
                //         if (response.data.resultCode == 0) {
                //             props.follow(u.id)
                //         }
                //     });
                // props.toggleFollowingProgress(false)
                // ;
            }}>Follow </button>}

            </div>
            </span>
            < span>
            <span>
            <div>
        {
            u.name
        }
            </div>
            <div> {u.status} </div>
            </span>
            < span>
            <div>{"u.location.country"} </div>
            <div> {"u.location.city"} </div>
            </span>
            </span>
            </div>
            )
            }
            </div>
        }