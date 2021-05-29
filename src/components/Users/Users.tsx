import React from "react";
import {InitialSateType, UserType} from "../../redux/users-reducer";

let Users =(props:any) => {
    return <div>
        {props.users.map( (u: { id: React.Key | null | undefined; photoUrl: string | undefined; followed: any; fullName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; status: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; location: { country: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; city: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; }) => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photoUrl}/>
                </div>
                <div>
                    { u.followed ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button> :<
                        button onClick={() => props.follow(u.id)}>Follow</button> }

                </div>
            </span>
            <span>
                <span>
                    <div>{u.fullName}</div><div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </span>
            </span>
        </div>)}
    </div>
}

export default Users