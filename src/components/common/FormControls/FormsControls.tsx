import React from 'react';
import styles from './FormsControls.module.css';


export const Textarea = (props:any) => {
    const hasError = props.meta.touched && props.meta.error
    return(
        <div className={styles.formControl + " " + hasError ? styles.error :""} >
            <textarea {...props}/>
            {hasError && <span>{props.meta.error}</span>}
        </div>
    )
}
export const Input = (props:any) => {
    const hasError = props.meta.touched && props.meta.error
    return(
        <div className={styles.formControl + " " + hasError ? styles.error :""} >
            <input {...props}/>
            {hasError && <span>{props.meta.error}</span>}
        </div>
    )
}