import React, {ComponentType} from "react";
import {UsersFunc} from "./UsersFunc";
import {connect} from "react-redux";
import {
    follow,
    requestUsersThunkCreator,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollow, UserType
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {userAPI} from "../../api/api";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUserCount,
    getUsers
} from "../../redux/users-selectors";

type PropsType = {
    currentPage: number
    pageSize: number
    toggleIsFetching: (isFetching: boolean) => void
    totalUserCount: number
    users: Array<UserType>
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
    setUsers: (items: UserType) => void
    followingInProgress: number[]
    unfollow: (id:number) => void
    follow: (id: number) => void

}

class UsersAPIComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
        this.props.setCurrentPage(pageNumber)
        // this.props.toggleIsFetching(true)
        userAPI.getUser(pageNumber, this.props.pageSize).then(data => {
            // this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        });
    }

    render() {
        return <UsersFunc totalUserCount={this.props.totalUserCount}
                          pageSize={this.props.pageSize}
                          currentPage={this.props.currentPage}
                          onPageChanged={this.onPageChanged}
                          users={this.props.users}
                          follow={this.props.follow}
                          unfollow={this.props.unfollow}
                          followingInProgress={this.props.followingInProgress}
                          getUsers={this.props.getUsers}/>
    }
}

let mapStateToProps = (state: AppStateType) => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUserCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}
export default compose<ComponentType>(

    connect(mapStateToProps,
        {
            follow, unfollow, setCurrentPage,
            toggleIsFollowingProgress, getUsers: requestUsersThunkCreator
        }))(UsersAPIComponent)