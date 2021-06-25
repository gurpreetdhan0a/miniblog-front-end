import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) =>{
    try {
        const {data} = await api.fetchPost();
        dispatch({type:"FETCH_ALL", payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, setLoader) => async (dispatch) =>{
    try {
        const {data} = await api.createPost(post);
        dispatch({type:"CREATE", payload: data});
        setLoader(false);
        alert("Post saved successfully")
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) =>{
    try {
        await api.deletePost(id);
        dispatch({type:"DELETE", payload:id})
    } catch (error) {
        console.log(error);
    }
}

export const signIn =(userId, username) =>{
    return {
        type: 'SIGN_IN',
        payload: userId,
        username: username
    } 
}

export const signOut = ()=>{
    return {
        type: 'SIGN_OUT'
    }
}

export const likePost = (id) => async (dispatch)=>{
    try {
        const {data} = await api.likePost(id);
        dispatch({type:"LIKE", payload:data})
    } catch (error) {
        console.log(error);
    }
}
export const unLikePost = (id) => async (dispatch)=>{
    try {
        const {data} = await api.unLikePost(id);
        dispatch({type:"UNLIKE", payload:data})
    } catch (error) {
        console.log(error);
    }
}