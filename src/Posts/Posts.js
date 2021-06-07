import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../actions/index';
import {Grid, LinearProgress} from '@material-ui/core';
import NewPost from './Post/NewPost';
const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state)=>{return state.posts});
    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch]);
    posts.sort((function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt)
    }));
    return (
        !posts.length ? <LinearProgress style={{marginTop: "10px"}} /> : (
            <Grid style={{marginTop: "10px"}} container spacing={6}>
                {
                    posts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={6}>
                        <NewPost post={post}/>
                         </Grid>
                    ))
                }
            </Grid>
        )
    );
};

export default Posts;