import React from "react";
import s from "../Paginator/Pagimator.module.css";

let Paginator =(props: any) => {
    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize);

    let pages =[];

    for (let i =1; i<= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        {pages.map(p=> {
            return <span className={props.currentPage === p ? s.SelectedPage: ""}
                onClick={(e) => {
                    props.onPageChanged(p)}}>
           {p} </span>
        })
        }
    </div>
}

export default Paginator