import React from "react";
import axios from "axios";

class Users extends React.Component<any, any>{

    componentDidMount() {
        alert("Hi")
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        });
    }

    render() {

        return <div>
            {/*<button onClick={this.getUsers}>Get Users</button>*/}
            {this.props.users.map( (u: { id: React.Key | null | undefined;
                photos: string | undefined;
                followed: any;
                name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; status: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; location: { country: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; city: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; }) => <div key={u.id}>
            <span>
                <div>
                    <img src={u.photos}/>
                </div>
                <div>
                    { u.followed ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button> :<
                        button onClick={() => this.props.follow(u.id)}>Follow</button> }

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
}

export default Users