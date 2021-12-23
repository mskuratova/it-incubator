import React from 'react';
import classes from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";

type PropsType = {
    profile: any
    status: string
    updateStatus :(status:string) => void
}

const ProfileInfo = (props: PropsType) => {


    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img
                    src="https://proprikol.ru/wp-content/uploads/2020/03/sinij-czvet-krasivye-kartinki-1-650x433.jpg" />
            </div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatusWithHooks status ={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
)
}
export default ProfileInfo