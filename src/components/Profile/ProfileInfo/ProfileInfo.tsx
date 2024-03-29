import React, {ChangeEvent, ChangeEventHandler} from 'react';
import classes from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";

type PropsType = {
    isOwner: boolean
    profile: any
    status: string
    updateStatus: (status: string) => void
    savePhoto: any
}

const ProfileInfo = (props: PropsType) => {


    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }

    }
    return (
        <div>
            <div>
                <img
                    src={props.profile.large || "https://proprikol.ru/wp-content/uploads/2020/03/sinij-czvet-krasivye-kartinki-1-650x433.jpg"}
                    className={classes.mainPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            </div>
            <div>
                <div>
                    <b>Looking for a job</b>: {props.profile.lookingForAJob ? " yes" : "no"}
                </div>
                {props.profile.lookingForAJob &&
                <div>
                    <b>My professionsl skills</b>: {props.profile.lookingForAJobDescription}
                </div>}
                <div>
                    <b>About me</b>: {props.profile.aboutMe}
                </div>
                <div>
                    <b>Contact</b>: {Object.keys(props.profile.contacts).map(key => {
                   return <Contact key = {key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                })}
                </div>
            </div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

// @ts-ignore
const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}
export default ProfileInfo