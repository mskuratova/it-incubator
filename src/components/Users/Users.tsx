import React from "react";
import axios from "axios";

let Users =(props:any) => {
    let getUsers = () => {
        if (props.users.length === 0) {

            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items)
            });
        }
    }

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {props.users.map( (u: { id: React.Key | null | undefined;
            photos: string | undefined;
            followed: any;
            name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; status: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; location: { country: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; city: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; }) => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photos}/>
                </div>
                <div>
                    { u.followed ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button> :<
                        button onClick={() => props.follow(u.id)}>Follow</button> }

                </div>
            </span>
            <span>
                <span>
                    <div>{u.name}</div><div>{u.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
        </div>)}
    </div>
}

export default Users