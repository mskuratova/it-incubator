
import React from "react";
import {UsersFunc} from "./UsersFunc";
import {connect} from "react-redux";
import {
    follow,
    getUsersThunkCreator,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollow
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {userAPI} from "../../api/api";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class UsersAPIComponent extends React.Component<any, any> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.PageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.PageSize);
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        userAPI.getUser(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        });
    }

    render() {
        return <UsersFunc totalUsersCount={this.props.totalUsersCount}
                          pageSize={this.props.pageSize}
                          currentPage={this.props.currentPage}
                          onPageChanged={this.onPageChanged}
                          users={this.props.users}
                          follow={this.props.follow}
                          unfollow={this.props.unfollow}
                         followingInProgress={this.props.followingInProgress}
        />
    }
}

let mapStateToProps = (state: AppStateType) => {
return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
}
}
export default compose (
    connect(mapStateToProps,
    {
        follow, unfollow, setCurrentPage,
        toggleIsFollowingProgress, getUsers:getUsersThunkCreator}),
    withAuthRedirect)(UsersAPIComponent)


// export default connect(mapStateToProps,
//     {
//         follow, unfollow, setCurrentPage,
//         toggleIsFollowingProgress, getUsers:getUsersThunkCreator
//     })(UsersAPIComponent);

// export default UsersAPIComponent