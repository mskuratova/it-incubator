import React from "react";
import s from "./users.module.css";
import * as axios from "axios";
import userPhoto from "../../assets/images/loading-process-svgrepo-com.svg"

 export let UsersFunc = (props: any) => {

     let pagesCount = Math.ceil(props.totalUserCount / props.pageSize)
     let pages = [];
     for (let i = 1; i <= pagesCount; i++) {
         pages.push(i)
     }
     return <div>
         <div> 1 2 3 4 5</div>
         <div>
             {pages.map(p => {
                 return <span className={true && s.SelectedPage}
                     onClick={(e) => (props.onPageChanged(p))}>
            {p}</span>
             })
             }
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
                <img src={userPhoto} className={s.userPhoto}/>
            </div>
            {/*u.photos.small != null ?u.photos.small : */}
        < div>
        {u.followed ? <button onClick={() => props.unfollow(u.id)}>
            Unfollow </button> : <button onClick={() => props.follow(u.id)}>Follow </button>}

        </div>
        </span>
             < span>
        <span>
            <div>{u.name} </div>
            <div> {u.status} </div>
        </span>
        < span>
            <div>{"u.location.country"} </div>
            <div> {"u.location.city"} </div>
        </span>
        </span>
         </div>)
         }
     </div>
 }