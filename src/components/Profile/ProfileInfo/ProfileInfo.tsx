import React from 'react';
import classes from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

type PropsType = {
    profile: any
    status: any
    updateStatus :any
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
                < // @ts-ignore
                    ProfileStatus status ={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
)
}
export default ProfileInfo