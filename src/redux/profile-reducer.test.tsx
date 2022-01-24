import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
let state = {
    posts: [
        {id: 1, message: 'Hi', likesCount:12},
        {id: 2, message: 'Yoo', likesCount:10},
        {id: 3, message: 'Dada', likesCount:1},
        {id: 4, message: 'Blabla', likesCount:8},
    ]}
it('new post should be added', () => {
let action = addPostActionCreator("it-kamasutra");

let newState = profileReducer(state, action) ;
expect(newState.posts[4].message).toBe("it-kamasutra")
 expect(newState.posts.length).toBe(5)
});
it('after deleting length of should be decrement', () => {
let action = deletePost(1);

let newState = profileReducer(state, action) ;
 expect(newState.posts.length).toBe(3)
});
