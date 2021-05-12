import React from 'react';
import classes from "./ProfileInfo.module.css";

const ProfileInfo: React.FC = () => {
    return (
        <div>
            <div>
                <img
                    src="https://proprikol.ru/wp-content/uploads/2020/03/sinij-czvet-krasivye-kartinki-1-650x433.jpg" />
            </div>
            <div className={classes.descriptionBlock}>
                ava + description
            </div>
        </div>
)
}

export default ProfileInfo